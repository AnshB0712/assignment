/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Container, Divider, Group, Stack, Text } from "@mantine/core";
import useGetAllUsers from "../hooks/useGetAllUsers";
import sortItems from "../utils/sortItems";
import { INITIAL_FILTER_STATE, filterReducer } from "../context/filterReducer";
import ListItem from "./components/ListItem";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";

const DashboardPage = () => {
  const [deleteTimestamp, setDeleteTimestamp] = useState(null);
  const { data, error } = useGetAllUsers(deleteTimestamp);

  const initState =
    localStorage.getItem("filters") !== "undefined"
      ? JSON.parse(localStorage.getItem("filters"))
      : INITIAL_FILTER_STATE;
  const [filterState, dispatch] = useReducer(filterReducer, initState);

  // Sync Filters with LocalStorage for Persistence
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filterState));
  }, [filterState]);

  const addFilterToData = () => {
    let filteredData = data;

    if (filterState["A-Z"]) {
      filteredData = sortItems(filteredData, "username", "ascd");
    }

    if (filterState["Z-A"]) {
      filteredData = sortItems(filteredData, "username", "desc");
    }

    if (filterState["Last Inserted"]) {
      filteredData = sortItems(filteredData, "createdAt", "desc", true);
    }

    if (filterState["Last Updated"]) {
      filteredData = sortItems(filteredData, "updatedAt", "desc", true);
    }

    if (filterState.searchQuery && filterState.searchQueryBase) {
      filteredData = filteredData.filter((user) =>
        user[filterState.searchQueryBase].includes(filterState.searchQuery)
      );
    }

    return filteredData;
  };

  if (!error && !data) {
    return (
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Loading Dashboard...
      </Text>
    );
  }

  if (error) {
    return (
      <>
        <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
          {error?.response?.data.message ?? error?.message}
        </Text>
        <Text>{JSON.stringify(error)}</Text>
      </>
    );
  }

  return (
    <Container>
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Dashboard
      </Text>
      <Divider my="sm" />
      <Group justify="space-between">
        <SearchBar filterState={filterState} dispatch={dispatch} />
        <FilterOptions filterState={filterState} dispatch={dispatch} />
      </Group>
      <Divider my="sm" />
      <Group justify="space-between" mb="1rem">
        <Button
          variant="outline"
          color="grey"
          radius={"md"}
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          Clear Filters
        </Button>
        <Button
          component={Link}
          to="/add"
          variant="outline"
          color="dark"
          radius={"md"}
        >
          Add User
        </Button>
      </Group>
      <Stack>
        {addFilterToData().length ? (
          addFilterToData().map((user) => {
            return <ListItem user={user} key={user._id} />;
          })
        ) : (
          <Text ta={"center"}>No Users to Display</Text>
        )}
      </Stack>
      {/* To Show the Delete Modal */}
      <Outlet context={{ setDeleteTimestamp }} />
    </Container>
  );
};

export default DashboardPage;
