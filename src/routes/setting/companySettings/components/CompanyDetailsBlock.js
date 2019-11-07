import React from "react";

import SettingsTab from "./Tabs/SettingsTab";
import DetailsTab from "./Tabs/DetailsTab";
import TabsWrapper from "Components/Tabs/TabsWrapper";

const CompanyDetailsBlock = ({ company }) => {
  return (
    <React.Fragment>
      <TabsWrapper>
        <div icon="zmdi-comment text-success" label="Details">
          <DetailsTab company={company} />
        </div>
        <div icon="zmdi-settings text-warning" label="Settings">
          <SettingsTab />
        </div>
      </TabsWrapper>
    </React.Fragment>
  );
};

export default CompanyDetailsBlock;
