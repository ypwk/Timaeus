import React from 'react';
import Timeline from './Timeline';
import EntityCard from './EntityCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import calcUtils from "../utils/calcUtils";

import "../css/EnvironmentScreenStyling.css";

class EnvironmentScreen extends React.Component{
    constructor(props){
        super(props);

        //binding
        this.toggleCharacterModalState = this.toggleCharacterModalState.bind(this);
        this.saveCharacterModalThenClose = this.saveCharacterModalThenClose.bind(this);

        //references

        //init state
        this.storageUtils = this.props.storageUtil;
        this.state = {
            selectedCharData: this.storageUtils.envData[0],
            showCharacterModal: false
        }
        this.charStats = this.state.selectedCharData.map(e => calcUtils.calcAll(this.storageUtils.characterData[e], this.storageUtils.artifactData));
        this.characterModalSelection = 0;
        this.currentlyEditedCharacter = 0;
    }

    render(){
        return <div>
                    <div className='char-selection-container'>
                        <p className='m-2 h3'>Party Members</p>
                        <div className='char-display-container'>
                            <div className='char-display-baby'>
                                <EntityCard mode="add-character" onClick={e => this.handleCharacterCardClick(0)} 
                                    data={this.storageUtils.characterData[this.state.selectedCharData[0]]}
                                    arti_dat={this.storageUtils.artifactData}
                                    deleteClick={e => this.handleCharacterCardDelete(0)}
                                    char_stat={this.charStats[0]}/>
                            </div>
                            <div className='char-display-baby'>
                                <EntityCard mode="add-character" onClick={e => this.handleCharacterCardClick(1)} 
                                    data={this.storageUtils.characterData[this.state.selectedCharData[1]]}
                                    arti_dat={this.storageUtils.artifactData}
                                    deleteClick={e => this.handleCharacterCardDelete(1)}
                                    char_stat={this.charStats[1]}/>
                            </div>
                            <div className='char-display-baby'>
                                <EntityCard mode="add-character" onClick={e => this.handleCharacterCardClick(2)} 
                                    data={this.storageUtils.characterData[this.state.selectedCharData[2]]}
                                    arti_dat={this.storageUtils.artifactData}
                                    deleteClick={e => this.handleCharacterCardDelete(2)}
                                    char_stat={this.charStats[2]}/>
                            </div>
                            <div className='char-display-baby'>
                                <EntityCard mode="add-character" onClick={e => this.handleCharacterCardClick(3)} 
                                    data={this.storageUtils.characterData[this.state.selectedCharData[3]]}
                                    arti_dat={this.storageUtils.artifactData}
                                    deleteClick={e => this.handleCharacterCardDelete(3)}
                                    char_stat={this.charStats[3]}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <Timeline />

                    <Modal onHide={this.toggleCharacterModalState} show={this.state.showCharacterModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Character</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.renderCharacterModalBody()}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.toggleCharacterModalState}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.saveCharacterModalThenClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>;
    }

    /**
     * On-click handler for clicks to the character cards.
     * @param {number} charID - Indicates the ID of the character that was selected. 
     */
    handleCharacterCardClick(charID){
        this.currentlyEditedCharacter = charID;
        this.toggleCharacterModalState();
    }

    /**
     * On-click handler for clicks to the character card delete buttons.
     * @param {number} charID - Indicates the ID of the character card that is slated to be deleted. 
     */
    handleCharacterCardDelete(charID){
        let nscd = this.state.selectedCharData
        nscd[charID] = -1;
        this.storageUtils.envData[0] = nscd;
        this.storageUtils.saveData("environment");
        this.setState({selectedCharData: nscd});
    }

    toggleCharacterModalState(){
        this.setState({
            showCharacterModal: !this.state.showCharacterModal
        });
    }

    /**
     * Sets the characterModalSelection value when the artifact modal is set.
     * 
     * @param {*} e is the onChange event
     */
    characterModalMenuOnSelect(e){
        this.characterModalSelection = parseInt(e.target.value);
    }

    renderCharacterModalBody(){
        console.log(this.storageUtils.characterData[this.state.selectedCharData[this.currentlyEditedCharacter]])
        let notTaken = [...Array(this.storageUtils.characterData.length).keys()]
            .filter(e => !this.state.selectedCharData.includes(e) 
                && (!this.state.selectedCharData.map(e => this.storageUtils.characterData[e] !== undefined ? this.storageUtils.characterData[e].name : "").includes(this.storageUtils.characterData[e].name)
                || (this.storageUtils.characterData[this.state.selectedCharData[this.currentlyEditedCharacter]] !== undefined && this.storageUtils.characterData[this.state.selectedCharData[this.currentlyEditedCharacter]].name === this.storageUtils.characterData[e].name)));
        this.characterModalSelection = notTaken[0];
        if(notTaken.length > 0){
            let characters = notTaken.map(e => <option value={e} key={e}>
                {this.formatCharacterName(this.storageUtils.characterData[e].name)} Lvl. {this.storageUtils.characterData[e].level}
          </option>)
            return <>
                <FloatingLabel id="floatingSelect" label="Select Character:" className="mb-3" ref={this.creationModalMenuRef} onChange={e => this.characterModalMenuOnSelect(e)}>
                    <Form.Select aria-label="Select character input box" defaultValue={notTaken[0]}>
                        {characters}
                    </Form.Select>
                </FloatingLabel>
            </>
        } else {
            return <h2>Oops, you don't have any character profiles eligible to add to the team! Head to the Character page to make more character profiles.</h2>
        }
    }

    saveCharacterModalThenClose(){
        let nscd = this.state.selectedCharData;
        nscd[this.currentlyEditedCharacter] = this.characterModalSelection;
        this.charStats[this.currentlyEditedCharacter] = calcUtils.calcAll(this.storageUtils.characterData[this.characterModalSelection], this.storageUtils.artifactData);
        this.storageUtils.envData[0] = nscd;
        this.storageUtils.saveData("environment");
        this.setState(state => {
            return {selectedCharData: nscd, 
                    showCharacterModal: !state.showCharacterModal};
        });
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
}

export default EnvironmentScreen;