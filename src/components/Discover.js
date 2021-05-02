import React, { useEffect, useState } from "react";
import "./Discover.css";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, toggle } from 'reactstrap';
import { useTable } from 'react-table';
import SongList from "./SongList.js";
import { songs } from './SongList.js'
import { Button, Card, Row, Col, Container } from "react-bootstrap";

//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js

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

    return (
        <>
            <hr />
            
            <h1>Discover Community Compositions</h1>
            <Row>
                <p className="latest">Latest</p>
                <p id="sortText" style={{ color: "#3eb360" }}>Sort By</p>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="dropDown">
                    <DropdownToggle caret size='lg' id="filter">
                        Filter
                </DropdownToggle>
                    <DropdownMenu id="menuChoices">
                        <DropdownItem id="tag" onClick={sortByTag}>tag</DropdownItem>
                        <DropdownItem id="popularity" onClick={sortByPopularity}>popularity</DropdownItem>
                        <DropdownItem id="recent"onClick={sortByDate}>recent</DropdownItem>
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



