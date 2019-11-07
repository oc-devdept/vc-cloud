import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function PersonalInformation(props) {
  const {
    email,
    mobile,
    title,
    source,
    office,
    fax,
    address,
    description,
    birthday,
    ...others
  } = props;
  return (
    <FormInputLayout
      title="Personal Information"
      desc="Storing information of the Customer to better understand them."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {email}
          {mobile}
          {title}
          {birthday}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {source}
          {office}
          {fax}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11">{address}</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { PersonalInformation };
