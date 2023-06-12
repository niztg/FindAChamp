"""
Mushroom Image Testing and Classification

This script loads a trained model and provides a function to test new mushroom images and classify them.

References:
[1] Tensorflow tutorial
[2] Keras tutorial
[3] Image classification tutorial
[4] Sequential model tutorial

"""

import os
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import tensorflow as tf

images_dir = "Images"

mushroom_types = [name for name in os.listdir(images_dir) if os.path.isdir(os.path.join(images_dir, name))]

checkpointPath = "training/cp.ckpt"
checkpointDir = os.path.dirname(checkpointPath)

def createModel():
    """
    Create a neural network model for mushroom classification.

    Returns:
        The created neural network model.
    """
    model = tf.keras.Sequential([
        tf.keras.layers.Flatten(input_shape=(240, 320, 3)),
        tf.keras.layers.Dense(128, activation="relu"),
        tf.keras.layers.Dense(len(mushroom_types))
    ])

    model.compile(
        optimizer="adam",
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=["accuracy"]
    )
    return model

model = createModel()

model.load_weights(checkpointPath) # [5]

probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])

def testImage(imageUrl):
    """
    Test a mushroom image and classify it.

    Args:
        imageUrl: The path or URL to the image file.

    Returns:
        A dictionary containing the predicted probabilities for each mushroom type.
    """
    test_image = Image.open(imageUrl)
    test_image = test_image.resize((320, 240))
    test_image = np.array(test_image)

    test_image = np.expand_dims(test_image, axis=0)

    probabilities = probability_model.predict(test_image)
    
    probabilityList = {}
    for i, probability in enumerate(probabilities[0]):
        probabilityList[mushroom_types[i]] = round(probability * 100)

    return probabilityList

"""
Bibliography
[1] TensorFlow 2.0 Complete Course - Python Neural Networks for Beginners Tutorial. 2020. 
[2] “Module: Tf.keras:  tensorflow V2.12.0,” TensorFlow, https://www.tensorflow.org/api_docs/python/tf/keras (accessed Jun. 10, 2023). 
[3] “Image classification: Tensorflow Core,” TensorFlow, https://www.tensorflow.org/tutorials/images/classification (accessed Jun. 10, 2023). 
[4] K. Team, “Keras Documentation: The sequential model,” Keras, https://keras.io/guides/sequential_model/ (accessed Jun. 10, 2023).  
[5] “Save and Load Models:  Tensorflow Core,” TensorFlow, https://www.tensorflow.org/tutorials/keras/save_and_load (accessed Jun. 10, 2023).
"""