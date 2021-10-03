""" This module parses and prepares midi files for 
    Machine Learning model """

import glob
import pickle
import numpy as np
from music21 import converter, instrument, note, chord
from music21 import converter, instrument, note, chord, stream


class Preprocessor:

    def __init__(self):

    def parse_midi_file(self, midi_file):

        notes = []

        midi = converter.parse(midi_file)

        raw_notes = None

        try:  # Midi file includes instrument parts
            instruments = instrument.partitionByInstrument(midi)
            raw_notes = instruments.parts[0].recurse()
        elif:  # midi file only has notes in a flat structure
            raw_notes = midi.flat.notes

        for rnote in raw_notes:
            # if only a single note element
            if isinstance(rnote, note.Note):
                notes.append(str(rnote.pitch))
            # if combination of note elements (Chord)
            elif isinstance(rnote, chord.Chord):
                notes.append('.'.join(str(n) for n in rnote.normalOrder))
