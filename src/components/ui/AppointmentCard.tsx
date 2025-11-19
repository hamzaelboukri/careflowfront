import { Box, HStack, VStack, Text, Badge } from '@chakra-ui/react';
import { Calendar, Clock } from 'lucide-react';

interface AppointmentCardProps {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialization: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  onClick?: () => void;
}

export function AppointmentCard({
  date,
  time,
  doctor,
  specialization,
  location,
  status,
  onClick,
}: AppointmentCardProps) {
  const statusConfig = {
    confirmed: { color: 'green', icon: Clock, label: 'Confirmé' },
    pending: { color: 'yellow', icon: Clock, label: 'En attente' },
    cancelled: { color: 'red', icon: Clock, label: 'Annulé' },
  };

  const config = statusConfig[status];

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: 'gray.50', borderColor: 'blue.300', shadow: 'sm' }}
      onClick={onClick}
      transition="all 0.2s"
    >
      <HStack justify="space-between" mb={3}>
        <HStack>
          <Box bg="blue.100" p={2} borderRadius="full">
            <Calendar size={16} color="#2563eb" />
          </Box>
          <VStack align="start" gap={0}>
            <Text fontWeight="bold" color="gray.900">
              {doctor}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {specialization}
            </Text>
          </VStack>
        </HStack>
        <VStack align="end" gap={0}>
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            {new Date(date).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {time}
          </Text>
        </VStack>
      </HStack>
      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.600">
          📍 {location}
        </Text>
        <Badge colorScheme={config.color} fontSize="xs">
          {config.label}
        </Badge>
      </HStack>
    </Box>
  );
}
