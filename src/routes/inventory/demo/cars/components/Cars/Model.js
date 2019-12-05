import React, { Component } from "react";
import api from "Api";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const initialModel = {
    name:'',
    description: '',
    image: '',
}

export default class Model extends Component {


    async componentDidMount() {
        // const CategoryGroup = await api.get(`/categorygroups/formFields`)
        // this.setState({CategoryGroup: CategoryGroup.data.fields})
        const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);       
        await this._RenderMakeCategory(MakeFilter.data.id)

        const Model = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);
        await this._RenderModelCategory(Model.data.id)
        this.setState({categoryGroupId: Model.data.id, loading:false})
    }

    async _RenderMakeCategory(value) {
        const CategoryGroup = await api.get(`/categorygroups/${value}/categoryGroup`);
        const MakeCategorySource = await CategoryGroup.data.map(
            (source) => {
              return { name: source.name, value: source.id};
            }
        );
        this.setState({MakeCategory: MakeCategorySource})
    }


    state=({
        Model : {
            name:'',
            description: '',
            image: '',
        },
        categoryGroupId: '',
        SelectedCategory: '',
        loading: true,
        MakeCategory : [],
        ModelCategory: [],
    })

    _HandleProductDetailValue = (e, value) => {
        let Model = {...this.state.Model}
        Model[value] = e
        this.setState({Model: Model})
    }

    _ReturnItems() {
        const item = this.state.MakeCategory.map((e, index) => {
             return <MenuItem key={index} value={e.value}>{e.name}</MenuItem>
        })        
        return item
    }

    _Toggle = (e) => {
        this.setState({SelectedCategory: e.target.value, loading: true})
        this._RenderModelCategory(e.target.value)
    }


    async _RenderModelCategory(value) {

        try {
            const ModelCategorySource = await api.get(`/categorygroups/${value}/categoryGroup`);
           
            const ModelCategory = await ModelCategorySource.data.map((source) => {
                return { 
                    id: source.id, 
                    name: source.name, 
                    description: source.description, 
                    image: source.image 
                }
            })

            console.log(ModelCategory)

            this.setState({ModelCategory: ModelCategory})
            
        } catch (e) {
            this.setState({ModelCategory: []})
        }
        
 
    }


    _CreateModel = async() => {

        const Model = {...this.state.Model}

        await api.post(`/categories`, {
            name: Model.name,
            description: Model.description,
            image: Model.image,
            categoryGroupId: this.state.categoryGroupId
        })

        await this._RenderModelCategory(this.state.categoryGroupId)

        this.setState({
            Model: initialModel
        })
    }




    render() {

    
       
        return (
            <div className="d-flex" style={{flexDirection:'column'}}>

                <div>Model</div>
                <button style={{width: 300}} onClick={this._CreateModel}>Add Model</button>
                <div>
                    <div>Enter your model detail</div>
                    <input type="name" placeholder={"e.g BMW"} value={this.state.Model.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                    <input type="value" placeholder={"e.g description"} value={this.state.Model.description} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'description')} />
                    <input type="value2" placeholder={"e.g image url"} value={this.state.Model.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                </div>

                <div className="d-flex">
                    <div>Select Make Category : </div>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={this.state.SelectedCategory? this.state.SelectedCategory : ""}
                            onChange={this._Toggle}
                        >
                        {this._ReturnItems()}
                        </Select>
                    </FormControl>
                </div>


                {this.state.loading && 
                    <div>Fetching ... </div>
                }

                {!this.state.loading && 
                    <div>
                        {/* {this.state.SelectedCategory && 
                            <div>
                                <div>Enter your model detail</div>
                                <input type="name" placeholder={"e.g BMW"} value={this.state.Model.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                                <input type="value" placeholder={"e.g description"} value={this.state.Model.description} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'description')} />
                                <input type="value2" placeholder={"e.g image url"} value={this.state.Model.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                            </div>
                        } */}


                        {this.state.ModelCategory.length > 0 && 
                            this.state.ModelCategory.map((e,index) => {
                                return (
                                    <div key={index} className="d-flex" >
                                        <span style={{padding: 5}}>{e.name}</span>
                                        <span style={{padding: 5}}>{e.description}</span>
                                        <span style={{padding: 5}}>{e.image}</span>
                                    </div>
                                )
                            })
                        }

                        {this.state.ModelCategory.length == 0 && 
                            <div>
                                No Models Found
                            </div>
                        }
                    </div>
                }
                
            </div>
        )
    }
}