import React, {PureComponent} from "react";
import {Edit, Delete} from '@material-ui/icons'


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields

    const detailCategory = e.detailCategory

    return (
      detailCategory && (
        <div style={{width: '100%', display:'flex', flexDirection:"row", padding: 10, marginTop: 5, alignItems:'center'}}>
      
            <div style={{flex: 1}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{detailCategory.name}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-around', flexDirection:'row', flex: 1, alignItems:'center'}}>
                <div style={{minWidth: 80,}}>
                  <span style={{color:"rgba(0,0,0,0.7)"}}>{e.value}</span>
                </div>
                <div style={{minWidth: 80,}}>
                  <span style={{color:"rgba(0,0,0,0.7)"}}>{detailCategory.unit}</span>
                </div>
               
                <div style={{minWidth: 80,}}>
                    <Delete
                        onClick={() => this.props._DeleteProductDetailFields(e.id)}
                    />
                </div>
            </div>
        

        </div>
      )
    );
  }
};
