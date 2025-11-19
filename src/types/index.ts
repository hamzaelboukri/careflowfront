export interface User {
  id?: string;
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  specialization?: string;
}

export interface RegisterData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void> | void;
  isLoading: boolean;
  accessToken?: string | null;
}

export default {} as unknown as AuthContextType;
