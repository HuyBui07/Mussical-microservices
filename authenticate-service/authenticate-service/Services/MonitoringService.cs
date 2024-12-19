using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace authenticate_service.Services
{
    public class MonitoringService : BackgroundService
    {
        private readonly ILogger<MonitoringService> _logger;
        private readonly DatabaseSettings _databaseSettings;
        private readonly IHttpClientFactory _httpClientFactory;
        private string _currentConnectionString;

        public MonitoringService(
            ILogger<MonitoringService> logger,
            IOptions<DatabaseSettings> databaseSettings,
            IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _databaseSettings = databaseSettings.Value;
            _httpClientFactory = httpClientFactory;
            _currentConnectionString = _databaseSettings.PrimaryConnectionString;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting MonitoringService...");

            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckDatabaseHealth(stoppingToken);
                await CheckAuthenticateServiceHealth(stoppingToken);

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }

        private async Task CheckAuthenticateServiceHealth(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting AuthenticateService health check...");

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.GetAsync("http://localhost:5277/api/user/ping", stoppingToken);
                response.EnsureSuccessStatusCode();

                _logger.LogInformation("AuthenticateService is healthy at {Time}", DateTime.Now);
            }
            catch (Exception ex)
            {
                _logger.LogError("Ping to AuthenticateService failed: {Message} at {Time}", ex.Message, DateTime.Now);
            }
        }

        private async Task CheckDatabaseHealth(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Checking database health on {ConnectionString}", _currentConnectionString);

            try
            {
                // Check if the current database is healthy
                if (await IsDatabaseHealthy(_currentConnectionString, stoppingToken))
                {
                    _logger.LogInformation("Database is healthy at {Time}", DateTime.Now);

                    // If using the replica database, check if primary is healthy
                    if (_currentConnectionString == _databaseSettings.ReplicaConnectionString &&
                        await IsDatabaseHealthy(_databaseSettings.PrimaryConnectionString, stoppingToken))
                    {
                        _logger.LogInformation("Primary database is healthy. Reverting to primary database...");
                        SwitchDatabase(_databaseSettings.PrimaryConnectionString);
                    }
                }
                else
                {
                    throw new Exception("Current database connection is unhealthy.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Database error: {Message} at {Time}", ex.Message, DateTime.Now);

                if (_currentConnectionString == _databaseSettings.PrimaryConnectionString)
                {
                    _logger.LogWarning("Switching to replica database...");
                    SwitchDatabase(_databaseSettings.ReplicaConnectionString);
                }
            }
        }

        private async Task<bool> IsDatabaseHealthy(string connectionString, CancellationToken stoppingToken)
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                await connection.OpenAsync(stoppingToken);
                using var command = connection.CreateCommand();
                command.CommandText = "SELECT 1";
                await command.ExecuteScalarAsync(stoppingToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private void SwitchDatabase(string newConnectionString)
        {
            _currentConnectionString = newConnectionString;
            Environment.SetEnvironmentVariable("CurrentDatabaseConnection", newConnectionString);
            _logger.LogInformation("Switched database connection to: {ConnectionString}", newConnectionString);
        }
    }
}
