import React, { Component } from 'react'
import { DataGrid, TreeList } from 'devextreme-react';
import { Column, Lookup } from 'devextreme-react/data-grid';


export class MainGrid extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.diaBanData, 'dia ban');
        return (
            <>
                <TreeList
                    dataSource={this.props.dataSource || []}
                    showRowLines={true}
                    showBorders={true}
                    showColumnHeaders={true}
                    showColumnLines={true}
                    selection={{ mode: 'single' }}
                    keyExpr="Id"
                    parentIdExpr="IdCha"
                >
                    <Column dataField="Ma" caption="Mã đơn vị" />
                    <Column dataField="Ten" caption="Tên đơn vị" />
                    <Column dataField="DiaBan" caption="Địa bàn" >
                        <Lookup dataSource={this.props.diaBanData} valueExpr="Id" displayExpr="TenDB" />
                    </Column>
                    <Column dataField="LinhVuc" caption="Lĩnh vực" >
                        <Lookup dataSource={this.props.linhVucData} valueExpr="Id" displayExpr="Ten" />
                    </Column>
                    <Column dataField="NgayBatDau" caption="Ngày bắt đầu" />
                    <Column dataField="NgayKetThuc" caption="Ngày kết thúc" />
                    <Column dataField="Sdt" caption="Số điện thoại" />
                    <Column dataField="GhiChu" caption="Ghi chú" />
                </TreeList>
            </>
        )
    }
}

export default MainGrid
