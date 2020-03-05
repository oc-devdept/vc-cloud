import {
  profileSettings,
  userManagement,
  roles,
  announcements,
  websiteSettings
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
  }
];
