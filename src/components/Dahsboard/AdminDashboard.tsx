import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, SimpleGrid, Card, HStack, VStack, Icon, Badge } from '@chakra-ui/react';
import { Users, Calendar, TrendingUp, AlertTriangle, User, CheckCircle, Settings, Activity, FileText, Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state: any) => state.user);

  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Appointments Today', value: '89', change: '+5%', icon: Calendar, color: 'green' },
    { label: 'Revenue This Month', value: '$45,890', change: '+18%', icon: TrendingUp, color: 'purple' },
    { label: 'System Alerts', value: '3', change: '0%', icon: AlertTriangle, color: 'red' },
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'New patient registration',
      user: 'Sarah Johnson',
      time: '5 minutes ago',
      type: 'registration',
    },
    {
      id: '2',
      action: 'Appointment scheduled',
      user: 'Dr. Michael Chen',
      time: '12 minutes ago',
      type: 'appointment',
    },
    {
      id: '3',
      action: 'Medical record updated',
      user: 'Dr. Emily Davis',
      time: '1 hour ago',
      type: 'record',
    },
  ];

  const systemAlerts = [
    {
      id: '1',
      message: 'Server maintenance scheduled for tonight at 2 AM',
      type: 'maintenance',
      priority: 'medium',
    },
    {
      id: '2',
      message: 'Payment gateway temporarily unavailable',
      type: 'payment',
      priority: 'high',
    },
    {
      id: '3',
      message: 'Backup completed successfully',
      type: 'backup',
      priority: 'low',
    },
  ];

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'blue.600',
      green: 'green.600',
      purple: 'purple.600',
      red: 'red.600',
    };
    return colors[color] || 'gray.600';
  };

  const getIconBg = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'blue.100',
      green: 'green.100',
      purple: 'purple.100',
      red: 'red.100',
    };
    return colors[color] || 'gray.100';
  };

  const getPriorityColors = (priority: string) => {
    if (priority === 'high') return { bg: 'red.50', border: 'red.200', text: 'red.800', badge: 'red' };
    if (priority === 'medium') return { bg: 'yellow.50', border: 'yellow.200', text: 'yellow.800', badge: 'yellow' };
    return { bg: 'green.50', border: 'green.200', text: 'green.800', badge: 'green' };
  };

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <Box maxW="7xl" mx="auto">
        {/* Header */}
        <VStack align="stretch" mb={8} gap={2}>
          <Heading size="2xl" color="gray.800">
            Tableau de bord Admin
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Bienvenue, {user?.firstName} {user?.lastName}! Vue d'ensemble du système
          </Text>
        </VStack>

        {/* System Stats */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card.Root key={index} bg="white" shadow="md" borderRadius="xl" p={6} _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.3s">
                <HStack justify="space-between">
                  <VStack align="start" gap={1}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">
                      {stat.label}
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color="gray.900">
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" color="green.600">
                      {stat.change} du mois dernier
                    </Text>
                  </VStack>
                  <Box bg={getIconBg(stat.color)} p={3} borderRadius="lg">
                    <Icon fontSize="2xl" color={getIconColor(stat.color)}>
                      <IconComponent />
                    </Icon>
                  </Box>
                </HStack>
              </Card.Root>
            );
          })}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={8}>
          {/* Recent Activity */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <Heading size="lg" color="gray.900">
                Activité récente
              </Heading>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {recentActivity.map((activity) => (
                  <HStack key={activity.id} p={4} border="1px" borderColor="gray.200" borderRadius="lg" _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                    <Box bg="blue.100" p={2} borderRadius="full">
                      <Icon color="blue.600">
                        {activity.type === 'registration' && <User size={16} />}
                        {activity.type === 'appointment' && <Calendar size={16} />}
                        {activity.type === 'record' && <CheckCircle size={16} />}
                      </Icon>
                    </Box>
                    <VStack align="start" flex={1} gap={0}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">
                        {activity.action}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        par {activity.user}
                      </Text>
                    </VStack>
                    <Text fontSize="xs" color="gray.500">
                      {activity.time}
                    </Text>
                  </HStack>
                ))}
              </VStack>
              <Button w="full" mt={4} colorScheme="blue" size="lg">
                Voir toute l'activité
              </Button>
            </Card.Body>
          </Card.Root>

          {/* System Alerts */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <Heading size="lg" color="gray.900">
                Alertes système
              </Heading>
            </Card.Header>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                {systemAlerts.map((alert) => {
                  const colors = getPriorityColors(alert.priority);
                  return (
                    <Box key={alert.id} p={4} bg={colors.bg} border="1px" borderColor={colors.border} borderRadius="lg">
                      <HStack mb={2}>
                        <Icon color={colors.text}>
                          <AlertTriangle size={16} />
                        </Icon>
                        <Text fontSize="sm" fontWeight="medium" color={colors.text}>
                          {alert.message}
                        </Text>
                      </HStack>
                      <Badge colorScheme={colors.badge}>{alert.priority} priority</Badge>
                    </Box>
                  );
                })}
              </VStack>
              <Button w="full" mt={4} colorScheme="blue" size="lg">
                Gérer les alertes
              </Button>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card.Root bg="white" shadow="md" borderRadius="xl">
          <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
            <Heading size="lg" color="gray.900">
              Actions rapides
            </Heading>
          </Card.Header>
          <Card.Body p={6}>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Button
                onClick={() => navigate('/users')}
                h="auto"
                py={6}
                flexDirection="column"
                variant="outline"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Icon fontSize="3xl" color="blue.600" mb={2}>
                  <Users />
                </Icon>
                <Text fontSize="sm" fontWeight="medium" color="gray.900">
                  Gérer les utilisateurs
                </Text>
              </Button>

              <Button
                onClick={() => navigate('/appointments')}
                h="auto"
                py={6}
                flexDirection="column"
                variant="outline"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Icon fontSize="3xl" color="green.600" mb={2}>
                  <Calendar />
                </Icon>
                <Text fontSize="sm" fontWeight="medium" color="gray.900">
                  Voir l'agenda
                </Text>
              </Button>

              <Button
                onClick={() => navigate('/patients')}
                h="auto"
                py={6}
                flexDirection="column"
                variant="outline"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Icon fontSize="3xl" color="purple.600" mb={2}>
                  <FileText />
                </Icon>
                <Text fontSize="sm" fontWeight="medium" color="gray.900">
                  Rapports
                </Text>
              </Button>

              <Button
                h="auto"
                py={6}
                flexDirection="column"
                variant="outline"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Icon fontSize="3xl" color="red.600" mb={2}>
                  <Activity />
                </Icon>
                <Text fontSize="sm" fontWeight="medium" color="gray.900">
                  Santé du système
                </Text>
              </Button>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  );
}