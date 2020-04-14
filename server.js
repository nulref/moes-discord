'use strict';
require('dotenv').config();

const Discord        = require('discord.js');
const ytdl           = require('ytdl-core');

const moe =    new Discord.Client();
const krusty = new Discord.Client();
const bart =   new Discord.Client();
const ned =    new Discord.Client();

const MOEID =    "601527406204944396";
const KRUSTYID = "601199909223268381";
const BARTID =   "699035673935609947";
const NEDID =    "699036777662644264";

const MOES = "601532234071015466";
const GPUB = "168893686581690368";

const KRUSTYTRIGGER = "shut up you damn clown. no one asked you!";
const MOETRIGGER =    "please stop all the fighting and yelling.";

const streamOptions = {
    seek: 0,
    volume: 1
};

moe.login(process.env.MOE);
krusty.login(process.env.KRUSTY);

moe.on('ready', () => {
    console.log("Moe is ready to soothe you.");
});

krusty.on('ready', () => {
    console.log("Krusty is ready to taunt you.");
});

// Container for the songs
var playList = [];

var quotes = [
    "Aaaaaagh! I almost swallowed some of the juice!",
    "After 35 years of show business people already forget who you are...just like what's his name...you know, the guy...he always wore the shirt?",
    "A joke, ah...oh....ok! A man walks into a bar with a small piano, and a twelve inch pianist.....whooaaa hooaaa...I can't tell that one!!...huh huh huh huh huh!",
    "Banana? That's your answer to everything! And you, Mel, I don't know what you are.",
    "Bart, I need your fingerprints on a pair of candlesticks. Meet me in the conservatory chop, chop! Don't worry, everything will be alright...",
    "Burn that seat!",
    "Choke, Lendl choke!",
    "Did you send those flowers to Bea Arthurs' grave? I don't care if she's not dead yet, JUST DO IT!",
    "Don't blame me! It's the percadan. If you ask me, that stuff rotts your brain...And now a word from our new sponsor...Percadan, Oh CRAP!!",
    "Forget it. The academy hates me...I don't know why...they wouldn't know comedy if it bit them on their...HEY! HEY!",
    "Get in line... Over there!",
    "Give a hoot, read a book!",
    "Hey, Hey, HEY! Ichs nay on the eww jay!!!",
    "Hey! Hey! Hey! It's great to be back at the Apollo Theater!'. 'Krusty Komedy Klassic' or 'KKK' for short. 'KKK?! That's not good. Unghhhhh. . .",
    "Hey that seltzer ain't free!",
    "Hoo hoo hoo hah hah! They'll never let us show that one again! Not in a million years!",
    "How can I sell it when that guys giving it away for free?",
    "Guess who, FATBOY?",
    "I can pull a better cartoon out of my aaaa-heh-heh-heh...",
    "I'll be played by Jimmy Smits",
    "If they ever open the books on this, I'd be joining you there [in prison] anyway!",
    "If this is anyone but Steve Allen, you're stealin' my bit!",
    "I campaigned for the other guy, but I voted for you!",
    "It's a towel, you yutz!",
    "Is it a crime to be illiterate?",
    "I think there's still a spot on my butt.",
    "I used to do a lot of tumbling in my act but I'm phasing it out for more dirty limericks. There once was a man named Enus...",
    "I thought they were due! The game was fixed! The Globetrotters used a ladder for Pete's sake! C'mon! He's just holding out the ball, take it!!",
    "I've beem doing this show for so long that when I started, the Ayotolah only had a goatee...",
    "I will personally spit into every fiftieth burger!",
    "My house is dirty. Buy me a clean one. Hire Kenny G to play for me in the elevator.",
    "Now for my favorite part of the show....What does that say? Talk to the audience! Ugghhh, this is always death...",
    "Okay I'll do it. Steal a pair of Hagar slacks and you have to pay for it for the rest of your life",
    "Sex Cauldron! I thought they closed that place down years ago!",
    "There's nothing better than a cigar lit with a hundred dollar bill!",
    "Tonight I'm going to suck... (switches the cue cards) your blood!",
    "Ugghhh, I don't know what the hell I was thinking last night.",
    "Uh huh...uh huh...Oy Gevalt!",
    "Unnngh, I'm gonna take a bath on this one!",
    "We're going to the greatest place on earth...Tijuana!",
    "We've got wallet making, archery, the whole megillah!",
    "What the hell was that?",
    "What was I on?",
    "You were in The Blue Lagoon, and I'm a blue haired goon... what the? That's terrible! My hair's not even blue, it's green!",
    "Finally, I'd like to announce that starting Monday, this show will be broadcast in HD. Here's how I'll look. Heh? That's right! Look at your hero!",
    "A great man once observed: '90 % of success is showing up on time.' Sorry I'm four hours late...",
    "You know, I'd like to thank god for all of my success. Even though I never worshipped or believed in him in any way.",
    "Look, I give people a meat-like burger. and some kind of cola. And they still get their change back from their fifty.",
    "AY! OH, QUELASTIMA.",
    "I don't wanna hit a sore spot, but can we talk about herpes.",
    "The arctic circle, or as I call it, my wife's side of the bed. For the purposes of that joke I'm married."
];

