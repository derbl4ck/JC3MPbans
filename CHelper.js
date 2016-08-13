/**
 * @overview derbl4ck's bans Helper Class
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

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
     * @param {String} player
     * @return {boolean} on the list
     */
    static isWhitelisted(player) {
        return false;
    }
    
    /**
     * Checks if a IP is Whitelisted
     * @param {String} IP
     * @return {boolean} on the list
     */
    static isIPWhitelisted(IP) {
        return false;
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
};
