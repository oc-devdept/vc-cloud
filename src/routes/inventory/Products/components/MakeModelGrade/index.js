import React, { PureComponent } from "react";
import api from "Api";

import MakeModel from './MakeModel'
import Grade from './Grade'

const initProduct ={
    name: '',
    image: '',
    description: '',
    product_code: '',
    costPrice: '',
    sellingPrice: '',
    isActive: true,
}

class MakeModelGrade extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Grade: '',
            categoryGroupId: '', 

            MakeSource: [], 
            ModelSource: [],
            ProductDetailCategory: [],

            Makeloading: true,
            ModelLoading: true,

            MakeId: '',
            ModelId: '',

            Product: {
                name: '',
                image: '',
                description: '',
                product_code: '',
                costPrice: '',
                sellingPrice: '',
                isActive: true,
            },

            ProductDetail: []

        }

        this._isMounted = false;

    }

    componentDidMount() {
        this._isMounted = true;
        this.loadInitial()
    }

    loadInitial = async () => {

        try {

            const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);

            const MakeSource = await this._RenderMakeCategory(MakeFilter.data.id)
        
            const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)
        
            const ProductDetailCategory = await this._FetchProductDetailCategories()

            if(this._isMounted) {
                this.setState({
                    categoryGroupId: MakeFilter.data.id, 
                    MakeSource: MakeGroupingSource, 
                    ProductDetailCategory: ProductDetailCategory,

                    Makeloading: false,
                    ModelLoading: false
                })
            }

        } catch (e) {

            if(this._isMounted) {
                this.setState({
                    categoryGroupId: '', 
                    MakeSource: [], 
                    ProductDetailCategory: [],

                    Makeloading: false,
                    ModelLoading: false
                })
            }
        }

           
    }  

    async _FetchProductDetailCategories() {
        const ProductDetailCategory = await api.get(`/productdetailcategories/formFields `)
        return ProductDetailCategory.data.fields
    }

    async _RenderMakeCategory(value) {
        
        try {
            const MakeGroup = await api.get(`/categorygroups/${value}/categoryGroup`);
            const MakeSource = await MakeGroup.data.map((source) => {

                return { 
                    id: source.id, 
                    name: source.name, 
                    description: source.description,
                    image: source.image,
                    checklist: true
                }

            });
            return MakeSource
        } catch (e) {
            console.log(e)
        }
    
    }

    _RenderMakeGrouping(MakeSource) {
            
        let modelArray = []

        MakeSource.map((make) => {
            if(make.checklist){
                modelArray.push(`${make.name}:${make.id}`)
            }
        });

        return modelArray
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
     
    _ToggleMake = async (e) => {
        this.setState({MakeId: e.target.value, ModelId: ''})
        await this._LoadModels(e.target.value)
    }

    _LoadModels = async(KeyId) => {

        try {

            this.setState({ModelLoading: true, GradeSource: null})

            const ModelResult = await api.get(`/categories/${KeyId}/category`);
        
            const ModelSource = ModelResult.data.map((source) => {
                return { name: source.name, value: source.id}
            })

            this.setState({ModelSource: ModelSource, ModelLoading: false})

        } catch (e) {
            console.log(e)    
        }
    }

    _ToggleModel = (e) => {
        this.setState({ModelId: e.target.value})
    }

    _HandleProduct = (e, element) => {
        let Product = {...this.state.Product}
    
        if(element == "isActive") {
          Product.isActive = !Product.isActive
          this.setState({Product: Product})
        } else {
          Product[element] = e
          this.setState({Product: Product})
        }
        
    }
    
    _CreateProduct = async () => {
    
        const Product = {...this.state.Product}
        const MakeId = this.state.MakeId
        const ModelId = this.state.ModelId


        await api.post("/products", {
              name: Product.name,
              image: Product.image,
              description: Product.description,
              product_code: '',
              cost_Price: Product.costPrice,
              selling_Price: Product.sellingPrice,
              isActive: Product.isActive,
              categoryId : ModelId,
              categoryGroupId: MakeId
            }
        ); 
    
        this.setState({Product:initProduct})
    }


    render() {
       
        return (
            <div>

                <MakeModel
                    MakeSource={this.state.MakeSource}
                    MakeId={this.state.MakeId}
                    Makeloading={this.state.Makeloading}
                    _ToggleMake={this._ToggleMake}

                    ModelSource={this.state.ModelSource}
                    ModelLoading={this.state.ModelLoading}
                    ModelId={this.state.ModelId}
                    _ToggleModel={this._ToggleModel}
                />

                <Grade
                    _HandleProduct={this._HandleProduct}
                    Product = {this.state.Product}
                    ModelId={this.state.ModelId}
                    ProductDetailCategory={this.state.ProductDetailCategory}
                />
                


                <div style={{marginTop: 50}}>
                    <button onClick={this._CreateProduct}>Create Product</button>
                </div>

            </div>
        )
    }
  
}

export default MakeModelGrade;

