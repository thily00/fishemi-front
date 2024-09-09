import router from "@/router";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Setters
 */
export const setAccessToken = (accessToken: string): void => { localStorage.setItem(ACCESS_TOKEN_KEY, accessToken); }
export const setRefreshToken = (refreshToken: string): void => { localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken); }

/**
 * Delete
 */
export const deleteAccessToken = (): void => { localStorage.removeItem(ACCESS_TOKEN_KEY); }
export const deleteRefreshToken = (): void => { localStorage.removeItem(REFRESH_TOKEN_KEY); }

/**
 * Getters
 */
export const getAccessToken = (): string | null => { return localStorage.getItem(ACCESS_TOKEN_KEY); }
export const getRefreshToken = (): string | null => { return localStorage.getItem(REFRESH_TOKEN_KEY); }

/**
 * Check if the user is authenticated.
 */
export const isAuthenticated = async (): Promise<boolean> => {
    // retrieve access and refresh token
    // and check that they are not null
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
        return false;
    }

    try {
        // decode access and refresh token
        const accessJwt = jwtDecode(accessToken);
        const accessJwtExpired = isJwtExpired(accessJwt);

        // if access token is expired
        if (accessJwtExpired) {
            const refreshJwt = jwtDecode(refreshToken);
            const refreshJwtExpired = isJwtExpired(refreshJwt);

            // if refresh token is expired
            // log out the user (should redirect to login page)
            if (refreshJwtExpired) {
                await logOut();
                return false;
            }
        }

        return !!accessJwt;
    } catch (e) {
        return false;
    }
}

/**
 * Delete access and refresh token and redirect to login page.
 */
export const logOut = async () => {
    deleteAccessToken();
    deleteRefreshToken();
    await router.push({ path: "/login" });
};


/**
 * Check if a JWT (access or refresh) is expired.
 * @param jwt JWT payload to check.
 */
const isJwtExpired = (jwt: JwtPayload) => {
    return jwt?.exp && Math.floor(Date.now() / 1000) > jwt.exp;
};
