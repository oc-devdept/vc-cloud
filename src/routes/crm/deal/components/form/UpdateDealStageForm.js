import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AmountInput from "Components/Form/Inputs/AmountInput";
import FormControl from "@material-ui/core/FormControl";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class UpdateDealStageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      mouseOver: false
    };
    this.clickEdit = this.clickEdit.bind(this);
  }

  clickEdit() {
    this.setState(state => ({ edit: !state.edit, mouseOver: false }));
  }
  handleMouseOver = event => {
    if (!this.state.mouseOver) {
      this.setState({ mouseOver: true });
    }
  };
  handleMouseOut = event => {
    if (this.state.mouseOver) {
      this.setState({ mouseOver: false });
    }
  };

  render() {
    const { edit } = this.state;
    return (
      <div>
        <div className="form-group">
          <FormControl fullWidth>
            <AmountInput
              label="Deal Amount"
              disabled={!edit}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
              // onChange={e => handleChangeConvertLead("amount", e.target.value) }
              inputProps={{
                endAdornment: this.state.mouseOver ? (
                  <InputAdornment position="end">
                    <IconButton onClick={this.clickEdit}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                )
              }}
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl fullWidth>
            <TextField
              id="date"
              label="Closing Date"
              disabled={!edit}
              type="date"
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
              // onChange={e => handleChangeConvertLead( "closingDate", e.target.value )}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: this.state.mouseOver ? (
                  <InputAdornment position="end">
                    <IconButton onClick={this.clickEdit}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                )
              }}
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

export default UpdateDealStageForm;
