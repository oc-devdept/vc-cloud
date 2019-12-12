import React, { Component, PureComponent } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ProductDetail from './ProductDetail'
import Dropzone from "Components/Dropzone";


class Grade extends PureComponent {

    state=({
      content: "",
      name: "",
      start: new Date(),
      end: new Date(),
      files: []
    })

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

    render() {
      const {ModelId, _HandleProduct, Product, ProductDetailCategory} = this.props
      console.log('Grade')

      const { show, handleHide, edit } = this.props;
      const { content, name, files, start, end } = this.state;



    return (
      <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>
        
        <div className="d-flex" style={{flexDirection:'row'}}>        
          <div>
            Grade:
          </div>

        </div>

        {ModelId != '' && 
          <div className="d-flex" style={{flexDirection:'column'}}>

            <div>
              <span>Name</span>
              <input 
                type="name" 
                placeholder={"e.g Name of Model"} 
                value={Product.name ? Product.name : ''} 
                onChange={(e) => _HandleProduct(e.target.value, 'name')}
              />
            </div>
            
            <div>
              <span>Description</span>
              <input 
                type="text" 
                placeholder={"e.g Description"} 
                value={Product.description ? Product.description : ''} 
                onChange={(e) => _HandleProduct(e.target.value, 'description')}
              />
            </div>

            <div>
              <span>Image</span>
              <input 
                type="text" 
                placeholder={"e.g Image"} 
                value={Product.image ? Product.image : ''} 
                onChange={(e) => _HandleProduct(e.target.value, 'image')}
              />

              {/* need to setup upload image. */}
              <Dropzone
                  onDrop={this.handleUpload}
                  onRemove={this.removeFile}
                  uploadedFiles={files}
                  additionalText="Files can't be edited once uploaded."
              />
            
            </div>

           

            <div>
              <span>Cost Price</span>
              <input 
                type="text" 
                placeholder={"e.g Cost Price"} 
                value={Product.costPrice ? Product.costPrice : ''} 
                onChange={(e) => _HandleProduct(e.target.value, 'costPrice')}
              />
            </div>

            <div>
              <span>Selling Price</span>
              <input 
                type="text" 
                placeholder={"e.g Selling Price"} 
                value={Product.sellingPrice ? Product.sellingPrice : ''} 
                onChange={(e) => _HandleProduct(e.target.value, 'sellingPrice')}
              />
            </div>

            <div>
              <span>IsActive</span>
              <Checkbox
                  edge="end"
                  onChange={(e) => _HandleProduct('', 'isActive')}
                  checked={Product.isActive}
              />
            </div>

            {/* <div className="d-flex" style={{flexDirection: 'row'}}>
              <div style={{border : '1px solid black', borderStyle : 'dashed', height: 60, display:'flex', justifyContent:'center', alignItems:'center'}}>
                  Drag columns from the sidebar and drop them here to create your product detail
              </div>

              <ProductDetail
                ProductDetailCategory={ProductDetailCategory} 
              />
            </div> */}
         
         
         
          </div>
        }

      </div>
    )
  }
  
}

export default Grade;
