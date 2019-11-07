import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function KeyInformation(props) {
  const { firstName, lastName, owner, company, status, ...others } = props;
  return (
    <FormInputLayout
      title="Key Information"
      desc="The key fields to get you started with a new Lead record."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {firstName}
          {lastName}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {owner}
          {company}
          {status}
        </div>
      </div>
    </FormInputLayout>
  );
}

export { KeyInformation };
