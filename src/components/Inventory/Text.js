import React, {PureComponent} from 'react'

class Text extends PureComponent {

    render() {

        const {title, value, divStyle} = this.props

        let divStyles = {...divStyle}
        divStyles.flexDirection = 'column'

        return (
            <div className="d-flex" style={divStyles}>
                <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>{title}</span>
                <span>{value}</span>
            </div>
        )
    }
}


export default Text