import axiosDefault, { type AxiosInstance, type AxiosResponse } from "axios";
import { getAccessToken, getRefreshToken, setAccessToken } from "@/services/AuthService";
import type { RotateAccessTokenResponse } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_FISHEMI_API_BASE_URL;

export const axiosNotAuthInstance = (): AxiosInstance => {
    return axiosDefault.create({
        baseURL: API_BASE_URL
    });
}

export const axiosInstance = (): AxiosInstance => {
    const instance = axiosDefault.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        }
    });

    instance.interceptors.request.use(
        (config) => {
            config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {

            if (err.response) {
                // expired access token
                if (err.response.status === 401 && !err.config._retry) {
                    err.config._retry = true;

                    // try to rotate access token
                    try {
                        const accessTokenRotationResponse = await rotateAccessToken();
                        const accessToken = accessTokenRotationResponse.data.access_token;
                        setAccessToken(accessToken);
                        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                        return instance(err.config);
                    } catch (error: any) {

                        // access token rotation failed :(
                        // maybe the refresh token is also expired
                        if (error.response?.data) {
                            return Promise.reject(error.response.data);
                        }

                        return Promise.reject(error);
                    }
                }

                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }

            return Promise.reject(err);
        }
    );

    return instance;
}

const rotateAccessToken = async (): Promise<AxiosResponse<RotateAccessTokenResponse>> => {
    return axiosDefault.post<RotateAccessTokenResponse>(API_BASE_URL + "/account/rotate-access-token", {
        access_token: getAccessToken(),
        refresh_token: getRefreshToken(),
    });
}
