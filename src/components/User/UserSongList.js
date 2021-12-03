import React, { Fragment } from "react";
import PropTypes from "prop-types";
import UserSongCard from "./UserSongCard.js"

export const songs = [
    { id: 1, name: 'Sample Track', likes: '101 Likes', timeDate: '2:33am . 11/14/2021' },
    { id: 2, name: 'Amazing Track', likes: '534 Likes', timeDate: '7:30pm . 11/15/2021' },
    { id: 3, name: 'Cool Track', likes: '258 Likes', timeDate: '12:30am . 11/16/2021' },
    { id: 4, name: 'Slow Track', likes: '356 Likes', timeDate: '6:45pm . 11/17/2021' },
];

export default function SongList({compositions, uid, handleCompClick}) {
    
    return (

        <div >
            <ul>
                { compositions ? compositions.map((value, index) => {
                    return <UserSongCard 
                            key={value.key}
                            uid={uid} 
                            compId={value.id}
                            songName={value.name} 
                            notes={value.notes}
                            likes={songs[index%4].likes}
                            timeDate={songs[index%4].timeDate}
                            handleCompClick={handleCompClick}
                            isPublished={value.published}
                            />
                            
                }) : ""}
            </ul>

        </div>

    );
}


