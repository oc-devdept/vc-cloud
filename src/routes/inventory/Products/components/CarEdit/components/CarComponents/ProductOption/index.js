import React, {PureComponent, Component} from "react";
import api from "Api";

import ProductDetailsFields from './components/ProductDetailsFields'
import AddProductOptionFields from './components/AddProductOptionFields'

export default class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ProductOptionCategories : [],
            productOptionStage: 0,

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

            const ProductOptionCategories = await this._FetchProductDetailCategories()

            if(this._isMounted) {
                this.setState({
                    ProductOptionCategories: ProductOptionCategories,
                })
            }

        } catch (e) {
            console.log(e)       
        }
           
    }  

    async _FetchProductDetailCategories() {
        const ProductOptionCategories = await api.get(`/productoptioncategories/formFields`)
        return ProductOptionCategories.data.fields
    }

    _RenderCarDetails = () =>{
        let productOptionStage = this.state.productOptionStage
        let ProductOptionCategories = this.state.ProductOptionCategories

        let Options = this.props.Car.productOption
        let BelongsTo = []

        Options.map(e => {
          
            if(e.productOptionCategoryId == ProductOptionCategories[productOptionStage].value){
                BelongsTo.push(e)
            }
        })
      
        if(BelongsTo.length > 0){
            return (
                BelongsTo.map((e, index) => {
                    return (
                        <div key={index} style={{border: '1px solid black', marginTop: 10, marginBottom: 10, borderRadius: 10, padding: 5,}}>
                            <ProductDetailsFields
                                Fields={e}
                                index={index}
                                _DeleteProductOptionFields={this.props._DeleteProductOptionFields}
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

    _HandleAddNewItem = (item) => {
        this.setState({addItem: !this.state.addItem, addItemInformation: item})
    }

    _HandleSaveProductOption = async(e) => {    
        await this.props._HandleSaveProductOption(e)
        this.setState({addItem: false, addItemInformation: null})
    }

    _HandleCancelProductOption = () => {
        this.setState({addItem: false, addItemInformation: null})
    }
    
    render () {

        const Car = this.props.Car
        
        if(!Car){
            return null
        }

        return (
            <div style={{marginTop: 50}}>

                <h1>Car Product</h1>

            
                <div className="d-flex" style={{flexDirection:"row", position:'relative'}}>

                    <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>

                        <div style={{border : '1px solid black', display:'flex', justifyContent: 'space-around'}}>
                            {this.state.ProductOptionCategories.map((e, index)=>{

                                let style = {}
                                if(this.state.productOptionStage == index){
                                    style = {backgroundColor: 'blue'}
                                }

                                return (
                                    <div key={index} style={style} onClick={() => this.setState({productOptionStage: index})}>
                                        <span>{e.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {this.state.ProductOptionCategories.length > 0 &&
                            <div style={{flex : 1, height: '100%'}}>
                                {this._RenderCarDetails()}
                            </div>
                        }   

                        {this.props.ProductOptionLoading && 
                            <div style={{position:'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'red', borderRadius: 10, opacity: 0.25 }}>
                                ProductOptionLoading
                            </div>
                        }
                    
                    </div>

                    
                    <div style={{overflow: 'auto', height: 350, marginLeft: 25}}>
                        {this.state.ProductOptionCategories.map((e, index) =>{
                                                        
                            return (
                                <div key={index}>
                                    <span style={{fontWeight: '600'}}>{e.name}</span>

                                    {e.objects.map((each, indexes) =>{

                                        let contain = false
                                        Car.productOption.map(e => {
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
                                                    // <div onClick={() => this.props._AddCarDetail(each)} key={indexes} style={style}>
                                                    //     {each.name}
                                                    // </div>
                                                    <div onClick={() => this._HandleAddNewItem(each)} key={indexes} style={style}>
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
                    

                    {this.state.addItem && 
                        <div style={{position:'absolute', top: 0, left:0,right: 0,bottom: 0, backgroundColor: 'rgba(255,255,255, 0.70)', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div style={{backgroundColor: 'White'}}>
                                
                                <div style={{maringTop: 20, marginBottom: 20}}>Add this item to this grade</div>
                                
                                <AddProductOptionFields
                                    Fields={this.state.addItemInformation}
                                    _HandleSaveProductOption = {this._HandleSaveProductOption}
                                    _HandleCancelProductOption = {this._HandleCancelProductOption}
                                />
                            </div>
                        </div>
                    }
                    
                </div>

            
                
            </div>
        );
  }
};


