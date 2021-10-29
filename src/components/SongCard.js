
import React, {useEffect, useState} from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import { readPublishedComps, readComposition } from "../fire";


import PropTypes from "prop-types";

import "./SongCard.css"

// npm install @material-ui/core
// npm install @material-ui/icons
// npm install react-icons

export default function SongCard(props) {
    //state = { showPlayButton: true };
    
    const showPlayButton = true;
    const onClick = function(){}

    const [comps, setComps] = useState([]);

    // function callback to work with the data from firebase
    const onDataRead = (items) => {
        console.log("Calling on dataread SongCard");
        let c = [];

        //JSON object mapping
        Object.keys(items).for(function(key) {
            console.log(key, items[key]);
            let item = items[key];
            c.push({
                id: key,
                name: item.name,
                bpm: item.bpm,
                // likes: item.likes
                lowOct: item.lowOct,
                highOct: item.highOct,
                notes: item.notes
            })
        });
        setComps(c);
    }

    {/*
    const loadNotes = () => {
        // use compId + uid to get specific composition's notes
        readComposition(uid, compId, onDataRead);
    }
    */}
    const readPubs = () => {
        // read pubs and send function call back to set comps
        readPublishedComps(onPubDataRead);
    }

    // function callback to work with the data from firebase
    const onPubDataRead = (pubComps) => {
        console.log("Calling on dataread");
        let c = [];
        Object.keys(pubComps).forEach(function(key) {
            console.log(key, pubComps[key].uid, pubComps[key].compId, pubComps[key].name);
            let item = pubComps[key];
            c.push({
                id: key,
                name: item.name,

            })
        });
        console.log("pubComps:" + pubComps)
        console.log("c is: " + c);

        setComps(c);
    }
    {/* 
    useEffect(() => {
        readPubs();
    }, []);

    //fetch data from firebase (onDataRead)
    //
    //
    */}
    


    return (


        <Container fluid id="container">
            <Card style={{ width: "65rem", height: "7rem" }}>
                <Card.Body id="body">
                    <Row sm={2}>
                        <Col sm={4}>
                            <Card.Title id="songTitle" style={{ fontSize: 25, color: "#3eb360" }}>
                                {props.songName}
                            </Card.Title>
                            {/*<Card.Subtitle id="date" className="mb-2 text-muted">
                                {props.timeDate}
                            </Card.Subtitle> 
                            */}
                        </Col>

                        <Col sm={2}>
                            <BsPlayFill id = "playButton" onClick={onClick}></BsPlayFill>
                        </Col>   
                        <Col sm={2}>
                            <Card.Text id="likes">{props.likes}</Card.Text>
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
    uid: PropTypes.string,
    compId: PropTypes.string,
    songName: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    timeDate: PropTypes.string
}
