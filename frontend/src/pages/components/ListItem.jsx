/* eslint-disable react/prop-types */
import { Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ListItem = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Group
      style={{
        border: "1px solid #dbdbd8",
        borderRadius: "8px",
        padding: ".85rem",
      }}
      justify="space-between"
    >
      <Text size="sm">{user.username}</Text>
      <Text size="sm">{user.email}</Text>
      <Text td="underline" size="sm">
        {user.phone}
      </Text>
      <Group>
        <Button
          onClick={() => navigate(`/edit/${user._id}`)}
          variant="outline"
          size="compact-xs"
          color="gray"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="compact-xs"
          color="red"
          onClick={() => navigate(`delete/${user._id}`)}
        >
          Delete
        </Button>
      </Group>
    </Group>
  );
};

export default ListItem;
