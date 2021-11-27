import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import * as charDetailedData from "../data/character/index";

import "../css/CharacterScreenStyling.css";

import {character_name_list} from "../data/character/character_name_list"
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
        this.storageUtils = this.props.storageUtil;
        this.creationModalSelection = 0;

        //binding
        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.toggleModalState = this.toggleModalState.bind(this);
        this.saveModalThenClose = this.saveModalThenClose.bind(this);

        //references
        this.creationModalMenuRef = React.createRef();

        //init state
        if(this.storageUtils.characterData !== undefined){
            console.log(this.storageUtils.characterData);
            this.state = {
                ccData: this.storageUtils.characterData[0],
                showModal: false
            };
        } else {
            this.state = {
                ccData: null,
                showModal: false
            };
        }    
    }

    render(){
        return <div className="overflow-hidden p-0">
            <div className="row">
                <div className="d-inline col-auto character-card-tray">
                    {this.renderCharacterCards()}
                </div>
                <div className="d-inline col character-details-tray">
                    {this.renderSelectedCharacterData()}
                </div>
            </div>
            <Modal onHide={this.toggleModalState} show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Character Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveModalThenClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
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
        for(var a = 0; a < this.storageUtils.characterData.length; a++){
            if(count === 3){
                rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
                currentRowCounter++;
                cRow = [];
                count = 0;
            }
            cRow.push(<div className="col-auto" id={location}>
                <EntityCard mode="portrait" data={this.storageUtils.characterData[location]} onClick={this.handleCharacterCardClick}/>
            </div>);
            count++;
            location++;
        }
        if(count === 3){
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
            currentRowCounter++;
            cRow = []; //add extra add button
            cRow.push(<div className="col-auto" id={location}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick}/>
            </div>);
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
        } else { //add extra add button
            cRow.push(<div className=" col-auto" id={location}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick}/> 
            </div>);
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push remaining EntityCards
        }
        return (<div className="container">{rTableData}</div>);
    }

    /**
     * Handles clicks to EntityCards located on the right of the screen.
     */
    handleCharacterCardClick(mode, data){
        if(mode === "portrait"){
            this.setState({ccData: data});
        } if(mode === "add"){
            this.toggleModalState();
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
    renderSelectedCharacterData(){
        if(this.state.ccData !== undefined){
            return (
            <div className="pt-2 h-100 character-detail-background">
                <h1>{this.formatCharacterName(this.state.ccData.name)}</h1>
                <img className="character-detail-img float-end border border-dark rounded"
                    src={process.env.PUBLIC_URL + "/images/character_content/face/" + this.state.ccData.name + "_face.png"}/>
                <p>
                    Level: {this.state.ccData.level} <br></br>
                    Ascension: {this.state.ccData.ascension} <br></br>
                    Talents: {this.state.ccData.talents[0]} {this.state.ccData.talents[1]} {this.state.ccData.talents[2]} <br></br>
                    Weapon: {this.state.ccData.weapon} <br></br>
                </p>
            </div>)
        } else {
            console.log("piss" + this.state.ccData);
            return (<div className="pt-2">
                <h1>You have not created any character profiles!</h1>
                <p>
                    Create one now by clicking on the plus on the left side of the screen.
                </p>
            </div>)
        }
    }

    /**
     * Toggles the modal state.
     */
    toggleModalState(){
        this.setState({showModal: !this.state.showModal});
    }

    /**
     * Saves the content in the modal (appending it to characterData),
     * then closes it. 
     */
    saveModalThenClose(){
        //let data = data_names[character_name_list[this.creationModalSelection]];
        let new_char_file = {
            "name": character_name_list[this.creationModalSelection],
            "level": 1,
            "ascension": 1,
            "constellation": 0,
            "talents": [1, 1, 1],
            "artifacts": [],
            "weapon": -1
        }
        this.storageUtils.characterData.push(new_char_file);
        this.storageUtils.saveData("character");
        this.setState({ccData: new_char_file});
        this.toggleModalState();
    }

    /**
     * Renders the modal body.
     */
    renderModalBody() {
        //Format names and add them to the Form.
        let characterNameList = [];
        for(let i = 0; i < character_name_list.length; i++){
            characterNameList.push(<option value={i}>{this.formatCharacterName(character_name_list[i])}</option>);
        }
        return (
            <>
                <FloatingLabel id="floatingSelect" label="Select Character:" className="mb-3" ref={this.creationModalMenuRef} onChange={e => this.creationModalMenuOnSelect(e)}>
                    <Form.Select aria-label="Select character input box">
                        {characterNameList}
                    </Form.Select>
                </FloatingLabel>
            </>
        )
    }

    /**
     * Sets the creationModalSelection value when the creation modal is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalMenuOnSelect(e){
        this.creationModalSelection = e.target.value;
    }

    /**
     * Returns a formatted version of a character name
     * Ex: kamisato_ayaka is turned into Kamisato Ayaka
     * 
     * @param {} raw_name is the raw name string obtained from storage
     * @returns 
     */
    formatCharacterName(raw_name){
        let delimited_arr = raw_name.split("_");
        let finalizedNameString = "";
        for(let a = 0; a < delimited_arr.length; a++){
            finalizedNameString = finalizedNameString 
            + delimited_arr[a].charAt(0).toUpperCase() 
            + delimited_arr[a].slice(1);
            if(a !== delimited_arr.length - 1){
                finalizedNameString += " ";
            }
        }
        return finalizedNameString;
    }

    loadFile(filePath) {
        
      }
}

export default CharacterScreen;