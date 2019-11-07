import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function CompanyInformation(props) {
  const { industry, website, office, fax, address, ...others } = props;
  return (
    <FormInputLayout
      title="Company Information"
      desc="Keeping details of Lead's company can go a long way. This information will be used for Accounts on successful conversion."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {industry}
          {website}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {office}
          {fax}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11 d-block">{address}</div>
      </div>
    </FormInputLayout>
  );
}

export { CompanyInformation };
