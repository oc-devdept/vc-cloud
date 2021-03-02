import React, {Component} from "react";
import { connect } from "react-redux";
import 'grapesjs/dist/css/grapes.min.css';
import 'grapick/dist/grapick.min.css';

import grapesjs from 'grapesjs';
import grapesjsloryslider from 'grapesjs-lory-slider';
import grapesjstabs from 'grapesjs-tabs';
import grapesjscustomcode from 'grapesjs-custom-code';
import grapesjstouch from 'grapesjs-touch';
import grapesjsparserpostcss from 'grapesjs-parser-postcss';
import grapesjstooltip from 'grapesjs-tooltip';
import grapesjstuiimageeditor from 'grapesjs-tui-image-editor';
import grapesjstyped from 'grapesjs-typed';
import gjspresetwebpage from 'Components/grapesjs-preset-webpage';
import grapesjsgradient from 'grapesjs-style-gradient';
import gjsstyledbg from 'grapesjs-style-bg';
import toastr from 'toastr';

import grapesjslogo from 'Assets/img/grapejsStock/grapesjs-logo-cl.png';

import booknowBannerImage from "Assets/img/grapejsStock/booknowBanner.png"
import { updateCmspage } from 'Ducks/cms/cmspage';


class GrapeJSBook extends Component {


  uploadFileProcess = (e) => {
    console.log("files to uploader");
  }

  savePage = (html, css) => {
    this.props.updateCmspage({ id: "603b075920379844fc4e8722", html: html, css: css});
  }


