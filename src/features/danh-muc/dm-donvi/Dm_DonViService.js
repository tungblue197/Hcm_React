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
}

export default Dm_DonViService;