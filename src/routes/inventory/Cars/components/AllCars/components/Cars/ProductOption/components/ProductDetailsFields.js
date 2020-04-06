import React, { PureComponent } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";

import Image from "Components/Image";
import { Edit, Delete, ExpandMore } from "@material-ui/icons";

export default class Index extends PureComponent {
  render() {
    const e = this.props.Fields;
    const isDefault = this.props.isDefault;
    const Id = this.props.Id;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          padding: 10,
          marginTop: 5,
          alignItems: "center"
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{ color: "rgba(0,0,0,0.7)" }}>{e.name}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flex: 1,
            alignItems: "center"
          }}
        >
          <div>
            {e.files.length > 0 && (
              <Image imageSource={e.files} single={true} thumbNail={true} />
            )}
            {e.files.length == 0 && <div></div>}
          </div>
          <div>
            <span style={{ color: "rgba(0,0,0,0.7)" }}>{e.price}</span>
          </div>
          <div>
            {/* <Checkbox
                        checked={e.isDefault}
                        name="isDefault"
                    />  */}
            <Radio
              checked={isDefault}
              // onChange={handleChange}
              value="a"
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
          </div>
          {/* <div>
                    <Edit
                      onClick={() => console.log('Edit!')}
                    />
                </div> */}
          <div>
            <Delete onClick={() => this.props._DeleteProductOptionFields(Id)} />
          </div>
        </div>
      </div>
    );
  }
}
