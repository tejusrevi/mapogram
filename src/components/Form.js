import React, {useState} from 'react';
import { auth } from 'firebase';

let map;
let panorama;




const Form = (props) =>{

    const [latitude,setLatitude] =useState(45.4232797);
    const [longitude,setLongitude] =useState(-75.6983771);
    const [heading,setHeading] =useState(323.57);
    const [pitch,setPitch] =useState(0);
    const [description,setDescription] = useState('My favorite place');
    const [author,setAuthor] =useState('Anonymous');

    document.onkeypress = function (e) {
        if(e.keyCode === 13){
            handleSearch();
        }
    };

    function handleSearch(){
        var address = document.getElementById("search-input").value;
        if(address == "") return;

        address = address.replace(/\s/g,"+")
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=API_KEY`)
        .then(response => response.json())
      .then(data => {
          setLatitude(data.results[0].geometry.location.lat);
          setLongitude(data.results[0].geometry.location.lng);
        map.setCenter({lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng});
        panorama.setPosition({lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng})});
    }

    function descriptionChange(desc){
        setDescription(desc.target.value)
    }

    function authorChange(auth){
        setAuthor(auth.target.value)
    }

    function initMap() {
        const fenway = { lat: latitude, lng: longitude };
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: fenway,
          zoom: 14
        });
        
        panorama = new window.google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: fenway,
            pov: {
              heading: heading,
              pitch: pitch
            },
            motionTracking: false,
            motionTrackingControl: false
          }
        );
        panorama.addListener('position_changed', function() {
            setDescription(panorama.location.description)
            setLatitude(panorama.position.lat())
            setLongitude(panorama.position.lng())
        });

        panorama.addListener('pov_changed', function() {
            setHeading(panorama.pov.heading)
            setPitch(panorama.pov.pitch)
        });
        map.setStreetView(panorama);
      }
      window.initMap = initMap.bind(this);

    return(
        <div className="form">
            <div id="add-tag"> ADD YOUR FAVORITE PLACE!</div>
            <div id="search">
                <input type="text" name="name" id="search-input" placeholder="Ottawa, ON, CA"/>
                <button id="search-button" onClick={()=>handleSearch()}></button>
            </div>
            <div id="map-instruction">Drag orange person icon to change Street View</div>
            <div id="map-container">
                <div className="viewport" id="map"/>
                <div className="viewport" id="pano"/>
            </div>
            <div className="divider"> • </div>
            <div id="save">
                <table id="table">
                    <tbody>
                <tr className="stat" id="latitude">
                    <td className="tag">Latitude : </td>
                    <td className="tag-value">{latitude}</td>
                </tr>
                <tr className="stat" id="longitude">
                    <td className="tag">Longitude : </td>
                    <td className="tag-value">{longitude}</td>
                </tr>
                <tr className="stat" id="heading">
                    <td className="tag">Heading : </td>
                    <td className="tag-value">{heading}</td>
                </tr>
                <tr className="stat" id="pitch">
                    <td className="tag">Pitch : </td>
                    <td className="tag-value">{pitch}</td>
                </tr>
                <tr className="stat" id="description-input">
                    <td className="tag">Description : </td>
                    <td><input className="tag-input" value={description} onChange={(e)=>descriptionChange(e)}/></td>
                </tr>

                <tr className="stat" id="author-input">
                    <td className="tag">Author : </td>
                    <td><input className="tag-input" value={author} onChange={(e)=>authorChange(e)}/></td>
                </tr>
                <tr id="button-container">
                    <td>
                    <button id="save-button" onClick={()=>props.save(latitude, longitude, heading, pitch, description, author)}>SAVE</button>
                    </td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
}
export {Form};