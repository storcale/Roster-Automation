
   /**
   * Add a new employee to the roster. Returns true if sucess, false if error/not found.
   * 
   * @param {number} callsign - Argument Callsign : The callsign of the employee
   * @param {string} division - Argument Division : The division sheet where to add the employee
   * @param {string} rank - Argument Rank : The rank of the new employee
   * @param {string} discord - Argument Discord : The discord username of the employee
   * @param {string} roblox - Argument Roblox :  The roblox username of the employee
   * @return {boolean} 
   * @function
   * @public
   */
function addEmployee(callsign,division,rank,discord,roblox) {
  var user = new Employee(callsign,division,rank)
   if( user.rank != error404){
    user.push(callsign,rank,discord,roblox,division)
    return true
   }else{
      var error = "rosterAPI.addEmployee: Error 8404: No rank named like this was found."
      Logger.log(error)
      return false
   }
}

   /**
   * Remove an employee from the roster.Returns true if sucess, false if error/not found
   * 
   * @param {number} callsign - Argument Callsign : The callsign of the employee
   * @param {string} division - Argument Division : The division sheet where is the employee
   * @return {boolean} 
   * @function
   * @public
   */
function removeEmployee(callsign,division){
  var user = new Employee(callsign,division)
  if( searchRank(user.Rank,division) != error404){
   user.remove(callsign,division)
   return true
  }else{
    Logger.log("rosterAPI.removeEmployee: Error 404: No user with this callsign was found")
    return false
  }
}

 /**
   * Edit an employee's informations.Returns true if sucess, false if error/not found
   * 
   * @param {number} callsign - Argument Callsign : The callsign of the employee to edit
   * @param {string} division - Argument Division : The division sheet where is the employee
   * @param {string} roblox - Argument Roblox : The roblox username to put instead of the old one. Put the old value to not edit.
   * @param {string} discord - Argument Discord : The discord username to put instead of the old one. Put the old value to not edit.
   * @param {number} newCallsign - Argument NewCallsign : The callsign to put instead of the old one. Put the old value to not edit.
   * @return {boolean} 
   * 
   * @function
   * @public
   */
function editEmployee(callsign,division,roblox,discord,newCallsign){
  var user = new Employee(callsign,division)
   if(user.Rank != error404){
    user.edit(callsign,division,roblox,discord,newCallsign)
    return true
   }else{
     Logger.log("rosterAPI.editEmployee: Error 404: No user with this callsign was found")
     return false
   }
}

 /**
   * Remove an employee from the roster. Returns the information trough information.discord,roblox,rank,divisions and callsign of the user. Returns false if did not find user
   * 
   * @param {number} callsign - Argument Callsign : The callsign of the employee
   * @param {string} division - Argument Division : The division sheet where is the employee
   * @return {object} 
   * @function
   * @public
   */
function searchEmployee(callsign, division){
  if(searchUser(queryCallsign,queryDivision) != error404){
   var user = new Employee(callsign,division)
   var output = "\n" + "\nDiscord username: " + user.discord + "\nRoblox username: " + user.roblox + "\nRank: " + user.Rank + "\nDivisions: " + user.divisions + "\nCallsign: " + user.callsign + "\n"
   var information = {
     discord: user.discord,
     roblox: user.roblox,
     rank: user.Rank,
     divisions: user.divisions,
     callsign: user.callsign
   }
   return information
  }else{
    Logger("RosterApi.SearchEmployee: Error 404: __ Not found__: No user in " + queryDivision + " had the " + queryCallsign + " callsign.")
    return false
  }
}



