import React, { Component, useState, useEffect } from "react";
import {show } from 'redux-modal';
import { useDispatch } from 'react-redux';
import api from "Api";

import Image from "Components/Image";
import StaticName from "Components/Inventory/StaticName";
import Text from "Components/Inventory/Text";
import Button from "Components/Inventory/Button";

import Input from "Components/Inventory/Input";
import DialogRoot from "Components/Dialog/DialogRoot";

import RecordsList from "Components/RecordsList";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Edit, Delete, ExpandMore, Done } from "@material-ui/icons";
import Moment from "moment";

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = keys => {
  const { name, trackingId, ship_count, status } = keys;
  let errorForm = "";
  let Reject = true;
  if (name == "") {
    Reject = false;
    errorForm = "Please fill up the name of your order";
  }
  if (trackingId == 0) {
    Reject = false;
    errorForm = "Please input your tracking Id";
  }
  if (ship_count == 0) {
    Reject = false;
    errorForm = "Please state your quantity";
  }
  if (status == "") {
    Reject = false;
    errorForm = "Please select a status";
  }
  return [Reject, errorForm];
};

const initForm = {
  name: "",
  trackingId: "",
  ship_count: 0,
  stock_count: 0,
  status: "",
  estimate_time_delivery: "nil"
};

const StatusOption = [
  "INDENT",
  "INCOMING",
  "ETA",
  "PORT",
  "STOCK",
  "FINAL INSP",
  "VAC READY"
];

const DeliveryDate = {
  INDENT: "3 - 6",
  INCOMING: "3",
  ETA: "1 - 1.5",
  PORT: "1",
  STOCK: "0.5 - 1",
  "FINAL INSP": "0.5",
  "VAC READY": "0"
};

const index = ({ id }) => {
  const [OrderHistory, setOrderHistory] = useState([]);
  const [FormOrder, setFormOrder] = useState({ edit: false, form: {} });
  

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(`/productvariantvalues/${id}/stockhistory`);
      setOrderHistory(() => result.data);
    }
    fetchData();
  }, []);

  const submitOrder = async form => {
    const result = validateForm(form);

    if (result[0]) {
      try {
        await api.post(`/stockhistories/createStockOrder`, {
          data: { form, id: id }
        });
        const result = await api.get(
          `/productvariantvalues/${id}/stockhistory`
        );
        setOrderHistory(() => result.data);
        NotificationManager.success("Stock order form submitted successfully");
      } catch (e) {
        console.log(e);
      }
    } else {
      NotificationManager.error(result[1]);
    }
  };

  const submitEditOrder = async form => {
    const result = validateForm(form);

    if (result[0]) {
      try {
        await api.patch(`/stockhistories/editStockOrder`, {
          data: { form, id: id }
        });
        const result = await api.get(
          `/productvariantvalues/${id}/stockhistory`
        );
        setOrderHistory(() => result.data);
        NotificationManager.success("Stock order form submitted successfully");
      } catch (e) {
        console.log(e);
      }
    } else {
      NotificationManager.error(result[1]);
    }
  };

  const editOrder = async rowIndex => {
    setFormOrder(() => ({ edit: true, form: OrderHistory[rowIndex] }));
  };

 

  const restartOrder = () => {
    setFormOrder(() => ({ edit: false, form: {} }));
  };

  const dispatch = useDispatch();
  const deleteOrder = async rowIndex => {
    let data = OrderHistory[rowIndex];
    dispatch(show("alert_delete", {
      name: data.name,
      action: () => handleSingleDelete(data.id)
    }))
  }

  const handleSingleDelete = async itemId => {
    try {
      //delete the notes
      await api.delete(`/stockhistories/${itemId}/notes`);
      //delete the stock
      await api.delete(`/stockhistories/${itemId}`);
      const result = await api.get(
        `/productvariantvalues/${id}/stockhistory`
      );
      setOrderHistory(() => result.data);
      NotificationManager.success("Stock deleted");

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {OrderHistory.length > 0 ? (
        <div>
          <List
            title={"STOCK ORDERS"}
            tableData={OrderHistory}
            editOrder={editOrder}
            deleteOrder={deleteOrder}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          No Stock Order
        </div>
      )}

      <div style={{ marginTop: 25, marginBottom: 25 }}>
        {!FormOrder.edit ? (
          <Form submitOrder={submitOrder} restartOrder={restartOrder} />
        ) : (
          <EditForm
            FormOrder={FormOrder}
            submitEditOrder={submitEditOrder}
            restartOrder={restartOrder}
          />
        )}
      </div>
    </div>
  );
};

