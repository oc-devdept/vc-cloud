import React, { PureComponent } from "react";

import Image from "Components/Image";

import Checkbox from "@material-ui/core/Checkbox";

import Input from "Components/Inventory/Input";
import Text from "Components/Inventory/Text";
import Button from "Components/Inventory/Button";
import StaticName from "Components/Inventory/StaticName";

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addItemInformation: { ...this.props.Fields },
      isDefault: false
    };

    this._HandleCheckBox = this._HandleCheckBox.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.addItemInformation.id != this.props.Fields.id) {
      return this.props.Fields;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.setState({ addItemInformation: { ...this.props.Fields } });
    }
  }

  _HandleCheckBox = e => {
    this.setState({ ...this.state, isDefault: e.target.checked });
  };

  _HandleAddProductDetailValue = e => {
    let addItemInformation = { ...this.state.addItemInformation };
    addItemInformation.price = e;
    this.setState({ addItemInformation: addItemInformation });
  };

  render() {
    const e = this.state.addItemInformation;

    if (!e) {
      return null;
    }

    // console.log(e)

    return (
      <div
        className="d-flex"
        style={{
          flexDirection: "column",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}
      >
        <div
          className="d-flex"
          style={{ justifyContent: "flex-start", flexDirection: "row" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
            <StaticName title="CURRENT IMAGE" />
            {e.files.length > 0 && (
              <Image imageSource={e.files} single={true} />
            )}
          </div>

          <Text
            divStyle={{ width: "30%" }}
            title="PRICE"
            value={`${e.price} SGD`}
          />
          {/* <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="PRICE"
                        placeholder="e.g 890"
                        value={e.price}
                        element={'value'}
                        _HandleProduct={this._HandleAddProductDetailValue}
                        type="number"
                    />  */}
          <Text
            divStyle={{ width: "100%" }}
            title="DESCRIPTION"
            value={`${e.description}`}
          />

          <div className="d-flex flex-column" style={{ width: "30%" }}>
            <StaticName title="DEFAULT" />
            <div>
              <Checkbox
                edge="end"
                onChange={this._HandleCheckBox}
                checked={this.state.isDefault}
                name="isDefault"
              />
            </div>
          </div>
          {/* <Text
                        divStyle={{width: '30%'}}
                        title="IsDefault"
                        value={`${e.isDefault}`}
                    />

                    <Text
                        divStyle={{width: '30%'}}
                        title="Editable"
                        value={`${e.editable}`}
                    /> */}

          {/* <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>IsDefault</span>
                        <span>{`${e.isDefault}`}</span>
                    </div>

                    <div style={{display:'flex', flexDirection:"column", marginRight: 20}}>
                        <span>Editable</span>
                        <span>{`${e.editable}`}</span>
                    </div> */}
        </div>

        <div
          className="d-flex"
          style={{
            justifyContent: "flex-end",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          {/* <button onClick={() => this.props._HandleSaveProductOption(this.state.addItemInformation)}>ADD</button>      */}
          <Button
            _Function={e =>
              this.props._HandleSaveProductOption(e, this.state.isDefault)
            }
            product={this.state.addItemInformation}
            files={""}
            title={"ADD"}
          />
          {/* <button onClick={this.props._HandleCancelProductOption}>Cancel</button>      */}
        </div>
      </div>
    );
  }
}
