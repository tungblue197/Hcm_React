import React, { PureComponent } from 'react'
import { DataGrid } from 'devextreme-react';
import { Column, Lookup } from 'devextreme-react/data-grid';
import TreeList,{
    Pager,
    Paging,
  } from 'devextreme-react/tree-list';


export class MainGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.gridRef = null;
    }
    render() {
        console.log(this.props.diaBanData, 'dia ban');
        return (
            <>
                <TreeList
                    ref={ref => this.gridRef = ref}
                    dataSource={this.props.dataSource || []}
                    showRowLines={true}
                    showBorders={true}
                    showColumnHeaders={true}
                    showColumnLines={true}
                    selection={{ mode: 'single' }}
                    keyExpr="Id"
                    parentIdExpr="IdCha"
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    height={500}
                    onSelectionChanged={this.props.selectedRowChanged}
                >
                    <Column dataField="Ma" caption="Mã đơn vị" width={140} />
                    <Column dataField="Ten" caption="Tên đơn vị" width={240} />
                    <Column dataField="DiaBan" caption="Địa bàn" >
                        <Lookup dataSource={this.props.diaBanData} valueExpr="Id" displayExpr="TenDB" />
                    </Column>
                    <Column dataField="LinhVuc" caption="Lĩnh vực" >
                        <Lookup dataSource={this.props.linhVucData} valueExpr="Id" displayExpr="Ten" />
                    </Column>
                    <Column dataField="NgayBatDau" width={160} caption="Ngày bắt đầu" dataType='date' alignment={'center'} format={'dd/MM/yyyy'} />
                    <Column dataField="NgayKetThuc" width={160} caption="Ngày kết thúc" dataType='date' alignment={'center'} format={'dd/MM/yyyy'} />
                    <Column dataField="Sdt" caption="Số điện thoại" width={140} />
                    <Column dataField="GhiChu" caption="Ghi chú" />
                    <Pager allowedPageSizes={[4, 50, 100]} showPageSizeSelector={true} />
                    <Paging defaultPageSize={4} />
                </TreeList>
            </>
        )
    }
}

export default MainGrid
