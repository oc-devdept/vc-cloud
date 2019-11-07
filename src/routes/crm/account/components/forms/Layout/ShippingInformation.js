import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function ShippingInformation(props) {
  const { address, ...others } = props;
  return (
    <FormInputLayout
      title="Shipping Information"
      desc="The key fields to get you started with a new Account record."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-11">{address}</div>
      </div>
    </FormInputLayout>
  );
}

export { ShippingInformation };
