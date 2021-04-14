import { DataGrid } from 'devextreme-react';
import { Column } from 'devextreme-react/data-grid';
import Form from 'devextreme-react/form';
import NumberBox from 'devextreme-react/number-box';
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';


import { Dialog } from 'evergreen-ui';
import React, { PureComponent } from 'react'
import HeaderPage from '../../../components/header-page/HeaderPage';
import SearchBar from '../../../components/search-bar/SearchBar';
import Dm_DonViService from './Dm_DonViService';
import MainGrid from './local-components/MainGrid';



export class Dm_DonViContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            diaBanData: [],
            donViData: [],
            linhVuc: [],
            isLoading: fasle
        }
    }
    componentDidMount(){
        this.loadDonVi();
        this.loadLookupData();
    }

    handleSearch = (text) => {
        console.log('text search : ', text);
    }
    handleAtions = (action) => {
        console.log('action : ', action);
    }
    loadDonVi = () => {
        Dm_DonViService.getAll().then(res => {
            
            this.setState({
                dataSource: res.data
            })
        });
    }
    loadLookupData = () => {
        this.setState({isLoading: false});
         Dm_DonViService.getAllDiaBan().then(res => {
             console.log('res : ', res);
             this.setState({
                diaBanData: res.data
             })
         })
         Dm_DonViService.getAllLinhLuc().then(res => {
            console.log('res linh vuc: ', res);
            this.setState({
                linhVuc: res.data
             })
         })
    }
    render() {
        return (
            <div className="page-contaienr">
               <HeaderPage  onAction={this.handleAtions} />
               <SearchBar title={'Danh mục đơn vị kiểm toán'} onSearch={this.handleSearch}  />
               <div>
                   <MainGrid dataSource={this.state.dataSource} diaBanData={this.state.diaBanData} linhVucData={this.state.linhVuc}  />
                   <Dialog 
                        title="Thêm đơn vị"
                        confirmLabel="Lưu"
                        cancelLabel="Hủy"
                        isShown={true}
                        minHeightContent='300px'
                        width={'60%'}
                        header={() => <h1 style={{
                            fontSize:26
                        }}>Thêm mới dữ liệu</h1>}
                    >
                       <div>
                           
                       </div>
                   </Dialog>
               </div>
            </div>
        )
    }
}

export default Dm_DonViContainer
