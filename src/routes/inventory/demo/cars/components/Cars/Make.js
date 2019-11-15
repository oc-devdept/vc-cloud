import React, { Component } from "react";
import api from "Api";


export default class Make extends Component {


    async componentDidMount() {
        // const CategoryGroup = await api.get(`/categorygroups/formFields`)
        // this.setState({CategoryGroup: CategoryGroup.data.fields})

        const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);

        await this._RenderModelCategory(MakeFilter.data.id)
        // const CategoryGroup = await api.get(`/categorygroups/${MakeFilter.data.id}/categoryGroup`);

        this.setState({categoryGroupId: MakeFilter.data.id, loading:false})
    }

    state=({
        Make : {
            name:'',
            description: '',
            image: '',
        },
        categoryGroupId : '',
        Category : [],
        loading: true,
    })

    _CreateMake = async() => {

        const Make = {...this.state.Make}

        await api.post(`/categories`, {
            name: Make.name,
            description: Make.description,
            image: Make.image,
            tags: [],
            categoryGroupId: this.state.categoryGroupId
        })

        
        this._RenderModelCategory(this.state.categoryGroupId)
    }


    async _RenderModelCategory(value) {
        
        try {
            const CategoryGroup = await api.get(`/categorygroups/${value}/categoryGroup`);
            const CategorySource = await CategoryGroup.data.map((source) => {
                return { id: source.id, name: source.name, description: source.description, image: source.image }
                }
            );
            this.setState({Category: CategorySource})
        } catch (e) {
            console.log(e)

        }

    }


    _HandleProductDetailValue = (e, value) => {
        let Make = {...this.state.Make}
        Make[value] = e
        this.setState({Make: Make})
    }


    render() {

   
        return (
            <div className="d-flex" style={{flexDirection:'column'}}>

                <div>Make</div>
                {/* <button style={{width: 300}} onClick={this._CreateMake}>Add Make</button>
                <div>
                    <div>Enter your product detail</div>
                    <input type="name" placeholder={"e.g BMW"} value={this.state.Make.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                    <input type="value" placeholder={"e.g description"} value={this.state.Make.description} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'description')} />
                    <input type="value2" placeholder={"e.g image url"} value={this.state.Make.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                </div> */}

                {this.state.loading && 
                    <div>Fetching ... </div>
                }

                {this.state.Category.length > 0 && 
                    this.state.Category.map((e,index) => {
                        return (
                            <div key={index} className="d-flex" >
                                <span style={{padding: 5}}>{e.name}</span>
                                <span style={{padding: 5}}>{e.description}</span>
                                <span style={{padding: 5}}>{e.image}</span>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}