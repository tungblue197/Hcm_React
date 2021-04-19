import { Form } from 'devextreme-react'
import React, { Component } from 'react'
import { Formik} from 'formik';
import { SimpleItem } from 'devextreme-react/form';
import MyTextBox from '../../../../components/control/MyTextBox';
import MyDateBox from '../../../../components/control/MyDateBox';
import MyDropDownBox from '../../../../components/control/MyDropDownBox';
import MyTextArea from '../../../../components/control/MyTextArea';
import TreeList, { Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup } from 'devextreme-react/tree-list';

import * as yup from 'yup';
import { Checkbox } from 'evergreen-ui';


export default class MainForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
            initFormValue: {
                CreatedBy: null,
                CreatedDate: null,
                DiaBan: [],
                DiaChi: null,
                GhiChu: null,
                Id: null,
                IdCha: null,
                IsDelete: false,
                LaDonViCha: false,
                LinhVuc: [],
                Ma: "",
                ModifiedBy: null,
                ModifiedDate: null,
                NgayBatDau: new Date(),
                NgayKetThuc: null,
                Sdt: null,
                Ten: "",
                isCheck: true,
            },
            initTreeOptions: {
                showRowLines:true,
                showBorders: true,
                showColumnLines:true,
                searchPanel: { 
                    visible: true
                }            
            }
        }
        this.validationSchema = yup.object().shape({
            Ma: yup.string().min(1, 'khong 1').max(10, 'Ko vuot 10').required('Mã là trường bắt buộc'),
            Ten: yup.string().required('Tên là trường bắt buộc'),
            

        })
    }
    render() {
        const { formData, diaBanDataSource, linhVucDataSource, donViChaDataSource, bindSubmitForm, onSubmit } = this.props;
        console.log(diaBanDataSource, linhVucDataSource, donViChaDataSource);
        const { initFormValue, initTreeOptions } = this.state;
        return (
            <Formik
                initialValues={formData || initFormValue}
                // validationSchema={this.validationSchema}
                onSubmit={onSubmit}
                
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        bindSubmitForm(handleSubmit);
                        return (
                            <Form colCount={12}>
                                <SimpleItem colSpan={6}>
                                    <MyTextBox maxLength={3} isRequired={true} label="Mã đơn vị" name="Ma" value={values.Ma} showErrors={errors.Ma && touched.Ma} errorMessage={errors.Ma} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyDropDownBox showClearButton={true} dataSource={donViChaDataSource || []} showErrors={errors.IdCha && errors.IdCha} errorMessage={errors.IdCha} isRequired={this.state.isChecked} valueExpr="Id" name="IdCha" displayExpr="Ten" label="Đơn vị cha" value={values.IdCha} onChange={handleChange} onBlur={handleBlur}>
                                        {
                                            ({dataSource, value, onChange}) => {
                                                return (
                                                    <TreeList
                                                        {...initTreeOptions}
                                                        dataSource={dataSource}
                                                        keyExpr="Id"
                                                        parentIdExpr="IdCha"
                                                        onSelectedRowKeysChange={onChange}
                                                        selectedRowKeys={value || []}
                                                        selection={{ mode: 'single' }}
                                                        columns={[
                                                            {
                                                                dataField: 'Ma',
                                                                caption: 'Mã đơn vị'
                                                            },
                                                            {
                                                                dataField: 'Ten',
                                                                caption:"Tên"
                                                            }
                                                        ]}
                                                    />
                                                )
                                            }
                                        }
                                        
                                    </MyDropDownBox>
                                </SimpleItem>
                                
                                <SimpleItem colSpan={6}>
                                    <MyTextBox isRequired={true} label="Tên đơn vị" name="Ten" value={values.Ten} showErrors={errors.Ten && touched.Ten} maxLength={3} errorMessage={errors.Ten} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyDropDownBox  name="LinhVuc" valueExpr="Id" displayExpr="Ten" dataSource={linhVucDataSource || []} label="Lĩnh vực" value={values.LinhVuc} onChange={handleChange} onBlur={handleBlur}>
                                        {
                                            ({dataSource, value,onChange}) => {
                                                return (
                                                    <TreeList
                                                        {...initTreeOptions}
                                                        dataSource={dataSource}
                                                        onSelectedRowKeysChange={onChange}
                                                        selectedRowKeys={value || []}
                                                        selection={{ mode: 'multiple' }}
                                                        keyExpr="Id"
                                                        parentIdExpr="IdCha"
                                                        columns={[
                                                            {
                                                                dataField: 'Ma',
                                                                caption: 'Mã đơn vị'
                                                            },
                                                            {
                                                                dataField: 'Ten',
                                                                caption:"Tên đơn vị"
                                                            }
                                                        ]}
                                                    />
                                                )
                                            }
                                        }
                                        
                                    </MyDropDownBox>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyDateBox name="NgayBatDau" isRequired={true}  label="Ngày bắt đầu" value={values.NgayBatDau} showErrors={errors.NgayBatDau && touched.NgayBatDau} errorMessage={errors.NgayBatDau} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyDropDownBox name="DiaBan" valueExpr="Id" displayExpr="TenDB" dataSource={diaBanDataSource || []} label="Địa bàn" value={values.DiaBan} onChange={handleChange} onBlur={handleBlur}>
                                        {
                                            ({dataSource, value, onChange}) => {
                                                return (
                                                    <TreeList
                                                        {...initTreeOptions}
                                                        dataSource={dataSource}
                                                        onSelectedRowKeysChange={onChange}
                                                        selectedRowKeys={value || []}
                                                        selection={{mode: 'single'}}
                                                        keyExpr="Id"
                                                        columns={[
                                                            {
                                                                dataField: 'MaDB',
                                                                caption: 'Mã địa bàn'
                                                            },
                                                            {
                                                                dataField: 'TenDB',
                                                                caption:"Tên địa bàn"
                                                            }
                                                        
                                                    ]}
                                                    />
                                                )
                                            }
                                        }
                                        
                                    </MyDropDownBox>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyDateBox name="NgayKetThuc"  label="Ngày kết thúc" value={values.NgayKetThuc} showErrors={errors.NgayKetThuc && touched.NgayKetThuc} errorMessage={errors.NgayKetThuc} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                <SimpleItem colSpan={6}>
                                    <MyTextBox name="Sdt"  label="Số điện thoại" value={values.Sdt} showErrors={errors.Sdt && touched.Sdt} errorMessage={errors.Sdt} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                <SimpleItem colSpan={12}>
                                    <MyTextArea name="GhiChu"   label="Ghi chú" value={values.GhiChu} showErrors={errors.GhiChu && touched.GhiChu} errorMessage={errors.GhiChu} onChange={handleChange} onBlur={handleBlur}/>
                                </SimpleItem>
                                
                            </Form>
                            
                        )
                    }
                }
                
            </Formik>
        )
    }
}
