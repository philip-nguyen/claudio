import React, { useState, useEffect } from 'react';
import '../style.css';
import Pad from './Pad';
import * as Tone from 'tone';
import { playSequence } from './ToneAPI';
import { BsPlayFill, BsFillPauseFill, 
    BsFillTrashFill, BsArrowBarDown, 
    BsArrowBarUp, BsFillCpuFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { saveComposition, readComposition } from './../fire.js';
import { SocialIcon } from "react-social-icons";
import { sendNotesArray } from './MLInterface';



const noteNames = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B", "B#"];


const Sequence = ({uid, compId}) => {
    
    // range of octaves, [lowOctave, highOctave]
    const [highOctave, setHighOctave] = useState(4);
    const [lowOctave, setLowOctave] = useState(4);

    // A nested array of objects is not performant, but is easier to understand
    // performance is not an issue at this stage anyway
    const[currentNotes, setCurrentNotes] = useState([]);
    const[grid, setGrid] = useState([]);

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

    // run load notes ONCE at the start, and if there is a compId 
    useEffect(() => {
        if(compId) loadNotes(uid, compId);
    },[]);

    // when currentNotes changes from loadNotes, set the grid
    useEffect(() => {
        setGrid(mapMeasure);
    },[currentNotes]);

    function mapMeasure() {
        // complete 13*(high-low) X 16 length (init)
        const measure = [];
        // TODO: check this console.log
        // console.log("lowOct", lowOctave, "highOct", highOctave);
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
        console.log("onCompositionRead function called");
        setLowOctave(comp.lowestOctave);
        setHighOctave(comp.highestOctave);
        // console.log("high oct", highOctave); // shows 4 bc setState is async
        setCurrentNotes(comp.notes);
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

    const playSeq = () => {
        // Tone API call
        playSequence(currentNotes, isPlaying, grid.length, setIsPlaying, setCurrentColumn);
    }
    
    const mlGenerate = () => {
        sendNotesArray(currentNotes, addMlGeneratedNotes);
    }

    const addMlGeneratedNotes = (notes) => {
        //console.log(notes);
        for(let i = 0; i < notes.length; i++) {
            console.log(notes[i]);
            // TODO: check if array, parse the string if -, bring down a note, add octave if none
            // use of regex?
        }
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
                            onClick={() => playSeq()}>
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
                        <button id="predict" className="navigation-buttons"
                            onClick={() => mlGenerate()} >
                                <BsFillCpuFill size={18} /> 
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
                <SocialIcon network="facebook" url = "https://www.facebook.com" className="facebookIcon" />
                <SocialIcon network="twitter" url = "https://twitter.com" className="twitterIcon" />
                <SocialIcon network="instagram" url = "https://instagram.com" className="instagramIcon" />
                <SocialIcon network="spotify" url = "https://spotify.com" className="spotifyIcon" />
            </div>
        </div>
        
        
    )
}

export default Sequence;