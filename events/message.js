const config = require("../options/config.json");
const dialogflow = require("dialogflow");
const languageCode = "en-US";
const sessionClient = new dialogflow.SessionsClient();

module.exports = {
    run: (message, client) => {
        if (client.user.id != message.author.id) {
            if (message.cleanContent.startsWith(config.prefix)) {
                // Traditional
            } else if (
                message.isMentioned(client.user) ||
                message.channel.type == "dm" ||
                message.content.endsWith(config.suffix)
            ) {
                message.channel.startTyping();
                let cleanMessage = clean(
                    client.user.username,
                    message.cleanContent
                );
                const user = message.author.id;
                const sessionPath = sessionClient.sessionPath(
                    process.env.PROJECT_ID,
                    user
                );

                let promise = new Promise((resolve, reject) => {
                    resolve(
                        sessionClient.detectIntent({
                            session: sessionPath,
                            queryInput: {
                                text: {
                                    text: cleanMessage,
                                    languageCode: languageCode
                                }
                            }
                        })
                    );
                });

                (async function() {
                    // Try to get response from Dialogflow
                    try {
                        let intent = await promise;
                        processMessage(intent, message, client);
                    } catch (e) {
                        // Dialogflow error
                        message.channel.send(config.error_msg);
                        console.log(e);
                    }
                })();
            }
        }
    }
};

function processMessage(intent, message, client) {
    // Send bot reply and process user intent
    const query = intent[0].queryResult;
    message.channel.stopTyping();
    message.channel.send(query.fulfillmentText);

    //Log stuff in console
    console.log("Message from " + message.author + ": " + message.cleanContent);
    console.log("Response: " + query.fulfillmentText);

    if (query.intent) {
        const commandName = query.intent.displayName.replace("input.", "");
        const command = client.commandlist.get(commandName);
        const args = query.parameters.fields;
        console.log("Command: " + commandName + "\nArgs: " + Boolean(args));
        if (command && query.allRequiredParamsPresent) {
            // Command exists and requirements satisfied
            if (!(command.guild && message.channel.type != "text")) {
                try {
                    command.run(message, args);
                    console.log("Command success");
                } catch (e) {
                    console.log("Command fail \n" + e);
                    message.channel.send(config.command_error_msg);
                }
            } else {
                // Server-only command error
                message.channel.send(config.guild_only_msg);
                console.log("Skipped because not server");
            }
        }
    }
}

function clean(username, text) {
    return text.replace("@" + username + " ", "");
}