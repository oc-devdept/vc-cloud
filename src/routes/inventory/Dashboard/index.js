import React, { Component } from "react";
import api from "Api";


import MegaMenu from './components/MegaMenu'
import ModelDetail from './components/ModelDetail'


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ModelID: '',
      ModelDetail: {},
      GradeItems : []
    }
  }


  _SetModelID = async (e) => {
  
    let ModelID = this.state.ModelID

    if(ModelID != e.id){
      const Make = await api.get(`categories/${e.id}`);
      // const GradeItems = await api.get(`categories/${e.id}/product`)
      const GradeItems = await api.get(`products/specificGrades/${e.id}`)
    
      return this.setState({ModelID: ModelID, ModelDetail: Make.data, GradeItems: GradeItems.data.fields})
    }

    return
  }

  render() {

    return (
        <div className="todo-dashboard">
            <div style={{border : '1px solid black', borderStyle : 'dashed', display:'flex', flexDirection:'column'}}>
                

                <MegaMenu
                  _SetModelID={this._SetModelID}
                />

                <ModelDetail
                  ModelDetail={this.state.ModelDetail}
                  GradeItems={this.state.GradeItems}
                />

            </div>
        </div>
    );
  }
}

export default Index;
