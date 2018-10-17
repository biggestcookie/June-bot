const fs = require("fs");
module.exports = {
    run: client => {
        client.on("message", msg => {
            load_event("message").run(msg, client);
        });
        client.on("ready", () => {
            load_event("ready").run(client);
        });

        client.on("error", e => {
            log_error(e);
        });
        // client.on("roleCreate", (role) => { load_event("roles").create(role, client) });
        // client.on("roleDelete", (role) => { load_event("roles").delete(role, client) });
    }
};

function load_event(event) {
    return require("./events/" + event);
}

function log_error(e) {
    console.log(e);
    fs.appendFile("log.txt", e.message + "\n");
}
