# ⚠️ This repo is archived
This whole system has been replaced by the [LCFR API](https://github.com/storcale/LCFR-API) and by the [LCES Discord bot](https://github.com/LCFR-Development/lces-discord-bot)
This project will no longer get maintained or receive updates.

# Roster-Automation
All the code of the Roster, and code for handling bot commands

doGet() and doPost() are HTTP and command handler.
All the code beneath it is the actual command code.

Note: You can't actually run the code without sending an http request. To test the code, use the commands. To test the http request, copy and paste in your search bar the API url with your parameters. (Default: GET request)

This code is owned by me, and only me, the owner of the storcale@gmail.com google account.

If you want to use this code, of part of this code, just contact me by discord or email :)
## Current command:

## /roster

Offers a menu displaying buttons for the actions that can be performed: Search,add, remove

#### search [callsign] [division]

Callsign: integer, the callsign of the person to search.

Division: string, in which division (sheet) to search the user. 

Method: GET http Request, query: command,callsign,division

#### add [callsign] [rank] [discord] [roblox]  [division]

Callsign: integer, the callsign of the person.

Rank: string, the rank of the person: Where will the person added.

Discord: The discord username of the person

Roblox: The roblox username of the person

Division: string,in which division (sheet) the person is

Method: POST http request, query: command, callsign, rank, discord,roblox,division

#### remove [callsign] [division]

Callsign: Integer, the callsign of the person to remove

Division: string,in which division (sheet) the person is

Method: POST http request, query: callsign,division

