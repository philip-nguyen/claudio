import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SongCard from "./SongCard.js"
import { readPublishedComps, readCompositions } from "../fire";

export const songs = [
    { id: 1, name: 'Sample Track', likes: '100 Likes', timeDate: '12:30am . 12/14/2020' },
    { id: 2, name: 'Amazing Track', likes: '500 Likes', timeDate: '12:30am . 12/15/2020' },
    { id: 3, name: 'Cool Track', likes: '200 Likes', timeDate: '12:30am . 12/16/2020' },
    { id: 4, name: 'Slow Track', likes: '356 Likes', timeDate: '12:30am . 12/17/2020' },
];

export default function DiscoverSongList({compositions, uid, handleCompClick}) {
    const [comps, setComps] = useState([]);
    console.log("SongList test");

    // function callback to work with the data from firebase
    const onDataRead = (items) => {
        console.log("Calling on dataread SongCard");
        let c = [];

        //JSON object mapping
        Object.keys(items).forEach(function(key) {
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


    return (

        <div >
            <ul>
            { compositions ? compositions.map((value, index) => {
                    return <SongCard 
                            uid={uid} 
                            compId={value.id}
                            songName={value.name} 
                            likes={songs[index%4].likes}
                            //timeDate={songs[index%4].timeDate}
                            handleCompClick={handleCompClick}
                            //isPublished={value.published}
                            />
                            
                }) : ""}
            </ul>

        </div>

    );
}
{/*
DiscoverSongList.propTypes = {
    songList: PropTypes.array
}
*/}

