import React, { Component } from "react";

import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 

import Products from './Products/index'
import Configure from './Configure/index'
import Dashboard from './Dashboard/index'


class Inventory extends Component {

    state=({
      
    })

  
    render() {

      return (
        <div className="saas-dashboard">


          <Helmet>
            <title>Everyday | Inventory</title>
            <meta name="description" content="Everyday Informational Reports" />
          </Helmet>

          <PageTitleBar
            title={"Inventory"}
            // actionGroup={{
            //   add: { onClick: console.log('add product') },
            //   mid: { label: "Add a new product", onClick: console.log('Add a new product') },
            //   more: [{ label: "Refresh List", onClick: console.log('Refresh List') }]
            // }}
          />
  
        
          <Tabs>
              <div>
                <Tab><button>Dashboard</button></Tab>
                <Tab><button>Products</button></Tab>
                <Tab><button>Configure</button></Tab>
              </div>

          
              <Panel>
                <Dashboard/>
              </Panel>

              <Panel>
                <Products/>
              </Panel>

              <Panel>
                <Configure/>
              </Panel>
          </Tabs>


        </div>
      );
    }
  
}

export default Inventory;
