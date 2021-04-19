import { routers } from '../configs/routerConfigs';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dm_DonViPage from '../features/danh-muc/dm-donvi/Dm_DonViPage';
import { useLocation } from 'react-router-dom'
import './Routes.scss';
import LoginPage from '../features/login/LoginPage';
import LayoutPage from '../layouts/LayoutPage';
import LenKeHoachKTPage from '../features/ngiep-vu/len-ke-hoach-kiem-toan/LenKeHoachKTPage';
import DashboardPage from '../features/dashobard/DashboardPage';
let isLogin = true;

const Routes = (props) => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} mountOnEnter={true} classNames={`router`} timeout={400}>
                <Switch location={location}>
                    <Route path='/kiemtoan/dashboard' exact render={props => <DashboardPage {...props}/>}/>
                    <Route path='/kiemtoan/dm_donvi' exact render={props => <Dm_DonViPage {...props}/>}/>
                    <Route path='/kiemtoan/lapkiennghi' render={(props) => <LenKeHoachKTPage {...props}/>} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Routes;