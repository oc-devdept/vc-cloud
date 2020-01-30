import React, {Component, PureComponent} from "react";
import api from "Api";


import ProductVariant  from './components/ProductVariant'
import ProductVariantValues  from './components/ProductVariantValues'
import DisplayProductVariantValues from './components/DisplayProductVariantValues'
import EditProductVariantValues from './components/EditProductVariantValues'


export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCategory: null,

            productVariantCategories : [],
            productVariantStage: 0,

            addItem: false,
            editItem: false,

            addItemInformation : null,
            indexes: null,

            Car : this.props.Car,
            Id: this.props.Id,
            ProductVariantLoading: false
        }

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadInitial()
    }

    loadInitial = async () => {

        try {

            const productVariantCategories = await this._FetchProductVariantCategories()
            
            if(this._isMounted) {
                this.setState({
                    productVariantCategories: productVariantCategories,
                })
            }

        } catch (e) {
            console.log(e)       
        }
            
    }  

    async _FetchProductVariantCategories() {
        const productVariantCategories = await api.get(`/productvariants/OneProductVariant`)
        return productVariantCategories.data.fields
    }

    _RenderCarDetails = () => {

            let productVariantStage = this.state.productVariantStage
            let productVariantCategories = this.state.productVariantCategories

            let Options = this.state.Car ? this.state.Car: []
            let BelongsTo = []


            if(Options.length > 0){
                Options.map(e => {
                    if(e.productVariantId == productVariantCategories[this.state.currentCategory][productVariantStage].value){
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
                                            indexes={this.state.indexes}
                                            _DeleteProductVariant={this._DeleteProductVariant}
                                            _EditProductVariant={this._EditProductVariant}
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

    _EditProductVariant = (e, indexes) => {
        this.setState({editItem: true, addItemInformation: e, indexes: indexes})
    }

    _AddVariantValues = async (item, files, images) => {

        const productVariantId = this.state.productVariantCategories[this.state.currentCategory][this.state.productVariantStage].value
        const Id = this.state.Id

        await this.setState({ProductVariantLoading: true})
    
        var data = new FormData();
        files.map(file => data.append(`newThumbNail`, file));
        images.map(file => data.append(`newSecondaryPhotos`, file))

        data.append("name", item.name);
        data.append("isDefault", item.isDefault);
        data.append("price", item.price);
        data.append("productId", Id);
        data.append("productVariantId", productVariantId);
    
        await api.post("/productvariantvalues/newVariant", data)

        this._ReloadCar()
    }
    
    _EditVariantValues = async (item) => {

        await this.setState({ProductVariantLoading: true})

        var data = new FormData();

        item.newThumbNail.map(file => data.append(`newThumbNail`, file));
        item.newSecondaryPhotos.map(file => data.append(`newSecondaryPhotos`, file));
        
        data.append("name", item.name);
        data.append("price", item.price);
        data.append("isDefault", item.isDefault);
        data.append("id", item.id);
        data.append("productId", item.productId);
        data.append("productVariantId", item.productVariantId);

        await api.post("/Productvariantvalues/editProductVariantValues", data)

        await this._ReloadCar()
        await this._ReloadItemInformation()
    }

    _DeleteSingleImage = async (item) => {    
        await api.delete(`/Productvariantvalues/deleteImages/${item.id}`); 
        await this._ReloadCar()
        await this._ReloadItemInformation()
    }
    
    _DeleteProductVariant = async(index) => {
        await this.setState({ProductVariantLoading: true})
                
        const result = await api.delete(`/productvariantvalues/${index}`); 
        
        if(result.data.count == 1){
            await this._ReloadCar()
            await this._RestartItemInformation()
        } else {
            await this.setState({ ProductVariantLoading: false})
        }
    }
    


    _ReloadCar = async() => {
        const Id = this.state.Id
        const latestProduct = await api.get(`/products/${Id}`)
        await this.setState({
            Car: latestProduct.data.productVariant, ProductVariantLoading: false,
        })
    }

    _ReloadItemInformation = async() => { await this.setState({addItemInformation: this.state.Car[this.state.indexes]})}

    _RestartItemInformation = async() => { await this.setState({editItem: false, addItemInformation: null, indexes: null})}


    render () {
        const Car = this.state.Car

        if(!Car){
            return null
        }
    
        return (
          
            
            <div className="d-flex" style={{flexDirection:"column", position:'relative', marginTop: 20}}>

                <div style={{display:'flex', flex: 1, flexDirection:'column', position:'relative'}}>


                    <div style={{ display:'flex', justifyContent: 'space-around'}}>
                        {Object.keys(this.state.productVariantCategories).map((e, index) => {

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
                                <div key={index} style={style} onClick={() => this.setState({currentCategory: e, productVariantStage: 0, editItem: false, addItemInformation: null, indexes: null})}>
                                    <span style={fontStyle}>{e}</span>
                                </div>
                            )
                        })}
                    </div>


                    {this.state.currentCategory && 
                        <div style={{ display:'flex', justifyContent: 'space-around', padding:5}}>
                            {this.state.productVariantCategories[this.state.currentCategory].map((e, index)=>{
                               
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
                                    <div key={index} style={style} onClick={() => this.setState({productVariantStage: index, editItem: false, addItemInformation: null, indexes: null})}>
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


                    {this.state.ProductVariantLoading && 
                        <div style={{position:'absolute', top:0, left: 0, right: 0, bottom:0, backgroundColor: 'red', borderRadius: 10, opacity: 0.25 }}>
                            ProductVariantLoading
                        </div>
                    }

                    {this.state.currentCategory &&  !this.state.editItem &&
                        <ProductVariantValues
                            _AddVariantValues = {this._AddVariantValues}
                        />
                    }                   

                    {this.state.editItem && 
                        <EditProductVariantValues
                            ProductVariantValues={this.state.addItemInformation}
                            _EditVariantValues={this._EditVariantValues}
                            _DeleteSingleImage={this._DeleteSingleImage}
                            AddNewVariant={()=> this.setState({editItem: false, addItemInformation: null, indexes: null})}
                        />
                    }


                </div>


            </div>


        );
        
    }
};
