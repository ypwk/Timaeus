import React from 'react';

import "../css/TimelineStyling.css";

class Timeline extends React.Component {

    constructor(props){
        super(props);

        this.zoom = 1;
        this.viewIntervalBegin = 0;
        this.defaultViewIntervalLength = 10;
        this.subDivisions = 50;
    }

    render(){
        let time_indicator = [];
        for(let a = this.viewIntervalBegin; a < this.subDivisions - 1; a++){
            time_indicator.push(<th scope='col' key={a}>{this.viewIntervalBegin + (this.defaultViewIntervalLength * this.zoom * a) / this.subDivisions}</th>);
        }
        time_indicator.push(<th scope='col' key={this.subDivisions}>{this.viewIntervalBegin + (this.defaultViewIntervalLength * this.zoom)}</th>);
        return <div className='timeline-container'>
            <div className='timeline-title'>
                <h3 className='ml-1'>Timeline</h3>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {time_indicator}
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
            </div>
    }
}

export default Timeline;