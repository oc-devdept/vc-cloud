import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { Add, Remove } from "@material-ui/icons";


import api from "Api";

import BgCard from "Components/BgCard";

import ProductVariant from './ProductVariant/index'
import ProductDetail from './ProductDetail/index'
import ProductOption from './ProductOption/index'

import CarInfo from './CarInfo/CarInfo'


export default class Index extends Component {

  constructor(props) {
    super(props);
      this.state=({
        Car : {},

        ProductDetailLoading: false,
        ProductOptionLoading: false,
        ProductVariantLoading: false,


        stage: null
      })
  }

 
  // Product Variant
  // _AddVariant = async(Variant) => {
  //   let Car = {...this.state.Car}
  //   const result = await this._SaveProductVariant(Variant, Car.id)
  //   Car.productVariant = result
  //   this.setState({Car: Car})
  // }

  _SaveProductVariant = async(Variant, id) => { 
    await api.post(`/productvariants`, 
        {
            name: Variant.name,
            groupName: Variant.groupName,
            // productId: id
        }
    )

    const latestProduct = await api.get(`/products/${Car.id}`)
    this.setState({Car: latestProduct.data})
  }

  _AddVariantValues = async (item, productVariantId, files) => {

   
    const Car = {...this.state.Car}
    await this.setState({ProductVariantLoading: true})

    var data = new FormData();
    files.map(file => data.append(`upload`, file));
    data.append("name", item.name);
    data.append("isDefault", item.isDefault);
    data.append("price", item.price);
    data.append("productId", Car.id);
    data.append("productVariantId", productVariantId);

      
    // await this.setState({ProductVariantLoading: true})
    await api.post("/productvariantvalues/newVariant", data)
    // await api.post(`/products/${Car.id}/productVariant`, 
    //     {
    //         name: item.name,
    //         image: item.image,
    //         isDefault: item.isDefault,
    //         price: item.price,
    //         productVariantId: productVariantId
    //     }
    // ); 
    
    const latestProduct = await api.get(`/products/${Car.id}`)
    await this.setState({Car: latestProduct.data, ProductVariantLoading: false})

  }

  _DeleteProductVariant = async(index) => {

    await this.setState({ProductVariantLoading: true})

    let Car = {...this.state.Car}

    const productId = Car.productVariant[index].id

    const result = await api.delete(`/productvariantvalues/${productId}`); 
    
    if(result.data.count == 1){
        const latestProduct = await api.get(`/products/${Car.id}`)
        await this.setState({Car : latestProduct.data, ProductVariantLoading: false})
    } else {
        await this.setState({ ProductVariantLoading: false})
    }

  }

  // Product Detail
  _AddCarDetail = (productDetail) => {
    let Car = {...this.state.Car}
    Car.productDetail.push(productDetail)
    this.setState({Car: Car})
  }

  _SaveCarDetail = async(e) => {

    await this.setState({ProductDetailLoading: true})

    let Car = {...this.state.Car}

    await api.post(`/products/${Car.id}/productDetail`, {
      name: e.name,
      type: e.type,
      value: e.value,
      value2: e.value2,
      productDetailCategoryId: e.productDetailCategoryId
    }); 
    
    const latestProduct = await api.get(`/products/${Car.id}`)
    this.setState({Car: latestProduct.data})

    await this.setState({ProductDetailLoading: false})

  }

  _HandleProductDetailValue = (targetValue, element, index) => {
    let Car = {...this.state.Car}
    Car.productDetail[index].value = targetValue
    this.setState({Car: Car})
  }

  _DeleteProductDetailFields = async(index) => {

    await this.setState({ProductDetailLoading: true})

    let Car = {...this.state.Car}

    const productId = Car.productDetail[index].id

    const result = await api.delete(`/productDetails/${productId}`); 

    if(result.data.count == 1){
        const latestProduct = await api.get(`/products/${Car.id}`)
        this.setState({Car : latestProduct.data, ProductDetailLoading: false})
    } else {
        this.setState({ ProductDetailLoading: false})
    }

  }



