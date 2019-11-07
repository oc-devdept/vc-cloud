import React from "react";

// Form Components
import AmountInput from "Components/Form/Inputs/AmountInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import FormInput from "Components/Form/FormInput";
import BaseInput from "Components/Form/BaseInput";

const ConvertLeadForm = ({ dealStage, dealDetails, handleChange }) => {
  return (
    <div>
      <form autoComplete="off">
        <FormInput
          label="Name"
          value={dealDetails.name}
          target="name"
          handleChange={handleChange}
        />
        <AmountInput
          value={dealDetails.amount}
          label="Deal Amount"
          onChange={e => handleChange("amount", e.target.value)}
        />
        <FormInput
          label="Closing Date"
          value={dealDetails.closingDate}
          target="closingDate"
          handleChange={handleChange}
          type="date"
        />
        <FormControl fullWidth style={{ margin: "8px" }}>
          <InputLabel className="fw-bold" shrink htmlFor="stage">
            Stage
          </InputLabel>
          <Select
            value={dealDetails.stageId}
            onChange={e => handleChange("stageId", e.target.value)}
            input={<BaseInput />}
          >
            {dealStage &&
              dealStage.map((stage, key) => (
                <MenuItem key={key} value={stage.id}>
                  {`${stage.name} - ${stage.chance}%`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default ConvertLeadForm;
