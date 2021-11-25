import React from 'react';
import "../style.css";


export default function LoadingMessage({h1}) {

    return (
        <div className="alert alert-success">
            <div className="loader">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="content">
                    <p className="header">{h1}</p>
                    
                </div>
            </div>
            
        </div>
    )
}