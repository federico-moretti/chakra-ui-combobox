import * as React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Text,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from './theme';
import { EmailUser, User } from './utils/types';
import UserInviteCombobox from './components/UserInviteCombobox';
import UserPill from './components/UserPill';

export function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invitedUsers, setInvitedUsers] = React.useState<(User | EmailUser)[]>([]);

  function handleOnInvite(users: (User | EmailUser)[]) {
    setInvitedUsers(users);
    onClose();
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack>
            {invitedUsers.length > 0 && (
              <Box marginBottom={4}>
                <VStack>
                  <Heading size="sm">Invited teammates:</Heading>
                  {invitedUsers.map((user, i) => (
                    <UserPill key={i} user={user} style={{ marginBottom: 4 }} />
                  ))}
                </VStack>
              </Box>
            )}
            <Button onClick={onOpen}>Invite teammates</Button>
          </VStack>
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent background="greyBlue.700" padding={16}>
          <ModalHeader color="white" textAlign="center" fontSize={24} padding={0} marginBottom={4}>
            Invite members
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white" marginBottom={1}>
              Email invite
            </Text>
            <Text color="whiteAlpha.500" marginBottom={6}>
              Send members an email invitation to join this workspace
            </Text>
            <UserInviteCombobox onInvite={handleOnInvite} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
