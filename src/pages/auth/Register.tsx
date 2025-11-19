import { useState } from 'react'
import { Box, Heading, Text, Input, Button, VStack, Link, HStack, Icon } from '@chakra-ui/react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import api from '../../lib/api'
import { createToaster } from '@chakra-ui/react'
import { Heart, User, Mail, Lock, Phone } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
})

const Register = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state: any) => state.login)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password.length < 8) {
      toaster.error({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, un chiffre et un caractère spécial',
      })
      return
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    if (!passwordRegex.test(formData.password)) {
      toaster.error({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial (!@#$%^&*)',
      })
      return
    }

    setIsLoading(true)

    try {
      // Clean phone number - remove spaces, parentheses, and dashes
      const cleanPhone = formData.phone.replace(/[\s()\\-]/g, '')
      
      console.log('Sending registration data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: cleanPhone,
        password: '***hidden***'
      })

      const response = await api.post('/api/v1/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: cleanPhone,
        password: formData.password,
        role: 'patient',
      })

      console.log('Registration response:', response.data)

      // Auto-login after registration
      const loginResponse = await api.post('/api/v1/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      const { accessToken, user } = loginResponse.data
      
      // Store token and update auth state
      localStorage.setItem('careflow_token', accessToken)
      login(user, accessToken)

      toaster.success({
        title: 'Inscription réussie',
        description: `Bienvenue ${formData.firstName}! Votre compte a été créé avec succès.`,
      })

      navigate('/dashboard')
    } catch (error: any) {
      console.error('Registration error:', error)
      console.error('Error response data:', error.response?.data)
      console.error('Error status:', error.response?.status)
      
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.response?.status === 409) {
        errorMessage = 'Cette adresse email est déjà enregistrée. Veuillez utiliser une autre adresse ou essayer de vous connecter.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toaster.error({
        title: 'Erreur d\'inscription',
        description: errorMessage,
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
            <Icon fontSize="3xl" style={{ color: '#238D94' }}>
              <Heart />
            </Icon>
            <Heading size="3xl" style={{ color: '#1a6b70' }}>
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
                      Prénom
                    </Text>
                  </HStack>
                  <Input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jean"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <User />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Nom
                    </Text>
                  </HStack>
                  <Input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Dupont"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
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
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
                </Box>

                <Box w="full">
                  <HStack mb={2}>
                    <Icon fontSize="lg" color="gray.500">
                      <Phone />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Téléphone
                    </Text>
                  </HStack>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+33612345678"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
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
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Minimum 8 caractères avec une majuscule, un chiffre et un caractère spécial (!@#$%^&*)
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
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
                </Box>

                <Button
                  type="submit"
                  color="white"
                  w="full"
                  size="lg"
                  borderRadius="lg"
                  loading={isLoading}
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                  css={{ background: '#238D94', '&:hover': { background: '#1a6b70' } }}
                >
                  Créer mon compte
                </Button>
              </VStack>
            </Box>

            <Box pt={4} borderTop="1px" borderColor="gray.200" w="full" textAlign="center">
              <Text color="gray.600">
                Vous avez déjà un compte ?{' '}
                <Link asChild fontWeight="semibold" style={{ color: '#238D94' }}>
                  <RouterLink to="/login">Se connecter</RouterLink>
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Back to Home */}
        <Box textAlign="center" mt={6}>
          <Link asChild color="gray.600" fontSize="sm" css={{ '&:hover': { color: '#238D94' } }}>
            <RouterLink to="/">← Retour à l'accueil</RouterLink>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