moe.on('message', async message => {

    if (message.author.id === MOEID) {
        return;
    }

    if (message.content.toLocaleLowerCase() === 'moe commands') {
        message.channel.send("I'll play ya some tunes from the ol' juke box.");
        message.channel.send("Say 'moe play', and with a link to a youtube video and I'll add it to the playlist.");
        //message.channel.send("Say 'moe skip', and I'll skip to the next song on the playlist. ");
        message.channel.send("Say 'moe time', and I'll tell you the time. Not my most useful trick if I'm being honest.");
        message.channel.send("If you hear my phone ringing, say 'moe phone'.");
        message.channel.send("That's it. Now get outa my face.");
    }
    else if (message.content.toLowerCase().includes('moe play')) {

        playQueue(message);
    }
    else if (message.content.toLowerCase() === 'moe skip') {

    }
    else if (message.content.toLowerCase() === 'moe stop') {
        if (!message.guild.channels.find(channel => channel.id === MOES))
            var voiceChannel = message.guild.channels.find(channel => channel.id === GPUB);
        else
            var voiceChannel = message.guild.channels.find(channel => channel.id === MOES);

        voiceChannel.leave();
    }
    else if (message.content.toLowerCase() === 'tada!!') {
        message.channel.send("Shut up you damn clown. No one asked you!");
        message.channel.send("It's " + checkWatch() + ", by the way.");
    }
    else if (message.content.toLocaleLowerCase() === MOETRIGGER) {
        message.channel.send("Hey hey hey, get outa here Flanders");
    }
    else if (message.content.toLowerCase() === 'moe phone') {
        prankCall(message);
    }
});

krusty.on('message', message => {
    if (message.author.id === KRUSTYID) {
        return;
    }

    if (message.content.toLocaleLowerCase() === 'krusty commands') {
        message.channel.send("Okay listen, I'm only going to say this once probably.");
        message.channel.send("Say 'hi krusty', and I will mock you.");
        message.channel.send("Say 'krusty taunt @someone', and I will mock them.");
        message.channel.send("Say 'krusty joke', and I will deliver one of my klassic lines.");
        message.channel.send("And thats probably it. Who cares, this bot will be cancelled in a month anyway.");
    }
    else if (message.content.toLowerCase() === 'hi krusty') {
        var taunts = [
            "Hey " + message.author + ", isn't it a little hot in here for that cheerleader outfit?",
            message.author + " go home, you're drunk.",
            "Listen, " + message.author + ", I'm not the kind of dad who, you know, does things, or says stuff or looks at ya. But the love is there!",
            "Good evening. Tonight our guest is " + message.author + ", who will be discussing collective bargaining agreements.",
            "There are only two rules in Discord: don't swear, and don't whip it out. It's not rocket science!",
            "Put a sock in it, " + message.author + "! How much are these free burgers gonna cost me?",
            message.author + " gave me a kidney, it wasn't his, I didn't need it and it came postage due, but still a lovely gesture.",
            "Hang on, " + message.author + ". I got a tack in my head.",
            "Yeah, great. Now I need a new sidekick. Get me a lemur, or a marmot. Or " + message.author + ". He's not doing anything these days.",
            "Hey boys and girls! Look at " + message.author + " crying out for attention."
        ];
        var taunt = taunts[Math.floor(Math.random() * taunts.length)];
        message.channel.send(taunt);
    }
    else if (message.content.toLowerCase().includes('krusty taunt')) {
        var buttOfJoke = "<@" + message.mentions.users.first().id + ">";

        var taunts = [
            "Hey " + buttOfJoke + ", isn't it a little hot in here for that cheerleader outfit?",
            buttOfJoke + " go home, you're drunk.",
            "Listen, " + buttOfJoke + ", I'm not the kind of dad who, you know, does things, or says stuff or looks at ya. But the love is there!",
            "Good evening. Tonight our guest is " + buttOfJoke + ", who will be discussing collective bargaining agreements.",
            "Put a sock in it, " + buttOfJoke + "! How much are these free burgers gonna cost me?",
            buttOfJoke + " gave me a kidney, it wasn't his, I didn't need it and it came postage due, but still a lovely gesture.",
            "Hang on, " + buttOfJoke + ". I got a tack in my head.",
            "Yeah, great. Now I need a new sidekick. Get me a lemur, or a marmot. Or " + buttOfJoke + ". He's not doing anything these days.",
            "Hey boys and girls! Look at " + buttOfJoke + " crying out for attention."
        ];
        var taunt = taunts[Math.floor(Math.random() * taunts.length)];
        message.channel.send(taunt);
    }
    else if (message.content.toLowerCase() === 'moe time') {
        message.channel.send("It's doing 13 while she's elevening your 5.");
        message.channel.send("Tada!!");
    }
    else if (message.content.toLowerCase() === 'krusty joke') {
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        message.channel.send(quote);
    }
    else if (message.content.toLowerCase().includes('krusty')
        && !message.content.toLowerCase().includes('hi krusty')
        && !message.content.toLowerCase().includes('krusty taunt')
        && !message.content.toLowerCase().includes('krusty time')
        && !message.content.toLowerCase().includes('krusty commands')
        && !message.content.toLowerCase().includes('krusty joke')) {
        message.channel.send("Try saying 'krusty commands', you urine monkey.");
    }
    else if (message.content.toLowerCase() === KRUSTYTRIGGER) {
        message.channel.send("Hey, no one talks to ME that way! I'm a star.");
        startNed(message);
    }
});

