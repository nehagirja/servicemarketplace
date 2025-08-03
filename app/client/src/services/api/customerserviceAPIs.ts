import CUSTOMAXIOS from "../CustomAxios";
import { AxiosResponse } from 'axios';

interface GetAllUsersResponse {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber?: number;
    address?: string;
    pin?: number;
    state?: string;
    country?: string;
    role: string;
    hourly_rate?: number;
    service_type?: string;
    business_name?: string;
    createdAt: string;
    lastLogin?: string;
}

interface MetaData {
    current_page: number;
    total_pages: number;
    total_items: number;
}
interface GetServiceProvidersAPIResponse {
    items: GetAllUsersResponse[];
    metadata: MetaData; // Adjust if the API provides additional fields like count
}

export const getServiceProvidersAPI = async (): Promise<AxiosResponse<GetServiceProvidersAPIResponse>> => {
    try {
        const response = await CUSTOMAXIOS.get<GetServiceProvidersAPIResponse>(
            `${import.meta.env.VITE_API_URL}/users/?role=service-provider`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

