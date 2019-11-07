import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function DealInformation(props) {
  const { source, customer, type, description, ...others } = props;
  return (
    <FormInputLayout
      title="Deal Information"
      desc="The key fields to get you started with a new Deal record."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {source}
          {customer}
        </div>
        <div className="col-md-5 d-block offset-md-1">{type}</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { DealInformation };