  // Product Options
  _HandleSaveProductOption = async(e) =>{
  
    await this.setState({ProductOptionLoading: true})

    let Car = {...this.state.Car}

    // await api.post(`/products/${Car.id}/productOption`, {
    //   name: e.name,
    //   image: e.image,
    //   editable: e.editable,
    //   isDefault: e.isDefault,
    //   price: e.price,
    //   productOptionCategoryId: e.productOptionCategoryId
    // }); 

    await api.post(`/products/${Car.id}/productOption`, e)

    const latestProduct = await api.get(`/products/${Car.id}`)
    this.setState({Car: latestProduct.data})

    await this.setState({ProductOptionLoading: false})

  }

  _DeleteProductOptionFields = async(index) => {

    await this.setState({ProductOptionLoading: true})

    let Car = {...this.state.Car}

    const productId = Car.productOption[index].id

    const result = await api.delete(`/productOptions/${productId}`); 

    if(result.data.count == 1){
        const latestProduct = await api.get(`/products/${Car.id}`)
        await this.setState({Car : latestProduct.data, ProductOptionLoading: false})
    } else {
        await this.setState({ ProductOptionLoading: false})
    }

  }

  
  _RenderStage = (stage) => {
    if(this.state.stage != stage){
      this.setState({stage: stage})
    } else {
      this.setState({stage: null})
    }
  }

  render () {

    const Car = this.state.Car

    return (
        <div>

            <div style={{marginBottom:50}}>
              <CarInfo/>
            </div>
           

            <BgCard fullBlock customStyles={{paddingTop: 20, paddingBottom: 20, marginBottom: 50}} >
              
              <div className="d-flex" style={{paddingRight: 20}} onClick={() => this._RenderStage(0)}>
                <span style={{flex: 1, textAlign:'center'}}>CAR VARIANT</span>
                
                {this.state.stage != 0 &&
                  <Add
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
                
                {this.state.stage == 0 &&
                  <Remove
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
                
              </div>
              
              {this.state.stage == 0 &&
                <ProductVariant
                  Car={Car}
                  _AddVariantValues={this._AddVariantValues}
                  _DeleteProductVariant = {this._DeleteProductVariant}

                  ProductVariantLoading={this.state.ProductVariantLoading}
                />
              }
            </BgCard>

            <BgCard fullBlock customStyles={{paddingTop: 20, paddingBottom: 20,  marginBottom: 50}} >
              
              <div className="d-flex" style={{paddingRight: 20}} onClick={() => this._RenderStage(1)}>
                <span style={{flex: 1, textAlign:'center'}}>CAR DETAILS</span>
                {this.state.stage != 1 &&
                  <Add
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
                {this.state.stage == 1 &&
                  <Remove
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
              </div>

              {this.state.stage == 1 &&
                <ProductDetail
                  Car={Car}
                  _AddCarDetail = {this._AddCarDetail}
                  _SaveCarDetail = {this._SaveCarDetail}
                  _HandleProductDetailValue={this._HandleProductDetailValue}
                  _DeleteProductDetailFields = {this._DeleteProductDetailFields}

                  ProductDetailLoading ={this.state.ProductDetailLoading}
                />
              }
            </BgCard>

            <BgCard fullBlock customStyles={{paddingTop: 20, paddingBottom: 20, marginBottom: 50}} >

              <div className="d-flex" style={{paddingRight: 20}} onClick={() => this._RenderStage(2)}>
                <span style={{flex: 1, textAlign:'center'}}>CAR PRODUCT</span>
                {this.state.stage != 2 &&
                  <Add
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
                {this.state.stage == 2 &&
                  <Remove
                    fontSize="small"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  />
                }
              </div>

              {this.state.stage == 2 &&
                <ProductOption
                  Car={Car}
                  ProductOptionLoading={this.state.ProductOptionLoading}

                  _DeleteProductOptionFields = {this._DeleteProductOptionFields}
                  _HandleSaveProductOption={this._HandleSaveProductOption}
                />
              }
            </BgCard>
        </div>
    );
  }
};
