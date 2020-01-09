import React, {PureComponent} from "react";

import Image from 'Components/Image'

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'




export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : this.props.Fields
        }
    }
    


    render () {

        const e = this.state.addItemInformation

        if(!e){
            return null
        }

        return (
            <div className="d-flex" style={{flexDirection:"column", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>

                <div className='d-flex' style={{justifyContent:'flex-start', flexDirection:'row'}}>

                    <div style={{display:'flex', flexDirection:"column", width:'30%'}}>
                        <StaticName
                            title="CURRENT IMAGE"    
                        />
                        {e.files.length > 0 && 
                            <Image
                                imageSource={e.files}
                                single={true}
                            />
                        }                                        
                    </div>

                    <Text
                        divStyle={{width: '30%'}}
                        title="PRICE"
                        value={`${e.price} SGD`}
                    />

                    <Text
                        divStyle={{width: '30%'}}
                        title="IsDefault"
                        value={`${e.isDefault}`}
                    />

                    <Text
                        divStyle={{width: '30%'}}
                        title="Editable"
                        value={`${e.editable}`}
                    />


                    {/* <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>IsDefault</span>
                        <span>{`${e.isDefault}`}</span>
                    </div>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>Editable</span>
                        <span>{`${e.editable}`}</span>
                    </div> */}

                </div>

                <div className="d-flex" style={{justifyContent:"flex-end", marginTop: 20, marginBottom: 20}}>
                    {/* <button onClick={() => this.props._HandleSaveProductOption(this.state.addItemInformation)}>ADD</button>      */}
                    <Button
                        _Function={this.props._HandleSaveProductOption}
                        product={this.state.addItemInformation}
                        files={''}
                        title={'ADD'}
                    />
                    {/* <button onClick={this.props._HandleCancelProductOption}>Cancel</button>      */}
                </div>
            </div>
        );
    }
};
