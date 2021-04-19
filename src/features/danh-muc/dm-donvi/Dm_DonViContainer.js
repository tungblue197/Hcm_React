import { DataGrid, DateBox, DropDownBox, TextArea, TextBox, TreeList } from 'devextreme-react';
import { Column, RequiredRule } from 'devextreme-react/data-grid';
import Form, { Label, SimpleItem } from 'devextreme-react/form';
import NumberBox from 'devextreme-react/number-box';
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';



import { Dialog, Heading, toaster } from 'evergreen-ui';
import React, { PureComponent } from 'react'
import HeaderPage from '../../../components/header-page/HeaderPage';
import SearchBar from '../../../components/search-bar/SearchBar';
import Dm_DonViService from './Dm_DonViService';
import MainGrid from './local-components/MainGrid';

import MainForm from './local-components/MainForm';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './Dm_DonVi.scss';



export class Dm_DonViContainer extends PureComponent {
    constructor(props){
        super(props);
        this.mainGridRef = null;
        this.formRef = null;
        this.state = {
            dataSource: [],
            diaBanData: [],
            linhVucData: [],
            isLoading: false,
            selectedValue: null,
            mode: 'view',
            isShowModel: false,
            saving: false,
            nontify: {
                show: false,
                message: '',
                title: 'Thông báo'
            }
        }
        this.submitAction = null;
    }
    componentDidMount(){
        this.loadDonVi();
        this.loadLookupData();
    }

    handleSearch = (text) => {
        const { gridRef } = this.mainGridRef;
        gridRef.instance.searchByText(text);
    }
    handleAtions = (action) => {
        console.log('action : ', action);
        if(action === 'Sua') {
            this.setState((oldState) => {
                return { isShowModel: true, mode: 'update' }
            })
        }else if(action === 'Them'){
            this.setState((oldState) => {
                return { isShowModel: true, selectedValue: null, mode: 'insert' }
            })
        }else if(action === 'Xoa'){
            this.setState((oldState) => {
                return {  mode: 'view' }
            })
            confirmAlert({
                title: 'Thông báo !',
                message: 'Bạn có thực sự muốn xoá',
                buttons: [
                    {
                    label: 'Có',
                    onClick: this.handleDelete
                    },
                    {
                    label: 'Không',
                    }
                ]
            })
        }
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
             this.setState({
                diaBanData: res.data
             })
         })
         Dm_DonViService.getAllLinhLuc().then(res => {
            this.setState({
                linhVucData: res.data
             })
         })
    }
    selectedTemplateKeyChanged = (e, tree) => {
        const { selectedValue } = this.state;
        if(tree === 'dia-ban'){
            this.setState({
                selectedValue: {
                    ...selectedValue,
                    DiaBan: e
                }
            })
        }
    }

    selectedRowChanged = (e) => {
        let data = e.selectedRowsData[0];
        this.setState({ selectedValue: data});
    }



    bindSubmitForm = (submitAction) => {
        this.submitAction = submitAction;
    }

    handleSubmitForm = () => {
        this.submitAction();
    }
    onSubmit = (values, options) => {
        const { mode } = this.state;
        if(mode === 'insert'){
            Dm_DonViService.Insert(values).then(respon => {
                console.log(respon);
                if(!respon.data.success) toaster.danger(respon.data.message, { duration: 3 });
            })
        }else if(mode === 'update'){
            Dm_DonViService.Update(values.Id, values).then(respon => {
                console.log(respon);
                if(!respon.data.success) toaster.danger(respon.data.message, { duration: 3 });
            })
        }
    }
    handleDelete = () => {
        const { Id } = this.state.selectedValue;
        console.log('Id : ', Id);
        if(Id) {
            Dm_DonViService.Delete(Id).then(respon => {
                console.log(respon);
                if(!respon.data.success) toaster.danger(respon.data.message, { duration: 3 });
            })
        }
    }
   

    render() {
        const {dataSource, linhVucData, diaBanData, saving } = this.state;
        return (
            <div className="page-contaienr">
               <HeaderPage  onAction={this.handleAtions} />
               <SearchBar title={'Danh mục đơn vị kiểm toán'} onSearch={this.handleSearch}  />
               <div>
                   <MainGrid ref={ref => this.mainGridRef = ref} dataSource={dataSource} diaBanData={diaBanData} linhVucData={linhVucData} selectedRowChanged={this.selectedRowChanged}  />
                   <Dialog 
                        title="Thêm đơn vị"
                        confirmLabel={'Lưu'}
                        isConfirmLoading={saving}
                        cancelLabel="Hủy"
                        isShown={this.state.isShowModel}
                        onCloseComplete={() => this.setState({isShowModel: false})}
                        width={'60%'}
                        onConfirm={this.handleSubmitForm}
                        header={() => <Heading >Thêm mới đơn vị</Heading>
                        }
                    >
                       <div>
                           <MainForm onSubmit={this.onSubmit} bindSubmitForm={this.bindSubmitForm} formData={this.state.selectedValue} diaBanDataSource={diaBanData} donViChaDataSource={dataSource} linhVucDataSource={linhVucData}/>
                       </div>
                   </Dialog>
                   
               </div>
            </div>
        )
    }
}

export default Dm_DonViContainer
