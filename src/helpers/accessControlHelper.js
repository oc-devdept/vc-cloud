import { store } from "Redux/store";

export const accessControlHelper = (action, match) => {
  var state = store.getState();
  var found = false;
  if (state.sessionState.authState) {
    var access = state.sessionState.authState.loggedInUser.access;
    for (let i = 0; i < action.length; i++) {
      for (let j = 0; j < access.length; j++) {
        for (let m = 0; m < access[j].length; m++) {
          let model = access[j][m].model.toLowerCase();
          for (let k = 0; k < access[j][m].accessRightMethods.length; k++) {
            var name = model + ":" + access[j][m].accessRightMethods[k].name.toLowerCase();
            if (access[j][m].accessRightMethods[k].access && name == action[i]) {
              found = true;
              break;
            }
          }
          if (found) {
            break;
          }
        }
        if (found) break;

      }     
    }
  }
  return found;
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
