import requests

BASE = " http://192.168.50.187:5000/mushroom"

response = requests.post(BASE, json={"image_url": "C:\\Users\\Tamir\\Desktop\\Coding\\Python\\Tensorflow\\Mushroom trial #1\\Mushroom-Identifier\\Machine Model\\Images\\Agaricus.jpg"})
print(response.json())