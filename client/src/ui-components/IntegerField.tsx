import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

/**
 * A MUI `TextField` that restricts the input to be an Integer within the
 * inclusive bounds, if given.
 */
const IntegerField: React.FC<{
  value: number;
  onChange?: (value: number) => void;
  /** The label at the top of the text input */
  label?: React.ReactNode;
  /** Default no min. The minimum value to allow, inclusive */
  min?: number;
  /** Default no max. The maximum value to allow, inclusive */
  max?: number;
  /** The units, if any, to show at the end of the input. */
  units?: string;
  /** The tooltip message when selected, or no tooltip if undefined. */
  tooltipMsg?: string;
  /** Various MUI Text Field Properties to forward */
  size?: 'medium' | 'small';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  /** A catch-all for any other props to pass to the underlying Text Field */
  componentProps?: TextFieldProps;
}> = ({
  value,
  label,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  units,
  tooltipMsg,
  componentProps,
  ...rest
}) => {
  // Without this state, input cannot take intermediate values like the empty string
  const [localValue, setLocalValue] = useState(String(value));
  useEffect(() => setLocalValue(String(value)), [setLocalValue, value]);

  /** Converts the number to an int (floored) betw the min and max value, inclusive */
  const toLegalValue = (n: number) => _.clamp(_.floor(n), min, max);

  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => tooltipMsg !== undefined && setOpen(true);

  return (
    <Tooltip
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      title={<Typography>{tooltipMsg}</Typography>}
    >
      <TextField
        variant="outlined"
        label={label}
        type="number"
        value={localValue}
        onChange={(e) => {
          // The temporary value can be anything
          setLocalValue(e.target.value);
          // Feed the onChange a legal value, desired precision and range
          const legalValue = toLegalValue(Number(e.target.value));
          onChange?.(legalValue);
        }}
        onBlur={() => {
          // The temporary value must now resolve to a legal value
          const legalValue = toLegalValue(Number(localValue));
          setLocalValue(String(legalValue));
        }}
        InputProps={
          units === undefined
            ? undefined
            : {
                endAdornment: (
                  <InputAdornment position="end">{units}</InputAdornment>
                ),
              }
        }
        {...rest}
        {...componentProps}
      />
    </Tooltip>
  );
};

export default IntegerField;
