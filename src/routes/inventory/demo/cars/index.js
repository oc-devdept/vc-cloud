import React, { Component } from "react";
import api from "Api";


import CarOptions from './components/CarOptions'


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const initialMake = {
    name:'',
    description: '',
    image: '',
}

const initialModel = {
    name: '',
    description : '',
    image: '',
}

















class index extends Component {

    
    constructor(props) {
        super(props);
        this.state = {

            categoryGroupId : '', // Category Group Id
            categoryId : '', // Category Id

            categoryMakeName : '',
            categoryMakeId : '',
            
            categoryModelName : '',
            categoryModelId : '',

            MakeGroupingSource: null,
            MakeSource : [],
            ModelSource: [],
            GradeSource: null,

            Make : {
                name:'',
                description: '',
                image: '',
            },

            Model: {
                name: '',
                description : '',
                image: '',
            },

            Grade: {
                name: '',
                description : '',
                image: '',
            },


            createMake: false,
            createModel: false,
            createGrade: false,
            loadingModel: false,
            loading: true,

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
                MakeSource: MakeSource, 
                MakeGroupingSource: MakeGroupingSource, 
                MakeGroupingOriginalSource: MakeGroupingSource, 
                loading:false
            })
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

    _RenderMakeGrouping(MakeSource) {
            
        let modelArray = []

        MakeSource.map((make) => {
            if(make.checklist){
                modelArray.push(`${make.name}:${make.id}`)
            }
        });

        return modelArray
    }

    _ToggleCreateMake = () => {
        this.setState({createMake: !this.state.createMake})
    }

    _ToggleCreateModel = () => {
        // this.setState({createModel: !this.state.createModel, createModelValue: keyName, MakeId: keyId})
        // this.setState({createModel: true, createModelValue: keyName, categoryId: keyId})
        this.setState({createModel: true})
    }
    
    _ToggleCreateGrade = () => {
        // this.setState({createModel: !this.state.createModel, createModelValue: keyName, MakeId: keyId})
        // this.setState({createModel: true, createModelValue: keyName, categoryId: keyId})
        this.setState({createGrade: true})
    }


    _ToggleCloseCreateModel = () => {
        this.setState({createModel: false, createModelValue: '', categoryId: ''})
    }

    _ToggleCloseCreateGrade = () => {
        this.setState({createGrade: false})
    }

    _HandleProductDetailValue = (e, value) => {
        let Make = {...this.state.Make}
        Make[value] = e
        this.setState({Make: Make})
    }

    _HandleModelDetailValue = (e, value) => {
        let Model = {...this.state.Model}
        Model[value] = e
        this.setState({Model: Model})
    }

    _HandleGradeDetailValue = (e, value) => {
        let Grade = {...this.state.Grade}
        Grade[value] = e
        this.setState({Grade: Grade})
    }

    _CreateMake = async() => {

        const Make = {...this.state.Make}

        await api.post(`/categories`, {
            name: Make.name,
            description: Make.description,
            image: Make.image,
            tags: [],
            categoryGroupId: this.state.categoryGroupId
        })

        const MakeSource = await this._RenderMakeCategory(this.state.categoryGroupId)

        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)

