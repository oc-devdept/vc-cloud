import React, { Component } from "react";
import api from "Api";

import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import ProfileTabs from "Components/Layout/ProfileTabs";


import MegaMenu from './components/MegaMenu'
import ModelDetail from './components/ModelDetail'
import Exterior from './components/Exterior'
import Interior from './components/Interior'
import ProductOptions from './components/ProductOptions'
import Booking from './components/Booking'


import DashboardCard from "./components/DashboardCard"


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ModelID: '',
      ModelDetail: {},
      GradeItems : null,

      ProductDetail: {},
      Exterior: [],
      Interior: [],
      ProductOptions: [],


      // Fields : {name: ''},
      // PureFields : { name: '' },

    }
  }


  _SetModelID = async (e) => {

    let ModelID = this.state.ModelID

    if(ModelID != e.id){
      const Make = await api.get(`categories/${e.id}`);
      const GradeItems = await api.get(`categories/${e.id}`)

      
      return this.setState({
        ModelID: e.id, 
        ModelDetail: Make.data, 
        GradeItems: GradeItems.data
      })

    }

    return
  }

  _SelectGradeExterior = async(e) => {
    
    // Grade Detail

    const GradeDetail = await api.get(`products/specificGradeDetail/${e.id}`);

    const ExteriorGrade = await api.get(`products/specificVariantExterior/${e.id}`);

    const InteriorGrade = await api.get(`products/specificVariantInterior/${e.id}`);

    const ProductOptions = await api.get(`products/specificGradeProductOption/${e.id}`);
    
    this.setState({
      ProductDetail : GradeDetail.data.fields,
      Exterior : ExteriorGrade.data.fields, 
      Interior: InteriorGrade.data.fields, 
      ProductOptions : ProductOptions.data.fields
    })

  }

  
  render() {
                
    console.log(this.state)

    return (    
        <div>
            <React.Fragment>

              <Helmet>
                <title>Everyday | Quotations</title>
                <meta name="description" content="Everyday Quotation Management" />
              </Helmet>

              <PageTitleBar
                title={"All Cars"}
              />

              <div className="row">
                <div className="col-md-3">
                  <DashboardCard />
                </div>

                <div className="col-md-9">

                  <ProfileTabs loading={false}>
                    <div label="Mega Menu">
                      <MegaMenu
                        _SetModelID={this._SetModelID}
                      />
                    </div>

                    <div label="Model Details">
                      <ModelDetail
                        ModelDetail={this.state.ModelDetail}
                        ProductDetail={this.state.ProductDetail}
                        GradeItems={this.state.GradeItems}
                        _SelectGradeExterior={this._SelectGradeExterior}
                      />
                    </div>

                    <div label="Exterior">
                      <Exterior
                        Exterior={this.state.Exterior}
                      />
                    </div>

                    <div label="Interior">
                      <Interior
                        Interior={this.state.Interior}
                      />
                    </div>

                    <div label="ProductOption">
                      {/* <ProductOptions
                        ProductOptions={this.state.ProductOptions}
                      /> */}
                    </div>

                    <div label="Booking">
                      <Booking
                      />
                    </div>

                    {/* <div label="Testing">
                      <Testing
                      />
                    </div> */}
                    

                  </ProfileTabs>
                </div>
              </div>

            </React.Fragment>
        </div>
    );
  }
}

export default Index;
