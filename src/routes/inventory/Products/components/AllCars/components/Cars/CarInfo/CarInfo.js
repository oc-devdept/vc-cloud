import React, {PureComponent, Component} from "react";
import api from "Api";

import Grade from './Components/index'


export default class Index extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            Product: {
                name: '',
                image: '',
                description: '',
                product_code: '',
                costPrice: '',
                sellingPrice: '',
                isActive: true,
            },

            files: [],
        }
        
    }


    _HandleProduct = (e, element) => {
        let Product = {...this.state.Product}
    
        if(element == "isActive") {
          Product.isActive = !Product.isActive
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

                <h1 style={{textAlign:'center'}}>Car Information</h1>

                <Grade
                    _HandleProduct={this._HandleProduct}
                    Product = {this.state.Product}
                    files={this.state.files}
                    handleUpload={this.handleUpload}
                    removeFile={this.removeFile}
                />
           
            </div>
        );
  }
};
