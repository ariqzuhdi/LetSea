import os
import uvicorn
import traceback
import tensorflow as tf
import pandas as pd
import numpy as np
import datetime
import urllib.request
from datetime import timedelta
from fastapi import FastAPI, Response
# from utils import load_image_into_numpy_array

model_url = 'https://storage.googleapis.com/letsea-dependencies/model.h5'
local_model_path = 'model.h5'
urllib.request.urlretrieve(model_url, local_model_path)
model = tf.keras.models.load_model(local_model_path)

app = FastAPI()

@app.get("/")
def predict_eta():
    try:
    # Your prediction logic here
        dataframe = pd.read_csv('https://storage.googleapis.com/letsea-dependencies/preprocessed.csv')
 
        row_data = 0 
        MMSI = dataframe.iloc[row_data, 0]
        LAT = dataframe.iloc[row_data, 2]
        LON = dataframe.iloc[row_data, 3]
        SOG = dataframe.iloc[row_data,4]
        COG = dataframe.iloc[row_data,5]
        ARRLAT = dataframe.iloc[row_data,11]
        ARRLON = dataframe.iloc[row_data,12]
        reference_datetime = dataframe.iloc[row_data, 1]
        input_feature = dataframe.iloc[row_data, 2:]

        # input preparation
        input_array = input_feature.to_numpy(dtype='float32')
        array_to_tensor = tf.convert_to_tensor(input_array)
        input_tensor = tf.expand_dims(array_to_tensor, axis=0) 
        travel_time = model.predict(input_tensor)

        float_seconds = travel_time[0][0]
        float_seconds = float_seconds.item() # np.float -> float
        duration_delta = timedelta(seconds=float_seconds) # float -> datetime.timedelta

        # convert string to datetime
        datetime_string_format = '%Y-%m-%d %H:%M:%S'
        print(reference_datetime)
        base_datetime = datetime.datetime.strptime(reference_datetime, datetime_string_format)
        arrival_datetime = base_datetime + duration_delta

        output_dictionary = {'MMSI': int(MMSI),
                             'LAT': float(LAT),
                             'LON': float(LON),
                             'SOG': float(SOG),
                             'COG': float(COG),
                             'ARRLAT': float(ARRLAT),
                             'ARRLON':float(ARRLON),
                            'arrival_datetime': str(arrival_datetime)}

                # Return the result
        return output_dictionary

    except:
        traceback.print_exc()
        Response.status_code = 500
        return "Internal Server Error"

# Starting the server
port = int(os.environ.get("PORT", 8000))
print(f"Listening to http://0.0.0.0:{port}")
uvicorn.run(app, host='0.0.0.0', port=port)