import { get } from '@/axios/http';

export const getDirectory = () => {
    return get(
        '/giturl/repos/fengqichang666/filesManage/contents'
    );
};
export const getBrand = () => {
    return get('/api/selectAll');
};