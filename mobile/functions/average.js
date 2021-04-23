

function avgHR (sesh) 
{
  var totHR=0
  var counter=0
sesh.heartrate.forEach(ele =>{
totHR+=ele.value
counter+=1

})
return( Math.round(totHR/counter))
    }
module.exports=avgHR