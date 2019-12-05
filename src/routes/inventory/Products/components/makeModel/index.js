import React, { Component } from "react";
import api from "Api";

import MakeOption from './components/MakeOption'
import ModelOption from './components/ModelOption'

const initialMake = {
    name:'',
    description: '',
    image: '',
}


class index extends Component {

    state=({
        categoryMakeId: '', 
        categoryMakeName: '', 

        MakeId: '',
        MakeSource: [], 
        MakeGroupingSource: [], 
        MakeGroupingOriginalSource: [], 

        ModelSource: [],
        MakeLoading: true,
        ModelLoading: true
    })

    componentDidMount() {
        this._isMounted = true;
        this.loadInitial()
    }

    loadInitial = async () => {

        try {

            const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);

            const MakeSource = await this._RenderMakeCategory(MakeFilter.data.id)
        
            const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)
        
            if(this._isMounted) {
                this.setState({
                    MakeId: MakeFilter.data.id, 
                    MakeSource: MakeSource, 
                    MakeGroupingSource: MakeGroupingSource, 
                    MakeGroupingOriginalSource: MakeGroupingSource, 
                    MakeLoading: false,
                    ModelLoading: false
                })
            }

        } catch (e) {

            if(this._isMounted) {
                this.setState({
                    MakeId: '',
                    MakeSource: [], 
                    MakeGroupingSource: [], 
                    MakeGroupingOriginalSource: [], 

                    MakeLoading: false,
                    ModelLoading: false,
                })
            }

        }

        
           
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    async _RenderMakeGrouping(MakeSource) {
            
        let modelArray = []

        MakeSource.map((make) => {
            if(make.checklist){
                modelArray.push(`${make.name}:${make.id}`)
            }
        });

        return modelArray
    }

    _HandleMakeOption = (name, index) => {
        this.setState({categoryMakeName: name, categoryMakeId: index, ModelLoading: true})
        this._LaunchModels(index)
    }

    _LaunchModels = async(KeyId) => {
        const ModelResult = await api.get(`/categories/${KeyId}/category`);
        this.setState({ModelSource: ModelResult.data, ModelLoading: false})
    }

    _SaveMake = async(Make) => {
    
        await api.post(`/categories`, {
            name: Make.name,
            description: Make.description,
            image: Make.image,
            tags: [],
            categoryGroupId: this.state.MakeId
        })

        const MakeSource = await this._RenderMakeCategory(this.state.MakeId)

        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)

        this.setState({MakeSource: MakeSource, MakeGroupingSource: MakeGroupingSource, MakeGroupingOriginalSource: MakeGroupingSource})

        return
    }


    _SaveModel = async(Model) => {

        const ModelId = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);

        await api.post(`/categories`, {
            name: Model.name,
            description: Model.description,
            image: Model.image,
            tags: [],
            categoryId: this.state.categoryMakeId,
            categoryGroupId: ModelId.data.id
        })

        await this._LaunchModels(this.state.categoryMakeId)

        return
    }




    render() {

        return (
            <div className="d-flex" style={{flexDirection:'row'}}>
                <div style={{flex: 1, display:'flex', flexDirection:'column'}}>
                    <div style={{margin: 15}}>
                        <MakeOption
                            MakeLoading={this.state.MakeLoading}
                            MakeSource={this.state.MakeSource}
                            _HandleMakeOption={this._HandleMakeOption}
                            _SaveMake={this._SaveMake}
                        />
                    </div>

                    <div style={{margin: 15}}>
                        <ModelOption
                            categoryMakeName={this.state.categoryMakeName}
                            categoryMakeId={this.state.categoryMakeId}
                            ModelSource={this.state.ModelSource}
                            ModelLoading={this.state.ModelLoading}
                            _SaveModel={this._SaveModel}
                        />
                    </div>
                </div>

                {/* <div style={{ display:'flex', flexDirection:'column'}}>
                    Create Items
                </div> */}
            </div>
        );
    }
}

export default index;
