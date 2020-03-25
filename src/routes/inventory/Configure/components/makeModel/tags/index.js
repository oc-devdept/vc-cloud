import React, { PureComponent } from "react";
import { NotificationManager } from "react-notifications";
import api from "Api";

import TagList from "./components/TagList";
import Tags from "./components/tags";
import DialogRoot from "Components/Dialog/DialogRoot";

class index extends PureComponent {
  state = {
    Tags: [],
    Value: "",
    loading: false,

    toggle: false,
    element: null,
    data: null
  };

  async componentDidMount() {
    try {
      const Tags = await api.get(`/tags`);
      this.setState({ Tags: Tags.data, loading: false });
    } catch (e) {
      this.setState({ Tags: [], loading: false });
    }
  }

  _SaveTagsDone = async () => {
    await this.setState({ loading: true });
    const Tags = await api.get(`/tags`);
    await this.setState({ Value: "", Tags: Tags.data, loading: false });
  };

  _HandleDeleteTags = async e => {
    await this.setState({ loading: true });

    const result = await api.delete(`/tags/${e}`);

    if (result.data.count == 1) {
      const Tags = await api.get(`/tags`);
      await this.setState({ Tags: Tags.data, loading: false });
    } else {
      await this.setState({ loading: false });
    }
  };

  _RenderTags = () => {
    return this.state.Tags.map((e, index) => {
      return (
        <div
          key={index}
          style={{
            padding: 5,
            margin: 5,
            borderRadius: 10,
            border: "1px solid black"
          }}
        >
          {e.name}
          <span
            onClick={() => this._HandleDeleteTags(e.id)}
            style={{ marginLeft: 20, cursor: "pointer", marginRight: 10 }}
          >
            x
          </span>
        </div>
      );
    });
  };

  _RenderDialog = () => {
    if (this.state.toggle) {
      switch (this.state.element) {
        case "Tags":
          return (
            <DialogRoot
              // title={"Hello world"}
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <Tags
                Action={"Create"}
                _RestartToggle={this._RestartToggle}
                _SaveTagsDone={this._SaveTagsDone}
              />
            </DialogRoot>
          );
        case "Edit_Tags":
          return (
            <DialogRoot
              // title={"Hello world"}
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <Tags
                Action={"Edit"}
                Data={this.state.data}
                _RestartToggle={this._RestartToggle}
                _SaveTagsDone={this._SaveTagsDone}
              />
            </DialogRoot>
          );
        case "Delete_Tags":
          return (
            <DialogRoot
              // title={"Hello world"}
              size="sm"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <Tags
                Action={"Delete"}
                Data={this.state.data}
                _RestartToggle={this._RestartToggle}
              />
            </DialogRoot>
          );

        default:
          return null;
      }
    }
  };

  _RestartToggle = () => {
    this.setState({ toggle: false, element: null, data: null, makeId: null });
  };

  ToggleDialog = (element, data, makeId) => {
    this.setState({
      element: element,
      toggle: !this.state.toggle,
      data: data,
      makeId: makeId
    });
  };

  _DeleteTags = async (id, element) => {
    if (element > 0) {
      NotificationManager.warning(
        "You cannot delete if you have models in your category, please delete them all before proceeding."
      );
    } else {
      await api.delete(`tags/${id}`);
      await this._SaveTagsDone();
      NotificationManager.success("You have successfully deleted the item");
    }
  };

  render() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!this.state.loading && (
          <div>
            {this.state.Tags.length > 0 && (
              <div>
                {/* <Button>+ Create Tag</Button>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <button
                    onClick={() => this.ToggleDialog("Tags")}
                    style={{
                      color: "white",
                      borderRadius: 5,
                      padding: 8,
                      backgroundColor: "rgba(24,59,129,1)",
                      marginBottom: 10,
                      marginRight: 20
                    }}
                  >
                    + CREATE TAG
                  </button>
                </div> */}
                <TagList
                  title={"Car Tags"}
                  tableData={this.state.Tags}
                  ToggleDialog={this.ToggleDialog}
                  _DeleteTags={this._DeleteTags}
                  newTags={() => this.ToggleDialog("Tags")}
                />
              </div>
            )}

            {this.state.Tags.length == 0 && (
              <div>
                <TagList
                  title={"Car Tags"}
                  tableData={this.state.Tags}
                  ToggleDialog={this.ToggleDialog}
                  _DeleteTags={this._DeleteTags}
                />
              </div>
            )}

            {this._RenderDialog()}
          </div>
        )}

        {this.state.loading && <div>Loading ...</div>}
      </div>
    );
  }
}

export default index;
