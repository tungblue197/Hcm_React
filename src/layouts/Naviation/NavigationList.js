import { List } from 'devextreme-react'
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import './NavigationList.scss';

export class NavigationList extends Component {
    render() {
        return (
            <div className="list" style={{ width: '240px', height: '100vh'}}>
                <nav className="side-bar">
                    <li className="side-bar__item">
                        <NavLink activeClassName="active" to="/kiemtoan/dashboard">Biểu đồ</NavLink>
                    </li>
                    <li className="side-bar__item">
                        <NavLink activeClassName="active" to="/kiemtoan/dm_donvi">Danh mục đơn vị</NavLink>
                    </li>
                    <li className="side-bar__item">
                        <NavLink activeClassName="active" to="/kiemtoan/lapkiennghi">Lập kiến nghị kiểm toán</NavLink>
                    </li>
                </nav>
            </div>
        )
    }
}

export default NavigationList
