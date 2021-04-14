import React, { Component } from 'react'
import './Login.scss'

export class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberPassword: false
        }
    }

    onLoginFormChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        if (username === 'adminkt' && password === '123456') {
            this.props.history.replace('/ttkt');
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <section className="container">
                <div className="login">
                    <h1>Đăng nhập chương trình</h1>
                    <form method="post" onSubmit={this.handleLogin}>
                        <p><input type="text" name="username" value={username} placeholder="Nhập tài khoản" onChange={this.onLoginFormChange} /></p>
                        <p><input type="password" name="password" value={password} placeholder="Nhập mật khẩu" onChange={this.onLoginFormChange} /></p>
                        <p className="remember_me">
                            <label>
                                <input type="checkbox" name="remember_me" id="remember_me" />
                            Nhớ mật khẩu
                        </label>
                        </p>
                        <p className="submit"><input type="submit" name="commit" value="đăng nhập" /></p>
                    </form>
                </div>

                <div className="login-help">
                    <p>© <a href="index.html">FSC & HCM - 2022</a>.</p>
                </div>
            </section>
        )
    }
}

export default LoginContainer
