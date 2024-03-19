import { publicRequest } from '../../requestMethods';
import { type InterSendData } from './InterfaceSendData';

export const sendData = async (data: InterSendData): Promise<void> => {
    try {
        await publicRequest.post('/sendorderdetails', {
            data,
        });
    } catch (err) {
        console.log(err);
    }
};
