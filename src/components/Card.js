import React from 'react';
var description = "-";
var author = "-";
const Card = (props) =>{

    function openMap(){
        window.open(`http://maps.google.com/maps?q=&layer=c&cbll=${props.data.latitude},${props.data.longitude}&cbp=11,${props.data.heading},0,0,${props.data.pitch}`, '_blank')
    }
    if (props.data.description !=null){
       description = props.data.description.substring(0,20);
    }
    if (props.data.author !=null){
        author = props.data.author.substring(0,12);
    }
    return(
        <div className="card" onClick={()=>openMap}>
            <button className="card-button" onClick={openMap}>
                <div className="static-thumb" style= {{backgroundImage:`url(https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${props.data.latitude},${props.data.longitude}&fov=80&heading=${props.data.heading}&pitch=${props.data.pitch}&key=API_KEY)`}}>
                    <div className="overlay"></div>
                </div>
                <div className="credits">
                <div className="description">{description}</div>
                    <div className="credit-tag">- Added by -</div>
                    <div className="author">{author}</div>
                </div>
            </button>
        </div>
    )
}
export {Card};