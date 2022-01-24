import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"

import "../css/CharacterScreenStyling.css";

import { sword_data, claymore_data, polearm_data, catalyst_data, bow_data, sword_list, claymore_list, polearm_list, catalyst_list, bow_list } from '../data/weapon';
import { data_names } from '../data/character/character_name_index';
import { character_name_list } from "../data/character/character_name_list";
import calcUtils from "../utils/calcUtils";
import { artifact_set_data } from '../data/artifact_sets';
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
        this.saveCharacterModalThenClose = this.saveCharacterModalThenClose.bind(this);
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
        this.artifactModalSelection = 0;
        this.artifactModalPiece = 0;
        this.charData = this.storageUtils.characterData;
        if(this.charData !== undefined && this.charData.length > 0){
            let listPointer = data_names[this.charData[0].name].weapon;
            if(listPointer === "sword"){
                listPointer = sword_list;
            } else if(listPointer === "claymore"){
                listPointer = claymore_list;
            } else if(listPointer === "polearm"){
                listPointer = polearm_list;
            } else if(listPointer === "catalyst"){
                listPointer = catalyst_list;
            } else if(listPointer === "bow"){
                listPointer = bow_list;
            }
            if(this.charData[0].weapon.name !== undefined){
                for(let a = 0; a < listPointer.length; a++){
                    if(listPointer[a] === this.charData[0].weapon.name){
                        listPointer = a;
                        break;
                    }
                }
            } else {
                listPointer = 0;
            }
            
            this.state = {
                ccData: 0,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false,
                artifactModalPiece: 0,
                weaponModalSelection: listPointer
            };
        } else {
            this.state = {
                ccData: null,
                showModal: false,
                showWeaponModal: false,
                showArtifactModal: false,
                artifactModalPiece: 0,
                weaponModalSelection: 0
            };
        }
    }

    render(){
        return <div className="p-0 d-flex">
            <div className="concrete-char-display">
                <div className="character-card-tray">
                    {this.renderCharacterCards()}
                </div>
                <div className="character-details-tray">
                    {this.renderSelectedCharacterData()}
                </div>
            </div>
            <Modal onHide={this.toggleModalState} show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Character Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderCharacterModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveCharacterModalThenClose}>
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
        let ccards = [];
        for(var a = 0; a < this.charData.length; a++){
            ccards.push(<div className="c-portrait-auto" id={a} key={a}>
                <EntityCard mode="portrait" data={this.charData[a]} onClick={this.handleCharacterCardClick} card_id={a}/>
            </div>);
        }
        ccards.push(<div className="c-portrait-auto" id={this.charData.length} key={this.charData.length}>
            <EntityCard mode="add" onClick={this.handleCharacterCardClick} card_id={this.charData.length}/>
        </div>);
        for(let a = 0; a < 4; a++){
            ccards.push(<div className='hidden-portrait-auto' key={this.charData.length + a + 1}></div>)
        }
        return (<div className="flex-container box wrap">{ccards}</div>);
    }

    /**
     * Handles clicks to EntityCards located on the right of the screen.
     */
    handleCharacterCardClick(mode, data){
        if(mode === "portrait"){
            let listPointer = data_names[this.charData[data].name].weapon;
            if(listPointer === "sword"){
                listPointer = sword_list;
            } else if(listPointer === "claymore"){
                listPointer = claymore_list;
            } else if(listPointer === "polearm"){
                listPointer = polearm_list;
            } else if(listPointer === "catalyst"){
                listPointer = catalyst_list;
            } else if(listPointer === "bow"){
                listPointer = bow_list;
            }
            if(this.charData[data].weapon.name !== undefined){
                for(let a = 0; a < listPointer.length; a++){
                    if(listPointer[a] === this.charData[data].weapon.name){
                        listPointer = a;
                        break;
                    }
                }
            } else {
                listPointer = 0;
            }
            this.setState({
                ccData: data,
                weaponModalSelection: listPointer
            });
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
            let stats = calcUtils.calcAll(this.charData[this.state.ccData], this.storageUtils.artifactData);
            return (
            <div className="id-section">
                <div className='id-section-name'>
                    <p className="h1 inline text-left m-2">{this.formatCharacterName(this.charData[this.state.ccData].name)}</p>
                    <Button onClick={this.handleDeleteButtonClicked} className="btn-danger m-2">
                        Delete
                    </Button>
                </div>
                <div className="id-section-stats">
                    <div className="id-section-image-box">
                        <img className="character-detail-img border border-dark rounded m-3"
                            src={process.env.PUBLIC_URL + "/images/character_content/face/" + this.charData[this.state.ccData].name + "_face.png"}
                            alt={this.charData[this.state.ccData].name}/>
                    </div>
                    <div className="id-section-stats-inputs">
                        <div className="input-group m-1" key={this.state.ccData * 10}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Level:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].level} onChange={this.handleCharacterLevelChanged}
                                aria-label="Character's Level" aria-describedby="basic-addon2" ref={this.characterLevelInputRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" 
                                id="basic-addon2" ref={this.characterLevelByAscensionRef}>/ {constant_values.levelByAscension[this.charData[this.state.ccData].ascension]}</span>
                            </div>
                        </div>
                        <div className="input-group m-1" key={this.state.ccData * 10 + 1}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Ascension:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].ascension} onChange={this.handleCharacterAscensionChanged}
                                aria-label="Character's Ascension" aria-describedby="basic-addon2" ref={this.characterAscensionInputRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">/ 6</span>
                            </div>
                        </div>
                        <div className="input-group m-1" key={this.state.ccData * 10 + 2}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Constellation:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].constellation} onChange={this.handleCharacterConstellationChanged}
                                aria-label="Character's Constellation" aria-describedby="basic-addon2" ref={this.characterConstellationInputRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">/ 6</span>
                            </div>
                        </div>
                        <div className="input-group m-1" key={this.state.ccData * 10 + 3}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Normal Attack Talent:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].talents[0]} onChange={this.handleCharacterTalentOneChanged}
                                aria-label="Character's Normal Attack Talent" aria-describedby="basic-addon2" ref={this.characterTalentOneRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">/ 10</span>
                            </div>
                        </div>
                        <div className="input-group m-1" key={this.state.ccData * 10 + 4}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Elemental Skill Talent:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].talents[1]} onChange={this.handleCharacterTalentTwoChanged}
                                aria-label="Character's Elemental Skill Talent" aria-describedby="basic-addon2" ref={this.characterTalentTwoRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">/ 10</span>
                            </div>
                        </div>
                        <div className="input-group m-1" key={this.state.ccData * 10 + 5}>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Elemental Burst Talent:</span>
                            </div>
                            <input type="text" className="form-control" 
                                defaultValue={this.charData[this.state.ccData].talents[2]} onChange={this.handleCharacterTalentThreeChanged}
                                aria-label="Character's Elemental Burst Talent" aria-describedby="basic-addon2" ref={this.characterTalentThreeRef}/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">/ 10</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gear-section">
                    <div className="gear-weapon-container">
                        <div className='gear-flex-baby'>
                            <EntityCard mode="weapon" onClick={this.handleCharacterCardClick} type={data_names[this.charData[this.state.ccData].name].weapon} weapon_data={this.charData[this.state.ccData].weapon}/>
                        </div>
                    </div>         
                    <div className="gear-artifact-container">
                        <div className='gear-flex-baby'>
                            <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="flower" artifact_data={this.charData[this.state.ccData].artifacts[0]} storageUtil={this.storageUtils}/> 
                        </div>
                        <div className='gear-flex-baby'>
                            <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="plume" artifact_data={this.charData[this.state.ccData].artifacts[1]} storageUtil={this.storageUtils}/> 
                        </div>
                        <div className='gear-flex-baby'>
                            <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="sands" artifact_data={this.charData[this.state.ccData].artifacts[2]} storageUtil={this.storageUtils}/> 
                        </div>
                        <div className='gear-flex-baby'>
                            <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="goblet" artifact_data={this.charData[this.state.ccData].artifacts[3]} storageUtil={this.storageUtils}/> 
                        </div>
                        <div className='gear-flex-baby'>
                            <EntityCard mode="artifact" onClick={this.handleArtifactCardClick} type="circlet" artifact_data={this.charData[this.state.ccData].artifacts[4]} storageUtil={this.storageUtils}/>
                        </div>
                    </div>     
                </div>
                <div className='stat-list'>
                    <p>Max HP: {calcUtils.round(calcUtils.hp(stats[stats.length - 3], stats[1], stats[0]), 0)}</p>
                    <p>ATK: {calcUtils.round(calcUtils.atk(stats[stats.length - 2], stats[3], stats[2]), 0)}</p>
                    <p>DEF: {calcUtils.round(calcUtils.def(stats[stats.length - 1], stats[5], stats[4]), 0)}</p>
                    <p>Elemental Mastery: {calcUtils.round(stats[7], 0)}</p>
                    <p>CRIT Rate: {calcUtils.round(stats[8], 1)}%</p>
                    <p>CRIT DMG: {calcUtils.round(stats[9], 1)}%</p>
                    <p>Healing Bonus: {calcUtils.round(stats[18], 1)}%</p>
                    <p>Incoming Healing Bonus: {calcUtils.round(stats[19], 1)}%</p>
                    <p>Energy Recharge: {calcUtils.round(stats[6], 1)}%</p>
                    <p>CD Reduction: {calcUtils.round(stats[20], 1)}%</p>
                    <p>Shield Strength: {calcUtils.round(stats[21], 1)}%</p>
                    <p>Pyro DMG Bonus: {calcUtils.round(stats[10], 1)}%</p>
                    <p>Pyro RES: {calcUtils.round(stats[22], 1)}%</p>
                    <p>Hydro DMG Bonus: {calcUtils.round(stats[11], 1)}%</p>
                    <p>Hydro RES: {calcUtils.round(stats[23], 1)}%</p>
                    <p>Dendro DMG Bonus: {calcUtils.round(stats[12], 1)}%</p>
                    <p>Dendro RES: {calcUtils.round(stats[24], 1)}%</p>
                    <p>Electro DMG Bonus: {calcUtils.round(stats[13], 1)}%</p>
                    <p>Electro RES: {calcUtils.round(stats[25], 1)}%</p>
                    <p>Anemo DMG Bonus: {calcUtils.round(stats[14], 1)}%</p>
                    <p>Anemo RES: {calcUtils.round(stats[26], 1)}%</p>
                    <p>Cryo DMG Bonus: {calcUtils.round(stats[15], 1)}%</p>
                    <p>Cryo RES: {calcUtils.round(stats[27], 1)}%</p>
                    <p>Geo DMG Bonus: {calcUtils.round(stats[16], 1)}%</p>
                    <p>Geo RES: {calcUtils.round(stats[28], 1)}%</p>
                    <p>Physical DMG Bonus: {calcUtils.round(stats[17], 1)}%</p>
                    <p>Physical RES: {calcUtils.round(stats[29], 1)}%</p>
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
    saveCharacterModalThenClose(){
        //let data = data_names[character_name_list[this.creationModalSelection]];
        let new_char_file = {
            "name": character_name_list[this.creationModalSelection],
            "level": 90,
            "ascension": 6,
            "constellation": 0,
            "talents": [8, 8, 8],
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
        if(listPointer === "sword"){
            listPointer = sword_list;
        } else if(listPointer === "claymore"){
            listPointer = claymore_list;
        } else if(listPointer === "polearm"){
            listPointer = polearm_list;
        } else if(listPointer === "catalyst"){
            listPointer = catalyst_list;
        } else if(listPointer === "bow"){
            listPointer = bow_list;
        }
        let refine = 1;
        if(this.weaponRefineInputRef.current !== null){
            refine = parseInt(this.weaponRefineInputRef.current.value);
        }
        this.charData[this.state.ccData].weapon = {
            "name": listPointer[this.state.weaponModalSelection],
            "level": parseInt(this.weaponLevelInputRef.current.value),
            "ascension": parseInt(this.weaponAscensionInputRef.current.value),
            "refine": refine
        };
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
            if(this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece] !== -1){
                this.storageUtils.artifactData[this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece]].character = -1;
            }
            this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece] = parseInt(this.artifactModalSelection);
            this.storageUtils.artifactData[this.artifactModalSelection].character = this.state.ccData;
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
            this.storageUtils.saveData("artifact");
            this.toggleArtifactModalState();
         }
    }

    /**
     * Renders the modal body.
     */
    renderCharacterModalBody() {
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
                if(this.storageUtils.artifactData[a].type === this.state.artifactModalPiece && (this.storageUtils.artifactData[a].character === -1 || this.storageUtils.artifactData[a].character === this.state.ccData)){
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
                    <p>You do not have any unequipped {constant_values.pieceFormalNamesPlural[this.state.artifactModalPiece]} in your inventory! Visit the "Artifact" page to make artifacts.</p>
                </>
            } else {
                this.artifactModalSelection = artifacts[0].key;
                return (
                    <>
                        <FloatingLabel id="floatingSelect" label="Select Artifact:" className="mb-3" ref={this.creationModalMenuRef} onChange={e => this.artifactModalMenuOnSelect(e)}>
                            <Form.Select aria-label="Select artifact input box" defaultValue={this.fetchDefaultArtifacts()}>
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
        let nlp = [1];
        let listPointer = [0];
        if(this.state.ccData !== undefined && this.charData[this.state.ccData] !== undefined ){
            listPointer = data_names[this.charData[this.state.ccData].name].weapon;
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
                    <Form.Select aria-label="Select weapon input box" defaultValue={this.fetchCurrentCharacterWeapon()}>
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
                        <span className="input-group-text" id="basic-addon2">/{constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity]}</span>
                    </div>
                </div>
                {nlp[listPointer[this.state.weaponModalSelection]].rarity > 2 &&
                    <div className='input-group form-inline'>
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
                }
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
        this.setState({
            weaponModalSelection: e.target.value
        })
    }

    /**
     * Sets the artifactModalSelection value when the artifact modal is set.
     * 
     * @param {*} e is the onChange event
     */
    artifactModalMenuOnSelect(e){
        this.artifactModalSelection = parseInt(e.target.value);
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
        let valid = false;
        if(this.weaponAscensionInputRef.current.value >= 0 
           && this.weaponAscensionInputRef.current.value <= constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity] 
           && this.weaponAscensionInputRef.current.value !== ""){
            valid = true;
        }
        //change character level if valid
        if(valid){
           let ascension = parseInt(this.weaponAscensionInputRef.current.value);
           let currentLevel = parseInt(this.weaponLevelInputRef.current.value);
           this.weaponLevelDisplayRef.current.textContent = "/ " + constant_values.levelByAscension[ascension];
           if(currentLevel < constant_values.levelByAscension[ascension - 1]){
               this.weaponLevelInputRef.current.value = constant_values.levelByAscension[ascension - 1];
           } else if(currentLevel > constant_values.levelByAscension[ascension]){
               this.weaponLevelInputRef.current.value = constant_values.levelByAscension[ascension];
           }
        } else if (this.weaponAscensionInputRef.current.value > constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity]){
            this.weaponAscensionInputRef.current.value = 4;
        } else if (this.weaponAscensionInputRef.current.value < 0){
            this.weaponAscensionInputRef.current.value = 0;
        }
    }

    /**
     * Handles changes to the character level textbox
     */
    handleCharacterLevelChanged(){
        const level = parseInt(this.characterLevelInputRef.current.value);
        let valid = false;
        if(this.charData[this.state.ccData].ascension === 0){ //check if provided character level is valid
            if(level >= 1 && level <= 20){
                valid = true;
            }
        }
        else {
            if(level >= constant_values.levelByAscension[this.charData[this.state.ccData].ascension - 1] && level <= constant_values.levelByAscension[this.charData[this.state.ccData].ascension]){
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
            this.charData[this.state.ccData].ascension = ascension;
            this.characterLevelByAscensionRef.current.textContent = "/ " + constant_values.levelByAscension[this.charData[this.state.ccData].ascension];
            if(this.charData[this.state.ccData].level < constant_values.levelByAscension[this.charData[this.state.ccData].ascension - 1]){
                this.characterLevelInputRef.current.value = constant_values.levelByAscension[this.charData[this.state.ccData].ascension - 1];
                this.charData[this.state.ccData].level = constant_values.levelByAscension[this.charData[this.state.ccData].ascension - 1];
            } else if(this.charData[this.state.ccData].level > constant_values.levelByAscension[this.charData[this.state.ccData].ascension]){
                this.characterLevelInputRef.current.value = constant_values.levelByAscension[this.charData[this.state.ccData].ascension];
                this.charData[this.state.ccData].level = constant_values.levelByAscension[this.charData[this.state.ccData].ascension];
            }
            this.storageUtils.characterData = this.charData;
            this.storageUtils.saveData("character");
         }
    }

    /**
     * Handles clicks to the delete character button
     */
    handleDeleteButtonClicked(){
        //remove artifact/character reference
        for(let a = 0; a < 5; a++){
            if(this.charData[this.state.ccData].artifacts[a] !== -1){
                this.storageUtils.artifactData[this.charData[this.state.ccData].artifacts[a]].character = -1;
            }
        }

        //remove character from state
        this.charData.splice(this.state.ccData, 1);

        //handle side effects of removal
        if(this.charData.length === 0){
            this.setState({
                ccData: null,
                weaponModalSelection: 0
                });
        }
        else if(this.state.ccData === this.charData.length){
            this.setState({ccData: this.state.ccData - 1});
        } else {
            this.setState({ccData: this.state.ccData}); //re-render for fun HAHA
        }

        this.storageUtils.envData[0] = this.storageUtils.envData[0].map(e => {
            if(e > this.state.ccData){
                return e - 1;
            } else if (e === this.state.ccData){
                return -1;
            } else {
                return e;
            }
        });

        //remove character from long term storage
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
        this.storageUtils.saveData("artifact");
        this.storageUtils.saveData("environment");
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
        if(this.charData.length > 0){
            if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
                return this.charData[this.state.ccData].weapon.level;
            } else {
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
                return constant_values.levelByAscension[constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity]];
            }
        }
    }
    fetchWeaponAscension(){
        if(this.charData.length > 0){
            if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
                return this.charData[this.state.ccData].weapon.ascension;
            } else {
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
                return constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity];
            }
        }
    }
    fetchWeaponLevelLimit(){
        if(this.charData.length > 0){
            if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
                return "/ " + constant_values.levelByAscension[this.charData[this.state.ccData].weapon.ascension];
            } else {
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
                return "/ " + constant_values.levelByAscension[constant_values.weaponAscensionByRarity[nlp[listPointer[this.state.weaponModalSelection]].rarity]];
            }
        }
        
        
    }
    fetchWeaponRefine(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            if(this.charData[this.state.ccData].weapon.refine !== undefined){
                return this.charData[this.state.ccData].weapon.refine;
            } else {
                return 1;
            }
        } else {
            return 5;
        }
    }
    fetchDefaultArtifacts(){
        if(this.charData.length !== 0 && this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece] !== -1){
            return this.charData[this.state.ccData].artifacts[this.state.artifactModalPiece];
        }
        return 0;
    }
    fetchCurrentCharacterWeapon(){
        if(this.charData[this.state.ccData] !== undefined && Object.keys(this.charData[this.state.ccData].weapon).length !== 0){
            let listPointer = data_names[this.charData[this.state.ccData].name].weapon;
            if(listPointer === "sword"){
                listPointer = sword_list;
            } else if(listPointer === "claymore"){
                listPointer = claymore_list;
            } else if(listPointer === "polearm"){
                listPointer = polearm_list;
            } else if(listPointer === "catalyst"){
                listPointer = catalyst_list;
            } else if(listPointer === "bow"){
                listPointer = bow_list;
            }
            for(let a = 0; a < listPointer.length; a++){
                if(listPointer[a] === this.charData[this.state.ccData].weapon.name){
                    return a;
                }
            }
        }
    }
}

export default CharacterScreen;