import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function AccountInformation(props) {
  const { office, website, fax, description, ...others } = props;
  return (
    <FormInputLayout
      title="Account Information"
      desc="The key fields to get you started with a new Account record."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {office}
          {website}
        </div>
        <div className="col-md-5 d-block offset-md-1">{fax}</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { AccountInformation };
