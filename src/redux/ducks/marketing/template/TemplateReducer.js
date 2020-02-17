import { NotificationManager } from "react-notifications";
import * as types from ".//TemplateTypes";

const INIT_STATE = {
  loading: false,
  templateList: [],
  adminTemplateList: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get all templates
     */
    case types.GET_ALL_TEMPLATE:
      return { ...state, loading: true };
    case types.GET_ALL_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateList: action.payload.createdTemplate,
        adminTemplateList: action.payload.adminTemplate
      };
    case types.GET_ALL_TEMPLATE_FAILURE:
      NotificationManager.error("Error in retrieving Templates");
      return { ...state, loading: false };

    /**
     * Add Campaign Email Template
     */
    case types.ADD_TEMPLATE:
      return { ...state };
    case types.ADD_TEMPLATE_SUCCESS:
      NotificationManager.success("Added new email template!");
      const addTemplate = Object.assign([], state.templateList);
      addTemplate.push(action.payload);
      return {
        ...state,
        templateList: addTemplate
      };
    case types.ADD_TEMPLATE_FAILURE:
      NotificationManager.error("Error in creating email template!");
      return { ...state };

    /**
     * Update Campaign Email Template
     */
    case types.UPDATE_TEMPLATE:
      return { ...state };

    case types.UPDATE_TEMPLATE_SUCCESS:
      NotificationManager.success("Updated Email Template!");
      const editTemplate = Object.assign([], state.templateList).map(template =>
        template.id == action.payload.id ? action.payload : template
      );

      return {
        ...state,
        templateList: editTemplate
      };

    case types.UPDATE_TEMPLATE_FAILURE:
      NotificationManager.failed(action.payload);
      return { ...state };

    default:
      return { ...state };
  }
};
