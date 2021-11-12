""" This module contains functions to load trained model and predict.
    """
import os
import pickle
import numpy as np
import keras
from keras.models import load_model

from preprocess_midi import Preprocessor
from music21 import note, chord


class Predictor:
    """ A class containing functions to predict notes and chords.
    """

    def __init__(self):

        self.unique_note_pitch_number = 34

    def get_model(self, model_path=""):
        """ A function to load model from disk.

        Args:
            model_name ([String, Optional]): Name of the specific model to import. defauls to "".
                                    Imports the model with the lowest loss.

        Returns:
            model - This function returns trained LSTM model.
        """

        # Get lowest loss model name - Model importedname not provided
        def get_lowest_loss_model_name():
            model_names = os.listdir('artefacts/model/')
            model_losses = [int(num)
                            for num in model_names.split('_').split('.')[:2]]
            return model_names.index(min(model_losses))

        # Model with the lowest loss imported if name not provided
        # if not model_name:
          #  model_name = get_lowest_loss_model_name()

        model = keras.models.load_model(model_path)

        return model

    def predict(self, model, input_data, pitchnames, num_notes_to_generate=6, random=False):
        """ A function to generate/predict notes and chords for given starting input.
            Args:
                model ([LSTM model]): a trained LSTM model for prediction.

                input_data ([numpy array]]): A numpy array of sequence of notes and chords.

                num_notes_to_generate ([int]): Number of new notes to generate in prediction process.

                random ([Boolean, Optional]): True if random index is preferred for starting note in input sequence.
                                                Otherwise startes from 0 if False. Defaults to False.

            Returns:
                A sequence of notes and chord predictions.
            """

        starting_seq_idx = 0

        # random index for start sequence if 0 is not the preferred starting point
        if random:

            starting_seq_idx = np.random.randint(0, len(input_data)-1)

        map_int_note = dict((num, note)
                            for num, note in enumerate(pitchnames))

        start_pattern = input_data[starting_seq_idx]
        generated_output = list()

        for pnote in range(num_notes_to_generate):
            pred_input = np.reshape(
                start_pattern, (1, len(start_pattern), 1))
            pred_input = pred_input / float(self.unique_note_pitch_number)

            generate = model.predict(pred_input, verbose=0)

            idx = np.argmax(generate)
            result = map_int_note[idx]
            generated_output.append(result)

            start_pattern = np.append(start_pattern, idx)
            start_pattern = start_pattern[1:len(start_pattern)]

        return generated_output

    def to_model(self, input_list):

        raw_notes = list()

        for element in input_list:
            if isinstance(element, list):
                c = chord.Chord(element)
            else:
                c = note.Note(element)
            raw_notes.append(c)

        notes = list()

        for rnote in raw_notes:
            # if only a single note element
            if isinstance(rnote, note.Note):
                notes.append(str(rnote.pitch))
            # if combination of note elements (Chord)
            elif isinstance(rnote, chord.Chord):
                notes.append('.'.join(str(n) for n in rnote.normalOrder))

        return notes

    def to_front(self, predicted_notes):

        output_notes = list()
        for element in predicted_notes:

            if ('.' in element) or element.isdigit():
                chord_notes = element.split('.')
                c_notes = list()

                for thisNote in chord_notes:
                    note_obj = note.Note(int(thisNote))
                    c_notes.append(str(note_obj.pitch))
                output_notes.append(c_notes)
            else:
                output_notes.append(element)

        return output_notes

    def generate_notes(self, model, composition):

        SEQUENCE_LENGTH = 10

        print("Importing notes from disk . . .")
        # load the notes used to train the model
        with open('notes.pkl', 'rb') as filepath:
            training_notes = pickle.load(filepath)

        # Convert notes to model convenient version
        notes = self.to_model(composition)

        # adding more notes to input for prediction quality enhancement
        notes.extend(training_notes)

        # Categories of classification sequence model --> notes
        pitchnames = set(notes)

        print("Preparing sequences for prediction . . .")
        input_sequences, output_sequences = Preprocessor().sequence(notes, SEQUENCE_LENGTH)

        print("Prediction process Starting . . . ")
        generated_notes = self.predict(model, input_sequences, pitchnames)

        generated_notes = self.to_front(generated_notes)

        print("Prediction Done.\n")
        return generated_notes


if __name__ == '__main__':

    pass

    #model_dir = "artifacts/model/model_2021_10_11-11_28_40_PM.h5"

    # composition = ['F2', 'C3', 'F3', ['A3', 'F2'], 'C#3','F3', ['B-3', 'F2', 'C3'], 'C#3', 'F3', 'C#3']

    #p = Predictor()
    #result = p.generate_notes(model_dir, composition)

    # print(result)

    # result --> new generated notes from the generator
    # eg. result = ['C6', 'C6', 'C6', 'C6', 'C6', 'C6']  --> only notes result
    # eg. result = [['A', 'C', 'E'], ['A', 'C', 'E'], ['A', 'C', 'E'], ['A', 'C', 'E'], ['A', 'C', 'E'], ['A', 'C', 'E']] --> only chord result

    # Input notes can be of any number but 10 is recommended
    # Output result can be of any size but it is set to 6 at the moment to comply with the front end
