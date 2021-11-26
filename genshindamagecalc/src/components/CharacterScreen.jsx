import React from 'react';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

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
        this.handleCharacterCardClick = this.handleCharacterCardClick.bind(this);
        this.toggleModalState = this.toggleModalState.bind(this);
        this.saveModalThenClose = this.saveModalThenClose.bind(this);
        if(this.storageUtils.characterData !== undefined){
            this.state = {
                ccData: this.storageUtils.characterData[0],
            };
        } else {
            this.state = {
                ccData: null,
            };
        }
        this.state = {
            showModal: false
        }
        
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
            <Modal onHide={this.toggleModalState} show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Character Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                            https://example.com/users/
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>With textarea</InputGroup.Text>
                            <FormControl as="textarea" aria-label="With textarea" />
                        </InputGroup>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.toggleModalState}>
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
            if(count === 6){
                rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
                currentRowCounter++;
                cRow = [];
                count = 0;
            }
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="portrait" data={this.storageUtils.characterData[location]} onClick={this.handleCharacterCardClick}/>
            </td>);
            count++;
            location++;
        }
        if(count === 6){
            rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
            currentRowCounter++;
            cRow = []; //add extra add button
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick}/>
            </td>);
            rTableData[currentRowCounter] = <tr className="p-0" key={currentRowCounter}>{cRow}</tr>; //push rows of EntityCards
        } else { //add extra add button
            cRow.push(<td className="p-0" id={location}>
                <EntityCard mode="add" onClick={this.handleCharacterCardClick}/> 
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
        } if(mode === "add"){
            this.toggleModalState();
        }
    }

    /**
     * Returns a representation of the selected character's data. 
     */
    renderSelectedCharacterData(){
        if(this.state.ccData !== undefined){
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
        } else {
            return (<div className="pt-2">
                <h1>You have not created any character profiles!</h1>
                <p>
                    Create one now by clicking on the plus on the left side of the screen.
                </p>
            </div>)
        }
    }

    toggleModalState(){
        this.setState({showModal: !this.state.showModal});
    }

    saveModalThenClose(){
    }
}

export default CharacterScreen;