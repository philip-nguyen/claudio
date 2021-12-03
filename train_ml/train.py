""" This module contains functions to create and train
    an LSTM Machine Learning model.
    """
# Importing keras modules
import os
import pickle
import joblib
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM, Activation, BatchNormalization as BatchNorm
from keras.utils import np_utils
from keras.callbacks import ModelCheckpoint
import tensorflow as tf

# Importing datetime
from datetime import datetime

# Importing customer modules
from preprocess_midi import Preprocessor


class Trainer:

    """ A function that contains functions
        to create and train ML model.
    """

    def __init__(self):
        pass

    def create_model(self, input_sequences, num_distinct_outputs):
        """ A function to create an LSTM algorithm using Keras

            Parameters:
                input_sequences [Numpy Array]:  A numpy array of input sequence data.

                num_distinct_outputs [int]: The number of possible output elements.

            Returns:
                model [LSTM Algorithm]: An LSTM algorithm for training on preprocessed
                                        input data.
        """
        model = Sequential()
        model.add(LSTM(
            512,
            input_shape=(input_sequences.shape[1], input_sequences.shape[2]),
            recurrent_dropout=0.3,
            return_sequences=True
        ))
        model.add(LSTM(
            512,
            return_sequences=True,
            recurrent_dropout=0.3
        ))
        model.add(LSTM(512))
        model.add(BatchNorm())
        model.add(Dropout(0.3))
        model.add(Dense(256))
        model.add(Activation('relu'))
        model.add(BatchNorm())
        model.add(Dropout(0.3))
        model.add(Dense(num_distinct_outputs))
        model.add(Activation('softmax'))
        model.add(Activation('softmax'))
        model.compile(loss='categorical_crossentropy', optimizer='rmsprop')

        return model

    def train(self, model, input_sequences, output_sequences, save=True):
        """ A function to train LSTM algorithm and save built model.

            Parameters:
                model ([LSTM Algorithm]): An imported LSTM algorithm for training.

                input_sequences ([Numpy Array]): A numpy array of input sequences for sequences.

                output_sequences ([Numpy Array]): A numpy array of output sequences

                save ([Boolean, Optoinal]): True to save the trained model, false otherwise. Defaults to True.

            Returns:
                model - Returns a trained LSTM model.
        """
        filepath = 'artefacts/model/'
        checkpoint = ModelCheckpoint(filepath=filepath,
                                     monitor='val_loss',
                                     verbose=1,
                                     save_best_only=True,
                                     mode='min')

        callbacks = [checkpoint]

        callback = tf.keras.callbacks.EarlyStopping(
            monitor='loss', patience=True)

        model.fit(input_sequences, output_sequences, epochs=2,
                  batch_size=128, callbacks=callbacks)

        if save:

            date = datetime.now().strftime("%Y_%m_%d-%I:%M:%S_%p")
            filpath = f'artefacts/model/model_{date}.h5'
            # Saving model along with associated loss and epoch
            #filepath = f'artefacts/model/model.epoch{epoch:02d}-loss{val_loss:.2f}.h5'
            model.save(filepath)

        return model


if __name__ == '__main__':

    NUM_NOTES = 20
    SEQUENCE_LENGTH = 10

    midi_file = 'input_midi_files/bcm.mid'

    #notes = Preprocessor().midi_to_notes(midi_file)

    all_notes = []

    directory = 'input_midi_files/'

    for num, filename in enumerate(os.listdir(directory)):

        notes = Preprocessor().midi_to_notes(os.path.join(directory, filename))
        all_notes.extend(notes)

        if num > NUM_NOTES:
            break

    date = datetime.now().strftime("%Y_%m_%d-%I:%M:%S_%p")

    with open(f'artifacts/notes/notes-{date}.pkl', 'wb') as note_files:
        pickle.dump(notes, note_files)

    NUM_DISTINCT_OUTPUTS = len(set(all_notes))

    input_sequences, output_sequences = Preprocessor().sequence(all_notes,
                                                                SEQUENCE_LENGTH)

    model = Trainer().create_model(input_sequences, NUM_DISTINCT_OUTPUTS)

    model.summary()

    model = Trainer().train(model, input_sequences, output_sequences, save=True)

    model.save('predictor.h5')

    print("Training Finished!!")

    #pickle.dump(model, open('prediction.pickle', 'wb'))
    # with open('predictions.pkl', 'wb') as model_file:
    #joblib.dump(model, 'prediction.pkl')
