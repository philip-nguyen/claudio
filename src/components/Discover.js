import React, { useState } from "react";
import { readPublishedComps } from "../fire";
import "./Discover.css";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SongList from "./SongList.js";
import { songs } from './SongList.js'
import { Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
//import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";

//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js
//npm install react-social-media-buttons


function sortByTag() {
    songs.sort((a, b) => (a.name > b.name) ? 1 : -1);
    document.getElementById('filter').innerHTML = "Tag";
}

function sortByPopularity() {
    songs.sort((a, b) => (a.likes < b.likes) ? 1 : -1);
    document.getElementById('filter').innerHTML = "Popularity";
}

function sortByDate() {
    songs.sort((a, b) => (a.timeDate < b.timeDate) ? 1 : -1)
    document.getElementById('filter').innerHTML = "Date";
}



export default function Discover() {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    const readPubs = () => {
        // read pubs and send function call back to set comps
        readPublishedComps(onPubDataRead);
    }

    // function callback to work with the data from firebase
    const onPubDataRead = (pubComps) => {
        Object.keys(pubComps).forEach(function(key) {
            console.log(key, pubComps[key].uid, pubComps[key].compId, pubComps[key].name);
        });
    }

    return (
        <>
            <hr />

            


            <h1>Discover Community Compositions</h1>
            <div id="socialsGroup">
                <SocialIcon network="facebook" url = "https://www.facebook.com" class="facebookIcon" />
                <SocialIcon network="twitter" url = "https://twitter.com" class="twitterIcon" />
                <SocialIcon network="instagram" url = "https://instagram.com" class="instagramIcon" />
                <SocialIcon network="spotify" url = "https://spotify.com" class="spotifyIcon" />
            </div>



            <Row>
                <p className="latest">Latest</p>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="dropDown">
                    <DropdownToggle caret size='lg' id="filter">
                        Filter
                    </DropdownToggle>
                    <DropdownMenu id="menuChoices">
                        <DropdownItem id="tag" onClick={sortByTag}>tag</DropdownItem>
                        <DropdownItem id="popularity" onClick={sortByPopularity}>popularity</DropdownItem>
                        <DropdownItem id="recent" onClick={sortByDate}>recent</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Row>
            <Row id="songListRow">
                <SongList id="songList">
                </SongList>
            </Row>
            
        </>
    );
}



