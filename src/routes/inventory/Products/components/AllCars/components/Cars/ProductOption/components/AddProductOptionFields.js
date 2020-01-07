import React, {PureComponent} from "react";

import Image from 'Components/Image'

export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : this.props.Fields
        }
    }
    


    render () {

        const e = this.props.Fields

        if(!e){
            return null
        }

        return (
            <div className="d-flex" style={{flexDirection:"column", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>

                <div className='d-flex' style={{justifyContent:'flex-start', flexDirection:'row'}}>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>IMAGE</span>
                        {e.files.length > 0 && 
                            
                            <Image
                                imageSource={e.files}
                                single={true}
                            />
                        }                                        
                    </div>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>PRICE</span>
                        <span>{e.price} SGD</span>
                    </div>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>IsDefault</span>
                        <span>{`${e.isDefault}`}</span>
                    </div>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>Editable</span>
                        <span>{`${e.editable}`}</span>
                    </div>

                </div>

                <div className="d-flex" style={{justifyContent:"flex-end", marginTop: 20, marginBottom: 20}}>
                    <button onClick={() => this.props._HandleSaveProductOption(this.state.addItemInformation)}>ADD</button>     
                    {/* <button onClick={this.props._HandleCancelProductOption}>Cancel</button>      */}
                </div>
            </div>
        );
    }
};