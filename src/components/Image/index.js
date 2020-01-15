import React, { Component, PureComponent } from "react";
import api from "Api";


class index extends PureComponent {

   
    render() {
       
        const {imageSource, single, thumbNail } = this.props

        if(single) {
            if(thumbNail){
                return (
                    <div className="d-flex" style={{justifyContent:'center', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)', borderRadius: 8, width: 50, height: 50}}>
                        <img
                            src={imageSource[0].url}
                            style={{objectFit:'cover', borderRadius: 20, maxWidth:'100%', padding: 5}}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="d-flex" style={{width: 100, height: 100, justifyContent:'center', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 20}}>
                        <img
                            src={imageSource[0].url}
                            style={{objectFit:'cover', borderRadius: 20, maxWidth:'100%', padding: 5}}
                        />
                    </div>
                );
            }
        } else {
            return (
                <div className="d-flex" style={{width: 120, height: 120}}>
                    no single
                </div>
            );
        }
        
    }
}

export default index;

