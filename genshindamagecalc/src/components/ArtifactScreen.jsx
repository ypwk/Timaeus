import React from 'react';
import Star from './Star';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { RadioButton } from './RadioButton';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "../css/ArtifactScreenStyling.css";

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

        this.handleArtifactCardClick = this.handleArtifactCardClick.bind(this);
        this.toggleCreationModalState = this.toggleCreationModalState.bind(this);
        this.handleSubstatButtonsClicked = this.handleSubstatButtonsClicked.bind(this);
        this.saveCreationModalThenClose = this.saveCreationModalThenClose.bind(this);
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);

        this.creationModalSetMenuRef = React.createRef();
        this.creationModalPieceMenuRef = React.createRef();
        this.creationModalLevelRef = React.createRef();
        this.substatRef1 = React.createRef();
        this.substatRef2 = React.createRef();
        this.substatRef3 = React.createRef();
        this.substatRef4 = React.createRef();
        this.substatRefs = [this.substatRef1, this.substatRef2, this.substatRef3, this.substatRef4]
        this.substatValRef1 = React.createRef();
        this.substatValRef2 = React.createRef();
        this.substatValRef3 = React.createRef();
        this.substatValRef4 = React.createRef();
        this.substatValRefs = [this.substatValRef1, this.substatValRef2, this.substatValRef3, this.substatValRef4]

        //init state
        this.storageUtils = this.props.storageUtil;
        this.creationMStatModalSelection = 0;
        this.artiData = this.storageUtils.artifactData;
        this.artifactSetList = Object.keys(artifact_set_data);
        this.substatValues = [[0], [0], [0], [0]];
        if(this.artiData !== undefined && this.artiData.length > 0){
            this.state = {
                caData: 0,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 3, 
                creationSetModalSelection: 0, 
                substatSelection: [1, 2, 3, 4],
                assignedSubstats: 0
            };
        } else {
            this.state = {
                caData: null,
                showCreationModal: false,
                creationPieceModalSelection: 0,
                creationModalRaritySelection: 3, 
                creationSetModalSelection: 0,
                substatSelection: [1, 2, 3, 4],
                assignedSubstats: 0
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
            <Modal onHide={this.toggleCreationModalState} show={this.state.showCreationModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Artifact</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.renderCreationModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleCreationModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveCreationModalThenClose} 
                        disabled={!this.fetchSaveButtonDisabled()}>
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
                <EntityCard mode="artifact" data={this.artiData[location]} onClick={this.handleArtifactCardClick} card_id={totalCount}/>
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
                <EntityCard mode="add" onClick={this.handleArtifactCardClick} card_id={totalCount}/>
            </div>);
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push rows of EntityCards
        } else { //add extra add button
            cRow.push(<div className=" col-auto" id={location} key={a}>
                <EntityCard mode="add" onClick={this.handleArtifactCardClick} card_id={totalCount}/> 
            </div>);
            rTableData[currentRowCounter] = <div className="row" key={currentRowCounter}>{cRow}</div>; //push remaining EntityCards
        }
        return (<div className="container">{rTableData}</div>);
    }

    /**
     * Handles clicks to EntityCards located on the right of the screen.
     */
     handleArtifactCardClick(mode, data){
        if(mode === "portrait"){
            this.setState({caData: data});
        } if(mode === "add"){
            this.toggleCreationModalState();
        } if(mode === "weapon"){
            this.toggleWeaponModalState();
        } if(mode === "artifact"){
            this.setState({caData: data});
        }
    }

    /**
     * Handles clicks to the delete artifact button
     */
     handleDeleteButtonClicked(){
        //remove artifact from character
        if(this.artiData[this.state.caData].character !== -1){
            this.storageUtils.characterData[this.artiData[this.state.caData].character].artifacts[this.artiData[this.state.caData].type] = -1;
        }
        //remove artifact from state
        this.artiData.splice(this.state.caData, 1);

        //handle side effects of removal
        if(this.artiData.length === 0){
            this.setState({caData: null});
        }
        else if(this.state.caData === this.artiData.length){
            this.setState({caData: this.state.caData - 1});
        } else {
            this.setState({caData: this.state.caData}); //re-render for fun HAHA
        }

        //remove artifact from long term storage
        this.storageUtils.artifactData = this.artiData;
        this.storageUtils.saveData("artifact");
    }

    /**
     * Returns a representation of the selected character's data. 
     */
     renderSelectedArtifactData(){
        let sr = (p, c) => p + c;
        if(this.artiData[this.state.caData] !== null && this.artiData[this.state.caData] !== undefined){
            let typeList = ["flower", "plume", "sands", "goblet", "circlet"];
            let subList = this.artiData[this.state.caData].substats.map((e, i) => {
                if(constant_values.substatConv[e[0]].charAt(constant_values.substatConv[e[0]].length - 1) === '%'){
                    return <p>{constant_values.substatConv[e[0]].substring(0, constant_values.substatConv[e[0]].length - 1)}+{this.round(e[1].reduce(sr), 1)}%</p>
                } else {
                    return <p>{constant_values.substatConv[e[0]]}+{this.round(e[1].reduce(sr), 1)}</p>
                }
            });
            let sp_artifact_data = artifact_set_data[this.artiData[this.state.caData].set];
            let possibleNameList = [
                sp_artifact_data.sets.flower,
                sp_artifact_data.sets.plume,
                sp_artifact_data.sets.sands,
                sp_artifact_data.sets.goblet,
                sp_artifact_data.sets.circlet,
            ]
            return (<div className="pt-2">
                <h2 className='m-0'>
                    {possibleNameList[this.artiData[this.state.caData].type]} <Badge bg="secondary">+{this.artiData[this.state.caData].level}</Badge> 
                </h2>
                <h6 className="text-muted m-0">
                    {constant_values.pieceFormalNames[this.artiData[this.state.caData].type]}
                </h6>
            <div>

            </div>
            <img className="character-detail-img border border-dark rounded mb-3 unselectable"
                        src={process.env.PUBLIC_URL + "/images/artifact_content/" + this.artiData[this.state.caData].set + "_" + typeList[this.artiData[this.state.caData].type] + ".png"}
                        alt={this.artiData[this.state.caData].name}/>
            <p className='h3'>
                {this.fetchRarityStars(this.artiData[this.state.caData].rarity)}
            </p>
            <div className="d-flex justify-content-between">
                <p className='h3'> 
                    {constant_values.statConvFormal[constant_values.possibleMainStats[this.artiData[this.state.caData].type][this.artiData[this.state.caData].main_stat]]}
                </p>
                <p className='h3'>
                    {constant_values.mainStatScaling[this.artiData[this.state.caData].rarity - 1][constant_values.possibleMainStats[this.artiData[this.state.caData].type][this.artiData[this.state.caData].main_stat]][this.artiData[this.state.caData].level]}  
                </p>
            </div>
            
            {subList}
            <Button className="btn-danger" onClick={this.handleDeleteButtonClicked}>
                Delete
            </Button>
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
                {this.renderSubstatInterface()}
            </>
        )
    }

    renderSubstatInterface(){
        let dropDownList = [];
        let sum_reducer = (p, c) => p + c;
        for(let i = 0; i < constant_values.numSubstatRolls[this.state.creationModalRaritySelection - 1]; i++){
            let ph = i;
            let buttonList = constant_values.substatFlavors[this.state.substatSelection[i]][this.state.creationModalRaritySelection - 1]
                .map((e, i) =>  <Button variant="btn-outline-dark" 
                disabled={this.state.assignedSubstats === constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1].length - 1]}
                key={ph * 10 + i} onClick={e => this.handleSubstatButtonsClicked(e, i, ph)}>
                    {this.round(e, 1)}
                </Button> );
            let substatList = constant_values.substatConv.map((e, i) => {
                if(!this.state.substatSelection.includes(i) || this.state.substatSelection[ph] === i)
                    return <option value={i} key={i}>{e}</option>
            });
            let subButtonList = [];
            if(this.substatValues[i][0] !== 0){
                subButtonList = this.substatValues[i].map((e, i) => <Button variant="outline-primary" key={ph * 10 + i} onClick={e => this.handleRemoveSubstatButtonsClicked(e, i, ph)}>{this.round(e, 1)}</Button> );
            }
            dropDownList.push(
                <InputGroup className="mb-3" key={i}>
                    <Form.Select aria-label="Select artifact substat input box" size="sm"
                    defaultValue={this.state.substatSelection[i]} onChange={(e) => this.substatOnChange(e, i)}
                    ref={this.substatRefs[i]}>
                        {substatList}
                    </Form.Select>
                    {buttonList}
                    <FormControl aria-label="Text input with dropdown button" className="wide-form-select"
                        ref={this.substatValRefs[i]} defaultValue={this.round(this.substatValues[i].reduce(sum_reducer), 1)} disabled/>
                    {subButtonList}
                </InputGroup>
            );
        }
        return <>
            <p className='mb-1'>Unassigned Substats: {this.fetchUnassignedSubstats()}</p>
            {dropDownList}
        </>
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
                this.substatValRefs[tloc].current.value = 0;
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
                let tval = this.state.substatSelection[i]
                while(this.state.substatSelection.includes(tval)){//change the substat 
                    tval = (tval + 1) % constant_values.substatConv.length;
                }
                this.substatRefs[i].current.value = tval;
                this.substatValRefs[i].current.value = 0;
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
        *    set
        *    level
        *    rarity
        *    type
        *    main stat
        *    substats
        *     list of substats, each substat is a list of rolls (0 - 3)
        *    id
        */
        let new_arti_file = {
            "set": Object.keys(artifact_set_data)[this.state.creationSetModalSelection],
            "level": this.creationModalLevelRef.current.value,
            "type": this.state.creationPieceModalSelection,
            "rarity": this.state.creationModalRaritySelection,
            "main_stat": this.creationMStatModalSelection,
            "substats": this.state.substatSelection.map((e, i) => [e, this.substatValues[i]]),
            "character": -1
        }
        console.log(new_arti_file)
        this.artiData.push(new_arti_file);
        this.storageUtils.artifactData = this.artiData;
        this.storageUtils.saveData("artifact");
        this.setState({caData: this.artiData.length - 1,
                creationPieceModalSelection: 0,
                assignedSubstats: 0});
        this.substatValues = [[0], [0], [0], [0]];
        this.toggleCreationModalState();
    }

    fetchDefaultArtiLevel(){
        return parseInt(this.state.creationModalRaritySelection) * 4;
    }

    fetchDefaultArtiMLevel(){
        return "/ " + this.state.creationModalRaritySelection * 4;
    }

    fetchUnassignedSubstats(){
        if(this.state.creationModalRaritySelection > 2){
            if(this.state.assignedSubstats >= constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][0]){
                return "" + (constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][1] - this.state.assignedSubstats);
            } else {
                return (constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][0] - this.state.assignedSubstats) 
                + " or " + (constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][1] - this.state.assignedSubstats);
            }
        } else { // 2 or 1
            return "" + (constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1][0] - this.state.assignedSubstats);
        }
    }

    fetchSaveButtonDisabled(){
        let filled = true;
        for(let a = 0; a < constant_values.numSubstatRolls[this.state.creationModalRaritySelection - 1]; a++){
            filled = filled && !this.substatValues[a].includes(0);
        }
        return filled && constant_values.maxNumSubstatRolls[this.state.creationModalRaritySelection - 1].includes(this.state.assignedSubstats);
    }

    fetchRarityStars(stars){
        let starArr = Array(stars).fill(<Star />);
        return <div>
            {starArr}
        </div>
    }

    /**
     * Triggers when the substat is changed. Sets the changed substat value to state. 
     * @param {*} e is the event triggered
     * @param {Number} i is the index of the substat set
     */
    substatOnChange(e, i){
        let a_ss = 0;
        if(this.substatValues[i][0] !== 0){
            a_ss = this.substatValues[i].length;
        }
        this.substatValues[i] = [0];
        //this.substatValRefs[i].current.value = 0;
        this.setState(state => {
            state.substatSelection[i] = parseInt(e.target.value);
            return {
                assignedSubstats: state.assignedSubstats - a_ss,
                substatSelection: state.substatSelection
            }
        });
    }

    /**
     * onClick for substat creation buttons
     * @param {*} e is the onClick event
     * @param {*} i is the selected substat flavor
     * @param {*} ph is the selected substat
     */
    handleSubstatButtonsClicked(e, i, ph){
        let val = 0;
        val = parseFloat(this.substatValRefs[ph].current.value) +
            parseFloat(constant_values.substatFlavors[this.state.substatSelection[ph]][this.state.creationModalRaritySelection - 1][i]);
        this.substatValRefs[ph].current.value = this.round(val, 1); //update sum text
        if(this.substatValues[ph][0] === 0){
            this.substatValues[ph][0] = parseFloat(constant_values.substatFlavors[this.state.substatSelection[ph]][this.state.creationModalRaritySelection - 1][i]);
        } else {
            this.substatValues[ph].push(parseFloat(constant_values.substatFlavors[this.state.substatSelection[ph]][this.state.creationModalRaritySelection - 1][i]));
        }
        this.setState(state => {
            return {
                assignedSubstats: state.assignedSubstats + 1
            }
        })
    }

    /**
     * onClick for substat deletion buttons
     * @param {*} e is the onClick event
     * @param {*} i is the selected substat in the list
     * @param {*} ph is the selected substat type
     */
    handleRemoveSubstatButtonsClicked(e, i, ph){
        let val = 0;
        val = parseFloat(this.substatValRefs[ph].current.value) - parseFloat(e.target.innerText); 
        this.substatValRefs[ph].current.value = this.round(val, 1); //update sum text
        this.substatValues[ph].splice(i, 1); //delete substat
        if(this.substatValues[ph].length === 0){
            this.substatValues[ph] = [0];
        }
        //update substat count, also updating interface
        this.setState(state => {
            return {assignedSubstats: (state.assignedSubstats - 1)};
        });
    }
    /**
     * Clears all substat values 
     */
    clearSubstatVals(){
        this.substatValRefs.map(e => e.current.value = 0);
    }

    /**
     * Rounding Utility
     */
    round(value, sigfig){
        return Number(Math.round( value + 'e' + sigfig ) + 'e-' + sigfig )
    }
    
    /**
     * Breaks down a value in terms of substat type, using different flavors of substats to accomplish the goal. 
     * Returns a list of broken-down substats, empty if the value cannot be reconstructed. 
     * @param {*} substatIdentifier is the substatIdentifier (number representing the substat)
     * @param {*} rarity is the rarity of the artifact (1 - 5)
     * @param {*} value is the value to break down.
     */
    breakDownSub(substatIdentifier, rarity, value){
        //let seed_value = constant_values.substatFlavors[substatIdentifier][rarity][constant_values[substatIdentifier][rarity].length - 1];
        for(let h = 0; h < constant_values.substatFlavors.length; h++){
            for(let j = 0; j < constant_values.substatFlavors[h].length; j++){
                console.log(constant_values.substatConv[h])
                console.log("rarity: " + ( j + 1))
                console.log(constant_values.substatFlavors[h][j].map((e, i) => {
                    return constant_values.substatFlavors[h][j][constant_values.substatFlavors[h][j].length - 1]* (10 - (constant_values.substatFlavors[h][j].length - 1 - i)) / 10;
                }));
            }
        }
    }
}

export default ArtifactScreen;