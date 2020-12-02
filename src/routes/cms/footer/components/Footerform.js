import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// form inputs
import FormInput from "Components/Form/FormInput";
import { Button } from "@material-ui/core";
import RctSectionLoader from "Components/RctSectionLoader";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";


import SystemAlert from "Components/Alert/SystemAlert";

// import { setEmailSettings, updateEmailSettings } from "Ducks/setting/EmailSettings";
// import { setUserMailQuota, setUserMailPaidQuota } from "Ducks/marketing/mailSetting";
class Footerform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            //   contactForm: false,
            //   facebookForm: false,
            //   portalForm: false,
            testDrive: props.testDrive,
            maintenance: props.maintenance,
            enquiry: props.enquiry,
            id: props.id
            //   domain: "",
            //   webhook_key: "",
        };
        // this.state = this.props.user;
        this.switchClick = this.switchClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        // this.handleChangeBaseContact = this.handleChangeBaseContact.bind(this);
    }
    componentDidMount() {

    }



    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    switchClick = (event) => {
        switch (event.target.name) {
            case "testDrive":
                if (this.state.testDrive) {
                    this.setState({ testDrive: false });
                } else {
                    this.setState({ testDrive: true });
                }
                break;
            case "maintenance":
                if (this.state.maintenance) {
                    this.setState({ maintenance: false });
                } else {
                    this.setState({ maintenance: true });
                }
                break;
            case "enquiry":
                if (this.state.enquiry) {
                    this.setState({ enquiry: false });
                } else {
                    this.setState({ enquiry: true });
                }
                break;
            default:
            // code block
        }
    };

    submitForm() {
        const data = {
            email: this.state.email,
            testDrive: this.state.testDrive,
            maintenance: this.state.maintenance,
            enquiry: this.state.enquiry,
            id: this.state.id
        }

        // this.props.setNotification(this.props.loggedInUser.id, this.state.contactForm, this.state.facebookForm, this.state.portalForm, this.state.email);
        if (this.state.id) {

            this.props.updateEmailSettings(data)
        } else {

            this.props.setEmailSettings(data)
        }
        this.props.handleHide();
    }

    render() {
        const { show, handleHide } = this.props;
        const { email, testDrive, maintenance, enquiry } = this.state;
        return (
            <DialogRoot
                title="Edit Footer Content"
                size="lg"
                show={show}
                handleHide={handleHide}
                dialogActionLabel={"Save"}
                dialogAction={this.submitForm}
                color="#12394C"
                close
            >
                <React.Fragment>
                    <form>
                    <div className="row justify-content-center"><div className="col-5 pt-40"><FormInput label="Header" value={email} target="email" handleChange={this.handleChange} tabIndex="1" /></div></div>
                    <div className="row justify-content-center"><div className="col-5 pt-40"><FormInput label="Details" value={email} target="email" handleChange={this.handleChange} tabIndex="1" /></div></div>
                    <div className="row justify-content-center"><div className="col-5 pt-40"><FormInput label="Position" value={email} target="email" handleChange={this.handleChange} tabIndex="1" /></div></div>
                    </form>
                </React.Fragment>
            </DialogRoot>
        );
    }
}

const mapStateToProps = ({ }) => {
    return {};
};
export default connect(
    mapStateToProps,
)(connectModal({ name: "footer_form" })(Footerform));