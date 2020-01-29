const rolelist = require("../options/roles.json");

// TODO: SQLITE
module.exports = {
  create: role => {
    const roleName = role.toString();
    if (!rolelist.colors[roleName]) {
      rolelist.colors[roleName] = role.id;
    } else {
      console.log("Role already exists.");
    }
  },
  delete: role => {
    const roleName = role.toString();
    if (rolelist.colors[roleName]) {
      // rolelist.colors[roleName].delete;
    } else {
      console.log("Role does not exist.");
    }
  }
};
