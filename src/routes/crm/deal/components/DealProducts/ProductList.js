import React from "react";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

function ProductList(props) {
  const { tableData, title } = props;
  const columns = [
    {
      name: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false
      }
    },
    {
      label: "Product Name",
      name: "productInfo",
      options: {
        customBodyRender: value => value.name
      }
    },
    {
      label: "Price of Product",
      name: "price"
    },
    {
      label: "Tax",
      name: "gst"
    },
    {
      label: "Variant",
      name: "variantInfo",
      options: {
        display: "excluded",
        filter: false,
        sort: false
      }
    },
    {
      label: "Accessories",
      name: "accessoriesInfo",
      options: {
        display: "excluded",
        filter: false,
        sort: false
      }
    }
  ];

  const options = Object.assign({}, listOptions);
  options.search = false;
  options.filter = false;
  options.viewColumns = false;
  options.setTableProps = () => {
    return { size: "small" };
  };
  options.expandableRows = true;
  options.renderExpandableRow = (rowData, rowMeta) => {
    const colSpan = rowData.length + 1;
    const variant = rowData[4];
    const accessories = rowData[5];

    return (
      <React.Fragment>
        <TableRow>
          <TableCell className="p-30" colSpan={2}>
            <h4 className="text-left">Variant Infomation</h4>
            <div className="row justify-content-start">
              <div className="col-md-6">
                <dt>Name</dt>
              </div>
              <div className="col-md-6">
                <dt>Price</dt>
              </div>
            </div>
            {variant &&
              variant.map((v, key) => (
                <div key={key} className="row justify-content-start">
                  <div className="col-md-6">
                    <dd>{v.name}</dd>
                  </div>
                  <div className="col-md-6">
                    <dd>{v.price}</dd>
                  </div>
                </div>
              ))}
          </TableCell>
          <TableCell className="p-30" colSpan={2}>
            <h4 className="text-left">Accessories Infomation</h4>
            <div className="row justify-content-start">
              <div className="col-md-6">
                <dt>Name</dt>
              </div>
              <div className="col-md-6">
                <dt>Price</dt>
              </div>
            </div>
            {accessories &&
              accessories.map((v, key) => (
                <div key={key} className="row justify-content-start">
                  <div className="col-md-6">
                    <dd>{v.name}</dd>
                  </div>
                  <div className="col-md-6">
                    <dd>{v.price}</dd>
                  </div>
                </div>
              ))}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={options}
    />
  );
}

export default ProductList;
