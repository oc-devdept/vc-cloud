import React from "react";
import BgCard from "Components/BgCard";

import ProductList from "./ProductList";
import DealProductForm from "./DealProductForm";

function DealProducts(props) {
  const { products, dealClosed, dealId } = props;
  return (
    <BgCard fullBlock>
      <ProductList
        dealClosed={dealClosed}
        title="Products Involved"
        tableData={products}
        dealId={dealId}
      />
      <DealProductForm />
    </BgCard>
  );
}

export default DealProducts;
