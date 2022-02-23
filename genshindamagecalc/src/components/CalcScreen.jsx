import React from "react"
import EntityCard from './EntityCard';
import Button from "react-bootstrap/Button";

import calcUtils from "../utils/calcUtils";
import Reaction from "../utils/reaction";

class CalcScreen extends React.Component{
    constructor(props){
        super(props);

        this.storageUtils = props.storageUtil;
        this.state = {
            selectedChar: this.storageUtils.envData[0][1]
        }

        this.charStats = calcUtils.calcAll(this.storageUtils.characterData[this.state.selectedChar], this.storageUtils.artifactData);
        
        
    }
    render(){
        return (
            <div>
                <div className='char-display-container'>
                    <div className='char-display-baby'>
                        <EntityCard mode="add-character" onClick={e => this.handleCharacterCardClick(0)} 
                            data={this.storageUtils.characterData[this.state.selectedChar]}
                            arti_dat={this.storageUtils.artifactData}
                            deleteClick={e => this.handleCharacterCardDelete(0)}
                            char_stat={this.charStats}/>
                    </div>
                </div>
                <Button variant="primary" onClick={this.testSomething}>
                    Test Button Poo Poo
                </Button>
            </div>
            
        );
    }

    testSomething() {
    }
}
export default CalcScreen;