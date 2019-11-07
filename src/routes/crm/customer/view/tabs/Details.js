import React from "react";
import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";

import {
  KeyInformation,
  PersonalInformation
} from "../../components/forms/Layout";

import { getDate } from "Helpers/helpers";

function CustomerDetailsTab(props) {
  const { cust } = props;
  return (
    <BgCard fullBlock>
      <KeyInformation
        fullWidth
        firstName={
          <EditableInput
            label="First Name"
            value={cust.baseContact.firstName}
          />
        }
        lastName={
          <EditableInput label="Last Name" value={cust.baseContact.lastName} />
        }
        owner={<EditableInput label="Owner" value={cust.userInfo.name} />}
        account={
          <EditableInput
            label="Account"
            value={cust.accountInfo && cust.accountInfo.name}
          />
        }
      />
      <hr />
      <PersonalInformation
        fullWidth
        email={<EditableInput label="Email" value={cust.baseContact.email} />}
        source={
          <EditableInput
            label="Source"
            value={cust.sourceInfo && cust.sourceInfo}
          />
        }
        mobile={
          <EditableInput label="Mobile" value={cust.baseContact.mobile} />
        }
        office={<EditableInput label="Office" value={cust.baseContact.phone} />}
        title={
          <EditableInput label="Job Title" value={cust.baseContact.title} />
        }
        fax={<EditableInput label="Fax" value={cust.baseContact.fax} />}
        address={<EditableInput label="Address" value={cust.fullAddress} />}
        birthday={
          <EditableInput
            label="Birthday"
            value={
              cust.baseContact.birthday && getDate(cust.baseContact.birthday)
            }
          />
        }
        description={
          <EditableInput label="Description" value={cust.baseContact.info} />
        }
      />
    </BgCard>
  );
}

export default CustomerDetailsTab;
