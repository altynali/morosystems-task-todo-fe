import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { FC } from "react";
import { Option } from "../../redux/todo/types";

type MySelectProps = {
  name: string;
  label: string;
  options: Option[];
  helperText?: string;
} & SelectProps;

export const MySelect: FC<MySelectProps> = ({
  name,
  label,
  defaultValue,
  options,
  helperText,
  ...props
}) => {
  return (
    <>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        {...props}
        defaultValue={defaultValue}
        labelId={name}
        label={label}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {/* disabled={value === defaultValue}> */}
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText ? <FormHelperText error>{helperText}</FormHelperText> : null}
    </>
  );
};
