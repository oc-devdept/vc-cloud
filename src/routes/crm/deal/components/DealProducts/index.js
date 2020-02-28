import React from "react";
import BgCard from "Components/BgCard";

import ProductList from "./ProductList";

function DealProducts(props) {
  const { products } = props;
  return (
    <BgCard fullBlock>
      <ProductList title="Products Involved" tableData={products} />
    </BgCard>
  );
}

export default DealProducts;
