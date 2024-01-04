/* eslint-disable react/prop-types */
import { Button, Highlight, Input, Popover } from "@mantine/core";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const varsResolver = (theme, props) => {
  if (props.dropdownbutton) {
    return {
      root: {
        "--button-hover": theme.colors.gray[1],
      },
    };
  }

  return { root: {} };
};

const DropDownInput = ({
  value,
  options,
  label,
  autoSuggestion,
  withAsterisk = true,
  placeholder = "Select on Option",
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const listItem = autoSuggestion
    ? options
        .filter((option) => {
          const smallcaseText = option.toLowerCase();
          return smallcaseText.includes(value);
        })
        .map((option) => (
          <Button
            vars={varsResolver}
            dropdownbutton
            fullWidth
            display={"block"}
            variant="transparent"
            color="dark"
            key={option}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            <Highlight highlight={value}>{option}</Highlight>
          </Button>
        ))
    : options.map((option) => (
        <Button
          vars={varsResolver}
          dropdownbutton
          fullWidth
          display={"block"}
          variant="transparent"
          color="dark"
          key={option}
          onClick={() => {
            onChange(option);
            setOpen(false);
          }}
        >
          {option}
        </Button>
      ));

  return (
    <Popover
      width={"target"}
      position="bottom"
      shadow="md"
      opened={open}
      zIndex={100}
    >
      <Popover.Target>
        <Input.Wrapper label={label} withAsterisk={withAsterisk}>
          <Input
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            radius="md"
            readOnly={!autoSuggestion}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rightSectionPointerEvents="all"
            rightSection={
              !autoSuggestion &&
              (open ? (
                <ChevronUpIcon onClick={() => setOpen(false)} />
              ) : (
                <ChevronDownIcon />
              ))
            }
          />
        </Input.Wrapper>
      </Popover.Target>
      <Popover.Dropdown>{listItem}</Popover.Dropdown>
    </Popover>
  );
};

export default DropDownInput;
