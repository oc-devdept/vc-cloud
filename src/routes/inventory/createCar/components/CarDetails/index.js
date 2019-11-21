import React, { Component } from "react";
import api from "Api";
import Labels from './components/Labels'

class CarDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            ProductCategory : [],
        }
    }


    async componentDidMount() {
        const ProductDetailCategories = await api.get(`/productdetailcategories/formFields`)
        this.setState({ProductCategory: ProductDetailCategories.data.fields, loading: false})
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
        return (
            <div style={{marginTop: 50, marginBottom: 50}}>
                <div>Car Details</div>
                {this.state.ProductCategory.length > 0 &&
                    <div className="d-flex" style={{flexDirection:'row'}}>
                        {this.state.ProductCategory.map((e, index) => {

                            return (
                                <div key={index} style={{flex: 1}}>
                                    <div key={index*0.2} style={{margin: 5}}>
                                        {e.name}
                                    </div>
                                    <div key={e.name}>
                                        {this._RenderObjectValues(e.objects)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
  
}

export default CarDetails;

