import { get, post, put } from '@/axios/http';

export const login = (data: any) => {
    return post('/api/admin/employee/login', data);
};
export const logout = () => {
    return post('/api/admin/employee/logout');
};

interface EmployeePageQueryDTO {
    name: string,
    page: number,
    pageSize: number
}
interface EmployeeDTO {
    username: string;
    name: string;
    phone: string;
    sex: string;
    idNumber: string;
    id?: string;
}
interface employeeDisabledDTO {
    status: number,
    id: number
}

export const employeeQuery = (data: EmployeePageQueryDTO) => {
    return get('/api/admin/employee/page', data);
};
export const employeeInfo = (id: string) => {
    return get(`/api/admin/employee/${id}`);
};
export const employeeEdit = (data: EmployeeDTO) => {
    return put('/api/admin/employee', data);
};
export const employeeAdd = (data: EmployeeDTO) => {
    return post('/api/admin/employee', data);
};
export const employeeDisabled = (data: employeeDisabledDTO) => {
    return post(`/api/admin/employee/status/${data.status}?id=${data.id}`);
};