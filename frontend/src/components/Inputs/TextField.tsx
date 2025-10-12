import React from "react";
import { TextField } from "@mui/material";

interface AppTextFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const AppTextField: React.FC<AppTextFieldProps> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={(theme) => ({
        "& fieldset": { border: "none" },
        "& .MuiInputLabel-root": {
          color: theme.palette.primary.main,
        },
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      })}
    />
  );
};

export default AppTextField;
