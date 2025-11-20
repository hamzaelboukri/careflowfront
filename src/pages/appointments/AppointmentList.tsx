import { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Heading,
  Box,
  VStack,
  Button,
  Text,
  HStack,
  SimpleGrid,
  Card,
  Badge,
  Icon,
  Input,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Search, Filter, Clock, User } from 'lucide-react';
import { getMyAppointments } from '../../services/appointment.service';
import type { Appointment } from '../../services/appointment.service';

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, activeTab, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    // Filter by tab
    const now = new Date();
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(
        (apt) =>
          new Date(apt.startTime) >= now &&
          (apt.status === 'pending' || apt.status === 'confirmed')
      );
    } else if (activeTab === 'past') {
      filtered = filtered.filter(
        (apt) => new Date(apt.startTime) < now || apt.status === 'completed'
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.doctorId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date
    filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    setFilteredAppointments(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; colorScheme: string }> = {
      pending: { label: 'En attente', colorScheme: 'yellow' },
      confirmed: { label: 'Confirmé', colorScheme: 'green' },
      cancelled: { label: 'Annulé', colorScheme: 'red' },
      completed: { label: 'Terminé', colorScheme: 'blue' },
    };

    const config = statusConfig[status] || { label: status, colorScheme: 'gray' };
    return <Badge colorScheme={config.colorScheme}>{config.label}</Badge>;
  };

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(
      (apt) =>
        new Date(apt.startTime) >= new Date() &&
        (apt.status === 'pending' || apt.status === 'confirmed')
    ).length,
    completed: appointments.filter((apt) => apt.status === 'completed').length,
    pending: appointments.filter((apt) => apt.status === 'pending').length,
  };

  return (
    <MainLayout>
      <Box maxW="7xl" mx="auto" p={6}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <HStack>
              <Icon fontSize="2xl" color="blue.600" asChild>
                <Calendar />
              </Icon>
              <Heading size="xl" color="gray.800">
                Mes rendez-vous
              </Heading>
            </HStack>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => navigate('/appointments/new')}
            >
              <Icon mr={2} asChild>
                <Plus size={20} />
              </Icon>
              Nouveau rendez-vous
            </Button>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Card.Root bg="white" p={4} shadow="sm" borderRadius="lg">
              <VStack gap={1}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  {stats.total}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Total
                </Text>
              </VStack>
            </Card.Root>
            <Card.Root bg="white" p={4} shadow="sm" borderRadius="lg">
              <VStack gap={1}>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  {stats.upcoming}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  À venir
                </Text>
              </VStack>
            </Card.Root>
            <Card.Root bg="white" p={4} shadow="sm" borderRadius="lg">
              <VStack gap={1}>
                <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
                  {stats.pending}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  En attente
                </Text>
              </VStack>
            </Card.Root>
            <Card.Root bg="white" p={4} shadow="sm" borderRadius="lg">
              <VStack gap={1}>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {stats.completed}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Terminés
                </Text>
              </VStack>
            </Card.Root>
          </SimpleGrid>

          {/* Filters */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {/* Search */}
                <Box>
                  <HStack mb={2}>
                    <Icon color="gray.600" asChild>
                      <Search size={18} />
                    </Icon>
                    <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                      Rechercher
                    </Text>
                  </HStack>
                  <Input
                    placeholder="Médecin, motif..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="lg"
                  />
                </Box>

                {/* Status Filter */}
                <Box>
                  <HStack mb={2}>
                    <Icon color="gray.600" asChild>
                      <Filter size={18} />
                    </Icon>
                    <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                      Statut
                    </Text>
                  </HStack>
                  <NativeSelectRoot size="lg">
                    <NativeSelectField
                      value={statusFilter}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="completed">Terminé</option>
                      <option value="cancelled">Annulé</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>

                {/* Period */}
                <Box>
                  <HStack mb={2}>
                    <Icon color="gray.600" asChild>
                      <Clock size={18} />
                    </Icon>
                    <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                      Période
                    </Text>
                  </HStack>
                  <NativeSelectRoot size="lg">
                    <NativeSelectField
                      value={activeTab}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setActiveTab(e.target.value)}
                    >
                      <option value="all">Tous</option>
                      <option value="upcoming">À venir</option>
                      <option value="past">Passés</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>
              </SimpleGrid>
            </Card.Body>
          </Card.Root>

          {/* Appointments List */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <Heading size="md" color="gray.900">
                Liste des rendez-vous ({filteredAppointments.length})
              </Heading>
            </Card.Header>
            <Card.Body p={6}>
              {isLoading ? (
                <Text textAlign="center" color="gray.500" py={8}>
                  Chargement...
                </Text>
              ) : filteredAppointments.length === 0 ? (
                <VStack py={12} gap={3}>
                  <Icon fontSize="4xl" color="gray.300" asChild>
                    <Calendar />
                  </Icon>
                  <Text fontSize="lg" color="gray.500">
                    Aucun rendez-vous trouvé
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => navigate('/appointments/new')}
                  >
                    Créer un rendez-vous
                  </Button>
                </VStack>
              ) : (
                <VStack align="stretch" gap={4}>
                  {filteredAppointments.map((appointment) => (
                    <Box
                      key={appointment._id}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="lg"
                      cursor="pointer"
                      _hover={{ bg: 'gray.50', borderColor: 'blue.300', shadow: 'sm' }}
                      onClick={() => navigate(`/appointments/${appointment._id}`)}
                      transition="all 0.2s"
                    >
                      <HStack justify="space-between" mb={3}>
                        <HStack>
                          <Box bg="blue.100" p={2} borderRadius="full">
                            <Icon color="blue.600" asChild>
                              <User size={16} />
                            </Icon>
                          </Box>
                          <VStack align="start" gap={0}>
                            <Text fontWeight="bold" color="gray.900">
                              Rendez-vous médical
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {appointment.reason || 'Consultation'}
                            </Text>
                          </VStack>
                        </HStack>
                        <VStack align="end" gap={1}>
                          <Text fontSize="sm" fontWeight="medium" color="gray.900">
                            {new Date(appointment.startTime).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {new Date(appointment.startTime).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        </VStack>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">
                          📍 Clinique
                        </Text>
                        {getStatusBadge(appointment.status)}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default AppointmentList;
