import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { data_names } from '../data/character/character_name_index';
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
        this.toggleWeaponModalState = this.toggleWeaponModalState.bind(this);
        this.toggleArtifactModalState = this.toggleArtifactModalState.bind(this);
        this.toggleModalState = this.toggleModalState.bind(this);
        this.saveModalThenClose = this.saveModalThenClose.bind(this);
        this.handleCharacterLevelChanged = this.handleCharacterLevelChanged.bind(this);
        this.handleCharacterConstellationChanged = this.handleCharacterConstellationChanged.bind(this);
        this.handleCharacterAscensionChanged = this.handleCharacterAscensionChanged.bind(this);
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);

        //references
        this.creationModalMenuRef = React.createRef();
        this.characterLevelInputRef = React.createRef();
        this.characterConstellationInputRef = React.createRef();
        this.characterAscensionInputRef = React.createRef();
        this.characterLevelByAscensionRef = React.createRef();
        this.charData = this.storageUtils.characterData;
        //init state
        if(this.charData !== undefined && this.charData.length > 0){
            this.state = {
                ccData: 0,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false
            };
        } else {
            this.state = {
                ccData: null,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false
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
            <Modal onHide={this.toggleWeaponModalState} show={this.state.showWeaponModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Weapon</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderWeaponModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveModalThenClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal onHide={this.toggleArtifactModalState} show={this.state.showArtifactModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Artifact</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderArtifactModalBody()}</Modal.Body>
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
        let rTableData = [];
        let cRow = [];
        let count = 0;
        let currentRowCounter = 0;
        let location = 0;
        let totalCount = 0;
        for(var a = 0; a < this.charData.length; a++){
            if(count === 3){
                rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
                currentRowCounter++;
                cRow = [];
                count = 0;
            }
            cRow.push(<div className="col-auto" id={location} key={a}>
                <EntityCard mode="portrait" data={this.charData[location]} onClick={this.handleCharacterCardClick} card_id={totalCount}/>
            </div>);
            count++;
            totalCount++;
            location++;
        }
        if(count === 3){
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
            currentRowCounter++;
            cRow = []; //add extra add button
            cRow.push(<div className="col-auto" id={location} key={a}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick} card_id={totalCount}/>
            </div>);
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
        } else { //add extra add button
            cRow.push(<div className=" col-auto" id={location} key={a}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick} card_id={totalCount}/> 
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
        } if(mode === "weapon"){
            this.toggleWeaponModalState();
        } if(mode === "artifact"){
            this.toggleArtifactModalState();
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
    renderSelectedCharacterData(){
        if(this.charData[this.state.ccData] !== null && this.charData[this.state.ccData] !== undefined){
            const levelByAscension = [20, 40, 50, 60, 70, 80, 90]
            /*if(this.charData[this.state.ccData].level < levelByAscension[this.charData[this.state.ccData].ascension] && this.charData[this.state.ccData].ascension > 0){
                this.setState({ccData: levelByAscension[this.state.ccData.ascension - 1]});
                this.storageUtils.characterData = this.charData;
                this.storageUtils.saveData("character");
            }*/
            //<img src={process.env.PUBLIC_URL + "/images/ascension_star.png"}></img>
            return (
            <div className="row pt-2 h-100 character-detail-background">
                <div className="name-width col-3">
                    <p className="h1 inline text-left">{this.formatCharacterName(this.charData[this.state.ccData].name)}</p>
                    <img className="character-detail-img border border-dark rounded mb-3"
                        src={process.env.PUBLIC_URL + "/images/character_content/face/" + this.charData[this.state.ccData].name + "_face.png"}
                        alt={this.charData[this.state.ccData].name}/>
                    <div className="input-group form-inline" key={this.state.ccData * 10}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Lvl:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].level} onChange={this.handleCharacterLevelChanged}
                            aria-label="Character's Level" aria-describedby="basic-addon2" ref={this.characterLevelInputRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" 
                            id="basic-addon2" ref={this.characterLevelByAscensionRef}>/ {levelByAscension[this.charData[this.state.ccData].ascension]}</span>
                        </div>
                    </div>
                    <div className="input-group form-inline" key={this.state.ccData * 10 + 1}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Asc:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].ascension} onChange={this.handleCharacterAscensionChanged}
                            aria-label="Character's Ascension" aria-describedby="basic-addon2" ref={this.characterAscensionInputRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">/ 6</span>
                        </div>
                    </div>
                    <div className="input-group form-inline" key={this.state.ccData * 10 + 2}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Cons:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].constellation} onChange={this.handleCharacterConstellationChanged}
                            aria-label="Character's Constellation" aria-describedby="basic-addon2" ref={this.characterConstellationInputRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">/ 6</span>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="form-check-inline">
                        <input className="ascension-cbox" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="ascension-label" htmlFor="inlineCheckbox1">
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input className="ascension-cbox" type="checkbox" id="inlineCheckbox2" value="option2"/>
                        <label className="ascension-label" htmlFor="inlineCheckbox2"></label>
                    </div>
                    <div className="form-check-inline">
                        <input className="ascension-cbox" type="checkbox" id="inlineCheckbox3" value="option3"/>
                        <label className="ascension-label" htmlFor="inlineCheckbox3"></label>
                    </div>
                    <EntityCard mode="weapon" onClick={this.handleCharacterCardClick} type={data_names[this.charData[this.state.ccData].name].weapon} weapon_data={this.charData[this.state.ccData].weapon[0]}/>
                    <EntityCard mode="artifact" onClick={this.handleCharacterCardClick} type="flower" artifact_data={this.charData[this.state.ccData].artifacts[0]}/> 
                    <EntityCard mode="artifact" onClick={this.handleCharacterCardClick} type="plume" artifact_data={this.charData[this.state.ccData].artifacts[1]}/> 
                    <EntityCard mode="artifact" onClick={this.handleCharacterCardClick} type="sands" artifact_data={this.charData[this.state.ccData].artifacts[2]}/> 
                    <EntityCard mode="artifact" onClick={this.handleCharacterCardClick} type="goblet" artifact_data={this.charData[this.state.ccData].artifacts[3]}/> 
                    <EntityCard mode="artifact" onClick={this.handleCharacterCardClick} type="circlet" artifact_data={this.charData[this.state.ccData].artifacts[4]}/>
                    <Button onClick={this.handleDeleteButtonClicked}>
                        Delete
                    </Button>
                </div>
            </div>)
        } else {
            return (<div className="pt-2">
                <h1>You have not created any character profiles!</h1>
                <p>
                    Create one now by clicking on the plus on the left side of the screen.
                </p>
            </div>)
        }
    }

    /**
     * Toggles the modal state for the character modal.
     */
    toggleModalState(){
        this.setState({showModal: !this.state.showModal});
    }

    /**
     * Toggles the modal state for the character modal.
     */
     toggleWeaponModalState(){
        this.setState({showWeaponModal: !this.state.showWeaponModal});
    }

    /**
     * Toggles the modal state for the character modal.
     */
     toggleArtifactModalState(){
        this.setState({showArtifactModal: !this.state.showArtifactModal});
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
            "ascension": 0,
            "constellation": 0,
            "talents": [1, 1, 1],
            "artifacts": [],
            "weapon": {}
        }
        this.creationModalSelection = 0;
        this.charData.push(new_char_file);
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
        this.setState({ccData: this.charData[this.charData.length - 1]});
        this.toggleModalState();
    }

    /**
     * Renders the modal body.
     */
    renderModalBody() {
        //Format names and add them to the Form.
        let characterNameList = [];
        for(let i = 0; i < character_name_list.length; i++){
            characterNameList.push(<option value={i} key={i}>{this.formatCharacterName(character_name_list[i])}</option>);
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
     * Renders the modal body.
     */
     renderArtifactModalBody() {
        //Format names and add them to the Form.
        let characterNameList = [];
        for(let i = 0; i < character_name_list.length; i++){
            characterNameList.push(<option value={i} key={i}>{this.formatCharacterName(character_name_list[i])}</option>);
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
     * Renders the modal body.
     */
     renderWeaponModalBody() {
        //Format names and add them to the Form.
        let characterNameList = [];
        for(let i = 0; i < character_name_list.length; i++){
            characterNameList.push(<option value={i} key={i}>{this.formatCharacterName(character_name_list[i])}</option>);
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
     * @returns formatted character name
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

    /**
     * Handles changes to the character level textbox
     */
    handleCharacterLevelChanged(){
        const levelByAscension = [20, 40, 50, 60, 70, 80, 90];
        const level = parseInt(this.characterLevelInputRef.current.value);
        let valid = false;
        if(this.charData[this.state.ccData].ascension === 0){ //check if provided character level is valid
            if(level >= 1 && level <= 20){
                valid = true;
            }
        }
        else {
            if(level >= levelByAscension[this.charData[this.state.ccData].ascension - 1] && level <= levelByAscension[this.charData[this.state.ccData].ascension]){
                valid = true;
            }
        }
        if(valid){ //save data if valid
            this.charData[this.state.ccData].level = level;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
        } else { //show error if invalid
        }
    }

    /**
     * Handles changes to the character constellation textbox
     */
    handleCharacterConstellationChanged(){
        //check validity
        let valid = false;
        let constellation = parseInt(this.characterConstellationInputRef.current.value);
        if(this.characterConstellationInputRef.current.value >= 0 && this.characterConstellationInputRef.current.value <= 6){
            valid = true;
        }

        //save if valid
        if(valid){
            this.charData[this.state.ccData].constellation = constellation;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
        }
    }

    /**
     * Handles changes to the character ascension textbox
     */
    handleCharacterAscensionChanged(){
         //check validity
         let valid = false;
         if(this.characterAscensionInputRef.current.value >= 0 
            && this.characterAscensionInputRef.current.value <= 6 
            && this.characterAscensionInputRef.current.value !== ""){
             valid = true;
         }
         //change character level if valid
         if(valid){
            let ascension = parseInt(this.characterAscensionInputRef.current.value);
            const levelByAscension = [20, 40, 50, 60, 70, 80, 90];
            this.charData[this.state.ccData].ascension = ascension;
            this.characterLevelByAscensionRef.current.textContent = "/ " + levelByAscension[this.charData[this.state.ccData].ascension];
            if(this.charData[this.state.ccData].level < levelByAscension[this.charData[this.state.ccData].ascension - 1]){
                this.characterLevelInputRef.current.value = levelByAscension[this.charData[this.state.ccData].ascension - 1];
                this.charData[this.state.ccData].level = levelByAscension[this.charData[this.state.ccData].ascension - 1];
            } else if(this.charData[this.state.ccData].level > levelByAscension[this.charData[this.state.ccData].ascension]){
                this.characterLevelInputRef.current.value = levelByAscension[this.charData[this.state.ccData].ascension];
                this.charData[this.state.ccData].level = levelByAscension[this.charData[this.state.ccData].ascension];
            }
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
         }
         //save if valid
         if(valid){
             
         }
    }

    /**
     * Handles clicks to the delete character button
     */
    handleDeleteButtonClicked(){
        //remove character from state
        this.charData.splice(this.state.ccData, 1);

        //handle side effects of removal
        if(this.charData.length === 0){
            this.setState({ccData: null});
        }
        else if(this.state.ccData == this.charData.length){
            this.setState({ccData: this.state.ccData - 1});
        } else {
            this.setState({ccData: this.state.ccData}); //re-render for fun HAHA
        }

        //remove character from long term storage
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
    }
}

export default CharacterScreen;