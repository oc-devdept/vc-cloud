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
import { getAllFooter, newFooterSection } from "Ducks/cms/footer";

// Rich text editor
import Editor from "Components/Wysiwyg";

class FooterCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            details: '',
            position: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        // console.log('ppppp')
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    // TO open and close dialog
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleHide = () => {
        this.setState({ open: false });
    };

    submitForm() {
        const form = this.state;
        this.props.newFooterSection(form);
        console.log(this.props);
        this.props.handleHide();
    }


    // onSave(){
    //     this.props.newFeaturedCar(this.state, false);
    //     this.props.closeForm();
    // }

    render() {
        const { show, handleHide } = this.props;

        // console.log(this.props.handleHide)
        const { header, details, position } = this.state;
        return (
            <DialogRoot
                title="Add New Footer Content"
                size="lg"
                show={show}
                handleHide={handleHide}
                dialogActionLabel={"Save"}
                dialogAction={this.submitForm}
                color="#12394C"
                close={handleHide}>
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
export default connect(mapStateToProps, { show, newFooterSection })(connectModal({ name: "footer__create_form" })(FooterCreateForm));