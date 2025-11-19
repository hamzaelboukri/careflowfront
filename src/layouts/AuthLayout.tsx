import React from 'react'
import { Box, Center } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Center minH="100vh" bg="gray.50">
      <Box w={["90%", "420px"]} p={6} bg="white" boxShadow="md" borderRadius="md">
        {children}
      </Box>
    </Center>
  )
}

export default AuthLayout
