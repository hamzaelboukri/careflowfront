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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Plus, Search, FileText, Calendar } from 'lucide-react';
import { getConsultations } from '../../services/consultation.service';
import type { Consultation } from '../../services/consultation.service';

const ConsultationList = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [consultations, searchTerm]);

  const fetchConsultations = async () => {
    try {
      setIsLoading(true);
      const data = await getConsultations();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterConsultations = () => {
    let filtered = [...consultations];

    if (searchTerm) {
      filtered = filtered.filter(
        (cons) =>
          cons.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cons.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    setFilteredConsultations(filtered);
  };

  const stats = {
    total: consultations.length,
    thisMonth: consultations.filter((c) => {
      const date = new Date(c.createdAt || 0);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  return (
    <MainLayout>
      <Box maxW="7xl" mx="auto" p={6}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <HStack>
              <Icon fontSize="2xl" color="teal.600">
                <Stethoscope />
              </Icon>
              <Heading size="xl" color="gray.800">
                Consultations médicales
              </Heading>
            </HStack>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate('/consultations/new')}
              leftIcon={
                <Icon>
                  <Plus size={20} />
                </Icon>
              }
            >
              Nouvelle consultation
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
                <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                  {stats.thisMonth}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Ce mois
                </Text>
              </VStack>
            </Card.Root>
          </SimpleGrid>

          {/* Search */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <Box>
                <HStack mb={2}>
                  <Icon color="gray.600">
                    <Search size={18} />
                  </Icon>
                  <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                    Rechercher
                  </Text>
                </HStack>
                <Input
                  placeholder="Diagnostic, notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                />
              </Box>
            </Card.Body>
          </Card.Root>

          {/* Consultations List */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
              <Heading size="md" color="gray.900">
                Liste des consultations ({filteredConsultations.length})
              </Heading>
            </Card.Header>
            <Card.Body p={6}>
              {isLoading ? (
                <Text textAlign="center" color="gray.500" py={8}>
                  Chargement...
                </Text>
              ) : filteredConsultations.length === 0 ? (
                <VStack py={12} gap={3}>
                  <Icon fontSize="4xl" color="gray.300">
                    <Stethoscope />
                  </Icon>
                  <Text fontSize="lg" color="gray.500">
                    Aucune consultation trouvée
                  </Text>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => navigate('/consultations/new')}
                  >
                    Créer une consultation
                  </Button>
                </VStack>
              ) : (
                <VStack align="stretch" gap={4}>
                  {filteredConsultations.map((consultation) => (
                    <Box
                      key={consultation._id}
                      p={5}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="lg"
                      cursor="pointer"
                      _hover={{ bg: 'gray.50', borderColor: 'teal.300', shadow: 'sm' }}
                      onClick={() => navigate(`/consultations/${consultation._id}`)}
                      transition="all 0.2s"
                    >
                      <VStack align="stretch" gap={3}>
                        <HStack justify="space-between">
                          <HStack>
                            <Box bg="teal.100" p={2} borderRadius="full">
                              <Icon color="teal.600">
                                <Stethoscope size={16} />
                              </Icon>
                            </Box>
                            <VStack align="start" gap={0}>
                              <Text fontWeight="bold" color="gray.900">
                                Consultation médicale
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {new Date(consultation.createdAt || '').toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack>
                            <Icon color="gray.500">
                              <Calendar size={16} />
                            </Icon>
                            <Text fontSize="sm" color="gray.600">
                              {new Date(consultation.createdAt || '').toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </Text>
                          </HStack>
                        </HStack>

                        {consultation.diagnosis && (
                          <Box>
                            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1}>
                              Diagnostic
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {consultation.diagnosis}
                            </Text>
                          </Box>
                        )}

                        <HStack justify="space-between" flexWrap="wrap">
                          <HStack gap={2}>
                            {consultation.vitals?.temperature && (
                              <Badge colorScheme="blue">🌡️ {consultation.vitals.temperature}°C</Badge>
                            )}
                            {consultation.vitals?.bloodPressure && (
                              <Badge colorScheme="red">
                                💓 {consultation.vitals.bloodPressure}
                              </Badge>
                            )}
                            {consultation.procedures && consultation.procedures.length > 0 && (
                              <Badge colorScheme="purple">
                                {consultation.procedures.length} procédure(s)
                              </Badge>
                            )}
                          </HStack>
                          {consultation.attachments && consultation.attachments.length > 0 && (
                            <HStack>
                              <Icon color="gray.500">
                                <FileText size={16} />
                              </Icon>
                              <Text fontSize="sm" color="gray.600">
                                {consultation.attachments.length} fichier(s)
                              </Text>
                            </HStack>
                          )}
                        </HStack>
                      </VStack>
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

export default ConsultationList;
