import React, {Component} from "react";
import { connect } from "react-redux";
import 'grapesjs/dist/css/grapes.min.css';
import 'grapick/dist/grapick.min.css';

import grapesjs from 'grapesjs';

import grapesjstouch from 'grapesjs-touch';
import grapesjsparserpostcss from 'grapesjs-parser-postcss';

import gjspresetwebpage from 'Components/grapesjs-preset-webpage';
import grapesjsgradient from 'grapesjs-style-gradient';
import gjsstyledbg from 'grapesjs-style-bg';
import toastr from 'toastr';

import { updateCmspage } from 'Ducks/cms/cmspage';
import api from "Api";

class GrapeJSEdit extends Component {
    state = {};

    uploadFileProcess = async (e, editor) => {
        console.log("uploading");
        
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var data = new FormData();
        data.append('upload', files[0]);
        data.append('type', 'Cmspage');
        data.append('typeId', this.pageId);
        data.append("uploadType","file");
        let uploaded = await api.post('uploadfiles/cloudUpload', data);
        
        let dt = uploaded.data.data.map(item => item.path);
        editor.AssetManager.add(dt);
        
    }
    
    savePage = (html, css) => {
        this.props.updateCmspage({ id: this.pageId, html: html, css: css});
    }

    

    async componentDidMount(){
        var id = this.props.match.params.id;
        this.pageId = id;
        //get page data
        let pageData = await api.get('cmspages/'+id);
        
        var editor;
        let imageData = await api.get('uploadfiles/assets');
        let images = imageData.data.data.map(img => img.path);
        let height = window.innerHeight + 90;
        let html = pageData.data ? pageData.data.html : ""
        console.log(html);
        if(pageData.data.css){
          html += "<style>" + pageData.data.css +"</style>";
        }
        this.setState({
            html: html            
        }, () => {            
            editor  = grapesjs.init({
                avoidInlineStyle: 1,
                height: height,
                container : '#gjs',
                fromElement: 1,
                showOffsets: 1,
                assetManager: {
                  embedAsBase64: 1,
                  assets: images,
                  uploadFile: (e) => this.uploadFileProcess(e, editor)
                },              
                storageManager: false,
                  // Avoid any default panel
                  panels: { defaults: [] },           
                  selectorManager: { componentFirst: true },
                  styleManager: { clearProperties: 1 },
                plugins: [
                    
                  gjspresetwebpage,
                  grapesjstouch,
                    grapesjsparserpostcss,
                    grapesjsgradient,
                    gjsstyledbg,
                ],
                pluginsOpts: {
                  [gjspresetwebpage]: {
                    modalImportTitle: 'Import Template',
                    modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                    modalImportContent: function(editor) {
                      return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
                    },
                    filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
                    aviaryOpts: false,
                    blocksBasicOpts: { flexGrid: 1 }
                    
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
          
           /*
          
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
          */
          
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
                ['canvas-clear', 'Clear canvas']]
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
        })
        
      
      
          // Store and load events
          //editor.on('storage:load', function(e) { console.log('Loaded ', e) });
          //editor.on('storage:store', function(e) { console.log('Stored ', e) });
      
      
          // Do stuff on load
          editor.on('load', function() {
            var $ = grapesjs.$;
            var pn = editor.Panels;
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

            editor.StyleManager.addProperty('layout', [{
              name: 'Flex',
              property: 'flex',
              type: 'integer',              
            }], { at: 3})
          
            
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
        return ( <div>
            <h3 onClick={this.props.history.goBack}>Back to Pages</h3>
            <div className="gjs-logo-cont"></div>
            {
              /*
               <div id="gjs" dangerouslySetInnerHTML={{__html: this.state.html}}>
                                  
      
                </div>
              */
            }
             
                
              
              <div id="blocks"></div>
            </div>
        );
    }
    
}

const mapStateToProps = ({ cmsState}) => {
 
    return {  };
  }
export default connect(mapStateToProps, { updateCmspage })(GrapeJSEdit);