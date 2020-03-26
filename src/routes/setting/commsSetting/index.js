import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "redux-modal";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import CommsList from "./components/CommsList";
import CommsDialog from "./components/CommsDialog";

import {
  getCommission,
  updateCommission,
  createCommission,
  deleteCommission
} from "Ducks/setting/commission";

export default function commsSetting() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCommission());
  }, []);

  const { list, loading } = useSelector(state => state.commissionState);

  const addComms = data => dispatch(createCommission(data));
  const editComms = data => dispatch(updateCommission(data));
  const deleteComms = data => dispatch(deleteCommission(data));

  const showDialog = toEdit => {
    let edit;
    if (toEdit) edit = list.find(li => li.id == toEdit);
    return dispatch(
      show("comms_form", {
        edit,
        action: toEdit ? editComms : addComms
      })
    );
  };

  const deleteDialog = toDelete =>
    dispatch(show("alert_delete", { action: () => deleteComms(toDelete) }));

  return (
    <BgCard fullBlock heading="Commission Rates">
      {loading && <RctSectionLoader />}
      <CommsList
        tableData={list}
        showDialog={showDialog}
        deleteAction={deleteDialog}
      />
      <CommsDialog />
    </BgCard>
  );
}
