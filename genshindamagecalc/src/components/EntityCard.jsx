import React from 'react';
import "../css/EntityCardStyling.css";
class EntityCard extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleOnClick.bind(this);
    this.passedOnClick = this.props.onClick.bind(this);
  }

  render(){
    if(this.props.mode === "portrait"){ //used as images to click on and drag 
      return <div onClick={this.handleClick}
                  className="card background-transparent portrait-size">
        <img
          className="img-fluid rounded"
          src={process.env.PUBLIC_URL + "/images/character_content/portrait/" + this.props.data.name.toLowerCase() + ".png"}
          alt="ffd"
          />
      </div>
    }
    else if(this.props.mode === "add"){ //used to add a new character
      return <div onClick={this.handleClick}
                  className="card background-transparent portrait-size">
        <img
          className="img-fluid rounded"
          src={process.env.PUBLIC_URL + "/images/add_image.png"}
          alt="add a new character"
          />
      </div>
    }
      return <div className="card">
      <img
          className="img-fluid rounded"
          src= {this.props.data.image}
          alt="arg"
          />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>;
  } //<a href="#" class="btn btn-primary">Go somewhere</a>

  /**
   * Passes this card's information to the parent module.
   */
  handleOnClick(){
    this.passedOnClick(this.props.mode, this.props.data);
  }
}

export default EntityCard;