async function playQueue(message) {

    // Get the URL to play
    let args = message.content.split(" ");
    let url = args[2];
    // Handle voice channels for multiple servers
    if (!message.guild.channels.find(channel => channel.id === MOES))
        var voiceChannel = message.guild.channels.find(channel => channel.id === GPUB);
    else
        var voiceChannel = message.guild.channels.find(channel => channel.id === MOES);

    // Validate the URL (make sure its a real URL)
    var validURL = ytdl.validateURL(url);

    if (voiceChannel != null && validURL) {
        // Make sure there are no duplicate songs in queue
        filterUrls(url, message);        

        // If Moe is not in a channel, he needs to join then start playing the song
        // If he's already in a channel, just add the song to the playlist
        if (voiceChannel.connection) {
            // Join the channel then play song
            //const voiceConnection = await voiceChannel.join();
            await playSong(message.channel, voiceConnection, voiceChannel);
            console.log("Connection exists.");
            const embed = new Discord.RichEmbed();
            embed.setAuthor(moe.user.username, moe.user.displayAvatarURL);
            embed.setDescription("Yeah, yeah, whateva'.");
            message.channel.send(embed);
        }
        else {
            try {
                const voiceConnection = await voiceChannel.join();
                console.log("Joining");
            } catch (e) {
                console.log(e);
            }
            // Already in channel. Add song to queue
            //await playSong(message.channel, voiceConnection, voiceChannel);
        }
    }
}

async function playSong(messageChannel, voiceConnection, voiceChannel) {
    // Plays the auio only version of the song
    const stream = ytdl(playList[0], { filter: "audioonly" });
    const dispatcher = connection.playStream(stream, streamOptions); //Play the song

    // Check for more songs when one song ends
    // Leave the channel is all songs are done
    dispatcher.on("end", () => {
        // Remove the first song on the list once its done
        playList.shift();

        // Check the playlist for additional songs
        if(playList.length == 0)
            voiceChannel.leave(); // No more songs. Leave the channel
        else {
            // Give Moe a few minutes to load up another song
            setTimeout(() => {
                playSong(messageChannel, voiceConnection, voiceChannel);
            }, 5000);
        }
    });
}

function filterUrls(url, message) {
    // Check the playlist for existing song
    var duplicate = playList.some(element => element === url);

    // Put new song in the playlist
    if (!duplicate) {        
        playList.push(url);
        message.channel.send("Your taste in music disgusts me, but okay.");
    }
}

function startNed(message) {
    const ned = new Discord.Client();
    ned.login(process.env.NED);
    ned.on('message', message => {
        if (message.author.id === NEDID) {
            return;
        }
    });
    ned.on('ready', () => {
        console.log("Ned is ready to annoy you.");
        const channel = ned.channels.get(message.channel.id);
        channel.send("Hi diddly ho neighborinos!");
        channel.send("You are my brothers. I love you, and yet I feel a great sadness in my bosom.");
        channel.send("Please stop all the fighting and yelling.");
        setTimeout(nedLeave, 1500, ned, message);
    });
}

function nedLeave(ned, message) {
    const channel = ned.channels.get(message.channel.id);
    channel.send("Okay, fine.")
    ned.destroy();
}

function checkWatch() {
    var date = new Date();
    var hours = date.getHours();
    var mins = date.getMinutes();

    hours > 12 ? hours = hours - 12 : true; 

    hours == 0 ? hours = 12 : true;

    mins < 10 ? mins = "0" + mins - 12 : true;    

    return hours + ":" + mins;
}

function prankCall(message) {
    const bart = new Discord.Client();
    bart.login(process.env.BART);
    bart.on('message', message => {
        if (message.author.id === BARTID) {
            return;
        }
    });

    bart.on('ready', () => {
        console.log("Bart is ready to moon you.");
        const moeCall = moe.channels.get(message.channel.id);
        const bartCall = bart.channels.get(message.channel.id);
        moeCall.send("Hello.");
        bartCall.send("Is Al there?");
        moeCall.send("Al?");
        bartCall.send("Yeah, Al. Last name Caholic?");
        moeCall.send("Hold on, I'll check. Phone call for Al... Al Caholic. Is there an Al Caholic here?");
        moeCall.send("Wait a minute... Listen, you little yellow-bellied rat jackass, if I ever find out who you are, I'm gonna kill you!");
        bartCall.send("Ahahahahahahaha!!");
        setTimeout(hangUp, 1500, bart);
    });
}
function hangUp(bart) {
    bart.destroy();
}