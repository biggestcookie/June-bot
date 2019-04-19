const colorList = require('../options/roles.json').colors;

module.exports = {
  name: 'teamcolor',
  guild: true,
  run(message, args) {
    const author = message.member;
    const colorId = args.teamcolor.stringValue;
    if (!colorList.hasOwnProperty(colorId)) {
      // Team color not found in list
      return;
    }

    // Check user's current team colors
    const userRoles = author.roles.array();
    userRoles.forEach((color) => {
      // User is already on a team, remove it
      if (colorList.hasOwnProperty(color.id)) {
        console.log(`Removing team ${color.name}`);
        author.removeRole(color.id);
      }
    });
    console.log('Setting role...');
    author.setRoles([colorId]).catch(console.error);
    console.log(`Set role: ${args.teamcolor.stringValue}`);
  },
};
