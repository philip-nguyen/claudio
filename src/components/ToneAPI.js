import * as Tone from 'tone';

// should take in the a composition including:
// notes[], bpm, synth
export function playSequence() {
    const synth = new Tone.Polysynth(Tone.Synth).toDestination();
    Tone.start();
    
}