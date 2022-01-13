import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { RadioButton } from './RadioButton';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "../css/CharacterScreenStyling.css";

import { artifact_set_data } from '../data/artifact_sets'
import { constant_values } from '../data/constant_values'
/**
 * This React Component represents the inventory screen in Genshin. 
 * 
 * It contains all the artifacts.
 */
class ArtifactScreen extends React.Component{

    constructor(props){
        super(props);

        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.toggleCreationModalState = this.toggleCreationModalState.bind(this);

        this.creationModalSetMenuRef = React.createRef();
        this.creationModalPieceMenuRef = React.createRef();
        this.creationModalLevelRef = React.createRef();
        this.substatRef1 = React.createRef();
        this.substatRef2 = React.createRef();
        this.substatRef3 = React.createRef();
        this.substatRef4 = React.createRef();
        this.substatRefs = [this.substatRef1, this.substatRef2, this.substatRef3, this.substatRef4]

        //init state
        this.storageUtils = this.props.storageUtil;
        this.creationSetModalSelection = 0;
        this.creationMStatModalSelection = 0;
        this.artiData = this.storageUtils.artifactData;
        this.artifactSetList = Object.keys(artifact_set_data);
        if(this.artiData !== undefined && this.artiData.length > 0){
            this.state = {
                caData: 0,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 3, 
                creationSetModalSelection: 0, 
                substatSelection: [1, 2, 3, 4]
            };
        } else {
            this.state = {
                caData: null,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 3, 
                creationSetModalSelection: 0,
                substatSelection: [1, 2, 3, 4]
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
        // for(let ct = 0; ct < constant_values.substatConv.length; ct++){
        //     console.log(constant_values.substatConv[ct] + ": ")
        //     for(let cr = 0; cr < 5; cr++){
        //         console.log( (cr + 1) + " star variant diffs:")
                
        //         let strong = (Math.round((constant_values.substatFlavors[ct][cr][1] - constant_values.substatFlavors[ct][cr][0] + Number.EPSILON) * 1000) / 1000) + ""
        //         for(let ce = 1; ce < constant_values.substatFlavors[ct][cr].length - 1; ce++){
        //             strong = strong + ", " + (Math.round((constant_values.substatFlavors[ct][cr][ce + 1] - constant_values.substatFlavors[ct][cr][ce] + Number.EPSILON) * 1000) / 1000)
        //         }
        //         console.log(strong)
        //     }
        // }
        //Format names and add them to the Form.
        let artifactSetListFormatted = this.artifactSetList.map((e, i) => <option value={i} key={i}>{artifact_set_data[e].name}</option>);
        let typeList = ["Flower", "Plume", "Sands", "Goblet", "Circlet"];
        let typeListFormatted = typeList.map((e, i) => <option value={i} key={i}>{e}</option>);
        let mStatListFormatted = constant_values.possibleMainStats[this.state.creationPieceModalSelection].map((e, i) => <option value={i} key={i}>{constant_values.statConvFormal[e]}</option>);
        return (
            <>
                <FloatingLabel id="floatingSelect" label="Artifact Set:" className="mb-3" ref={this.creationModalSetMenuRef} onChange={e => this.creationModalSetMenuOnSelect(e)}>
                    <Form.Select aria-label="Select artifact set input box"
                    defaultValue={0}>
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
                    disabled={!artifact_set_data[this.artifactSetList[this.state.creationSetModalSelection]].rarity.includes(1)}
                />
                <RadioButton
                    value={2}
                    selected={this.state.creationModalRaritySelection}
                    text="2"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                    disabled={!artifact_set_data[this.artifactSetList[this.state.creationSetModalSelection]].rarity.includes(2)}
                />
                <RadioButton
                    value={3}
                    selected={this.state.creationModalRaritySelection}
                    text="3"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                    disabled={!artifact_set_data[this.artifactSetList[this.state.creationSetModalSelection]].rarity.includes(3)}
                />
                <RadioButton
                    value={4}
                    selected={this.state.creationModalRaritySelection}
                    text="4"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                    disabled={!artifact_set_data[this.artifactSetList[this.state.creationSetModalSelection]].rarity.includes(4)}
                />
                <RadioButton
                    value={5}
                    selected={this.state.creationModalRaritySelection}
                    text="5"
                    onChange={e => this.creationModalRarityOnSelect(e)}
                    disabled={!artifact_set_data[this.artifactSetList[this.state.creationSetModalSelection]].rarity.includes(5)}
                />

                <div className="input-group form-inline mb-3">
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Level:</span>
                    </div>
                    <input type="text" className="form-control" 
                        defaultValue={this.fetchDefaultArtiLevel()}
                        aria-label="Artifact's Level" aria-describedby="basic-addon2" ref={this.creationModalLevelRef}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{this.fetchDefaultArtiMLevel()}</span>
                    </div>
                </div>

                <p className='mb-1'>Substats:</p>
                {this.renderSubstatInterface()}
            </>
        )
    }

    renderSubstatInterface(){
        let dropDownList = [];
        for(let i = 0; i < constant_values.numSubstatRolls[this.state.creationModalRaritySelection - 1]; i++){
            let buttonList = constant_values.substatFlavors[this.state.substatSelection[i]][this.state.creationModalRaritySelection - 1]
                .map(e =>  <Button variant="outline-secondary">{e}</Button> );
            let ph = i;
            let substatList = constant_values.substatConv.map((e, i) => {
                if(!this.state.substatSelection.includes(i) || this.state.substatSelection[ph] === i)
                    return <option value={i} key={i}>{e}</option>
            });
            dropDownList.push(
                <InputGroup className="mb-3" key={i}>
                    <Form.Select aria-label="Select artifact substat input box" size="sm"
                    defaultValue={this.state.substatSelection[i]} onChange={(e) => this.substatOnChange(e, i)}
                    ref={this.substatRefs[i]}>
                        {substatList}
                    </Form.Select>
                    {buttonList}
                    <FormControl aria-label="Text input with dropdown button" />
                </InputGroup>
            );
        }
        return <>{dropDownList}</>
    }

    /**
     * Sets the creationModalSelection value when the creation modal is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalSetMenuOnSelect(e){
        this.creationModalLevelRef.current.value = artifact_set_data[this.artifactSetList[parseInt(e.target.value)]].rarity[artifact_set_data[this.artifactSetList[parseInt(e.target.value)]].rarity.length - 1] * 4;
        this.setState({creationSetModalSelection: parseInt(e.target.value),
                creationModalRaritySelection: artifact_set_data[this.artifactSetList[parseInt(e.target.value)]].rarity[artifact_set_data[this.artifactSetList[parseInt(e.target.value)]].rarity.length - 1]});
    }

    /**
     * Sets the creationModalSelection value when the creation modal piece selection is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalPieceMenuOnSelect(e){
        this.creationMStatModalSelection = 0;
        let tval = -1;
        let tloc = -1;
        for(let i = 0; i < constant_values.numSubstatRolls[this.state.creationModalRaritySelection - 1]; i++){
             //if the main stat coincides with a substat
            if(this.state.substatSelection[i] === constant_values.possibleMainStats[parseInt(e.target.value)][this.creationMStatModalSelection]){
                tval = this.state.substatSelection[i];
                tloc = i;
                while(this.state.substatSelection.includes(tval)){//change the substat 
                    tval = (tval + 1) % constant_values.substatConv.length;
                }
            }
        }
        if(tval !== -1){
            this.substatRefs[tloc].current.value = tval;
            this.setState(state => {
                state.substatSelection[tloc] = tval;
                return {
                    substatSelection: state.substatSelection,
                    creationPieceModalSelection: parseInt(e.target.value)
                }
            });
        } else {
            this.setState({creationPieceModalSelection: parseInt(e.target.value)});
        }
    }

    /**
     * Sets the CreationModalMStatSelection value when the creation modal main stat value is set.
     * 
     * @param {*} e is the onChange event
     */
    creationModalMStatMenuOnSelect(e){
        this.creationMStatModalSelection = e.target.value;
        for(let i = 0; i < constant_values.numSubstatRolls[this.state.creationModalRaritySelection - 1]; i++){
            //if the main stat coincides with a substat
            if(this.state.substatSelection[i] === constant_values.possibleMainStats[this.state.creationPieceModalSelection][this.creationMStatModalSelection]){ 
                console.log("fiuckl")
                let tval = this.state.substatSelection[i]
                while(this.state.substatSelection.includes(tval)){//change the substat 
                    tval = (tval + 1) % constant_values.substatConv.length;
                }
                this.substatRefs[i].current.value = tval;
                this.setState(state => {
                    state.substatSelection[i] = tval;
                    return {
                        substatSelection: state.substatSelection
                    }
                });
                return;
            }
        }
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

    /**
     * Triggers when the substat is changed. Sets the changed substat value to state. 
     * @param {*} e is the event triggered
     * @param {Number} i is the index of the substat set
     */
    substatOnChange(e, i){
        this.setState(state => {
            state.substatSelection[i] = parseInt(e.target.value);
            return {
                substatSelection: state.substatSelection
            }
        });
    }
}

export default ArtifactScreen;