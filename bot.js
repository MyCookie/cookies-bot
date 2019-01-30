const Discord = require('discord.js');
var auth = require('./auth.json');

const client = new Discord.Client();

client.login(auth.token);

client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}`);
});

client.on('message', message => {
    if (message.content === "!ping") {
        message.reply("pong!");
    }
});

client.on('message', message => {
    // listen for messages that start with 'cookies.'
    if (message.content.startsWith('cookies.')) {
        console.log(`Received message "${message.content.slice(8)}" from user ${message.author.tag} on channel ${message.guild.name}/#${message.channel.name}.`);

        // bot syntax starts with 'cookies.', which is 8 chars
        var cmd = message.content.slice(8);

        switch(cmd) {
            // cookies.ping
            case 'ping':
                message.channel.send("Pong!");
                break;
            // cookies.hodor
            case 'hodor':
                message.channel.send("Hodor! Hodor! :innocent:");
                break;
            default:
                message.channel.send("Hodor?");
        }
    }
});

// https://discord.js.org/#/docs/main/stable/examples/greeting
client.on('guildMemberAdd', member => {
    // remove? if the guild is not available we should not be notified anyways
    if (!member.guild.available) return;

    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to ${member.guild.name}, ${member}!`);
});
