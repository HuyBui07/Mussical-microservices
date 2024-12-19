namespace authenticate_service.Services
{
    public class DatabaseSettings
    {
        public string PrimaryConnectionString { get; set; } = string.Empty;
        public string ReplicaConnectionString { get; set; } = string.Empty;
    }
}
