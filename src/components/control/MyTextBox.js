import { TextBox } from 'devextreme-react'
import React, { Component } from 'react'
import './Control.scss';

export default class MyTextBox extends Component {
    render() {
        const { label, isRequired,onChange,showErrors, onBlur,errorMessage, name, maxLength, ...rest } = this.props;
        return (
            <div className="my-input-control">
                <label>{this.props.label} { isRequired && <span className="my-input-control-required">*</span>}</label>
                <TextBox {...rest} name={name} onKeyUp={({event}) => {
                    if(typeof onChange === "function") {
                        const { value } = event.target;
                        if(value.length <= maxLength) {
                            event.target.value = event.target.value.substring(0, maxLength - 1);
                            onChange(event);
                        }
                    }
                }} onFocusOut={({event}) => {
                    if(typeof onBlur === "function") onBlur(event);
                }} />
                <span className="error-message">{showErrors && errorMessage}</span>
            </div>
        )
    }
}
