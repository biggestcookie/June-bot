const rolelist = require("../roles.json");

module.exports = {
    create: (role) => {
        role_name = role.toString();
        if (!rolelist.colors[role_name]) {
            rolelist.colors[role_name] = role.id;
        }
        else {
            console.log("Role already exists.");
        }
    },
    delete: (role) => {
        role_name = role.toString();
        if (rolelist.colors[role_name]) {
            // rolelist.colors[role_name].delete;
        }
        else {
            console.log("Role does not exist.");
        }
    }
}