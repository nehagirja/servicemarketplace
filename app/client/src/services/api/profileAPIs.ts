import CUSTOMAXIOS from "../CustomAxios";
import { AxiosResponse } from 'axios';

interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    gender?: string;
    phoneNumber?: string;
    address?: string;
    pin?: string;
    state?: string;
    country?: string;
    profileImage?: string;
}

interface UpdateProfileResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    address: string;
    pin: string;
    state: string;
    country: string;
    role: string;
    updatedAt: string;
    profileImage?: string;
}

export const updateProfileAPI = async (userId: string, updateData: UpdateProfileRequest): Promise<AxiosResponse<UpdateProfileResponse>> => {
    try {
        const response = await CUSTOMAXIOS.patch<UpdateProfileResponse>(`${import.meta.env.VITE_API_URL}/users/${userId}`, updateData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Define the interface for a single user response
interface GetUserByIdResponse {
    lastName: string;
    firstName: string;
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
    profileImage?: string;
}

// Fetch user by ID
export const getUserProfile = async (userId: string): Promise<AxiosResponse<GetUserByIdResponse>> => {
    try {
        const response = await CUSTOMAXIOS.get<GetUserByIdResponse>(
            `${import.meta.env.VITE_API_URL}/users/${userId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
