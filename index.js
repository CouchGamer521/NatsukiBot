const fs = require('fs');
const Discord = require('discord.js');
const superagent = require("superagent");
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('Ready!');
});

client.on("message", async (message) => {
	if(message.content == 'Yuri') {
		message.channel.sendMessage('Shut the ***heck*** up i am best Gurl!');
	}
	if(message.content == 'Tot') {
		message.channel.sendMessage(':potato:');
	}
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command === 'beep') {
        client.commands.get('beep').execute(message, args);
	}
	else if (command === 'tot') {
        client.commands.get('tot').execute(message, args);
	}
	else

	if (command === "say") {
		message.delete()
        const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setDescription(message.author.username + " says: " + args.join(" "));
		message.channel.send({embed})
	}
    else if (command === 'server') {
        client.commands.get('server').execute(message, args);
	}
else if (command === "cat") {
		const { body } = await superagent
		.get('http:\/\/aws.random.cat\/meow');
		const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Meow :cat:")
		.setImage(body.file)
		message.channel.send({embed})
	}

	else

	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Command List:")
		.addField("!help", "Will give the current command list")
		.addField("!ping", "Pong!")
		.addField("!beep", "Boop!")
		.addField("!server", "Will show server details")
		.addField("!user_info", "Shows your info to the server")
		.addField("!kick", "Shows the server who you want to kick")
		.addField("!avatar", "Shows your avatar image")
		.addField("!prune [number]", "Deletes a certain number of texts")
		.addField("!say", "has the bot say something")
		.addField("!cat", "Will send a random cat image")
		.addField("Tot", "Potato")
		.addField("Yuri", "Stfu");
		message.channel.send({embed})
	}

	// do the same for the rest of the commands...
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	else if (command === 'info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`First argument: ${args[0]}`);
		
	}
	else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
});


client.login('NDI2MTI2NTg0MzM3MTM3NzAx.DZcOlA.AJi4KyJOE6uFFNC-BYRKsXb2Fs0');