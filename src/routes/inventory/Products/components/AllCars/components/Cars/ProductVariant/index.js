import React, {Component, PureComponent} from "react";
import api from "Api";


import ProductVariant  from './components/ProductVariant'
import ProductVariantValues  from './components/ProductVariantValues'
import DisplayProductVariantValues from './components/DisplayProductVariantValues'


export default class Index extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            ProductVariantCategories : [],
            productVariantStage: 0,

            addItem: false,
            addItemInformation : null,

            currentCategory: null
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

            let Options = this.props.Car ? this.props.Car: []
            let BelongsTo = []


            if(Options.length > 0){
                Options.map(e => {
                    if(e.productVariantId == ProductVariantCategories[this.state.currentCategory][productVariantStage].value){
                        BelongsTo.push(e)
                    }
                })
            }        

            if(BelongsTo.length > 0){
                return (
                    <div>
                        <div style={{width: '100%', display:'flex', flexDirection:"row", backgroundColor: 'rgba(73,100,150,1)', padding: 10, marginTop: 10}}>
                            <div style={{flex: 1}}>
                                <span style={{color:"white"}}>NAME</span>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-evenly', flexDirection:'row', flex: 1}}>
                                <div>
                                <span style={{color:"white"}}>IMAGE</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>PRICE</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>SET DEFAULT</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>EDIT</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>DELETE</span>
                                </div>
                            </div>
                        </div>

                        <div style={{borderBottom: '1px solid rgba(0,0,0,0.70)', paddingBottom:10,}}>
                            {BelongsTo.map((e, index) => {
                                return (
                                    <div key={index} style={{}}>
                                        <DisplayProductVariantValues
                                            ProductVariantValues={e}
                                            index={index}
                                            _DeleteProductVariant={this.props._DeleteProductVariant}
                                        />
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                )

            } else {
                return (
                    <div>
                        <div style={{width: '100%', display:'flex', flexDirection:"row", backgroundColor: 'rgba(73,100,150,1)', padding: 10, marginTop: 10}}>
                            <div style={{flex: 1}}>
                                <span style={{color:"white"}}>NAME</span>
                            </div>
                            
                            <div style={{display:'flex', justifyContent:'space-evenly', flexDirection:'row', flex: 1}}>
                                <div>
                                <span style={{color:"white"}}>IMAGE</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>PRICE</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>SET DEFAULT</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>EDIT</span>
                                </div>
                                <div>
                                <span style={{color:"white"}}>DELETE</span>
                                </div>
                            </div>
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
          
            
            <div className="d-flex" style={{flexDirection:"column", position:'relative', marginTop: 20}}>

                <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>


                    <div style={{ display:'flex', justifyContent: 'space-around'}}>
                        {Object.keys(this.state.ProductVariantCategories).map((e, index) => {

                            let fontStyle = {}
                            let style = {}
                            if(this.state.currentCategory == e){
                                fontStyle = {color:'rgba(244,132,33,1)'}
                                style = {padding: 5, borderBottom: '1.5px solid rgba(244,132,33,1)'}
                            } else{
                                fontStyle = {color:'rgba(0,0,0,0.6)'}
                                style = {padding: 5}
                            }

                            return (
                                <div key={index} style={style} onClick={() => this.setState({currentCategory: e, productVariantStage: 0})}>
                                    <span style={fontStyle}>{e}</span>
                                </div>
                            )
                        })}
                    </div>


                    {this.state.currentCategory && 
                        <div style={{ display:'flex', justifyContent: 'space-around', padding:5}}>
                            {this.state.ProductVariantCategories[this.state.currentCategory].map((e, index)=>{
                               
                                let fontStyle = {}
                                let style = {}
                                if(this.state.productVariantStage == index){
                                    fontStyle = {color:'rgba(244,132,33,1)'}
                                    style = {padding: 5, borderBottom: '1.5px solid rgba(244,132,33,1)'}
                                } else{
                                    fontStyle = {color:'rgba(0,0,0,0.6)'}
                                    style = {padding: 5}
                                }

                                return (
                                    <div key={index} style={style} onClick={() => this.setState({productVariantStage: index, })}>
                                        <span style={fontStyle}>{e.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }



                    {this.state.currentCategory &&
                        <div style={{flex : 1, height: '100%' }}>
                            {this._RenderCarDetails()}
                        </div>
                    }   


                    {this.props.ProductVariantLoading && 
                        <div style={{position:'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'red', borderRadius: 10, opacity: 0.25 }}>
                            ProductVariantLoading
                        </div>
                    }

                    {this.state.currentCategory && 
                        <ProductVariantValues
                            _AddVariantValues = {(item, files) => this.props._AddVariantValues(item, this.state.ProductVariantCategories[this.state.currentCategory][this.state.productVariantStage].value, files)}
                        />
                    }                        
                </div>


            </div>


        );
        
    }
};
