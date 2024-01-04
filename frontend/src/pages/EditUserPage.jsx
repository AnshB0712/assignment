/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Container,
  Input,
  Stack,
  Divider,
  Text,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { isOnline } from "../utils/isOnline";

const EditUserForm = ({ user }) => {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...values } = user; // mongodb property needs to sanitised
  const navigate = useNavigate();
  const { customAxios } = usePrivateAxios();
  const [formState, setFormState] = useState(values);

  const [Intermediate, setIntermediate] = useState({
    loading: false,
    error: null,
  });

  const onInputChange = (e) =>
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const allFieldsFilled = Object.values(formState).every(Boolean);

  const onSubmit = async () => {
    if (!isOnline()) {
      setIntermediate((p) => ({
        ...p,
        error: { message: "Please turn on Internet Your Connection" },
      }));
      return;
    }

    setIntermediate((p) => ({ ...p, loading: true }));
    try {
      await customAxios.patch("/user/update", formState);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setIntermediate((p) => ({ ...p, error: e }));
    } finally {
      setIntermediate((p) => ({ ...p, loading: false }));
    }
  };

  return (
    <Container styles={{ root: { maxWidth: "400px" } }}>
      {Intermediate.error && (
        <Alert
          variant="light"
          color="red"
          radius="md"
          title="Error Occured"
          icon={<InfoCircledIcon />}
        >
          {Intermediate.error?.response?.data.message ??
            Intermediate.error?.message}
        </Alert>
      )}
      <Stack component={"form"}>
        <Input.Wrapper label="Email" withAsterisk>
          <Input
            radius="md"
            placeholder="xyz@mail.com"
            required
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Username" withAsterisk>
          <Input
            radius="md"
            placeholder="username"
            required
            name="username"
            value={formState.username}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Phone" withAsterisk>
          <Input
            radius="md"
            placeholder="Phone"
            required
            name="phone"
            value={formState.phone}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Address" withAsterisk>
          <Input
            radius="md"
            placeholder="Address"
            required
            name="address"
            value={formState.address}
            onChange={onInputChange}
          />
        </Input.Wrapper>
      </Stack>
      <Button
        disabled={!allFieldsFilled}
        display={"block"}
        my={"lg"}
        radius={"md"}
        fullWidth
        type="submit"
        loading={Intermediate.loading}
        onClick={onSubmit}
      >
        Edit
      </Button>
    </Container>
  );
};

const EditUserPage = () => {
  const { id } = useParams();
  const { customAxios } = usePrivateAxios();
  const effectRan = useRef(true);
  const [state, setState] = useState({
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await customAxios.get(`/user/get/${id}`);
        setState((p) => ({ ...p, data: data.data }));
      } catch (error) {
        console.log(error);
        setState((p) => ({ ...p, error }));
      }
    };

    if (effectRan.current) {
      fetchUser();
    }

    return () => {
      effectRan.current = false;
    };
  }, []);

  if (!state.data && !state.error) {
    return <Text>Loading User...</Text>;
  }

  if (state.error) {
    return <Text>Error Occured...</Text>;
  }

  return (
    <Container>
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Edit User
      </Text>
      <Divider my="sm" />
      <EditUserForm user={state.data} />
    </Container>
  );
};

export default EditUserPage;
