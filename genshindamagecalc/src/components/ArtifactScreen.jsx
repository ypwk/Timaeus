import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { RadioButton } from './RadioButton';

import "../css/CharacterScreenStyling.css";

import { artifact_set_data } from '../data/artifact_sets'
/**
 * This React Component represents the inventory screen in Genshin. 
 * 
 * It contains all the artifacts.
 */
class ArtifactScreen extends React.Component{

    constructor(props){
        super(props);

        this.statConv = ["HP", "HP%", "ATK", "ATK%", "DEF", "DEF%", "ER%", "EM", "Pyro%", "Hydro%", "Dendro%", "Electro%", "Anemo%", "Cryo%", "Geo%", "Phys%", "Healing%", "Crit Rate%", "Crit DMG%"]
        this.statConvFormal = [
            "HP", 
            "HP%", 
            "ATK", 
            "ATK%", 
            "DEF", 
            "DEF%", 
            "Energy Recharge %", 
            "Elemental Mastery", 
            "Pyro DMG Bonus %", 
            "Hydro DMG Bonus %", 
            "Dendro DMG Bonus %", 
            "Electro DMG Bonus %", 
            "Anemo DMG Bonus %", 
            "Cryo DMG Bonus %", 
            "Geo DMG Bonus %", 
            "Phys DMG Bonus %", 
            "Healing Bonus %", 
            "Crit Rate %", 
            "Crit DMG %"
        ]
        this.subStatConv = ["HP", "HP%", "ATK", "ATK%", "DEF", "DEF%", "ER%", "EM", "Crit Rate%", "Crit DMG%"]
        //flower, plume, sands, goblet, circlet
        this.possibleMainStats = [
            [0], 
            [2],
            [1, 3, 5, 6, 7],
            [1, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            [1, 3, 5, 7, 16, 17, 18]
        ];

        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.toggleCreationModalState = this.toggleCreationModalState.bind(this);

        this.creationModalSetMenuRef = React.createRef();
        this.creationModalPieceMenuRef = React.createRef();
        this.creationModalLevelRef = React.createRef();

        
        //init state
        this.storageUtils = this.props.storageUtil;
        this.creationSetModalSelection = 0;
        this.creationMStatModalSelection = 0;
        this.artiData = this.storageUtils.artifactData;
        if(this.artiData !== undefined && this.artiData.length > 0){
            this.state = {
                caData: 0,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 5
            };
        } else {
            this.state = {
                caData: null,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 5
            };
        }
    }

    render(){
        return <div className="overflow-hidden p-0">
            <div className="row">
                <div className="d-inline col-auto character-card-tray">
                    {this.renderArtifactCards()}
                </div>
                <div className="d-inline col character-details-tray">
                    {this.renderSelectedArtifactData()}
                </div>
            </div>
            <Modal onHide={this.toggleCreationModalState} show={this.state.showCreationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Artifact</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderCreationModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleCreationModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveCreationModalThenClose}>
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
     renderArtifactCards(){
        let rTableData = [];
        let cRow = [];
        let count = 0;
        let currentRowCounter = 0;
        let location = 0;
        let totalCount = 0;
        for(var a = 0; a < this.artiData.length; a++){
            if(count === 7){
                rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
                currentRowCounter++;
                cRow = [];
                count = 0;
            }
            cRow.push(<div className="col-auto" id={location} key={a}>
                <EntityCard mode="portrait" data={this.artiData[location]} onClick={this.handleCharacterCardClick} card_id={totalCount}/>
            </div>);
            count++;
            totalCount++;
            location++;
        }
        if(count === 7){
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
            this.toggleCreationModalState();
        } if(mode === "weapon"){
            this.toggleWeaponModalState();
        } if(mode === "artifact"){
            this.toggleArtifactModalState();
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
     renderSelectedArtifactData(){
        if(this.artiData[this.state.ccData] !== null && this.artiData[this.state.ccData] !== undefined){
            const levelByAscension = [20, 40, 50, 60, 70, 80, 90]
            return (<div className="pt-2">
            <h1>Artifact AHAH</h1>
            <img className="character-detail-img border border-dark rounded mb-3"
                        src={process.env.PUBLIC_URL + "/images/artifact_content" + this.artiData[this.state.caData].set + "_face.png"}
                        alt={this.charData[this.state.ccData].name}/>
            <p>
                POOOOOOOPPOOO MAN MAKE ARETRIFACT 
            </p>
        </div>)
        } else {
            return (<div className="pt-2">
                <h1>You have not created any artifacts!</h1>
                <p>
                    Create one now by clicking on the plus on the left side of the screen.
                </p>
            </div>)
        }
    }

    /**
     * Toggles the modal state for the artifact creation modal.
     */
     toggleCreationModalState(){
        this.setState({showCreationModal: !this.state.showCreationModal});
    }

    /**
     * Renders the creation modal body.
     */
     renderCreationModalBody() {
        //Format names and add them to the Form.
        let artifactSetList = Object.keys(artifact_set_data);
        let artifactSetListFormatted = artifactSetList.map((e, i) => <option value={i} key={i}>{artifact_set_data[e].name}</option>);
        let typeList = ["Flower", "Plume", "Sands", "Goblet", "Circlet"];
        let typeListFormatted = typeList.map((e, i) => <option value={i} key={i}>{e}</option>);
        let mStatListFormatted = this.possibleMainStats[this.state.creationPieceModalSelection].map((e, i) => <option value={i} key={i}>{this.statConvFormal[e]}</option>)
        return (
            <>
                <FloatingLabel id="floatingSelect" label="Artifact Set:" className="mb-3" ref={this.creationModalSetMenuRef} onChange={e => this.creationModalSetMenuOnSelect(e)}>
                    <Form.Select aria-label="Select artifact set input box"
                    defaultValue={17}>
                        {artifactSetListFormatted}
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel id="floatingSelect" label="Piece Type:" className="mb-3" ref={this.creationModalPieceMenuRef} onChange={e => this.creationModalPieceMenuOnSelect(e)}>
                    <Form.Select aria-label="Select artifact piece input box">
                        {typeListFormatted}
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel id="floatingSelect" label="Main Stat:" className="mb-3" 
                ref={this.creationModalPieceMenuRef} onChange={e => this.creationModalMStatMenuOnSelect(e)}>
                    <Form.Select aria-label="Select main stat input box"
                    disabled={this.state.creationPieceModalSelection === 0 || this.state.creationPieceModalSelection === 1}>
                        {mStatListFormatted}
                    </Form.Select>
                </FloatingLabel>

                <p className='m-0'>Rarity:</p>
                <RadioButton
                    value={1}
                    selected={this.state.creationModalRaritySelection}
                    text="1"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                />
                <RadioButton
                    value={2}
                    selected={this.state.creationModalRaritySelection}
                    text="2"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                />
                <RadioButton
                    value={3}
                    selected={this.state.creationModalRaritySelection}
                    text="3"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                />
                <RadioButton
                    value={4}
                    selected={this.state.creationModalRaritySelection}
                    text="4"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                />
                <RadioButton
                    value={5}
                    selected={this.state.creationModalRaritySelection}
                    text="5"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                />

                <div className="input-group form-inline">
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Level:</span>
                    </div>
                    <input type="text" className="form-control" 
                        defaultValue={this.fetchDefaultArtiLevel()}
                        aria-label="Weapon's Refine Level" aria-describedby="basic-addon2" ref={this.creationModalLevelRef}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{this.fetchDefaultArtiMLevel()}</span>
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
    creationModalSetMenuOnSelect(e){
        this.creationSetModalSelection = e.target.value;
    }

    /**
     * Sets the creationModalSelection value when the creation modal piece selection is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalPieceMenuOnSelect(e){
        this.creationMStatModalSelection = 0;
        this.setState({creationPieceModalSelection: parseInt(e.target.value)});
    }

    /**
     * Sets the CreationModalMStatSelection value when the creation modal main stat value is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalMStatMenuOnSelect(e){
        this.creationMStatModalSelection = e.target.value;
    }

    /**
     * Sets the CreationModalRaritySelection value when the creation modal rarity value is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalRarityOnSelect(e){
        this.creationModalLevelRef.current.value = e * 4;
        this.setState({creationModalRaritySelection: e});
    }

    /**
     * Saves the content in the creation modal and then closes it
     */
    saveCreationModalThenClose() {
        /*
        *set
 *    level
 *    rarity
 *    main stat
 *    substats
 *     list of substats, each substat is a list of rolls (0 - 3)
 *    id
        
        let new_char_file = {
            "set": Object.keys(artifact_set_data)[this.creationSetModalSelection],
            "level": this.creationModalLevelRef.current.value,
            "rarity": this.creationModalRaritySelection,
            "main_stat": this.creationMStatModalSelection,
            "substats": [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        }
        this.creationModalSelection = 0;
        this.charData.push(new_char_file);
        this.storageUtils.characterData = this.charData;
        this.storageUtils.saveData("character");
        this.setState({ccData: this.charData.length - 1});
        this.toggleModalState(); */
    }

    fetchDefaultArtiLevel(){
        return parseInt(this.state.creationModalRaritySelection) * 4;
    }

    fetchDefaultArtiMLevel(){
        return "/ " + this.state.creationModalRaritySelection * 4;
    }
}

export default ArtifactScreen;