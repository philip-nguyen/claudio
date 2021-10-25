import * as Tone from 'tone';

// should take in the a composition including:
// notes[], bpm, synth
export function playSequence(notes, isPlaying, numSteps, setIsPlaying, setCurrentColumn = undefined) {
    // TODO: extend synth to allow for different types of samples
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    
    // make an array for notes by step
    const notesByStep = new Array(numSteps);
    // push an array into all array slots
    for (var i = 0; i < numSteps; i++) {
      notesByStep[i] = [];
    }
    // push notes into appropriate column
    for (let i = 0 ; i < notes.length; i++) {
      console.log(notes[i]);
      notesByStep[notes[i].col].push(notes[i].note);
    }

    // Tone Sequence
    Tone.start();
    const sequencer = new Tone.Sequence(
        (time, step) => {
            // Highlight column with styling
            // setCurrentColumn(step);
            if(setCurrentColumn !== undefined) setCurrentColumn(step);

            synth.triggerAttackRelease(notesByStep[step], "16n", time);
        },
        [...Array(numSteps).keys()],
        "16n"
    );

    if(!isPlaying) {
        if(setIsPlaying !== undefined) setIsPlaying(true);
        sequencer.start();
        Tone.Transport.start();
    }
    // if composition isPlaying
    else {
        if(setIsPlaying !== undefined) setIsPlaying(false);
        if(setCurrentColumn !== undefined) setCurrentColumn(null);

        Tone.Transport.stop();
        // cancel() - clears the transport so the identical notes do not stack
        Tone.Transport.cancel(); 
        sequencer.stop();
        
    }
    
}