import { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Heading,
  Box,
  VStack,
  Input,
  Button,
  Text,
  NativeSelectRoot,
  NativeSelectField,
  Textarea,
  SimpleGrid,
  Card,
  HStack,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Building, Stethoscope, AlertCircle } from 'lucide-react';
import { createAppointment } from '../../services/appointment.service';
import type { CreateAppointmentData } from '../../services/appointment.service';
import { useAuthStore } from '../../stores/authStore';
import api from '../../lib/api';

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
});

const AppointmentNew = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // State for API data
  const [doctors, setDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);

  const [formData, setFormData] = useState<Partial<CreateAppointmentData>>({
    patientId: user?.id || user?._id || '',
    doctorId: '',
    clinicId: '',
    specialtyId: '',
    startTime: '',
    endTime: '',
    reason: '',
    notes: '',
  });

  // Fetch doctors, clinics, and specialties from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setDataError(null);
      
      try {
        // Fetch all data in parallel
        const [doctorsRes, clinicsRes, specialtiesRes] = await Promise.allSettled([
          api.get('/api/v1/users?role=DOCTOR').catch(() => ({ data: [] })),
          api.get('/api/v1/clinics').catch(() => ({ data: [] })),
          api.get('/api/v1/specialties').catch(() => ({ data: [] })),
        ]);

        // Extract doctors
        if (doctorsRes.status === 'fulfilled') {
          const doctorData = doctorsRes.value.data;
          setDoctors(Array.isArray(doctorData) ? doctorData : doctorData.users || []);
        }

        // Extract clinics
        if (clinicsRes.status === 'fulfilled') {
          const clinicData = clinicsRes.value.data;
          setClinics(Array.isArray(clinicData) ? clinicData : clinicData.clinics || []);
        }

        // Extract specialties
        if (specialtiesRes.status === 'fulfilled') {
          const specialtyData = specialtiesRes.value.data;
          setSpecialties(Array.isArray(specialtyData) ? specialtyData : specialtyData.specialties || []);
        }

        console.log('📊 Fetched data:', { 
          doctors: doctorsRes.status === 'fulfilled' ? doctorsRes.value.data : 'failed',
          clinics: clinicsRes.status === 'fulfilled' ? clinicsRes.value.data : 'failed',
          specialties: specialtiesRes.status === 'fulfilled' ? specialtiesRes.value.data : 'failed'
        });

      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setDataError('Impossible de charger les données. Veuillez réessayer.');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-calculate endTime (30 minutes after startTime)
    if (name === 'startTime' && value) {
      const start = new Date(value);
      const end = new Date(start.getTime() + 30 * 60000); // +30 minutes
      setFormData((prev) => ({
        ...prev,
        startTime: value,
        endTime: end.toISOString().slice(0, 16),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.doctorId ||
      !formData.clinicId ||
      !formData.specialtyId ||
      !formData.startTime
    ) {
      toaster.error({
        title: 'Erreur de validation',
        description: 'Veuillez remplir tous les champs obligatoires',
      });
      return;
    }

    setIsLoading(true);

    try {
      const appointmentData: CreateAppointmentData = {
        doctorId: formData.doctorId!,
        patientId: formData.patientId!,
        clinicId: formData.clinicId!,
        specialtyId: formData.specialtyId!,
        startTime: new Date(formData.startTime!).toISOString(),
        endTime: new Date(formData.endTime!).toISOString(),
        reason: formData.reason,
        notes: formData.notes,
      };

      console.log('📤 Sending appointment data:', appointmentData);

      await createAppointment(appointmentData);

      toaster.success({
        title: 'Rendez-vous créé',
        description: 'Votre rendez-vous a été créé avec succès',
      });

      navigate('/appointments');
    } catch (error: any) {
      console.error('❌ Error creating appointment:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.details ||
                          (typeof error.response?.data === 'string' ? error.response?.data : null) ||
                          'Impossible de créer le rendez-vous';
      
      toaster.error({
        title: 'Erreur',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box maxW="4xl" mx="auto" p={6}>
        <VStack align="stretch" gap={6}>
          <HStack>
            <Icon fontSize="2xl" color="blue.600" asChild>
              <Calendar />
            </Icon>
            <Heading size="xl" color="gray.800">
              Nouveau rendez-vous
            </Heading>
          </HStack>

          {/* Loading State */}
          {isLoadingData && (
            <Card.Root bg="blue.50" borderColor="blue.300" borderWidth="1px">
              <Card.Body p={4}>
                <HStack gap={3}>
                  <Spinner size="sm" color="blue.600" />
                  <Text fontSize="sm" color="blue.800">
                    Chargement des données (médecins, cliniques, spécialités)...
                  </Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          )}

          {/* Error State */}
          {dataError && (
            <Card.Root bg="red.50" borderColor="red.300" borderWidth="1px">
              <Card.Body p={4}>
                <HStack gap={2}>
                  <Icon color="red.600" asChild>
                    <AlertCircle size={20} />
                  </Icon>
                  <VStack align="start" gap={0} flex={1}>
                    <Text fontWeight="bold" color="red.900" fontSize="sm">
                      Erreur de chargement
                    </Text>
                    <Text fontSize="xs" color="red.800">
                      {dataError}
                    </Text>
                  </VStack>
                  <Button size="sm" colorScheme="red" variant="outline" onClick={() => window.location.reload()}>
                    Réessayer
                  </Button>
                </HStack>
              </Card.Body>
            </Card.Root>
          )}

          {/* Info message when no data */}
          {!isLoadingData && !dataError && (doctors.length === 0 || clinics.length === 0 || specialties.length === 0) && (
            <Card.Root bg="orange.50" borderColor="orange.300" borderWidth="1px">
              <Card.Body p={4}>
                <HStack gap={2}>
                  <Text fontSize="lg">⚠️</Text>
                  <VStack align="start" gap={0} flex={1}>
                    <Text fontWeight="bold" color="orange.900" fontSize="sm">
                      Données manquantes
                    </Text>
                    <Text fontSize="xs" color="orange.800">
                      {doctors.length === 0 && 'Aucun médecin disponible. '}
                      {clinics.length === 0 && 'Aucune clinique disponible. '}
                      {specialties.length === 0 && 'Aucune spécialité disponible. '}
                      Contactez l'administrateur.
                    </Text>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          )}

          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {/* Spécialité */}
                    <Box>
                      <HStack mb={2}>
                        <Icon color="purple.600" asChild>
                          <Stethoscope size={18} />
                        </Icon>
                        <Text fontWeight="semibold" color="gray.700">
                          Spécialité *
                        </Text>
                      </HStack>
                      <NativeSelectRoot size="lg">
                        <NativeSelectField
                          name="specialtyId"
                          value={formData.specialtyId}
                          onChange={handleChange}
                          placeholder="Sélectionnez une spécialité"
                        >
                          <option value="">Sélectionnez une spécialité</option>
                          {specialties.map((specialty) => (
                            <option key={specialty._id || specialty.id} value={specialty._id || specialty.id}>
                              {specialty.name}
                            </option>
                          ))}
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>

                    {/* Médecin */}
                    <Box>
                      <HStack mb={2}>
                        <Icon color="blue.600" asChild>
                          <User size={18} />
                        </Icon>
                        <Text fontWeight="semibold" color="gray.700">
                          Médecin *
                        </Text>
                      </HStack>
                      <NativeSelectRoot size="lg">
                        <NativeSelectField
                          name="doctorId"
                          value={formData.doctorId}
                          onChange={handleChange}
                          placeholder="Sélectionnez un médecin"
                        >
                          <option value="">Sélectionnez un médecin</option>
                          {doctors.map((doctor) => (
                            <option key={doctor._id || doctor.id} value={doctor._id || doctor.id}>
                              {doctor.firstName && doctor.lastName 
                                ? `Dr. ${doctor.firstName} ${doctor.lastName}`
                                : doctor.name || doctor.email}
                              {doctor.specialization && ` - ${doctor.specialization}`}
                            </option>
                          ))}
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>

                    {/* Clinique */}
                    <Box>
                      <HStack mb={2}>
                        <Icon color="teal.600" asChild>
                          <Building size={18} />
                        </Icon>
                        <Text fontWeight="semibold" color="gray.700">
                          Clinique *
                        </Text>
                      </HStack>
                      <NativeSelectRoot size="lg">
                        <NativeSelectField
                          name="clinicId"
                          value={formData.clinicId}
                          onChange={handleChange}
                          placeholder="Sélectionnez une clinique"
                        >
                          <option value="">Sélectionnez une clinique</option>
                          {clinics.map((clinic) => (
                            <option key={clinic._id || clinic.id} value={clinic._id || clinic.id}>
                              {clinic.name}
                              {clinic.address && ` - ${clinic.address}`}
                            </option>
                          ))}
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>

                    {/* Date et heure */}
                    <Box>
                      <HStack mb={2}>
                        <Icon color="orange.600" asChild>
                          <Clock size={18} />
                        </Icon>
                        <Text fontWeight="semibold" color="gray.700">
                          Date et heure *
                        </Text>
                      </HStack>
                      <Input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        size="lg"
                        required
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </Box>
                  </SimpleGrid>

                  {/* Motif de consultation */}
                  <Box>
                    <Text mb={2} fontWeight="semibold" color="gray.700">
                      Motif de consultation
                    </Text>
                    <Input
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Ex: Consultation de suivi, symptômes..."
                      size="lg"
                    />
                  </Box>

                  {/* Notes additionnelles */}
                  <Box>
                    <Text mb={2} fontWeight="semibold" color="gray.700">
                      Notes additionnelles
                    </Text>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Informations complémentaires..."
                      rows={4}
                      size="lg"
                    />
                  </Box>

                  {/* Résumé */}
                  {formData.startTime && formData.endTime && (
                    <Box p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
                      <Text fontWeight="semibold" color="blue.800" mb={2}>
                        📅 Résumé du rendez-vous
                      </Text>
                      <VStack align="start" gap={1} fontSize="sm" color="blue.700">
                        <Text>
                          <strong>Début:</strong>{' '}
                          {new Date(formData.startTime).toLocaleString('fr-FR', {
                            dateStyle: 'full',
                            timeStyle: 'short',
                          })}
                        </Text>
                        <Text>
                          <strong>Fin:</strong>{' '}
                          {new Date(formData.endTime).toLocaleString('fr-FR', {
                            dateStyle: 'full',
                            timeStyle: 'short',
                          })}
                        </Text>
                        <Text>
                          <strong>Durée:</strong> 30 minutes
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  {/* Boutons d'action */}
                  <HStack justify="flex-end" gap={4} pt={4}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/appointments')}
                      disabled={isLoading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      loading={isLoading}
                      loadingText="Création..."
                      disabled={isLoadingData}
                    >
                      Créer le rendez-vous
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default AppointmentNew;
