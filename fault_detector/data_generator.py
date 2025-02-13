import csv
import random

# Define the ranges for normal behavior
cpu_usage_range = (0, 10)  # in percentage
memory_usage_range = (100, 1000)  # in MB
response_latency_range = (0, 4000)  # in ms

# Number of samples
num_samples = 1000

# Generate the samples
samples = []
for _ in range(num_samples):
    cpu_usage = random.uniform(*cpu_usage_range)
    memory_usage = random.uniform(*memory_usage_range)
    response_latency = random.uniform(*response_latency_range)
    samples.append([cpu_usage, memory_usage, response_latency])

# Write the samples to a CSV file
with open('train_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['CPU Usage (%)', 'Memory Usage (MB)', 'Response Latency (ms)'])
    writer.writerows(samples)

print(f'{num_samples} samples have been written to train_data.csv')
