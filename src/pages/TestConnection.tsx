import { useState } from 'react'
import { Box, Heading, Button, VStack, Text, HStack } from '@chakra-ui/react'
import api from '../lib/api'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

const TestConnection = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<any>(null)

  const testConnection = async () => {
    setStatus('testing')
    setMessage('Testing connection...')
    setDetails(null)

    try {
      // Test multiple endpoints to find which one works
      const tests = [
        { url: '/', label: 'Root endpoint' },
        { url: '/auth/register', label: 'Auth register (expected)' },
        { url: '/api/auth/register', label: 'Auth register with /api prefix' },
      ]

      const results = []
      
      for (const test of tests) {
        try {
          const response = await api.get(test.url)
          results.push({ ...test, status: 'success', data: response.data })
        } catch (error: any) {
          results.push({ 
            ...test, 
            status: 'error', 
            error: error.response?.data || error.message 
          })
        }
      }

      setStatus('success')
      setMessage('✅ Connection test complete!')
      setDetails({
        baseURL: api.defaults.baseURL,
        tests: results
      })
    } catch (error: any) {
      console.error('Connection error:', error)
      setStatus('error')
      setMessage('❌ Failed to connect to backend')
      setDetails({
        url: api.defaults.baseURL,
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
    }
  }

  const testRegister = async () => {
    setStatus('testing')
    setMessage('Testing /auth/register endpoint...')
    setDetails(null)

    try {
      const testData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      }

      console.log('Sending:', testData)
      const response = await api.post('/auth/register', testData)
      console.log('Response:', response.data)

      setStatus('success')
      setMessage('✅ Register endpoint works!')
      setDetails({
        url: `${api.defaults.baseURL}/auth/register`,
        request: testData,
        response: response.data,
        status: response.status
      })
    } catch (error: any) {
      console.error('Register error:', error)
      setStatus('error')
      setMessage('❌ Register endpoint failed')
      setDetails({
        url: `${api.defaults.baseURL}/auth/register`,
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <Box maxW="4xl" mx="auto">
        <VStack gap={6} align="stretch">
          <Heading size="2xl">Backend Connection Test</Heading>
          
          <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              API Configuration
            </Text>
            <VStack align="start" gap={2}>
              <Text><strong>Base URL:</strong> {api.defaults.baseURL || 'http://localhost:3010'}</Text>
              <Text><strong>Environment:</strong> {import.meta.env.MODE}</Text>
              <Text><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'not set (using default)'}</Text>
            </VStack>
          </Box>

          <HStack gap={4}>
            <Button
              onClick={testConnection}
              colorScheme="blue"
              size="lg"
              disabled={status === 'testing'}
            >
              {status === 'testing' ? <Loader className="animate-spin" /> : 'Test Basic Connection'}
            </Button>

            <Button
              onClick={testRegister}
              colorScheme="teal"
              size="lg"
              disabled={status === 'testing'}
            >
              {status === 'testing' ? <Loader className="animate-spin" /> : 'Test Register Endpoint'}
            </Button>
          </HStack>

          {message && (
            <Box
              p={6}
              borderRadius="xl"
              bg={status === 'success' ? 'green.50' : status === 'error' ? 'red.50' : 'blue.50'}
              borderWidth="2px"
              borderColor={status === 'success' ? 'green.200' : status === 'error' ? 'red.200' : 'blue.200'}
            >
              <HStack mb={4}>
                {status === 'success' && <CheckCircle className="text-green-600" size={24} />}
                {status === 'error' && <XCircle className="text-red-600" size={24} />}
                {status === 'testing' && <Loader className="text-blue-600 animate-spin" size={24} />}
                <Text fontSize="xl" fontWeight="bold" color={status === 'success' ? 'green.700' : status === 'error' ? 'red.700' : 'blue.700'}>
                  {message}
                </Text>
              </HStack>

              {details && (
                <Box
                  as="pre"
                  p={4}
                  bg="gray.800"
                  color="green.300"
                  borderRadius="md"
                  overflow="auto"
                  fontSize="sm"
                  fontFamily="mono"
                >
                  {JSON.stringify(details, null, 2)}
                </Box>
              )}
            </Box>
          )}

          <Box bg="yellow.50" p={6} borderRadius="xl" borderWidth="2px" borderColor="yellow.200">
            <Text fontWeight="bold" mb={2}>🔧 Troubleshooting:</Text>
            <VStack align="start" gap={2} fontSize="sm">
              <Text>1. Make sure your backend is running: <code>npm start</code> (in backend folder)</Text>
              <Text>2. Backend should be on port 3010</Text>
              <Text>3. Check backend console for errors</Text>
              <Text>4. Verify your backend routes match: <code>/auth/register</code></Text>
              <Text>5. Check CORS is enabled in backend for <code>http://localhost:3000</code></Text>
            </VStack>
          </Box>

          <Button
            onClick={() => window.location.href = '/'}
            variant="ghost"
            size="lg"
          >
            ← Back to Home
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default TestConnection
