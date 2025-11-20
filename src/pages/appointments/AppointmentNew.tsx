import { useState } from 'react';
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
} from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Building, Stethoscope } from 'lucide-react';
import { createAppointment } from '../../services/appointment.service';
import type { CreateAppointmentData } from '../../services/appointment.service';
import { useAuthStore } from '../../stores/authStore';

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
});

const AppointmentNew = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);

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

  // Mock data - À remplacer par des appels API réels
  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologie' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Dermatologie' },
    { id: '3', name: 'Dr. Emily Davis', specialty: 'Médecine générale' },
  ];

  const clinics = [
    { id: '1', name: 'Clinique Centrale', address: '123 Rue Principale' },
    { id: '2', name: 'Centre Médical Nord', address: '456 Avenue du Nord' },
  ];

  const specialties = [
    { id: '1', name: 'Cardiologie' },
    { id: '2', name: 'Dermatologie' },
    { id: '3', name: 'Médecine générale' },
    { id: '4', name: 'Pédiatrie' },
    { id: '5', name: 'Neurologie' },
  ];

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

      await createAppointment(appointmentData);

      toaster.success({
        title: 'Rendez-vous créé',
        description: 'Votre rendez-vous a été créé avec succès',
      });

      navigate('/appointments');
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toaster.error({
        title: 'Erreur',
        description:
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Impossible de créer le rendez-vous',
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
                            <option key={specialty.id} value={specialty.id}>
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
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
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
                            <option key={clinic.id} value={clinic.id}>
                              {clinic.name} - {clinic.address}
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
