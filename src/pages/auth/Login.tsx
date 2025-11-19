import { useState } from 'react'
import { Box, Heading, Text, Input, Button, VStack, Link, HStack, Icon } from '@chakra-ui/react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import api from '../../lib/api'
import { createToaster } from '@chakra-ui/react'
import { Heart, Lock, Mail } from 'lucide-react'

const toaster = createToaster({
  placement: 'top-end',
  duration: 5000,
})

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state: any) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/api/v1/auth/login', { email, password })
      const { accessToken, user } = response.data
      
      // Store token in localStorage and auth store
      localStorage.setItem('careflow_token', accessToken)
      login(user, accessToken)
      
      toaster.success({ 
        title: 'Connexion réussie',
        description: `Bienvenue ${user.name}`
      })
      navigate('/dashboard')
    } catch (error: any) {
      toaster.error({
        title: 'Erreur de connexion',
        description: error.response?.data?.message || 'Email ou mot de passe incorrect',
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
            Connectez-vous pour accéder à votre espace
          </Text>
        </VStack>

        {/* Login Form */}
        <Box bg="white" p={8} borderRadius="2xl" boxShadow="xl" borderWidth="1px" borderColor="gray.200">
          <VStack gap={6}>
            <Heading size="xl" color="gray.800">
              Connexion
            </Heading>

            <Box as="form" onSubmit={handleSubmit} w="full">
              <VStack gap={5}>
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <Lock />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Mot de passe
                    </Text>
                  </HStack>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    css={{ '&:focus': { borderColor: '#238D94', boxShadow: '0 0 0 1px #238D94' } }}
                  />
                </Box>

                <Box w="full" textAlign="right">
                  <Link asChild fontSize="sm" fontWeight="medium" style={{ color: '#238D94' }}>
                    <RouterLink to="/forgot-password">Mot de passe oublié ?</RouterLink>
                  </Link>
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
                  css={{ background: '#238D94', '&:hover': { background: '#1a6b70' } }}
                >
                  Se connecter
                </Button>
              </VStack>
            </Box>

            <Box pt={4} borderTop="1px" borderColor="gray.200" w="full" textAlign="center">
              <Text color="gray.600">
                Pas encore de compte ?{' '}
                <Link asChild fontWeight="semibold" style={{ color: '#238D94' }}>
                  <RouterLink to="/register">Créer un compte</RouterLink>
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

export default Login
