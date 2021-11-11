from flask import Flask, request, jsonify
import numpy as np
import pickle as p
from ast import literal_eval
#from google.cloud import storage
from predict import Predictor
from keras.models import load_model


# initialize the app
app = Flask(__name__)

# when the user sends a POST request


@app.route('/api', methods=['POST'])
def makecalc():
    # get the data from the user
    notes_data = request.json
    # print(notes_data)

    mlify_notes = []
    last_column = 0
    for currNote in notes_data:
        
        if not mlify_notes:
            
            mlify_notes.append(currNote['note'])
        else:   
            # if NOT the first note to append
            if last_column == currNote['col']:
                
                noteSameColumn = mlify_notes.pop(-1)
                # pop off an array or singular note
                if isinstance(noteSameColumn, list):
                    noteSameColumn.append(currNote['note'])
                    mlify_notes.append(noteSameColumn);
                # is a singular note
                else:
                    mlify_notes.append([noteSameColumn, currNote['note']])
            else:
                mlify_notes.append(currNote['note'])

        # keep track of the last note's column
        last_column = currNote['col']

    print(mlify_notes)
    # uses the model and the input data to predict
    predictor = Predictor()
    predictions = predictor.generate_notes(model, mlify_notes)
    #prediction = np.array2string(pred)
    return jsonify(predictions)


if __name__ == '__main__':
    # to download from Google Cloud Storage the pickle file
    #storage_client = storage.Client()
    #bucket = storage_client.bucket('claudio_pro')
    # loads the pickle file
    #blob = bucket.blob('sequence_model.h5')
    # saves temporarily the pickle file
    #temp_model_location = './sequence_model.h5'
    # blob.download_to_filename(temp_model_location)
    temp_model_location = "sequence_model.h5"
    model = load_model(temp_model_location)

    # runs the app
    # to run the app locally use host='127.0.0.1'
    app.run(debug=True, host='127.0.0.1')
