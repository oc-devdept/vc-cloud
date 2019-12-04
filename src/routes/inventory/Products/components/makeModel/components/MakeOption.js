import React, { Component, useState } from "react";
import api from "Api";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const initialMake = {
    name:'',
    description: '',
    image: '',
}

export default class MakeOption extends Component {

    state=({
        openMake: false,
        Make : {
            name:'',
            description: '',
            image: '',
        },
    })

    _HandleMake = (e, value) => {
        let Make = {...this.state.Make}
        Make[value] = e
        this.setState({Make: Make})
    }

    _SaveMake = async() => {
        console.log('save make!')
        await this.props._SaveMake(this.state.Make)
        this.setState({Make: initialMake})
    }

    render() {

        const {MakeLoading, MakeSource, _HandleMakeOption} = this.props
       

        return (
            <div style={{flex: 1, display:'flex', flexDirection:'row'}}>

                <div style={{}}>
                    Make Option
                    {MakeLoading && 
                        <div>
                            loading ...
                        </div>
                    }

                    {!MakeLoading && 
                        <div className="d-flex" style={{cursor:'pointer'}} >
                            {MakeSource.map((e, index) => {
                                return (
                                    <div onClick={() => _HandleMakeOption(e.name, e.id)} 
                                        style={{
                                            border: '1px solid black', 
                                            borderRadius: 5, padding: 2.5, marginRight: 5
                                        }} key={index}
                                    >
                                        {e.name}
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>

                <div>
                    <button onClick={()=> this.setState({openMake: !this.state.openMake})} >Create Make</button>
                    {this.state.openMake &&
                        <div className="d-flex" style={{flexDirection:'column'}}>
                            <input type="name" placeholder={"e.g BMW"} value={this.state.Make.name} onChange={(e) => this._HandleMake(e.target.value, 'name')} />
                            <input type="value" placeholder={"e.g description"} value={this.state.Make.description} onChange={(e) => this._HandleMake(e.target.value, 'description')} />
                            <input type="value2" placeholder={"e.g image url"} value={this.state.Make.image} onChange={(e) => this._HandleMake(e.target.value, 'image')} />
                            <button style={{}} onClick={this._SaveMake}>Save Make</button>
                        </div>
                    }
                </div>

            </div>
        )
    }
}