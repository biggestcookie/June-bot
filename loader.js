const fs = require('fs');

function loadEvent(event) {
  return require(`./events/${event}`);
}

function logError(error) {
  console.log(error);
  client.fetchUser(config.owner).then(
    (user) => {
      user.send(error.message);
    },
    (rejection) => {
      console.log(`Issue forwarding error: ${rejection}`);
    },
  );
  fs.appendFile('log.txt', `${error.message}\n`);
}

module.exports = {
  run: (client) => {
    client.on('message', (msg) => {
      if (client.user.id !== msg.author.id) {
        loadEvent('message').run(msg, client);
      }
    });
    client.on('ready', () => {
      loadEvent('ready').run(client);
    });

    client.on('error', (e) => {
      logError(e);
    });
    // client.on("roleCreate", (role) => { loadEvent("roles").create(role, client) });
    // client.on("roleDelete", (role) => { loadEvent("roles").delete(role, client) });
  },
};
