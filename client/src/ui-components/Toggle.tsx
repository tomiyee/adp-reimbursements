import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';

/**
 * A controlled wrapper around the MUI Checkbox, meaning state
 * is not controlled by the checkbox itself. Named Toggle to
 * avoid conflicting with MUI Checkbox
 */
const Toggle: React.FC<{
  /** The text to show besides the checkbox */
  label: string;
  /** The controlled value state */
  value: boolean;
  /** The callback fn whenever the checkbox is toggled */
  setValue?: (arg0: boolean) => void;
  /** Additional props to add to the MUI Checkbox */
  InputProps?: CheckboxProps;
  /** Additional props to add to the MUI Form Label */
  LabelProps?: FormControlLabelProps;
}> = ({ label, value, setValue, InputProps, ...rest }) => (
  <FormControlLabel
    label={label}
    {...rest}
    control={
      <Checkbox
        checked={value}
        onChange={(_, val) => setValue?.(val)}
        disabled={setValue === undefined}
        {...InputProps}
      />
    }
  />
);

export default Toggle;
