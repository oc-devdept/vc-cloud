import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import { show } from "redux-modal";

// form inputs
import FormInput from "Components/Form/FormInput";
import { Button } from "@material-ui/core";
import RctSectionLoader from "Components/RctSectionLoader";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import SystemAlert from "Components/Alert/SystemAlert";

// Redux imports
import { getAllFooter, deleteFooterSection, editFooterSection } from "Ducks/cms/footer";

// Rich text editor
import Editor from "Components/Wysiwyg";

class Footerform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.itemList[0],
            header: this.props.itemList[1],
            details: this.props.itemList[2],
            position: this.props.itemList[3],
            open: show
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        console.log('ppppp')
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    // TO open and close dialog
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    submitForm() {
        const form = {
            id: this.state.id,
            header: this.state.header,
            details: this.state.details,
            position: this.state.position,
        }
        this.props.editFooterSection(form);
        this.handleClose();
        this.props.handleHide();
    }

    render() {
        const { show, handleHide } = this.props;
        // console.log("show here")
        // console.log(!show)
        // console.log("Handle hide here")
        // console.log(handleHide)
        console.log(this.props)
        
        const { header, details, position } = this.state;
        return (
            <DialogRoot
                title="Edit Footer Content"
                size="lg"
                show={show}
                handleHide={handleHide}
                dialogActionLabel={"Save"}
                dialogAction={this.submitForm}
                color="#12394C"
                close>
                <React.Fragment>
                    <form>
                        <div className="row justify-content-center">
                            <div className="col-5 pt-40">
                                <label for="header">Header</label>
                                <FormInput value={header} target="header" handleChange={this.handleChange} tabIndex="1" />
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="w-100">
                                <label for="details">Details</label>
                                <Editor changeData={(value) => this.setState({details: value})} data={details} target="details" handleChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-5 pt-40">
                                <label for="position">Position</label>
                                <FormInput value={position} target="position" handleChange={this.handleChange} tabIndex="1" />
                            </div>
                        </div>
                    </form>
                </React.Fragment>
            </DialogRoot>
        );
    }
}

const mapStateToProps = ({ }) => {
    return {};
};
export default connect(mapStateToProps, { show, editFooterSection })(connectModal({ name: "footer_form" })(Footerform));