        this.setState({MakeSource: MakeSource, Make: initialMake, MakeGroupingSource: MakeGroupingSource, MakeGroupingOriginalSource: MakeGroupingSource})
    }

    _CreateModel = async() => {

        const ModelId = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);

        const Model = {...this.state.Model}

        await api.post(`/categories`, {
            name: Model.name,
            description: Model.description,
            image: Model.image,
            tags: [],
            categoryId: this.state.categoryId,
            categoryGroupId: ModelId.data.id
        })

        await this._LaunchModels(this.state.categoryMakeName, this.state.categoryMakeId)

        this.setState({
            Model: initialModel,
        })
    }

    _CreateGrade = async() => {

        const categoryModelId = this.state.categoryModelId
        const Grade = {...this.state.Grade}

        await api.post(`/categories`, {
            name: Grade.name,
            description: Grade.description,
            image: Grade.image,
            tags: [],
            categoryId: categoryModelId,
        })

        await this._LaunchGrade(this.state.categoryModelName, categoryModelId)

        this.setState({
            Grade: initialModel,
        })
    }



    _HandleCheckBox = async(value, index) => {
        // console.log(value)
        // console.log(this.state.MakeGroupingSource)
        // const MakeGroupingOriginalSource = [...this.state.MakeGroupingOriginalSource]
        // console.log(MakeGroupingOriginalSource)

        const MakeSource = [...this.state.MakeSource]
        MakeSource[index].checklist = !MakeSource[index].checklist

        const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource)


        this.setState({
            MakeSource: MakeSource, 
            MakeGroupingSource: MakeGroupingSource,
            ModelSource: [],
            GradeSource: null,
        })
    }

    _LaunchModels = async(KeyName, KeyId) => {

        this.setState({loadingModel: true, GradeSource: null})

        const ModelResult = await api.get(`/categories/${KeyId}/category`);
    
        this.setState({ModelSource: ModelResult.data, categoryMakeName: KeyName, categoryMakeId: KeyId, loadingModel: false})
        
    }

    _LaunchGrade = async(Name, Id) => {

        const GradeResult = await api.get(`/categories/${Id}/category`);

        this.setState({categoryModelName: Name, categoryModelId: Id, GradeSource: GradeResult.data})
    }


    _Toggle = (e) => {
        this.setState({categoryId: e.target.value})
    }

    _ReturnItems = () => {
        const item = this.state.MakeSource.map((e, index) => {
            return <MenuItem key={index} value={e.id}>{e.name}</MenuItem>
        })        
        return item
    }

   
    render() {


        return (
            <div style={{flex:1, display:'flex'}}>
            
                <div style={{width: 150}}>
                    <CarOptions
                        loading={this.state.loading}
                        MakeSource={this.state.MakeSource}
                        categoryGroupId={this.state.categoryGroupId}
                        _ToggleCreateMake={this._ToggleCreateMake}
                        _HandleCheckBox={this._HandleCheckBox}
                    />
                </div>


                <div style={{flex:1, overflow: 'auto', height: 300}}>

                    {this.state.MakeGroupingSource &&

                        <div className="d-flex" style={{flexDirection:'column'}}>

                            <div style={{flexDirection:'row'}} className="d-flex">
                                <h1>All Make</h1>
                                <button onClick={this._ToggleCreateMake}>+ Add Make</button>
                            </div>

                            <div className="d-flex align-items-center" style={{flexDirection:'row'}}>
                                {this.state.MakeGroupingSource.map((e, index) => {

                                    const keyName = e.split(':')[0]
                                    const keyId = e.split(':')[1]

                                    return (
                                        <div key={index} style={{height: 130}}>

                                            <div onClick={() => this._LaunchModels(keyName, keyId)} className="d-flex justify-content-center, align-items-center" style={{width: 80, height: 80, borderRadius: 5, border: '1px solid black', margin: 5}}>
                                                <p>{keyName}</p>
                                               
                                            </div>
                                            
                                        </div>
                                    )       
                                })}
                            </div>


                        </div>
                    }

                </div>


                <div style={{flex: 1, overflow: 'auto', height: 300}}>


                    <div className="d-flex" style={{flexDirection:'column'}}>

                        <div style={{flexDirection:'row'}} className="d-flex">
                            <h1>All Model</h1>
                            <button onClick={this._ToggleCreateModel}>+ Add Model</button>
                        </div>


                        {this.state.loadingModel && 
                            <div>
                                Loading ...
                            </div>
                        }

                        {!this.state.loadingModel && 
                            <div>
                                {this.state.ModelSource.length > 0 && 
                                    <div>
                                        {this.state.ModelSource.map((e, index) => {
                                                return (
                                                    <div key={index} onClick={() => this._LaunchGrade(e.name, e.id)}
                                                    className="d-flex justify-content-center, align-items-center" style={{width: 150, height: 80, borderRadius: 5, border: '1px solid black', margin: 5, flexDirection:'column'}}>
                                                        <p>{e.name}</p>
                                                        <p>{e.description}</p>
                                                    </div>
                                                ) 
                                        })}
                                    </div>
                                }

                                {this.state.ModelSource.length == 0 && 
                                    <div>
                                        No Model
                                    </div>
                                }
                            </div>
                        }

                    </div>


                </div>


                <div style={{flex: 1, overflow: 'auto', height: 300}}>

                    <div className="d-flex" style={{flexDirection:'column'}}>

                        {/* {this.state.loadingModel && 
                            <div>
                                Loading ...
                            </div>
                        } */}

                        {this.state.GradeSource &&
                            <div>

                                <div style={{flexDirection:'row'}} className="d-flex">
                                    <h1>All Grade</h1>
                                    <button onClick={this._ToggleCreateGrade}>+ Add Grade</button>
                                </div>

                                {this.state.GradeSource.length > 0 &&
                                    <div>
                                        {this.state.GradeSource.map((e, index) => {
                                                return (
                                                    <div key={index} className="d-flex justify-content-center, align-items-center" 
                                                    style={{width: 150, height: 80, borderRadius: 5, border: '1px solid black', margin: 5, flexDirection:'column'}}>
                                                        <p>{e.name}</p>
                                                        <p>{e.description}</p>
                                                    </div>
                                                ) 
                                        })}
                                    </div>
                                }

                                {this.state.GradeSource.length == 0 &&
                                    <div style={{flexDirection:'row'}} className="d-flex">
                                        No Grade
                                    </div>
                                }
                            </div>
                        }
                           

                    </div>


                </div>

                


                <div style={{flex: 1, width: 100}}>

                    {this.state.createMake && 
                        <div>
                            <div>+ Add New Make</div>
                            <input type="name" placeholder={"e.g BMW"} value={this.state.Make.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                            <input type="value" placeholder={"e.g description"} value={this.state.Make.description} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'description')} />
                            <input type="value2" placeholder={"e.g image url"} value={this.state.Make.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                            <button style={{}} onClick={this._CreateMake}>Add Make</button>
                        </div>
                    }


                    {this.state.createModel &&
                        <div>

                            Create Model!

                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={this.state.categoryId ? this.state.categoryId : ""}
                                    onChange={this._Toggle}
                                >
                                {this._ReturnItems()}
                                </Select>
                            </FormControl>


                            <input type="name" placeholder={"e.g Name of Model"} value={this.state.Model.name} onChange={(e) => this._HandleModelDetailValue(e.target.value, 'name')} />
                            <input type="value" placeholder={"e.g Description"} value={this.state.Model.description} onChange={(e) => this._HandleModelDetailValue(e.target.value, 'description')} />
                            <input type="value2" placeholder={"e.g Image url"} value={this.state.Model.image} onChange={(e) => this._HandleModelDetailValue(e.target.value, 'image')} />
                            
                            <button onClick={this._CreateModel}>Create Model</button>
                            <button onClick={this._ToggleCloseCreateModel}>Close Window</button>

                        </div>
                    }


                    {this.state.createGrade &&
                        <div>
                            Create Grade!
                                <input type="name" placeholder={"e.g Name of Model"} value={this.state.Grade.name} 
                                onChange={(e) => this._HandleGradeDetailValue(e.target.value, 'name')} />
                                <input type="value" placeholder={"e.g Description"} value={this.state.Grade.description} 
                                onChange={(e) => this._HandleGradeDetailValue(e.target.value, 'description')} />
                                <input type="value2" placeholder={"e.g Image url"} value={this.state.Grade.image} 
                                onChange={(e) => this._HandleGradeDetailValue(e.target.value, 'image')} />
                                
                                <button onClick={this._CreateGrade}>Create Model</button>
                                <button onClick={this._ToggleCloseCreateGrade}>Close Window</button>
                        </div>
                    }


                </div>

            </div>
        );
    }
}

