import { profileSettings, userManagement, roles } from "../AsyncRoutes";

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
  }
];
