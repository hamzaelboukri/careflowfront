import api from '../lib/api';

export type Consultation = {
  _id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  vitals?: {
    height?: number;
    weight?: number;
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
  };
  diagnosis?: string;
  procedures?: Array<{
    name: string;
    code?: string;
  }>;
  notes?: string;
  attachments?: Array<{
    fileName: string;
    fileUrl: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateConsultationData = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  vitals?: {
    height?: number;
    weight?: number;
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
  };
  diagnosis?: string;
  procedures?: Array<{
    name: string;
    code?: string;
  }>;
  notes?: string;
  files?: File[];
}

// Créer une nouvelle consultation
export const createConsultation = async (data: CreateConsultationData): Promise<Consultation> => {
  const formData = new FormData();
  
  // Append basic fields
  formData.append('appointmentId', data.appointmentId);
  formData.append('doctorId', data.doctorId);
  formData.append('patientId', data.patientId);
  
  // Append vitals as JSON
  if (data.vitals) {
    formData.append('vitals', JSON.stringify(data.vitals));
  }
  
  // Append diagnosis
  if (data.diagnosis) {
    formData.append('diagnosis', data.diagnosis);
  }
  
  // Append procedures as JSON
  if (data.procedures && data.procedures.length > 0) {
    formData.append('procedures', JSON.stringify(data.procedures));
  }
  
  // Append notes
  if (data.notes) {
    formData.append('notes', data.notes);
  }
  
  // Append files
  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append('files', file);
    });
  }
  
  const response = await api.post('/api/v1/consultations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.consultation || response.data;
};

// Récupérer toutes les consultations (à implémenter côté backend)
export const getConsultations = async (): Promise<Consultation[]> => {
  const response = await api.get('/api/v1/consultations');
  return response.data.consultations || response.data;
};

// Récupérer une consultation par ID (à implémenter côté backend)
export const getConsultationById = async (id: string): Promise<Consultation> => {
  const response = await api.get(`/api/v1/consultations/${id}`);
  return response.data.consultation || response.data;
};

// Récupérer les consultations d'un patient (à implémenter côté backend)
export const getConsultationsByPatient = async (patientId: string): Promise<Consultation[]> => {
  const response = await api.get(`/api/v1/consultations/patient/${patientId}`);
  return response.data.consultations || response.data;
};

export default {
  createConsultation,
  getConsultations,
  getConsultationById,
  getConsultationsByPatient,
};
