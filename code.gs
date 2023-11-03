
// Read README.MD before going trough the code.


var ss = SpreadsheetApp.getActiveSpreadsheet()
var emssheet = ss.getSheetByName("EMS")

var error404 = "Error 404: Not found"
var date = new Date


function doGet(e) {
  // Handle GET request
  var log = "Processed at: " + date + ".";
  Logger.log(log)
  var command = e.parameter.command // Get what command was ran
  
 switch(command){

  case "searchUser":
 
   var queryCallsign = e.parameter.callsign; // Access query parameter named "vcallsign"
   var queryDivision = e.parameter.division // Get query parameter "division"
  if(searchUser(queryCallsign,queryDivision) != error404){
   var output = "\n" + "\n**Discord username:** " + getDiscord(queryCallsign,queryDivision) + "\n**Roblox username**: " + getRoblox(queryCallsign,queryDivision) + "\n**Rank:** " + getRank(queryCallsign, queryDivision) + "\n**Divisions:** " + getDivisions(queryCallsign,queryDivision) + "\n"
   Logger.log(output)
   return ContentService.createTextOutput(log + output).setMimeType(ContentService.MimeType.TEXT)
  }else{
    var err = "**Error 404**: __ Not found__: No user in " + queryDivision + " had the " + queryCallsign + " callsign."
    return ContentService.createTextOutput(err).setMimeType(ContentService.MimeType.TEXT);
  }
  break

 

  default: 
   var error = "**__Error:__** HTTP request command option was not recognized. Check syntax."
   return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT)
  break
   
 }
}

function doPost(e) {
  // Handle POST request
  var log = "Processed at: " + date + ".";
  Logger.log(log)
  var command = e.parameter.command // Get what command was ran
  
 switch(command){
  
  case "addUser":
  var division = e.parameter.division
  var rank = e.parameter.rank
  var discord = e.parameter.discord 
  var roblox = e.parameter.roblox
  var callsign = e.parameter.callsign

   if( addUser(rank,division,discord,roblox,callsign) != error404){
    Logger.log("Sucessfully added user to the roster.")
    var output = "\n\nSucessfully added user to the roster."
    return ContentService.createTextOutput(log + output ).setMimeType(ContentService.MimeType.TEXT);
   }else{
      var error = "**Error 404:** No rank named like this was found."
      return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT);
   }
  break
  }
}

function addUser(rank,division,discord,roblox, callsign){

  var divisionSheet = ss.getSheetByName(division)
  var rankRow = searchRank(rank,division)
  var maxcolumns = divisionSheet.getMaxColumns()
  if(rankRow == error404){
    Logger.log("Error 404: No rank named like this exist.")
    return error404
  }else{
    divisionSheet.appendRow(["",callsign,rank,roblox,discord])
    var maxRows = divisionSheet.getMaxRows()
    divisionSheet.moveRows(divisionSheet.getRange(maxRows,maxcolumns), rankRow)
    divisionSheet.getRange("A15:" + divisionSheet.getRange(10,maxcolumns).getA1Notation()).copyFormatToRange(divisionSheet.getSheetId(),1,maxcolumns,rankRow,rankRow + 1)
  }

}

function searchRank(rank,division){
  var divisionSheet = ss.getSheetByName(division)
  var  column = divisionSheet.getRange("C:C")
  var textFinder = column.createTextFinder(rank)
  var rankCell = textFinder.findNext()
  if(rankCell == null){
    userCell = divisionSheet.getRange(5,5)
    return error404
  }else{
    return rankRow = rankCell.getRow()
  }
  
}


function searchUser(query,division) {
  
  var divisionSheet = ss.getSheetByName(division)
  var column = divisionSheet.getRange("B:B")
  var textFinder = column.createTextFinder(query)
  var userCell = textFinder.findNext()
  if(userCell == null){
    userCell = divisionSheet.getRange(5,5)
   return error404
  }else{
    return userRow = userCell.getRow()
  }
 
}
function getDiscord(callsign,division) {
  var userRow = searchUser(callsign,division)
  var divisionSheet = ss.getSheetByName(division)
 if(userRow == error404){
  return error404
 }else{
  var discord = divisionSheet.getRange(userRow,4).getValue()
  return discord
 }
 }

function getRoblox(callsign,division){
  var userRow = searchUser(callsign,division)
  var divisionSheet = ss.getSheetByName(division)
 if(userRow != error404){
  var roblox = divisionSheet.getRange(userRow,5).getValue()
  return roblox
 }else{
  return error404
 }
}
function getRank(callsign,division){
  var userRow = searchUser(callsign,division)
  var divisionSheet = ss.getSheetByName(division)
 if(userRow != error404){
  var rank = divisionSheet.getRange(userRow,3).getValue()
  return rank;
  }else{
  return error404
  }
}
function getDivisions(callsign,division) {
  var userRow = searchUser(callsign,division)
  var divisionSheet = ss.getSheetByName(division)
 if(userRow != error404){
  var divisions = divisionSheet.getRange(userRow,15).getValue()
  return divisions
 }else{
  return error404
 }
}
function test_() {
  var maxcolumns = emssheet.getMaxColumns()
  Logger.log(emssheet.getRange("A10:" + emssheet.getRange(10,maxcolumns).getA1Notation()).setBackground("blue"))
}

function hehe_(){
  addUser("EMS Lieutenant","","THisDiscord","thisroblox","1000")
}
