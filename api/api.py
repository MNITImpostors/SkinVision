import os
from flask import Flask, flash, send_from_directory, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
from glob import glob
import seaborn as sns
from PIL import Image
from pathlib import Path
import json

CURRENT_DIRECTORY = os.getcwd()
UPLOAD_FOLDER = CURRENT_DIRECTORY + '/uploads'
path = 	Path(CURRENT_DIRECTORY)
PARENT_DIRECTORY = path.parent

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

read = lambda imname: np.asarray(Image.open(imname).convert("RGB"))
json_file = open('./models/resnet50.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("./models/resnet50.h5")


@app.route('/upload', methods=['GET', 'POST'])
def upload():
	if(request.method == "POST"):
		file = request.files['file']
		filename = secure_filename(file.filename)
		extension = filename.rsplit('.', 1)[1]
		destination="/".join([UPLOAD_FOLDER, filename])
		file.save(destination)
		
		x = read(destination)
		x = x/255.0
		x = x.reshape(-1, 224, 224, 3)

		y = loaded_model.predict(x)
		
		return jsonify({"status": "Success!", "y": str(y)})
	
	return {"status": "Success!"}