import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function CustomerFormLayout(props) {
  const {
    firstName,
    lastName,
    subscribed,
    member,
    owner,
    account,
    email,
    mobile,
    title,
    birthday,
    source,
    office,
    fax,
    nationality,
    address,
    description
  } = props;
  const layout = [
    {
      title: "Key Information",
      desc: "The key fields to get you started with a new Customer record.",
      leftCol: [firstName, lastName, member, subscribed],
      rightCol: [owner, account]
    },
    {
      title: "Personal Information",
      desc: "Storing information of the Customer to better understand them.",
      leftCol: [email, mobile, title, birthday],
      rightCol: [source, office, fax, nationality],
      fullRow: [address, description]
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

export default CustomerFormLayout;
