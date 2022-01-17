import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"

import "../css/CharacterScreenStyling.css";

import { sword_data, claymore_data, polearm_data, catalyst_data, bow_data, sword_list, claymore_list, polearm_list, catalyst_list, bow_list } from '../data/weapon';
import { data_names } from '../data/character/character_name_index';
import { character_name_list } from "../data/character/character_name_list"
import { artifact_set_data } from '../data/artifact_sets'
import { constant_values } from '../data/constant_values';
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

        //binding
        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.handleArtifactCardClick = this.handleArtifactCardClick.bind(this);
        this.toggleWeaponModalState = this.toggleWeaponModalState.bind(this);
        this.toggleArtifactModalState = this.toggleArtifactModalState.bind(this);
        this.toggleModalState = this.toggleModalState.bind(this);
        this.saveModalThenClose = this.saveModalThenClose.bind(this);
        this.saveWeaponModalThenClose = this.saveWeaponModalThenClose.bind(this);
        this.saveArtifactModalThenClose = this.saveArtifactModalThenClose.bind(this);
        this.handleCharacterLevelChanged = this.handleCharacterLevelChanged.bind(this);
        this.handleCharacterConstellationChanged = this.handleCharacterConstellationChanged.bind(this);
        this.handleCharacterAscensionChanged = this.handleCharacterAscensionChanged.bind(this);
        this.handleCharacterTalentOneChanged = this.handleCharacterTalentOneChanged.bind(this);
        this.handleCharacterTalentTwoChanged = this.handleCharacterTalentTwoChanged.bind(this);
        this.handleCharacterTalentThreeChanged = this.handleCharacterTalentThreeChanged.bind(this);
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
        this.handleWeaponAscensionChanged = this.handleWeaponAscensionChanged.bind(this);
        this.fetchWeaponLevel = this.fetchWeaponLevel.bind(this);
        this.fetchWeaponAscension = this.fetchWeaponAscension.bind(this);
        this.fetchWeaponLevelLimit = this.fetchWeaponLevelLimit.bind(this);
        this.fetchWeaponRefine = this.fetchWeaponRefine.bind(this);
        this.fetchDefaultArtifacts = this.fetchDefaultArtifacts.bind(this);

        //references
        this.creationModalMenuRef = React.createRef();
        this.weaponModalMenuRef = React.createRef();
        this.characterLevelInputRef = React.createRef();
        this.characterConstellationInputRef = React.createRef();
        this.characterAscensionInputRef = React.createRef();
        this.characterLevelByAscensionRef = React.createRef();
        this.characterTalentOneRef = React.createRef();
        this.characterTalentTwoRef = React.createRef();
        this.characterTalentThreeRef = React.createRef();
        this.weaponLevelDisplayRef = React.createRef();
        this.weaponAscensionInputRef = React.createRef();
        this.weaponLevelInputRef = React.createRef();
        this.weaponRefineInputRef = React.createRef();

        //init state
        this.storageUtils = this.props.storageUtil;
        this.creationModalSelection = 0;
        this.weaponModalSelection = 0;
        this.artifactModalSelection = 0;
        this.artifactModalPiece = 0;
        this.charData = this.storageUtils.characterData;
        if(this.charData !== undefined && this.charData.length > 0){
            this.state = {
                ccData: 0,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false,
                artifactModalPiece: 0
            };
        } else {
            this.state = {
                ccData: null,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false,
                artifactModalPiece: 0
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
                    <Button variant="secondary" onClick={this.toggleWeaponModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveWeaponModalThenClose}>
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
                    <Button variant="secondary" onClick={this.toggleArtifactModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveArtifactModalThenClose}>
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
     * Handles clicks to artifact selection EntityCards
     * @param {} data 
     */
    handleArtifactCardClick(mode, data){
        if(mode === "artifact"){
            let pieceList = {
                "flower":0,
                "plume":1,
                "sands":2,
                "goblet":3,
                "circlet":4
            }
            this.toggleArtifactModalState();
            this.setState({artifactModalPiece: pieceList[data]});
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
    renderSelectedCharacterData(){
        if(this.charData[this.state.ccData] !== null && this.charData[this.state.ccData] !== undefined){
            const levelByAscension = [20, 40, 50, 60, 70, 80, 90]
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
                    <div className="input-group form-inline" key={this.state.ccData * 10 + 3}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">NA:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].talents[0]} onChange={this.handleCharacterTalentOneChanged}
                            aria-label="Character's Normal Attack Talent" aria-describedby="basic-addon2" ref={this.characterTalentOneRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">/ 10</span>
                        </div>
                    </div>
                    <div className="input-group form-inline" key={this.state.ccData * 10 + 4}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Skill:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].talents[1]} onChange={this.handleCharacterTalentTwoChanged}
                            aria-label="Character's Elemental Skill Talent" aria-describedby="basic-addon2" ref={this.characterTalentTwoRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">/ 10</span>
                        </div>
                    </div>
                    <div className="input-group form-inline" key={this.state.ccData * 10 + 5}>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Burst:</span>
                        </div>
                        <input type="text" className="form-control" 
                            defaultValue={this.charData[this.state.ccData].talents[2]} onChange={this.handleCharacterTalentThreeChanged}
                            aria-label="Character's Elemental Burst Talent" aria-describedby="basic-addon2" ref={this.characterTalentThreeRef}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">/ 10</span>
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
                    <EntityCard mode="weapon" onClick={this.handleCharacterCardClick} type={data_names[this.charData[this.state.ccData].name].weapon} weapon_data={this.charData[this.state.ccData].weapon}/>
                    <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="flower" artifact_data={this.charData[this.state.ccData].artifacts[0]} storageUtil={this.storageUtils}/> 
                    <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="plume" artifact_data={this.charData[this.state.ccData].artifacts[1]} storageUtil={this.storageUtils}/> 
                    <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="sands" artifact_data={this.charData[this.state.ccData].artifacts[2]} storageUtil={this.storageUtils}/> 
                    <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="goblet" artifact_data={this.charData[this.state.ccData].artifacts[3]} storageUtil={this.storageUtils}/> 
                    <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="circlet" artifact_data={this.charData[this.state.ccData].artifacts[4]} storageUtil={this.storageUtils}/>
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
     * Saves the content in the character modal
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
            "artifacts": [-1, -1, -1, -1, -1],
            "weapon": {}
        }
        this.creationModalSelection = 0;
        this.charData.push(new_char_file);
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
        this.setState({ccData: this.charData.length - 1});
        this.toggleModalState();
    }

    /**
     * Saves the content in the weapon modal to characterData
     * then closes it. 
     */
     saveWeaponModalThenClose(){
        //let data = data_names[character_name_list[this.creationModalSelection]];
        let listPointer = data_names[this.charData[this.state.ccData].name].weapon;
        let nlp;
        if(listPointer === "sword"){
            listPointer = sword_list;
            nlp = sword_data;
        } else if(listPointer === "claymore"){
            listPointer = claymore_list;
            nlp = claymore_data;
        } else if(listPointer === "polearm"){
            listPointer = polearm_list;
            nlp = polearm_data;
        } else if(listPointer === "catalyst"){
            listPointer = catalyst_list;
            nlp = catalyst_data;
        } else if(listPointer === "bow"){
            listPointer = bow_list;
            nlp = bow_data;
        }
        this.charData[this.state.ccData].weapon = {
            "name": listPointer[this.weaponModalSelection],
            "level": this.weaponLevelInputRef.current.value,
            "ascension": this.weaponAscensionInputRef.current.value,
            "refine": this.weaponRefineInputRef.current.value
        };
        this.weaponModalSelection = 0;
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
        this.toggleWeaponModalState();
    }

    /**
     * Saves the content in the artifact modal to characterData,
     * then closes it. 
     */
     saveArtifactModalThenClose(){
         if(this.artifactModalSelection !== undefined){
            this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece] = this.artifactModalSelection;
            this.storageUtils.artifactData[this.artifactModalSelection].character = this.state.ccData;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
            this.toggleArtifactModalState();
         }
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
        if(this.storageUtils.artifactData.length === 0){
            return (
                <>
                    <p>You have not created any artifacts! Visit the artifact page to make artifacts.</p>
                </>
            )
        } else {
            let artifacts = [];
            for(let a = 0; a < this.storageUtils.artifactData.length; a++){
                if(this.storageUtils.artifactData[a].type === this.state.artifactModalPiece && (this.storageUtils.artifactData[a].character === -1 || this.storageUtils.artifactData.character === this.state.ccData)){
                    let sp_artifact_data = artifact_set_data[this.storageUtils.artifactData[a].set];
                    let possibleNameList = [
                        sp_artifact_data.sets.flower,
                        sp_artifact_data.sets.plume,
                        sp_artifact_data.sets.sands,
                        sp_artifact_data.sets.goblet,
                        sp_artifact_data.sets.circlet,
                    ]
                    artifacts.push(<option value={a} key={a}>{possibleNameList[this.storageUtils.artifactData[a].type]} +{this.storageUtils.artifactData[a].level}</option>);
                }
            }
            if(artifacts.length === 0){
                return <>
                    <p>You have not created any {constant_values.pieceFormalNamesPlural[this.state.artifactModalPiece]}! Visit the artifact page to make artifacts.</p>
                </>
            } else {
                this.artifactModalSelection = artifacts[0].key;
                return (
                    <>
                        <FloatingLabel id="floatingSelect" label="Select Character:" className="mb-3" ref={this.creationModalMenuRef} onChange={e => this.artifactModalMenuOnSelect(e)}>
                            <Form.Select aria-label="Select character input box" defaultValue={this.fetchDefaultArtifacts()}>
                                {artifacts}
                            </Form.Select>
                        </FloatingLabel>
                    </>
                )
            }
        }
    }

    /**
     * Renders the weapon modal body.
     */
     renderWeaponModalBody() {
        //Format names and add them to the Form.
        let weaponNameList = [];
        if(this.state.ccData !== undefined && this.charData[this.state.ccData] !== undefined ){
            let listPointer = data_names[this.charData[this.state.ccData].name].weapon;
            let nlp;
            if(listPointer === "sword"){
                listPointer = sword_list;
                nlp = sword_data;
            } else if(listPointer === "claymore"){
                listPointer = claymore_list;
                nlp = claymore_data;
            } else if(listPointer === "polearm"){
                listPointer = polearm_list;
                nlp = polearm_data;
            } else if(listPointer === "catalyst"){
                listPointer = catalyst_list;
                nlp = catalyst_data;
            } else if(listPointer === "bow"){
                listPointer = bow_list;
                nlp = bow_data;
            }
            for(let i = 0; i < listPointer.length; i++){
                weaponNameList.push(<option value={i} key={i}>{nlp[listPointer[i]].name}</option>);
            }
        }
        return (
            <>
                <FloatingLabel id="floatingSelect" label="Select Weapon:" className="mb-3" ref={this.weaponModalMenuRef} onChange={e => this.weaponModalMenuOnSelect(e)}>
                    <Form.Select aria-label="Select weapon input box">
                        {weaponNameList}
                    </Form.Select>
                </FloatingLabel>
                <div className="input-group form-inline">
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Level:</span>
                    </div>
                    <input type="text" className="form-control" 
                        defaultValue={this.fetchWeaponLevel()}
                        aria-label="Weapon's Level" aria-describedby="basic-addon2" ref={this.weaponLevelInputRef}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2" ref={this.weaponLevelDisplayRef}>{this.fetchWeaponLevelLimit()}</span>
                    </div>
                </div>
                <div className="input-group form-inline">
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Ascension:</span>
                    </div>
                    <input type="text" className="form-control" 
                        defaultValue={this.fetchWeaponAscension()} onChange={this.handleWeaponAscensionChanged}
                        aria-label="Weapon's Ascension Level" aria-describedby="basic-addon2" ref={this.weaponAscensionInputRef}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">/ 6</span>
                    </div>
                </div>
                <div className="input-group form-inline">
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Refine:</span>
                    </div>
                    <input type="text" className="form-control" 
                        defaultValue={this.fetchWeaponRefine()}
                        aria-label="Weapon's Refine Level" aria-describedby="basic-addon2" ref={this.weaponRefineInputRef}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">/ 5</span>
                    </div>
                </div>
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
     * Sets the weaponModalSelection value when the weapon modal is set.
     * 
     * @param {*} e is the onChange event
     */
    weaponModalMenuOnSelect(e){
        this.weaponModalSelection = e.target.value;
    }

    /**
     * Sets the artifactModalSelection value when the artifact modal is set.
     * 
     * @param {*} e is the onChange event
     */
    artifactModalMenuOnSelect(e){
        this.artifactModalSelection = e.target.value;
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
     * Handles changes to the weapon ascension level textbox in Modal. 
     */
    handleWeaponAscensionChanged(){
        //check validity
        let valid = false;
        if(this.weaponAscensionInputRef.current.value >= 0 
           && this.weaponAscensionInputRef.current.value <= 6 
           && this.weaponAscensionInputRef.current.value !== ""){
            valid = true;
        }
        //change character level if valid
        if(valid){
           let ascension = parseInt(this.weaponAscensionInputRef.current.value);
           let currentLevel = parseInt(this.weaponLevelInputRef.current.value);
           const levelByAscension = [20, 40, 50, 60, 70, 80, 90];
           this.weaponLevelDisplayRef.current.textContent = "/ " + levelByAscension[ascension];
           if(currentLevel < levelByAscension[ascension - 1]){
               this.weaponLevelInputRef.current.value = levelByAscension[ascension - 1];
           } else if(currentLevel > levelByAscension[ascension]){
               this.weaponLevelInputRef.current.value = levelByAscension[ascension];
           }
        }
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
        else if(this.state.ccData === this.charData.length){
            this.setState({ccData: this.state.ccData - 1});
        } else {
            this.setState({ccData: this.state.ccData}); //re-render for fun HAHA
        }

        //remove character from long term storage
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
    }

    /**
     * Handles changes to the current character's first talent
     */
    handleCharacterTalentOneChanged(){
        let level = parseInt(this.characterTalentOneRef.current.value);
        if(level <= 10 && level > 0){
            this.charData[this.state.ccData].talents[0] = level;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
        }
    }

    /**
     * Handles changes to the current character's second talent
     */
    handleCharacterTalentTwoChanged(){
        let level = parseInt(this.characterTalentTwoRef.current.value);
        if(level <= 10 && level > 0){
            this.charData[this.state.ccData].talents[1] = level;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
        }
    }

    /**
     * Handles changes to the current character's third talent
     */
    handleCharacterTalentThreeChanged(){
        let level = parseInt(this.characterTalentThreeRef.current.value);
        if(level <= 10 && level > 0){
            this.charData[this.state.ccData].talents[2] = level;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
        }
    }
    /**
     * The following four functions provide proper values for rendering the weapon modal
     * @returns the proper weapon level, ascension, level, refine for rendering
     */
    fetchWeaponLevel(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            return this.charData[this.state.ccData].weapon.level;
        } else {
            return 1;
        }
    }
    fetchWeaponAscension(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            return this.charData[this.state.ccData].weapon.ascension;
        } else {
            return 0;
        }
    }
    fetchWeaponLevelLimit(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            const levelByAscension = [20, 40, 50, 60, 70, 80, 90];
            return "/ " + levelByAscension[this.charData[this.state.ccData].weapon.ascension];
        } else {
            return "/ 20";
        }
    }
    fetchWeaponRefine(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            return this.charData[this.state.ccData].weapon.refine;
        } else {
            return 1;
        }
    }
    fetchDefaultArtifacts(){
        if(this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece] !== -1){
            return this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece];
        }
        return 0;
    }
}

export default CharacterScreen;