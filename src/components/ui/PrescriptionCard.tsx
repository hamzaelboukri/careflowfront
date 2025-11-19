import { Box, HStack, VStack, Text, Badge } from '@chakra-ui/react';

interface PrescriptionCardProps {
  id: string;
  medication: string;
  doctor: string;
  date: string;
  duration: string;
  status: 'active' | 'completed' | 'cancelled';
  onClick?: () => void;
}

export function PrescriptionCard({
  medication,
  doctor,
  date,
  duration,
  status,
  onClick,
}: PrescriptionCardProps) {
  const statusConfig = {
    active: { color: 'purple', label: 'Actif' },
    completed: { color: 'green', label: 'Terminé' },
    cancelled: { color: 'red', label: 'Annulé' },
  };

  const config = statusConfig[status];

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: 'gray.50', borderColor: 'purple.300', shadow: 'sm' }}
      onClick={onClick}
      transition="all 0.2s"
    >
      <HStack justify="space-between" mb={2}>
        <VStack align="start" gap={0} flex={1}>
          <Text fontWeight="bold" color="gray.900" fontSize="md">
            {medication}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Prescrit par {doctor}
          </Text>
        </VStack>
        <Badge colorScheme={config.color}>{config.label}</Badge>
      </HStack>
      <HStack justify="space-between" fontSize="sm" color="gray.600">
        <Text>📅 {new Date(date).toLocaleDateString('fr-FR')}</Text>
        <Text>⏱️ {duration}</Text>
      </HStack>
    </Box>
  );
}
