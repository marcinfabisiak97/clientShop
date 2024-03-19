import { publicRequest } from '../../requestMethods';

export const sendEmail = async (recipient: string): Promise<void> => {
    try {
        await publicRequest.post('/sendemail', {
            recipient,
        });
    } catch (err) {
        console.log(err);
    }
};