  componentDidMount(){

    var lp = './img/';
    var plp = '//placehold.it/350x250/';
    var images = [
      lp+'team1.jpg', lp+'team2.jpg', lp+'team3.jpg', plp+'78c5d6/fff/image1.jpg', plp+'459ba8/fff/image2.jpg', plp+'79c267/fff/image3.jpg',
      plp+'c5d647/fff/image4.jpg', plp+'f28c33/fff/image5.jpg', plp+'e868a2/fff/image6.jpg', plp+'cc4360/fff/image7.jpg',
      lp+'work-desk.jpg', lp+'phone-app.png', lp+'bg-gr-v.png'
    ];
    let height = window.innerHeight + 90;

    var editor  = grapesjs.init({
      avoidInlineStyle: 1,
      height: height,
      container : '#gjs',
      fromElement: 1,
      showOffsets: 1,
      assetManager: {
        embedAsBase64: 1,
        assets: images
      },
      storageManager: false,
        // Avoid any default panel
        panels: { defaults: [] },           
        selectorManager: { componentFirst: true },
        styleManager: { clearProperties: 1 },
      plugins: [
        grapesjsloryslider,
          grapesjstabs,
          grapesjscustomcode,
          grapesjstouch,
          grapesjsparserpostcss,
          grapesjstooltip,
          grapesjstuiimageeditor,
          grapesjstyped,
          grapesjsgradient,
          gjsstyledbg,
        gjspresetwebpage,
      ],
      pluginsOpts: {
        'grapesjs-lory-slider': {
          sliderBlock: {
            category: 'Extra'
          }
        },
        'grapesjs-tabs': {
          tabsBlock: {
            category: 'Extra'
          }
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: [
                'Text row one',
                'Text row two',
                'Text row three',
              ],
            }
          }
        },
    
        'gjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
          },
          filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
          aviaryOpts: false,
          blocksBasicOpts: { flexGrid: 1 },
          
        },
      },
    });

    editor.I18n.addMessages({
      en: {
        styleManager: {
          properties: {
            'background-repeat': 'Repeat',
            'background-position': 'Position',
            'background-attachment': 'Attachment',
            'background-size': 'Size',
          }
        },
      }
    });

    var pn = editor.Panels;
    var modal = editor.Modal;
    var cmdm = editor.Commands;
    cmdm.add('canvas-clear', function() {
      if(confirm('Are you sure to clean the canvas?')) {
        var comps = editor.DomComponents.clear();
        setTimeout(function(){ localStorage.clear()}, 0)
      }
    });
    cmdm.add('set-device-desktop', {
      run: function(ed) { ed.setDevice('Desktop') },
      stop: function() {},
    });
    cmdm.add('set-device-tablet', {
      run: function(ed) { ed.setDevice('Tablet') },
      stop: function() {},
    });
    cmdm.add('set-device-mobile', {
      run: function(ed) { ed.setDevice('Mobile portrait') },
      stop: function() {},
    });



    // Add info command
    var mdlClass = 'gjs-mdl-dialog-sm';
    var infoContainer = document.getElementById('info-panel');
    cmdm.add('open-info', function() {
      var mdlDialog = document.querySelector('.gjs-mdl-dialog');
      mdlDialog.className += ' ' + mdlClass;
      infoContainer.style.display = 'block';
      modal.setTitle('About this demo');
      modal.setContent(infoContainer);
      modal.open();
      modal.getModel().once('change:open', function() {
        mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
      })
    });
    pn.addButton('options', {
      id: 'open-info',
      className: 'fa fa-question-circle',
      command: function() { editor.runCommand('open-info') },
      attributes: {
        'title': 'About',
        'data-tooltip-pos': 'bottom',
      },
    });


    // Simple warn notifier
    var origWarn = console.warn;
    toastr.options = {
      closeButton: true,
      preventDuplicates: true,
      showDuration: 250,
      hideDuration: 150
    };
    console.warn = function (msg) {
      if (msg.indexOf('[undefined]') == -1) {
        toastr.warning(msg);
      }
      origWarn(msg);
    };


    // Add and beautify tooltips
    [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
     ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
     ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
    .forEach(function(item) {
      pn.getButton('options', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
    });
    [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
    .forEach(function(item) {
      pn.getButton('views', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
    });
    var titles = document.querySelectorAll('*[title]');

    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      var title = el.getAttribute('title');
      title = title ? title.trim(): '';
      if(!title)
        break;
      el.setAttribute('data-tooltip', title);
      el.setAttribute('title', '');
    }

    // Show borders by default
    pn.getButton('options', 'sw-visibility').set('active', 1);
    var self = this;
    pn.addButton('options', {
      id: 'export',
      className: 'fa fa-save',
      // label: 'Exp',
      command: 'export-template',
      context: 'export-template',
      command(editor) {

          self.savePage(editor.getHtml(), editor.getCss());
      },
      attributes: {
        'title': 'Save Template',
        'data-tooltip-pos': 'bottom',
      },
    });


    // Store and load events
    //editor.on('storage:load', function(e) { console.log('Loaded ', e) });
    //editor.on('storage:store', function(e) { console.log('Stored ', e) });


    // Do stuff on load
    editor.on('load', function() {
      var $ = grapesjs.$;

      // Show logo with the version
      var logoCont = document.querySelector('.gjs-logo-cont');
      //document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
      //var logoPanel = document.querySelector('.gjs-pn-commands');
      //logoPanel.appendChild(logoCont);


      // Load and show settings and style manager
      var openTmBtn = pn.getButton('views', 'open-tm');
      openTmBtn && openTmBtn.set('active', 1);
      var openSm = pn.getButton('views', 'open-sm');
      openSm && openSm.set('active', 1);

      // Add Settings Sector
      var traitsSector = $('<div class="gjs-sm-sector no-select">'+
        '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
        '<div class="gjs-sm-properties" style="display: none;"></div></div>');
      var traitsProps = traitsSector.find('.gjs-sm-properties');
      traitsProps.append($('.gjs-trt-traits'));
      $('.gjs-sm-sectors').before(traitsSector);
      traitsSector.find('.gjs-sm-title').on('click', function(){
        var traitStyle = traitsProps.get(0).style;
        var hidden = traitStyle.display == 'none';
        if (hidden) {
          traitStyle.display = 'block';
        } else {
          traitStyle.display = 'none';
        }
      });
      editor.StyleManager.removeProperty('decorations', 'background');
      
      editor.StyleManager.addProperty('decorations', [{
        name: 'Background',
        property: 'background',
        type: 'bg',
      }])

      editor.StyleManager.addProperty('layout', 
        {
          name: "Flex",
          property: "flex",
          type: "integer",
          min: 1,
          defaults: "1"          
        }, { at: 2}
      )
      
      // Open block manager
      var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
      openBlocksBtn && openBlocksBtn.set('active', 1);

      var cssLink = document.createElement("link");

      cssLink.href = "/main.css";
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
       document.querySelector('iframe').contentWindow.document.head.appendChild(cssLink);
       document.querySelector('iframe').setAttribute("scrolling", "yes");
       document.querySelector('iframe').classList.add("gjs-dashed")
    });
}

  render(){
    return (
      <div>
      <h3 onClick={this.props.history.goBack}>Back to Pages</h3>
      <div className="gjs-logo-cont"></div>
        <div id="gjs">
        <section className="bookCarServicing-area">
          <div className="d-flex align-items-center text-center jumbotron jumbotron-fluid" style={{
            backgroundImage:  `url(${booknowBannerImage})` 
            ,minHeight:400 ,backgroundPosition:"center" ,zIndex:1 }}  >
             <div className="container" >
                <h1 className="text-white" style={{ fontWeight:400 , paddingBottom:10}} >
                   Book a Car Servicing Appointment with Us Today
                </h1>
             </div>
          </div>
          <div className="header-bar">
            <h6>Driver's Details</h6>
          </div>
          <div className="driver-details">
            <form className="driver-details-form" >
              <div className="form-row">
                <div className="form-group col-md-2">
                  <label for="inputTitle" > Title </label>
                  <select id="inputTitle" className="form-control">
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                    <option>Dr.</option>
                  </select>
                </div>
                <div className="form-group col-md-5">
                  <label for="inputFirstName" > First Name </label>
                  <input type="text" className="form-control"  id="firstName" required value placeholder="Enter your first name" />
                </div>
                <div className="form-group col-md-5">
                  <label for="inputLastName" >Last Name (Surname) </label>
                  <input type="text" className="form-control"  id="lastName" required value placeholder="Enter your last name" />
                </div>    
              </div>
              <div className="form-row"> 
                <div className="form-group col-md-6">
                  <label for="inputPhoneNumber" >Phone Number</label>
                  <input type="text" className="form-control"  id="phoneNumber" required value placeholder="Enter your phone number" />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputEmailAddess" >Email Address</label>
                  <input type="text" className="form-control"  id="emailAddress" required value placeholder="Enter your email address" />
                </div>
              </div>
            </form>
          </div>

          <div className="header-bar">
                <h6>Car Servicing Details</h6>
          </div>
          <div className="driver-details">
          <form className="driver-details-form" >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputCarModel" >Your Car Model</label>
                  <input type="email" className="form-control"  id="carModel" required value placeholder="Enter your car model" />
                </div>   
              </div>
              <div className="form-row"> 
                <div className="form-group col-md-6">
                  <label for="inputDate" >Date</label>
                  <br/>
                  <div className="DayPickerInput" >
                  <div className="DayPickerInput" >
                    <input type="email" className="form-control"  id="date" placeholder="03/02/2021" value />
                  </div>
                  </div>    
                </div>
                <div className="form-group col-md-6">
                  <label for="inputTimesort" >Timeslot</label>
                  <select id="inputTimesort" className="form-control">
                    <option>9am</option>
                    <option>10am</option>
                    <option>11am</option>
                    <option>12am</option>
                    <option>1pm</option>
                    <option>2pm</option>
                    <option>3pm</option>
                    <option>4pm</option>
                    <option>5pm</option>
                  </select>
                </div>
              </div>
              <div className="form-row last-row">
                <div className="form-group col-md-12">
                  <label for="inputDescription" >Description</label>
                  <textarea  className="form-control" id="description" row="5" placeholder="Enter your message"></textarea>
                </div>   
              </div>
              <div align="center">
                  <button type="submit" className=" btn btn-primary bookAppBtn" >Book Appointment</button>
              </div>

            </form>
           
          </div>
             
            </section>
        

          </div>
          
        
        <div id="blocks"></div>
      </div>
    )
  }

}

const mapStateToProps = ({ cmsState}) => {
 
  return {  };
}
export default connect(mapStateToProps, { updateCmspage })(GrapeJSBook);
