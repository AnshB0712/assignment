/* eslint-disable react/prop-types */
import DropDownInput from "./DropDown";

const FilterOptions = ({ filterState, dispatch }) => {
  return (
    <DropDownInput
      value={
        Object.entries(filterState).find(
          // eslint-disable-next-line no-unused-vars
          ([_, val]) => typeof val === "boolean" && val
        )?.[0] || ""
      }
      withAsterisk={false}
      options={["A-Z", "Z-A", "Last Updated", "Last Inserted"]}
      label={"Filters"}
      placeholder="Select Filter"
      onChange={(e) => dispatch({ type: e })}
    />
  );
};

export default FilterOptions;
