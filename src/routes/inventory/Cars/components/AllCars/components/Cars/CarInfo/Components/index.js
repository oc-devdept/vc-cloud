import React, { Component, PureComponent } from "react";
import Checkbox from '@material-ui/core/Checkbox';

import Dropzone from "Components/Dropzone";
import Image from 'Components/Image'

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Switch from 'Components/Inventory/Switch';


class Grade extends PureComponent {

    
    render() {
      const {_HandleProduct, Product, Images, files, handleUpload, removeFile, Thumbs, imgThumbs, handleThumbUpload, removeThumb} = this.props

      return (
        <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>
          
          <div className="d-flex" style={{flexDirection:'column'}}>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>

                <Input
                  divStyle={{width: '40%'}}
                  title="SKU NUMBER"
                  placeholder="e.g SKU"
                  value={Product.sku}
                  element={'sku'}
                  _HandleProduct={_HandleProduct}
                />

                
                <Input
                  divStyle={{width: '40%'}}
                  title="NAME"
                  placeholder="e.g Name of Model"
                  value={Product.name ? Product.name : ''}
                  element={'name'}
                  _HandleProduct={_HandleProduct}
                />


                <Switch
                  title={'SET ACTIVE'}
                  checked = {Product.isActive}
                  element={'isActive'}
                  _HandleProduct={_HandleProduct}
                />
    
                {/* <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>SKU NUMBER</span>
                  <input 
                    type="SKU" 
                    placeholder={"e.g SKU"} 
                    value={Product.sku} 
                    onChange={(e) => _HandleProduct(e.target.value, 'sku')}
                  />
                </div> */}

                
                {/* <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Name</span>
                  <input 
                    type="name" 
                    placeholder={"e.g Name of Model"} 
                    value={Product.name ? Product.name : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'name')}
                  />
                </div> */}

              </div>

              <div className="d-flex justify-content-between" style={{flexDirection:'row'}}>
                
                {/* <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Display Status</span>
                  <Checkbox
                      edge="end"
                      onChange={(e) => _HandleProduct('', 'isActive')}
                      checked={Product.isActive}
                  />
                </div> */}

                <Text
                  divStyle={{width: '30%'}}
                  title="MAKE TYPE"
                  value={Product.categorySource}
                />

                <Input
                  divStyle={{width: '30%'}}
                  title="COST PRICE"
                  placeholder="e.g 49000"
                  value={Product.cost_Price ? Product.cost_Price : ''}
                  element={'cost_Price'}
                  _HandleProduct={_HandleProduct}
                  type="number"
                />
            
                <Input
                  divStyle={{width: '30%'}}
                  title="SELLING PRICE"
                  placeholder="e.g 33310"
                  value={Product.selling_Price ? Product.selling_Price : ''}
                  element={'selling_Price'}
                  _HandleProduct={_HandleProduct}
                  type="number"
                />

                {/* <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Cost Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Cost Price"} 
                    value={Product.cost_Price ? Product.cost_Price : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'cost_Price')}
                  />
                </div> */}

                {/* <div className="d-flex" style={{flexDirection:'column', width: '100%'}}>
                  <span>Selling Price</span>
                  <input 
                    type="text" 
                    placeholder={"e.g Selling Price"} 
                    value={Product.selling_Price ? Product.selling_Price : ''} 
                    onChange={(e) => _HandleProduct(e.target.value, 'selling_Price')}
                  />
                </div> */}
              </div>

              <div className="d-flex justify-content-between" style={{flexDirection:'row', marginBottom: 10}}>

                <div className="d-flex" style={{flexDirection:'column',}}>
                  
                  <div style={{marginBottom: 10}}>
                    <span style={{ color:'rgba(150,150,150,1)'}}>IMAGE</span>
                    <div style={{paddingBottom: 10, paddingTop: 10,}}>
                      {Images.length > 0 &&
                          <Image
                            imageSource={Images}
                            single={true}
                          />
                      }
                    </div>
                  </div>
                  
                  <Dropzone
                    onDrop={handleUpload}
                    onRemove={removeFile}
                    uploadedFiles={files}
                    additionalText="Files can't be edited once uploaded."
                  />
                
                </div>
                  
                <Input
                  textarea={true}
                  divStyle={{width: '60%'}}
                  title="DESCRIPTION"
                  placeholder="e.g Describe your car information"
                  value={Product.description ? Product.description : ''}
                  element={'description'}
                  _HandleProduct={_HandleProduct}
                  style={{height:'100%', backgroundColor: 'rgba(244,246,251,1)', borderRadius: 8, border: 'none', padding: 20}}
                />

                <div className="d-flex" style={{flexDirection:'column',}}>
                  
                  <div style={{marginBottom: 10}}>
                    <span style={{ color:'rgba(150,150,150,1)'}}>THUMBNAIL</span>
                    <div style={{paddingBottom: 10, paddingTop: 10,}}>
                      {Thumbs.length > 0 &&
                          <Image
                            imageSource={Thumbs}
                            single={true}
                          />
                      }
                    </div>
                  </div>
                  
                  <Dropzone
                    onDrop={handleThumbUpload}
                    onRemove={removeThumb}
                    uploadedFiles={imgThumbs}
                    additionalText="Files can't be edited once uploaded."
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
