import React, { Component } from "react";
import classNames from "classnames";
import { Drawer } from "devextreme-react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import NavigationList from "./Naviation/NavigationList";
import Dm_DonViPage from "../features/danh-muc/dm-donvi/Dm_DonViPage";
import NestedRoutes from "../routes/NestedRoutes";
import { MenuIcon, UserIcon } from "evergreen-ui";
import HeaderToolbar from "../components/header-toolbar/HeaderToolbar";

export class LayoutPage extends Component {
  state = {
    opened: true,
  };
  render() {
    const { opened } = this.state;
    return (
      <>
        <HeaderToolbar onToolgeNav={() => this.setState({ opened: ! opened})}/>
        <Drawer opened={opened} component={NavigationList}>
          <NestedRoutes />
        </Drawer>
      </>
    );
  }
}

export default LayoutPage;
