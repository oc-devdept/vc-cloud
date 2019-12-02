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
        ProductDetailLoading: false
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

  _AddVariant = async(Variant) => {
    let Car = {...this.state.Car}
    const result = await this._SaveProductVariant(Variant, Car.id)
    Car.productVariant = result
    this.setState({Car: Car})
  }

  _FetchOneProduct = async(id) => {
    const Product = await api.get(`/products/${id}/productVariant`)
    return Product
  }

  _SaveProductVariant = async(Variant, id) => { 
    await api.post(`/productvariants`, 
        {
            name: Variant.name,
            groupName: Variant.groupName,
            productId: id
        }
    )
    const result = await this._FetchOneProduct(id)
    return result.data
  }

  _AddVariantValues = async (item, id) => {

    let Car = {...this.state.Car}

    await api.post("/productvariantvalues", 
        {
            name: item.name,
            image: item.image,
            isDefault: item.isDefault,
            price: item.price,
            productVariantId: id
        }
    ); 
    
    const result = await this._FetchOneProduct(Car.id)

    Car.productVariant = result.data
    this.setState({Car: Car})

  }

  _AddCarDetail = (productDetail) => {
    let Car = {...this.state.Car}
    Car.productDetail.push(productDetail)
    this.setState({Car: Car})
  }

  _SaveCarDetail = async() => {

    await this.setState({ProductDetailLoading: true})

    let Car = {...this.state.Car}

    let CreateItem = []
    Car.productDetail.map(e =>{
        if(!e.productId){
          CreateItem.push(e)
        }
    })

    CreateItem.map(async(e) => {
      await api.post(`/products/${Car.id}/productDetail`, {
        name: e.name,
        type: e.type,
        value: e.value1,
        value2: e.value2,
        productDetailCategoryId: e.productDetailCategoryId
      }); 
    })


    // const latestProduct = await api.get(`/products/${Car.id}`)
    // console.log(latestProduct.data)
    // this.setState({currentProduct: latestProduct.data})

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

    console.log(Car.productDetail[index])
    const productId = Car.productDetail[index].id

    const result = await api.delete(`/productDetails/${productId}`); 
    console.log(result.data)
    // if(result.data.count == 1){

    // } else {

    // }

    const latestProduct = await api.get(`/products/${Car.id}`)
    console.log(latestProduct.data)
    this.setState({Car : latestProduct.data, ProductDetailLoading: false})

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
              _AddVariant={this._AddVariant}
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
              Car ={Car}
            />

        </div>
    );
  }
};
