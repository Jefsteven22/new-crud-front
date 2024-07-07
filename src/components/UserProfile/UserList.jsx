import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Container,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

const UserList = () => {
  const userId = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const data = users;
  const token = localStorage.getItem("token");
  const auth = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const jobColors = {
    1: "blue",
    2: "cyan",
  };
  const handleDelete = (id) => {
    const url = `https://new-crud-ly68.onrender.com/api/v1/users/${id}`;
    axios
      .delete(url, auth)
      .then((res) =>
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      )
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  };

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.roleId]} variant="light">
          {item.roleId === 2 ? "Admin" : "User"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.gender}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            onClick={() => handleDelete(item.id)}
            variant="subtle"
            color="red"
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const url = "https://new-crud-ly68.onrender.com/api/v1/users/";

  useEffect(() => {
    axios
      .get(url, auth)
      .then((res) => {
        const allUsers = res.data;
        const filteredUsers = allUsers.filter((user) => user.id !== userId.id);
        setUsers(filteredUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container size="md" mt="xl">
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Users</Table.Th>
                <Table.Th>Roles</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </>
  );
};

export default UserList;
