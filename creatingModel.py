import os
import numpy as np
from PIL import Image
import tensorflow as tf

# Define the directory where the images are stored
images_dir = "Images"

# Get a list of all directories in the images_dir directory
mushroom_types = [name for name in os.listdir(images_dir) if os.path.isdir(os.path.join(images_dir, name))]

# Create empty lists to store the images and labels
images = []
labels = []

# Define the desired size for the images
image_size = (320, 240)

# Loop through each mushroom type folder
for i, mushroom_type in enumerate(mushroom_types):
    # Define the directory where the images for this mushroom type are stored
    mushroom_type_dir = os.path.join(images_dir, mushroom_type)

    # Loop through each image in the mushroom type folder
    for filename in os.listdir(mushroom_type_dir):
        # Load the image and convert it to RGB mode
        image = Image.open(os.path.join(mushroom_type_dir, filename)).convert("RGB")
        
        # Resize the image to the desired size
        image = image.resize(image_size)

        # Convert the image to a numpy array
        image = np.array(image)

        # Append the image to the list of images
        images.append(image)
        
        # Append the label to the list of labels
        labels.append(i)

# Convert the images and labels to numpy arrays
images = np.array(images)
labels = np.array(labels)

def createModel():
    # The neural network model
    model = tf.keras.Sequential([
        # Flattens the array from a 2D shape to a 1D shape
        tf.keras.layers.Flatten(input_shape=(image_size[1], image_size[0], 3)),
        # Analyzes the pixels to identify patterns
        tf.keras.layers.Dense(128, activation="relu"),
        tf.keras.layers.Dense(len(mushroom_types))
    ])

    # Configures the model after building it
    model.compile(
        optimizer="adam",
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=["accuracy"]
    )
    return model

def saveModel():
    model = createModel()

    model.summary()

    checkpointPath = "training/cp.ckpt"
    checkpointDir = os.path.dirname(checkpointPath)
    checkpointCallback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpointPath, save_weights_only=True, verbose=1)

    model.fit(images, labels, epochs=11, validation_data=(images, labels), callbacks=[checkpointCallback])

    # Convert logits to probabilities which will be easier to interpret
    probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])

saveModel()