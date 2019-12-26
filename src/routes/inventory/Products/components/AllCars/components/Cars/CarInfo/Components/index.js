import React, { Component, PureComponent } from "react";
import Checkbox from '@material-ui/core/Checkbox';

import Dropzone from "Components/Dropzone";


class Grade extends PureComponent {

    
  

    render() {
      const {_HandleProduct, Product, files, handleUpload, removeFile} = this.props


      return (
        <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>
          
          <div className="d-flex" style={{flexDirection:'column'}}>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                <div className="d-flex" style={{flexDirection:'column'}}>
                  <span>SKU NUMBER</span>
                  <input 
                    type="SKU" 
                    placeholder={"e.g SKU"} 
                    value={''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'sku')}
                  />
                </div>
                <div className="d-flex" style={{flexDirection:'column'}}>
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
                
                <div className="d-flex" style={{flexDirection:'column'}}>
                  <span>Display Status</span>
                  <Checkbox
                      edge="end"
                      onChange={(e) => _HandleProduct('', 'isActive')}
                      checked={Product.isActive}
                  />
                </div>

                <div className="d-flex" style={{flexDirection:'column'}}>
                  <span>Cost Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Cost Price"} 
                    value={Product.costPrice ? Product.costPrice : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'costPrice')}
                  />
                </div>

                <div className="d-flex" style={{flexDirection:'column'}}>
                  <span>Selling Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Selling Price"} 
                    value={Product.sellingPrice ? Product.sellingPrice : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'sellingPrice')}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                
                <div className="d-flex" style={{flexDirection:'column'}}>
                  <span>Image</span>
                  <Dropzone
                      onDrop={handleUpload}
                      onRemove={removeFile}
                      uploadedFiles={files}
                      additionalText="Files can't be edited once uploaded."
                  />
                </div>

                <div className="d-flex" style={{flexDirection:'column'}}>
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
