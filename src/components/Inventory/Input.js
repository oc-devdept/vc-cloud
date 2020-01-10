import React, {PureComponent, Component} from 'react'

class Input extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.value != nextProps.value){
            return true
        }
        return false
    }

    render() {

        const {title, placeholder, value, _HandleProduct, element, style, divStyle, textarea} = this.props

        let styles = {...style}
        let divStyles = {...divStyle}
        divStyles.flexDirection = 'column'

        if(textarea){
            return (
                <div className="d-flex" style={divStyles}>
                    <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>{title}</span>
                    <textarea 
                        type={element} 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={(e) => _HandleProduct(e.target.value, element)}
                        style={styles}
                    />
                </div>
            )
        } else {

            styles.padding = 5
            
            return (
                <div className="d-flex" style={divStyles}>
                    <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>{title}</span>
                    <input 
                        type={element} 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={(e) => _HandleProduct(e.target.value, element)}
                        // onChange={_HandleProduct}
                        style={styles}
                    />
                </div>
            )
        }
        
    }
}


export default Input