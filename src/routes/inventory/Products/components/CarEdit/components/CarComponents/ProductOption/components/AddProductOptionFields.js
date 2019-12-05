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

                <div className='d-flex' style={{justifyContent:'space-between'}}>
                    <span>{e.name}</span>
                    <span>{e.price}</span>
                    <span>{e.value2}</span>  
                    <span>image??</span>  
                    <span>{e.isDefault}</span>
                    <span>{e.editable}</span>

                </div>

                <div className="d-flex">
                    <button onClick={() => this.props._HandleSaveProductOption(this.state.addItemInformation)}>Add Product Option</button>     
                    <button onClick={this.props._HandleCancelProductOption}>Cancel</button>     
                </div>
            </div>
        );
    }
};
