import React, { useEffect, useState } from "react";

import "./Discover.css"
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, toggle } from 'reactstrap';
import { useTable } from 'react-table';
import SongList from "./SongList.js";
import SongCard from "./SongCard.js";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

//npm install react-table
//npm install react-bootstrap bootstrap
//npm install --save reactstrap
//npm i --save bootstrap jquery popper.js

export default function Discover() {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    const songs = [
        { id: 1, name: 'Sample Track', likes: '100 Likes', timeDate: '12:30am . 12/14/2020' },
        { id: 2, name: 'Amazing Track', likes: '500 Likes', timeDate: '12:30am . 12/15/2020' },
        { id: 3, name: 'Cool Track', likes: '200 Likes', timeDate: '12:30am . 12/16/2020' },
        { id: 4, name: 'Slow Track', likes: '356 Likes', timeDate: '12:30am . 12/17/2020' },
    ];



    return (
        <>
            <hr />
            <hr id="line2" />
            <h1>Discover Community Compositions</h1>
            <Row>
                <p className="latest">Latest</p>
                <p id="sortText"style={{ color: "#3eb360"}}>Sort By</p>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown">
                    <DropdownToggle caret size='lg'>
                        Filter
                </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>tag</DropdownItem>
                        <DropdownItem>popularity</DropdownItem>
                        <DropdownItem>recent</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Row>
            <Row id="songList">
            <SongList >

            </SongList>
            </Row>
            




        </>
    )
}

