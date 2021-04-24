function getAge(birthdate)
  {
    var today = new Date();
    var cDay = today.getDate();
    var cMonth = today.getMonth();
    var cYear = today.getFullYear();
    var todayDate = new Date(cYear, cMonth, cDay);

    var birth = new Date(birthdate);
    var diff = Math.abs(todayDate - birth);
    const age = Math.floor(diff / 31536000000);
    return age
  }
module.exports=getAge