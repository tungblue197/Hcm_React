import { DropDownBox } from 'devextreme-react'
import React, { Component } from 'react'

export default class MyDropDownBox extends Component {
    render() {
        const { onChange ,onBlur,value,  errorMessage,children, showErrors,isRequired,name,...rest } = this.props;
        return (
            <div className="my-input-control">
                <label>{this.props.label} { isRequired && <span className="my-input-control-required">*</span>}</label>
                <DropDownBox 
                    {...rest}
                    value={value}
                    onValueChanged={(e) => {
                        console.log(e);
                        const { value } = e;
                        const event = {
                            target: { value: value || [] , name }
                        }
                        onChange(event);
                    }}
                    
                    contentRender={(e) => children({dataSource: rest.dataSource, value: value, component: e.component, onChange: (e) => { onChange({target: { value: e, name}})}})}
                />
                <span className="error-message">{showErrors && errorMessage}</span>
            </div>
        )
    }
}