export default index;


// first page // Mega Menue

// [
//     {
//         id: '123123',
//         name: "BMW",
//         image: 'www.google.com/bmw.png',
//         description: 'Hello World'
//     },
//     {
//         id: '456456',
//         name: "Toyota",
//         image: 'www.google.com/bmw.png',
//         description: 'Hello World'
//     },
//     ...
// ]


/// second page // Model

// [
//     {
//         id: '890890',
//         name: "1 Series",
//         image: 'www.google.com/bmw-series.png',
//         description: 'Hello World series 1'
//     },
//     {
//         id: '098098',
//         name: "2 series",
//         image: 'www.google.com/bmw-series.png',
//         description: 'Hello World series 2 '
//     },
    
// ]

/// third page // Grade

// [
//     {
//         id: '890890',
//         name: "BMW HellFire ",
//         image: 'www.google.com/bmw-series.png',
//         description: 'Hello World series 1',
//         price: {
//             value: 123123,
//             unit: 'SGD'
//         },
//         engine: {
//             value : 123,
//             unit: 'cc'
//         },
//         Fuel :{
//             value : 23.5,
//             unit : 'km/litre'
//         }
//     },
//     {
//         id: '098098',
//         name: "BMW WaterFront",
//         image: 'www.google.com/bmw-series.png',
//         description: 'Hello World series 2 '
//     },
//     ...
// ]


/// car page

// function fetchMakeData(id) {

//     // let data = api.get(`/getMakeModel/${id}`)
//     const data = [
//         {
//             id: '123123',
//             name: "BMW",
//             image: 'www.google.com/bmw.png',
//             description: 'Hello World'
//         },
//         {
//             id: '456456',
//             name: "Toyota",
//             image: 'www.google.com/bmw.png',
//             description: 'Hello World'
//         },
//     ]

//     return data
// }

// function fetchModelData(id) {

//     // let data = api.get(`/getMakeModel/${id}`)
//     const data = [
//         {
//             id: '890890',
//             name: "1 Series",
//             image: 'www.google.com/bmw-series.png',
//             description: 'Hello World series 1'
//         },
//         {
//             id: '098098',
//             name: "2 series",
//             image: 'www.google.com/bmw-series.png',
//             description: 'Hello World series 2 '
//         },
        
//     ]

//     return data
// }


// function fetchGradeData(id) {

//     // let data = api.get(`/getGrade/${id}`)
//     const data = [
//         {
//             id: '890890',
//             name: "BMW HellFire ",
//             image: 'www.google.com/bmw-series.png',
//             description: 'Hello World series 1',
//             price: {
//                 value: 123123,
//                 unit: 'SGD'
//             },
//             engine: {
//                 value : 123,
//                 unit: 'cc'
//             },
//             Fuel :{
//                 value : 23.5,
//                 unit : 'km/litre'
//             }
//         },
        
//     ]

//     return data
// }

