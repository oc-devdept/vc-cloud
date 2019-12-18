import React, {PureComponent} from "react";


export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : this.props.Fields
        }
    }
    


    render () {

        const e = this.state.addItemInformation

        return (
            <div>

                <div className='d-flex' style={{justifyContent:'space-between', flexDirection:'column'}}>
                    <span>Name: {e.name}</span>
                    <span>Price: {e.price} SGD</span>
                    <span>{e.value2}</span>  
                    <span>{e.image}</span>  
                    <span>IsDefault: {`${e.isDefault}`}</span>
                    <span>Editable: {`${e.editable}`}</span>
                </div>

                <div className="d-flex" style={{marginTop: 20, marginBottom: 20}}>
                    <button onClick={() => this.props._HandleSaveProductOption(this.state.addItemInformation)}>Add Product Option</button>     
                    <button onClick={this.props._HandleCancelProductOption}>Cancel</button>     
                </div>
            </div>
        );
    }
};
