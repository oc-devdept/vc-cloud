
import React, {PureComponent} from 'react'

class StaticName extends PureComponent {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.title != nextProps.title){
            return true
        }
        return false
    }


    render() {

        const {title} = this.props

        return (
            <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>
                {title}
            </span>
        )
    }
}


export default StaticName