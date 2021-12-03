import React, { useEffect, useState } from "react";
import { readCompositions, readPublishedComps } from "../fire";
import "./Discover.css";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DiscoverSongList from "./SongList.js";
import { songs } from './SongList.js'
import { Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import UserSongList from "./User/UserSongList.js";

//import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";

//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js
//npm install react-social-media-buttons






const Discover = ({uid, handleCompClick}) => {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const [pubComps, setComps] = useState([]);
    let c = [];


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
            c.push({
                key: key,
                uid: item.uid,
                compId: item.compId,
                name: item.name,
                notes: item.notes,
                likes: item.likes
            })
        });
        setComps(c);
    }

    function sortByTag() {
        pubComps.sort((a, b) => (a.name > b.name) ? 1 : -1);
        document.getElementById('filter').innerHTML = "Name";
    }
    
    function sortByPopularity() {
        pubComps.sort((a, b) => (a.likes < b.likes) ? 1 : -1);
        document.getElementById('filter').innerHTML = "Likes";
    }
    
    function sortByDate() {
        pubComps.sort((a, b) => (a.key < b.key) ? 1 : -1)
        document.getElementById('filter').innerHTML = "Recent";
    }
    

    useEffect(() => {
        console.log("c is: ", c[0]);
        console.log("c:" , c)

        readPubs();
    }, []);


    return (
        <>
            <hr />
            <h1>Discover Community Compositions</h1>
            <div id="socialsGroup">
                <SocialIcon network="facebook" url = "https://www.facebook.com" className="facebookIcon" />
                <SocialIcon network="twitter" url = "https://twitter.com" className="twitterIcon" />
                <SocialIcon network="instagram" url = "https://instagram.com" className="instagramIcon" />
                <SocialIcon network="spotify" url = "https://spotify.com" className="spotifyIcon" />
            </div>



            <Row>
                <p className="latest">Latest</p>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="dropDown">
                    <DropdownToggle caret size='lg' id="filter">
                        Filter
                    </DropdownToggle>
                    <DropdownMenu id="menuChoices">
                        <DropdownItem id="tag" onClick={sortByTag}>Name</DropdownItem>
                        <DropdownItem id="popularity" onClick={sortByPopularity}>Likes</DropdownItem>
                        <DropdownItem id="recent" onClick={sortByDate}>Recent</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Row>
            <Row id="songListRow">
            <DiscoverSongList id="songList" compositions={pubComps} uid={uid} handleCompClick={handleCompClick}>
                </DiscoverSongList>
            </Row>
            
        </>
    );
}

export default Discover;

