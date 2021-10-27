""" This module parses and prepares midi files for 
    training Machine Learning model """

import glob
import pickle
import numpy as np
from keras.utils import np_utils
from music21 import converter, instrument, note, chord, stream

# Importing datetime
from datetime import datetime


class Preprocessor:

    """ A class that contains functions to preprocess midi files and prepare
        midi data for training machine learning model.
    """

    def __init__(self):
        pass

    def midi_to_notes(self, midi_file):
        """This function read and parse midi files.

        Parameters:
            midi_file [.mid/.midi file]: This is a musical midi file to be parsed.

        Returns:
            notes [List]: Returns a list of sequential notes extracted from 
                          the input midi file.
        """

        notes = []

        midi = converter.parse(midi_file)

        raw_notes = None

        try:  # Midi file includes instrument parts
            instruments = instrument.partitionByInstrument(midi)
            raw_notes = instruments.parts[0].recurse()
        except:  # midi file only has notes in a flat structure
            raw_notes = midi.flat.notes

        for rnote in raw_notes:
            # if only a single note element
            if isinstance(rnote, note.Note):
                notes.append(str(rnote.pitch))
            # if combination of note elements (Chord)
            elif isinstance(rnote, chord.Chord):
                notes.append('.'.join(str(n) for n in rnote.normalOrder))

        return notes

    def notes_to_midi(self, notes):
        """ A function to create midi file from a list of pitch notes.
            Very important to convert predicted notes to midi files.

            Parameters:
                notes [List]: A list of input pitch notes to create midi file. 

            Returns:
                midi_file [.mid]: An output midi file. 

        """

        offset = 0
        output_notes = list()

        # Creating note and chord objects based on input notes
        for element in notes:
            # For Chord object
            if ('.' in element) or element.isdigit():
                chord_notes = element.split('.')
                c_notes = list()

                for thisNote in chord_notes:
                    note_obj = note.Note(int(thisNote))
                    note_obj.storedInstrument = instrument.Piano()
                    c_notes.append(note_obj)
                chord_obj = chord.Chord(c_notes)
                chord_obj.offset = offset
                output_notes.append(chord_obj)

            # for Note object
            else:
                note_obj = note.Note(element)
                note_obj.offset = offset
                note_obj.storedInstrument = instrument.Piano()
                output_notes.append(note_obj)

            # Adding to the offset to separate/play notes
            offset += 0.5

        midi_file = stream.Stream(output_notes)

        return midi_file

    def notes_to_disk(self, notes, filename=""):
        """This file saves notes to disc and attaches timestamp to filenames

            Parameters:
                notes [List]: List of notes and chords to save on disk 
                filename [String]: A String object that specifies the filename for saving

            Returns:
                True - if file is successfully saved into disk. 
                False - if file is not saved into disk or empty notes are provided
        """

        if notes:

            # if filenames are not specified
            if filename == "":
                # Attaching timestamp to filenames when saving files
                date = datetime.now().strftime("%Y_%m_%d-%I:%M:%S_%p")
                filename = f'notes_{date}'

            # Attaching path to filename
            filename = f'artefacts/notes/{filename}'
            with open(filename, 'wb') as mfile:
                pickle.dump(notes, mfile)

            return True

        return False

    def midi_to_disk(self, midi_file, filename=""):
        """ A function to write an input midi file to a disk 

            Parameters:
                midi_file [.mid file]: A .mid file to store into a disk
                filename [String]: A string that specifies a filename for saving

            Returns:
                True - if file saved successfully
                False - if file is not saved or empty midi_file is provided

        """

        if midi_file:

            # if filename is not provided
            if filename == "":
                date = datetime.now().strftime("%Y_%m_%d-%I:%M:%S_%p")
                filename = f'midi_{date}'

            # Adding path to filename
            filename = f'artefacts/midi/{filename}'
            # writing midi file to disk
            midi_file.write('midi', fp=filename)

            return True

        return False

    def sequence(self, notes, sequence_length):
        """ A function to create sequence of input and output lists
            to train a Machine Learning model. 

            Parameters:
                notes [List]: A sequence of notes to create sequences.

                sequence_length[int]: Number of notes in one training 
                                      sequence.

            Returns:
                input_sequence [List]: List of input sequences to train
                                        a Machine Learning model

                output_sequence [List]: List of output notes for each input
                                        sequence - to train a Machine Learning 
                                        model.
        """
        # distinct_notes [int]: A number of distinct notes imported for sequencing.
        distinct_notes = len(set(notes))

        # Extracting distinct pitch names
        pitch_names = sorted(set(item for item in notes))

        # Creating a note to integer mapping dictionary
        note_int_mapping = dict((note, num)
                                for num, note in enumerate(pitch_names))

        input_sequence = list()
        output_sequence = list()

        # Create input sequence and associated ouput note
        for i in range(0, len(notes) - sequence_length, 1):
            # Creating a single input and output sequence
            input_seq = notes[i:i+sequence_length]
            output_note = notes[i+sequence_length]

            # Appending input and output sequences into their corresponding lists
            input_sequence.append([note_int_mapping[n] for n in input_seq])
            output_sequence.append(note_int_mapping[output_note])

        # Reshaping input sequence for an ML module
        number_of_sequences = len(input_sequence)
        input_sequence = np.reshape(
            input_sequence, (number_of_sequences, sequence_length, 1))

        # Normalizing input sequence
        input_sequence = input_sequence / float(distinct_notes)

        # Categorizing network ouput sequence
        output_sequence = np_utils.to_categorical(output_sequence)

        return (input_sequence, output_sequence)
