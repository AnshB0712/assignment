import { Alert, Button, Group, Modal, Text } from "@mantine/core";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { isOnline } from "../../utils/isOnline";
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const DeleteModal = () => {
  const { id } = useParams();
  const { customAxios } = usePrivateAxios();
  const navigate = useNavigate();
  const [Intermediate, setIntermediate] = useState({
    loading: false,
    error: null,
  });
  const { setDeleteTimestamp } = useOutletContext();

  const onDelete = async () => {
    if (!isOnline()) {
      setIntermediate((p) => ({
        ...p,
        error: { message: "Please turn on Internet Your Connection" },
      }));
      return;
    }

    setIntermediate((p) => ({ ...p, loading: true }));
    try {
      await customAxios.delete(`/user/delete/${id}`);
      setDeleteTimestamp(Date.now());
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setIntermediate((p) => ({ ...p, error: e }));
    } finally {
      setIntermediate((p) => ({ ...p, loading: false }));
    }
  };

  return (
    <Modal opened={true} centered withCloseButton={false}>
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
      <Text ta="center">Are you sure you want to delete this user?</Text>
      <Group pt={"sm"}>
        <Button
          display={"block"}
          ml="auto"
          variant="outline"
          color="dark"
          size="compact-sm"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </Button>
        <Button
          loading={Intermediate.loading}
          onClick={onDelete}
          variant="filled"
          color="red"
          size="compact-sm"
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteModal;