const List = ({ loading, title, tableData, editOrder, deleteOrder }) => {
  
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "TRACKING ID",
      name: "trackingId",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "NAME",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "QUANTITY",
      name: "ship_count",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "STOCK QUANTITY",
      name: "stock_count",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "STATUS",
      name: "status",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "ESTIMATE DELIVERY (MONTHS)",
      name: "estimate_time_delivery",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      name: "ACTIONS",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (rowData, rowState) => {
          return (<React.Fragment>
            <Edit onClick={() => editOrder(rowState.rowIndex)} />
            &nbsp;
            <Delete onClick={() => deleteOrder(rowState.rowIndex)} />
            </React.Fragment>);
        }
      }
    },
  ];

  const listOptions = {
    filterType: "dropdown",
    responsive: "stacked",
    selectableRows: "none",
    expandableRows: true, // Try Adding This
    print: false,
    download: false,
    viewColumns: false,
    search: false,
    filter: false,
    // onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <TableRow>
          <TableCell colSpan={rowData.length} style={{ padding: 0, flex: 1 }}>
            <StockHistoryOrder id={rowData[0]} />
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={listOptions}
      borderRadius={"0px"}
      boxShadow={"none"}
    />
  );
};

const StockHistoryOrder = ({ id }) => {
  const [Notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get(`/stockhistories/${id}/notes`);
        setNotes(() => result.data);
        setLoading(() => false);
      } catch (e) {
        setNotes(() => []);
        setLoading(() => false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {!Loading ? (
        <div>
          {Notes.length > 0 ? (
            <NoteComponent Notes={Notes} />
          ) : (
            <div>No item</div>
          )}
        </div>
      ) : (
        <div>Loading ..</div>
      )}
    </div>
  );
};

const NoteComponent = ({ Notes }) => {
  return (
    <div>
      <NoteList tableData={Notes} />
    </div>
  );
};

const NoteList = ({ loading, title, tableData }) => {
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Title",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "Description",
      name: "content",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },
    {
      label: "Created On",
      name: "createdAt",
      options: {
        customBodyRender: (value, tableMeta) => {
          return Moment(new Date(value)).format("LLL");
        }
      }
    }
  ];

  const listOptions = {
    filterType: "dropdown",
    responsive: "stacked",
    selectableRows: "none",
    expandableRows: false, // Try Adding This
    print: false,
    download: false,
    viewColumns: false,
    search: false,
    filter: false
    // onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
  };

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={listOptions}
      borderRadius={"0px"}
      boxShadow={"none"}
    />
  );
};

