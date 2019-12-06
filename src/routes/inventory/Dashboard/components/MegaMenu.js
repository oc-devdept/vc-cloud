import React, { Component } from "react";
import api from "Api";


class MegaMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      AllMakeSource : [{
        name: 'All',
        description : 'All model in the Venture Cars '
      }],
      AllModelSource: [],


      ModelLoading : true
    }
  }

  // Fetch All Models (DONE)

  // Fetch Dynamic Make Categories


  async componentDidMount() {

    let AllMakeSource = [...this.state.AllMakeSource]

    try {

      // Make Source 
      const Make = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);
      let MakeSource = await this._RenderMakeCategory(Make.data.id)
      AllMakeSource = AllMakeSource.concat(MakeSource)

      // Model Source
      const Model = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);
      const AllModelSource = await this._RenderModelCategory(Model.data.id)
    
      console.log(AllModelSource)
      console.log(AllMakeSource)
      
      this.setState({AllModelSource: AllModelSource, AllMakeSource: AllMakeSource, ModelLoading: false})
    
    } catch (e){
      console.log(e)
      this.setState({AllModelSource: [], AllMakeSource: [], ModelLoading: false})
    }
  }

  // Download all model
  async _RenderModelCategory(value) {
    try {
        const ModelSource = await api.get(`/categorygroups/${value}/categoryGroup`);
        return ModelSource.data      
    } catch (e) {
        console.log(e)
    }
  }

  // Download all make categories
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

  // Specific Model Based On Make
  async _RenderSpecificModelCategory(value) {
    try {
        const ModelSource = await api.get(`/categories/${value}/category`);
        return ModelSource.data      
    } catch (e) {
        console.log(e)
    }
  }

  // OnClick Function
  _HandleMake = async (index) => {

    await this.setState({stage: index, ModelLoading: true})

    let AllModelSource = []
    if(index == 0){

      const Model = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);
      AllModelSource = await this._RenderModelCategory(Model.data.id)

    } else {
      let AllMakeSource = this.state.AllMakeSource[index]
      AllModelSource = await this._RenderSpecificModelCategory(AllMakeSource.id)
    }
   

    await this.setState({ModelLoading: false, AllModelSource: AllModelSource})
  }

  // Render Make Categories
  _RenderMake = () => {
    return (
      this.state.AllMakeSource.map((e, index) => {

        const stage = this.state.stage

        let style = {padding: 5, margin: 10}

        if(stage == index){
          style = {border: '1px solid black', padding: 5, margin: 10}
        }

        return (
          <div key={index} style={style} onClick={() => this._HandleMake(index)}>
              {e.name}
          </div>
        )
      })
    )
  }

  // Render Model Values
  _RenderModel = () => {
    return (
      
      this.state.AllModelSource.map((e, index) => {
        return (
          <div key={index} style={{
              height : 100, width: 150, 
              border: '1px solid black', display:'flex', 
              margin: 10, display:'flex', flexDirection:'column',
              overflow: 'auto'
          }} onClick={() => this.props._SetModelID(e)}>
              <span>{e.name}</span>
              <span>{e.description}</span>
          </div>
        )
      })
    )
  }



  render() {

    return (
        <div className="todo-dashboard">
            <div style={{border : '1px solid black', borderStyle : 'dashed', display:'flex', flexDirection:'column'}}>
                

                {this.state.AllMakeSource.length > 0 &&
                  <div style={{display:'flex', flexDirection:'row', width: '100%'}}>
                    {this._RenderMake()}
                  </div>
                }
             

                {!this.state.ModelLoading && 
                  <div>
                    {this.state.AllModelSource.length > 0 &&
                      <div style={{display:'flex', flexWrap:'wrap', marginTop: 50}}>
                        {this._RenderModel()}
                      </div>
                    }

                    {this.state.AllModelSource.length == 0 &&
                      <div style={{display:'flex', flexWrap:'wrap', marginTop: 50}}>
                        No Model Found
                      </div>
                    }
                  </div>
                }


                {this.state.ModelLoading && 
                  <div>
                    Loading .... 
                  </div>
                }

            </div>
        </div>
    );
  }
}

export default MegaMenu;
