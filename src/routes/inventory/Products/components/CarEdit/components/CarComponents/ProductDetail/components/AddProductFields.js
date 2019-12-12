import React, {PureComponent} from "react";


export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addItemInformation : this.props.Fields
        }
    }
    
    _HandleAddProductDetailValue =(e)=> {

        let addItemInformation = {...this.state.addItemInformation}
        addItemInformation.value = e.target.value
        this.setState({addItemInformation: addItemInformation})
    }

    render () {
        const e = this.state.addItemInformation

        console.log(e)
        return (
            <div>

                <div className='d-flex' style={{justifyContent:'space-between', flexDirection:'column'}}>
                    <span>Name: {e.name}</span>
                    {/* <input type="value1" placeholder={"e.g 890"} value={e.value} onChange={this._HandleAddProductDetailValue} /> */}
                    <span>Unit: {e.value2}</span>  
                </div>

                <div className="d-flex" style={{marginTop: 20, marginBottom: 20}}>
                    <button onClick={() => this.props._HandleSaveProductDetail(this.state.addItemInformation)}>Save</button>     
                    <button onClick={this.props._HandleCancelProductDetail}>Cancel</button>     
                </div>
            </div>
        );
    }
};
