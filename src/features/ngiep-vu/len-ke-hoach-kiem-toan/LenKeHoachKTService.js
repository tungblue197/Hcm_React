import api from '../../../configs/apiConfigs';

class LenKeHoachKTService {
    constructor(){
        this.api = api;
    }

    static getAllDetail = async (key) => {
        return await api.get('/LapKeHoachKiemToan/GetAllDetail', { key });
    }
   
}

export default LenKeHoachKTService;