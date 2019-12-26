import React, {PureComponent} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from "Components/Dropzone";



const OriginalProductVariantValues = {
    name: '',
    image: '',
    price : '',
    isDefault: false,
}

export default class Index extends PureComponent {

    state=({
        ProductVariantValues : {
            name: '',
            image: '',
            price : '',
            isDefault: false,
        },
        files:[]
    })

    // Handle Category Name Value
    _HandleProductDetailValue = (e, value) => {
        let ProductVariantValues = {...this.state.ProductVariantValues}
        ProductVariantValues[value] = e
        this.setState({ProductVariantValues: ProductVariantValues})
    }

    _HandleCheckBox = (e) => {
        const name = e.target.name
        let ProductVariantValues = {...this.state.ProductVariantValues}
        ProductVariantValues[name] = !ProductVariantValues[name]
        this.setState({ProductVariantValues: ProductVariantValues})
    }

    removeFile = (file) => {
        this.setState(state => {
        const index = state.files.indexOf(file);
        const files = state.files.slice(0);
        files.splice(index, 1);
        return { files };
        });
    }

    handleUpload = file => {
        this.setState({
            files: file
        });
    };

    render () {

        return (
            <div className="d-flex" style={{flex: 1, flexDirection:"column", padding :20}}>

                <span style={{paddingBottom: 20}}>CREATE A NEW VARIANT BELOW</span>

                <div className="d-flex" style={{display:'flex', flexDirection:"row", justifyContent:"space-between", paddingBottom: 20}}>
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <span>NAME OF THE VARIANT ITEM</span>
                        <input type="text" placeholder={""} value={this.state.ProductVariantValues.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                    </div>
            
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <span>PRICE</span>
                        <input type="text" placeholder={"e.g price"} value={this.state.ProductVariantValues.price} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'price')} />
                    </div>
                </div>


                <div className="d-flex" style={{display:'flex', flexDirection:"row", justifyContent:"space-between", }}>
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <span>IMAGE UPLOAD</span>
                        <Dropzone
                            onDrop={this.handleUpload}
                            onRemove={this.removeFile}
                            uploadedFiles={this.state.files}
                            additionalText="Files can't be edited once uploaded."
                        />
                    </div>


                    <div style={{display:'flex', display: 'flex', alignItems:"center"}}>
                        <span>isDefault</span>
                        <Checkbox
                            edge="end"
                            onChange={this._HandleCheckBox}
                            checked={this.state.ProductVariantValues.isDefault}
                            name="isDefault"
                        />   
                    </div>
                </div>


                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={() => {
                        this.props._AddVariantValues(this.state.ProductVariantValues, this.state.files)
                        this.setState({ProductVariantValues: OriginalProductVariantValues, files:[]})
                    }}>Create New Variant</button>
                </div>

            </div>
        );
    }
};


