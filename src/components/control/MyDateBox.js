import { DateBox } from 'devextreme-react'
import React, { Component } from 'react'

export default class MyDateBox extends Component {
    render() {
        const { label, isRequired,onChange,showErrors, onBlur,errorMessage, name, ...rest } = this.props;
        return (
            <div className="my-input-control">
                <label>{this.props.label} { isRequired && <span className="my-input-control-required">*</span>}</label>
                <DateBox 
                    {...rest}
                    name={name}
                    onValueChanged={(e) => {
                        let event = { target: {value: e.value , name} };
                        if(typeof onChange === 'function') onChange(event);
                    }}
                    displayFormat={'dd/MM/yyyy'}
                />
                <span className="error-message">{showErrors && errorMessage}</span>
            </div>
        )
    }
}
