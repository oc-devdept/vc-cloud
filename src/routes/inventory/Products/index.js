import React, { Component } from "react";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
import api from "Api";


import MakeModelGrade from './components/MakeModelGrade'
import AllProduct from './components/AllProduct'
import CarEdit from './components/CarEdit/index'


import CarDetails from './components/CarDetails'
import CarProductOptions from './components/CarProductOptions/index'
import MakeModel from './components/makeModel'

class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

  }

  async componentDidMount() {
      const AllProducts = await this._FetchProducts()
      this.setState({AllProducts: AllProducts, loading: false})
  }

  async _FetchProducts() {
      const AllProducts = await api.get(`/products/productVariant`)
      return AllProducts.data.fields
  }

  _HandleProduct = () => {
    console.log('add variant')
    // this.setState({test: !this.state.test})
  }

  render() {

    return (
        <div className="todo-dashboard">

            <Tabs>
              <div>
                <Tab><button>All Products</button></Tab>
                <Tab><button>Add New Car</button></Tab>
                <Tab><button>Edit Cars</button></Tab>
                <Tab><button>Add Make & Model</button></Tab>
              </div>

              <Panel>
                <AllProduct/>
              </Panel>

              <Panel>
                <MakeModelGrade/>
              </Panel>

              <Panel>
                <CarEdit/>
              </Panel>

              <Panel>
                <MakeModel/>
              </Panel>
            </Tabs>


        </div>
    );
  }
}

export default AllProducts;
