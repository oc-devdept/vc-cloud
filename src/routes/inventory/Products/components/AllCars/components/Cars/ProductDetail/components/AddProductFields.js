import React, {PureComponent} from "react";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'


export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : {...this.props.Fields, value: ''}
        }
    }
    
    _HandleAddProductDetailValue =(e)=> {
        let addItemInformation = {...this.state.addItemInformation}
        addItemInformation.value = e
        this.setState({addItemInformation: addItemInformation})
    }

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

                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="INPUT VALUE"
                        placeholder="e.g 890"
                        value={this.state.addItemInformation.value}
                        element={'value'}
                        _HandleProduct={this._HandleAddProductDetailValue}
                    />  

                    {/* <div style={{display:'flex', flexDirection:"column"}}>
                        <span>UNIT OF MEASUREMENT</span>
                        <span>{e.value2}</span>  
                    </div> */}
                   
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
