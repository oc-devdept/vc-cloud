import React, { Component } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const MakeModel = (props) => {

    const MakeSource = props.MakeSource
    const ModelSource = props.ModelSource


    return (
      <div>

        <div className='d-flex' style={{margin: 5}}>
          <div>
            Make
          </div>
          <FormControl>
              <Select 
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.MakeId ? props.MakeId : ""}
                onChange={props._ToggleMake}
                style={{minWidth: 100, marginLeft: 5}}
              >
                {props.Makeloading && 
                  <div>Loading...</div>
                }

                {!props.Makeloading &&
                  MakeSource.map((e, index) => {
                      const keyName = e.split(':')[0]
                      const keyId = e.split(':')[1]
                      return <MenuItem key={index} value={keyId}>{keyName}</MenuItem>
                  })
                }
              </Select>
          </FormControl>
        </div>


        <div className='d-flex' style={{margin: 5}}>
          <div>
            Model
          </div>
          <FormControl>
              <Select 
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.ModelId ? props.ModelId : ""}
                onChange={props._ToggleModel}
                style={{minWidth: 100, marginLeft: 5}}        
              >

                {props.ModelLoading && 
                  <div>Loading...</div>
                }

                {!props.ModelLoading &&
                  ModelSource.map((e, index) => {
                      return <MenuItem key={index} value={e.value}>{e.name}</MenuItem>
                  })
                }
              </Select>
          </FormControl>
        </div>

      </div>
    )
  
}

export default MakeModel;
