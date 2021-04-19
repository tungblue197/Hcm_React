import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./redux/LoginActions";
import "./Login.scss";
import { Alert } from "evergreen-ui";

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberPassword: false,
      message: "",
    };
  }

  onLoginFormChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === "admin" && password === "123456") {
      this.props.history.replace("/kiemtoan/dashboard");
    } else {
      this.setState({ message: "Tài khoản hoạc mật khẩu sai" });
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <section className="container login-container">
        <div className="login">
          <h1>Đăng nhập chương trình</h1>
          <form method="post" onSubmit={this.handleLogin}>
            <p>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Nhập tài khoản"
                onChange={this.onLoginFormChange}
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={this.onLoginFormChange}
              />
            </p>
            <p className="remember_me">
              <label>
                <input type="checkbox" name="remember_me" id="remember_me" />
                Nhớ mật khẩu
              </label>
            </p>
            <p className="submit">
              <input type="submit" name="commit" value="đăng nhập" />
            </p>
          </form>
        </div>

        <div className="login-help">
          <p>
            © <a href="index.html">FSC & HCM - 2022</a>.
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
});

const mapDispatchToProps = {
  login: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
