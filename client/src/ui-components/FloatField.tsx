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
 * A controlled MUI `TextField` restricted to a Float of desired precision
 * within the inclusive bounds if given. Accepts all props that a MUI TextField
 * accepts
 *
 * Renders `value` and, whenever the user changes the input, `onChange` is
 * triggered with the user-assigned value rounded to the desired precision.
 */
const FloatField: React.FC<{
  value: number;
  onChange?: (value: number) => void;
  /** The label at the top of the text input */
  label?: React.ReactNode;
  /** Default, `2`. The number of decimal places to allow and render. */
  precision?: number;
  /** Default, `10**(-precision)`.The step size of the default input. */
  step?: number;
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
  precision = 2,
  step,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  tooltipMsg,
  units,
  componentProps,
  ...rest
}) => {
  const granularity = step ?? 10 ** -precision;
  const [focused, setFocused] = useState(false);
  // Without this state, input cannot take intermediate values like ""
  const [localValue, setLocalValue] = useState(value.toFixed(precision));
  useEffect(() => {
    setLocalValue((old) => {
      // Overwritten value by something other than the user
      if (!focused) return value.toFixed(precision);
      // Overwritten to a different number while typing
      return old;
    });
  }, [setLocalValue, value, precision, focused]);

  // Ensures that the given min and max are rounded to the desired precision
  const minValue = _.round(min, precision);
  const maxValue = _.round(max, precision);

  /** Restricts the value to the desired precision betw min and max, inclusive */
  const toLegalValue = (n: number) => {
    const roundedValue = _.round(n, precision);
    const clampedValue = _.clamp(roundedValue, minValue, maxValue);
    return clampedValue;
  };

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
        label={label}
        type="number"
        inputProps={{ step: granularity }}
        value={localValue}
        onChange={(e) => {
          // The temporary value can be anything
          setLocalValue(e.target.value);
          // Feed the onChange a legal value, desired precision and range
          const legalValue = toLegalValue(Number(e.target.value));
          onChange?.(legalValue);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          // The temporary value must now resolve to a legal value
          const legalValue = toLegalValue(Number(localValue));
          setLocalValue(String(legalValue));
        }}
        InputProps={{
          endAdornment:
            units === undefined ? undefined : (
              <InputAdornment position="end">{units}</InputAdornment>
            ),
        }}
        {...componentProps}
        {...rest}
      />
    </Tooltip>
  );
};

export default FloatField;
