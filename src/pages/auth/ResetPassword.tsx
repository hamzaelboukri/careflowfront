import { Heading, Button, VStack, Input, Box, Text } from '@chakra-ui/react'
import AuthLayout from '../../layouts/AuthLayout'

const ResetPassword = () => {
  return (
    <AuthLayout>
      <VStack gap={4} align="stretch">
        <Heading size="md">Réinitialiser le mot de passe</Heading>
        <Box>
          <Text mb={2} fontWeight="medium">Nouveau mot de passe</Text>
          <Input type="password" placeholder="••••••" />
        </Box>
        <Box>
          <Text mb={2} fontWeight="medium">Confirmer</Text>
          <Input type="password" placeholder="••••••" />
        </Box>
        <Button colorScheme="green">Valider</Button>
      </VStack>
    </AuthLayout>
  )
}

export default ResetPassword
