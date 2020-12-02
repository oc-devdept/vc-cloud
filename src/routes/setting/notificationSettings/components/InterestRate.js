import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import FormInput from "Components/Form/FormInput";

const InterestRate = ({
  interestRate,
  updateInterestRate,
  addInterestRate
}) => {
  const [interestRateValue, setInterestRateValue] = useState("");
  const [err, setErr] = useState("Enter a new interest rate");

  // accepts 0.01 to 9.99 with a max of 2 decimal places
  const interestRateRegex = /^\d(\.\d{1,2})?$/;

  const handleChange = (field, value) => {
    setInterestRateValue(value);
    if (!interestRateRegex.test(value)) {
      setErr("Please enter a valid interest rate");
    } else {
      setErr("");
    }
  };

  const onClick = () => {
    if (Object.keys(interestRate).length === 0) {
      const interestRate = { interestRate: interestRateValue };
      addInterestRate(interestRate);
    } else {
      interestRate.interestRate = interestRateValue;
      updateInterestRate(interestRate);
    }
  };

  return (
    <React.Fragment>
      <FormInput
        label="Interest Rate for Loan Calculator"
        value={interestRateValue}
        placeholder={`Current interest rate set: ${interestRate.interestRate}`}
        target="interestRate"
        handleChange={handleChange}
      />
      <div className="d-flex flex-row-reverse align-items-center my-20">
        <Button
          variant="contained"
          className={`${!!err ? "btn-disabled" : "btn-success"} text-white`}
          onClick={onClick}
        >
          Save
        </Button>
        <span className="text-danger mr-20">{err}</span>
      </div>
    </React.Fragment>
  );
};

export default InterestRate;
