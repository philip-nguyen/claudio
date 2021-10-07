import React, { useState, useEffect } from "react";
import "../Discover.css";
import UserSongList from "./UserSongList.js";
import { Button, Row, Col, } from "react-bootstrap";
import { readCompositions } from "./../../fire.js";

//import SongList from "../SongList.js";
import { SocialIcon } from "react-social-icons";


//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js


const UserCompositions = ({uid, handleCompClick}) => {
    // function components
    const [comps, setComps] = useState([]);

    const onDataRead = (items) => {
        console.log("Calling on dataread");
        
        let c = [];

        //JSON object mapping
        Object.keys(items).forEach(function(key) {
            console.log(key, items[key]);
            let item = items[key];
            c.push({
                id: key,
                name: item.name,
                bpm: item.bpm,
                highestOctave: item.highestOctave,
                notes: item.notes
            })
        });
        
        setComps(c);
    }

    useEffect(() => {
        readCompositions(uid, onDataRead);
    }, []);

    return (
        <>
            <hr />
            
            {/* NAVBAR? */}

            <h1>Hello User</h1>
            <div id="socialsGroup">
                <SocialIcon network="facebook" url = "https://www.facebook.com" class="facebookIcon" />
                <SocialIcon network="twitter" url = "https://twitter.com" class="twitterIcon" />
                <SocialIcon network="instagram" url = "https://instagram.com" class="instagramIcon" />
                <SocialIcon network="spotify" url = "https://spotify.com" class="spotifyIcon" />
            </div>
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
            <UserSongList id="songList" compositions={comps} uid={uid} handleCompClick={handleCompClick}>
                </UserSongList>
            </Row>
        </>
    );
}


export default UserCompositions;