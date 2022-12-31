const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
//      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
    ]
});
const dotenv = require('dotenv');
dotenv.config();
var textChannel = '';
client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      
      // Get the text channel where you want to send the message
      textChannel = client.channels.cache.get(process.env.LiveTextID);
      console.log(`Joined channel ${textChannel}!`);
});
client.on('voiceStateUpdate', (oldState, newState) => {
  // Check if the user has started streaming
  if (!oldState.streaming && newState.streaming) {
    // Get the user's current activity (the game they are playing)
    const game = newState.member.presence.activities[0]?.name || 'something';
//    console.dir(game, { depth: null }); 
//    console.dir(newState.member.presence.activities, { depth: null });
    // Check if the user is in the specific voice channel you want to monitor
    if (newState.channelId === process.env.LiveVoiceID) {
      console.log(`Someone streaming in Live channel`); 
      // Send the message
      textChannel.send(`**${newState.member.displayName}** has started streaming **${game}** in __${newState.channel.name}__`);
    } 
  }
});

client.login(process.env.TOKEN);
