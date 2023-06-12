"""
Mushroom Image Processing and Model Training

This script processes mushroom images, prepares them for model training, and trains a neural network model to classify mushrooms.

References:
[1] Tensorflow tutorial
[2] Keras tutorial
[3] Image classification tutorial
[4] Sequential model tutorial

"""

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
    """
    Create a neural network model for mushroom classification.

    Returns:
        The created neural network model.
    """
    model = tf.keras.Sequential([
        tf.keras.layers.Flatten(input_shape=(image_size[1], image_size[0], 3)),
        tf.keras.layers.Dense(128, activation="relu"),
        tf.keras.layers.Dense(len(mushroom_types))
    ])

    model.compile(
        optimizer="adam",
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=["accuracy"]
    )
    return model

def saveModel():
    """
    Train and save the mushroom classification model. [5]
    """
    model = createModel()

    model.summary()

    checkpointPath = "training/cp.ckpt"
    checkpointDir = os.path.dirname(checkpointPath)
    checkpointCallback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpointPath, save_weights_only=True, verbose=1)

    model.fit(images, labels, epochs=11, validation_data=(images, labels), callbacks=[checkpointCallback])

    probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])

saveModel()

"""
Bibliography
[1] TensorFlow 2.0 Complete Course - Python Neural Networks for Beginners Tutorial. 2020. 
[2] “Module: Tf.keras:  tensorflow V2.12.0,” TensorFlow, https://www.tensorflow.org/api_docs/python/tf/keras (accessed Jun. 10, 2023). 
[3] “Image classification: Tensorflow Core,” TensorFlow, https://www.tensorflow.org/tutorials/images/classification (accessed Jun. 10, 2023). 
[4] K. Team, “Keras Documentation: The sequential model,” Keras, https://keras.io/guides/sequential_model/ (accessed Jun. 10, 2023).  
[5] “Save and Load Models:  Tensorflow Core,” TensorFlow, https://www.tensorflow.org/tutorials/keras/save_and_load (accessed Jun. 10, 2023).
"""