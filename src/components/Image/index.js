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
                            src={imageSource[0].path}
                            style={{objectFit:'cover', borderRadius: 20, maxWidth:'100%', padding: 5}}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="d-flex" style={{width: 100, height: 100, justifyContent:'center', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 20}}>
                        <img
                            src={imageSource[0].path}
                            style={{objectFit:'cover', borderRadius: 20, maxWidth:'100%', padding: 5}}
                        />
                    </div>
                );
            }
        } else {
        
            return (
                <div className="d-flex flex-row" style={{flexWrap:'wrap'}}>
                    {imageSource.map((e, index) =>{
                        return (
                            <div key={index} className="d-flex" style={{width: 100, height: 100}}>
                                <img
                                    src={e.path}
                                    style={{objectFit:'cover', borderRadius: 20, maxWidth:'100%', padding: 5}}
                                />
                            </div>
                        )
                    })}  
                </div>   
            )
        }
        
    }
}

export default index;

