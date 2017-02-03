/////////////////////////////////////////////////////////////////////////////////////////
//////////	BotJambi created by Jambî/Lateraius
//////////					Aerie-Peak US
//////////				  Convert to Mythic
//////////			     		©2017
////////////////////////////////////////////////////////////////////////////////////////

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
	} else if (message.content == "!help") {
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
		var id = message.author.id;
		console.log(name + "ID: " + id + " requested a Dad Joke!");
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
// auto-delete function for CtM Discord LFG channel only.  add || message.channel.id == yourchannelidhere to include it in the delete function(auto deletes messages 20mins after sent)
client.on("message", message => {
	if (message.channel.id == 223246964957904896 || message.channel.id == 254699192654495745) {
		console.log("This message will be deleted");
		message.delete(1200000).catch(console.error);
}
});
///////////////////////////////////////////////Mass message delete function, delete up to 100 messages with one command//////////////////////////////////////////////////////////////////
client.on("message", message => {
	if(message.content.startsWith("!delete") && message.author.id == 89869093930278912) {
		var input = message.content;
		var fields = input.split(" ");
		var numb = fields[1];
		var name = message.author.username;
		var channel = message.channel.id;
		var testy = message.channel.name;
		var server = message.channel.guild.name;
		console.log(testy);
		if(!numb) {
			var numb = 1;
		}
		console.log(name + " is deleting " + numb + " messages from the " + testy + " channel on the " + server + " server.");
		message.channel.fetchMessages({limit: numb})
			.then(messages => {messages.deleteAll()})
			.catch(console.error);
} else if(message.content.startsWith("!delete") && message.author.id != 89869093930278912) {
		message.reply("Sorry, you don't have permission to run this command.");
	}
});
//********************************************************************************AP BOT FUNCTION***************************************************************************************//
// Total AP Query code
client.on("message", message => {
var data;
if (message.content === "!AP") {
		message.reply("Please enter your toon name");
}	else if (message.content.startsWith('!AP') && message.content.match(/\s/g) === null && message.author.id != 269615816738209793) {
		message.reply("Don't be dumb like Cipher, put spaces in your query. You can also type !help for more info");
		console.log(message.author.id);
		} else if (message.content.startsWith("!AP") && message.author.id != 269615816738209793) {
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
							console.log(message.author.id);
						} else if  (key11 != -1 && namePlain == "Repans" || namePlain == "repans") {
							message.reply("Ahh, THE warlock... Repans.  You've earned " + value11.toLocaleString() + " Artifact Power! Your currently equipped weapon is level " + value22 + "! You can basically solo Gul'dan now right?");
						} else if (key11 != -1 && namePlain == "Rhyno" || namePlain == "rhyno") {
							message.reply("ALLURE!");
							setTimeout(function(){ message.reply("Oh yeah, you've also earned " + value11.toLocaleString() + " Artifact power and your weapon is level " + value22 + "!");}, 5000);
						} else if (key11 != -1 && namePlain == "Tattva" || namePlain == "tattva") {
							message.reply("Hey bossman! You've earned " + value11.toLocaleString() + " Artifact Power and your weapon is level " + value22 + "!");
							setTimeout(function(){ message.reply("Can I get a ready check?");}, 7500);
						} else if  (key11 != -1 && namePlain == "Ciphervex" || namePlain == "ciphervex" || namePlain == "CipherVex") {
							message.reply("HOLY SHIT ON A SHINGLE!  Cipher learned how to type instead of breaking me while I try to follow his faulty logic and terrible keyboardsmanship!  I'm so proud I'm going to let you know that you've earned " + value11.toLocaleString() + " Artifact Power and your weapon is level " + value22 + "!")
							console.log(message.author.id);
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
							message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Holy shit. Go outside. For real. But GJ and GG! All your WoW friends can now be envious.");
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
				} 	else if (message.content.startsWith('!ap') && message.content.match(/\s/g) === null && message.author.id != 269615816738209793) {
						message.reply("Don't be dumb like Cipher, put spaces in your query. You can also type !help for more info");
				}	else if (message.content.indexOf("!ap") >= 0 && message.author.id != 269615816738209793 && message.content.match(/\s/g) !== null) {
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
								message.reply("Hey " + namePlain + "! You have earned a total of " + value11.toLocaleString() + " Artifact Power and your currently equipped artifact weapon is level " + value22 + "! Holy shit. Go outside. For real. But GJ and GG! All your WoW friends can now be envious.");
					}	else {
							message.reply("There was an error with your query, likely either not level 110 or has no artifact weapon/AP");			}
				} else {
					message.reply("There was an error with your query, maybe a typo? remember realms with two names are hyphenated (ie: aerie-peak)");		}
		});
	};
});

//******************************************************************************* END AP BOT FUNCTION *****************************************************************************************//





























