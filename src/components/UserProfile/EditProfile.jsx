import "./style/EditProfile.css";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Group,
  TextInput,
  PasswordInput,
  Text,
  Select,
  Button,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";

const EditProfile = ({ handleLogin, close, setHandleLogin }) => {
  const userId = JSON.parse(localStorage.getItem("user"));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: handleLogin?.name,
      lastname: handleLogin?.lastname,
      email: handleLogin?.email,
      gender: handleLogin?.gender,
      password: "",
      avatar: handleLogin?.avatar,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      avatar: (val) => (val?.length <= 6 ? "It is not a valid url" : null),
    },
  });

  const [value, setValue] = useState("");
  const url = `https://new-crud-ly68.onrender.com/api/v1/users/${userId.id}`;
  const token = localStorage.getItem("token");
  const auth = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const submit = (values) => {
    values.roleId = value === "Admin" ? 2 : 1;
    if (!values.password) {
      delete values.password;
    }
    if (!values.email) {
      delete values.email;
    }
    if (!value) {
      delete values.roleId;
    }
    axios
      .patch(url, values, auth)
      .then((res) => {
        localStorage.getItem("user", JSON.stringify(res.data.UpdateData));
        setHandleLogin(res.data.UpdateData);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  };

  return (
    <section className="ct-section">
      <form className="ct-form" onSubmit={form.onSubmit(submit)}>
        <Group>
          <TextInput
            size="sm"
            label="Name"
            placeholder="Your name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            size="sm"
            label="Last name"
            placeholder="Your Last name"
            key={form.key("lastname")}
            {...form.getInputProps("lastname")}
          />
        </Group>
        <TextInput
          size="sm"
          label="Avatar"
          placeholder="Url of your avatar"
          key={form.key("avatar")}
          {...form.getInputProps("avatar")}
        />
        <TextInput
          size="sm"
          label="Email"
          placeholder="yourEmail@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <Group justify="space-between" mb={5}>
          <Text size="sm" component="label" htmlFor="your-password" fw={500}>
            New password
          </Text>
        </Group>
        <PasswordInput
          key={form.key("password")}
          {...form.getInputProps("password")}
          placeholder="Your password"
          id="your-password"
        />
        <TextInput
          size="sm"
          label="Gender"
          placeholder="Your gender"
          key={form.key("gender")}
          {...form.getInputProps("gender")}
        />
        <Select
          label="Your Role"
          placeholder="Pick role"
          data={["User", "Admin"]}
          value={value}
          onChange={setValue}
          clearable
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={close} type="submit" id="btn" variant="filled">
            Submit
          </Button>
        </Group>
      </form>
    </section>
  );
};

export default EditProfile;
