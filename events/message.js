const dialogflow = require('dialogflow');
const config = require('../options/config.json');

const languageCode = 'en-US';
const sessionClient = new dialogflow.SessionsClient();

function processMessage(client, intent, message) {
  // Send bot reply and process user intent
  const query = intent[0].queryResult;
  message.channel.stopTyping();


  // Log stuff in console
  console.log(`Message from ${message.author}: ${message.cleanContent}`);
  console.log(`Response: ${query.fulfillmentText}`);

  if (!query.intent || !query.allRequiredParamsPresent) {
    // Conversation; Send reply
    message.channel.send(query.fulfillmentText);
  } else {
    // Command; Process command then reply
    const command = client.commandList.get(query.intent.displayName);
    const args = query.parameters.fields;
    console.log(`Command: ${commandName}\nArgs: ${Boolean(args)}`);

    if (!(command.guild && message.channel.type !== 'text')) {
      try {
        command.run(message, args);
        message.channel.send(query.fulfillmentText);
        console.log('Command success');
      } catch (e) {
        console.log(`Command fail \n${e}`);
        message.channel.send(config.command_error_msg);
      }
    } else {
      // Server-only command error
      message.channel.send(config.guild_only_msg);
      console.log('Skipped because not server');
    }
  }
}

async function getBotResponse(client, request, message) {
  // Try to get response from Dialogflow
  try {
    const intent = await sessionClient.detectIntent(request);
    processMessage(client, intent, message);
  } catch (e) {
    // Dialogflow error
    message.channel.send(config.error_msg);
    console.log(e);
  }
}

function clean(username, text) {
  return text.replace(`@${username} `, '');
}


module.exports = {
  run: (message, client) => {
    // Determine message type
    if (message.cleanContent.startsWith(config.prefix)) {
      // Traditional
    } else if (
      message.isMentioned(client.user)
      || message.channel.type === 'dm'
      || message.content.endsWith(config.suffix)
    ) {
      message.channel.startTyping();
      const cleanMessage = clean(
        client.user.username,
        message.cleanContent,
      );
      const user = message.author.id;
      const sessionPath = sessionClient.sessionPath(
        process.env.PROJECT_ID,
        user,
      );
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: cleanMessage,
            languageCode,
          },
        },
      };
      getBotResponse(client, request, message);
    }
  },
};
