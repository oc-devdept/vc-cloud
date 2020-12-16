import React from "react";
import { show } from "redux-modal";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  FormHelperText,
  Radio,
} from "@material-ui/core";
import BgCard from "Components/BgCard";
import DateTimePicker from "Components/Form/Pickers/DateTimePicker";
import TemplatePreviewDialog from "Components/MarketingTemplate/TemplatePreviewDialog";
import { connect } from "react-redux";

const ListLabel = (props) => (
  <p className="fs-14 mb-5 fw-semi-bold">{props.children}</p>
);
const ListValue = (props) => (
  <p className="fs-14 mb-5 ml-10">{props.children}</p>
);

function SummaryForm(props) {
  // campaignForm: {
  //   setup: {
  //     name: "",
  //     subject: "",
  //     senderName: "",
  //     senderEmail: "",
  //     replyTo: "",
  //     toField: ""
  //   },
  //   template: {
  //     templateId: "",
  //     htmlContent: ""
  //   },
  //   mailingList: [{name: "", count: int}],
  //   scheduledAt: "",
  //   sendNow: false,
  //   userId: ""
  // }
  const { onChange, data } = props;
  const { setup, mailingList, template } = data;

  const previewEmail = (html) => {
    props.show("preview_template", {
      toEdit: { ...{ html: html }, ...{ title: "Preview Email Template" } },
    });
  };

  return (
    <BgCard>
      <div className="row">
        <div className="col-md-12">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <h3 className="border-bottom pb-5">Setup</h3>
                    <ul className="mt-10" style={{ listStyle: "none" }}>
                      <li className="d-flex">
                        <ListLabel>Name:</ListLabel>
                        <ListValue>{setup.name}</ListValue>
                      </li>
                      <li className="d-flex">
                        <ListLabel>Subject:</ListLabel>
                        <ListValue>{setup.subject}</ListValue>
                      </li>
                      <li className="d-flex">
                        <ListLabel>Sender Name:</ListLabel>
                        <ListValue>{setup.senderName}</ListValue>
                      </li>
                      <li className="d-flex">
                        <ListLabel>Sender Email:</ListLabel>
                        <ListValue>{setup.senderEmail}</ListValue>
                      </li>
                    </ul>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <h3 className="border-bottom pb-5">Content</h3>
                    {template.templateId ? (
                      <React.Fragment>
                        <button
                          size="small"
                          color="primary"
                          onClick={() => previewEmail(template.htmlContent)}
                        >
                          Preview Email Template
                        </button>
                      </React.Fragment>
                    ) : (
                      <p className="fs-14 text-center">No Template Selected</p>
                    )}
                    {/* {template.htmlContent && <div>{template.htmlContent}</div>} */}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <h3 className="border-bottom pb-5">Mailing List</h3>
                    {mailingList.length > 0 ? (
                      <ul className="mt-10" style={{ listStyle: "none" }}>
                        {mailingList.map((list, key) => (
                          <li key={key} className="d-flex">
                            <ListLabel>
                              {list.name} -{" "}
                              <small>Total Count: {list.count}</small>
                            </ListLabel>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="fs-14 text-center">
                        No Mailing List Selected
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <h3 className="border-bottom pb-5">Schedule Timing</h3>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="my-20">
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                checked={data.sendNow == true}
                                onChange={() => onChange("sendNow", true)}
                                value={data.sendNow}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                              />
                            }
                            label={"Send it now"}
                          />
                          <FormHelperText
                            style={{ marginLeft: 30, marginTop: 0 }}
                          >
                            Send the campaign now.
                          </FormHelperText>
                        </div>
                        <div className="my-20">
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                checked={data.sendNow == false}
                                onChange={() => onChange("sendNow", false)}
                                value={data.sendNow}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                              />
                            }
                            label="Schedule for a future date"
                          />
                          <div style={{ marginLeft: 30, marginTop: 0 }}>
                            <FormHelperText className="mt-0 mb-10">
                              Schedule your campaign to be sent in the future
                            </FormHelperText>
                            <div className="row">
                              <div className="col-md-5">
                                <DateTimePicker
                                  disabled={data.sendNow}
                                  minutesStep={15}
                                  minDate={new Date()}
                                  value={data.scheduledAt}
                                  target="scheduledAt"
                                  handleChange={onChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <TemplatePreviewDialog />
    </BgCard>
  );
}

// export default SummaryForm;
export default connect(null, { show })(SummaryForm);
