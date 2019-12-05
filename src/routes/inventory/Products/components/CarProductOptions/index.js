import React, { PureComponent } from "react";
import api from "Api";
import Labels from './components/Labels'

class Index extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            ProductOptionCategory : [],
            loading: true
        }
    }


    async componentDidMount() {

        try {
            const ProductOptionCategory = await this._FetchProductOptionCategories()
            this.setState({ProductOptionCategory: ProductOptionCategory, loading: false})
        } catch (e) {
            this.setState({ProductOptionCategory: [], loading: false})
        }
    }

    async _FetchProductOptionCategories() {
        const ProductOptionCategory = await api.get(`/productoptioncategories/productOptionCategory`)
        return ProductOptionCategory.data.fields
    }

    _RenderObjectValues = (objects) => {
        return (
            objects.map((e, index) => {
                return (
                    <div key={index+index} style={{border:'1px solid rgba(0,0,0,0.4)', borderRadius: 5, margin: 5, flex: 1}}>
                        <Labels 
                            e={e}
                            index={index}
                        />
                    </div>
                    
                )
            })
        )
    }

    render() {
        console.log('CarProdutOptions')
        return (
            <div style={{marginTop: 10, marginBottom: 50}}>

                {this.state.ProductOptionCategory.length > 0 &&
                    <div className="d-flex" style={{flexDirection:'row'}}>
                        {this.state.ProductOptionCategory.map((e, index) => {

                            return (
                                <div key={index} style={{flex: 1}}>
                                    <div key={index*0.2} style={{margin: 5}}>
                                        {e.name}
                                    </div>
                                    
                                    {e.objects.length > 0 &&
                                        <div key={e.name}>
                                            {this._RenderObjectValues(e.objects)}
                                        </div>
                                    }
                                    
                                    {e.objects.length == 0 &&
                                        <div key={e.name}>
                                            No Items Found
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
  
}

export default Index;