const Form = ({ submitOrder, restartOrder }) => {
  const [FormFields, setFormFields] = useState({ ...initForm });
  const [ShowForm, setShowForm] = useState(false);

  // const [FormFields, setFormFields] = useState({...initForm})

  const _HandleFields = (e, element) => {
    setFormFields(Form => ({ ...Form, [element]: e }));
  };

  const _setFormFieldStatus = e => {
    // DeliveryDate
    const estimateDate = DeliveryDate[e.target.value];
    setFormFields(Form => ({
      ...Form,
      status: e.target.value,
      estimate_time_delivery: estimateDate
    }));
  };

  return (
    <div className="d-flex flex-column " style={{ flex: 1 }}>
      {ShowForm ? (
        <div>
          <div
            className="d-flex flex-row align-items-center"
            style={{ flex: 1, width: "100%" }}
          >
            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Tracking Id"
              placeholder="e.g 4410193"
              value={FormFields.trackingId}
              element={"trackingId"}
              _HandleProduct={_HandleFields}
            />

            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Name"
              placeholder="e.g Model i330"
              value={FormFields.name}
              element={"name"}
              _HandleProduct={_HandleFields}
            />

            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Quantity"
              placeholder="e.g 11"
              value={FormFields.ship_count}
              element={"ship_count"}
              _HandleProduct={_HandleFields}
              type="number"
            />

            {/* <Input
                            // divStyle={{width: '0%'}}
                            title="Status"
                            placeholder="e.g Processing"
                            value={FormFields.status}
                            element={'status'}
                            _HandleProduct={_HandleFields}
                        /> */}
            <div
              className="d-flex flex-column flex-fill"
              style={{ marginRight: 15 }}
            >
              <StaticName title={"Status"} />
              <FormControl>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={FormFields.status ? FormFields.status : ""}
                  onChange={_setFormFieldStatus}
                  style={{ minWidth: 100, marginLeft: 5 }}
                >
                  {StatusOption.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <Text
              title={"Wait Time (Months)"}
              value={FormFields.estimate_time_delivery}
              divStyle={{ width: "100%" }}
            />
          </div>

          <div
            className="d-flex flex-row justify-content-end"
            style={{ marginTop: 20 }}
          >
            <Button
              divStyle={{ marginRight: 25 }}
              _Function={() => submitOrder(FormFields)}
              product={""}
              files={""}
              title={"CREATE ORDER"}
            />

            <Button
              _Function={() => {
                setShowForm(() => false);
                restartOrder();
              }}
              product={""}
              files={""}
              title={"CLOSE"}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button
            _Function={() => setShowForm(() => true)}
            product={""}
            files={""}
            title={"ADD ORDER"}
          />
        </div>
      )}
    </div>
  );
};

const EditForm = ({ submitEditOrder, FormOrder, restartOrder }) => {
  const [FormFields, setFormFields] = useState(FormOrder.form);

  useEffect(() => {
    async function fetchData() {
      setFormFields(() => FormOrder.form);
    }
    fetchData();
  }, [FormOrder]);

  const _HandleFields = (e, element) => {
    setFormFields(Form => ({ ...Form, [element]: e }));
  };

  const _setFormFieldStatus = e => {
    // DeliveryDate
    const estimateDate = DeliveryDate[e.target.value];
    setFormFields(Form => ({
      ...Form,
      status: e.target.value,
      estimate_time_delivery: estimateDate
    }));
  };

  return (
    <div className="d-flex flex-column " style={{ flex: 1 }}>
      {FormOrder.edit && (
        <div>
          <div
            className="d-flex flex-row align-items-center"
            style={{ flex: 1, width: "100%" }}
          >
            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Tracking Id"
              placeholder="e.g Model i330"
              value={FormFields.trackingId}
              element={"trackingId"}
              _HandleProduct={_HandleFields}
            />

            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Name"
              placeholder="e.g Model i330"
              value={FormFields.name}
              element={"name"}
              _HandleProduct={_HandleFields}
            />

            <Input
              divStyle={{ width: "100%", marginRight: 15 }}
              title="Quantity"
              placeholder="e.g 11"
              value={FormFields.ship_count}
              element={"ship_count"}
              _HandleProduct={_HandleFields}
              type="number"
            />

            {/* <Input
                            // divStyle={{width: '0%'}}
                            title="Status"
                            placeholder="e.g Processing"
                            value={FormFields.status}
                            element={'status'}
                            _HandleProduct={_HandleFields}
                        /> */}
            <div
              className="d-flex flex-column flex-fill"
              style={{ marginRight: 15 }}
            >
              <StaticName title={"Status"} />
              <FormControl>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={FormFields.status ? FormFields.status : ""}
                  onChange={_setFormFieldStatus}
                  style={{ minWidth: 100, marginLeft: 5 }}
                >
                  {StatusOption.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <Text
              title={"Wait Time (Months)"}
              value={FormFields.estimate_time_delivery}
              divStyle={{ width: "100%" }}
            />
          </div>

          <div
            className="d-flex flex-row justify-content-end"
            style={{ marginTop: 20 }}
          >
            <Button
              divStyle={{ marginRight: 25 }}
              _Function={() => submitEditOrder(FormFields)}
              product={""}
              files={""}
              title={"EDIT ORDER"}
            />

            <Button
              _Function={restartOrder}
              product={""}
              files={""}
              title={"CLOSE"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
