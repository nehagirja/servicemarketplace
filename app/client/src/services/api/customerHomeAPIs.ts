import axios, { AxiosResponse } from 'axios';
import CUSTOMAXIOS from '../CustomAxios';

interface QueryParameters {
  serviceType: string;
}

interface ApiResponse {
  data: any[];
}

export const getBatchServiceTypes = async (queryParameters: QueryParameters): Promise<ApiResponse> => {
  const { serviceType } = queryParameters;

  // Retrieve the token from localStorage (or wherever it is stored)
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/service-types`, {
      params: {
        serviceType,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`, // Add token to the header
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching batch service types: ${error}`);
  }
};

interface PopularServiceResponse {
  id: string;
  name: string;
  description: string;
  card_image: string;
}

export const getPopularServiceTypes = async (): Promise<AxiosResponse<PopularServiceResponse[]>> => {
  try {
    const response = await CUSTOMAXIOS.get<PopularServiceResponse[]>(
      `${import.meta.env.VITE_API_URL}/service-types?popular=true`,
    );
    return response;
  } catch (error) {
    console.error("Error fetching popular services:", error);
    throw error;
  }
};

export const getAllServiceProviders = async (): Promise<ApiResponse> => {
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/service-providers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching service providers: ${error}`);
  }
};


interface ServiceTypeResponse {
  id: string;
  name: string;
  description: string;
  otherFields?: any; // Add additional fields as per your backend response
}

export const getServiceTypeById = async (serviceTypeId: string): Promise<ServiceTypeResponse> => {
  // Retrieve the token from localStorage (or wherever it is stored)
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get<ServiceTypeResponse>(
      `${import.meta.env.VITE_API_URL}/service-types/${serviceTypeId}`, // Endpoint URL
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add token to the header
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching service type by ID:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching service type by ID"
    );
  }
};