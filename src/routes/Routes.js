import { routers } from "../configs/routerConfigs";
import { Redirect, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dm_DonViPage from "../features/danh-muc/dm-donvi/Dm_DonViPage";
import { useLocation } from "react-router-dom";
import "./Routes.scss";
import LoginPage from "../features/login/LoginPage";
import LayoutPage from "../layouts/LayoutPage";
let isLogin = true;

const Routes = (props) => {
  const location = useLocation();
  return (
    <Switch location={location}>
      <Route path="/" exact render={(props) => <LoginPage {...props} />} />
      <Route path="/kiemtoan" render={(props) => <LayoutPage {...props} />} />
    </Switch>
  );
};

export default Routes;
