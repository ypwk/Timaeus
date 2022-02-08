import React from 'react';

import "../css/TimelineStyling.css";

class Timeline extends React.Component {

    constructor(props){
        super(props);

        this.zoom = 1;
        this.viewIntervalBegin = 0;
        this.defaultViewIntervalLength = 20;
        this.subDivisions = this.defaultViewIntervalLength * 5;

        this.storageUtils = this.props.storageUtil;
    }

    render(){
        //render time indicator (tick marks and time at the top of the timeline)
        let time_indicator = [];
        for(let a = this.viewIntervalBegin; a < this.subDivisions - 1; a++){
            time_indicator.push(<th scope='col' className="" key={a}>
                <div className='timeline-title-constituent'> 
                    {this.viewIntervalBegin + (this.defaultViewIntervalLength * this.zoom * a) / this.subDivisions}
                </div>
            </th>);
        }
        time_indicator.push(<th scope='col' className="timeline-title-constituent" key={this.subDivisions}>
            <div className='timeline-title-constituent'>
                {this.viewIntervalBegin + (this.defaultViewIntervalLength * this.zoom)}
            </div>
        </th>);

        //render character displays
        let chr_disp = this.props.char_dat.map(e => this.props.storageUtil.characterData[e])
                                        .map((e, i) => e !== undefined ? <tr key={i}>
                                                <td>
                                                    Deez Nuts
                                                </td>
                                                <td>
                                                    {e.name}
                                                </td>
                                            </tr> : <tr key={i}>
                                                <td>
                                                    Deez Nuts
                                                </td>
                                                <td>
                                                    is udnefifned
                                                </td>
                                            </tr>);
        return <div className='timeline-container'>
            <div className='timeline-title'>
                <h3 className='ml-1'>Timeline</h3>
            </div>
            <table className="timeline-table">
                <thead className="ctext">
                    <tr>
                        {time_indicator}
                    </tr>
                </thead>
                <tbody>
                    {chr_disp}
                </tbody>
                </table>
            </div>
    }
}

export default Timeline;