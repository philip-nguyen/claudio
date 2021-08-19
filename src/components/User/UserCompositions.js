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

    // console.log(uid);
    let myComps = readCompositions(uid.uid);
    const getComps = async () => {
        const a = await myComps;
        console.log(a);
        myComps = a;
    }

    getComps();
    console.log(myComps);

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
                <UserSongList id="songList" compositions={myComps}>
                </UserSongList>
            </Row>
        </>
    );
}


export default UserCompositions;