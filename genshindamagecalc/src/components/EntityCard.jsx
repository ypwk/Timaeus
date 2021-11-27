import React from 'react';
import "../css/EntityCardStyling.css";
/**
 * This React Component represents any renderable card (e.g. the ones used in the CharacterScreen, ArtifactScreen,
 * and EnvironmentScreen)
 * 
 * It has a variety of different modes, each of which will render differently.
 * - portrait
 *    renders a simple portrait of a given character
 * - add
 *    renders an add button for adding custom character.
 * 
 * Props:
 * onClick is a method passed from a parent component used for this component.
 * mode is the mode that this card is rendering in.
 * data is the data that represents the character or artifact that is being rendered. 
 */
class EntityCard extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleOnClick.bind(this);
    this.passedOnClick = this.props.onClick.bind(this);
  }

  render(){
    if(this.props.mode === "portrait"){ //used as images to click on and drag 
      return <div onClick={this.handleClick}
                  className="card background-transparent portrait-size m-0">
          <img
            className="rounded img-fluid"
            src={process.env.PUBLIC_URL + "/images/character_content/face/" + this.props.data.name + "_face.png"}
            alt={this.props.data.name}
            />
      </div>
    }
    else if(this.props.mode === "add"){ //used to add a new character
      return <div onClick={this.handleClick}
                  className="card background-transparent portrait-size m-0">
        <img
          className="rounded img-fluid"
          src={process.env.PUBLIC_URL + "/images/add_image.png"}
          alt="add a new character"
          />
      </div>
    }
      return <div className="card m-0">
      <img
          className="rounded img-fluid"
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