import {
  profileSettings,
  userManagement,
  roles,
  announcements,
  websiteSettings,
  commission,
  notificationSettings,
  followupTypeSetting,
  followupResultSetting, 
} from "../AsyncRoutes";
import { accessControlHelper } from "Helpers/accessControlHelper";

export default function navlinks() {
  var links = [
    {
      title: "General",
      stateName: "general",
      links: [
        {
          title: "Profile Settings",
          asyncComponent: profileSettings,
          path: "/general/profile-settings"
        }
      ]
    }
  ];
  if (accessControlHelper(["accesssetting:viewall"])) {
    var sublink = {
      title: "Users & Control",
      stateName: "user",
      links: [
        {
          title: "User Management",
          asyncComponent: userManagement,
          path: "/users-control/user-management"
        },
      ],
    };
    if(accessControlHelper(["accessrole:viewall"])){
      sublink.links.push({
        title: "Roles & Permissions",
        asyncComponent: roles,
        path: "/users-control/roles-permissions"
      });
      sublink.links.push({
        title: "Commission Rates",
        asyncComponent: commission,
        path: "/users-control/commission"
      });
    }    
    links.push(sublink);
  }
  if(accessControlHelper(["customertype:create"])){
    sublink = {
      title: "CRM Settings",
      stateName: "crm",
      links: [],
    };
    sublink.links.push({
      title: "Followup Type",
      asyncComponent: followupTypeSetting,
      path: "/followup-setting/type-setting",
    });
    sublink.links.push({
      title: "Followup Result",
      asyncComponent: followupResultSetting,
      path: "/followup-setting/result-setting",
    });
    links.push(sublink);
    sublink = {
      title: "Call To Actions",
      stateName: "cta",
      links: [
        {
          title: "Announcements",
          asyncComponent: announcements,
          path: "/cta/announcements"
        }
      ]
    }
    links.push(sublink);
    sublink = {
      title: "Website Settings",
      stateName: "website",
      links: [
        {
          title: "Interest Rate",
          asyncComponent: websiteSettings,
          path: "/website-settings/interest-rate"
        }
      ]
    }
    links.push(sublink);
    sublink =  {
      title: " Notification Settings",
      stateName: "email",
      links: [
        {
          title: "Email Notification Settings",
          asyncComponent: notificationSettings,
          path: "/notification-settings/emails"
        }
      ]
    }
    links.push(sublink);
  }
  

  
  return links;
}