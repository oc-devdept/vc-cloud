import React from "react";
import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";
import CustomerFormLayout from "../../components/Layout/CustomerFormLayout";

import { getDate, getDateTime } from "Helpers/helpers";

function CustomerDetailsTab(props) {
  const { cust } = props;
  const fields = {
    firstName: <EditableInput label="Name" value={cust.name} />,
    lastName: (
      <EditableInput
        label="Last Contact"
        value={cust.lastContact && getDateTime(cust.lastContact)}
      />
    ),
    owner: (
      <EditableInput
        label="Owner"
        value={cust.userInfo && cust.userInfo.name}
      />
    ),
    member: (
      <EditableInput
        label="Member Since"
        value={cust.customer && getDate(cust.customer.createdAt)}
      />
    ),
    account: (
      <EditableInput
        label="Account"
        value={cust.accountInfo && cust.accountInfo.name}
      />
    ),
    email: <EditableInput label="Email" value={cust.baseContact.email} />,
    mobile: <EditableInput label="Mobile" value={cust.baseContact.mobile} />,
    title: <EditableInput label="Job Title" value={cust.baseContact.title} />,

    birthday: (
      <EditableInput
        label="Birthday"
        value={cust.baseContact.birthday && getDate(cust.baseContact.birthday)}
      />
    ),
    source: (
      <EditableInput
        label="Source"
        value={cust.sourceInfo && cust.sourceInfo}
      />
    ),
    office: <EditableInput label="Office" value={cust.baseContact.phone} />,
    fax: <EditableInput label="Fax" value={cust.baseContact.fax} />,
    nationality: <EditableInput label="Nationality" value={cust.fullAddress} />,
    address: <EditableInput label="Address" value={cust.fullAddress} />,
    description: (
      <EditableInput label="Description" value={cust.baseContact.info} />
    )
  };
  return (
    <BgCard fullBlock>
      <CustomerFormLayout {...fields} />
    </BgCard>
  );
}

export default CustomerDetailsTab;
