import React, { Component } from 'react'
import LoginContainer from './LoginContainer'

export class LoginPage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
                <LoginContainer {...this.props} />
            </>
        )
    }
}

export default LoginPage
