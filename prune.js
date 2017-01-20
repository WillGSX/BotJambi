//invite bot to servers using this link (must have manage server permission):   https://discordapp.com/oauth2/authorize?client_id=234115061411479552&scope=bot
//set requirements and initate client
var Discord = require('discord.js');
var iconv = require("iconv-lite");
var request = require("request");
var client = new Discord.Client();
// confirm in console bot is working and ready.
client.on("ready", function() {
	console.log("New and updated PruneBot is online and ready to spit out AP requests!");
});
//*************************Delete bots own responses and the query strings***********************************//
client.on("message", message => {
	if(message.author.id == 269615816738209793 && message.channel.id != 269225116460777474) {
		message.delete(30000);
	} else if (message.content.startsWith("!AP") || message.content.startsWith("!ap") || message.content.startsWith("!norris") || message.content.startsWith("!Norris") || message.content.startsWith("!fact") || message.content.startsWith("!Fact") || message.content.startsWith("!dad") || message.content.startsWith("!daddy") || message.content.startsWith("!Dad") || message.content.startsWith("!Daddy")) {
			message.delete(30000);
	}
});
//*****************************************************************************************TESTING AND HELP FUNCTIONS*********************************************************//
// test functions
client.on("message", message => {
	if(message.content === "check") {
		message.reply("Bot is working!");
	} else if (message.content === "Check") {
		message.reply("Bot is working!");
	} else if (message.content.startsWith('!channelcheck')) {
		message.reply(message.channel.id);
	} else if (message.content.indexOf('Bot is working!') >= 0) {
	} else if (message.content.indexOf('!help') >= 0) {
		var name = message.author.username;
		console.log(name + " used the help command!");
		message.reply("use !AP Toonname to get Aerie Peak char artifact info.  Use !ap toonname servername to get info for toons on other servers");
		message.reply("use !channelcheck to get the discord channel id");
		message.reply("use !norris for a random Chuck Norris fact.");
		message.reply("use !fact for a random number fact.");
		message.reply("use !dad for a HILARIOUS dad joke.");
	}
});

//***************************Random ass facts**************************//
client.on("message", message => {
	if(message.content.startsWith("!fact")) {
		var name = message.author.username;
		console.log(name + " requested a fact!");
		request({
			url: "http://numbersapi.com/random",

		}, function (error, response, body) {
				var fact = body;
				console.log(fact);
				message.reply(fact);
			}

		);
	}
});

//***************************Chuck Norris**************************//
client.on("message", message => {
	if(message.content.startsWith("!norris") || message.content.startsWith("!Norris")) {
		console.log("Norris Fact!");
		var name = message.author.username;
		var requrl = "http://api.icndb.com/jokes/random?firstname=" + name + "&lastname=";
		console.log(name + " requested a Chuck Norris joke!");
		request({
			url: requrl,
			json: true,

		}, function (error, response, body) {
				var fact = body['value']['joke'];
				var fact = fact.replace(/&quot;/g,'"');
				console.log(fact);
				message.reply(fact);
			}
		);
	}
});

//****************************************Bad dad joke***************************************//
client.on("message", message => {
	if(message.content.startsWith("!dad") || message.content.startsWith("!daddy") || message.content.startsWith("!Dad") || message.content.startsWith("!Daddy")) {
		console.log("Dad Joke!!");
		var name = message.author.username;
		console.log(name + " requested a Dad Joke!");
		request({
			url: "https://icanhazdadjoke.com",
			json: true,

		}, function (error, response, body) {
				var fact = body['joke'];
				console.log(fact);
				message.reply(fact);
			}
		);
	}
});

//**************************************************************************PRUNE BOT FUNCTION***************************************************************************//
// auto-delete function for CtM Discord LFG channel only.
client.on("message", message => {
	if (message.channel.id == 223246964957904896 || message.channel.id == 254699192654495745) {
		console.log("This message will be deleted");
		message.delete(1200000);
}
});


