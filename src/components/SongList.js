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
    console.log(compositions)
    return (

        <div >
            <ul>
            { compositions ? compositions.map((value, index) => {
                    return <SongCard 
                            uid={value.uid} 
                            compId={value.compId}
                            songName={value.name} 
                            likes={songs[index%4].likes}
                            //timeDate={songs[index%4].timeDate}
                            //handleCompClick={handleCompClick}
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

