import React from 'react';

const Menu = (props) =>{
    return(
    <div id="menu-bar">
        <header id="header">
            <div id="home">
                MAPOGRAM
            </div>
            <div id="caption">
                AMAZING PLACES AROUND THE WORLD 🌍
            </div>
        </header>
        <div id="menu">
            <div className="menu-item">
                <button id="me-button" className="menu-button" onClick={()=>window.open('http://tejus-revi.web.app/', '_blank')}>ME</button>
            </div>
            <div className="menu-item">
                <button className="menu-button" onClick={()=>window.open('https://github.com/tejusrevi/mapogram', '_blank')}>GITHUB</button>
            </div>
            <div className="menu-item">
                <button className="menu-button" >HOME</button>
            </div>
            
        </div>
    </div>
    )
    
}

export {Menu};