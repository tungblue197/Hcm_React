import api from '../../../configs/apiConfigs';

class Dm_DonViService {
    constructor(){
        this.api = api;
    }

    static getAll = async () => {
        return await api.get('/Dm_DonVi/GetAll');
    }
    static getAllDiaBan = async () => {
        return await api.get('/Dm_DiaBan/GetAll');
    }
    static getAllLinhLuc = async () => {
        return await api.get('/Dm_LinhVuc/GetAll');
    }

    static Insert = async (values) => {
        return await api.post('/Dm_DonVi/Insert', {  data :{values: JSON.stringify(values)}});
    }
    static Update = async (key, values) => {
        return await api.post('/Dm_DonVi/Update', { key ,values: JSON.stringify(values)});
    }
    static Delete = async (Id) => {
        return await api.post('/Dm_DonVi/Delete', { key : Id});
    }
}

export default Dm_DonViService;