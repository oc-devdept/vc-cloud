import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

const Option = [true, false]

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = (selectOne, name) => {
    let Reject = true
    if(selectOne == null || selectOne == false){Reject = false}
    if(name == ""){Reject = false}
    return Reject
}

class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Category = {
            id: '',
            selectOne: null,
            name: ''
        }
        
        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW  EQUIPMENT"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT  EQUIPMENT"
                Category = {
                    id: this.props.Data.id,
                    selectOne: this.props.Data.selectOne,
                    name: this.props.Data.name
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE  EQUIPMENT"
                Category = {
                    id: this.props.Data.id,
                    selectOne: this.props.Data.selectOne,
                    name: this.props.Data.name
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }


        this.state=({
            Category: Category,
            Title: Title,
            Button: Button,
        })
    }



    _SaveProductOption = async() => {
        const {selectOne, name} = this.state.Category
        const result = validateForm(selectOne, name)
        if(result) {
            const {selectOne, name} = this.state.Category
            await api.post(`/productoptioncategories`, 
                {
                    name: name,
                    selectOne: selectOne
                }
            )
            await this.props._CreateProductCategoryDone()
            await this.props._RestartToggle()

            NotificationManager.success('Product specification item saved successfully');
        } else {
            NotificationManager.error('Missing input in your form, please fill up the necessary boxes.');
        }
    }

    _EditProductOption = async() => {
        const {selectOne, name} = this.state.Category
        const result = validateForm(selectOne, name)
        if(result) {

            await api.post(`/productoptioncategories/editProductOption`, {data: this.state.Category})
            await this.props._CreateProductCategoryDone()
            await this.props._RestartToggle()
            NotificationManager.success('Product specification item saved successfully');

        } else {
            NotificationManager.error('Missing input in your form, please fill up the necessary boxes.');
        }
    }

    _DeleteProductOption = async() => {
        const {id} = this.state.Category
        await api.delete(`/productoptioncategories/${id}`)

        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
    }

    _ToggleCategorySelectOne = (item) => {
        let Category = {...this.state.Category}
        Category.selectOne = item
        this.setState({Category: Category})
    }

   
    _HandleProduct = (e, element) => {
        let Category = {...this.state.Category}
        Category[element] = e
        this.setState({Category: Category})
    }

    render() {

        let Body = null

        switch(this.props.Action){
            case "Delete":
             
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>

                        <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                            <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<br/><span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        </div>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR EQUIPMENT</span>
                                <span>{this.state.Category.name}</span>
                            </div> */}

                            <Text
                                divStyle={{width: '100%'}}
                                title="CAR EQUIPMENT"
                                value={this.state.Category.name}
                            />

                            <div style={{display:'flex', flexDirection:"column", width: '100%'}}>
                                {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE</span> */}
                                <StaticName
                                    title={"CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE"}
                                />
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    {Option.map((e, item) => {

                                        const selectOne = this.state.Category.selectOne

                                        let style = {margin: 5, padding: 5, border: '1px solid black', 
                                        width: 80, borderRadius: 8, display: 'flex', 
                                        justifyContent:"center"}
                                        
                                        if(selectOne == e) {
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
                )

                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR EQUIPMENT</span>
                                <input type="text" placeholder={"Enter a new product option category"} value={this.state.Category.name} onChange={(e) =>{
                                    let Category = {...this.state.Category}
                                    Category.name = e.target.value
                                    this.setState({Category: Category})
                                }}/>
                            </div> */}

                            <Input
                                divStyle={{width: '100%', marginRight: 30}}
                                title="CAR EQUIPMENT"
                                placeholder="Enter a new product option category"
                                value={this.state.Category.name}
                                element={'name'}
                                _HandleProduct={this._HandleProduct}
                            />  

                            <div style={{display:'flex', flexDirection:"column", width: '100%'}}>
                                {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE</span> */}
                                <StaticName
                                    title={"CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE"}
                                />
                                
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    {Option.map((e, item) => {

                                        const selectOne = this.state.Category.selectOne

                                        let style = {margin: 5, padding: 5, border: '1px solid black', 
                                        width: 80, borderRadius: 8, display: 'flex', 
                                        justifyContent:"center"}
                                        
                                        if(selectOne == e) {
                                            style = {
                                                margin: 5, padding: 5, border: '1px solid black', 
                                                width: 80, borderRadius: 8, display: 'flex', 
                                                justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                            }
                                        }
                                        
                                        return (
                                            <div 
                                                key={item} 
                                                onClick={() => this._ToggleCategorySelectOne(e)} 
                                                style={style}>{`${e}`}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                        
                    </div>
                )
                break
            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                        
                            <Input
                                divStyle={{width: '100%', marginRight: 30}}
                                title="CAR EQUIPMENT"
                                placeholder="Enter a equipment category"
                                value={this.state.Category.name}
                                element={'name'}
                                _HandleProduct={this._HandleProduct}
                            />  

                            <div style={{display:'flex', flexDirection:"column", width: '100%'}}>
                                {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE</span> */}
                                <StaticName
                                    title={"CAR EQUIPMENT HAS MORE THAN ONE ITEM TYPE"}
                                />

                                <div style={{display:'flex', flexDirection:'row'}}>
                                    {Option.map((e, item) => {

                                        const selectOne = this.state.Category.selectOne

                                        let style = {margin: 5, padding: 5, border: '1px solid black', 
                                        width: 80, borderRadius: 8, display: 'flex', 
                                        justifyContent:"center"}
                                        
                                        if(selectOne == e) {
                                            style = {
                                                margin: 5, padding: 5, border: '1px solid black', 
                                                width: 80, borderRadius: 8, display: 'flex', 
                                                justifyContent:"center", color:'white', backgroundColor: 'rgba(0,0,0,0.8)'
                                            }
                                        }
                                        
                                        return (
                                            <div 
                                                key={item} 
                                                onClick={() => this._ToggleCategorySelectOne(e)} 
                                                style={style}>{`${e}`}
                                            </div>
                                        )
                                    })}
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
                        {/* <button onClick={this._SaveProductOption}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._SaveProductOption}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {/* <button onClick={this._EditProductOption}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._EditProductOption}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
                    </div>
                )
                break
            default:
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {/* <button onClick={this._DeleteProductOption}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._DeleteProductOption}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
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

