import React, { useEffect, useState } from "react";
import "../Discover.css";
import UserSongList from "./UserSongList.js";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import Sequence from "../Sequence.js";
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';


//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js


export default function UserCompositions() {

    
    return (
        <>
            <hr />
            
            {/* NAVBAR? */}

            <h1>Hello User</h1>
            <Row>
                <Col>
                    <p className="latest">Compositions</p>

                </Col>
                <Col>
                    <Button id="newComposition" variant="primary">
                        New 
                    </Button>
                </Col>
            </Row>
            <Row id="userSongListRow">
                <UserSongList id="songList">
                </UserSongList>
            </Row>
        </>
    );
}



