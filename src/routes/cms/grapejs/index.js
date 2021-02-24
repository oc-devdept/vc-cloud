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


class GrapeJS extends Component {

  saveHTML = () => {
    // alert("PING")
    var test = document.querySelector("#gjs");
    console.log(test);
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

    const editor = grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        container: '#gjs',
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: height+'px',
        width: 'auto',
        // Disable the storage manager for the moment
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
          grapesjsstylebg,
          gjspresetwebpage,
          toastr
        ],
        pluginOpts: {
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
              console.log("ASDASDS", editor)

              return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
            },
            filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
            aviaryOpts: false,
            blocksBasicOpts: { flexGrid: 1 },
            customStyleManager: [{
              name: 'General',
              buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
              properties:[{
                  name: 'Alignment',
                  property: 'float',
                  type: 'radio',
                  defaults: 'none',
                  list: [
                    { value: 'none', className: 'fa fa-times'},
                    { value: 'left', className: 'fa fa-align-left'},
                    { value: 'right', className: 'fa fa-align-right'}
                  ],
                },{ property: 'position', type: 'select'}
              ],
            },{
                name: 'Dimension',
                open: false,
                buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                properties: [{
                  id: 'flex-width',
                  type: 'integer',
                  name: 'Width',
                  units: ['px', '%'],
                  property: 'flex-basis',
                  toRequire: 1,
                },{
                  property: 'margin',
                  properties:[
                    { name: 'Top', property: 'margin-top'},
                    { name: 'Right', property: 'margin-right'},
                    { name: 'Bottom', property: 'margin-bottom'},
                    { name: 'Left', property: 'margin-left'}
                  ],
                },{
                  property  : 'padding',
                  properties:[
                    { name: 'Top', property: 'padding-top'},
                    { name: 'Right', property: 'padding-right'},
                    { name: 'Bottom', property: 'padding-bottom'},
                    { name: 'Left', property: 'padding-left'}
                  ],
                }],
              },{
                name: 'Typography',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
                properties:[
                  { name: 'Font', property: 'font-family'},
                  { name: 'Weight', property: 'font-weight'},
                  { name:  'Font color', property: 'color'},
                  {
                    property: 'text-align',
                    type: 'radio',
                    defaults: 'left',
                    list: [
                      { value : 'left',  name : 'Left',    className: 'fa fa-align-left'},
                      { value : 'center',  name : 'Center',  className: 'fa fa-align-center' },
                      { value : 'right',   name : 'Right',   className: 'fa fa-align-right'},
                      { value : 'justify', name : 'Justify',   className: 'fa fa-align-justify'}
                    ],
                  },{
                    property: 'text-decoration',
                    type: 'radio',
                    defaults: 'none',
                    list: [
                      { value: 'none', name: 'None', className: 'fa fa-times'},
                      { value: 'underline', name: 'underline', className: 'fa fa-underline' },
                      { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
                    ],
                  },{
                    property: 'text-shadow',
                    properties: [
                      { name: 'X position', property: 'text-shadow-h'},
                      { name: 'Y position', property: 'text-shadow-v'},
                      { name: 'Blur', property: 'text-shadow-blur'},
                      { name: 'Color', property: 'text-shadow-color'}
                    ],
                }],
              },{
                name: 'Decorations',
                open: false,
                buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background-bg'],
                properties: [{
                  type: 'slider',
                  property: 'opacity',
                  defaults: 1,
                  step: 0.01,
                  max: 1,
                  min:0,
                },{
                  property: 'border-radius',
                  properties  : [
                    { name: 'Top', property: 'border-top-left-radius'},
                    { name: 'Right', property: 'border-top-right-radius'},
                    { name: 'Bottom', property: 'border-bottom-left-radius'},
                    { name: 'Left', property: 'border-bottom-right-radius'}
                  ],
                },{
                  property: 'box-shadow',
                  properties: [
                    { name: 'X position', property: 'box-shadow-h'},
                    { name: 'Y position', property: 'box-shadow-v'},
                    { name: 'Blur', property: 'box-shadow-blur'},
                    { name: 'Spread', property: 'box-shadow-spread'},
                    { name: 'Color', property: 'box-shadow-color'},
                    { name: 'Shadow type', property: 'box-shadow-type'}
                  ],
                },{
                  id: 'background-bg',
                  property: 'background',
                  type: 'bg',
                },],
              },{
                name: 'Extra',
                open: false,
                buildProps: ['transition', 'perspective', 'transform'],
                properties: [{
                  property: 'transition',
                  properties:[
                    { name: 'Property', property: 'transition-property'},
                    { name: 'Duration', property: 'transition-duration'},
                    { name: 'Easing', property: 'transition-timing-function'}
                  ],
                },{
                  property: 'transform',
                  properties:[
                    { name: 'Rotate X', property: 'transform-rotate-x'},
                    { name: 'Rotate Y', property: 'transform-rotate-y'},
                    { name: 'Rotate Z', property: 'transform-rotate-z'},
                    { name: 'Scale X', property: 'transform-scale-x'},
                    { name: 'Scale Y', property: 'transform-scale-y'},
                    { name: 'Scale Z', property: 'transform-scale-z'}
                  ],
                }]
              },{
                name: 'Flex',
                open: false,
                properties: [{
                  name: 'Flex Container',
                  property: 'display',
                  type: 'select',
                  defaults: 'block',
                  list: [
                    { value: 'block', name: 'Disable'},
                    { value: 'flex', name: 'Enable'}
                  ],
                },{
                  name: 'Flex Parent',
                  property: 'label-parent-flex',
                  type: 'integer',
                },{
                  name      : 'Direction',
                  property  : 'flex-direction',
                  type    : 'radio',
                  defaults  : 'row',
                  list    : [{
                            value   : 'row',
                            name    : 'Row',
                            className : 'icons-flex icon-dir-row',
                            title   : 'Row',
                          },{
                            value   : 'row-reverse',
                            name    : 'Row reverse',
                            className : 'icons-flex icon-dir-row-rev',
                            title   : 'Row reverse',
                          },{
                            value   : 'column',
                            name    : 'Column',
                            title   : 'Column',
                            className : 'icons-flex icon-dir-col',
                          },{
                            value   : 'column-reverse',
                            name    : 'Column reverse',
                            title   : 'Column reverse',
                            className : 'icons-flex icon-dir-col-rev',
                          }],
                },{
                  name      : 'Justify',
                  property  : 'justify-content',
                  type    : 'radio',
                  defaults  : 'flex-start',
                  list    : [{
                            value   : 'flex-start',
                            className : 'icons-flex icon-just-start',
                            title   : 'Start',
                          },{
                            value   : 'flex-end',
                            title    : 'End',
                            className : 'icons-flex icon-just-end',
                          },{
                            value   : 'space-between',
                            title    : 'Space between',
                            className : 'icons-flex icon-just-sp-bet',
                          },{
                            value   : 'space-around',
                            title    : 'Space around',
                            className : 'icons-flex icon-just-sp-ar',
                          },{
                            value   : 'center',
                            title    : 'Center',
                            className : 'icons-flex icon-just-sp-cent',
                          }],
                },{
                  name      : 'Align',
                  property  : 'align-items',
                  type    : 'radio',
                  defaults  : 'center',
                  list    : [{
                            value   : 'flex-start',
                            title    : 'Start',
                            className : 'icons-flex icon-al-start',
                          },{
                            value   : 'flex-end',
                            title    : 'End',
                            className : 'icons-flex icon-al-end',
                          },{
                            value   : 'stretch',
                            title    : 'Stretch',
                            className : 'icons-flex icon-al-str',
                          },{
                            value   : 'center',
                            title    : 'Center',
                            className : 'icons-flex icon-al-center',
                          }],
                },{
                  name: 'Flex Children',
                  property: 'label-parent-flex',
                  type: 'integer',
                },{
                  name:     'Order',
                  property:   'order',
                  type:     'integer',
                  defaults :  0,
                  min: 0
                },{
                  name    : 'Flex',
                  property  : 'flex',
                  type    : 'composite',
                  properties  : [{
                          name:     'Grow',
                          property:   'flex-grow',
                          type:     'integer',
                          defaults :  0,
                          min: 0
                        },{
                          name:     'Shrink',
                          property:   'flex-shrink',
                          type:     'integer',
                          defaults :  0,
                          min: 0
                        },{
                          name:     'Basis',
                          property:   'flex-basis',
                          type:     'integer',
                          units:    ['px','%',''],
                          unit: '',
                          defaults :  'auto',
                        }],
                },{
                  name      : 'Align',
                  property  : 'align-self',
                  type      : 'radio',
                  defaults  : 'auto',
                  list    : [{
                            value   : 'auto',
                            name    : 'Auto',
                          },{
                            value   : 'flex-start',
                            title    : 'Start',
                            className : 'icons-flex icon-al-start',
                          },{
                            value   : 'flex-end',
                            title    : 'End',
                            className : 'icons-flex icon-al-end',
                          },{
                            value   : 'stretch',
                            title    : 'Stretch',
                            className : 'icons-flex icon-al-str',
                          },{
                            value   : 'center',
                            title    : 'Center',
                            className : 'icons-flex icon-al-center',
                          }],
                        }]
                      }
                    ],
                  }
                },
        blockManager: {
            appendTo: '#blocks',
            blocks: [                  
            ]
          }
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
        if(window.confirm('Areeee you sure to clean the canvas?')) {
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

      // pn.addButton('options', {
      //   id: 'show-json',
      //   className: 'btn-show-json',
      //   label: 'Save Template',
      //   context: 'show-json',
      //   command(editor) {
      //     // editor.Modal.setTitle('Components JSON')
      //     //   .setContent(`<textarea style="width:100%; height: 250px;">
      //     //     ${JSON.stringify(editor.getComponents())}
      //     //   </textarea>`)
      //     //   .open();

      //       // alert("asdasdsad")
      //       alert("Template Saved!")
      //       console.log(JSON.stringify(editor.getComponents()))
      //   },
      // });

      pn.addButton('options', {
        id: 'export',
        className: 'fa fa-save',
        // label: 'Exp',
        command: 'export-template',
        context: 'export-template',
        command(editor) {
          // editor.Modal.setTitle('Components JSON')
          //   .setContent(`<textarea style="width:100%; height: 250px;">
          //     ${JSON.stringify(editor.getComponents())}
          //   </textarea>`)
          //   .open();

            // alert("asdasdsad")
            alert("Template Saved!")
            console.log(editor.getHtml())
        },
        attributes: {
          'title': 'Save Template',
          'data-tooltip-pos': 'bottom',
        },
      });



      // // Simple warn notifier
      // var origWarn = console.warn;
      // toastr.options = {
      //   closeButton: true,
      //   preventDuplicates: true,
      //   showDuration: 250,
      //   hideDuration: 150
      // };
      // console.warn = function (msg) {
      //   if (msg.indexOf('[undefined]') == -1) {
      //     toastr.warning(msg);
      //   }
      //   origWarn(msg);
      // };


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
      editor.on('storage:load', function(e) { console.log('Loaded ', e) });
      editor.on('storage:store', function(e) { console.log('Stored ', e) });


      // Do stuff on load
      editor.on('load', function() {
        var $ = grapesjs.$;

        // Show logo with the version
        var logoCont = document.querySelector('.gjs-logo-cont');
        document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
        var logoPanel = document.querySelector('.gjs-pn-commands');
        logoPanel.appendChild(logoCont);


        // Load and show settings and style manager
        var openTmBtn = pn.getButton('views', 'open-tm');
        openTmBtn && openTmBtn.set('active', 1);
        var openSm = pn.getButton('views', 'open-sm');
        openSm && openSm.set('active', 1);

        // Add Settings Sector
        var traitsSector = $('<div className="gjs-sm-sector no-select">'+
          '<div className="gjs-sm-title"><span className="icon-settings fa fa-cog"></span> Settings</div>' +
          '<div className="gjs-sm-properties" style="display: none;"></div></div>');
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

        // Open block mana  ger
        var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
        openBlocksBtn && openBlocksBtn.set('active', 1);

         var cssLink = document.createElement("link");

         console.log(cssLink, );

         cssLink.href = "/main.css";
         cssLink.rel = "stylesheet";
         cssLink.type = "text/css";
          document.querySelector('iframe').contentWindow.document.head.appendChild(cssLink);
          document.querySelector('iframe').setAttribute("scrolling", "yes");
        
         
        //   console.log(document.querySelector('iframe'))
        });
}

  render(){
    return (
      <React.Fragment>
      <button onClick={this.saveHTML}> Export Save</button>
            {/* <Helmet>
                <meta charSet="utf-8" />
                <title>My HAHHAHAH</title>
                <link rel="stylesheet" href={'./yourPathHere.jpg'}></link>

            </Helmet> */}
      <div className="gjs-logo-cont" style={{overflow: "scroll !important"}}>
              <a href="//grapesjs.com"><img className="gjs-logo" src={grapesjslogo}/></a>
              <div className="gjs-logo-version"></div>
            </div>


            <div id="gjs" style={{overflow: "scroll !important"}} /* style="height:0px; overflow:hidden" */>
          <header className="header-banner">
            <div className="container-width">
              <div className="logo-container">
                <div className="logo">GrapesJS</div>
              </div>
              <nav className="menu">
                <div className="menu-item">BUILDER</div>
                <div className="menu-item">TEMPLATE</div>
                <div className="menu-item">WEB</div>
              </nav>
              <div className="clearfix"></div>
              <div className="lead-title">Build your templates without coding</div>
              <div className="sub-lead-title">All text blocks could be edited easily with double clicking on it. You can create new text blocks with the command from the left panel</div>
              <div className="lead-btn">Hover me</div>
            </div>
          </header>

          <section className="flex-sect">
          <div className="container-width">
            <div className="flex-title">Flex is the new black</div>
            <div className="flex-desc">With flexbox system you're able to build complex layouts easily and with free responsivity</div>
            <div className="cards">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <div className="card-title">Title one</div>
                  <div className="card-sub-title">Subtitle one</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header ch2"></div>
                <div className="card-body">
                  <div className="card-title">Title two</div>
                  <div className="card-sub-title">Subtitle two</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header ch3"></div>
                <div className="card-body">
                  <div className="card-title">Title three</div>
                  <div className="card-sub-title">Subtitle three</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header ch4"></div>
                <div className="card-body">
                  <div className="card-title">Title four</div>
                  <div className="card-sub-title">Subtitle four</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header ch5"></div>
                <div className="card-body">
                  <div className="card-title">Title five</div>
                  <div className="card-sub-title">Subtitle five</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header ch6"></div>
                <div className="card-body">
                  <div className="card-title">Title six</div>
                  <div className="card-sub-title">Subtitle six</div>
                  <div className="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="am-sect">
          <div className="container-width">
            <div className="am-container">
              <img className="img-phone" onMouseDown="return false" src={phoneapp}/>
              <div className="am-content">
                <div className="am-pre">ASSET MANAGER </div>
                <div className="am-title">Manage your images with Asset Manager</div>
                <div className="am-desc">You can create image blocks with the command from the left panel and edit them with double click</div>
                <div className="am-post">Image uploading is not allowed in this demo</div>
              </div>
            </div>
          </div>
        </section>

        <section className="blk-sect">
          <div className="container-width">
            <div className="blk-title">Blocks</div>
            <div className="blk-desc">Each element in HTML page could be seen as a block. On the left panel you could find different kind of blocks that you can create, move and style</div>

            <div className="price-cards">
              <div className="price-card-cont">
                <div className="price-card">
                  <div className="pc-title">Starter</div>
                  <div className="pc-desc">Some random list</div>
                  <div className="pc-feature odd-feat">+ Starter feature 1</div>
                  <div className="pc-feature">+ Starter feature 2</div>
                  <div className="pc-feature odd-feat">+ Starter feature 3</div>
                  <div className="pc-feature">+ Starter feature 4</div>
                  <div className="pc-amount odd-feat">$ 9,90/mo</div>
                </div>
              </div>
              <div className="price-card-cont">
                <div className="price-card pc-regular">
                  <div className="pc-title">Regular</div>
                  <div className="pc-desc">Some random list</div>
                  <div className="pc-feature odd-feat">+ Regular feature 1</div>
                  <div className="pc-feature">+ Regular feature 2</div>
                  <div className="pc-feature odd-feat">+ Regular feature 3</div>
                  <div className="pc-feature">+ Regular feature 4</div>
                  <div className="pc-amount odd-feat">$ 19,90/mo</div>
                </div>
              </div>
              <div className="price-card-cont">
                <div className="price-card pc-enterprise">
                  <div className="pc-title">Enterprise</div>
                  <div className="pc-desc">Some random list</div>
                  <div className="pc-feature odd-feat">+ Enterprise feature 1</div>
                  <div className="pc-feature">+ Enterprise feature 2</div>
                  <div className="pc-feature odd-feat">+ Enterprise feature 3</div>
                  <div className="pc-feature">+ Enterprise feature 4</div>
                  <div className="pc-amount odd-feat">$ 29,90/mo</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="bdg-sect">
            <div className="container-width">
              <h1 className="bdg-title">The team</h1>
              <div className="badges">
                <div className="badge">
                  <div className="badge-header"></div>
                  <img className="badge-avatar" src={team1}/>
                  <div class="badge-body">
                    <div className="badge-name">Adam Smith</div>
                    <div className="badge-role">CEO</div>
                    <div className="badge-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</div>
                  </div>
                  <div className="badge-foot">
                    <span className="badge-link">f</span>
                    <span className="badge-link">t</span>
                    <span className="badge-link">ln</span>
                  </div>
                </div>
                <div className="badge">
                  <div className="badge-header"></div>
                  <img className="badge-avatar" src={team2}/>
                  <div className="badge-body">
                    <div className="badge-name">John Black</div>
                    <div className="badge-role">Software Engineer</div>
                    <div className="badge-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</div>
                  </div>
                  <div className="badge-foot">
                    <span className="badge-link">f</span>
                    <span className="badge-link">t</span>
                    <span className="badge-link">ln</span>
                  </div>
                </div>
                <div className="badge">
                  <div className="badge-header"></div>
                  <img className="badge-avatar" src={team3}/>
                  <div className="badge-body">
                    <div className="badge-name">Jessica White</div>
                    <div className="badge-role">Web Designer</div>
                    <div className="badge-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</div>
                  </div>
                  <div className="badge-foot">
                    <span className="badge-link">f</span>
                    <span className="badge-link">t</span>
                    <span className="badge-link">ln</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer-under">
              <div className="container-width">
                <div className="footer-container">
                  <div className="foot-lists">
                    <div className="foot-list">
                      <div className="foot-list-title">About us</div>
                      <div className="foot-list-item">Contact</div>
                      <div className="foot-list-item">Events</div>
                      <div className="foot-list-item">Company</div>
                      <div className="foot-list-item">Jobs</div>
                      <div className="foot-list-item">Blog</div>
                    </div>
                    <div className="foot-list">
                      <div className="foot-list-title">Services</div>
                      <div className="foot-list-item">Education</div>
                      <div className="foot-list-item">Partner</div>
                      <div className="foot-list-item">Community</div>
                      <div className="foot-list-item">Forum</div>
                      <div className="foot-list-item">Download</div>
                      <div className="foot-list-item">Upgrade</div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="form-sub">
                    <div className="foot-form-cont">
                      <div className="foot-form-title">Subscribe</div>
                      <div className="foot-form-desc">Subscribe to our newsletter to receive exclusive offers and the latest news</div>
                      <input name="name" className="sub-input" placeholder="Name" />
                      <input name="email" className="sub-input" placeholder="Email"/>
                      <button className="sub-btn" type="button">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="copyright">
                <div className="container-width">
                  <div className="made-with">
                    made with GrapesJS
                  </div>
                  <div className="foot-social-btns">facebook twitter linkedin mail</div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </footer> 
          </div>
          
        
        <div id="blocks"></div>
      </React.Fragment>
    )
  }

}

export default GrapeJS;