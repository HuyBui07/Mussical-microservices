import numpy as np
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.callbacks import EarlyStopping
import joblib

# Load and preprocess your dataset
data = pd.read_csv('./train_data.csv', header=None, names=['CPU Usage (%)', 'Network Traffic (KB/s)', 'Response Latency (ms)'])
data = data.values  # Convert DataFrame to numpy array

# Normalize the data
scaler = StandardScaler()
data = scaler.fit_transform(data)

# Save the scaler for later use
joblib.dump(scaler, './scaler.pkl')

# Define the autoencoder architecture
input_dim = data.shape[1]  # Number of columns in the dataset
encoding_dim = 10  # Size of the encoded representation

input_layer = tf.keras.layers.Input(shape=(input_dim,))
encoded = tf.keras.layers.Dense(encoding_dim, activation='relu')(input_layer)
encoded = tf.keras.layers.Dense(encoding_dim // 2, activation='relu')(encoded)
decoded = tf.keras.layers.Dense(encoding_dim // 2, activation='relu')(encoded)
decoded = tf.keras.layers.Dense(input_dim, activation='sigmoid')(decoded)

autoencoder = tf.keras.Model(input_layer, decoded)
autoencoder.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss='mse')

# Define early stopping callback
early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

# Train the autoencoder
autoencoder.fit(data, data, epochs=100, batch_size=32, shuffle=True, validation_split=0.2, callbacks=[early_stopping])

# Save the trained model
autoencoder.save('./autoencoder_model.h5')

# Calculate reconstruction error
reconstructed_data = autoencoder.predict(data)
reconstruction_errors = np.mean(np.square(data - reconstructed_data), axis=1)

# Calculate the range of reconstruction errors
error_range = (np.min(reconstruction_errors), np.max(reconstruction_errors))
print(f'Reconstruction error range: {error_range}')