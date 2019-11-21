import React, { Component } from "react";
import api from "Api";

import MakeModel from './MakeModel'
import Grade from './Grade'


class MakeModelGrade extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Grade: '',
            categoryGroupId: '', 

            MakeSource: [], 
            ModelSource: [],

            Makeloading: true,
            ModelLoading: true,

            MakeId: '',
            ModelId: '',
        
        }

        this._isMounted = false;

    }

    componentDidMount() {
        this._isMounted = true;
        this.loadInitial()
    }

    loadInitial = async () => {

        const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);

        const MakeSource = await this._RenderMakeCategory(MakeFilter.data.id)
    
        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)
       
        if(this._isMounted) {
            this.setState({
                categoryGroupId: MakeFilter.data.id, 
                MakeSource: MakeGroupingSource, 

                Makeloading: false,
                ModelLoading: false
            })
        }
           
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
        this.setState({MakeId: e.target.value})
        console.log('Make selected!')
        await this._LoadModels(e.target.value)
    }

    _LoadModels = async(KeyId) => {

        this.setState({ModelLoading: true, GradeSource: null})

        const ModelResult = await api.get(`/categories/${KeyId}/category`);
    
        const ModelSource = ModelResult.data.map((source) => {
            return { name: source.name, value: source.id}
        })

        this.setState({ModelSource: ModelSource, ModelLoading: false})
        
    }

    _ToggleModel = (e) => {
        this.setState({ModelId: e.target.value})
    }
    
    _HandleGradeDetailValue = (e) => {
        this.setState({Grade: e})
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
                    _HandleGradeDetailValue={this._HandleGradeDetailValue}
                    Grade = {this.state.Grade}
                    ModelId={this.state.ModelId}
                />
                
                

            </div>
        )
    }
  
}

export default MakeModelGrade;

