import React, { PureComponent } from "react";
import api from "Api";

import CarList from "./components/CarList";

class index extends PureComponent {


    constructor(props) {
        super(props);
        
        this.state=({
            Products: [],
            loading: true,
        })
    }

    async componentDidMount() {
        try {
            const Products = await this._FetchProducts()
            this.setState({Products: Products, loading: false})
        } catch (e) {
            this.setState({Products: [], loading: false})
        }
    }
 
    async _FetchProducts() {
        const Products = await api.get(`/products/productVariant`)
        return Products.data.fields
    }

    
   
    render() {
        

        return (
            <div style={{marginTop: 10, marginBottom: 50}}>
          
                <CarList
                  title={'Edit Cars'}
                  loading={this.state.loading}
                  tableData={this.state.Products}
                />

            </div>
        )
    }
  
}


export default index;


// constructor(props) {
//     super(props);
//     this.state = {
//         ProductVarients : []
//     }
// }

// async componentDidMount() {
//     const ProductVarients = await this._FetchProductVariants()
//     this.setState({ProductVarients: ProductVarients, loading: false})
// }

// async _FetchProductVariants() {
//     const ProductVarients = await api.get(`/productvariants/productVariant`)
//     return ProductVarients.data.fields
// }
// _RenderObjectValues = (objects) => {
//     return (
//         objects.map((e, index) => {
//             return (
//                 <div key={index+index} style={{border:'1px solid rgba(0,0,0,0.4)', borderRadius: 5, margin: 5, flex: 1}}>
//                     <Labels 
//                         e={e}
//                         index={index}
//                     />
//                 </div>
                
//             )
//         })
//     )
// }
{/* {this.state.ProductVarients.length > 0 &&
    <div className="d-flex" style={{flexDirection:'row'}}>
        {this.state.ProductVarients.map((e, index) => {

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
} */}