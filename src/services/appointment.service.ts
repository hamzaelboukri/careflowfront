import api from '../lib/api';

export type Appointment = {
  _id: string;
  doctorId: string;
  patientId: string;
  clinicId: string;
  specialtyId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  reason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateAppointmentData = {
  doctorId: string;
  patientId: string;
  clinicId: string;
  specialtyId: string;
  startTime: string;
  endTime: string;
  reason?: string;
  notes?: string;
}

// Créer un nouveau rendez-vous
export const createAppointment = async (data: CreateAppointmentData): Promise<Appointment> => {
  const response = await api.post('/api/v1/appointments', data);
  return response.data;
};

// Récupérer les rendez-vous par statut
export const getAppointmentsByStatus = async (
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  specialtyId?: string
): Promise<Appointment[]> => {
  const params: any = { status };
  if (specialtyId) {
    params.specialtyId = specialtyId;
  }
  
  const response = await api.get('/api/v1/appointments', { params });
  return response.data.appointments || response.data;
};

// Récupérer tous les rendez-vous de l'utilisateur
export const getMyAppointments = async (): Promise<Appointment[]> => {
  try {
    // Récupérer tous les statuts
    const [pending, confirmed, completed] = await Promise.all([
      getAppointmentsByStatus('pending'),
      getAppointmentsByStatus('confirmed'),
      getAppointmentsByStatus('completed'),
    ]);
    
    return [...pending, ...confirmed, ...completed];
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Récupérer les rendez-vous à venir
export const getUpcomingAppointments = async (): Promise<Appointment[]> => {
  const [pending, confirmed] = await Promise.all([
    getAppointmentsByStatus('pending'),
    getAppointmentsByStatus('confirmed'),
  ]);
  
  return [...pending, ...confirmed].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
};

export default {
  createAppointment,
  getAppointmentsByStatus,
  getMyAppointments,
  getUpcomingAppointments,
};
