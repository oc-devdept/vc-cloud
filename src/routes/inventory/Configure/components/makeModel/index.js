import React from "react";

import Tag from "./tags";
import MakeModel from "./makeModels";

export default function inv_setting_makemodels() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <MakeModel />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Tag />
        </div>
      </div>
    </React.Fragment>
  );
}

inv_setting_makemodels.getinitalprops = () => {
  return id;
};
