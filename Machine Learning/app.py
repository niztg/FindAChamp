"""
Flask API for Mushroom Classification

This script provides an API endpoint to classify images of mushrooms.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from usingSavedModel import testImage
app = Flask(__name__)
CORS(app)

@app.route('/mushroom', methods=['POST'])
def process_data():
    """
    Process image data and classify mushrooms.

    This function handles the POST request to the '/mushroom' endpoint.
    It expects an image file in the request payload, performs mushroom
    classification using the `testImage` function, and returns the
    probabilities of mushroom classifications as a JSON response.

    Returns:
        A JSON response containing the probabilities of mushroom classifications.
    """
    image_file = request.files.get("image")
    probabilities = testImage(image_file)
    result = {'probabilities': probabilities}
    return jsonify(result)


if __name__ == '__main__':
    app.run(host="IP ADDRESS", port="5000",debug=False)