import React, { Component } from "react";
import { connect } from "react-redux";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import DialogRoot from "Components/Dialog/DialogRoot";
import FeaturedSectionForm from "./components/FeaturedSectionForm";
import FeaturedCarForm from "./components/FeaturedCarForm";
import FeaturedList from './components/FeaturedList';

import { getAllProducts } from "Ducks/inventory";

class cms_featured extends Component {
    constructor(props){
        super(props); 
        this.state = {
            toggle: false,
            element: null
        }               
    }

    newSection = () => {
        this.setState({
            toggle: true,
            element: "FeaturedSection"
        })
    }

    newCar = (id) => {
        this.setState({
            toggle: true,
            element: "FeaturedCar",
            elementId: id
        })
    }

    edit(id){

    }

    componentDidMount(){        
        this.props.getAllProducts();
    }

    renderDialog =() =>{
        if(this.state.toggle){
            switch(this.state.element){
                case "FeaturedSection":
                    return (
                        <DialogRoot show={this.state.toggle}
                        handleHide={ this.restartToggle}
                        size={"md"}>
                            <FeaturedSectionForm title="New Section" closeForm={this.restartToggle} />
                        </DialogRoot>
                    )
                case "FeaturedCar":
                    return (
                        <DialogRoot show={this.state.toggle}
                        handleHide={ this.restartToggle}
                        size={"md"}>
                            <FeaturedCarForm title="New Car" closeForm={this.restartToggle} products={this.props.productList} parentId={this.state.elementId} />
                        </DialogRoot>
                    )
                default:
                    return null;
            }
        }
    }

    restartToggle = () => {
        this.setState({
            toggle: false,
            element: null
        })
    }


    render(){
        return (
            <React.Fragment>
                <Helmet title="Featured Cars" metaDesc="Featured Cars" />
                <PageTitleBar
                title="Featured Cars list"
                actionGroup={{
                    add: { onClick: this.newSection }                    
                }}
                />
                <FeaturedList  newCar={this.newCar} />
                {console.log(this.props)}
                {this.renderDialog() }
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ inventoryState }) => {    
    const { productList } = inventoryState;
    return { productList };
}
export default connect(mapStateToProps, { getAllProducts } )(cms_featured)