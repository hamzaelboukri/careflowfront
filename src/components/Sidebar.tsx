import { useAuthStore } from '../stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  Badge,
  HStack,
} from '@chakra-ui/react';
import {
  Calendar,
  Users,
  Activity,
  Pill,
  TestTube,
  FileText,
  User,
  Shield,
  Stethoscope,
} from 'lucide-react';

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: 'dashboard' | 'profile') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const user = useAuthStore((state: any) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.role === 'Admin' || user?.role === 'Administrator' || user?.role === 'SuperAdmin' || user?.role === 'ADMIN';
  const isDoctor = user?.role === 'Doctor' || user?.role === 'Médecin' || user?.role === 'DOCTOR';

  // Handle both firstName/lastName and name field
  const firstName = user?.firstName || user?.name?.split(' ')[0] || '';
  const lastName = user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '';
  const displayName = `${firstName} ${lastName}`.trim() || user?.email || 'Utilisateur';
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  // Check if route is active
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <Box
      w="280px"
      minH="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      left={0}
    >
      <VStack align="stretch" gap={0} h="100vh">
        {/* Logo/Brand */}
        <Box p={6} borderBottom="1px" borderColor="gray.200">
          <Heading size="lg" color="purple.600">
            CareFlow
          </Heading>
          <Text fontSize="sm" color="gray.600" mt={1}>
            Espace {user?.role || 'Utilisateur'}
          </Text>
        </Box>

        {/* User Profile Card */}
        <Box p={4} borderBottom="1px" borderColor="gray.200">
          <HStack gap={3}>
            <Box
              w="48px"
              h="48px"
              borderRadius="full"
              bg="gradient-to-br from-blue-500 to-purple-600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              shadow="md"
            >
              {initials}
            </Box>
            <VStack align="start" gap={0} flex={1}>
              <Text fontWeight="bold" fontSize="sm" color="gray.900" lineClamp={1}>
                {displayName}
              </Text>
              <Text fontSize="xs" color="gray.600" lineClamp={1}>
                {user?.email}
              </Text>
              <Badge colorScheme="blue" fontSize="xs" mt={1}>
                {user?.role}
              </Badge>
            </VStack>
          </HStack>
        </Box>

        {/* Navigation Menu */}
        <VStack align="stretch" gap={1} p={4} flex={1}>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} px={3}>
            MENU PRINCIPAL
          </Text>

          <Button
            justifyContent="start"
            variant="ghost"
            colorScheme="purple"
            bg={isActiveRoute('/dashboard') ? 'purple.50' : 'transparent'}
            color={isActiveRoute('/dashboard') ? 'purple.700' : 'gray.700'}
            size="lg"
            px={4}
            onClick={() => navigate('/dashboard')}
            _hover={{ bg: 'purple.50' }}
          >
            <Icon mr={3} asChild>
              <Activity size={20} />
            </Icon>
            Dashboard
          </Button>

          <Button
            justifyContent="start"
            variant="ghost"
            colorScheme="purple"
            bg={isActiveRoute('/profile') ? 'purple.50' : 'transparent'}
            color={isActiveRoute('/profile') ? 'purple.700' : 'gray.700'}
            size="lg"
            px={4}
            onClick={() => navigate('/profile')}
            _hover={{ bg: 'purple.50' }}
          >
            <Icon mr={3} asChild>
              <User size={20} />
            </Icon>
            Mon profil
          </Button>

          <Button
            justifyContent="start"
            variant="ghost"
            size="lg"
            px={4}
            onClick={() => navigate('/appointments')}
            _hover={{ bg: 'gray.100' }}
          >
            <Icon mr={3} asChild>
              <Calendar size={20} />
            </Icon>
            Rendez-vous
          </Button>

          {!isAdmin && (
            <>
              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/prescriptions')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <Pill size={20} />
                </Icon>
                Prescriptions
              </Button>

              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/lab-orders')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <TestTube size={20} />
                </Icon>
                Résultats labo
              </Button>

              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/documents')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <FileText size={20} />
                </Icon>
                Documents
              </Button>
            </>
          )}

          {isDoctor && (
            <>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} mt={4} px={3}>
                MÉDECIN
              </Text>
              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/consultations')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <Stethoscope size={20} />
                </Icon>
                Consultations
              </Button>

              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/patients')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <Users size={20} />
                </Icon>
                Mes patients
              </Button>
            </>
          )}

          {isAdmin && (
            <>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} mt={4} px={3}>
                ADMINISTRATION
              </Text>
              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/users')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <Users size={20} />
                </Icon>
                Utilisateurs
              </Button>

              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/patients')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <Activity size={20} />
                </Icon>
                Patients
              </Button>

              <Button
                justifyContent="start"
                variant="ghost"
                size="lg"
                px={4}
                onClick={() => navigate('/documents')}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon mr={3} asChild>
                  <FileText size={20} />
                </Icon>
                Documents
              </Button>
            </>
          )}
        </VStack>

        {/* Bottom Actions */}
        <VStack align="stretch" gap={2} p={4} borderTop="1px" borderColor="gray.200">
          <Button
            justifyContent="start"
            variant="ghost"
            size="lg"
            px={4}
            colorScheme="red"
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            _hover={{ bg: 'red.50' }}
          >
            <Icon mr={3} asChild>
              <Shield size={20} />
            </Icon>
            Déconnexion
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default Sidebar;
