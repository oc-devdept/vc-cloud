import { store } from "Redux/store";

export const accessControlHelper = (action, match) => {
  var state = store.getState();
  var user = state.authUser.user;
  var access = state.authUser.loggedInUser.access;

  if (user) {
    for (let i = 0; i < action.length; i++) {
      var act = action[i];
      if (act == "me") {
        if (user.id == match.params.id) return true;
      } else if (act == "global") {
        return true;
      } else {
        if (user.isSuperAdmin) {
          return true;
        } else {
          if (
            access.find(acc => {
              return `${acc.model}:${acc.method}` == action[i];
            })
          )
            return true;
        }
      }
    }
  }

  return false;
};

export const roleListHelper = (role) => {
  function addRole(siblings) {
    for (let i = 0; i < siblings.length; i++) {

      roleNames.push({ name: siblings[i].name, value: siblings[i].id, tier: siblings[i].tier })

    }
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i].children.length > 0) {
        addRole(siblings[i].children);
      }
    }
  }
  const roleNames = [];
  roleNames.push({ name: role.name, value: role.id, tier: role.tier });
  if (role.children.length > 0) {
    addRole(role.children);
  }
  return roleNames;

}
