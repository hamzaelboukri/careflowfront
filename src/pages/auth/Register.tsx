import { useState } from 'react'
import { Box, Heading, Text, Input, Button, VStack, Link, HStack, Icon } from '@chakra-ui/react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import api from '../../lib/api'
import { createToaster } from '@chakra-ui/react'
import { Heart, User, Mail, Lock, UserCircle } from 'lucide-react'

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
})

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toaster.error({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
      })
      return
    }

    if (formData.password.length < 6) {
      toaster.error({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères',
      })
      return
    }

    setIsLoading(true)

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      toaster.success({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès. Veuillez vous connecter.',
      })

      navigate('/login')
    } catch (error: any) {
      toaster.error({
        title: 'Erreur d\'inscription',
        description: error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center" py={12} px={4}>
      <Box maxW="md" w="full">
        {/* Logo and Title */}
        <VStack gap={4} mb={8} textAlign="center">
          <HStack gap={2} justify="center">
            <Icon fontSize="3xl" color="blue.600">
              <Heart />
            </Icon>
            <Heading size="3xl" color="blue.700">
              CareFlow
            </Heading>
          </HStack>
          <Text fontSize="lg" color="gray.600">
            Créez votre compte et commencez dès maintenant
          </Text>
        </VStack>

        {/* Register Form */}
        <Box bg="white" p={8} borderRadius="2xl" boxShadow="xl" borderWidth="1px" borderColor="gray.200">
          <VStack gap={6}>
            <Heading size="xl" color="gray.800">
              Inscription
            </Heading>

            <Box as="form" onSubmit={handleSubmit} w="full">
              <VStack gap={5}>
                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <User />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Nom complet
                    </Text>
                  </HStack>
                  <Input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Dr. Jean Dupont"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                  />
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <Mail />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Email
                    </Text>
                  </HStack>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                  />
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <UserCircle />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Type de compte
                    </Text>
                  </HStack>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      height: '48px',
                      padding: '0 16px',
                      borderRadius: '8px',
                      borderWidth: '1px',
                      borderColor: '#D1D5DB',
                      fontSize: '16px',
                      width: '100%',
                    }}
                  >
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Médecin</option>
                    <option value="NURSE">Infirmier(ère)</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <Lock />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Mot de passe
                    </Text>
                  </HStack>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                  />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Minimum 6 caractères
                  </Text>
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <Lock />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Confirmer le mot de passe
                    </Text>
                  </HStack>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                  />
                </Box>

                <Button
                  type="submit"
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                  w="full"
                  size="lg"
                  borderRadius="lg"
                  loading={isLoading}
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                >
                  Créer mon compte
                </Button>
              </VStack>
            </Box>

            <Box pt={4} borderTop="1px" borderColor="gray.200" w="full" textAlign="center">
              <Text color="gray.600">
                Vous avez déjà un compte ?{' '}
                <Link asChild color="blue.600" fontWeight="semibold">
                  <RouterLink to="/login">Se connecter</RouterLink>
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Back to Home */}
        <Box textAlign="center" mt={6}>
          <Link asChild color="gray.600" fontSize="sm" _hover={{ color: 'blue.600' }}>
            <RouterLink to="/">← Retour à l'accueil</RouterLink>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
