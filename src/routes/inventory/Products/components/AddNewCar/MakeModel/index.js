import React, { Component, PureComponent } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class MakeModel extends PureComponent {


    render () {
   
    const {MakeSource, ModelSource, MakeId, ModelId, _ToggleMake, _ToggleModel, Makeloading, ModelLoading  } = this.props

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
                value={MakeId ? MakeId : ''}
                onChange={_ToggleMake}
                style={{minWidth: 100, marginLeft: 5}}
              >
                {Makeloading && 
                  <div>Loading...</div>
                }

                {!Makeloading &&
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
                value={ModelId ? ModelId : ''}
                onChange={_ToggleModel}
                style={{minWidth: 100, marginLeft: 5}}        
              >

                {ModelLoading && 
                  <div>Loading...</div>
                }

                {!ModelLoading &&
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
  
}

export default MakeModel;
