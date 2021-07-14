import React from 'react';
import { Box, Button, Flex, Input, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useCombobox } from 'downshift';
import { useDebounce } from '../hooks';
import { isEmailRegex, getUserEmail, userToString } from '../utils';
import { searchUser } from '../apis';
import { EmailUser, isUser, User } from '../utils/types';
import UserPill from './UserPill';

type UserInviteComboboxProps = {
  onInvite: (users: (User | EmailUser)[]) => void;
  initialInputValue?: string;
};
function UserInviteCombobox(props: UserInviteComboboxProps) {
  const { onInvite, initialInputValue = '' } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [listUsers, setListUsers] = React.useState<User[]>([]);
  const [listEmailUsers, setListEmailUsers] = React.useState<EmailUser[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<(User | EmailUser)[]>([]);

  const [error, setError] = React.useState<string | null>(null);

  function addSelectedUser(user?: User | EmailUser | null) {
    if (user) {
      setSelectedUsers((users) => {
        const existingItem = users.find((oldItem) => getUserEmail(oldItem) === getUserEmail(user));
        if (isUser(existingItem)) return users;
        if (existingItem && isUser(user)) {
          return [...users.filter((oldItem) => getUserEmail(oldItem) !== getUserEmail(user)), user];
        }
        return [...users, user];
      });
    }
  }

  function removeSelectedUser(user: User | EmailUser) {
    setSelectedUsers((users) => {
      return [...users.filter((oldUser) => getUserEmail(oldUser) !== getUserEmail(user))];
    });
  }

  function removeLastUser() {
    setSelectedUsers((users) => {
      const newUsers = [...users];
      newUsers.pop();
      return [...newUsers];
    });
  }

  const selectedItemEmails = selectedUsers.map((user) => getUserEmail(user));
  const userEmails = listUsers.map((user) => getUserEmail(user));
  const allUsers: (User | EmailUser)[] = [
    ...listUsers,
    ...listEmailUsers.filter((user) => !userEmails.includes(getUserEmail(user))),
  ];
  const allUsersFiltered = [
    ...allUsers.filter((user) => !selectedItemEmails.includes(getUserEmail(user))),
  ];

  const {
    isOpen,
    closeMenu,
    openMenu,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    getComboboxProps,
    reset,
  } = useCombobox({
    items: allUsersFiltered,
    itemToString: userToString,
    initialInputValue,
    onSelectedItemChange: (changes) => {
      addSelectedUser(changes.selectedItem);
      setListEmailUsers([]);
      setListUsers([]);
      reset();
    },
    onInputValueChange: (changes) => {
      setError(null);
      if (changes.inputValue === '') {
        closeMenu();
        setListEmailUsers([]);
        setListUsers([]);
      }
      if (
        changes.inputValue &&
        isEmailRegex(changes.inputValue) &&
        !listUsers.find((user) => user.email === changes.inputValue)
      ) {
        setListEmailUsers([{ email: changes.inputValue }]);
      }
    },
  });

  const debouncedInputValue = useDebounce(inputValue, 50);

  function handleBoxClick() {
    if (inputRef?.current) inputRef.current.focus();
  }

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleInputFocus() {
    if (listUsers.length > 0 && inputValue) openMenu();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement> | undefined) {
    if (e && e.currentTarget.value === '' && e.key === 'Backspace') {
      removeLastUser();
    }
  }

  React.useEffect(() => {
    let ignore = false;

    async function fetchApi(value: string) {
      try {
        const res = await searchUser(value);
        if (!ignore) {
          setListUsers(res);
        }
      } catch (error) {
        setError(error.message);
        closeMenu();
        setListUsers([]);
      }
    }

    if (debouncedInputValue !== '') {
      fetchApi(debouncedInputValue);
    }

    return () => {
      ignore = true;
    };
  }, [debouncedInputValue, closeMenu]);

  return (
    <div style={{ position: 'relative' }}>
      <Flex alignItems="center">
        <Wrap
          w="100%"
          padding={2}
          marginRight={4}
          borderWidth={1}
          borderRadius={10}
          borderColor="greyBlue.600"
          bg="greyBlue.800"
          onClick={handleBoxClick}
          {...getComboboxProps()}
        >
          {selectedUsers.map((user, i) => (
            <UserPill
              key={i}
              user={user}
              onDelete={() => removeSelectedUser(user)}
              style={{ marginRight: 4 }}
            />
          ))}
          <WrapItem>
            <Input
              ref={inputRef}
              height="24px"
              padding={0}
              color="white"
              fontSize="15px"
              border="none"
              _focus={{ border: 'none' }}
              onFocus={handleInputFocus}
              {...getInputProps({ ref: inputRef, onKeyDown: handleKeyDown })}
            />
          </WrapItem>
        </Wrap>
        <Button disabled={selectedUsers.length === 0} onClick={() => onInvite(selectedUsers)}>
          Invite
        </Button>
      </Flex>
      {error && (
        <Text fontSize="15px" margin={0} color="red.300">
          {error}
        </Text>
      )}
      <ul {...getMenuProps()}>
        {isOpen && (
          <VStack
            width="100%"
            position="absolute"
            marginTop={2}
            spacing={0}
            bg="greyBlue.800"
            borderWidth={1}
            borderRadius={10}
            borderColor="greyBlue.600"
            overflow="hidden"
          >
            {allUsersFiltered.length > 0 ? (
              allUsersFiltered.map((user, index) => (
                <Box
                  key={index}
                  w="100%"
                  margin={0}
                  padding={2}
                  bg={highlightedIndex === index ? 'greyBlue.600' : 'greyBlue.800'}
                  _hover={{ bg: 'greyBlue.600' }}
                  {...getItemProps({ item: user, index })}
                >
                  <Text fontSize="15px" margin={0} color="pink.300">
                    {userToString(user)}
                  </Text>
                </Box>
              ))
            ) : (
              <Box w="100%" padding={2}>
                <Text fontSize="15px" color="pink.300">
                  No results
                </Text>
              </Box>
            )}
          </VStack>
        )}
      </ul>
    </div>
  );
}

export default UserInviteCombobox;
