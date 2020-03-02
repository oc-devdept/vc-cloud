import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

import { Button, TableRow, TableCell } from "@material-ui/core";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.newProduct = this.newProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }
  newProduct() {
    this.props.show("deal_product");
  }
  editProduct(id) {
    const edit = this.props.tableData.find(tabledat => tabledat.id == id);
    this.props.show("deal_product", { edit });
  }
  render() {
    const { tableData, title } = this.props;
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
        name: "Action",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(tableMeta.rowData[0]);
          }
        }
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
    options.customToolbar = () => {
      return (
        <Button /* onClick={newFollowup} */ variant="outlined" size="small">
          Add Product
        </Button>
      );
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
              <div className="row justify-content-start ">
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
}

export default connect(null, { show })(ProductList);
