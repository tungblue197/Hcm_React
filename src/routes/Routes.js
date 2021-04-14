import { routers } from '../configs/routerConfigs';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

let isLogin = true;

const Routes = (props) => {
    return (
        <TransitionGroup>
            <CSSTransition mountOnEnter={true} classNames={`router-none`} timeout={300}>
                <Switch>
                    {
                        routers && routers.length && routers.map(route =>  <Route exact={route.exact} path={route.path} key={route.key} render={(props) => {
                            if(route.private){
                                if(isLogin) return <route.component {...props}/>
                                else return <Redirect to='/'/>
                            }
                            return <route.component {...props}/>
                        }} />)
                    }
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Routes;