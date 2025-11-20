import { useState, useEffect } from 'react';
import { Calendar, Plus, Bell, Activity, Pill, TestTube } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, SimpleGrid, Card, HStack, VStack, Icon } from '@chakra-ui/react';
import {
  StatCard,
  AppointmentCard,
  MedicalRecordCard,
  PrescriptionCard,
  LabResultCard,
  AlertCard,
} from '../ui';
import { AlertCircle } from 'lucide-react';
import { getUpcomingAppointments } from '../../services/appointment.service';
import type { Appointment } from '../../services/appointment.service';

export function PatientDashboard() {
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // Fetch upcoming appointments from backend
      const upcomingAppts = await getUpcomingAppointments();
      setAppointments(upcomingAppts.slice(0, 3)); // Show only first 3
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for other sections - TODO: Replace with API calls
  const recentRecords = [
    {
      id: '1',
      date: '2025-01-08',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Examen de routine',
      type: 'Consultation générale',
    },
  ];

  const prescriptions = [
    {
      id: '1',
      medication: 'Amoxicilline 500mg',
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-08',
      duration: '7 jours',
      status: 'active' as const,
    },
  ];

  const labResults = [
    {
      id: '1',
      test: 'Analyse sanguine complète',
      date: '2025-01-05',
      status: 'completed' as const,
      result: 'Normal',
    },
  ];

  // Calculate stats from real data
  const stats = {
    upcomingAppointments: appointments.length,
    completedConsultations: 12, // TODO: Fetch from backend
    activePrescriptions: prescriptions.filter((p) => p.status === 'active').length,
    labResults: labResults.length,
  };

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <Box maxW="7xl" mx="auto">
        {/* Header */}
        <VStack align="stretch" mb={8} gap={2}>
          <Heading size="2xl" color="gray.800">
            Bienvenue, {user?.firstName} {user?.lastName}!
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Voici votre aperçu santé pour aujourd'hui
          </Text>
        </VStack>

        {/* Quick Stats */}
        {isLoading ? (
          <Text textAlign="center" color="gray.500" py={8}>
            Chargement...
          </Text>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
              <StatCard
                title="Rendez-vous à venir"
                value={stats.upcomingAppointments}
                icon={Calendar}
                iconColor="blue.600"
                iconBg="blue.100"
              />
              <StatCard
                title="Consultations terminées"
                value={stats.completedConsultations}
                icon={Activity}
                iconColor="green.600"
                iconBg="green.100"
              />
              <StatCard
                title="Prescriptions actives"
                value={stats.activePrescriptions}
                icon={Pill}
                iconColor="purple.600"
                iconBg="purple.100"
              />
              <StatCard
                title="Résultats labo"
                value={stats.labResults}
                icon={TestTube}
                iconColor="orange.600"
                iconBg="orange.100"
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
              {/* Upcoming Appointments */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <HStack justify="space-between">
                    <Heading size="lg" color="gray.900">
                      Rendez-vous à venir
                    </Heading>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigate('/appointments/new')}
                    >
                      <Icon mr={1}>
                        <Plus size={16} />
                      </Icon>
                      Nouveau
                    </Button>
                  </HStack>
                </Card.Header>
                <Card.Body p={6}>
                  {appointments.length === 0 ? (
                    <VStack py={8} gap={3}>
                      <Icon fontSize="3xl" color="gray.300">
                        <Calendar />
                      </Icon>
                      <Text color="gray.500">Aucun rendez-vous à venir</Text>
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => navigate('/appointments/new')}
                      >
                        Prendre un rendez-vous
                      </Button>
                    </VStack>
                  ) : (
                    <>
                      <VStack align="stretch" gap={4}>
                        {appointments.map((appointment) => (
                          <AppointmentCard
                            key={appointment._id}
                            id={appointment._id}
                            date={new Date(appointment.startTime).toISOString().split('T')[0]}
                            time={new Date(appointment.startTime).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            doctor={appointment.doctorId || 'Médecin'}
                            specialization="Consultation"
                            status={appointment.status}
                            location="Clinique"
                            onClick={() => navigate(`/appointments/${appointment._id}`)}
                          />
                        ))}
                      </VStack>
                      <Button
                        w="full"
                        mt={4}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => navigate('/appointments')}
                      >
                        Voir tous les rendez-vous
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card.Root>

              {/* Prescriptions actives */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <HStack justify="space-between">
                <Heading size="lg" color="gray.900">
                  Prescriptions actives
                </Heading>
                <Icon fontSize="xl" color="purple.600">
                  <Pill />
                </Icon>
              </HStack>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {prescriptions
                  .filter((p) => p.status === 'active')
                  .map((prescription) => (
                    <PrescriptionCard
                      key={prescription.id}
                      {...prescription}
                      onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                    />
                  ))}
              </VStack>
              <Button
                w="full"
                mt={4}
                colorScheme="purple"
                variant="outline"
                onClick={() => navigate('/prescriptions')}
              >
                Voir toutes les prescriptions
              </Button>
            </Card.Body>
          </Card.Root>

          {/* Recent Medical Records */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <HStack justify="space-between">
                <Heading size="lg" color="gray.900">
                  Dossiers médicaux récents
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {recentRecords.map((record) => (
                  <MedicalRecordCard
                    key={record.id}
                    {...record}
                    onClick={() => navigate('/documents')}
                    onDownload={() => console.log('Download', record.id)}
                  />
                ))}
              </VStack>
              <Button
                w="full"
                mt={4}
                colorScheme="teal"
                variant="outline"
                onClick={() => navigate('/documents')}
              >
                Voir tous les dossiers
              </Button>
            </Card.Body>
          </Card.Root>

          {/* Lab Results */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <HStack justify="space-between">
                <Heading size="lg" color="gray.900">
                  Résultats de laboratoire
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {labResults.map((result) => (
                  <LabResultCard
                    key={result.id}
                    {...result}
                    onClick={() => navigate(`/lab-orders/${result.id}`)}
                    onDownload={() => console.log('Download', result.id)}
                  />
                ))}
              </VStack>
              <Button
                w="full"
                mt={4}
                colorScheme="orange"
                variant="outline"
                onClick={() => navigate('/lab-orders')}
              >
                Voir tous les résultats
              </Button>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Health Reminders */}
        <Card.Root bg="white" shadow="md" borderRadius="xl" mt={8}>
          <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
            <HStack>
              <Icon fontSize="xl" color="yellow.600">
                <Bell />
              </Icon>
              <Heading size="lg" color="gray.900">
                Rappels santé
              </Heading>
            </HStack>
          </Card.Header>
          <Card.Body p={6}>
            <VStack align="stretch" gap={3}>
              <AlertCard
                variant="warning"
                icon={AlertCircle}
                title="Bilan annuel à effectuer"
                description="Planifiez votre examen médical annuel"
              />
              <AlertCard
                variant="info"
                icon={Activity}
                title="Rappel vaccination"
                description="Vaccin contre la grippe recommandé"
              />
            </VStack>
          </Card.Body>
        </Card.Root>
          </>
        )}
      </Box>
    </Box>
  );
}
