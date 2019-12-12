import React, { Component } from "react";

import api from "Api";
import Checkbox from '@material-ui/core/Checkbox';


const initialModel = {
    name:'',
    description: '',
    image: '',
}

class ModelOption extends Component  {

    state=({
        openModel: false,
        Model : {
            name:'',
            description: '',
            image: '',
            tags: ''
        },
    })

    _HandleModel = (e, value) => {
        let Model = {...this.state.Model}
        Model[value] = e
        this.setState({Model: Model})
    }
    
    _SaveModel = async() => {
        await this.props._SaveModel(this.state.Model)
        this.setState({Model: initialModel})
    }

    _HandleTags = (id) => {
        let Model = {...this.state.Model}
        
        Model.tags = id
  
        // if(Model.tags.includes(id)){
        //     Model.tags = Model.tags.filter(e => e != id)
        // } else {
        //     Model.tags.push(id)
        // }

        this.setState({Model : Model})
    }


    render() {

        const {categoryMakeName, categoryMakeId, ModelLoading, ModelSource, Tags} = this.props
        
        return (
            <div className="d-flex" style={{flexDirection:'row'}}>

                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    Model Option
                    <div>
                        {categoryMakeName}
                    </div>

                    {ModelLoading &&
                        <div>
                            Loading ...
                        </div>
                    }

                    {!ModelLoading && 
                        <div className="d-flex">
                            {ModelSource.length > 0 && 
                                ModelSource.map((e,index) => {
                                    return (
                                        <div key={index}  
                                            className="d-flex justify-content-center align-item-center" 
                                            style={{
                                                flexDirection:'column', border:'1px solid black', 
                                                borderRadius: 5, padding: 5,
                                            }}
                                        >
                                            <span style={{padding: 5}}>{e.name}</span>
                                            <span style={{padding: 5}}>{e.description}</span>
                                            <span style={{padding: 5}}>{e.image}</span>
                                        </div>
                                    )
                                })
                            }

                            {ModelSource.length == 0 && 
                                <div>
                                    No models found
                                </div>
                            }
                        </div>
                    }
                </div>

                <div>
                    {categoryMakeName && 
                        <div>
                            <button onClick={()=> this.setState({openModel: !this.state.openModel})} >Create Model</button>

                            {this.state.openModel &&
                                <div className="d-flex" style={{flexDirection:'column'}}>
                                    <input placeholder={"e.g BMW"} value={this.state.Model.name} onChange={(e) => this._HandleModel(e.target.value, 'name')} />
                                    <input placeholder={"e.g description"} value={this.state.Model.description} onChange={(e) => this._HandleModel(e.target.value, 'description')} />
                                    <input placeholder={"e.g image url"} value={this.state.Model.image} onChange={(e) => this._HandleModel(e.target.value, 'image')} />
                                    

                                    <span>Choose Car Type: </span>

                                    {Tags.length > 0 && 
                                        <div style={{width: 200, height: 280, overflow:'auto'}}>
                                            {this.props.Tags.map((e, index) => {

                                                let style = {padding: 5, margin: 5, borderRadius: 10, border: '1px solid black'}
                                                if(this.state.Model.tags == e.id){
                                                    style = {padding: 5, margin: 5, borderRadius: 10, border: '1px solid black', background: 'red'}
                                                }

                                                return (
                                                    <div key={index} onClick={() => this._HandleTags(e.id)} style={style}>
                                                        {e.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                    
                                    
                                    <button style={{}} onClick={this._SaveModel}>Save Model</button>
                                </div>
                            }
                        </div>
                    }
                </div>

            </div>
        )
        
    }
    
}


export default ModelOption