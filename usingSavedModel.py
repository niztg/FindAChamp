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
    # The neural network model
    model = tf.keras.Sequential([
        # Flattens the array from a 2d array to a one dimensional array
        tf.keras.layers.Flatten(input_shape=(240,320,3)),
        # Analyzes the pixels to identify patterns
        tf.keras.layers.Dense(128, activation="relu"),

        tf.keras.layers.Dense(len(mushroom_types))
    ])

    # Configures the model after building it
    model.compile(
                # The algorithm that tries to minimize the loss function by adjusting weights (the influence neuros have over each other) and biases (shifts the output of the layer)
                optimizer="adam",
                # A function to measure how well the model is doing during traning and calculates the difference between the predicted output of the model and the true output with the goal of minimizing the difference.
                loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                # Evaluates its performance on the test set
                metrics=["accuracy"]
                )
    return model

model = createModel()

model.load_weights(checkpointPath)

probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])

def testImage(imageUrl):
    # Load the test image
    test_image = Image.open(imageUrl)
    test_image = test_image.resize((320,240))
    test_image = np.array(test_image)

    # Reshape the image to match the model's input shape
    test_image = np.expand_dims(test_image, axis=0)

    # Get the predicted probabilities for each class
    probabilities = probability_model.predict(test_image)
    
    probablityList = {}
    # Print the predicted probabilities along with the corresponding class labels
    for i, probability in enumerate(probabilities[0]):
        probablityList[mushroom_types[i]] = round(probability*100)
    return probablityList