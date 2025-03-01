export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export function saveTokens(res: Record<string, any>) {
    localStorage.setItem(ACCESS_TOKEN, res.access_token);
    localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
}

export function resetTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}
