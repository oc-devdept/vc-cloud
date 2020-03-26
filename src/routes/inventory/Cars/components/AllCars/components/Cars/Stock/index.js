import React, { Component, useState, useEffect } from "react";

import api from "Api";
import VariantList from "./components/VariantList";
import VariantStock from "./components/VariantStock";
import DialogRoot from "Components/Dialog/DialogRoot";

const Index = ({ ProductID }) => {
  const [Variants, setVariants] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [ShowStock, setShowStock] = useState(false);
  const [Id, setId] = useState(null);

  const _StockView = id => {
    setShowStock(() => !ShowStock);
    if (Id == null) {
      setId(() => id);
    } else {
      setId(() => null);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(`products/${ProductID}/productVariant`);
      setVariants(() => result.data);
      setLoading(() => false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {Loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div>Loading</div>
          </div>
        ) : (
          <div>
            <VariantList
              title="Stock Inventory"
              tableData={Variants}
              borderRadius={"0px"}
              boxShadow={"none"}
              _StockView={_StockView}
            />
          </div>
        )}
      </div>

      {ShowStock && (
        <DialogRoot show={ShowStock} handleHide={_StockView} size={"md"}>
          <VariantStock id={Id} />
        </DialogRoot>
      )}
    </div>
  );
};

export default Index;
