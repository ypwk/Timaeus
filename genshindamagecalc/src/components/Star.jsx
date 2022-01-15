import React from 'react';

import "../css/StarStyling.css";

class Star extends React.Component{
    render(){
        return<img
                className="rounded img-fluid unselectable star m-0"
                src={process.env.PUBLIC_URL + "/images/rarity_star_icon.png"}
                alt="rarity star"
            />
    }
}
export default Star;