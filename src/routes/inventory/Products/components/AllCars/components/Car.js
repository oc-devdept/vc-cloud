import React, {Component} from "react";
import { NavLink } from "react-router-dom";

import api from "Api";

import ProductVariant from './CarComponents/ProductVariant/index'
import ProductDetail from './CarComponents/ProductDetail/index'
import ProductOption from './CarComponents/ProductOption/index'

export default class Index extends Component {

  constructor(props) {
    super(props);
      this.state=({
        Car : null,

        ProductDetailLoading: false,
        ProductOptionLoading: false,
        ProductVariantLoading: false,
      })
  }

  
  getSnapshotBeforeUpdate(prevProps, prevState) {
   
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.

    if(this.props.Car){

      if(!this.state.Car){
        return this.props.Car
      }

      if(this.state.Car.id != this.props.Car.id){
        return this.props.Car
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState({Car:snapshot})
    }
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

    await api.post(`/products/${Car.id}/productOption`, {
      name: e.name,
      image: e.image,
      editable: e.editable,
      isDefault: e.isDefault,
      price: e.price,
      productOptionCategoryId: e.productOptionCategoryId
    }); 


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

  


  render () {

    const Car = this.state.Car

    if(!Car){
      return null
    }
      
    return (
        <div>

            <ProductVariant
              Car ={Car}
              _AddVariantValues={this._AddVariantValues}
              _DeleteProductVariant = {this._DeleteProductVariant}

              ProductVariantLoading={this.state.ProductVariantLoading}
            />

            <ProductDetail
              Car ={Car}
              _AddCarDetail = {this._AddCarDetail}
              _SaveCarDetail = {this._SaveCarDetail}
              _HandleProductDetailValue={this._HandleProductDetailValue}
              _DeleteProductDetailFields = {this._DeleteProductDetailFields}

              ProductDetailLoading ={this.state.ProductDetailLoading}
            />

            <ProductOption
              Car={Car}
              ProductOptionLoading={this.state.ProductOptionLoading}

              _DeleteProductOptionFields = {this._DeleteProductOptionFields}
              _HandleSaveProductOption={this._HandleSaveProductOption}
            />

        </div>
    );
  }
};
