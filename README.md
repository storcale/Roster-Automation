# Roster-Automation
All the code of the Roster, and code for handling bot commands

doGet() and doPost() are HTTP and command handler.
All the code beneath it is the actual command code.

Note: You can't actually run the code without sending an http request. To test the code, use the commands. To test the http request, copy and paste in your search bar the API url with your parameters. (Default: GET request)

This code is owned by me, and only me, the owner of the storcale@gmail.com google account.

## Current commands:

### /search-user [callsign] [division]

Callsign: integer, the callsign of the person to search.
Division: string, in which division (sheet) to search the user. 

Method: GET http Request, query: command,callsign,division

### /add-user [callsign] [rank] [discord] [roblox] [rank]

Callsign: integer, the callsign of the person
Rank: string, the rank of the person: Where will the person added 
Discord: The discord username of the person
Roblox: The roblox username of the person

Method: POST http request, query: command, callsign, rank, discord,roblox