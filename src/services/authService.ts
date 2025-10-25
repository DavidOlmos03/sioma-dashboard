import axiosInstance from "../api/axiosConfig";

const login = async (email: string, password: string): Promise<{ token: string }> => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await axiosInstance.post('/admin/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { access_token } = response.data;

  if (access_token) {
    localStorage.setItem('token', access_token); // Store access_token as 'token'
    return { token: access_token };
  } else {
    throw new Error('Access token not found in login response');
  }
};

const logout = (): void => {
  localStorage.removeItem('token');
};

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const authService = {
  login,
  logout,
  isAuthenticated,
};

export default authService;
