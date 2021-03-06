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
          title={"L???p k??? ho???ch ki???m to??n"}
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
          <Column dataField="SoKeHoach" caption="S??? ki???n ngh???" />
          <Column dataField="TenKeHoach" caption="T??n k??? ho???ch" />
          <Column dataField="NoiDungKT" caption="N???i dung" />
          <Column dataField="MucTieuKT" caption="M???c ti??u" />
          <Column
            dataField="FileId"
            caption="File ????nh k??m"
            alignment={"center"}
            cellComponent={(props) => {
              return (
                props.data.value && (
                  <Button size="small" iconBefore={DownloadIcon}>
                    T???i xu???ng
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
              title="L???p k??? ho???ch ki???m to??n"
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
                      caption="????n v??? ???????c ki???m to??n"
                      dataType="select"
                    >
                      <Lookup
                        dataSource={this.state.donViDataSource}
                        valueExpr="Id"
                        displayExpr="Ten"
                      />
                    </Column>
                    <Column dataField="DiaDiem" caption="?????a ??i???m" />
                    <Column
                      dataField="ThoiHanGiaHan"
                      caption="Th???i gian gia h???n"
                      dataType="number"
                      max={10}
                    />
                    <Column dataField="GhiChu" Ghi ch?? />
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
