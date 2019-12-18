import React, { Component } from "react";

import api from "Api";
import Checkbox from '@material-ui/core/Checkbox';

import Dropzone from "Components/Dropzone";


const initialModel = {
    name:'',
    description: '',
    image: '',
}

class ModelOption extends Component  {

    state=({
        // openModel: false,
        Model : {
            name:'',
            description: '',
            image: '',
            tags: ''
        },
        
        tags: '',
        openMake: false,
        name:'',
        description: '',
        start: new Date(),
        end: new Date(),
        files: []
    })

    _HandleModel = (e, value) => {
        this.setState({[value]: e})
    }
    
    _SaveModel = async() => {
        // await this.props._SaveModel(this.state.Model)
        // this.setState({Model: initialModel})

        await this.props._SaveModel(this.state)

        this.setState({
            description: "",
            name: "",
            start: new Date(),
            end: new Date(),
            files: []
        })
    }

    _HandleTags = (id) => {
        // let Model = {...this.state.Model}
        // Model.tags = id
        // if(Model.tags.includes(id)){
        //     Model.tags = Model.tags.filter(e => e != id)
        // } else {
        //     Model.tags.push(id)
        // }

        this.setState({tags : id})
    }


    removeFile = (file) => {
        this.setState(state => {
          const index = state.files.indexOf(file);
          const files = state.files.slice(0);
          files.splice(index, 1);
          return { files };
        });
    }
  
    handleUpload = file => {
        this.setState({
            files: file
        });
    };


    render() {

        const {categoryMakeName, categoryMakeId, ModelLoading, ModelSource, Tags} = this.props
        const { description, name, files} = this.state;

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
                                            {e.files.length > 0 && 
                                                <img
                                                    src={e.files[0].url}
                                                    height={100}
                                                    width={100}
                                                />
                                            }
                                            <span style={{padding: 5}}>{e.name}</span>
                                            <span style={{padding: 5}}>{e.description}</span>
                                            {/* <span style={{padding: 5}}>{e.image}</span> */}
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
                            <button onClick={()=> this.setState({openModel: !this.state.openModel})}>Toggle Model Panel</button>

                            {this.state.openModel &&
                                <div className="d-flex" style={{flexDirection:'column'}}>

                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <div>
                                            <input placeholder={"e.g BMW"} value={this.state.name} onChange={(e) => this._HandleModel(e.target.value, 'name')} />
                                            <input placeholder={"e.g description"} value={this.state.description} onChange={(e) => this._HandleModel(e.target.value, 'description')} />
                                            {/* <input placeholder={"e.g image url"} value={this.state.Model.image} onChange={(e) => this._HandleModel(e.target.value, 'image')} /> */}
                                            <Dropzone
                                                onDrop={this.handleUpload}
                                                onRemove={this.removeFile}
                                                uploadedFiles={files}
                                                additionalText="Files can't be edited once uploaded."
                                            />
                                        </div>

                                        <div>
                                            <span>Choose Car Type: </span>

                                            {Tags.length > 0 && 
                                                <div style={{width: 200, overflow:'auto'}}>
                                                    {this.props.Tags.map((e, index) => {

                                                        let style = {padding: 5, margin: 5, borderRadius: 10, border: '1px solid black'}
                                                        if(this.state.tags == e.id){
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
                                        </div>
                                    </div>

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