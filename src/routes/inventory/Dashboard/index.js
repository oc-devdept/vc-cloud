import React, { Component } from "react";
import api from "Api";


import MegaMenu from './components/MegaMenu'
import ModelDetail from './components/ModelDetail'
import Exterior from './components/Exterior'
import Interior from './components/Interior'
import ProductOptions from './components/ProductOptions'

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ModelID: '',
      ModelDetail: {},
      GradeItems : [],

      ProductDetail: [],
      Exterior: [],
      Interior: [],
      ProductOptions: []
    }
  }


  _SetModelID = async (e) => {
  
    let ModelID = this.state.ModelID
    console.log(e.id)
    if(ModelID != e.id){
      const Make = await api.get(`categories/${e.id}`);
      const GradeItems = await api.get(`products/specificGrades/${e.id}`)

      return this.setState({
        ModelID: ModelID, 
        ModelDetail: Make.data, 
        GradeItems: GradeItems.data.fields
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

    return (
        <div className="todo-dashboard" style={{display:'flex', flexDirection:'column'}}>
       
            <MegaMenu
              _SetModelID={this._SetModelID}
            />

            <ModelDetail
              ModelDetail={this.state.ModelDetail}
              ProductDetail={this.state.ProductDetail}
              GradeItems={this.state.GradeItems}
              _SelectGradeExterior={this._SelectGradeExterior}
            />

            <Exterior
              Exterior={this.state.Exterior}
            />

            <Interior
              Interior={this.state.Interior}
            />

            <ProductOptions
              ProductOptions={this.state.ProductOptions}
            />


        </div>
    );
  }
}

export default Index;
