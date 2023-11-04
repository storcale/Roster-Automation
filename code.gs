
// Read README.MD before going trough the code.
// Version v3.1 , deployement version: 3.0

var ss = SpreadsheetApp.getActiveSpreadsheet()
var emssheet = ss.getSheetByName("EMS")

var error404 = "Error 404: Not found"
var date = new Date



class Employee {
  /**
   * Create a new employee instance
   * 
   * @param {number} callsign - OPTIONAL:The callsign of the employee
   * @param {string} division - MANDATORY: The division sheet of the employee
   * @param {string} rank - OPT: The rank of the employee
   * @param {number} row - MAND: The row of the employee
   * 
   */
  constructor(callsign,division,rank,row){
    this.row = row
    this.rank = rank
    this.division = division 
    this.callsign = callsign
  }
  
  get discord() {
    if(this.row != null){
    return ss.getSheetByName(this.division).getRange(this.row,5).getValue()
    }else if(this.callsign != null){
      var row = searchUser(this.callsign,this.division)
      if(row == error404){
        Logger.log("Error 404: No user with this callsign was found")
        return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,5).getValue()
      }
    }else if(this.rank != null){
      var row = searchRank(this.rank,this.division)
      if(row == error404){
       Logger.log("Error 404: No user with this rank was found")
       return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,5).getValue()
    }
    }else{
      throw SyntaxError("Please specify at least one information; Row,callsign or rank.")
    }
  }
  get roblox() {
   if(this.row != null){
      return ss.getSheetByName(this.division).getRange(this.row,4).getValue()
    }else if(this.callsign != null){
      var row = searchUser(this.callsign,this.division)
      if(row == error404){
        Logger.log("Error 404: No user with this callsign was found")
        return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,4).getValue()
      }
    }else if(this.rank != null){
      var row = searchRank(this.rank,this.division)
      if(row == error404){
       Logger.log("Error 404: No user with this rank was found")
       return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,5).getValue()
      }
    } else {
      throw SyntaxError("Please specify at least one information; Row, callsign or rank.")
    }
  }
  get Rank() {
   if(this.row != null){
     return ss.getSheetByName(this.division).getRange(this.row,3).getValue()
    }else if(this.callsign != null){
      var row = searchUser(this.callsign,this.division)
      if(row == error404){
        Logger.log("Error 404: No user with this callsign was found")
        return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,3).getValue()
      }
    }else if(this.rank != null){
      return this.rank
    }else{
      throw SyntaxError("Error 404: Please specify at least one information: row,callsign or rank")
    }
  }
  
  get Callsign() {
   if(this.row != null){
    return ss.getSheetByName(this.division).getRange(this.row,2).getValue()
   }else if(this.rank != null){
     var row = searchRank(this.callsign,this.division)
     if(row == error404){
      Logger.log("Error 404: No user with this rank was found")
      return error404
     }else{
      return ss.getSheetByName(this.division).getRange(row,2).getValue()
     }
   }else if(this.callsign != null){
    return this.callsign
   }else{
    throw SyntaxError("Error 404; Please specify at least one information: row, callsign or rank")
   }
  }
  get divisions(){
   if(this.row != null){
    return ss.getSheetByName(this.division).getRange(this.row,15).getValue()
   }else if(this.callsign != null){
    var row = searchUser(this.callsign,this.division)
    if(row == error404){
     Logger.log("Error 404: No user with this callsign was found")
     return error404
    }else{
      return ss.getSheetByName(this.division).getRange(row,15).getValue()
    }
   }else if(this.rank != null){
    var row = searchRank(this.rank,this.division)
    if(row == error404){
      Logger.log("Error 404: No user with this rank was found")
      return error404
    }else{
      return ss.getSheetByName(this.division).getRange(row,15).getValue()
    }
   }else{
    throw SyntaxError("Error 404: Please specify at least one information: row, callsign or rank")
   }
  }
  push(callsign,rank,discord,roblox,division){
   
    var sheet = ss.getSheetByName(division)
    var row = searchRank(rank,division)
    var maxcolumns = sheet.getMaxColumns()
    var abreviation = sheet.getRange(row,1).getValue()
    if(rankRow == error404){
      Logger.log("Error 404: No rank named like this exist")
      return error404
    }else{
      sheet.appendRow([abreviation,callsign,rank,roblox,discord
      ])
    //   sheet.getRange("J"+ row +":L"+row).insertCheckboxes()
      //sheet.getRange(row,7).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(["Active","Semi-Active","Inactive","LOA","Suspended","Reserve","N/A"]).build())
     // sheet.getRange(row,8).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(["Promotable","Pending","Suspended","Reserve","N/A"]).build())
     var log = sheet.getRange(15,16).getFormula()
     var hr = sheet.getRange(15,17).getValue()
     sheet.getRange(row,16).setValue(log)
     sheet.getRange(row,17).setValue(hr)
      var maxRows = sheet.getMaxRows()
      sheet.moveRows(sheet.getRange(maxRows,maxcolumns),row)
      sheet.getRange("A15:" + sheet.getRange(15,maxcolumns).getA1Notation()).copyFormatToRange(sheet.getSheetId(),1,maxcolumns,row,row + 1)
      Logger.log("Sucessfully added " + discord + " to the roster in row " + row)
    }
  }
}

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
   var user = new Employee(queryCallsign,queryDivision)
   var output = "\n" + "\n**Discord username:** " + user.discord + "\n**Roblox username**: " + user.roblox + "\n**Rank:** " + user.Rank + "\n**Divisions:** " + user.divisions + "\nCallsign: " + user.callsign + "\n"
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
  var user = new Employee(callsign,division,rank)
   if( user.rank != error404){
    user.push(callsign,rank,discord,roblox,division)
    Logger.log("Sucessfully added user to the roster.")
    var output = "\n\nSucessfully added " + user.discord +"to the roster."
    return ContentService.createTextOutput(log + output ).setMimeType(ContentService.MimeType.TEXT);
   }else{
      var error = "**Error 404:** No rank named like this was found."
      return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT);
   }
  break
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
