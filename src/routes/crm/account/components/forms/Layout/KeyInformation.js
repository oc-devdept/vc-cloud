import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function KeyInformation(props) {
  const { name, industry, owner, ...others } = props;
  return (
    <FormInputLayout
      title="Key Information"
      desc="The key fields to get you started with a new Account record."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {name}
          {industry}
        </div>
        <div className="col-md-5 d-block offset-md-1">{owner}</div>
      </div>
    </FormInputLayout>
  );
}

export { KeyInformation };
