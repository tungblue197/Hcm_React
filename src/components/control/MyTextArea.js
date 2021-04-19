import { TextArea } from 'devextreme-react';
import React, { Component } from 'react'

export default class MyTextArea extends Component {
    render() {
        const { label, isRequired,onChange,showErrors, onBlur,errorMessage, name, ...rest } = this.props;
        return (
            <div className="my-input-control">
                <label>{this.props.label} { isRequired && <span className="my-input-control-required">*</span>}</label>
                <TextArea {...rest} name={name} onKeyUp={({event}) => {
                    if(typeof onChange === "function") onChange(event);
                }} onFocusOut={({event}) => {
                    if(typeof onBlur === "function") onBlur(event);
                }} />
                <span className="error-message">{showErrors && errorMessage}</span>
            </div>
        )
    }
}
