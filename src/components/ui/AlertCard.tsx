import { Box, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface AlertCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: 'warning' | 'info' | 'success' | 'error';
}

export function AlertCard({ title, description, icon: IconComponent, variant }: AlertCardProps) {
  const variantConfig = {
    warning: {
      bg: 'yellow.50',
      borderColor: 'yellow.200',
      iconColor: 'yellow.600',
      titleColor: 'yellow.800',
      descColor: 'yellow.700',
    },
    info: {
      bg: 'blue.50',
      borderColor: 'blue.200',
      iconColor: 'blue.600',
      titleColor: 'blue.800',
      descColor: 'blue.700',
    },
    success: {
      bg: 'green.50',
      borderColor: 'green.200',
      iconColor: 'green.600',
      titleColor: 'green.800',
      descColor: 'green.700',
    },
    error: {
      bg: 'red.50',
      borderColor: 'red.200',
      iconColor: 'red.600',
      titleColor: 'red.800',
      descColor: 'red.700',
    },
  };

  const config = variantConfig[variant];

  return (
    <Box p={4} bg={config.bg} border="1px" borderColor={config.borderColor} borderRadius="lg">
      <HStack align="start">
        <Icon fontSize="lg" color={config.iconColor} mt={0.5}>
          <IconComponent />
        </Icon>
        <VStack align="start" gap={0}>
          <Text fontSize="sm" fontWeight="bold" color={config.titleColor}>
            {title}
          </Text>
          <Text fontSize="xs" color={config.descColor}>
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
