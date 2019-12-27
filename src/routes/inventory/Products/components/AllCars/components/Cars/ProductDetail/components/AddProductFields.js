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

        const e = this.props.Fields

        if(!e){
            return null
        }

        return (
            <div className="d-flex" style={{flexDirection:"column", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>

                <div className='d-flex' style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <span>INPUT VALUE</span>
                        <input type="value1" placeholder={"e.g 890"} value={this.state.addItemInformation.value} onChange={this._HandleAddProductDetailValue} />
                    </div>

                    <div style={{display:'flex', flexDirection:"column"}}>
                        <span>UNIT OF MEASUREMENT</span>
                        <span>{e.value2}</span>  
                    </div>
                   
                </div>

                <div className="d-flex" style={{marginTop: 20, justifyContent:"flex-end"}}>
                    <button onClick={() => this.props._HandleSaveProductDetail(this.state.addItemInformation)}>ADD</button>     
                    {/* <button onClick={this.props._HandleCancelProductDetail}>Cancel</button>      */}
                </div>
            </div>
        );
    }
};
