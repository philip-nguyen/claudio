
import React, {useEffect, useState} from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import { readPublishedComps, readComposition } from "../fire";
import { playSequence } from "./ToneAPI"

import PropTypes from "prop-types";

import "./SongCard.css"

// npm install @material-ui/core
// npm install @material-ui/icons
// npm install react-icons

export default function SongCard({uid, compId, songName, likes}) {
    //state = { showPlayButton: true };
    const showPlayButton = true;
    //const [play, playComp] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [comp, setComp] = useState([]);
    const [currentUID, setUID] = useState(uid);
    const [currentCompId, setCompId] = useState(compId);


    let c = []; 
    let d = [];

    let numSteps = 16;
    let setCurrentColumn = undefined

    //Get published composition uids and compids 
    const readPubs = () => {
        // read pubs and send function call back to set comps
        readPublishedComps(onPubDataRead);
    }

    // function callback to work with the data from firebase
    const onPubDataRead = (pubComps) => {
        console.log("Calling on dataread");
        Object.keys(pubComps).forEach(function(key) {
            //console.log(key, pubComps[key].uid, pubComps[key].compId, pubComps[key].name);
            let item = pubComps[key];

            //console.log("test1: ", item.uid);
            //console.log("test2: ", item.compId);
            //console.log("pubComps:" + pubComps)

        {
             d.push({
                id: key,
                name: item.name,
                uid: item.uid,
                compId: item.compId
            })
        }
           
        });
       

    }
    

     // function callback to work with the data from firebase
     const onDataRead = (item) => {
        console.log("Calling on dataread SongCard");
        console.log("item.notes: ", item.notes);
        setComp(item.notes);
        //JSON object mapping
        /*Object.keys(items).forEach(function(key) {
            console.log(key, items[key]);
            let item = items[key];
            c.push({
                id: key,
                songName: item.name,
                bpm: item.bpm,
                likes: item.likes,
                lowOct: item.lowOct,
                highOct: item.highOct,
                notes: item.notes
            })
        });
        console.log("c is: ", c);
        console.log()
        setComps(c);
    */
    }

    function playComp() {
        loadNotes(uid, compId);
        console.log("numSteps: ", numSteps);
        console.log("comp", comp);
        playSequence(comp, isPlaying, numSteps, setIsPlaying, setCurrentColumn)
    }

    // gets notes from firebase to play composition 
    function loadNotes() {
        // use compId + uid to get specific composition's notes
        readComposition(uid, compId, onDataRead);
    }  

    return (


        <Container fluid id="container">
            <Card style={{ width: "65rem", height: "7rem" }}>
                <Card.Body id="body">
                    <Row sm={2}>
                        <Col sm={4}>
                            <Card.Title id="songTitle" style={{ fontSize: 25, color: "#3eb360" }}>
                                {songName}
                            </Card.Title>
                            {/*<Card.Subtitle id="date" className="mb-2 text-muted">
                                {props.timeDate}
                            </Card.Subtitle> 
                            */}
                        </Col>

                        <Col sm={2}>
                            <BsPlayFill id = "playButton" onClick={() => playComp()}></BsPlayFill>
                        </Col>   
                        <Col sm={2}>
                            <Card.Text id="likes">{likes}</Card.Text>
                        </Col>
                        
                        <Col sm={4}>
                            <Button id="likeButton" variant="primary">Like</Button>
                        </Col>
                    </Row>


                </Card.Body>

            </Card>
        </Container >


    );
}

SongCard.propTypes = {
    uid: PropTypes.string.isRequired,
    compId: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    timeDate: PropTypes.string
}