client.on("message", message => {
	if (message.content.startsWith("!fortune") || message.content.startsWith("!Fortune") || message.content.startsWith("!Cookie") || message.content.startsWith("!cookie")) {
			var fortunes = ["What did the tree druid say when he logged into his garrison?  I'm bored.", "King Richard \"The Lion Heart\" refused to have Paladins in his army, because they would always cause a \"Crusader Strike\".", "Undead monks who gamble get a Rush ... when they Roll the Bones.", "What is a mistweaver monk's favorite animal? A Manatee! (Mana tea)", "Tauren don't gamble at the Goblin Casino, because the steaks are too high.", "Monk who go to bed with itchy butt, wake up with Touch of Death!", "Who wins between a Holy Paladin and a Resto Druid? The weekly maintenance.", "A clown holding the door for you... is a nice jester!", "When a Piano falls down a mine shaft, you get A Flat Minor.", "The Shattered Hand clan are bad at football, because the only play they know is the hand off.", "A wise raid leader will bring 10 gnomes for mythic content because gnoming is half the battle!", "Hunter who needs a new car...must get a \"Focus\"", "A warlock with chicken pox has spec'd affliction.", "Rogues who want green fire should pick locks.",
			 "If you cross a Gnome with a Tauren you get a mini-taur.", "A Tauren valedictorian….is some grade A beef.", "A Druid who fights in tree form…is called a combat log", "When a Gnome Clockmaker is hungry…he goes back 4 seconds.", "A Night Elf's favorite underwear…is Fruit of Elune.", "A Tauren's Favorite Coffee…is Decaf.", "A group of Tauren running across Mulgore…are called Steaks on a Plain.", "A Pandaren who cooks in the dark…must use a Shado-Pan.", "One Tauren spying on another Tauren…is called a steak out.", "If James Bond played a Paladin...he'd be Bubble O Seven.", "A Rogues favorite drink...is subtle tea.", "Warlock Firemen say…stop, dot, and roll.", "If a Paladin doesn't get a pay raise...he may go on Crusader Strike.", "What do you say to a Worgen Priest who refuses to stop casting Smite?...Heel!", "How many tickles does it take to make a Dranei laugh?…Ten Tickles.", "If Bob Marley played World of Warcraft…he'd be a dreadlock.", "The best way to get on the good side of the August Celestial Chi-Ji…is to gently Pat Krane.", "A true test of a Pandaren husband, Is being sent to the store…to get Klaxxi pads.", "When a Druid Tank leaves the group… He is the Bear of Bad News.",
			  "A mastrubating Tauren…is called Beef Stroganoff.", "Tauren are terrible chefs…because they only make cow pies.", "Members of the Shado Pan, spend their free time…at the Taran Zoo.", "When a Male Tauren leaves his home, his parents say…Bi Son.", "A Tree Druid who enjoys Twerking…is called Miley Cyprus.",
			  "Raider who cheeses the meters…is not very Gouda.", "5 Druids sitting in a Moonwell…is a Hot Tub.", "A druid who tanks without socks...is bearfoot.", "A vegetarian Undead’s favorite food is….GRAAAAAAAIIIIINS.", "A group of Tauren Gangsters are called…The Moo Tang Clan.", "A fish with no eyes…is called a Fssshhhhh.", "A warrior who has had too much to drink…is tanked.", "When Yogg-Saron questions your age…he wonders how Uld-you-are.", "The best way to get a hunter drunk….is with Multishot.", "The preferred Moisturizer of Tauren…is Olay.", "A Psychic Gnome who escapes from The Stockades…is a small medium at large.", "A lounge singer who is always out of mana…is named Barry Mana Low.", "After a raid wipe, Healer Monks often say…I mist.", "This Arcane Mage nerf…is 1, 2 many.", "A Mages best defense against a stink bomb…is casting Counter Smell.", "A duck in rehab, is likely addicted…to quack.", "Enhancement Shaman who wins beans eating contest…likely to cast Unleash Wind.", "If E.T played World of Warcraft, his race would be…E.T go gnome.", "A Resto Druid mows his lawn…to get rid of Wild Growth.",
				"A Pandaren who cooks in the dark…must use a Shado-Pan.", "Pop star Adele plays a Mage…because she's always rolling in the deeps.", "Hunters take bad photographs…because they are always out of focus.", "A Pandaren’s favorite burger…is a Quarter Panda With Cheese.", "Tauren Poker players are known…for their Thunder Bluff.", "Never argue with a Tauren…It goes in one ear and out the udder.", "A Pandaren who cuts himself…has to use a Pandaid.", "A Mage who cannot fish…is considered a bad caster.", "A Hunter that wishes to skip work...Feigns Death in the family.", "The musician in Icecrown...is the Arthas formerly known as Prince","Good raiders smell bad...because they never wipe.", "When Horde set down a Feast…the hungriest raider is always a-goblin.", "Mage who watch fast paced action movie...shouldn't blink.", "Paladin who wishes to sleep on the clock...must lay on hands.", "Rogue who burp on vent for all to hear…must have mute too late.",	"Warrior with too many babies…need to spec Protection.", "Mage who eat too many donuts…is overpowdered.", "A druid who lights their farts...casts Moonfire.", "A crowded tram ride in Stormwind…smell different to Gnome.", "In Pandaria, to make an Egg Roll…push it.",
				"A Druid going through their teenage years…experience Wild Growth."];
			var rando = fortunes[Math.floor(Math.random() * fortunes.length)];
			message.reply("Channeling the great Koltrane...");
			setTimeout(function(){message.reply("Fortune Cookie Say...");}, 2000);
			setTimeout(function(){ message.reply(rando);}, 4000);
	}
})







//different bot account client ID's

//client.login("MjYyMDQxNzQyMTMwMjgyNDk2.Cz9s5g.UHJ1TjQW34rUtsjML--z1jvYIMA");   //pruneTest client
//client.login("MjM0MTE1MDYxNDExNDc5NTUy.CtnUQw.My73vWT2h6RbUCRj7KZUGgPGJIQ");    //prunebot client
client.login("MjY5NjE1ODE2NzM4MjA5Nzkz.C1r61A.5j7e4NTiXl8-xlehXfJ6AHjH6vY");  //BotJambi login
