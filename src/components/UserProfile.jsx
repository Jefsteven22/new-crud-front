import {
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Container,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./styles/UserCard.module.css";
import EditProfile from "./UserProfile/EditProfile";
import UserList from "./UserProfile/UserList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const userLogged = JSON.parse(localStorage.getItem("user"));
  const [handleLogin, setHandleLogin] = useState();
  const token = localStorage.getItem("token");
  const auth = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const url = `https://new-crud-ly68.onrender.com/api/v1/users/${userLogged.id}`;

    axios
      .get(url, auth)
      .then((res) => {
        setHandleLogin(res.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  }, [userLogged]);

  const stats = [
    {
      value: `${handleLogin?.gender ? handleLogin?.gender : "Sin genero"}`,
      label: "gender",
    },
    { value: `${handleLogin?.email}`, label: "email" },
  ];
  useEffect(() => {}, [handleLogin]);

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Container size="xs">
        <Card withBorder padding="xl" radius="md" className={classes.card}>
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
            }}
          />
          <Avatar
            src={handleLogin?.avatar}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            className={classes.avatar}
          />
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {handleLogin?.name} {handleLogin?.lastname}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {handleLogin?.roleId === 1 ? "user" : "admin"}
          </Text>
          <Group mt="md" justify="center" gap={30}>
            {items}
          </Group>
          <Button
            onClick={handleLogout}
            fullWidth
            radius="md"
            mt="xl"
            size="md"
            variant="light"
          >
            Logout
          </Button>
          <Button
            onClick={open}
            fullWidth
            radius="md"
            mt="xl"
            size="md"
            variant="default"
          >
            Edit Profile
          </Button>
        </Card>
        <Modal opened={opened} onClose={close} title="Edit Profile" centered>
          <EditProfile
            setHandleLogin={setHandleLogin}
            close={close}
            handleLogin={handleLogin}
          />
        </Modal>
      </Container>
      {handleLogin?.roleId === 2 ? <UserList /> : null}
    </>
  );
};

export default UserProfile;
