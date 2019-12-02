import React, {PureComponent, Component} from "react";
import api from "Api";

import ProductDetailsFields from './components/ProductDetailsFields'

export default class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ProductDetailCategory : [],
            productDetailStage: 0
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

        let Detail = this.props.Car.productDetail
        let BelongsTo = []

        Detail.map(e => {
            if(e.productDetailCategoryId == ProductDetailCategory[productDetailStage].value){
                BelongsTo.push(e)
            }
        })
      
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
                <div style={{border : '1px solid black', borderStyle : 'dashed', display:'flex',height: '100%', flex:1, justifyContent:'center', alignItems:'center'}}>
                    Drag columns from the sidebar and drop them here to create your product detail
                </div>
            )
        }
    
    }


    render () {

        const Car = this.props.Car
        
        if(!Car){
            return null
        }

       
        return (
            <div>

                <h1>Car Detail</h1>

                <div>
                    
                    <div className="d-flex" style={{flexDirection:"row"}}>

                        <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>

                            <div style={{border : '1px solid black', display:'flex', justifyContent: 'space-around'}}>
                                {this.state.ProductDetailCategory.map((e, index)=>{
                                    return (
                                        <div key={index} onClick={() => this.setState({productDetailStage: index})}>
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

                        <div style={{overflow: 'auto', height: 350, marginLeft: 25}}>
                            {this.state.ProductDetailCategory.map((e, index) =>{

                                return (
                                    <div key={index}>
                                        <span style={{fontWeight: '600'}}>{e.name}</span>
                                        {e.objects.map((each, indexes) =>{

                                            let contain = false
                                            Car.productDetail.map(e => {
                                                if(each){
                                                    if(e.name == each.name){
                                                        contain = true
                                                    }
                                                }
                                            })

                                            let style = {}

                                            if(each){
                                                if(contain) {
                                                    style = {border:'1px solid black', borderRadius: 10, margin: 5, padding : 5, opacity: 0.3}
                                                    return (
                                                        <div key={indexes} style={style}>
                                                            {each.name}
                                                        </div>
                                                    )
                                                } else {
                                                    style = {border:'1px solid black', borderRadius: 10, margin: 5, padding : 5}
                                                    return (
                                                        <div onClick={() => this.props._AddCarDetail(each)} key={indexes} style={style}>
                                                            {each.name}
                                                        </div>
                                                    )
                                                }
                                            }

                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>

                    <button onClick={this.props._SaveCarDetail}>Save Product Detail</button>
                
                </div>
                
            </div>
        );
  }
};
