import React, { Component } from "react";
import { createStore } from "devextreme-aspnet-data-nojquery";
import { Button, DownloadIcon } from "evergreen-ui";

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  MasterDetail,
  Editing,
  Form,
  Popup,
  Lookup,
} from "devextreme-react/data-grid";
import { Item, SimpleItem } from "devextreme-react/form";

import DetailGrid from "./local-components/DetailGrid";
import HeaderPage from "../../../components/header-page/HeaderPage";
import SearchBar from "../../../components/search-bar/SearchBar";
import Dm_DonViService from "../../danh-muc/dm-donvi/Dm_DonViService";
import LenKeHoachKTService from "./LenKeHoachKTService";
let url = "http://103.74.122.203/kt/api/LapKeHoachKiemToan";
const dataSource = createStore({
  key: "Id",
  loadUrl: `${url}/GetAll`,
  insertUrl: `${url}/Insert`,
  updateUrl: `${url}/Update`,
  deleteUrl: `${url}/Delete`,
  onLoaded: (data) => {
    console.log("data : ", data);
  },
  onBeforeSend: (a, b) => {
    console.log("a : ", a, " b : ", b);
  },
});

export class LenKeHoachKTContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      donViDataSource: [],
      selectedValue: null,
      currentDetailDataSource: []
    };
    this.onContentReady = this.onContentReady.bind(this);
    this.gridRef = null;
  }
  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(["EnviroCare"]);
      this.setState({
        collapsed: true,
      });
    }
  }
  componentDidMount() {
    this.getLookUpdata();
  }
  getLookUpdata = () => {
    Dm_DonViService.getAll().then((res) => {
      this.setState({ donViDataSource: res.data });
    });
  };
  handleAtions = (action) => {
    let { instance } = this.gridRef;
    let key = instance.getSelectedRowKeys()[0];
    let index = instance.getRowIndexByKey(key);
    if (action === "Sua") {
        instance.editRow(index);
        
    }else if(action === "Them"){
        this.setState({ currentDetailDataSource: []})
        instance.addRow();
    }
  };
  handleSearch = (text) => {
    const gridRef = this.gridRef;
    gridRef.instance.searchByText(text);
  };
  onGridSelectedRowChanged = (e) => {
    let key = e.selectedRowKeys[0];
    LenKeHoachKTService.getAllDetail(key).then(res => {
        this.setState({ currentDetailDataSource: res.data})
    })
  };
  render() {
    return (
      <div>
        <HeaderPage onAction={this.handleAtions} />
        <SearchBar
          title={"Lập kế hoạch kiểm toán"}
          onSearch={this.handleSearch}
        />
        <DataGrid
          ref={(ref) => (this.gridRef = ref)}
          dataSource={dataSource}
          allowColumnReordering={true}
          showBorders={true}
          onContentReady={this.onContentReady}
          showRowLines={true}
          selection={{ mode: "single" }}
          onSelectionChanged={this.onGridSelectedRowChanged}
          keyExpr="Id"
        >
          <Column dataField="SoKeHoach" caption="Số kiến nghị" />
          <Column dataField="TenKeHoach" caption="Tên kế hoạch" />
          <Column dataField="NoiDungKT" caption="Nội dung" />
          <Column dataField="MucTieuKT" caption="Mục tiêu" />
          <Column
            dataField="FileId"
            caption="File đính kèm"
            alignment={"center"}
            cellComponent={(props) => {
              return (
                props.data.value && (
                  <Button size="small" iconBefore={DownloadIcon}>
                    Tải xuống
                  </Button>
                )
              );
            }}
          />
          <MasterDetail
            enabled={true}
            component={(props) => (
              <DetailGrid
                {...props}
                donViDataSource={this.state.donViDataSource}
              />
            )}
          />
          <Pager allowedPageSizes={[10, 20, 30]} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
          <Editing mode="popup" allowUpdating={true}>
            <Popup
              title="Lập kế hoạch kiểm toán"
              showTitle={true}
              width={'80%'}
              height={'80%'}
            />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="SoKeHoach" />
                <Item dataField="TenKeHoach" />
                <Item dataField="NoiDungKT" />
                <Item dataField="SoKeHoach" />
                <Item dataField="GhiChu" editorType="dxTextArea" colSpan={2} />
                <SimpleItem colSpan={2}>
                  <DataGrid
                    dataSource={this.state.currentDetailDataSource || []}
                    showRowLines={true}
                    showBorders={true}
                  >
                    <Editing
                      mode="batch"
                      allowUpdating={true}
                      allowAdding={true}
                    />
                    <Column
                      dataField="DVDuocKT"
                      caption="Đơn vị được kiểm toán"
                      dataType="select"
                    >
                      <Lookup
                        dataSource={this.state.donViDataSource}
                        valueExpr="Id"
                        displayExpr="Ten"
                      />
                    </Column>
                    <Column dataField="DiaDiem" caption="Địa điểm" />
                    <Column
                      dataField="ThoiHanGiaHan"
                      caption="Thời gian gia hạn"
                      dataType="number"
                      max={10}
                    />
                    <Column dataField="GhiChu" Ghi chú />
                  </DataGrid>
                </SimpleItem>
              </Item>
            </Form>
          </Editing>
        </DataGrid>
      </div>
    );
  }
}

export default LenKeHoachKTContainer;
