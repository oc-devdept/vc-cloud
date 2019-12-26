import React, {PureComponent, Component} from "react";
import api from "Api";

import ProductDetailsFields from './components/ProductDetailsFields'
import AddProductFields from './components/AddProductFields'

export default class Index extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            ProductDetailCategory : [],
            productDetailStage: 0,

            addItem: false,
            addItemInformation : null
        }
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadInitial()
    }

    loadInitial = async () => {

        try {

            const ProductDetailCategory = await this._FetchProductDetailCategories()

            if(this._isMounted) {
                this.setState({
                    ProductDetailCategory: ProductDetailCategory,
                })
            }

        } catch (e) {
            console.log(e)       
        }
           
    }  

    async _FetchProductDetailCategories() {
        const ProductDetailCategory = await api.get(`/productdetailcategories/formFields`)
        return ProductDetailCategory.data.fields
    }

    _RenderCarDetails = () =>{
        let productDetailStage = this.state.productDetailStage
        let ProductDetailCategory = this.state.ProductDetailCategory

        let Detail = this.props.Car.productDetail? this.props.Car.productDetail: []
        let BelongsTo = []

        if(Detail.length > 0){
            Detail.map(e => {
                if(e.productDetailCategoryId == ProductDetailCategory[productDetailStage].value){
                    BelongsTo.push(e)
                }
            })
        }
        
        if(BelongsTo.length > 0){
            return (
                BelongsTo.map((e, index) => {
                    return (
                        <div key={index} style={{border: '1px solid black', marginTop: 10, marginBottom: 10, borderRadius: 10, padding: 5,}}>
                            {/* <span>{e.name}</span> */}
                            {/* <span>{e.value}</span> */}
                            {/* <input type="value1" placeholder={"e.g 890"} value={this.state.ProductDetail.value1} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'value1')} />
                            <span>{e.value2}</span> */}
                            <ProductDetailsFields
                                Fields={e}
                                index={index}
                                _DeleteProductDetailFields={this.props._DeleteProductDetailFields}
                                _HandleProductDetailValue={(e) => this.props._HandleProductDetailValue(e.target.value, 'value', index)}
                            />
                        </div>
                    )
                })
            )
    
        } else {
            return (
                <div style={{border : '1px solid black', borderStyle : 'dashed', display:'flex',height: '100%', flex:1, justifyContent:'center', alignItems:'center', height: 100}}>
                    Drag columns from the sidebar and drop them here to create your product detail
                </div>
            )
        }
    
    }

    _HandleAddNewItem = (item) => {
        this.setState({addItem: true, addItemInformation: item})
    }

    _HandleSaveProductDetail = async(e) => {
        await this.props._SaveCarDetail(e)
        this.setState({addItem: false, addItemInformation: null})
    }

    _HandleCancelProductDetail = () => {
        this.setState({addItem: false, addItemInformation: null})
    }
    
    render () {

        const Car = this.props.Car
        
        if(!Car){
            return null
        }
        
        return (
            <div>
                   
                <div className="d-flex" style={{flexDirection:"column", position:'relative', marginTop: 20}}>

                    <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>

                        <div style={{border : '1px solid black', display:'flex', justifyContent: 'space-around'}}>
                            {this.state.ProductDetailCategory.map((e, index)=>{

                                let style = {}
                                if(this.state.productDetailStage == index){
                                    style = {backgroundColor: 'blue'}
                                }

                                return (
                                    <div key={index} style={style} onClick={() => this.setState({productDetailStage: index, addItemInformation: null})}>
                                        <span>{e.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {this.state.ProductDetailCategory.length > 0 &&
                            <div style={{flex : 1, height: '100%'}}>
                                {this._RenderCarDetails()}
                            </div>
                        }   

                        {this.props.ProductDetailLoading && 
                            <div style={{position:'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'red', borderRadius: 10, opacity: 0.25 }}>
                                ProductDetailLoading
                            </div>
                        }
                    
                    </div>

                    <div style={{padding: 20}}>
                        <div style={{paddingBottom: 20, paddingTop: 20}}>
                            <span>ADD A NEW CAR DETAIL ITEM BELOW</span>
                        </div>

                        
                        {this.state.ProductDetailCategory.length> 0 && 
                            <div style={{display:'flex', flexDirection:"column"}}>
                            
                                <span>Please select the Car Detail Item below</span>                               

                                <div className="d-flex" style={{flexDirection:"row", marginTop: 10}}>
                                    {this.state.ProductDetailCategory[this.state.productDetailStage].objects.map((each, indexes) =>{

                                        let contain = false

                                        if(Car.productDetail){
                                            if(Car.productDetail.length >0){
                                                Car.productDetail.map(e => {
                                                    if(each){
                                                        if(e.name == each.name){
                                                            contain = true
                                                        }
                                                    }
                                                })
                                            }
                                        }

                                        let style = {}

                                        if(each){
                                            if(contain) {
                                                style = {border:'1px solid black', borderRadius: 5, margin: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5, opacity: 0.3}
                                                return (
                                                    <div key={indexes} style={style}>
                                                        {each.name}
                                                    </div>
                                                )
                                            } else {

                                                
                                                if(this.state.addItemInformation){
                                                    if(this.state.addItemInformation.name == each.name){
                                                        style = {backgroundColor: 'rgba(74,74,74,1.0)', color:'white', borderRadius: 5, marginRight: 20, paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5}
                                                    } else {
                                                        style = {border:'1px solid black', borderRadius: 5, marginRight: 20, paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5}
                                                    }            
                                                } else {
                                                    style = {border:'1px solid black', borderRadius: 5, marginRight: 20, paddingLeft: 10, paddingRight: 10, paddingTop: 2.5, paddingBottom: 2.5}
                                                }
                                               

                                                return (
                                                    <div onClick={() => this._HandleAddNewItem(each)} key={indexes} style={style}>
                                                        {each.name}
                                                    </div>
                                                )
                                            }
                                        }

                                    })}
                                </div>

                            </div>
                        }
                        
                    </div>

                    {this.state.addItem && 
                        <div style={{}}>
                            <AddProductFields
                                Fields={this.state.addItemInformation}
                                _HandleSaveProductDetail = {this._HandleSaveProductDetail}
                                _HandleCancelProductDetail = {this._HandleCancelProductDetail}
                            />
                        </div>
                    }
                    
                </div>

                {/* <button onClick={this.props._SaveCarDetail}>Save Product Detail</button> */}
              
            </div>
        );
  }
};
