import { publicRequest } from '../../requestMethods';

export const sendEmail = async (recipient: string) => {
    try {
        const res = await publicRequest.post('/sendemail', {
            recipient,
        });
    } catch (err) {
        console.log(err);
    }
};
