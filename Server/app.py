# import libraries
from flask import Flask, jsonify, request
import feature
from tensorflow import keras
import numpy as np


# Creating Flask app
app = Flask(__name__)


# Loading pre-trained keras model
def loadModel():
    path = "F:\Chrome Extension\Trawling-Chrome-Extention\Server\models48xLSTM-32xDense" 
    model = keras.models.load_model(path)
    return model

model = loadModel()


# Make prediction using loaded keras model
def make_predict(url):
    x_pedict = feature.featureExtraction(url)
    print(x_pedict, " - Extracted features")
    x_pedict = np.array(x_pedict)
    x_pedict = np.reshape(x_pedict, (1, 1, x_pedict.shape[0]))

    prediction = model.predict(x_pedict)
    print(prediction[0], " - Predicted value before thresholding")
    return thresholding(prediction[0])


# Thresholding 
# legitmate <= 0.8 < phishing
def thresholding(prediction):
    threshold = 0.8
    if prediction > threshold:
        return 1
    else:
        return 0


#routing post methods
@app.route("/", methods=['GET', 'POST'])
def index():
    if (request.method == "POST"):
        response = request.get_json()
        predict = make_predict(response["url"])
        print(predict, "- predicted value")
        return jsonify({"state": predict })
    else:
        print("Error - Not recieved POST method")
        return jsonify({"state":-1})


if __name__ == "__main__":

    app.run(debug=True)