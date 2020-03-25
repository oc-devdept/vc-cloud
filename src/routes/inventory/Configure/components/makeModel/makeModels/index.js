import React, { PureComponent } from "react";
import { NotificationManager } from "react-notifications";
import api from "Api";

import MakeList from "./components/List/MakeList";
import DialogRoot from "Components/Dialog/DialogRoot";

import MakesForm from "./components/makes";
import ModelsForm from "./components/models";

class index extends PureComponent {
  state = {
    // Commission
    commissions: [],
    // Category
    categoryMakeId: "",
    categoryMakeName: "",
    // Make
    MakeId: "",
    MakeSource: [],
    MakeGroupingSource: [],
    MakeGroupingOriginalSource: [],
    Tags: [],
    // Model
    ModelSource: [],
    MakeLoading: true,
    ModelLoading: true,
    // Dialog
    toggle: false,
    element: null,
    data: null
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadInitial();
  }

  loadInitial = async () => {
    try {
      const MakeFilter = await api.get(
        `categorygroups/findOne?filter[where][name]=Make&`
      );
      const MakeSource = await this._RenderMakeCategory(MakeFilter.data.id);
      const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource);
      const Tags = await api.get(`tags`);

      const commissions = await api.get("commissions");

      if (this._isMounted) {
        this.setState({
          commissions: commissions.data,
          MakeId: MakeFilter.data.id,
          MakeSource: MakeSource,
          MakeGroupingSource: MakeGroupingSource,
          MakeGroupingOriginalSource: MakeGroupingSource,
          Tags: Tags.data,
          MakeLoading: false,
          ModelLoading: false
        });
      }
    } catch (e) {
      if (this._isMounted) {
        this.setState(prevState => ({
          ...prevState,
          MakeLoading: false,
          ModelLoading: false
        }));
      }
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  async _RenderMakeCategory(value) {
    try {
      const MakeGroup = await api.get(`/categorygroups/${value}/categoryGroup`);
      const MakeSource = await MakeGroup.data.map(source => {
        return {
          id: source.id,
          name: source.name,
          description: source.description,
          files: source.files ? source.files : [],
          image: source.image,
          checklist: true,
          category: source.category,
          commissionId: source.commissionId
        };
      });
      return MakeSource;
    } catch (e) {
      console.log(e);
    }
  }

  async _RenderMakeGrouping(MakeSource) {
    let modelArray = [];

    MakeSource.map(make => {
      if (make.checklist) {
        modelArray.push(`${make.name}:${make.id}`);
      }
    });

    return modelArray;
  }

  _LaunchModels = async KeyId => {
    try {
      const ModelResult = await api.get(`/categories/${KeyId}/category`);
      this.setState({ ModelSource: ModelResult.data, ModelLoading: false });
    } catch (e) {
      this.setState({ ModelSource: [], ModelLoading: false });
    }
  };

  _SaveMakeDone = async () => {
    const MakeSource = await this._RenderMakeCategory(this.state.MakeId);

    const MakeGroupingSource = await this._RenderMakeGrouping(MakeSource);

    this.setState({
      MakeSource: MakeSource,
      MakeGroupingSource: MakeGroupingSource,
      MakeGroupingOriginalSource: MakeGroupingSource
    });

    return;
  };

  _SaveModelDone = async () => {
    this._isMounted = true;
    this.loadInitial();
  };

  _RenderDialog = () => {
    if (this.state.toggle) {
      switch (this.state.element) {
        case "Create_Make":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <MakesForm
                Action={"Create"}
                Data={this.state.data}
                MakeId={this.state.Id}
                _RestartToggle={this._RestartToggle}
                _SaveMakeDone={this._SaveMakeDone}
                CommissionData={this.state.commissions}
              />
            </DialogRoot>
          );
        case "Edit_Make":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <MakesForm
                Action={"Edit"}
                Data={this.state.data}
                _RestartToggle={this._RestartToggle}
                _SaveMakeDone={this._SaveMakeDone}
                CommissionData={this.state.commissions}
              />
            </DialogRoot>
          );
        case "Delete_Make":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <MakesForm
                Action={"Delete"}
                Data={this.state.data}
                _RestartToggle={this._RestartToggle}
              />
            </DialogRoot>
          );

        case "Create_Model":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <ModelsForm
                Action={"Create"}
                Data={this.state.data}
                Tags={this.state.Tags}
                MakeId={this.state.Id}
                _RestartToggle={this._RestartToggle}
                _SaveModelDone={this._SaveModelDone}
                CommissionData={this.state.commissions}
              />
            </DialogRoot>
          );
        case "Edit_Model":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <ModelsForm
                Action={"Edit"}
                Data={this.state.data}
                Tags={this.state.Tags}
                MakeId={this.state.Id}
                _RestartToggle={this._RestartToggle}
                _SaveModelDone={this._SaveModelDone}
                CommissionData={this.state.commissions}
              />
            </DialogRoot>
          );
        case "Delete_Model":
          return (
            <DialogRoot
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <ModelsForm
                Action={"Delete"}
                Data={this.state.data}
                Tags={this.state.Tags}
                MakeId={this.state.Id}
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
    this.setState({ toggle: false, element: null, data: null, Id: null });
  };

  ToggleDialog = (element, data, Id) => {
    this.setState({
      element: element,
      toggle: !this.state.toggle,
      data: data,
      Id: Id
    });
  };

  _DeleteModel = async (id, element) => {
    if (element > 0) {
      NotificationManager.warning(
        "You cannot delete if you have items in your category, please delete them all before proceeding."
      );
    } else {
      await api.post(`categories/deleteModel/${id}`);
      this._isMounted = true;
      await this.loadInitial();
      NotificationManager.success("You have successfully deleted the item");
    }
  };

  render() {
    return (
      <div className="d-flex" style={{ flexDirection: "row" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <MakeList
            title={"Car Make"}
            tableData={this.state.MakeSource}
            ToggleDialog={this.ToggleDialog}
            _DeleteModel={this._DeleteModel}
            newMake={() =>
              this.ToggleDialog("Create_Make", "", this.state.MakeId)
            }
          />

          {this._RenderDialog()}
        </div>
      </div>
    );
  }
}

export default index;
