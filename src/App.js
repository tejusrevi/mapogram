import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import {Menu} from './components/Menu.js';
import {Card} from './components/Card.js';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
  apiKey: "API Key",
  authDomain: "map-o-gram.firebaseapp.com",
  databaseURL: "https://map-o-gram.firebaseio.com",
  projectId: "map-o-gram",
  storageBucket: "map-o-gram.appspot.com",
  messagingSenderId: "1047462531795",
  appId: "1:1047462531795:web:22fa8cde942cca08903a26",
  measurementId: "G-LZFV7WVYQL"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/*
const dRefObject = firebase.database().ref().child('object');

firebase.database().ref().child('object').push({
  latitude: 5,
  longitude: 9,
  heading : 0,
  pitch: 0,
  author: 'Geethika Revi'
});


dRefObject.on('value', snap=>console.log(snap.val()))
*/

var locationArr = [];




function App() {
  
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase.database().ref('object').on('value', (snap)=>{
      locationArr = [];
      Object.values(snap.val()).forEach(e=>{
        locationArr.push(e)
      })
      setData(locationArr);
    })
  },[]);
  

  return (
    <div className="App">
      <div id="menu-container">
        <Menu/>
      </div>
      <div id="content">
        {data.map(e =>
          <Card data={e}/>
        )}
          
      </div>
    </div>
  );
}

export default App;
