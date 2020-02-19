import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function DealFormLayout(props) {
  const {
    name,
    amount,
    closingDate,
    stage,
    customer,
    type,
    owner,
    account,
    source,
    description
  } = props;
  const layout = [
    {
      title: "Key Information",
      desc: "The key fields to get you started with a new Deal record.",
      leftCol: [name, stage, amount],
      rightCol: [owner, closingDate]
    },
    {
      title: "Deal Information",
      desc: "Storing information of the Deal to better understand them.",
      leftCol: [source, customer],
      rightCol: [type, account],
      fullRow: [description]
    }
  ];

  const form = layout.map((field, key) => (
    <React.Fragment key={key}>
      <FormInputLayout {...field} />
      <hr />
    </React.Fragment>
  ));

  return form;
}

export default DealFormLayout;