//********************************************************************************AP BOT FUNCTION***************************************************************************************//
// Total AP Query code
client.on("message", message => {
var data;
if (message.content === "!AP") {
		message.reply("Please enter your toon name");
} else if (message.content.indexOf("!AP") >= 0 && message.author.id != 269615816738209793) {
  var input = message.content;
  var fields = input.split(" ");
  var name = iconv.decode(new Buffer(fields[1]), "ISO-8859-1");
  var namePlain = fields[1];
  var response = [];
request({
    url: "https://us.api.battle.net/wow/character/aerie-peak/"+name+"?fields=achievements&locale=en_US&apikey=5597myxp32amte4phvehx3jytcd8bcd8",
    json: true,
		headers: {
			'content-type': 'application/json; charset=utf-8'
		},
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        var achievementlist = body['achievements']['criteria'];
        var quantitylist = body['achievements']['criteriaQuantity'];
        var key11 = achievementlist.indexOf(30103);
        var key22 = achievementlist.indexOf(29395);
        var value11 = quantitylist[key11];
        var value22 = quantitylist[key22];
				if (key11 != -1 && namePlain == "Galvanid" || namePlain == "galvanid") {
					message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + "Artifact Power and your currently equipped artifact weapon is level " + value22 + "!  You had a good idea so I won't make fun of you for your artifact progress. (At least for awhile.)");
					}
				else if (key11 != -1 && namePlain == "Lateraius" || namePlain == "lateraius" || namePlain == "Jamb�" || namePlain == "jamb�") {
					message.reply("Good day my master! You've earned " + value11.toLocaleString() + " Artifact Power! Your currently equipped artifact weapon is level " + value22 + "! Might I get you a warm beverage or a snack?");
				} else if  (key11 != -1 && namePlain == "Repans" || namePlain == "repans") {
					message.reply("Ahh, THE warlock... Repans.  You've earned " + value11.toLocaleString() + " Artifact Power! Your currently equipped weapon is level " + value22 + "! You can basically solo Gul'dan now right?");
				} else if (key11 != -1 && namePlain == "Rhyno" || namePlain == "rhyno") {
					message.reply("ALLURE!");
					setTimeout(function(){ message.reply("Oh yeah, you've also earned " + value11.toLocaleString() + " Artifact power and your weapon is level " + value22 + "!");}, 5000);
				} else if (key11 != -1 && namePlain == "Tattva" || namePlain == "tattva") {
					message.reply("Hey bossman! You've earned " + value11.toLocaleString() + " Artifact Power and your weapon is level " + value22 + "!");
					setTimeout(function(){ message.reply("Can I get a ready check?");}, 7500);
				} else if (key11 != -1 && value22 <= 15) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Fun fact: Did you know you actually have to make an effort to get artifact power? You can do WQs, or basically anything... hell do you even play this character?!");
			} else if (key11 != -1 && value22 <= 25) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Surely the Burning Legion will win if you don't get your ass in gear!  Get out there are empower your artifact!");
			}	else if (key11 != -1 && value22 <= 34) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You are almost to the magical 35th trait!  Keep going so your parses don't suck so bad!");
			}	else if (key11 != -1 && value22 == 35) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! YES! You got the 35th trait. But remember this doesn't mean you can stop... it goes higher than this... a lot higher. You're not even half way.");
			}	else if (key11 != -1 && value22 <= 40) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You've taken the first steps to mastering your weapon! Congratulations, but you're still behind the curve.  Get it in gear... aren't WQs and M+ dungeons FUN?!?");
			}	else if (key11 != -1 && value22 <= 45) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You are becoming more machine than man...or woman. I would recommend getting some of those Gunnar optik yellow tint glasses that make you look 30 years older than you really are to help with the eye strain you must have from so many WQs and M+'s.");
			}	else if (key11 != -1 && value22 <= 50) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! My GOD the grind is real.  I'm almost proud of your progress!");
			}	else if (key11 != -1 && value22 <= 53) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! The amount of grind and work that you have put in this weapon almost makes me nauseous. Just think, in a short while you will be done....for now.");
			}	else if (key11 != -1 && value22 == 54) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Holy shit. Go outside. For real. But GJ and GG! All your WoW friends can no be envious.");
			}	else {
				message.reply("There was an error with your query, likely either not level 110 or has no artifact weapon/AP");
			}
    } else {
		message.reply("There was an error with your query, maybe a typo? is this character on Aerie Peak? If no, please use !ap  (lower case ap)");
		}
});
};
});

