""" This module ingest preprocessed midi files to train 
    a Machine Learning model.         
    """
# Importing keras modules
import keras
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout, LSTM, Activation, BatchNormalization as BatchNorm
from keras.utils import np_utils
from keras.callbacks import ModelCheckpoint
import tensorflow as tf

# Importing datetime


# Importing customer modules
from preprocess_midi import Preprocessor


class Training:

    def __init__(self):
        pass

    def create_model(self, input_sequences, output_sequence_length):
        """ A function to create an LSTM algorithm using Keras  

            Parameters:
                input_sequences [Numpy Array]:  A numpy array of input sequence data.

                output_sequence_length [int]: The number of possible output elements. 

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
        model.add(Dense(output_sequence_length))
        model.add(Activation('softmax'))
        model.add(Activation('softmax'))
        model.compile(loss='categorical_crossentropy', optimizer='rmsprop')

        return model

    def train(self, model, input_sequences, output_sequences):
        """ A function to train LSTM algorithm to build a model. 

        Parameters:
            model ([LSTM Algorithm]): An imported LSTM algorithm for training. 
            input_sequences ([Numpy Array]): A numpy array of input sequences for sequences.    
            output_sequences ([Numpy Array]): A numpy array of output sequences 
        """
        checkpoint = ModelCheckpoint(
            filepath,
            monitor='loss',
            verbose=0,
            save_best_only=True,
            mode='min'
        )

        callbacks = [checkpoint]

        callback = tf.keras.callbacks.EarlyStopping(
            monitor='loss', patience=True)

        model.fit(input_sequences, output_sequences, epoch=50,
                  batch_size=128, callbacks=[callbacks])

        return model

    def model_to_disk(self, model, model_name=""):
        """ A function to save imported model to disk. 

        Parameters:
            model ([LSTM model]): A trained LSTM model to save to disk. 

            model_name (str, optional): A model name for saving. Defaults to "".

        Returns:
            True - If the model is successfully saved. 

            False - If model is not saved.
        """
        if not model_name:

            date = datetime.now().strftime("%Y_%m_%d-%I:%M:%S_%p")
            filename = f'model_{date}.h5'

            model.save(filename)

            return True

        return False
