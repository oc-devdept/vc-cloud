import React from "react";
import { show } from "redux-modal";
import { Button, Radio } from "@material-ui/core";
import { connect } from "react-redux";
import SystemAlert from "Components/Alert/SystemAlert";

import { updateTemplate } from "Ducks/marketing/template";

function TemplateSelector(props) {
  const { templateList, onSelectTemplate, selectedTemplate } = props;

  const showEditTemplate = template => {
    props.show("template_form", {
      onSave: props.updateTemplate,
      toEdit: template
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-3">
        None
        <div className="text-center">
          <Radio
            checked={selectedTemplate == ""}
            onClick={() => onSelectTemplate("templateId", "")}
            value={""}
            color="default"
            inputProps={{ "aria-label": "E" }}
            size="small"
          />
        </div>
      </div>
      {templateList.length > 0 ? (
        templateList.map((template, key) => (
          <div key={key} className="col-3">
            <iframe
              scrolling="yes"
              frameBorder={0}
              style={{
                transform: "scale(0.5, 1) translateX(-55%)",
                width: "auto"
              }}
              src={
                "data:text/html;charset=utf-8," +
                encodeURIComponent(template.html)
              }
            ></iframe>
            <Button
              onClick={() => showEditTemplate(template)}
              size="small"
              color="primary"
            >
              Edit
            </Button>
            <div className="text-center">
              <Radio
                checked={selectedTemplate == template.id}
                onClick={() => onSelectTemplate("templateId", template.id)}
                value={template.id}
                color="default"
                inputProps={{ "aria-label": "E" }}
                size="small"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <SystemAlert
            title="No Template Created!"
            message="Create a new template from the Add New button above to get started."
          />
        </div>
      )}
    </div>
  );
}

export default connect(null, { show, updateTemplate })(TemplateSelector);
