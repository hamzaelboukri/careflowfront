import { Box, Card, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: FC<LucideProps>;
  iconColor: string;
  iconBg: string;
}

export function StatCard({ title, value, icon: IconComponent, iconColor, iconBg }: StatCardProps) {
  return (
    <Card.Root bg="white" shadow="sm" borderRadius="xl" p={6} _hover={{ shadow: 'md', transform: 'translateY(-2px)' }} transition="all 0.3s">
      <HStack>
        <Box bg={iconBg} p={3} borderRadius="lg">
          <Icon fontSize="2xl" color={iconColor}>
            <IconComponent />
          </Icon>
        </Box>
        <VStack align="start" gap={0}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.900">
            {value}
          </Text>
        </VStack>
      </HStack>
    </Card.Root>
  );
}
