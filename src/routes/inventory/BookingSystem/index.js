import React, { Component } from "react";
import api from "Api";

import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import ProfileTabs from "Components/Layout/ProfileTabs";
import DashboardCard from "./components/DashboardCard"

import Bookings from './components/Bookings'
import TestDrive from './components/TestDrive'
import Maintenance from './components/Maintenance'
import Rental from './components/Rental'



class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
  }


  
  render() {
            
    return (    
        <div>
            <React.Fragment>

              <Helmet>
                <title>Everyday | All Bookings</title>
                <meta name="bookings" content="Booking System Management" />
              </Helmet>

              <PageTitleBar
                title={"All Bookings"}
              />

              <div className="row">
                <div className="col-md-3">
                  <DashboardCard/>
                </div>

                <div className="col-md-9">
                  <ProfileTabs loading={false}>
                   
                    <div label="All Bookings">
                        <Bookings/>
                    </div>

                    <div label="Test Drive">
                        <TestDrive/>
                    </div>

                    <div label="Maintenance">
                      <Maintenance/>
                    </div>

                    <div label="Rental">
                      <Rental/>
                    </div>

                  </ProfileTabs>
                </div>
              </div>

            </React.Fragment>
        </div>
    );
  }
}

export default Index;
