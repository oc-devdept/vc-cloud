import React, { Component } from "react";
import api from "Api";


import TagList from './components/TagList'

class index extends Component {

 
    state=({
        Tags: [],
        Value: '',
        loading: false
    })


    async componentDidMount() {
        try {
            const Tags =  await api.get(`/tags`)
            this.setState({Tags: Tags.data, loading: false})
        } catch (e){
            this.setState({Tags: [], loading: false})
        }    
    }

    _SaveTags = async() => {
        let Value = this.state.Value

        await this.setState({loading: true})

        await api.post(`/tags`, {
            name: Value
        })
        const Tags =  await api.get(`/tags`)
        await this.setState({Value: '', Tags: Tags.data, loading: false})
    }

    _HandleDeleteTags = async(e) => {

        await this.setState({loading: true})

        const result = await api.delete(`/tags/${e}`)

        if(result.data.count == 1){
            const Tags =  await api.get(`/tags`)
            await this.setState({ Tags: Tags.data, loading: false})
        } else {
            await this.setState({loading: false})
        }

    }


    _RenderTags = () => {
        return (
            this.state.Tags.map((e, index) => {
                return (
                    <div key={index} style={{padding: 5, margin: 5, borderRadius: 10, border :  '1px solid black'}}>
                        {e.name}
                        <span onClick={() => this._HandleDeleteTags(e.id)} style={{marginLeft: 20, cursor:'pointer', marginRight: 10}}>x</span>
                    </div>
                )
            })
        )
    }



    render() {
        
        return (


            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
                
                {!this.state.loading && 
                    <div>
                        {this.state.Tags.length > 0 && 
                            <div>
                                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                                    <button onClick={()=> console.log('Toggle Tag Value Box!')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10}}>+ ADD TAG VALUE</button>
                                </div>
                                <TagList
                                    title={'Car Tags'}
                                    tableData={this.state.Tags}
                                />
                            </div>
                        }

                        {this.state.Tags.length == 0 && 
                            <div>
                                No Tags Found
                            </div> 
                        }

                        {/* <div style={{marginTop: 10}}>
                            <input placeholder={"e.g Hatchback"} value={this.state.Value} onChange={(e) => this.setState({Value: e.target.value})} />
                            <button style={{}} onClick={this._SaveTags}>Create New Tag Value</button>
                        </div> */}
                    </div>
                }


                {this.state.loading && 
                    <div>
                        Loading ...
                    </div>
                }
            </div>
        );
    }
}

export default index;
