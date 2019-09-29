const AUTH_TOKEN = 'evently-auth-token';

export const persistAuth = (token) => localStorage.setItem(AUTH_TOKEN, token)
export const retriveAuth = () => localStorage.getItem(AUTH_TOKEN)
export const revokeAuth = () => localStorage.removeItem(AUTH_TOKEN)
