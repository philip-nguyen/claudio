from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
import time
import ml_module.predict

app = Flask(__name__)

@app.route('/predict', methods = ['POST'])
def mlifyAndPredict():
    # get the post data
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

    # call python module
    pr = ml_module.Processor()
    model_dir = "artifacts/model/model_2021_10_11-11_28_40_PM.h5"
    newNotes = pr.generate_notes(model_dir, mlify_notes)
    print(newNotes)

    return {'notes': mlify_notes}

if __name__ == "__main__":
    #app.secret_key = os.urandom(12)
    #app.run(debug=True,host='0.0.0.0', port=4000)
    notes = [['C4', 'D4'], 'D4', 'E4', ['F4', 'D#4', 'C#4'], 'G4', 'A4', 'B4', 'B#4']
    pr = ml_module.predict.Predictor()
    model_dir = "artifacts/model/model_2021_10_11-11_28_40_PM.h5"
    newNotes = pr.generate_notes(model_dir, notes)
    print(newNotes)
