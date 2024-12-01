using authenticate_service.Interface;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace authenticate_service.Services
{
    public class MonitoringService : BackgroundService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<MonitoringService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public MonitoringService(IHttpClientFactory httpClientFactory, ILogger<MonitoringService> logger, IServiceProvider serviceProvider)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                // Execute each health check independently with logging
                await Task.WhenAll(
                    CheckAuthenticateServiceHealth(stoppingToken),
                    CheckDatabaseHealth(stoppingToken)
                );

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Ping every 1 minute
            }
        }

        private async Task CheckAuthenticateServiceHealth(CancellationToken stoppingToken)
        {
            try
            {
                _logger.LogInformation("Starting AuthenticateService health check...");
                var client = _httpClientFactory.CreateClient();
                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5)); // timeout limit is 5 seconds
                var response = await client.GetAsync("http://localhost:5277/api/user/ping", cts.Token);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("AuthenticateService is healthy at {Time}", DateTimeOffset.Now);
                }
                else
                {
                    _logger.LogWarning("AuthenticateService is unhealthy at {Time}. Status Code: {StatusCode}", DateTimeOffset.Now, response.StatusCode);
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogError("Ping to AuthenticateService timed out at {Time}", DateTimeOffset.Now);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error pinging AuthenticateService at {Time}", DateTimeOffset.Now);
            }
        }

        private async Task CheckDatabaseHealth(CancellationToken stoppingToken)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();

                var isHealthy = await userRepository.PingAsync();
                if (isHealthy)
                {
                    _logger.LogInformation("Database is healthy at {Time}", DateTimeOffset.Now);
                }
                else
                {
                    _logger.LogWarning("Database is unhealthy at {Time}", DateTimeOffset.Now);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking database health at {Time}", DateTimeOffset.Now);
            }
        }
    }
}
