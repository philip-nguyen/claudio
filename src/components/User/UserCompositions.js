import React from "react";
import "../Discover.css";
import UserSongList from "./UserSongList.js";
import { Button, Row, Col, } from "react-bootstrap";
import { readCompositions } from "./../../fire.js";

//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js

function getCompositions(uid) {
    
}



const UserCompositions = (uid) => {

    console.log(uid);
    readCompositions(uid.uid);
    
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


export default UserCompositions;