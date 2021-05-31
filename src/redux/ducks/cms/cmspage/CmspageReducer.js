import { NotificationManager } from "react-notifications";
import * as types from "./CmspageTypes";

const INIT_STATE = {
  loading: false,
  pageList: {
    loading: false,
    tableData: []
  },
  singlePage: {
  },
  availablePages: [],
  cmsMenu: []  
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Blog Summary
     */
    case types.GET_ALL_CMSPAGES:
      return { ...state, pageList: { ...state.pageList, loading: true } };
    case types.GET_ALL_CMSPAGES_SUCCESS:
      return {
        ...state,
        pageList: {
          loading: false,
          tableData: action.payload
        }
      };
    case types.GET_ALL_CMSPAGES_FAILURE:
      NotificationManager.warning('Failed to get pages!');
      return { ...state, pageList: { ...state.pageList, loading: false } };

    case types.GET_SINGLE_CMSPAGE:
      return { ...state, loading: true };
    case types.GET_SINGLE_CMSPAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePage: action.payload,        
      };
    case types.GET_SINGLE_CMSPAGE_FAILURE:
      NotificationManager.warning('Failed to get Page data!');
      return { ...state, loading: false };

    case types.NEW_CMSPAGE:
    case types.UPDATE_CMSPAGE:
    case types.DELETE_CMSPAGE:
    case types.GET_ALL_MENUPAGES:
    case types.GET_CMS_MENU:
    case types.SAVE_CMS_MENU:
      return { ...state, loading: true };
    case types.NEW_CMSPAGE_SUCCESS:
      NotificationManager.success('Created Page Successfully!');
      let pages = [...state.pageList.tableData];
      pages.push(action.payload);
      return {
        ...state, loading: false,
        pageList: {
          ...state.pageList,
          tableData: pages
        }        
      };
    case types.NEW_CMSPAGE_FAILURE:
      NotificationManager.warning('Failed to create new page!');
      console.log(action.payload);
      return { ...state, loading: false };

    case types.UPDATE_CMSPAGE_SUCCESS:
      NotificationManager.success("Page updated!");
      pages = state.pageList.tableData.map(item => {
        if(item.id == action.payload.id){
          return action.payload;
        }
        else {
          return item
        }
      })      
      return { ...state, 
        loading: false,
        pageList: {
          ...state.pageList,
          tableData: pages
        },
        singlePage: action.payload
      };
    case types.UPDATE_CMSPAGE_FAILURE:
      NotificationManager.warning("Failed to update page");
      return {
        ...state,
        loading: false
      }
    case types.DELETE_CMSPAGE_SUCCESS:
      NotificationManager.success("Page deleted!");
      console.log(action.payload);
      pages = state.pageList.tableData.filter(item => item.id != action.payload);
      return {
        ...state,
        pageList: {
          ...state.pageList,
          tableData: pages
        }
      }
    case types.GET_ALL_MENUPAGES_SUCCESS:
      let allPages = action.payload.data.map(item => { return { name: item, value: item}})
      return {        
        ...state,
        loading: false,
        availablePages: allPages
      }
    case types.GET_CMSMENU_SUCCESS:
      return {
        ...state,
        loading:false,
        cmsMenu: action.payload.data
      }
    case types.GET_CMSMENU_FAILURE:
      NotificationManager.warning("Failed to get CMS Menu");
      return {
        ...state,
        loading: false
      }
    case types.SAVE_CMSMENU_SUCCESS:
      NotificationManager.success("Menu Saved");
      return {
        ...state,
        loading: false,
        cmsMenu: action.payload.data
      }
    case types.SAVE_CMSMENU_FAILURE:
      NotificationManager.warning("Failed to save CMS Menu");
      return {
        ...state,
        loading: false
      }
    

    default:
      return { ...state };
  }
};
