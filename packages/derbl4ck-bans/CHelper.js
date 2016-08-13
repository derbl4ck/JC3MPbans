/**
 * @overview derbl4ck's bans Helper Class
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Helper functions
 */
module.exports = class CHelper {

    /**
     * Checks if a Player is able to use Commands
     * @param {String} player
     * @return {boolean} able
     */
    static isAdmin(player) {
        const result = config.adminPlayers.indexOf(player.client.steamId);

        if (result >= 0) return true;
        else return false;
    }

    /**
     * Checks if a Player is Whitelisted
     * @param {String} SteamID of the Player
     * @return {boolean} on the list
     */
    static isWhitelisted(steamID) {
        try {
            const tmp = JSON.parse(fs.readFileSync(this.getPath('whitelist'), 'utf-8'));

            if (tmp.indexOf(steamID) >= 0) return true;
            else return false;
        } catch (ex) {
            return false;
        }
    }

    /**
     * Adds a Player to the Whitelist
     * @param {String} SteamID of the Player
     * @return {boolean} success
     */
    static add2Whitelist(steamID) {
        try {
            const tmp = JSON.parse(fs.readFileSync(this.getPath('whitelist'), 'utf-8'));
            tmp.push(steamID);
            fs.writeFile(this.getPath('whitelist'), JSON.stringify(tmp), 'utf-8');
        } catch (ex) {
            const tmp = [steamID];
            fs.writeFile(this.getPath('whitelist'), JSON.stringify(tmp), 'utf-8');
        }
        
        return true;
    }
    
    /**
     * Checks if a IP is Whitelisted
     * @param {String} IP
     * @return {boolean} on the list
     */
    static isIPWhitelisted(IP) {
        try {
            const tmp = JSON.parse(fs.readFileSync(this.getPath('IPwhitelist'), 'utf-8'));
            
            if (tmp.indexOf(IP) >= 0) return true;
            else return false;
        } catch (ex) {
            return false;
        }
    }
    
    /**
     * Checks if a IP is Banned
     * @param {String} IP
     * @return {boolean} on the list
     */
    static isIPBanned(IP) {
        return false;
    }
    
    /**
     * Checks if a Player is Banned
     * @param {String} Player
     * @return {boolean} on the list
     */
    static isBanned(player) {
        return false;
    }

    /**
     * Adds a Ban to our banlist
     * @param {String} Player from
     * @param {String} Player Banned
     * @param {String} reason
     * @return {boolean} on the list
     */
    static addBan(player, ban, reason) {
        if (config.pushBans2server) {
            this.pushBans2server();
        }
    }

    /**
     * Pushs our Banlist to a Server
     * @return {boolean} success
     */
    static pushBans2server() {
        return true;
    }

    /**
     * Checks if a file exists
     * @param  {String} Path to file
     * @return {boolean} exist
     */
    static fileExist(fpath) {
        try {
            return fs.statSync(fpath).isFile();
        } catch (err) {
            return false;
        }
    }

    /**
     * Returns the path of a list
     * @param  {String} listname
     * @return {String} path
     */
    static getPath(list) {
        return path.join(path.join(__dirname, 'db'), `${list}.json`);
    }
};
