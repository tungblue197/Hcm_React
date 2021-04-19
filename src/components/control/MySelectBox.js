import { SelectBox } from 'devextreme-react'
import React, { Component } from 'react'

export class MySelectBox extends Component {
    render() {
        const { onChange ,onBlur, errorMessage, showErrors,isRequired,name,...rest } = this.props;
        return (
            <div className="my-input-control">
                <label>{this.props.label} { isRequired && <span className="my-input-control-required">*</span>}</label>
                <SelectBox {...rest} 
                        onValueChanged={(e) => {
                            let event = { target: {value: e.value, name } };
                            console.log(event);
                            if(typeof onChange === 'function') onChange(event);
                        }}
                        onFocusOut={({event}) => {
                            if(typeof onBlur === 'function') onBlur({event});
                        }}
                />
                <span className="error-message">{showErrors && errorMessage}</span>
            </div>
        )
    }
}

export default MySelectBox
