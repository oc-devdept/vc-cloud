import React, {PureComponent} from "react";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const BooleanOption = ['Yes', "No"]

export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : {...this.props.Fields, value: ''}
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevState.addItemInformation.id != this.props.Fields.id) {
          return this.props.Fields
        }
        return null;
      }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        if (snapshot !== null) {
            this.setState({addItemInformation : {...this.props.Fields, value: ''}})
        }
    }
    

    _HandleAddProductDetailValue =(e)=> {
        let addItemInformation = {...this.state.addItemInformation}
        addItemInformation.value = e
        this.setState({addItemInformation: addItemInformation})
    }


    _HandleAddProductDetailValueBoolean =(e)=> {
        let addItemInformation = {...this.state.addItemInformation}
        addItemInformation.value = e.target.value
        this.setState({addItemInformation: addItemInformation})
    }

    _RenderTypeInput = (type) => {
        let component = null

        switch(type){
            case "String":
                component =(
                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="INPUT VALUE"
                        placeholder="e.g 890"
                        value={this.state.addItemInformation.value}
                        element={'value'}
                        _HandleProduct={this._HandleAddProductDetailValue}
                    /> 
                )
                break
            case "Number":
                component =(
                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="INPUT VALUE"
                        placeholder="e.g 890"
                        value={this.state.addItemInformation.value}
                        element={'value'}
                        _HandleProduct={this._HandleAddProductDetailValue}
                        type="number"
                    /> 
                )
                break
            case "Boolean":
                component =(
                    <FormControl style={{width: '50%'}}>
                        <StaticName title={"INPUT VALUE"}/>
                        <Select 
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={this.state.addItemInformation.value}
                            onChange={this._HandleAddProductDetailValueBoolean}
                            style={{minWidth: 100, marginLeft: 5}}
                        >
                        
                            {BooleanOption.map((e, index) => {
                                return <MenuItem key={index} value={e}>{e}</MenuItem>
                            })}
                        
                        </Select>
                    </FormControl>
                )
                break

            default:break
        }

        return component
    }

    // <Input
    //     divStyle={{width: '100%', marginRight: 30}}
    //     title="INPUT VALUE"
    //     placeholder="e.g 890"
    //     value={this.state.addItemInformation.value}
    //     element={'value'}
    //     _HandleProduct={this._HandleAddProductDetailValue}
    //     type="number"
    // /> 


    render () {

        // const e = this.props.Fields

        // if(!e){
        //     return null
        // }
        
        return (
            <div className="d-flex" style={{flexDirection:"column", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>

                <div className='d-flex' style={{justifyContent:'space-between', flexDirection:'row'}}>
                    {/* <div style={{display:'flex', flexDirection:"column"}}>
                        <span>INPUT VALUE</span>
                        <input 
                        type="value1" 
                        placeholder={"e.g 890"}
                        value={this.state.addItemInformation.value} onChange={this._HandleAddProductDetailValue} />
                    </div> */}

                    {this._RenderTypeInput(this.state.addItemInformation.type)}
                    

                    <Text
                        divStyle={{width: '30%'}}
                        title="UNIT OF MEASUREMENT"
                        value={this.state.addItemInformation.unit}
                    />


                    

                </div>

                <div className="d-flex" style={{marginTop: 20, justifyContent:"flex-end"}}>
                    {/* <button onClick={() => this.props._HandleSaveProductDetail(this.state.addItemInformation)}>ADD</button>     */}
                    <Button
                        _Function={this.props._HandleSaveProductDetail}
                        product={this.state.addItemInformation}
                        files={''}
                        title={'ADD'}
                    />
                    {/* <button onClick={this.props._HandleCancelProductDetail}>Cancel</button>*/}
                </div>
            </div>
        );
    }
};
