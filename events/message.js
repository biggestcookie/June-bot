const dialogflow = require('dialogflow');
const config = require('../options/config.json');

const languageCode = 'en-US';
const sessionClient = new dialogflow.SessionsClient();

function runCommand(command, args, message, query) {
  console.log(`Command: ${command.name}\nArgs: ${Boolean(args)}`);
  if (!(command.guild && message.channel.type !== 'text')) {
    try {
      command.run(message, args);
      message.channel.send(query.fulfillmentText);
      console.log('Command success');
    } catch (error) {
      console.log(`Command fail \n${error}`);
      message.channel.send(config.msg.error_cmd);
    }
  } else {
    // Server-only command error
    message.channel.send(config.msg.error_guild);
    console.log('Skipped because not server');
  }
}

function sendDialogFlowReply(client, intent, message) {
  // Send bot reply and process user intent
  const query = intent[0].queryResult;
  message.channel.stopTyping();

  // Log stuff in console
  console.log(`Message from ${message.author}: ${message.cleanContent}`);
  console.log(`Response: ${query.fulfillmentText}`);

  if (query.intent.name === '' || !query.allRequiredParamsPresent) {
    // Conversation; Send reply
    message.channel.send(query.fulfillmentText);
  } else {
    // Command; Process command then reply
    const command = client.commandList.get(query.intent.displayName);
    const args = query.parameters.fields;
    runCommand(command, args, message, query);
  }
}

function clean(username, text) {
  return text.replace(`@${username} `, '');
}

async function getBotResponse(client, message) {
  // Try to get response from Dialogflow
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
  try {
    const intent = await sessionClient.detectIntent(request);
    sendDialogFlowReply(client, intent, message);
  } catch (error) {
    // Dialogflow error
    message.channel.send(config.msg.error);
    console.log(error);
  }
}

module.exports = {
  run: (message, client) => {
    // Determine message type
    const isChatCommand = message.cleanContent.startsWith(config.prefix);
    const isMessage = message.isMentioned(client.user) || message.channel.type === 'dm' || message.channel.id === config.botchannel;
    if (isChatCommand) {
      // Traditional
    } else if (isMessage) {
      message.channel.startTyping();
      getBotResponse(client, message);
    }
    // else return
  },
};
