import React, { Component } from 'react'
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    MasterDetail,
    Lookup
  } from "devextreme-react/data-grid";
  import LenKeHoachKTService from '../LenKeHoachKTService';
  import Dm_DonViService from '../../../danh-muc/dm-donvi/Dm_DonViService';

export class DetailGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource:[],
            donViDataSource: props.donViDataSource
        }
    }
    componentDidMount() {
        this.loadDetail();
    }
    loadDetail = () => {
        let key = this.props.data.key;
        LenKeHoachKTService.getAllDetail(key).then(res => {
            this.setState({ dataSource: res.data});
        })
        
        console.log(this.props.data.key);
    }
    render() {
        return (
            <div>
                <DataGrid
                    dataSource={this.state.dataSource}
                    keyExpr="Id"
                    showBorders={true}
                    showRowLines={true}
                >
                    <Column dataField="DVDuocKT" caption="Đơn vị được kiểm toán">
                        <Lookup dataSource={this.state.donViDataSource} valueExpr="Id" displayExpr="Ten"/>
                    </Column>
                    <Column dataField="DiaDiem" caption="Địa điểm" />
                    <Column dataField="ThoiHanGiaHan" caption="Thời gian gia hạn" />
                    <Column dataField="ThoiGianKT" caption="Thời gian kiểm toán" format={'dd/MM/yyyy'} />
                    <Column dataField="GhiChu" caption="Ghi chú" />
                </DataGrid>
            </div>
        )
    }
}

export default DetailGrid
