import { Heading, Button, VStack, Input, Box, Text } from '@chakra-ui/react'
import AuthLayout from '../../layouts/AuthLayout'

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <VStack gap={4} align="stretch">
        <Heading size="md">Mot de passe oublié</Heading>
        <Box>
          <Text mb={2} fontWeight="medium">Email</Text>
          <Input placeholder="email@example.com" />
        </Box>
        <Button colorScheme="blue">Envoyer le lien</Button>
      </VStack>
    </AuthLayout>
  )
}

export default ForgotPassword
