import React, { Fragment } from "react";
import PropTypes from "prop-types";
import UserSongCard from "./UserSongCard.js"

export const songs = [
    { id: 1, name: 'Sample Track', likes: '100 Likes', timeDate: '12:30am . 12/14/2020' },
    { id: 2, name: 'Amazing Track', likes: '500 Likes', timeDate: '12:30am . 12/15/2020' },
    { id: 3, name: 'Cool Track', likes: '200 Likes', timeDate: '12:30am . 12/16/2020' },
    { id: 4, name: 'Slow Track', likes: '356 Likes', timeDate: '12:30am . 12/17/2020' },
];

export default function SongList(props) {
    return (

        <div >
            <ul>
                {songs.map((value, index) => {
                    return <UserSongCard key={songs[index].id} songName={songs[index].name} likes=
                        {songs[index].likes} timeDate={songs[index].timeDate}></UserSongCard>
                })}
            </ul>

        </div>

    );
}


