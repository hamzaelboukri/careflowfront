import api from '../lib/api';

export type MedicalRecord = {
  consultations: Array<{
    _id: string;
    appointmentId: string;
    doctorId: any;
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
    createdAt: string;
    updatedAt: string;
  }>;
  prescriptions: Array<{
    _id: string;
    patientId: string;
    doctorId: any;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    notes?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  labOrders: Array<{
    _id: string;
    patientId: string;
    doctorId: any;
    testType: string;
    status: string;
    results?: any;
    createdAt: string;
    updatedAt: string;
  }>;
  imagingReports: Array<{
    _id: string;
    patientId: string;
    doctorId: any;
    imagingType: string;
    findings?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  allergies: string[];
  chronicDiseases: string[];
  notes?: string;
  lastUpdated: string;
}

export type PatientInfo = {
  _id: string;
  userId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    roleId: any;
  };
  clinicId?: any;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type MedicalRecordResponse = {
  message: string;
  patient: PatientInfo;
  appointments: Array<any>;
  medicalRecord: MedicalRecord;
}

// Récupérer le dossier médical complet d'un patient
export const getMedicalRecord = async (patientId: string): Promise<MedicalRecordResponse> => {
  const response = await api.get(`/api/v1/MedicalRecord/${patientId}`);
  return response.data;
};

export default {
  getMedicalRecord,
};
