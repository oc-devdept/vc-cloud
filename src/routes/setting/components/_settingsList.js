import {
  profileSettings,
  userManagement,
  roles,
  announcements,
  websiteSettings,
  commission,
  notificationSettings 
} from "../AsyncRoutes";

export default [
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
  },
  {
    title: "Users & Control",
    stateName: "user",
    links: [
      {
        title: "User Management",
        asyncComponent: userManagement,
        path: "/users-control/user-management"
      },
      {
        title: "Roles & Permissions",
        asyncComponent: roles,
        path: "/users-control/roles-permissions"
      },
      {
        title: "Commission Rates",
        asyncComponent: commission,
        path: "/users-control/commission"
      }
    ]
  },
  {
    title: "Call To Actions",
    stateName: "cta",
    links: [
      {
        title: "Announcements",
        asyncComponent: announcements,
        path: "/cta/announcements"
      }
    ]
  },
  {
    title: "Website Settings",
    stateName: "website",
    links: [
      {
        title: "Interest Rate",
        asyncComponent: websiteSettings,
        path: "/website-settings/interest-rate"
      }
    ]
  },
  {
    title: " Notification Settings",
    stateName: "email",
    links: [
      {
        title: "Email Notification Settings",
        asyncComponent: notificationSettings,
        path: "/notification-settings/emails"
      }
    ]
  },
];
