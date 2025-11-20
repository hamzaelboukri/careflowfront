import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Tabs,
  Separator,
} from '@chakra-ui/react';
import {
  FileText,
  User,
  Calendar,
  Pill,
  TestTube,
  Stethoscope,
  AlertCircle,
  Activity,
  Download,
  ArrowLeft,
} from 'lucide-react';
import { getMedicalRecord } from '../../services/medicalRecord.service';
import type { MedicalRecordResponse } from '../../services/medicalRecord.service';

const MedicalRecordDetail = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<MedicalRecordResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (patientId) {
      fetchMedicalRecord();
    }
  }, [patientId]);

  const fetchMedicalRecord = async () => {
    try {
      setIsLoading(true);
      const response = await getMedicalRecord(patientId!);
      setData(response);
    } catch (error) {
      console.error('Error fetching medical record:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Box maxW="7xl" mx="auto" p={6}>
          <Text textAlign="center" color="gray.500" py={8}>
            Chargement du dossier médical...
          </Text>
        </Box>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <Box maxW="7xl" mx="auto" p={6}>
          <VStack py={12} gap={3}>
            <Icon fontSize="4xl" color="gray.300">
              <FileText />
            </Icon>
            <Text fontSize="lg" color="gray.500">
              Dossier médical introuvable
            </Text>
            <Button onClick={() => navigate('/patients')}>Retour aux patients</Button>
          </VStack>
        </Box>
      </MainLayout>
    );
  }

  const { patient, appointments, medicalRecord } = data;

  return (
    <MainLayout>
      <Box maxW="7xl" mx="auto" p={6}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <HStack justify="space-between">
            <HStack>
              <Button
                variant="ghost"
                onClick={() => navigate('/patients')}
                leftIcon={
                  <Icon>
                    <ArrowLeft size={20} />
                  </Icon>
                }
              >
                Retour
              </Button>
              <Icon fontSize="2xl" color="blue.600">
                <FileText />
              </Icon>
              <VStack align="start" gap={0}>
                <Heading size="xl" color="gray.800">
                  Dossier Médical
                </Heading>
                <Text color="gray.600">
                  {patient.userId.firstName} {patient.userId.lastName}
                </Text>
              </VStack>
            </HStack>
            <Button
              leftIcon={
                <Icon>
                  <Download size={20} />
                </Icon>
              }
              colorScheme="blue"
              variant="outline"
            >
              Télécharger PDF
            </Button>
          </HStack>

          {/* Patient Info Card */}
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <VStack align="start" gap={2}>
                  <HStack>
                    <Icon color="gray.600">
                      <User size={18} />
                    </Icon>
                    <Text fontWeight="bold" color="gray.700">
                      Informations personnelles
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    Email: {patient.userId.email}
                  </Text>
                  {patient.userId.phone && (
                    <Text fontSize="sm" color="gray.600">
                      Téléphone: {patient.userId.phone}
                    </Text>
                  )}
                  {patient.dateOfBirth && (
                    <Text fontSize="sm" color="gray.600">
                      Date de naissance: {new Date(patient.dateOfBirth).toLocaleDateString('fr-FR')}
                    </Text>
                  )}
                  {patient.gender && (
                    <Text fontSize="sm" color="gray.600">
                      Genre: {patient.gender}
                    </Text>
                  )}
                </VStack>

                {patient.emergencyContact && (
                  <VStack align="start" gap={2}>
                    <HStack>
                      <Icon color="red.600">
                        <AlertCircle size={18} />
                      </Icon>
                      <Text fontWeight="bold" color="gray.700">
                        Contact d'urgence
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {patient.emergencyContact.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {patient.emergencyContact.phone}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {patient.emergencyContact.relationship}
                    </Text>
                  </VStack>
                )}

                <VStack align="start" gap={2}>
                  <Text fontWeight="bold" color="gray.700">
                    Statistiques
                  </Text>
                  <HStack>
                    <Badge colorScheme="blue">{medicalRecord.consultations.length} consultations</Badge>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="purple">{medicalRecord.prescriptions.length} prescriptions</Badge>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="orange">{medicalRecord.labOrders.length} analyses</Badge>
                  </HStack>
                </VStack>
              </SimpleGrid>
            </Card.Body>
          </Card.Root>

          {/* Tabs */}
          <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)}>
            <Tabs.List>
              <Tabs.Trigger value="overview">Vue d'ensemble</Tabs.Trigger>
              <Tabs.Trigger value="consultations">
                Consultations ({medicalRecord.consultations.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="prescriptions">
                Prescriptions ({medicalRecord.prescriptions.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="labs">Analyses ({medicalRecord.labOrders.length})</Tabs.Trigger>
              <Tabs.Trigger value="imaging">
                Imagerie ({medicalRecord.imagingReports.length})
              </Tabs.Trigger>
            </Tabs.List>

            {/* Overview Tab */}
            <Tabs.Content value="overview">
              <VStack align="stretch" gap={6} mt={6}>
                {/* Allergies & Chronic Diseases */}
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  <Card.Root bg="red.50" borderRadius="xl">
                    <Card.Header p={4}>
                      <HStack>
                        <Icon color="red.600">
                          <AlertCircle />
                        </Icon>
                        <Heading size="sm" color="red.800">
                          Allergies
                        </Heading>
                      </HStack>
                    </Card.Header>
                    <Card.Body p={4}>
                      {medicalRecord.allergies.length > 0 ? (
                        <VStack align="stretch" gap={2}>
                          {medicalRecord.allergies.map((allergy, index) => (
                            <Badge key={index} colorScheme="red">
                              {allergy}
                            </Badge>
                          ))}
                        </VStack>
                      ) : (
                        <Text fontSize="sm" color="gray.600">
                          Aucune allergie connue
                        </Text>
                      )}
                    </Card.Body>
                  </Card.Root>

                  <Card.Root bg="orange.50" borderRadius="xl">
                    <Card.Header p={4}>
                      <HStack>
                        <Icon color="orange.600">
                          <Activity />
                        </Icon>
                        <Heading size="sm" color="orange.800">
                          Maladies chroniques
                        </Heading>
                      </HStack>
                    </Card.Header>
                    <Card.Body p={4}>
                      {medicalRecord.chronicDiseases.length > 0 ? (
                        <VStack align="stretch" gap={2}>
                          {medicalRecord.chronicDiseases.map((disease, index) => (
                            <Badge key={index} colorScheme="orange">
                              {disease}
                            </Badge>
                          ))}
                        </VStack>
                      ) : (
                        <Text fontSize="sm" color="gray.600">
                          Aucune maladie chronique
                        </Text>
                      )}
                    </Card.Body>
                  </Card.Root>
                </SimpleGrid>

                {/* Recent Activity */}
                <Card.Root bg="white" shadow="md" borderRadius="xl">
                  <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                    <Heading size="md" color="gray.900">
                      Activité récente
                    </Heading>
                  </Card.Header>
                  <Card.Body p={6}>
                    <VStack align="stretch" gap={4}>
                      {medicalRecord.consultations.slice(0, 3).map((consultation) => (
                        <Box key={consultation._id}>
                          <HStack justify="space-between" mb={2}>
                            <HStack>
                              <Icon color="teal.600">
                                <Stethoscope size={16} />
                              </Icon>
                              <Text fontWeight="bold" fontSize="sm">
                                Consultation
                              </Text>
                            </HStack>
                            <Text fontSize="xs" color="gray.600">
                              {new Date(consultation.createdAt).toLocaleDateString('fr-FR')}
                            </Text>
                          </HStack>
                          {consultation.diagnosis && (
                            <Text fontSize="sm" color="gray.600">
                              {consultation.diagnosis}
                            </Text>
                          )}
                          {consultation !== medicalRecord.consultations[medicalRecord.consultations.length - 1] && (
                            <Separator my={3} />
                          )}
                        </Box>
                      ))}
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>
            </Tabs.Content>

            {/* Consultations Tab */}
            <Tabs.Content value="consultations">
              <VStack align="stretch" gap={4} mt={6}>
                {medicalRecord.consultations.length === 0 ? (
                  <Text textAlign="center" color="gray.500" py={8}>
                    Aucune consultation
                  </Text>
                ) : (
                  medicalRecord.consultations.map((consultation) => (
                    <Card.Root key={consultation._id} bg="white" shadow="sm" borderRadius="lg">
                      <Card.Body p={5}>
                        <VStack align="stretch" gap={3}>
                          <HStack justify="space-between">
                            <HStack>
                              <Icon color="teal.600">
                                <Stethoscope />
                              </Icon>
                              <Text fontWeight="bold">Consultation</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {new Date(consultation.createdAt).toLocaleDateString('fr-FR')}
                            </Text>
                          </HStack>
                          
                          {consultation.vitals && (
                            <HStack flexWrap="wrap" gap={2}>
                              {consultation.vitals.temperature && (
                                <Badge colorScheme="blue">🌡️ {consultation.vitals.temperature}°C</Badge>
                              )}
                              {consultation.vitals.bloodPressure && (
                                <Badge colorScheme="red">💓 {consultation.vitals.bloodPressure}</Badge>
                              )}
                              {consultation.vitals.weight && (
                                <Badge colorScheme="green">⚖️ {consultation.vitals.weight}kg</Badge>
                              )}
                            </HStack>
                          )}
                          
                          {consultation.diagnosis && (
                            <Box>
                              <Text fontWeight="semibold" fontSize="sm" mb={1}>
                                Diagnostic
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {consultation.diagnosis}
                              </Text>
                            </Box>
                          )}
                          
                          {consultation.notes && (
                            <Box>
                              <Text fontWeight="semibold" fontSize="sm" mb={1}>
                                Notes
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {consultation.notes}
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))
                )}
              </VStack>
            </Tabs.Content>

            {/* Prescriptions Tab */}
            <Tabs.Content value="prescriptions">
              <VStack align="stretch" gap={4} mt={6}>
                {medicalRecord.prescriptions.length === 0 ? (
                  <Text textAlign="center" color="gray.500" py={8}>
                    Aucune prescription
                  </Text>
                ) : (
                  medicalRecord.prescriptions.map((prescription) => (
                    <Card.Root key={prescription._id} bg="white" shadow="sm" borderRadius="lg">
                      <Card.Body p={5}>
                        <VStack align="stretch" gap={3}>
                          <HStack justify="space-between">
                            <HStack>
                              <Icon color="purple.600">
                                <Pill />
                              </Icon>
                              <Text fontWeight="bold">Prescription</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {new Date(prescription.createdAt).toLocaleDateString('fr-FR')}
                            </Text>
                          </HStack>
                          
                          <VStack align="stretch" gap={2}>
                            {prescription.medications.map((med, index) => (
                              <Box key={index} p={3} bg="purple.50" borderRadius="lg">
                                <Text fontWeight="semibold" fontSize="sm">
                                  {med.name}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {med.dosage} - {med.frequency} pendant {med.duration}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))
                )}
              </VStack>
            </Tabs.Content>

            {/* Lab Orders Tab */}
            <Tabs.Content value="labs">
              <VStack align="stretch" gap={4} mt={6}>
                {medicalRecord.labOrders.length === 0 ? (
                  <Text textAlign="center" color="gray.500" py={8}>
                    Aucune analyse
                  </Text>
                ) : (
                  medicalRecord.labOrders.map((lab) => (
                    <Card.Root key={lab._id} bg="white" shadow="sm" borderRadius="lg">
                      <Card.Body p={5}>
                        <HStack justify="space-between">
                          <HStack>
                            <Icon color="orange.600">
                              <TestTube />
                            </Icon>
                            <VStack align="start" gap={0}>
                              <Text fontWeight="bold">{lab.testType}</Text>
                              <Badge colorScheme={lab.status === 'completed' ? 'green' : 'yellow'}>
                                {lab.status}
                              </Badge>
                            </VStack>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {new Date(lab.createdAt).toLocaleDateString('fr-FR')}
                          </Text>
                        </HStack>
                      </Card.Body>
                    </Card.Root>
                  ))
                )}
              </VStack>
            </Tabs.Content>

            {/* Imaging Tab */}
            <Tabs.Content value="imaging">
              <VStack align="stretch" gap={4} mt={6}>
                {medicalRecord.imagingReports.length === 0 ? (
                  <Text textAlign="center" color="gray.500" py={8}>
                    Aucun rapport d'imagerie
                  </Text>
                ) : (
                  medicalRecord.imagingReports.map((imaging) => (
                    <Card.Root key={imaging._id} bg="white" shadow="sm" borderRadius="lg">
                      <Card.Body p={5}>
                        <VStack align="stretch" gap={3}>
                          <HStack justify="space-between">
                            <HStack>
                              <Icon color="blue.600">
                                <FileText />
                              </Icon>
                              <Text fontWeight="bold">{imaging.imagingType}</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {new Date(imaging.createdAt).toLocaleDateString('fr-FR')}
                            </Text>
                          </HStack>
                          {imaging.findings && (
                            <Text fontSize="sm" color="gray.600">
                              {imaging.findings}
                            </Text>
                          )}
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))
                )}
              </VStack>
            </Tabs.Content>
          </Tabs.Root>
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default MedicalRecordDetail;
