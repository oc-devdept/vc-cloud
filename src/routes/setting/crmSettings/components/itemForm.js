import React, { Component } from "react";
import { connectModal, hide } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import Button from "@material-ui/core/Button";

// Form Inputs
import FormInput from "Components/Form/FormInput";

class AddItemDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            canSave: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentDidMount() {
        this.props.toEdit && this.setState({ ...this.props.toEdit });
        if (this.props.toEdit) {
            this.setState({ canSave: true });
        }
    }

    handleChange(field, value) {

        this.setState({ [field]: value });
        if (this.state.name != "") {
            this.setState({ canSave: true });
        }
    }

    handleSubmitForm() {
        if (this.props.toEdit) {
            this.props.editItem(this.props.toEdit.id, this.state.name);
        }
        else {
            this.props.addItem(this.state.name);
        }

        this.props.hide("add_itemsetting_form");
    }

    render() {
        const { show, handleHide, toEdit, itemName } = this.props;
        return (
            <DialogRoot show={show} handleHide={handleHide} size="md">
                <div className="p-20 pb-0">
                    <form autoComplete="off">
                        <h3 >{toEdit ? "Edit " + itemName : "New " + itemName}</h3>
                        <div className="row mb-20 justify-content-center">
                            <FormInput
                                label="Name"
                                value={this.state.name}
                                required={!this.state.name}
                                target="name"
                                handleChange={this.handleChange}
                            />
                        </div>
                        <div className="d-flex mt-40 justify-content-end">
                            <Button
                                variant="contained"
                                className="btn-success text-white"
                                onClick={this.handleSubmitForm}
                                disabled={!this.state.canSave}
                            >
                                {toEdit ? "Save" : "Create"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogRoot>
        );
    }
}

export default connectModal({ name: "add_itemsetting_form" })(AddItemDialog);