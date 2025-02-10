import csv
import random

# Define the ranges for normal behavior
cpu_usage_range = (10, 50)  # in percentage
network_traffic_range = (100, 1000)  # in KB/s
response_latency_range = (50, 300)  # in ms

# Number of samples
num_samples = 1000

# Generate the samples
samples = []
for _ in range(num_samples):
    cpu_usage = random.uniform(*cpu_usage_range)
    network_traffic = random.uniform(*network_traffic_range)
    response_latency = random.uniform(*response_latency_range)
    samples.append([cpu_usage, network_traffic, response_latency])

# Write the samples to a CSV file
with open('train_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['CPU Usage (%)', 'Network Traffic (KB/s)', 'Response Latency (ms)'])
    writer.writerows(samples)

print(f'{num_samples} samples have been written to train_data.csv')
