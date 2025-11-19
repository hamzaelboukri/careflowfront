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

export function PatientDashboard() {
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();

  // Mock data - À remplacer par des appels API réels
  const upcomingAppointments = [
    {
      id: '1',
      date: '2025-01-15',
      time: '10:00',
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiologie',
      status: 'confirmed' as const,
      location: 'Cabinet A - Étage 2',
    },
    {
      id: '2',
      date: '2025-01-22',
      time: '14:30',
      doctor: 'Dr. Michael Chen',
      specialization: 'Dermatologie',
      status: 'pending' as const,
      location: 'Cabinet B - Étage 1',
    },
  ];

  const recentRecords = [
    {
      id: '1',
      date: '2025-01-08',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Examen de routine',
      type: 'Consultation générale',
    },
    {
      id: '2',
      date: '2024-12-15',
      doctor: 'Dr. Emily Davis',
      diagnosis: 'Bilan annuel',
      type: 'Soins préventifs',
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
    {
      id: '2',
      medication: 'Ibuprofène 400mg',
      doctor: 'Dr. Michael Chen',
      date: '2024-12-20',
      duration: '5 jours',
      status: 'completed' as const,
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
    {
      id: '2',
      test: 'Test de glycémie',
      date: '2024-12-28',
      status: 'completed' as const,
      result: 'Normal',
    },
  ];

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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
          <StatCard
            title="Rendez-vous à venir"
            value={upcomingAppointments.length}
            icon={Calendar}
            iconColor="blue.600"
            iconBg="blue.100"
          />
          <StatCard
            title="Consultations terminées"
            value={12}
            icon={Activity}
            iconColor="green.600"
            iconBg="green.100"
          />
          <StatCard
            title="Prescriptions actives"
            value={prescriptions.filter((p) => p.status === 'active').length}
            icon={Pill}
            iconColor="purple.600"
            iconBg="purple.100"
          />
          <StatCard
            title="Résultats labo"
            value={labResults.length}
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
                  leftIcon={
                    <Icon>
                      <Plus size={16} />
                    </Icon>
                  }
                >
                  Nouveau
                </Button>
              </HStack>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
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
      </Box>
    </Box>
  );
}
