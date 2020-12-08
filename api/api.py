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

from skimage.color import rgb2grey
from sklearn.cluster import KMeans

CURRENT_DIRECTORY = os.getcwd()
UPLOAD_FOLDER = CURRENT_DIRECTORY + '/uploads'
path = 	Path(CURRENT_DIRECTORY)
PARENT_DIRECTORY = path.parent
base_height = 224
width = 224

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

read = lambda imname: np.asarray(Image.open(imname).resize((224,224),Image.ANTIALIAS).convert("RGB"))
json_file = open('./models/resnet50.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("./models/resnet50.h5")

json_auto_file = open('./models/autoencoder.json', 'r')
autoencoder_json = json_auto_file.read()
json_auto_file.close()
auto_encoder = model_from_json(autoencoder_json)
# load weights into new model
auto_encoder.load_weights("./models/autoencoder.h5")

def mask(img):
  cluster_img=(KMeans(n_clusters=2).fit(rgb2grey(img).reshape(-1,1)).labels_.reshape(224,224))
  masks=[cluster_img==i for i in range(2)]
  a=(rgb2grey(img)*masks[0]).mean()
  b=(rgb2grey(img)*masks[1]).mean()
  x=0
  if a<b :
    x=0
  else:
    x=1  
  y=img.copy()
  for i in range(3):
    y[:,:,i]*=masks[x]
  return y

@app.route('/upload', methods=['GET', 'POST'])
def upload():
	if(request.method == "POST"):
		file = request.files['file']
		filename = secure_filename(file.filename)
		extension = filename.rsplit('.', 1)[1]
		destination="/".join([UPLOAD_FOLDER, filename])
		file.save(destination)
		
		im = read(destination)
		im1 = im.copy()
		im = im/255.0
		im = im.reshape(-1, 224, 224, 3)
		a_im = auto_encoder.predict(im)
		z = np.mean((a_im - im) ** 2)
		print(z)
		if(z > 0.02):
			return jsonify({"status": "Failure", "error": "0"})

		
		y = loaded_model.predict(mask(im1).reshape(-1, 224, 224, 3))
		
		return jsonify({"status": "Success!", "y": str(y)})
	
	return {"status": "Success!"}