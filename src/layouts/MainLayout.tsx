import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

type Props = {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  )
}

export default MainLayout
