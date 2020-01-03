import React, { Component, PureComponent } from "react";
import Checkbox from '@material-ui/core/Checkbox';

import Dropzone from "Components/Dropzone";

import Image from 'Components/Image'


class Grade extends PureComponent {

    
    render() {
      const {_HandleProduct, Product, files, handleUpload, removeFile} = this.props

      return (
        <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>
          
          <div className="d-flex" style={{flexDirection:'column'}}>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>SKU NUMBER</span>
                  <input 
                    type="SKU" 
                    placeholder={"e.g SKU"} 
                    value={Product.sku} 
                    onChange={(e) => _HandleProduct(e.target.value, 'sku')}
                  />
                </div>
                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Name</span>
                  <input 
                    type="name" 
                    placeholder={"e.g Name of Model"} 
                    value={Product.name ? Product.name : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'name')}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                
                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Display Status</span>
                  <Checkbox
                      edge="end"
                      onChange={(e) => _HandleProduct('', 'isActive')}
                      checked={Product.isActive}
                  />
                </div>

                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Cost Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Cost Price"} 
                    value={Product.cost_Price ? Product.cost_Price : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'cost_Price')}
                  />
                </div>

                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Selling Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Selling Price"} 
                    value={Product.selling_Price ? Product.selling_Price : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'selling_Price')}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  
                  <span>Image</span>

                  {files.length > 0 &&
                      
                      <Image
                        imageSource={files}
                        single={true}
                      />
                  }
                  
                  {files.length == 0 &&
                    <Dropzone
                      onDrop={handleUpload}
                      onRemove={removeFile}
                      uploadedFiles={files}
                      additionalText="Files can't be edited once uploaded."
                    />
                  }
                  
                </div>
                <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Description</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Description"} 
                    value={Product.description ? Product.description : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'description')}
                  />
                </div>
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
          

        </div>
      )
  }
  
}

export default Grade;
