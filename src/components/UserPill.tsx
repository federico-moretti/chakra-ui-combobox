import { Box, Circle, CloseButton, Flex, Text, useTheme, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { FiMail } from 'react-icons/fi';
import { userToString } from '../utils';
import { EmailUser, isUser, User } from '../utils/types';

interface UserPillProps {
  user: User | EmailUser;
  onDelete?: (user: User | EmailUser) => void;
  style?: React.CSSProperties;
}
function UserPill(props: UserPillProps) {
  const { user, onDelete, style } = props;
  const theme = useTheme();

  return (
    <WrapItem style={style}>
      <Box
        paddingLeft={2}
        paddingRight={2}
        borderWidth={1}
        borderRadius={10}
        borderColor="pink.300"
      >
        <Flex align="center">
          {isUser(user) ? (
            <Circle w={4} h={4} marginRight={2} fontSize="sm" bg="pink.300" color="white">
              {userToString(user).slice(0, 1)}
            </Circle>
          ) : (
            <FiMail color={theme.colors.pink[300]} style={{ marginRight: 8 }} />
          )}
          <Text key={userToString(user)} color="pink.300">
            {userToString(user)}
          </Text>
          {onDelete && <CloseButton color="pink.300" size="sm" onClick={() => onDelete(user)} />}
        </Flex>
      </Box>
    </WrapItem>
  );
}

export default UserPill;
