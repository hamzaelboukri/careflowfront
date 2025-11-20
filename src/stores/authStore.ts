import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  gender?: 'Male' | 'Female' | 'Other'
  address?: string
  bloodType?: string
  allergies?: string[]
  specialization?: string
  licenseNumber?: string
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'PATIENT' | 'PHARMACIST' | 'LAB_STAFF'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'careflow-auth',
    }
  )
)
