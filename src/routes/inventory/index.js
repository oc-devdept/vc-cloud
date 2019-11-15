import React, { Component } from "react";

import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// page req
import { Route, Switch, Redirect } from "react-router-dom";
import * as async from "./AsyncRoutes";

import Demo from './demo'
import CreateProduct from './createProduct'
import Settings from './settings'

class Inventory extends Component {

    state=({
      page: ['main', 'create product', 'settings'],
      index: 0
    })

    _HandlePage(index) {
      this.setState({index: index})
    }

    _SwitchRenderPage = () => {
      switch(this.state.index){
        case 0:
          return <Demo/>
        case 1:
          return <CreateProduct/>
        case 2:
          return <Settings/>
        default:return
      }
    }

    render() {

      return (
        <div className="saas-dashboard">


          <Helmet>
            <title>Everyday | Inventory</title>
            <meta name="description" content="Everyday Informational Reports" />
          </Helmet>

          <PageTitleBar title="Inventory" />

       
          <div className="d-flex" style={{marginBottom: 10}}>
            {this.state.page.map((e, index) =>{
              return (
                <div key={index} onClick={() => this._HandlePage(index)} style={{margin: 5}}>
                  {e}
                </div>
              )
            })}
          </div>


          {this._SwitchRenderPage()}

        </div>
      );
    }
  
}

export default Inventory;
