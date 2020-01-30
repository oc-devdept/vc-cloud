import React, {PureComponent} from "react";
import Moment from 'moment'


export default class Index extends PureComponent {

  render () {

    const item = this.props.DisplayValues

    return (
        <div style={{width: '100%', display:'flex', flexDirection:"row", justifyContent:'space-between', padding: 10, marginTop: 5, alignItems:'center'}}>

            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.name}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.email}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.contact}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.service}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.interest}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(item.created).format('LL')}</span>
            </div>
            <div>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.status}</span>
            </div>

        </div>
    );
  }
};

