import React, {Component} from "react";
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
import gjspresetwebpage from 'grapesjs-preset-webpage';
import grapesjsgradient from 'grapesjs-style-gradient';
import gjsstyledbg from 'grapesjs-style-bg';
import toastr from 'toastr';

import grapesjslogo from 'Assets/img/grapejsStock/grapesjs-logo-cl.png';

import aboutUsBgImage from "Assets/img/grapejsStock/about-us-banner.jpg"


class GrapeJSAbout extends Component {

  saveHTML = () => {
    // alert("PING")
    var test = document.querySelector("#gjs");
    console.log(test);
  }

  uploadFileProcess = (e) => {
    console.log("files to uploader");
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

        

          </div>
          
        
        <div id="blocks"></div>
      </div>
    )
  }

}

export default GrapeJSAbout;
/*
<section className="about-us-area">
              <div className="about-us-banner" style={{backgroundImage:  `url(${aboutUsBgImage})` }} />
              <div className="about-history" align="center">
                <h2>Since 2009</h2>
                <div className="row">
                  <div className="column col-md-4">
                    <p>
                      <span className="amount">10, 000+</span>
                      <br />
                      <span className="type">NEW CARS BUILT</span>
                    </p>
                  </div>
                  <div className="column col-md-4">
                    <p>
                      <span className="amount">6,000+</span>
                      <br />
                      <span className="type">PRE-OWNED CARS SOLD</span>
                    </p>
                  </div>
                  <div className="column col-md-4">
                    <p>
                      <span className="amount">20,000+</span>
                      <br />
                      <span className="type">CARS SERVICED</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="our-story">
                <div className="row">
                  <div className="column col-md-4">
                    <h2>Our Story</h2>
                  </div>
                  <div className="column col-md-6">
                    <h5>New Venture</h5>
                    <p>
                    As a subsidiary that expanded from BW Automobiles in 2009, Venture Cars was established to meet the rise in demand for brand new cars. Aptly named Venture Cars, the company was set up with the sole focus on new Japanese mass-market cars.  The genesis for this new venture was the observable consumer trends in the car market towards Japanese cars and parallel importers (PI). 
                    </p>
                    <p>
                    At Venture Cars, we take pride in serving our customers to the best of our abilities and we have a solid track record. We believe in being transparent and we work hard to meet the strict guidelines that are set up by Singapore Vehicle Traders Association (SVTA).
                    </p>
                  </div>
                </div>
              </div>
            </section>

*/