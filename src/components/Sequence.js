import React, { useState, useEffect } from 'react';
import '../style.css';
import Pad from './Pad';
import * as Tone from 'tone';
import { BsPlayFill, BsFillPauseFill, BsFillTrashFill, BsArrowBarDown, BsArrowBarUp} from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { saveComposition, readComposition } from './../fire.js';
import { SocialIcon } from "react-social-icons";



const noteNames = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B", "B#"];


const Sequence = ({uid, compId}) => {
    
    // range of octaves, [lowOctave, highOctave]
    const [highOctave, setHighOctave] = useState(4);
    const [lowOctave, setLowOctave] = useState(4);

    // A nested array of objects is not performant, but is easier to understand
    // performance is not an issue at this stage anyway
    const[currentNotes, setCurrentNotes] = useState([]);
    const[grid, setGrid] = useState(mapMeasure());

    // Boolean to handle if music is played or not
    const [isPlaying, setIsPlaying] = useState(false);

    // Track name
    const [name, setName] = useState("");

    // BPM 
    const [bpm, setBPM] = useState(120);

    // Used to visualize which column is making sound
    const [currentColumn, setCurrentColumn] = useState(null);

    const [currCompId, setCurrCompId] = useState(compId === undefined ? "" : compId);
    

    //Notice the new PolySynth in use here, to support multiple notes at once
    const[synth, setSynth] = useState(new Tone.PolySynth().toDestination());
    //const synth = new Tone.PolySynth().toDestination();

    function mapMeasure() {
        // complete 13*(high-low) X 16 length (init)
        const measure = [];
        // TODO: check this console.log
        // console.log("Low octave", lowOctave, "High Octave", highOctave);
        
        for(let i = 0; i < 16; i++) {
            let col = [];
            for(let oct = lowOctave; oct <= highOctave; oct++) {
                let o = oct.toString();
                
                let octave = [];
                noteNames.forEach((n) => {
                    let currentNote = n+o;
                    let isNoteActive = (currentNotes.find(
                        e => e.note === currentNote && e.col === i) !== undefined);
                    //if(isNoteActive) console.log(currentNote, i);
                    octave.push({note: n+o, isActive: isNoteActive})
                });
                
                // if(notes.find((e) => e.note === )
                // add the octave to the column/step
                col.push.apply(col, octave);
        
            }
            // add the step (16th note column) to the measure
            measure.push(col);
        }
        //console.log(measure);
        return measure;
    }

    // IF compId is NOT undefined
    useEffect(() => {
        if(compId !== undefined && compId !== '') {
            loadNotes(uid, compId);
        }
        setGrid(mapMeasure());
    }, [lowOctave, highOctave])
    // TODO: on composition load, load the correct number of octaves
    /*
    useEffect(() => {
        setGrid(mapMeasure());
    },)
    */
    // toggles a note's UI on or off
    // updates the grid as well as notes
    function togglePadPressedClass(clickedColumn, clickedNote){
        // Shallow copy of our grid with updated isActive
        let updatedGrid = grid.map((column, columnIndex) =>
           
            column.map((cell, cellIndex) => {
            let cellCopy = cell;
    
            // Flip isActive for the clicked note-cell in our grid
            // add/remove note from currentNotes
            if (columnIndex === clickedColumn && cellIndex === clickedNote) {
              cellCopy.isActive = !cell.isActive;
              
              // notes.find(cell.note, cellIndex, columnIndex) ? swap with end and pop() : push()
              let tempIndex = currentNotes.findIndex(e => 
                e.note === cell.note && e.col === columnIndex);
              // if temp is FOUND in current notes, swap with end and pop()
              if(tempIndex !== -1) {
                let currNotes = currentNotes;    
                currNotes[tempIndex] = currNotes[currNotes.length-1];
                currNotes.pop();
                setCurrentNotes(currNotes);
              }
              // if not found, push to currentNotes
              else {
                  setCurrentNotes(currentNotes => [...currentNotes, {
                    note: cell.note,
                    row: cellIndex, 
                    col: columnIndex
                  }])
              }
                
            }
    
            return cellCopy;
          })
        );
        
        setGrid(updatedGrid);
    }

    const onCompositionRead = (comp) => {
        setLowOctave(comp.lowestOctave);
        setHighOctave(comp.highestOctave);
        let notes = comp.notes;
        // map over those notes
        // and call togglePadPressed
        notes.map((currNote) => {
            togglePadPressedClass(currNote.col, currNote.row);
        });
    } 

    function loadNotes(uid, compId) {
        // use compId + uid to get specific composition's notes
        readComposition(uid, compId, onCompositionRead);
    }
    
    const clearSelectedPads = () => {
        document.querySelectorAll(".pad-pressed").forEach(pad => {
          pad.classList.remove("pad-pressed");
        });
    }

    const handleBpmChange = event => {
        console.log(event.target.value);
        setBPM(event.target.value);
    }

    const callSetCompId = (key) => {
        console.log("SetCurrCompId function callback");
        setCurrCompId(key);
    }

    const saveNotes = () => {
        // sort the notes (just for fun)
        setCurrentNotes(currentNotes.sort(function(a, b) {
            return a.col - b.col;
        }))
        //console.log(currentNotes);
        let compInfo = {
            uid: uid,
            compId: currCompId,
            name: name,
            bpm: bpm,
            lowOctave: lowOctave,
            highOctave: highOctave,
        }
        // call to firebase function, saveComposition
        saveComposition(compInfo, currentNotes, callSetCompId);
        
    }

    const PlaySequence = async () => {
        // Variable for storing our notes in an appropriate format for our synth
        let notes = [];
        grid.map((step) => {
            let stepNotes = [];
            step.map(
                (shouldPlay) =>
                    // If isActive, push the given note + octave
                    // (shouldPlay.isActive) console.log(shouldPlay.note);
                    shouldPlay.isActive &&
                    stepNotes.push(shouldPlay.note)
            );
            notes.push(stepNotes);
        });

        //console.log(notes);
        // Starts our Tone Context
        await Tone.start();

        // Tone.Sequence()
        // @param callback
        // @param "events" to send with callback
        // @param subdivision  to engage callback
        const Sequencer = new Tone.Sequence(
            (time, step) => {
                // Highlight column with styling
                setCurrentColumn(step);

                // Sends the active note to our Polysynth
                synth.triggerAttackRelease(notes[step], "16n", time);
            },
            // can use [...Array(grid.length).keys()] 
            // to get the length of the grid dynamically
            [...Array(grid.length).keys()],
            "16n"
        );
        if (isPlaying) {
            // Turn of our player if music is currently playing
            setIsPlaying(false);
            setCurrentColumn(null);
      
            await Tone.Transport.stop();
            await Sequencer.stop();
            await Sequencer.clear();
            await Sequencer.dispose();
      
            return;
        }
        setIsPlaying(true);
        // Toggles playback of our musical masterpiece
        await Sequencer.start();
        await Tone.Transport.start();
    }


    return (
        <div>
            <div className="input-group mb-3 transparent-input">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                    
                </div>
                <input type="text" id="name" placeholder="Track X" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div id="sequencer">
                <div className="sequencer">
                    <div id="controls" className="buttons">
                        <button id="stop" className="navigation-buttons fa fa-stop" >
                            <BsFillPauseFill size={18}/>
                        </button>
                        <button id="play" className="navigation-buttons fa fa-play"
                            onClick={() => PlaySequence()}>
                            <BsPlayFill size={18}/>
                        </button>
                        <button id="record" className="navigation-buttons fa fa-microphone"
                            onClick={() => saveNotes()}>
                            <BiSave size={18}/>
                        </button>
                        <button id="delete" className="navigation-buttons fa fa-trash" 
                            onClick={() => clearSelectedPads()}>
                            <BsFillTrashFill size={18}/>
                        </button>
                        <button id="addLowerOctave" className="navigation-buttons " 
                            onClick={() => setLowOctave(lowOctave > 0 ? lowOctave - 1: lowOctave)}>
                            <BsArrowBarDown size={18}/>
                        </button>
                        <button id="addHigherOctave" className="navigation-buttons " 
                            onClick={() => setHighOctave(highOctave < 8 ? highOctave + 1: highOctave)}>
                            <BsArrowBarUp size={18}/>
                        </button>

                
                        <div className="select-wrapper">
                            <span>Instrument</span>
                            <select className="wave navigation-buttons" id="instrument-control" data-label="wave">
                                <option className="optionColor" value="sine">Synth</option>
                                <option value="sawtooth">Sawtooth</option>
                                <option value="square">Square</option>
                                <option value="triangle">Triangle</option>
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <span>Octave</span>
                            <select id="octave-control" data-label="octave" className="octave navigation-buttons">
                                <option> 1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <span>Style</span>
                            <select id="style-control" data-label="octave" className="BPM navigation-buttons">
                                <option>Legato</option>
                                <option>Staccato</option>
                            </select>
                        </div>

                        <div className="select-wrapper slide-container">

                            <br/>
                            <div className="input-container">
                                <span id="bpm-display"></span>
                                <input type="range" min="60" max="200" value={bpm} className="slider" id="bpm-slider" 
                                    onChange={handleBpmChange}/>
                            </div>
                        </div>

                        
                        <ul className="notes">
                            
                            <li>B#4</li>
                            <li>B4</li>
                            <li>A#4</li>
                            <li>A4</li>
                            <li>G#4</li>
                            <li>G4</li>
                            <li>F#4</li>
                            <li>F4</li>
                            <li>E4</li>
                            <li>D#4</li>
                            <li>D4</li>
                            <li>C#4</li>
                            <li>C4</li>
                        </ul>
                        
                        
                    </div>
                    <div className="flex">
                        {grid.map((step, stepIndex) => (
                        <div key={stepIndex + "step"} 
                            id={`step-${stepIndex+1}`} 
                            className={stepIndex === currentColumn && isPlaying ? 
                                "pads-column step-play" : "pads-column"}
                            >
                            
                            {step.map(({note, isActive}, noteIndex) => (
                            <Pad note={note} isActive={isActive}
                                onClick={() => togglePadPressedClass(stepIndex, noteIndex)}
                                key={`${note} + ${stepIndex}`}
                            />
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="socialsGroup">
                <SocialIcon network="facebook" url = "https://www.facebook.com" class="facebookIcon" />
                <SocialIcon network="twitter" url = "https://twitter.com" class="twitterIcon" />
                <SocialIcon network="instagram" url = "https://instagram.com" class="instagramIcon" />
                <SocialIcon network="spotify" url = "https://spotify.com" class="spotifyIcon" />
            </div>
        </div>
        
        
    )
}

export default Sequence;