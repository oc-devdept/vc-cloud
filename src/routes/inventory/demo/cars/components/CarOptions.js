import React, { Component } from "react";
import api from "Api";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';




export default class CarOptions extends Component {
    

    render() {

        return (
            <div className="d-flex" style={{flexDirection:'column'}}>

                <div className="d-flex">
                    <div>Car : </div>
                </div>

                {this.props.loading && 
                    <div>Fetching Car List ... </div>
                }

                <List dense>
                    {this.props.MakeSource.map((e, index) => {
                        return (
                            <ListItem key={index} button>

                                <span style={{padding: 5}} onClick={() => this.props.toggleSubComponents(e.name)}>{e.name}</span>

                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={() => this.props._HandleCheckBox(e, index)}
                                        checked={e.checklist}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>


            </div>
        )

    }
}