import React,{useEffect, useState} from 'react';
import './App.css';

import {Menu} from './components/Menu.js';
import {Card} from './components/Card.js';
import {Form} from './components/Form.js';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";


var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "map-o-gram.firebaseapp.com",
  databaseURL: "https://map-o-gram.firebaseio.com",
  projectId: "map-o-gram",
  storageBucket: "map-o-gram.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MES_ID"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/*
const dRefObject = firebase.database().ref().child('object');

firebase.database().ref().child('object').push({
  description: 'Parliament of Canada',
  latitude: 45.4232797,
  longitude: -75.6983771,
  heading : 322.74,
  pitch: 95.75,
  author: 'Tejus Revi'
});


dRefObject.on('value', snap=>console.log(snap.val()))
*/

var locationArr = [];

function save(lat,lng,head,pitch,desc,author){
  var unique = true;
  if (desc == null) desc = " ";
  if (author == null) author = "Anonymous";
  locationArr.forEach(e=>{
    if(e.latitude == lat && e.longitude == lng){
      unique = false;
    }
  })
  if (unique){
    firebase.database().ref().child('object').push({
      description: desc,
      latitude: lat,
      longitude: lng,
      heading : head,
      pitch: pitch,
      author: author
    });

    document.getElementById("save-button").innerHTML = "ADDED!";
    try {
      document.getElementsByClassName("card")[document.getElementsByClassName("card").length-1].scrollIntoView({behavior: "smooth"})
      setTimeout(()=>{document.getElementById("save-button").innerHTML = "SAVE";},3000)
    } catch (error) {
      
    }
    
  }else{
    window.alert("Umm... Seems like we already have this place in our list")
  }
  
}
function openDB(){
  firebase.database().ref('object').once('value', (snap)=>{
    if (snap.val() == null) return;
    var json = JSON.stringify(snap.val(), null, 2);

    var x = window.open();
    x.document.open();
    x.document.write('<html><body><pre>' + json + '</pre></body></html>');
    x.document.close();
  })
}
function App() {
  
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase.database().ref('object').on('value', (snap)=>{
      locationArr = [];
      if (snap.val() == null) return;
      Object.values(snap.val()).forEach(e=>{
        locationArr.push(e)
      })
      setData(locationArr);
    })
  },[]);
  

  return (
    <div className="App">
      <div id="menu-container">
        <Menu />
      </div>
      <div id="content">
        {data.map(e =>
          <Card data={e} key={e.latitude + "/"+e.longitude}/>
        )}
          
      </div>

      <div id="form-container">
        <Form save={save}/>
      </div>
      <div id="footer">
        <div>Made by <a href="http://tejus-revi.web.app/" target="_blank">Tejus Revi</a></div>
        <div><button id ="database-button" onClick={openDB}>View NoSQL Database</button></div>
      </div>
    </div>
  );
}

export default App;
