import React, { Component, useState } from "react";


import api from "Api";


import Dropzone from "Components/Dropzone";




export default class MakeOption extends Component {

    state=({
        openMake: false,
        name:'',
        description: '',
        start: new Date(),
        end: new Date(),
        files: []
    })

    _HandleMake = (e, value) => {
        this.setState({[value]: e})
    }

    _SaveMake = async() => {
        // const {files, start, end } = this.state;

        // var data = new FormData();
        // files.map(file => data.append(`upload`, file));
        // data.append("name", this.state.name);
        // data.append("description", this.state.description);
        // data.append("start", start);
        // data.append("end", end);


        // await this.props._SaveMake(data)
        await this.props._SaveMake(this.state)

        this.setState({
            description: "",
            name: "",
            start: new Date(),
            end: new Date(),
            files: []
        })
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

        const {MakeLoading, MakeSource, _HandleMakeOption} = this.props
        const { description, name, files} = this.state;

        return (
            <div style={{flex: 1, display:'flex', flexDirection:'row'}}>

                <div style={{}}>
                    Make Option
                    {MakeLoading && 
                        <div>
                            loading ...
                        </div>
                    }

                    {!MakeLoading && 
                        <div className="d-flex" style={{cursor:'pointer'}} >
                            {MakeSource.map((e, index) => {
                                return (
                                    <div onClick={() => _HandleMakeOption(e.name, e.id)} 
                                        style={{
                                            border: '1px solid black', 
                                            borderRadius: 5, padding: 2.5, marginRight: 5,
                                            display:'flex', flexDirection:'column'
                                        }} key={index}
                                    >
                                        {e.files.length > 0 && 
                                            <img
                                                src={e.files[0].url}
                                                height={100}
                                                width={100}
                                            />
                                        }
                                        
                                        {e.name}
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>

                <div>
                    <button onClick={()=> this.setState({openMake: !this.state.openMake})}>Toggle Make Panel</button>
                    {this.state.openMake &&
                        <div className="d-flex" style={{flexDirection:'column'}}>
                            <input type="name" placeholder={"e.g BMW"} value={name} onChange={(e) => this._HandleMake(e.target.value, 'name')} />
                            <input type="value" placeholder={"e.g description"} value={description} onChange={(e) => this._HandleMake(e.target.value, 'description')} />

         
                            {/* <input type="value2" placeholder={"e.g image url"} value={this.state.Make.image} onChange={(e) => this._HandleMake(e.target.value, 'image')} /> */}
                            <Dropzone
                                onDrop={this.handleUpload}
                                onRemove={this.removeFile}
                                uploadedFiles={files}
                                additionalText="Files can't be edited once uploaded."
                            />

                            <button style={{}} onClick={this._SaveMake}>Save Make</button>
                        </div>
                    }
                </div>

            </div>
        )
    }
}