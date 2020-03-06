import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { Delete } from "@material-ui/icons";
import { Button, TableRow, TableCell, IconButton } from "@material-ui/core";

// Actions
import { addDealProduct, deleteDealProduct } from "Ducks/crm/deal";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.newProduct = this.newProduct.bind(this);
    // this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  newProduct(dealId) {
    this.props.show("deal_product", {
      action: this.props.addDealProduct,
      dealId
    });
  }
  // editProduct(id) {
  //   const edit = this.props.tableData.find(tabledat => tabledat.id == id);
  //   console.log(edit);
  //   this.props.show("deal_product", { edit });
  // }
  deleteProduct(id) {
    this.props.show("alert_delete", {
      action: () => {
        this.props.deleteDealProduct(this.props.dealId, id);
      }
    });
  }
  render() {
    const { tableData, title, dealClosed, dealId } = this.props;
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
        name: "tax"
      },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          setCellProps: () => ({ className: "text-center" }),
          setCellHeaderProps: () => ({ className: "text-center" }),
          customBodyRender: (value, tableMeta, updateValue) => (
            <React.Fragment>
              {/* <IconButton
                disabled={dealClosed}
                onClick={() => this.editProduct(tableMeta.rowData[0])}
                size="small"
              >
                <Edit fontSize="inherit" />
              </IconButton> */}
              <IconButton
                disabled={dealClosed}
                onClick={() => this.deleteProduct(tableMeta.rowData[0])}
                size="small"
                className="ml-20"
              >
                <Delete className="text-danger" fontSize="inherit" />
              </IconButton>
            </React.Fragment>
          )
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
    options.rowsPerPage = 5;
    options.rowsPerPageOptions = [5, 10, 15];
    options.setTableProps = () => {
      return { size: "small" };
    };
    options.customToolbar = () => {
      return (
        <Button
          onClick={() => this.newProduct(dealId)}
          disabled={dealClosed}
          variant="outlined"
          size="small"
        >
          Add Product
        </Button>
      );
    };
    options.expandableRows = true;
    options.renderExpandableRow = (rowData, rowMeta) => {
      const variant = rowData[5];
      const accessories = rowData[6];
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

export default connect(null, { show, addDealProduct, deleteDealProduct })(
  ProductList
);
