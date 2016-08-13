/**
 * @overview derbl4ck's bans
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

console.log('[derbl4ck\'s bans] System started');

process.on('uncaughtException', (err) => {
    console.log('\x1b[31m[derbl4ck\'s bans] An error occurred. Stack trace: \x1b[0m');
    console.log(`\x1b[31m[derbl4ck\'s bans] ${err}\x1b[0m`);
});

const config = require('./config');
const CHelper = require('./CHelper');
const lang = require('./lang');

events.Add('ClientConnected', (client) => {
    if (CHelper.isIPBanned(client.ipAddress)) {
        if (CHelper.isIPWhitelisted(client.ipAddress)) {
            console.log(`[derbl4ck\'s bans] IP Ban for Player '${client.name}' 
            was ignored (whitelisted).`);
        } else {
            console.log(`[derbl4ck\'s bans] IP '${client.ipAddress}' tried to 
            connect.`);
            client.Kick(lang.playerbanmsg);
        }
    }

    if (CHelper.isBanned(client.steamId)) {
        if (CHelper.isWhitelisted(client.steamId)) {
            console.log(`[derbl4ck\'s bans] Ban for Player '${client.name}' was 
            ignored (whitelisted).`);
        } else {
            console.log(`[derbl4ck\'s bans] Player '${client.name}' tried to 
            connect.`);
            client.Kick(lang.playerbanmsg);
        }
    }
});

register('ban', (player, ban, reason) => {
    if (CHelper.isAdmin(player)) {
        if (typeof ban === 'undefined') {
            return player.SendChatMessage('USAGE: /ban [name] [reason]',
             new RGB(255, 140, 0));
        }

        if (config.broadcastBans) {
            for (let i = 0; i < jcmp.players.length; i++) {
                jcmp.players[i].SendChatMessage(lang.broadcastban.replace(
                    '[pname]', ban.name), new RGB(255, 0, 0));
            }
        }
        
        CHelper.addBan(player, ban, reason);
        ban.Kick(lang.playerbanmsg);
    } else {
        return player.SendChatMessage(lang.playerdontpermission,
         new RGB(255, 140, 0));
    }
});

register('kick', (player, kick, reason) => {
    if (CHelper.isAdmin(player)) {
        if (typeof kick === 'undefined') {
            return player.SendChatMessage('USAGE: /kick [name] [reason]',
             new RGB(255, 140, 0));
        }

        if (config.broadcastKicks) {
            for (let i = 0; i < jcmp.players.length; i++) {
                jcmp.players[i].SendChatMessage(lang.broadcastkick.replace(
                    '[pname]', kick.name), new RGB(255, 0, 0));
            }
        }
        
        kick.Kick(lang.playerkickmsg.replace('[reason]', reason));
    } else {
        return player.SendChatMessage(lang.playerdontpermission,
         new RGB(255, 140, 0));
    }
});