client.on("message", message => {
var data;
if (message.content === "!ap") {
		message.reply("Please enter character name and server");
} else if (message.content.indexOf("!ap") >= 0 && message.author.id != 269615816738209793) {
  var input = message.content;
  var fields = input.split(" ");
  var name = iconv.decode(new Buffer(fields[1]), "ISO-8859-1");
  var namePlain = fields[1];
	var server = fields[2];
  var response = [];
request({
    url: "https://us.api.battle.net/wow/character/" + server + "/" + name + "?fields=achievements&locale=en_US&apikey=5597myxp32amte4phvehx3jytcd8bcd8",
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        var achievementlist = body['achievements']['criteria'];
        var quantitylist = body['achievements']['criteriaQuantity'];
        var key11 = achievementlist.indexOf(30103);
        var key22 = achievementlist.indexOf(29395);
        var value11 = quantitylist[key11];
        var value22 = quantitylist[key22];
				if (key11 != -1 && namePlain == "Galvanid" || namePlain == "galvanid") {
					message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + "Artifact Power and your currently equipped artifact weapon is level " + value22 + "!  You had a good idea so I won't make fun of you for your artifact progress. (At least for awhile.)");
					}
				else if (key11 != -1 && namePlain == "Lateraius" || namePlain == "lateraius" || namePlain == "Jamb�" || namePlain == "jamb�") {
					message.reply("Good day my master! You've earned " + value11.toLocaleString() + " Artifact Power! Your currently equipped artifact weapon is level " + value22 + "! Might I get you a hot beverage or a snack?");
				}
				else if (key11 != -1 && value22 <= 15) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22);
		message.reply("! Fun fact: Did you know you actually have to make an effort to get artifact power? You can do WQs, or basically anything... hell do you even play this character?!");
			} else if (key11 != -1 && value22 <= 25) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Surely the Burning Legion will win if you don't get your ass in gear!  Get out there are empower your artifact!");
			}	else if (key11 != -1 && value22 <= 34) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You are almost to the magical 35th trait!  Keep going so your parses don't suck so bad!");			}	else if (key11 != -1 && value22 == 35) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! YES! You got the 35th trait. But remember this doesn't mean you can stop... it goes higher than this... a lot higher. You're not even half way.");			}	else if (key11 != -1 && value22 <= 40) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You've taken the first steps to mastering your weapon! Congratulations, but you're still behind the curve.  Get it in gear... aren't WQs and M+ dungeons FUN?!?");			}	else if (key11 != -1 && value22 <= 45) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! You are becoming more machine than man...or woman. I would recommend getting some of those Gunnar optik yellow tint glasses that make you look 30 years older than you really are to help with the eye strain you must have from so many WQs and M+'s.");			}	else if (key11 != -1 && value22 <= 50) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! My GOD the grind is real.  I'm almost proud of your progress!");			}	else if (key11 != -1 && value22 <= 53) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! The amount of grind and work that you have put in this weapon almost makes me nauseous. Just think, in a short while you will be done....for now.");			}	else if (key11 != -1 && value22 == 54) {
        message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Holy shit. Go outside. For real. But GJ and GG! All your WoW friends can no be envious.");			}	else {
				message.reply("There was an error with your query, likely either not level 110 or has no artifact weapon/AP");			}
    } else {
		message.reply("There was an error with your query, maybe a typo? remember realms with two names are hyphenated (ie: aerie-peak)");		}
});
};
});

//******************************************************************************* END AP BOT FUNCTION *****************************************************************************************//







































//client.login("MjYyMDQxNzQyMTMwMjgyNDk2.Cz9s5g.UHJ1TjQW34rUtsjML--z1jvYIMA");   //pruneTest client
//client.login("MjM0MTE1MDYxNDExNDc5NTUy.CtnUQw.My73vWT2h6RbUCRj7KZUGgPGJIQ");    //prunebot client
client.login("MjY5NjE1ODE2NzM4MjA5Nzkz.C1r61A.5j7e4NTiXl8-xlehXfJ6AHjH6vY");  //BotJambi login
