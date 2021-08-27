
import React, {useState} from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import PlayPause from "../PlayPause";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sequence from './../Sequence';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import "../SongCard.css"

// npm install @material-ui/core
// npm install @material-ui/icons
// npm install react-icons

export default function UserSongCard(props) {
    //state = { showPlayButton: true };
    
    const showPlayButton = true;

    return (


        <Container fluid id="container">
            <Card style={{ width: "65rem", height: "7rem" }}>
                <Card.Body id="body">
                    <Row sm={2}>
                        <Col sm={4}>
                            <Card.Title id="songTitle" style={{ fontSize: 25, color: "#3eb360" }}>
                                
                                {props.songName}
                            </Card.Title>
                            <Card.Subtitle id="date" className="mb-2 text-muted">
                                {props.timeDate}
                            </Card.Subtitle>
                        </Col>

                        <Col sm={2}>
                            <BsPlayFill id = "playButton2"></BsPlayFill>
                        </Col>

                        <Col sm={2}>
                            <Card.Text id="likes2">{props.likes}</Card.Text>
                        </Col>
                        <Col sm={2}>
                            <Button id="likeButton2" variant="primary">Like</Button>
                        </Col>
                        
                        <Col sm={2}>
                        <Button id="deleteButton" variant="primary">Delete</Button>

                        </Col>
                    </Row>


                </Card.Body>

            </Card>
        </Container >


    );
}

UserSongCard.propTypes = {
    songName: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    timeDate: PropTypes.string.isRequired
}

/**
 * <Router>
        <Switch>
            <Route path='/seqeunce' 
                render={() => (
                    <Sequence uid={props.uid} compId={props.compId}/>
                )}
            />
        </Switch>
    </Router>
 */