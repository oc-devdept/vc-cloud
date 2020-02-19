import React from "react";
import { connect } from "react-redux";
import FormInput from "Components/Form/FormInput";

// import Button from "@material-ui/core/Button";
// import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

function SetupForm(props) {
  // const [showAdvance, setShowAdvance] = React.useState(false);
  // data
  /**
 *  setup: {
          name: "",
          subject: "",
          senderName: "",
          senderEmail: ""
        },
 */
  const { onChange, data, loggedInUser } = props;

  // function setCompleted() {
  //   const completed =
  //     data.name && data.subject && data.senderEmail && data.senderName;
  //   if (completed) {
  //     return true;
  //   }
  // }

  return (
    <React.Fragment>
      <div className="mb-20">
        <FormInput
          label="Campaign Name"
          value={data.name}
          target="name"
          handleChange={onChange}
          required={!data.name}
          helperText="Give your campaign an internal name to help organize and locate it easily within your account. For example: 'Sale_October'"
        />
      </div>
      <div className="my-20">
        <FormInput
          label="Campaign Subject"
          value={data.subject}
          target="subject"
          handleChange={onChange}
          required={!data.subject}
          helperText="Write a subject line that clearly describes your email content. It will be visible in your recipient's inbox and is the first content they will see. For example: 'Private sale: 25% off our new collection"
        />
      </div>
      <div className="my-20">
        <FormInput
          type="email"
          label="From Email"
          defaultValue={data.senderEmail}
          placeholder={loggedInUser.email}
          target="senderEmail"
          handleChange={onChange}
          required={!data.senderEmail}
          helperText="Choose the email address to be shown in your recipients inbox when they receive your campaign"
        />
      </div>
      <div className="my-20">
        <FormInput
          label="From Name"
          defaultValue={data.senderName}
          target="senderName"
          placeholder={loggedInUser.name}
          handleChange={onChange}
          required={!data.senderName}
          helperText="Enter a name (e.g. your company name) to help campaign recipients recognize you in their inbox."
        />
      </div>
      {/* {showAdvance && (
        <React.Fragment>
          <div className="my-20">
            <FormInput
              label="Customize the Reply-To Email address"
              value={data.replyTo}
              target="replyTo"
              handleChange={onChange}
              helperText="Enter the email address where you want to receive replies from your contacts."
            />
          </div>
          <div className="my-20">
            <FormInput
              label="Customize the 'To' Field"
              value={data.toField}
              target="toField"
              handleChange={onChange}
              helperText="Keep the default or customize this option to personalize your 'To' field with contact attributes."
            />
          </div>
        </React.Fragment>
      )} 
       <div className="d-flex justify-content-start">
        <Button
          size="small"
          color="primary"
          onClick={() => setShowAdvance(!showAdvance)}
        >
          Show Advance Options
          {showAdvance ? (
            <ArrowDropUp size="inherit" className="ml-5" />
          ) : (
            <ArrowDropDown size="inherit" className="ml-5" />
          )}
        </Button>
      </div> */}
    </React.Fragment>
  );
}
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { loggedInUser };
};

export default connect(mapStateToProps)(SetupForm);
