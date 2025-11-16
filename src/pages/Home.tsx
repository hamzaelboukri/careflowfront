import { Box, Heading, Text, Button, VStack, HStack, Container, SimpleGrid, Icon, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Calendar, Users, FileText, Stethoscope, Shield, Clock, ClipboardList, UserCheck } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg="linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #6366F1 100%)" 
        color="white" 
        py={24}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="1200px" position="relative" zIndex={1}>
          <VStack gap={8} textAlign="center">
            <Box>
              <Heading size="5xl" fontWeight="extrabold" mb={4}>
                CareFlow
              </Heading>
              <Heading size="2xl" fontWeight="medium" color="blue.100">
                Gestion Médicale Simplifiée
              </Heading>
            </Box>
            <Text fontSize="xl" maxW="850px" lineHeight="tall" opacity={0.95}>
              Une application web complète pour la gestion des rendez-vous et des dossiers médicaux.
              Facilitez la prise de rendez-vous en ligne, la gestion des calendriers médicaux et la supervision des opérations cliniques.
            </Text>
            <Text fontSize="xl" maxW="800px" lineHeight="tall">
              Une application web complète pour la gestion des rendez-vous et des dossiers médicaux.
              Facilitez la prise de rendez-vous en ligne, la gestion des calendriers médicaux et la supervision des opérations cliniques.
            </Text>
            <HStack gap={4} mt={6}>
              {isAuthenticated ? (
                <Button 
                  size="xl"
                  bg="white"
                  color="blue.600"
                  _hover={{ bg: 'blue.50' }}
                  px={8}
                  py={6}
                  fontSize="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Accéder au Tableau de Bord
                </Button>
              ) : (
                <>
                  <Button 
                    size="xl"
                    bg="white"
                    color="blue.600"
                    _hover={{ bg: 'blue.50' }}
                    px={8}
                    py={6}
                    fontSize="lg"
                    onClick={() => navigate('/login')}
                    boxShadow="lg"
                  >
                    Connexion
                  </Button>
                  <Button 
                    size="xl"
                    variant="outline"
                    borderColor="white"
                    borderWidth="2px"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    px={8}
                    py={6}
                    fontSize="lg"
                    onClick={() => navigate('/register')}
                  >
                    Inscription
                  </Button>
                </>
              )}
            </HStack>
          </VStack>
        </Container>
        {/* Decorative circles */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="whiteAlpha.100"
          opacity={0.3}
        />
        <Box
          position="absolute"
          bottom="-150px"
          left="-150px"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="whiteAlpha.100"
          opacity={0.3}
        />
      </Box>

      {/* Features Section */}
      <Container maxW="1200px" py={20}>
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading size="3xl" color="gray.800">Fonctionnalités Clés</Heading>
            <Text fontSize="xl" color="gray.600" maxW="700px">
              Tout ce dont vous avez besoin pour gérer efficacement votre clinique
            </Text>
          </VStack>

          <SimpleGrid columns={[1, 2, 3]} gap={8} w="full">
            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <Calendar />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Prise de Rendez-vous en Ligne
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Les patients peuvent réserver leurs consultations 24/7 via une interface intuitive et recevoir des confirmations automatiques.
              </Text>
            </Box>

            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <Stethoscope />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Gestion des Calendriers Médicaux
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Les médecins organisent leurs horaires, visualisent leurs rendez-vous et optimisent leur planning quotidien.
              </Text>
            </Box>

            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <FileText />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Dossiers Médicaux Électroniques
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Centralisez l'historique médical complet de chaque patient : consultations, prescriptions, analyses et documents.
              </Text>
            </Box>

            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <ClipboardList />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Supervision Administrative
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Le personnel administratif supervise les opérations, gère les ressources et génère des rapports détaillés.
              </Text>
            </Box>

            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <Shield />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Sécurité & Conformité
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Protection optimale des données sensibles avec cryptage et respect des normes de confidentialité médicale.
              </Text>
            </Box>

            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl', borderColor: 'blue.400' }}
            >
              <Icon fontSize="4xl" color="blue.500" mb={4}>
                <Clock />
              </Icon>
              <Heading size="lg" mb={3} color="gray.800">
                Rappels Automatiques
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                Réduisez les absences avec des notifications et rappels automatiques par email ou SMS.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Roles Section */}
      <Box bg="gradient-to-b" bgGradient="linear(to-b, gray.50, white)" py={20}>
        <Container maxW="1200px">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading size="3xl" color="gray.800">
                Conçu pour Tous les Utilisateurs
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="700px">
                Une interface adaptée aux besoins de chaque acteur de santé
              </Text>
            </VStack>

            <SimpleGrid columns={[1, 2, 3]} gap={8} w="full">
              <Box
                p={10}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                borderWidth="2px"
                borderColor="blue.100"
              >
                <Icon fontSize="4xl" color="blue.600" mb={4}>
                  <Stethoscope />
                </Icon>
                <Heading size="xl" mb={6} color="blue.700">
                  Médecins
                </Heading>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                    <Text fontSize="lg">Gestion du calendrier médical</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                    <Text fontSize="lg">Consultation des dossiers patients</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                    <Text fontSize="lg">Prescription électronique</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                    <Text fontSize="lg">Suivi des traitements</Text>
                  </HStack>
                </VStack>
              </Box>

              <Box
                p={10}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                borderWidth="2px"
                borderColor="green.100"
              >
                <Icon fontSize="4xl" color="green.600" mb={4}>
                  <Users />
                </Icon>
                <Heading size="xl" mb={6} color="green.700">
                  Patients
                </Heading>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="green.500" />
                    <Text fontSize="lg">Réservation en ligne 24/7</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="green.500" />
                    <Text fontSize="lg">Historique médical personnel</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="green.500" />
                    <Text fontSize="lg">Rappels de rendez-vous</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="green.500" />
                    <Text fontSize="lg">Accès aux résultats d'analyses</Text>
                  </HStack>
                </VStack>
              </Box>

              <Box
                p={10}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                borderWidth="2px"
                borderColor="purple.100"
              >
                <Icon fontSize="4xl" color="purple.600" mb={4}>
                  <UserCheck />
                </Icon>
                <Heading size="xl" mb={6} color="purple.700">
                  Personnel Administratif
                </Heading>
                <VStack align="start" gap={3}>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="purple.500" />
                    <Text fontSize="lg">Supervision des opérations</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="purple.500" />
                    <Text fontSize="lg">Gestion des ressources</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="purple.500" />
                    <Text fontSize="lg">Rapports et statistiques</Text>
                  </HStack>
                  <HStack>
                    <Box w={2} h={2} borderRadius="full" bg="purple.500" />
                    <Text fontSize="lg">Coordination des équipes</Text>
                  </HStack>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        bg="linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #6366F1 100%)" 
        color="white" 
        py={24}
        textAlign="center"
      >
        <Container maxW="900px">
          <VStack gap={8}>
            <Heading size="3xl" fontWeight="bold">
              Prêt à Transformer Votre Clinique ?
            </Heading>
            <Text fontSize="xl" lineHeight="tall" maxW="700px">
              Rejoignez les établissements médicaux qui modernisent leur gestion avec CareFlow.
              Commencez dès aujourd'hui, aucune carte bancaire requise.
            </Text>
            <Button
              size="xl"
              bg="white"
              color="blue.600"
              _hover={{ bg: 'blue.50', transform: 'scale(1.05)' }}
              px={10}
              py={7}
              fontSize="xl"
              fontWeight="bold"
              transition="all 0.3s"
              onClick={() => navigate('/register')}
            >
              Commencer Gratuitement
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="white" py={12}>
        <Container maxW="1200px">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={6}>
            <VStack align="start" gap={2}>
              <Heading size="lg" color="white">
                CareFlow
              </Heading>
              <Text color="gray.400">© 2025 CareFlow. Tous droits réservés.</Text>
            </VStack>
            <HStack gap={8} flexWrap="wrap">
              <Text cursor="pointer" _hover={{ color: 'blue.300' }} fontSize="lg">
                À propos
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }} fontSize="lg">
                Contact
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }} fontSize="lg">
                Confidentialité
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }} fontSize="lg">
                Conditions d'utilisation
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
