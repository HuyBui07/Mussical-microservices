using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace authenticate_service.Services;

public class MonitoringService : BackgroundService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<MonitoringService> _logger;

    public MonitoringService(IHttpClientFactory httpClientFactory, ILogger<MonitoringService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5)); // timeout limit is 5 seconds
                var response = await client.GetAsync("http://localhost:5277/api/user/ping", cts.Token);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("UserService is healthy at {Time}", DateTimeOffset.Now);
                }
                else
                {
                    _logger.LogWarning("UserService is unhealthy at {Time}. Status Code: {StatusCode}", DateTimeOffset.Now, response.StatusCode);
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogError("Ping request timed out at {Time}", DateTimeOffset.Now); // Log timeout error
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error pinging UserService at {Time}", DateTimeOffset.Now);
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Ping every 1 minute
        }
    }
}