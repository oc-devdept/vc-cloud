import React, { Component } from "react";
import api from "Api";

import MakeOption from './components/Option/MakeOption'
import ModelOption from './components/Option/ModelOption'

import MakeList from './components/List/MakeList'

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
        Tags: [],

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
        
            const Tags = await api.get(`tags`);


            if(this._isMounted) {
                this.setState({
                    MakeId: MakeFilter.data.id, 
                    MakeSource: MakeSource, 
                    MakeGroupingSource: MakeGroupingSource, 
                    MakeGroupingOriginalSource: MakeGroupingSource, 
                    Tags: Tags.data,
                    MakeLoading: false,
                    ModelLoading: false
                })
            }

        } catch (e) {

            if(this._isMounted) {
                this.setState({
                    MakeId: '',
                    MakeSource: [], 
                    Tags: [],
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
                    files: source.files? source.files : [],
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
        try {
            const ModelResult = await api.get(`/categories/${KeyId}/category`);
            this.setState({ModelSource: ModelResult.data, ModelLoading: false})
        } catch (e) {
            this.setState({ModelSource: [], ModelLoading: false})
        }
    }


    _SaveMake = async(datum) => {

        
        // await api.post("/announcements/new", data, config);
        const {files, start, end, name, description } = datum

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("name", name);
        data.append("description", description);
        data.append("start", start);
        data.append("end", end);
        data.append("categoryGroupId", this.state.MakeId);

        // await api.post(`/categories`, {
        //     name: Make.name,
        //     description: Make.description,
        //     image: Make.image,
        //     categoryGroupId: this.state.MakeId
        // })

        await api.post(`/categories/new`, data)

        const MakeSource = await this._RenderMakeCategory(this.state.MakeId)

        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)

        this.setState({MakeSource: MakeSource, MakeGroupingSource: MakeGroupingSource, MakeGroupingOriginalSource: MakeGroupingSource})

        return
    }

    _SaveModel = async(datum) => {

        const {files, start, end, name, description, tags } = datum

        const ModelId = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("name", name);
        data.append("description", description);
        data.append("start", start);
        data.append("end", end);
        data.append("tagId", tags);
        data.append("categoryId", this.state.categoryMakeId);
        data.append("categoryGroupId", ModelId.data.id);

        // categoryId: this.state.categoryMakeId,


        // await api.post(`/categories`, {
        //     name: Make.name,
        //     description: Make.description,
        //     image: Make.image,
        //     categoryGroupId: this.state.MakeId
        // })

        await api.post(`/categories/newModel`, data)

        // const ModelId = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);

        // await api.post(`/categories`, {
        //     name: Model.name,
        //     description: Model.description,
        //     image: Model.image,
        //     tagId: Model.tags,
        //     categoryId: this.state.categoryMakeId,
        //     categoryGroupId: ModelId.data.id
        // })

        await this._LaunchModels(this.state.categoryMakeId)

        return
    }




    render() {

        return (
            <div className="d-flex" style={{flexDirection:'row'}}>
                <div style={{flex: 1, display:'flex', flexDirection:'column'}}>

                    <div style={{}}>
                        {/* <MakeOption
                            MakeLoading={this.state.MakeLoading}
                            MakeSource={this.state.MakeSource}
                            _HandleMakeOption={this._HandleMakeOption}
                            _SaveMake={this._SaveMake}
                        /> */}

                        <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                            <button onClick={()=> console.log('Toggle Make Value Box!')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginTop:20}}>+ ADD MAKE VALUE</button>
                        </div>

                        <MakeList
                            title={'Car Make'}
                            tableData={this.state.MakeSource}
                        />
                    </div>

                    {/* <div style={{}}>
                        <ModelOption
                            categoryMakeName={this.state.categoryMakeName}
                            categoryMakeId={this.state.categoryMakeId}
                            ModelSource={this.state.ModelSource}
                            ModelLoading={this.state.ModelLoading}
                            Tags={this.state.Tags}
                            _SaveModel={this._SaveModel}
                        />
                    </div> */}
                </div>

                {/* <div style={{ display:'flex', flexDirection:'column'}}>
                    Create Items
                </div> */}
            </div>
        );
    }
}

export default index;
