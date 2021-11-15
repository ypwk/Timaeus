import React from 'react';
import EntityCard from './EntityCard';
import {characterData} from '../data/characterData.js';
import "../css/CharacterScreenStyling.css";

/**
 * This React Component is an approximation for the character screen in Genshin. 
 * 
 * On the right side, it uses EntityCards to render an array of characters so that users can select a specific character. 
 * On the left side, it renders specific information for selected characters, and allows users to edit their character's builds.  
 * 
 * State:
 * - ccData
 *    current character data - the data belonging to the character that is currently selected. 
 */
class CharacterScreen extends React.Component{

    constructor(props){
        super(props);
        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.state = {
            ccData: characterData[0]
        };
    }

    render(){
        return <div className="">
            <div className="row w-100">
                <div className="col">
                    <div className="container p-0">
                        <table className="table p-0">
                            <tbody>
                                {this.renderCharacterCards()}
                            </tbody>
                        </table>
                    </div>
                
                </div>
                <div className="col">
                    {this.renderSelectedCharacterData()}
                </div>
            </div>
        </div>;
    }

    /**
     * Prepares a table of all character cards.
     * @returns a table containing all the EntityCards needed to render in the CharacterScreen.
     */
    renderCharacterCards(){
        var rTableData = [];
        var cRow = [];
        var count = 0;
        var currentRowCounter = 0;
        var location = 0;
        for(var a = 0; a < characterData.length; a++){
            if(count === 6){
                rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
                currentRowCounter++;
                cRow = [];
                count = 0;
            }
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="portrait" data={characterData[location]} onClick={this.handleCharacterCardClick}/>
            </td>);
            count++;
            location++;
        }
        if(count === 6){
            rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
            currentRowCounter++;
            cRow = []; //add extra add button
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="add" onClick={() => this.handleCharacterCardClick}/>
            </td>);
            rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
        } else { //add extra add button
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="add" onClick={() => this.handleCharacterCardClick}/> 
            </td>);
            rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push remaining EntityCards
        }
        return <table className="table p-0">
            <tbody>
                {rTableData}
            </tbody>
        </table>
    }

    /**
     * Handles clicks to EntityCards located on the right of the screen.
     */
    handleCharacterCardClick(mode, data){
        if(mode === "portrait"){
            this.setState({ccData: data});
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
    renderSelectedCharacterData(){
        return (<div className="pt-2">
            <h1>{this.state.ccData.name}</h1>
            <div onClick={this.handleClick}
                  className="card background-transparent character-screen-portrait-size float-end">
                <img
                    className="img-fluid rounded"
                    src={process.env.PUBLIC_URL + "/images/character_content/splash/" + this.state.ccData.name.toLowerCase() + "_splash.png"}
                    alt="ffd"
                    />
            </div>
            <p>
                Level: {this.state.ccData.level} <br></br>
                Ascension: {this.state.ccData.ascension} <br></br>
                Talents: {this.state.ccData.talents}
            </p>
        </div>)
    }
}

export default CharacterScreen;