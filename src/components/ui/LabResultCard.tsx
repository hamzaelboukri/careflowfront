import { Box, HStack, VStack, Text, Badge, Button, Icon } from '@chakra-ui/react';
import { Download } from 'lucide-react';

interface LabResultCardProps {
  id: string;
  test: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
  result?: string;
  onClick?: () => void;
  onDownload?: () => void;
}

export function LabResultCard({
  test,
  date,
  status,
  result,
  onClick,
  onDownload,
}: LabResultCardProps) {
  const statusConfig = {
    completed: { color: 'green', label: 'Terminé' },
    pending: { color: 'yellow', label: 'En attente' },
    'in-progress': { color: 'blue', label: 'En cours' },
  };

  const config = statusConfig[status];

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: 'gray.50', borderColor: 'orange.300', shadow: 'sm' }}
      onClick={onClick}
      transition="all 0.2s"
    >
      <HStack justify="space-between" mb={2}>
        <VStack align="start" gap={0} flex={1}>
          <Text fontWeight="bold" color="gray.900" fontSize="md">
            {test}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {new Date(date).toLocaleDateString('fr-FR')}
          </Text>
        </VStack>
        <VStack align="end" gap={2}>
          <Badge colorScheme={config.color}>{config.label}</Badge>
          {result && (
            <Badge colorScheme="green" fontSize="xs">
              {result}
            </Badge>
          )}
          {status === 'completed' && (
            <Button
              size="xs"
              variant="ghost"
              colorScheme="orange"
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.();
              }}
            >
              <Icon>
                <Download size={14} />
              </Icon>
            </Button>
          )}
        </VStack>
      </HStack>
    </Box>
  );
}
