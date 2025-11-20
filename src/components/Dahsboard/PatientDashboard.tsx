import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  HStack,
  VStack,
  Button,
  Icon,
  Badge,
} from '@chakra-ui/react';
import {
  Calendar,
  Users,
  Activity,
  Pill,
  TestTube,
  Plus,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  Stethoscope,
} from 'lucide-react';
import type { Appointment } from '../../services/appointment.service';
import { ProfilePatient } from '../../pages/patients/ProfilePatient';
import { Sidebar } from '../Sidebar';

export function PatientDashboard() {
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();
  const [appointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'profile'>('dashboard');

  useEffect(() => {
    // Temporarily disabled until backend endpoint is ready
    // fetchDashboardData();
    setIsLoading(false);
  }, []);

  const isAdmin = user?.role === 'Admin' || user?.role === 'Administrator' || user?.role === 'SuperAdmin';
  const isDoctor = user?.role === 'Doctor' || user?.role === 'Médecin';
  const isPatient = user?.role === 'Patient';

  // Stats configuration based on role
  const getStatsConfig = () => {
    if (isAdmin) {
      return [
        { title: 'Utilisateurs', value: 248, icon: Users, color: 'blue', trend: '+12%' },
        { title: 'Rendez-vous', value: 156, icon: Calendar, color: 'green', trend: '+8%' },
        { title: 'Revenus', value: '45K€', icon: TrendingUp, color: 'purple', trend: '+15%' },
        { title: 'Alertes', value: 8, icon: Bell, color: 'orange', trend: '-3%' },
      ];
    } else if (isDoctor) {
      return [
        { title: 'Patients aujourd\'hui', value: 12, icon: Users, color: 'blue', trend: '' },
        { title: 'Consultations', value: 8, icon: Stethoscope, color: 'green', trend: '' },
        { title: 'En attente', value: 4, icon: Clock, color: 'orange', trend: '' },
        { title: 'Complétées', value: 8, icon: CheckCircle, color: 'purple', trend: '' },
      ];
    } else {
      return [
        { title: 'Rendez-vous', value: appointments.length, icon: Calendar, color: 'blue', trend: '' },
        { title: 'Consultations', value: 12, icon: Activity, color: 'green', trend: '' },
        { title: 'Prescriptions', value: 1, icon: Pill, color: 'purple', trend: '' },
        { title: 'Résultats labo', value: 1, icon: TestTube, color: 'orange', trend: '' },
      ];
    }
  };

  const stats = getStatsConfig();

  return (
    <Box minH="100vh" bg="gray.50">
      <HStack align="start" gap={0}>
        {/* Sidebar */}
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
        />

        {/* Main Content */}
        <Box flex={1} p={6} overflowY="auto" bg="gradient-to-br from-blue-50 to-purple-50">
          {activeView === 'dashboard' ? (
            // Dashboard View
            <>
              {/* Simplified Header */}
              <HStack justify="space-between" mb={6}>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.600">
                    Bonjour! 👋
                  </Text>
                  <Heading size="xl" color="gray.900">
                    Tableau de bord {isPatient ? 'Patient' : isDoctor ? 'Médecin' : isAdmin ? 'Admin' : ''}
                  </Heading>
                </VStack>

                <Button
                  colorScheme="blue"
                  onClick={() => navigate(isAdmin ? '/users' : isDoctor ? '/consultations/new' : '/appointments/new')}
                >
                  <Icon mr={2} asChild>
                    <Plus size={18} />
                  </Icon>
                  {isAdmin ? 'Nouvel utilisateur' : isDoctor ? 'Nouvelle consultation' : 'Nouveau RDV'}
                </Button>
              </HStack>

          {/* Welcome Card */}
          <Card.Root
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            borderRadius="2xl"
            mb={8}
            shadow="xl"
          >
            <Card.Body p={8} color="white">
              <VStack align="stretch" gap={4}>
                <Heading size="lg">
                  {isAdmin ? '🎯 Tableau de bord administrateur' : isDoctor ? '🩺 Tableau de bord médecin' : '💙 Votre espace santé'}
                </Heading>
                <Text fontSize="md" opacity={0.9}>
                  {isAdmin
                    ? 'Gérez votre clinique et suivez les performances en temps réel'
                    : isDoctor
                    ? 'Consultez vos patients et gérez vos rendez-vous du jour'
                    : 'Suivez vos rendez-vous et gérez votre santé en toute simplicité'}
                </Text>
                <HStack gap={3} mt={2}>
                  <Button
                    size="lg"
                    colorScheme="whiteAlpha"
                    onClick={() => navigate(isAdmin ? '/users' : isDoctor ? '/consultations/new' : '/appointments/new')}
                  >
                    <Icon mr={2} asChild>
                      <Plus size={20} />
                    </Icon>
                    {isAdmin ? 'Gérer les utilisateurs' : isDoctor ? 'Nouvelle consultation' : 'Prendre un rendez-vous'}
                  </Button>
                  {isAdmin && (
                    <Button
                      size="lg"
                      colorScheme="whiteAlpha"
                      variant="outline"
                      onClick={() => navigate('/appointments')}
                    >
                      Voir tous les rendez-vous
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Stats Grid */}
          {isLoading ? (
            <Card.Root bg="white" shadow="md" borderRadius="xl" p={8}>
              <VStack gap={3}>
                <Text textAlign="center" color="gray.500" fontSize="lg">
                  Chargement de vos données...
                </Text>
              </VStack>
            </Card.Root>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
                {stats.map((stat, index) => (
                  <Card.Root
                    key={index}
                    bg="white"
                    shadow="lg"
                    borderRadius="xl"
                    border="1px"
                    borderColor={`${stat.color}.100`}
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                  >
                    <Card.Body p={6}>
                      <HStack justify="space-between" mb={3}>
                        <Box p={3} bg={`${stat.color}.100`} borderRadius="lg">
                          <Icon fontSize="2xl" color={`${stat.color}.600`} asChild>
                            <stat.icon />
                          </Icon>
                        </Box>
                        <VStack align="end" gap={0}>
                          <Text fontSize="3xl" fontWeight="bold" color={`${stat.color}.600`}>
                            {stat.value}
                          </Text>
                          {stat.trend && (
                            <Badge colorScheme={stat.trend.startsWith('+') ? 'green' : 'red'} fontSize="xs">
                              {stat.trend}
                            </Badge>
                          )}
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        {stat.title}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>

              {/* Quick Actions */}
              <Card.Root bg="white" shadow="lg" borderRadius="xl" mb={8}>
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <Heading size="md" color="gray.900">
                    Actions rapides
                  </Heading>
                </Card.Header>
                <Card.Body p={6}>
                  <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
                    {isAdmin ? (
                      <>
                        <Button
                          size="lg"
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => navigate('/users')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Users />
                          </Icon>
                          <Text fontSize="sm">Utilisateurs</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="green"
                          variant="outline"
                          onClick={() => navigate('/appointments')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Calendar />
                          </Icon>
                          <Text fontSize="sm">Rendez-vous</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="purple"
                          variant="outline"
                          onClick={() => navigate('/patients')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Activity />
                          </Icon>
                          <Text fontSize="sm">Patients</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="orange"
                          variant="outline"
                          onClick={() => navigate('/documents')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <FileText />
                          </Icon>
                          <Text fontSize="sm">Documents</Text>
                        </Button>
                      </>
                    ) : isDoctor ? (
                      <>
                        <Button
                          size="lg"
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => navigate('/consultations/new')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Stethoscope />
                          </Icon>
                          <Text fontSize="sm">Consultation</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="green"
                          variant="outline"
                          onClick={() => navigate('/appointments')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Calendar />
                          </Icon>
                          <Text fontSize="sm">Mes RDV</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="purple"
                          variant="outline"
                          onClick={() => navigate('/patients')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Users />
                          </Icon>
                          <Text fontSize="sm">Mes patients</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => navigate('/prescriptions')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Pill />
                          </Icon>
                          <Text fontSize="sm">Prescriptions</Text>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="lg"
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => navigate('/appointments/new')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Calendar />
                          </Icon>
                          <Text fontSize="sm">Prendre RDV</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="purple"
                          variant="outline"
                          onClick={() => navigate('/prescriptions')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Pill />
                          </Icon>
                          <Text fontSize="sm">Prescriptions</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="orange"
                          variant="outline"
                          onClick={() => navigate('/lab-orders')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <TestTube />
                          </Icon>
                          <Text fontSize="sm">Résultats labo</Text>
                        </Button>
                        <Button
                          size="lg"
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => navigate('/documents')}
                          h="auto"
                          py={4}
                          flexDirection="column"
                          gap={2}
                        >
                          <Icon fontSize="2xl" asChild>
                            <Activity />
                          </Icon>
                          <Text fontSize="sm">Documents</Text>
                        </Button>
                      </>
                    )}
                  </SimpleGrid>
                </Card.Body>
              </Card.Root>

              {/* Recent Activity */}
              <Card.Root bg="white" shadow="lg" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <HStack justify="space-between">
                    <Heading size="md" color="gray.900">
                      {isAdmin ? 'Activité récente' : isDoctor ? 'Patients du jour' : 'Mes prochains rendez-vous'}
                    </Heading>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => navigate(isAdmin ? '/users' : isDoctor ? '/appointments' : '/appointments')}
                    >
                      Voir tout
                    </Button>
                  </HStack>
                </Card.Header>
                <Card.Body p={6}>
                  {appointments.length === 0 ? (
                    <VStack py={8} gap={3}>
                      <Box p={4} bg="blue.50" borderRadius="full">
                        <Icon fontSize="3xl" color="blue.400" asChild>
                          <Calendar />
                        </Icon>
                      </Box>
                      <Text color="gray.500">
                        {isAdmin ? 'Aucune activité récente' : isDoctor ? 'Aucun patient prévu aujourd\'hui' : 'Aucun rendez-vous prévu'}
                      </Text>
                    </VStack>
                  ) : (
                    <VStack align="stretch" gap={3}>
                      {appointments.map((appointment) => (
                        <Box
                          key={appointment._id}
                          p={4}
                          bg="gray.50"
                          borderRadius="lg"
                          border="1px"
                          borderColor="gray.200"
                          cursor="pointer"
                          transition="all 0.2s"
                          _hover={{ borderColor: 'blue.300', bg: 'blue.50' }}
                          onClick={() => navigate(`/appointments/${appointment._id}`)}
                        >
                          <HStack justify="space-between">
                            <HStack gap={3}>
                              <Box p={2} bg="blue.100" borderRadius="lg">
                                <Icon color="blue.600" asChild>
                                  <Calendar size={20} />
                                </Icon>
                              </Box>
                              <VStack align="start" gap={0}>
                                <Text fontWeight="semibold" color="gray.900">
                                  {isDoctor ? `Patient ${appointment.patientId}` : appointment.doctorId || 'Médecin'}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {new Date(appointment.startTime).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                  })}
                                </Text>
                              </VStack>
                            </HStack>
                            <VStack align="end" gap={0}>
                              <Badge
                                colorScheme={
                                  appointment.status === 'confirmed'
                                    ? 'green'
                                    : appointment.status === 'pending'
                                    ? 'yellow'
                                    : 'gray'
                                }
                              >
                                {appointment.status === 'confirmed'
                                  ? 'Confirmé'
                                  : appointment.status === 'pending'
                                  ? 'En attente'
                                  : appointment.status}
                              </Badge>
                              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                                {new Date(appointment.startTime).toLocaleTimeString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  )}
                </Card.Body>
              </Card.Root>
            </>
          )}
            </>
          ) : (
            // Profile View
            <ProfilePatient onBack={() => setActiveView('dashboard')} />
          )}
        </Box>
      </HStack>
    </Box>
  );
}
