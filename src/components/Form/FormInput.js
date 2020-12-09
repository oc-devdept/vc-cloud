import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(1),
    width: "100%"
  }
});

class FormInput extends PureComponent {
  render() {
    const {
      classes,
      value,
      handleChange,
      placeholder,
      disabled,
      required,
      label,
      selectValues,
      target,
      keys,
      helperText,
      selectValueKey,
      hasButton,
      ...others
    } = this.props;

    return (
      <FormControl className={classes.root}>
        {label && (
          <React.Fragment>
            <div className="
            labelTest">
              <InputLabel className="fw-bold " shrink>
                {label}
              </InputLabel>
            </div>
            { hasButton && <Button className="textButton" variant="contained" size="small" style={{
              backgroundColor: "#212e66"
            }} onClick={ e => this.props.buttonClick && this.props.buttonClick(target)}>Select</Button>
            }
          </React.Fragment>
        )}
        {selectValues ? (
          <Select
            value={value}
            onChange={e => handleChange(target, e.target.value, keys)}
            input={<BaseInput {...others} />}
          >
            {selectValues &&
              selectValues.map((select, key) => (
                <MenuItem
                  key={key}
                  value={select[selectValueKey ? selectValueKey : "value"]}
                >
                  {select.name}
                </MenuItem>
              ))}
          </Select>
        ) : (<BaseInput
          value={value}
          onChange={e => handleChange(target, e.target.value, keys)}
          placeholder={placeholder}
          disabled={disabled}
          {...others}
        />
          )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {required && <FormHelperText error>* Required Field</FormHelperText>}
      </FormControl>
    );
  }
}

export default withStyles(styles)(FormInput);
