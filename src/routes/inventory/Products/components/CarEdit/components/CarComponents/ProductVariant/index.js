import React, {Component} from "react";
import api from "Api";


import ProductVariant  from './components/ProductVariant'
import ProductVariantValues  from './components/ProductVariantValues'
import DisplayProductVariantValues from './components/DisplayProductVariantValues'


export default class Index extends Component {


  constructor(props) {
      super(props);
      this.state = {
          ProductVariantCategories : [],
          productVariantStage: 0,

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

          const ProductVariantCategories = await this._FetchProductVariantCategories()

          if(this._isMounted) {
              this.setState({
                ProductVariantCategories: ProductVariantCategories,
              })
          }

      } catch (e) {
          console.log(e)       
      }
        
  }  

  async _FetchProductVariantCategories() {
      const ProductVariantCategories = await api.get(`/productvariants/OneProductVariant`)
      return ProductVariantCategories.data.fields
  }

  _RenderCarDetails = () =>{

        let productVariantStage = this.state.productVariantStage
        let ProductVariantCategories = this.state.ProductVariantCategories

        let Options = this.props.Car.productVariant
        let BelongsTo = []

        Options.map(e => {
            if(e.productVariantId == ProductVariantCategories[productVariantStage].value){
                BelongsTo.push(e)
            }
        })
    
        if(BelongsTo.length > 0){
            return (

                BelongsTo.map((e, index) => {
                    return (
                        <div key={index} style={{border: '1px solid black', marginTop: 10, marginBottom: 10, borderRadius: 10, padding: 5,}}>
                            <DisplayProductVariantValues
                                ProductVariantValues={e}
                                index={index}
                                _DeleteProductVariant={this.props._DeleteProductVariant}
                            />
                        </div>
                    )
                })

            )

        } else {
            return (
                <div style={{border : '1px solid black', borderStyle : 'dashed', display:'flex', height: '100%',flexDirection:"column", flex:1, justifyContent:'center', alignItems:'center'}}>
                    
                    <div>
                        Drag columns from the sidebar and drop them here to create your product detail
                    </div>
                   
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

                <h1>Car Variants</h1>
                            
                <div className="d-flex" style={{flexDirection:"row", position:'relative'}}>

                    <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>

                        <div style={{border : '1px solid black', display:'flex', justifyContent: 'space-around'}}>
                            {this.state.ProductVariantCategories.map((e, index)=>{

                                let style = {}
                                if(this.state.productVariantStage == index){
                                    style = {backgroundColor: 'blue'}
                                }

                                return (
                                    <div key={index} style={style} onClick={() => this.setState({productVariantStage: index})}>
                                        <span>{e.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {this.state.ProductVariantCategories.length > 0 &&
                            <div style={{flex : 1, height: '100%'}}>
                                {this._RenderCarDetails()}
                            </div>
                        }   


                        {this.props.ProductVariantLoading && 
                            <div style={{position:'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'red', borderRadius: 10, opacity: 0.25 }}>
                                ProductVariantLoading
                            </div>
                        }

                    </div>

                    <div style={{overflow: 'auto', height: 350, marginLeft: 25}}>
                        <ProductVariantValues
                            _AddVariantValues = {(item) => this.props._AddVariantValues(item, this.state.ProductVariantCategories[this.state.productVariantStage].value)}
                        />
                    </div>

                </div>


            
            </div>
        );
        
    }
};
