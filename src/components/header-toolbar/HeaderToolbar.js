import React, { Component } from "react";
import { MenuIcon, UserIcon } from "evergreen-ui";
import './HeaderToolbar.scss';

export class HeaderToolbar extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="header-toolbar">
        <div className="toolbar-left">
          <button className="nav-icon" onClick={this.props.onToolgeNav}>
            <MenuIcon />
          </button>
        </div>
        <div className="toolbar-right">
          <div className="user-info">
            <span>Đơn vị tất cả</span>
            <UserIcon size={20}/>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderToolbar;
