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
import { getAllFooter, editFooterSection } from "Ducks/cms/footer";

// Rich text editor
import Editor from "Components/Wysiwyg";

// New Stuff
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import addFilled from "@iconify/icons-carbon/add-filled";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// Popup codes
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class EditFooterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            header: '',
            details: '',
            position: '',
            open: this.props.open
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
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
        
        // console.log("=====================")
        // console.log(this.props);
        // console.log(this.props.id)
        // console.log(this.props.header)
        // console.log(this.props.details)
        // console.log(this.props.position)
        console.log(this.props.open)

        const { header, details, position } = this.state;
        return (
            <React.Fragment>
                {/* <IconButton onClick={this.handleOpenPopOver} size="small">
                    <Icon className="addIcon" icon={addFilled} width="2.5rem" height="2.5rem" color="#FF8B19" />
                </IconButton> */}
                <Dialog onClose={this.handleClosePopOver} aria-labelledby="customized-dialog-title" open={this.state.openpopover} maxWidth={'md'} fullWidth={'md'}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClosePopOver}>Please work</DialogTitle>
                    <DialogContent dividers>
                        <div class="form-row">
                            <label for="inputFirstName">Header</label>
                            <input
                                type="text"
                                className="form-control"
                                id="header"
                                required={true}
                                value={header}
                                onChange={(e) => this.onChangeForm('header', e.target.value)}
                                placeholder="Enter your header" />
                            <label for="inputFirstName">Details</label>
                            <Editor changeData={(value) => this.setState({ details: value })} data={details} target="details" handleChange={this.onChangeForm} />
                            <label for="inputFirstName">Position</label>
                            <input
                                type="text"
                                className="form-control"
                                id="position"
                                required={true}
                                value={position}
                                onChange={(e) => this.onChangeForm('position', e.target.value)}
                                placeholder="Enter your position" />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.submitForm} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ }) => {
    return {};
};
export default connect(mapStateToProps, { show, editFooterSection })(EditFooterForm);
