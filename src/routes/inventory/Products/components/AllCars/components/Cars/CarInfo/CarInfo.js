import React, {PureComponent, Component} from "react";
import api from "Api";

import CarInfo from './Components/index'
import Button from 'Components/Inventory/Button'

export default class Index extends PureComponent {
    
    constructor(props) {
        super(props);
        
        if(this.props.Car){
           
            this.state = {
                Product: this.props.Car,
                Images: this.props.Car.files,
                files: [],
            }
            
        } else {
         
            this.state = {
                Product: {
                    name: '',
                    sku: '',
                    description: '',
                    product_code: '',
                    cost_Price: '',
                    selling_Price: '',
                    isActive: true,
                    isFeature: false,
                },
                Images:[],
                files: [],
            }
            
        }

        
        
    }


    _HandleProduct = (e, element) => {
        let Product = {...this.state.Product}
            

        if(element == "isActive") {
          Product.isActive = !Product.isActive
          this.setState({Product: Product})
        } else if (element == "isFeature"){
          Product.isFeature = !Product.isFeature
          this.setState({Product: Product})
        } else {
          Product[element] = e
          this.setState({Product: Product})
        }
        
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
            <div style={{}}>

                <h1 style={{textAlign:'center'}}>GENERAL CAR INFORMATION</h1>

                <CarInfo
                    _HandleProduct={this._HandleProduct}
                    Product = {this.state.Product}
                    Images={this.state.Images}
                    files={this.state.files}
                    handleUpload={this.handleUpload}
                    removeFile={this.removeFile}
                />

                {!this.props.Car && 
                    <div className="d-flex" style={{marginTop: 20, justifyContent:"flex-end"}}>
                        <Button
                            _Function={this.props._CreateProduct}
                            product={this.state.Product}
                            files={this.state.files}
                            title={"SAVE CHANGES"}
                        />
                        {/* <button onClick={() => this.props._CreateProduct(this.state.Product, this.state.files)}>SAVE CHANGES</button>      */}
                    </div>
                }
            
                {this.props.Car && 
                    <div className="d-flex" style={{marginTop: 20, justifyContent:"flex-end"}}>
                        {/* <button onClick={() => this.props._EditProduct(this.state.Product, this.state.files)}>EDIT CHANGES</button>    */}
                        <Button
                            _Function={this.props._EditProduct}
                            product={this.state.Product}
                            files={this.state.files}
                            title={"SAVE CHANGES"}
                        />  
                    </div>
                }

            </div>
        );
  }
};
