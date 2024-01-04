/* eslint-disable react/prop-types */
import { Input, Stack } from "@mantine/core";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DropDownInput from "./DropDown";

const SearchBar = ({ filterState, dispatch }) => {
  return (
    <Stack gap={"5px"}>
      <Input
        disabled={!filterState.searchQueryBase}
        value={filterState.searchQuery}
        radius={"md"}
        onChange={(e) =>
          dispatch({
            type: "SEARCH_QUERY",
            payload: {
              searchQuery: e.target.value,
            },
          })
        }
        placeholder="Search"
        rightSection={<MagnifyingGlassIcon />}
      />
      <DropDownInput
        options={["Username", "Phone", "Email"]}
        placeholder="Options"
        value={filterState.searchQueryBase}
        onChange={(e) => {
          dispatch({
            type: "SEARCH_QUERY_BASE",
            payload: {
              searchQueryBase: e.toLowerCase(),
            },
          });
        }}
      />
    </Stack>
  );
};

export default SearchBar;
