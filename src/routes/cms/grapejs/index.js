import React, { Component } from 'react'
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

class GrapeJs extends Component {
    constructor(props){
        super(props); 
        this.state = {
            toggle: false,
            element: null
        }               
    }

    componentDidMount = () => {
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            // Size of the editor
            height: '600px',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: false,
            // Avoid any default panel
            panels: { defaults: [] },
            blockManager: {
                appendTo: '#blocks',
                blocks: [
                  {
                    id: 'section', // id is mandatory
                    label: '<b>Section</b>', // You can use HTML/SVG inside labels
                    attributes: { class:'gjs-block-section' },
                    content: `<section>
                      <h1>This is a simple title</h1>
                      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                    </section>`,
                  }, {
                    id: 'text',
                    label: 'Text',
                    content: '<div data-gjs-type="text">Insert your text here</div>',
                  }, {
                    id: 'image',
                    label: 'Image',
                    // Select the component once it's dropped
                    select: true,
                    // You can pass components as a JSON instead of a simple HTML string,
                    // in this case we also use a defined component type `image`
                    content: { type: 'image' },
                    // This triggers `active` event on dropped components and the `image`
                    // reacts by opening the AssetManager
                    activate: true,
                  }
                ]
              },
              layerManager: {
                appendTo: '.layers-container'
              },
              // We define a default panel as a sidebar to contain layers
              panels: {
                defaults: [{
                  id: 'layers',
                  el: '.panel__right',
                  // Make the panel resizable
                  resizable: {
                    maxDim: 350,
                    minDim: 200,
                    tc: 0, // Top handler
                    cl: 1, // Left handler
                    cr: 0, // Right handler
                    bc: 0, // Bottom handler
                    // Being a flex child we need to change `flex-basis` property
                    // instead of the `width` (default)
                    keyWidth: 'flex-basis',
                  },
                }]
              }
          });

          editor.Panels.addPanel({
            id: 'panel-top',
            el: '.panel__top',
          });
          editor.Panels.addPanel({
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true, // active by default
                className: 'btn-toggle-borders',
                label: '<u>B</u>',
                command: 'sw-visibility', // Built-in command
              }, {
                id: 'export',
                className: 'btn-open-export',
                label: 'Exp',
                command: 'export-template',
                context: 'export-template', // For grouping context of buttons from the same panel
              }, {
                id: 'show-json',
                className: 'btn-show-json',
                label: 'JSON',
                context: 'show-json',
                command(editor) {
                  editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">
                      ${JSON.stringify(editor.getComponents())}
                    </textarea>`)
                    .open();
                },
              }
            ],
          });

          var blockManager = editor.BlockManager;

            // 'my-first-block' is the ID of the block
            blockManager.add('my-first-block', {
            label: 'Simple block',
            content: '<div class="my-block">This is a simple block</div>',
            });

            editor.addComponents(`<div>
  <img src="https://path/image" />
  <span title="foo">Hello world!!!</span>
</div>`);
    }

    render() {




        return(
            <div>
                <div class="panel__top">
                    <div class="panel__basic-actions"></div>
                </div>
                <div class="editor-row">
                <div class="editor-canvas">
                    <div id="gjs"><h1>Hello World Component!</h1></div>
                </div>
                <div class="panel__right">
                    <div class="layers-container"></div>
                </div>
                </div>
                <div id="blocks"></div>

            </div>
        )
    }
}

export default GrapeJs
