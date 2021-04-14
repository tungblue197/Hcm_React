import React, { Component } from 'react'
import { Button } from 'evergreen-ui';
import { AddIcon, EditIcon, TrashIcon, EyeOpenIcon } from 'evergreen-ui'
import './HeaderPage.scss';
export class HeaderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            listButton: [
                {
                    name: 'Them',
                    text: 'Thêm',
                    icon: <AddIcon />
                },
                {
                    name: 'Sua',
                    text: 'Sửa',
                    icon: <EditIcon />
                },
                {
                    name: 'Xoa',
                    text: 'Xóa',
                    icon: <TrashIcon />
                },
                {
                    name: 'Them',
                    text: 'Xem',
                    icon: <EyeOpenIcon />
                }
            ]
        }
    }
    render() {
        return (
            <header className="page-header">
                {
                    this.state.listButton?.length && this.state.listButton.map((item ,index) => <Button key={index} appearance="primary" onClick={() => this.props.onAction(item.name)} style={{margin: '0px 6px'}} iconBefore={item.icon}>{item.text}</Button>)
                }
            </header>
        )
    }
}

export default HeaderPage
