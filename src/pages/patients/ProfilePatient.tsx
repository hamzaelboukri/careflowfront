import { useAuthStore } from '../../stores/authStore';
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
  Activity,
  Pill,
} from 'lucide-react';

interface ProfilePatientProps {
  onBack?: () => void;
}

export function ProfilePatient({ onBack }: ProfilePatientProps) {
  const user = useAuthStore((state: any) => state.user);
  const isPatient = user?.role === 'Patient' || user?.role === 'PATIENT';

  // Handle both firstName/lastName and name field
  const firstName = user?.firstName || user?.name?.split(' ')[0] || '';
  const lastName = user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '';
  const displayName = `${firstName} ${lastName}`.trim() || 'Utilisateur';
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';

  return (
    <VStack align="stretch" gap={6}>
      {/* Header */}
      <Box>
        <Heading size="xl" color="gray.900" mb={2}>
          Mon Profil
        </Heading>
        <Text color="gray.600">
          Gérez vos informations personnelles
        </Text>
      </Box>

      {/* Profile Card */}
      <Card.Root bg="white" shadow="lg" borderRadius="xl">
        <Card.Body p={8}>
          <VStack align="stretch" gap={6}>
            {/* Avatar Section */}
            <HStack gap={6}>
              <Box
                w="120px"
                h="120px"
                borderRadius="full"
                bg="gradient-to-br from-blue-500 to-purple-600"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="5xl"
                fontWeight="bold"
                shadow="xl"
              >
                {initials}
              </Box>
              <VStack align="start" gap={2}>
                <Heading size="lg">
                  {displayName}
                </Heading>
                <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                  {user?.role}
                </Badge>
                <Text color="gray.600" fontSize="sm">
                  {user?.email}
                </Text>
              </VStack>
            </HStack>

            {/* Informations Personnelles */}
            <Box>
              <Heading size="md" mb={4} color="gray.900">
                Informations Personnelles
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Prénom
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {firstName || 'Non renseigné'}
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Nom
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {lastName || 'Non renseigné'}
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Email
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {user?.email || 'Non renseigné'}
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Téléphone
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {user?.phone || 'Non renseigné'}
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Date de naissance
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('fr-FR') : 'Non renseigné'}
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Sexe
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.900">
                    {user?.gender === 'Male' ? 'Homme' : user?.gender === 'Female' ? 'Femme' : 'Non renseigné'}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>

            {/* Adresse */}
            <Box>
              <Heading size="md" mb={4} color="gray.900">
                Adresse
              </Heading>
              <Box p={4} bg="gray.50" borderRadius="lg">
                <Text fontSize="md" color="gray.900">
                  {user?.address || 'Aucune adresse renseignée'}
                </Text>
              </Box>
            </Box>

            {/* Informations médicales (pour les patients) */}
            {isPatient && (
              <Box>
                <Heading size="md" mb={4} color="gray.900">
                  Informations Médicales
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Box p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
                    <HStack gap={3} mb={2}>
                      <Icon color="blue.600" asChild>
                        <Activity size={20} />
                      </Icon>
                      <Text fontSize="sm" fontWeight="bold" color="blue.900">
                        Groupe Sanguin
                      </Text>
                    </HStack>
                    <Text fontSize="lg" fontWeight="semibold" color="blue.900">
                      {user?.bloodType || 'Non renseigné'}
                    </Text>
                  </Box>
                  <Box p={4} bg="purple.50" borderRadius="lg" border="1px" borderColor="purple.200">
                    <HStack gap={3} mb={2}>
                      <Icon color="purple.600" asChild>
                        <Pill size={20} />
                      </Icon>
                      <Text fontSize="sm" fontWeight="bold" color="purple.900">
                        Allergies
                      </Text>
                    </HStack>
                    <Text fontSize="md" color="purple.900">
                      {user?.allergies?.length > 0 ? user.allergies.join(', ') : 'Aucune allergie connue'}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            )}

            {/* Actions */}
            <HStack gap={4} pt={4}>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => {
                  // TODO: Implement edit profile
                  console.log('Edit profile');
                }}
              >
                Modifier mon profil
              </Button>
              {onBack && (
                <Button
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={onBack}
                >
                  Retour au dashboard
                </Button>
              )}
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
