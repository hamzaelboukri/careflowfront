import { Box, HStack, VStack, Text, Badge, Button } from '@chakra-ui/react';
import { Download } from 'lucide-react';

interface MedicalRecordCardProps {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  type: string;
  onClick?: () => void;
  onDownload?: () => void;
}

export function MedicalRecordCard({
  date,
  doctor,
  diagnosis,
  type,
  onClick,
  onDownload,
}: MedicalRecordCardProps) {
  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: 'gray.50', borderColor: 'teal.300', shadow: 'sm' }}
      onClick={onClick}
      transition="all 0.2s"
    >
      <HStack justify="space-between" mb={2}>
        <VStack align="start" gap={0} flex={1}>
          <Text fontWeight="bold" color="gray.900" fontSize="md">
            {diagnosis}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {doctor}
          </Text>
          <Badge mt={1} colorScheme="teal" fontSize="xs">
            {type}
          </Badge>
        </VStack>
        <VStack align="end" gap={2}>
          <Text fontSize="sm" color="gray.600">
            {new Date(date).toLocaleDateString('fr-FR')}
          </Text>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="teal"
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.();
            }}
          >
            <Download size={14} />
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
