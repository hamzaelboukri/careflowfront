import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Heading,
  Box,
  VStack,
  Input,
  Button,
  Text,
  Select,
  Textarea, 
  SimpleGrid,
  Card,
  HStack,
  Icon,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FileText, Stethoscope, User, Calendar, Plus, X, Upload } from 'lucide-react';
import { createConsultation } from '../../services/consultation.service';
import type { CreateConsultationData } from '../../services/consultation.service';
import { useAuthStore } from '../../stores/authStore';

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
});

const ConsultationNew = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state: any) => state.user);

  const [formData, setFormData] = useState<CreateConsultationData>({
    appointmentId: '',
    doctorId: user?.id || '',
    patientId: '',
    vitals: {
      height: undefined,
      weight: undefined,
      temperature: undefined,
      bloodPressure: '',
      heartRate: undefined,
      respiratoryRate: undefined,
    },
    diagnosis: '',
    procedures: [],
    notes: '',
    files: [],
  });

  const [procedures, setProcedures] = useState<Array<{ name: string; code: string }>>([]);
  const [newProcedure, setNewProcedure] = useState({ name: '', code: '' });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - À remplacer par des appels API réels
  const mockAppointments = [
    { id: '1', patientName: 'Jean Dupont', date: '2025-01-15 10:00' },
    { id: '2', patientName: 'Marie Martin', date: '2025-01-15 11:00' },
  ];

  const handleAddProcedure = () => {
    if (newProcedure.name) {
      setProcedures([...procedures, newProcedure]);
      setNewProcedure({ name: '', code: '' });
    }
  };

  const handleRemoveProcedure = (index: number) => {
    setProcedures(procedures.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const consultationData: CreateConsultationData = {
        ...formData,
        procedures,
        files: selectedFiles,
      };

      await createConsultation(consultationData);

      toaster.success({
        title: 'Consultation créée',
        description: 'La consultation a été créée avec succès.',
      });

      navigate('/consultations');
    } catch (error: any) {
      console.error('Error creating consultation:', error);
      toaster.error({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible de créer la consultation',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box maxW="5xl" mx="auto" p={6}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <HStack justify="space-between">
            <HStack>
              <Icon fontSize="2xl" color="teal.600">
                <Stethoscope />
              </Icon>
              <Heading size="xl" color="gray.800">
                Nouvelle consultation
              </Heading>
            </HStack>
            <Button variant="outline" onClick={() => navigate('/consultations')}>
              Annuler
            </Button>
          </HStack>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack align="stretch" gap={6}>
              {/* Informations de base */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <Heading size="md" color="gray.900">
                    Informations de base
                  </Heading>
                </Card.Header>
                <Card.Body p={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <Box>
                      <HStack mb={2}>
                        <Icon color="gray.600">
                          <Calendar size={18} />
                        </Icon>
                        <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                          Rendez-vous *
                        </Text>
                      </HStack>
                      <Select
                        value={formData.appointmentId}
                        onChange={(e) => {
                          const appointment = mockAppointments.find((a) => a.id === e.target.value);
                          setFormData({
                            ...formData,
                            appointmentId: e.target.value,
                            patientId: e.target.value, // Mock - should be actual patient ID
                          });
                        }}
                        required
                        size="lg"
                      >
                        <option value="">Sélectionner un rendez-vous</option>
                        {mockAppointments.map((apt) => (
                          <option key={apt.id} value={apt.id}>
                            {apt.patientName} - {apt.date}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    <Box>
                      <HStack mb={2}>
                        <Icon color="gray.600">
                          <User size={18} />
                        </Icon>
                        <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                          Médecin
                        </Text>
                      </HStack>
                      <Input value={user?.firstName + ' ' + user?.lastName} disabled size="lg" />
                    </Box>
                  </SimpleGrid>
                </Card.Body>
              </Card.Root>

              {/* Signes vitaux */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <Heading size="md" color="gray.900">
                    Signes vitaux
                  </Heading>
                </Card.Header>
                <Card.Body p={6}>
                  <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Taille (cm)
                      </Text>
                      <Input
                        type="number"
                        value={formData.vitals?.height || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, height: Number(e.target.value) },
                          })
                        }
                        placeholder="175"
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Poids (kg)
                      </Text>
                      <Input
                        type="number"
                        value={formData.vitals?.weight || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, weight: Number(e.target.value) },
                          })
                        }
                        placeholder="70"
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Température (°C)
                      </Text>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.vitals?.temperature || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, temperature: Number(e.target.value) },
                          })
                        }
                        placeholder="36.8"
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Tension artérielle
                      </Text>
                      <Input
                        value={formData.vitals?.bloodPressure || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, bloodPressure: e.target.value },
                          })
                        }
                        placeholder="120/80"
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Fréquence cardiaque
                      </Text>
                      <Input
                        type="number"
                        value={formData.vitals?.heartRate || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, heartRate: Number(e.target.value) },
                          })
                        }
                        placeholder="72"
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Fréquence respiratoire
                      </Text>
                      <Input
                        type="number"
                        value={formData.vitals?.respiratoryRate || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vitals: { ...formData.vitals, respiratoryRate: Number(e.target.value) },
                          })
                        }
                        placeholder="16"
                        size="lg"
                      />
                    </Box>
                  </SimpleGrid>
                </Card.Body>
              </Card.Root>

              {/* Diagnostic et procédures */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <Heading size="md" color="gray.900">
                    Diagnostic et procédures
                  </Heading>
                </Card.Header>
                <Card.Body p={6}>
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Diagnostic
                      </Text>
                      <Textarea
                        value={formData.diagnosis}
                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        placeholder="Entrez le diagnostic..."
                        rows={3}
                        size="lg"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Procédures
                      </Text>
                      <HStack mb={3}>
                        <Input
                          value={newProcedure.name}
                          onChange={(e) => setNewProcedure({ ...newProcedure, name: e.target.value })}
                          placeholder="Nom de la procédure"
                          flex={2}
                        />
                        <Input
                          value={newProcedure.code}
                          onChange={(e) => setNewProcedure({ ...newProcedure, code: e.target.value })}
                          placeholder="Code"
                          flex={1}
                        />
                        <IconButton
                          onClick={handleAddProcedure}
                          colorScheme="blue"
                          aria-label="Ajouter procédure"
                        >
                          <Plus size={20} />
                        </IconButton>
                      </HStack>
                      {procedures.length > 0 && (
                        <VStack align="stretch" gap={2}>
                          {procedures.map((proc, index) => (
                            <HStack
                              key={index}
                              p={3}
                              bg="gray.50"
                              borderRadius="lg"
                              justify="space-between"
                            >
                              <HStack>
                                <Text fontWeight="medium">{proc.name}</Text>
                                {proc.code && <Badge colorScheme="blue">{proc.code}</Badge>}
                              </HStack>
                              <IconButton
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleRemoveProcedure(index)}
                                aria-label="Supprimer"
                              >
                                <X size={16} />
                              </IconButton>
                            </HStack>
                          ))}
                        </VStack>
                      )}
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.700" mb={2}>
                        Notes
                      </Text>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Notes supplémentaires..."
                        rows={4}
                        size="lg"
                      />
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Fichiers joints */}
              <Card.Root bg="white" shadow="md" borderRadius="xl">
                <Card.Header borderBottom="1px" borderColor="gray.200" p={6}>
                  <Heading size="md" color="gray.900">
                    Fichiers joints (max 5)
                  </Heading>
                </Card.Header>
                <Card.Body p={6}>
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Button
                        as="label"
                        htmlFor="file-upload"
                        leftIcon={
                          <Icon>
                            <Upload size={20} />
                          </Icon>
                        }
                        colorScheme="blue"
                        variant="outline"
                        cursor="pointer"
                      >
                        Sélectionner des fichiers
                      </Button>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        display="none"
                      />
                    </Box>
                    {selectedFiles.length > 0 && (
                      <VStack align="stretch" gap={2}>
                        {selectedFiles.map((file, index) => (
                          <HStack
                            key={index}
                            p={3}
                            bg="gray.50"
                            borderRadius="lg"
                            justify="space-between"
                          >
                            <HStack>
                              <Icon color="blue.600">
                                <FileText size={20} />
                              </Icon>
                              <VStack align="start" gap={0}>
                                <Text fontWeight="medium" fontSize="sm">
                                  {file.name}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {(file.size / 1024).toFixed(2)} KB
                                </Text>
                              </VStack>
                            </HStack>
                            <IconButton
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleRemoveFile(index)}
                              aria-label="Supprimer"
                            >
                              <X size={16} />
                            </IconButton>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Actions */}
              <HStack justify="flex-end" gap={4}>
                <Button variant="outline" size="lg" onClick={() => navigate('/consultations')}>
                  Annuler
                </Button>
                <Button type="submit" colorScheme="teal" size="lg" loading={isLoading}>
                  Créer la consultation
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default ConsultationNew;
