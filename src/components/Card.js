import React from 'react';

const Card = (props) =>{
    return(
        <div className="card">
            <button className="card-button">
                <div className="static-thumb" style= {{backgroundImage:'url(https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769&fov=80&heading=70&pitch=0&key=AIzaSyCnunObqBOdXA59S5Q11a0GXzTkJDC5bs0)'}}></div>
    <div className="added-by">{props.data.author}</div>
            </button>
        </div>
    )
}
export {Card};