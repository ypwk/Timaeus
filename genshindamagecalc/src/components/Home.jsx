import React from 'react';

import "../css/HomeStyling.css";

class Home extends React.Component{
    render(){
        return(
            <div className='home-container unselectable'>
                <img
                    className="image"
                    src={
                        process.env.PUBLIC_URL + "/images/title.png"
                    }
                    alt="timaeus"
                />
                <div className='title-text'>
                    <h1 class="display-1">
                        Timaeus
                    </h1>
                    <p class="lead">
                    this is a damage calculator or something
                    </p>
                    <p class="lead">
                    pleas give more primogem
                    </p>
                </div>
            </div>);
    }
}

export default Home;

