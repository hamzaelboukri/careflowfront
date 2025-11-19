import api from './api';

export async function login(email: string, password: string) {
  const res = await api.post('/api/v1/auth/login', { email, password });
  return res.data;
}

export async function register(data: any) {
  const res = await api.post('/api/v1/auth/register', data);
  return res.data;
}

export async function refreshToken() {
  const res = await api.post('/api/v1/auth/refresh-token');
  return res.data;
}

export async function logout() {
  const res = await api.post('/api/v1/auth/logout');
  localStorage.removeItem('careflow_token');
  localStorage.removeItem('careflow_user');
  return res.data;
}

export async function getProfile(accessToken?: string) {
  if (accessToken) {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3010'}/api/v1/auth/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }
  const res = await api.get('/api/v1/auth/profile');
  return res.data;
}

export default { login, register, refreshToken, logout };
