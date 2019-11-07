import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { updateCompany, onChangeUpdateCompany } from "Actions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  description: {
    margin: 0
  }
});

class UpdateCompanyDetailsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      companyUpdate,
      updateCompany,
      onChangeUpdateCompany
    } = this.props;
    return (
      <Form>
        <Row form>
          <Col md={12}>
            <TextField
              required
              id="name"
              label="Name"
              value={companyUpdate.name}
              onChange={e => onChangeUpdateCompany("name", e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <TextField
              required
              id="email"
              label="Email Address"
              value={companyUpdate.email}
              onChange={e => onChangeUpdateCompany("email", e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={6}>
            <TextField
              required
              id="contact"
              label="Contact"
              value={companyUpdate.contact}
              onChange={e => onChangeUpdateCompany("contact", e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <TextField
              required
              id="website"
              label="Website"
              value={companyUpdate.website}
              onChange={e => onChangeUpdateCompany("website", e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={6}>
            <TextField
              required
              id="location"
              label="Location"
              value={companyUpdate.location}
              onChange={e => onChangeUpdateCompany("location", e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form className={classes.description}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            className={classes.textField}
            value={companyUpdate.description}
            onChange={e => onChangeUpdateCompany("description", e.target.value)}
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="justify-content-end mr-10">
          <Button
            variant="contained"
            color="primary"
            className="text-white mb-10"
            onClick={() => updateCompany()}
          >
            Save
          </Button>
        </Row>
      </Form>
    );
  }
}

UpdateCompanyDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ companyState }) => {
  const { companyUpdate } = companyState;
  return { companyUpdate };
};

export default connect(
  mapStateToProps,
  { updateCompany, onChangeUpdateCompany }
)(withStyles(styles)(UpdateCompanyDetailsForm));
