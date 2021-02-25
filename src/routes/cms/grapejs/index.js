import React, {Component} from "react";
import 'grapesjs/dist/css/grapes.min.css';
// import {Helmet} from "react-helmet";

// import 'grapesjs/dist/css/grapes.min.css';

import '../../../assets/grapejs-css/App.css';
// import '../../../assets/grapejs-css/App.css';
import '../../../assets/grapejs-css/demos.css';
import '../../../assets/grapejs-css/grapesjs-plugin-filestack.css';
import '../../../assets/grapejs-css/grapesjs-preset-webpage.min.css';
import '../../../assets/grapejs-css/grapick.min.css';
import '../../../assets/grapejs-css/toastr.min.css';
import '../../../assets/grapejs-css/tooltip.css';

import grapesjs from 'grapesjs';
import grapesjsloryslider from 'grapesjs-lory-slider';
import grapesjstabs from 'grapesjs-tabs';
import grapesjscustomcode from 'grapesjs-custom-code';
import grapesjstouch from 'grapesjs-touch';
import grapesjsparserpostcss from 'grapesjs-parser-postcss';
import grapesjstooltip from 'grapesjs-tooltip';
import grapesjstuiimageeditor from 'grapesjs-tui-image-editor';
import grapesjstyped from 'grapesjs-typed';
import grapesjsstylebg from 'grapesjs-style-bg';
import gjspresetwebpage from 'grapesjs-preset-webpage';
import toastr from 'toastr';

import grapesjslogo from '../../../assets/img/grapejsStock/grapesjs-logo-cl.png';
import phoneapp from '../../../assets/img/grapejsStock/phone-app.png';
import team1 from '../../../assets/img/grapejsStock/team1.jpg';
import team2 from '../../../assets/img/grapejsStock/team2.jpg';
import team3 from '../../../assets/img/grapejsStock/team3.jpg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class GrapeJSMainList extends Component {

  componentDidMount(){

        console.log(this.props.location.pathname)
}

  render(){
    return (
      <div>

          <div>
            <Link to={`${this.props.location.pathname}/terms-n-conditions`}>
            <h2>
              Terms & Conditions Builder
            </h2>
            </Link>
          </div>


          <div>
            <Link to={`${this.props.location.pathname}/about-us`}>
            <h2>
              About Us Builder
            </h2>
            </Link>
          </div>

      </div>
    )
  }

}

export default GrapeJSMainList;