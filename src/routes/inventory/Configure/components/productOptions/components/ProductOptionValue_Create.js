import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";
import Image from 'Components/Image'

const Option = [true, false]


class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Category = {
            id: '',
            selectOne: '',
            name: '',
        }

        let Item = {
            id: '',
            name: '',
            editable: false,
            isDefault: false,
            image: [],
            price: '',
        }
     
        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW CAR PRODUCT OPTION ITEM"
                Button = "CREATE"
                Category = {
                    id: this.props.Data.id,
                    selectOne: this.props.Data.selectOne,
                    name: this.props.Data.name
                }
                break
            case "Edit":
                Title = "EDIT CAR PRODUCT OPTION ITEM"
                Button = "SAVE CHANGES"
                Item = {
                    id: this.props.Data.id,
                    name: this.props.Data.name,
                    editable: this.props.Data.editable,
                    image: this.props.Data.image,
                    isDefault: this.props.Data.isDefault,
                    price: this.props.Data.price,
                }
                break
            case "Delete":
                Title = "DELETE CAR PRODUCT OPTION"
                Button = "CONFIRM DELETE"
                Item = {
                    id: this.props.Data.id,
                    name: this.props.Data.name,
                    editable: this.props.Data.editable,
                    image: this.props.Data.image,
                    isDefault: this.props.Data.isDefault,
                    price: this.props.Data.price,
                }
                break
            default:break
        }


        this.state=({
            Category: Category,
            Title: Title,
            Button: Button,
            Item: Item,
            files:[]
        })
    }



    _SaveProductOption = async() => {

        const ProductOption = this.state.Item
        const productOptionCategoryId = this.state.Category.id

        var data = new FormData();
        const files = this.state.files

        files.map(file => data.append(`upload`, file));
        data.append("name", ProductOption.name);
        data.append("editable", ProductOption.editable);
        data.append("isDefault", ProductOption.isDefault);
        data.append("price", ProductOption.price);
        data.append("productOptionCategoryId", productOptionCategoryId);

        await api.post("/productoptions/new", data)
        
        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
    }

    _EditProductOptionValue = async() => {
      
        // await api.post(`/productoptioncategories/editProductOption`, {data: this.state.Category})
        // await this.props._CreateProductCategoryDone()
        // await this.props._RestartToggle()

        const ProductOption = this.state.Item

        var data = new FormData();
        const files = this.state.files

        files.map(file => data.append(`upload`, file));
        data.append("name", ProductOption.name);
        data.append("editable", ProductOption.editable);
        data.append("isDefault", ProductOption.isDefault);
        data.append("price", ProductOption.price);
        data.append("id", ProductOption.id);

        await api.post("/productoptions/editProductOptionValue", data)


        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
    }

    _DeleteProductOptionValue = async() => {

        const {id} = this.state.Item
        await api.delete(`/productoptions/${id}`)

        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
    }

    _ToggleItemEditable = (item) => {
        let Item = {...this.state.Item}
        Item.editable = item
        this.setState({Item: Item})
    }
   
    _ToggleItemIsDefault = (item) => {
        let Item = {...this.state.Item}
        Item.isDefault = item
        this.setState({Item: Item})
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

        let Body = null

        switch(this.props.Action){
            case "Delete":

                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>

                        <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                            <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                            <span>{this.state.Category.name}</span>
                        </div>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>CAR PRODUCT OPTION ITEM</span>
                                <span>{this.state.Item.name}</span>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>PRICE</span>
                                <span>{this.state.Item.price}</span>
                            </div>

                        </div>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            {this.state.Item.image.length > 0 &&
                                <div style={{display:'flex', flexDirection:"column", flex: 1}}>

                                    <span>IMAGE UPLOAD</span>

                                    <Image
                                        imageSource={this.state.Item.image}
                                        single={true}
                                    />

                                </div>
                            }
                            

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                
                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>ITEM EDITABLE</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {

                                            const editable = this.state.Item.editable

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(editable == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }

                                            return (
                                                <div 
                                                    key={item} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>


                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>ITEM DEFAULT SET</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {
                                            const isDefault = this.state.Item.isDefault

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(isDefault == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }
                                                                        
                                            return (
                                                <div 
                                                    key={item} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                            })}
                                    </div>
                                </div>



                            </div>


                        </div>

                    </div>
                )
                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>CAR PRODUCT OPTION ITEM</span>
                                <input type="text" placeholder={"Enter a new Car Product Option Item (e.g Audtio Model 123)"} value={this.state.Item.name} onChange={(e) =>{
                                    let Item = {...this.state.Item}
                                    Item.name = e.target.value
                                    this.setState({Item: Item})
                                }}/>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>PRICE</span>
                                <input type="text" placeholder={"Enter the price here"} value={this.state.Item.price} onChange={(e) =>{
                                    let Item = {...this.state.Item}
                                    Item.price = e.target.value
                                    this.setState({Item: Item})
                                }}/>
                            </div>

                        </div>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>IMAGE UPLOAD</span>
                                {this.state.Item.image.length > 0 &&
                                    <Image
                                        imageSource={this.state.Item.image}
                                        single={true}
                                    />
                                }
                                
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    onRemove={this.removeFile}
                                    uploadedFiles={this.state.files}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                
                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>IS THE ITEM EDITABLE</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {

                                            const editable = this.state.Item.editable

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(editable == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }

                                            return (
                                                <div 
                                                    key={item} 
                                                    onClick={() => this._ToggleItemEditable(e)} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>


                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>IS THE ITEM DEFAULT SET</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {
                                            const isDefault = this.state.Item.isDefault

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(isDefault == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }
                                            
                                            
                                            return (
                                                <div 
                                                    key={item} 
                                                    onClick={() => this._ToggleItemIsDefault(e)} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                            })}
                                    </div>
                                </div>



                            </div>


                        </div>

                    </div>
                )
                break
            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                            <span>CREATE NEW ITEM INTO PRODUCT OPTION</span>
                            <span>{this.state.Category.name}</span>                                
                        </div>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>CAR PRODUCT OPTION ITEM</span>
                                <input type="text" placeholder={"Enter a new Car Product Option Item (e.g Audtio Model 123)"} value={this.state.Item.name} onChange={(e) =>{
                                    let Item = {...this.state.Item}
                                    Item.name = e.target.value
                                    this.setState({Item: Item})
                                }}/>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                <span>PRICE</span>
                                <input type="text" placeholder={"Enter the price here"} value={this.state.Item.price} onChange={(e) =>{
                                    let Item = {...this.state.Item}
                                    Item.price = e.target.value
                                    this.setState({Item: Item})
                                }}/>
                            </div>

                        </div>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>IMAGE UPLOAD</span>
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    onRemove={this.removeFile}
                                    uploadedFiles={this.state.files}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                
                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>IS THE ITEM EDITABLE</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {

                                            const editable = this.state.Item.editable

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(editable == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }

                                            return (
                                                <div 
                                                    key={item} 
                                                    onClick={() => this._ToggleItemEditable(e)} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>


                                <div style={{display:'flex', flexDirection:'column', marginTop: 10, flex: 1}}>
                                    <span>IS THE ITEM DEFAULT SET</span>
                                    <div style={{display:'flex', flexDirection:'row', marginTop: 10}}>
                                        {Option.map((e, item) => {
                                            const isDefault = this.state.Item.isDefault

                                            let style = {margin: 5, padding: 5, border: '1px solid black', 
                                            width: 80, borderRadius: 8, display: 'flex', 
                                            justifyContent:"center"}

                                            if(isDefault == e) {
                                                style = {
                                                    margin: 5, padding: 5, border: '1px solid black', 
                                                    width: 80, borderRadius: 8, display: 'flex', 
                                                    justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                                }
                                            }
                                            
                                            
                                            return (
                                                <div 
                                                    key={item} 
                                                    onClick={() => this._ToggleItemIsDefault(e)} 
                                                    style={style}>{`${e}`}
                                                </div>
                                            )
                                            })}
                                    </div>
                                </div>



                            </div>


                        </div>

                       
                                
    
                    </div>
                )
                break
        }


        let SaveButton = null
        switch(this.props.Action){
            case "Create":
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._SaveProductOption}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditProductOptionValue}>{this.state.Button}</button>
                    </div>
                )
                break
            default:
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._DeleteProductOptionValue}>{this.state.Button}</button>
                    </div>
                )
                break
        }

        return (
            <div className="d-flex" style={{flexDirection:'column', flex: 1}}>
                
                <div className="d-flex justify-content-center">
                    <div style={{flex:1}} className="d-flex justify-content-center">
                        <span style={{textAlign:'center'}}>{this.state.Title}</span>
                    </div>
                    <Cancel fontSize="large" onClick={this.props._RestartToggle} />
                </div>

                {Body}
            
                {SaveButton}

            </div>
        )
    }
  
}


export default index;

