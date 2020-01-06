import React, { Component, PureComponent } from "react";
import api from "Api";

import MakeList from './components/List/MakeList'
import DialogRoot from "Components/Dialog/DialogRoot";

import Makes from './components/makes'
import Models from './components/models'

class index extends PureComponent {

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
        ModelLoading: true,

        toggle: false,
        element : null,
        data: null,
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

            // const ProductOption = await api.post(`products/productOption`, {
            //     data: {
            //         productId: '5de9c7c7bce4b703a335c209',
            //         productOptionId: '5de4b932afdb524dca60c7d8'
            //     }
            // });
            // console.log(ProductOption.data)

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

    _LaunchModels = async(KeyId) => {
        try {
            const ModelResult = await api.get(`/categories/${KeyId}/category`);
            this.setState({ModelSource: ModelResult.data, ModelLoading: false})
        } catch (e) {
            this.setState({ModelSource: [], ModelLoading: false})
        }
    }

    _SaveMakeDone = async() => {

        const MakeSource = await this._RenderMakeCategory(this.state.MakeId)

        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)

        this.setState({MakeSource: MakeSource, MakeGroupingSource: MakeGroupingSource, MakeGroupingOriginalSource: MakeGroupingSource})

        return
    }

    _SaveModelDone = async() => {
      
        this._isMounted = true;
        this.loadInitial()
        
        return
    }



    
    _RenderDialog = () => {
        if(this.state.toggle){
            switch(this.state.element) {
            
                case 'Create_Make':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Makes
                                Action={'Create'}
                                Data={this.state.data}
                                MakeId={this.state.Id}
                                
                                _RestartToggle={this._RestartToggle}
                                _SaveMakeDone={this._SaveMakeDone}
                            />
                        </DialogRoot>
                    )
                case 'Edit_Make':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Makes
                                Action={'Edit'}
                                Data={this.state.data}

                                _RestartToggle={this._RestartToggle}
                                _SaveMakeDone={this._SaveMakeDone}
                            />
                        </DialogRoot>               
                    )
                case 'Delete_Make':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Makes
                                Action={'Delete'}
                                Data={this.state.data}

                                _RestartToggle={this._RestartToggle}

                            />
                        </DialogRoot>
                    )




                case 'Create_Model':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Models
                                Action={'Create'}
                                Data={this.state.data}
                                Tags={this.state.Tags}

                                _RestartToggle={this._RestartToggle}
                                _SaveModelDone={this._SaveModelDone}
                            />
                        </DialogRoot>
                    )
                case 'Edit_Model':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Models
                                Action={'Edit'}
                                Data={this.state.data}
                                Tags={this.state.Tags}

                                _RestartToggle={this._RestartToggle}
                                _SaveModelDone={this._SaveModelDone}

                            />
                        </DialogRoot>               
                    )
                case 'Delete_Model':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                        >
                            <Models
                                Action={'Delete'}
                                Data={this.state.data}
                                Tags={this.state.Tags}

                                _RestartToggle={this._RestartToggle}

                            />
                        </DialogRoot>
                    )
                default:
                    return null
            }
        }
    }

    _RestartToggle = () => {
        this.setState({toggle: false, element : null, data: null, Id: null})
    }

    ToggleDialog = (element, data, Id) => {
        this.setState({element: element, toggle: !this.state.toggle, data: data, Id: Id})
    }





    render() {


        return (
            <div className="d-flex" style={{flexDirection:'row'}}>
                <div style={{flex: 1, display:'flex', flexDirection:'column'}}>

                    <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                        <button onClick={() => this.ToggleDialog('Create_Make', '', this.state.MakeId)} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginTop:20, marginRight:20}}>+ CREATE MAKE</button>
                    </div>

                    <MakeList
                        title={'Car Make'}
                        tableData={this.state.MakeSource}
                        ToggleDialog={this.ToggleDialog}
                    />
                  
                    {this._RenderDialog()}
            
                </div>

            </div>
        );
    }
}

export default index;
