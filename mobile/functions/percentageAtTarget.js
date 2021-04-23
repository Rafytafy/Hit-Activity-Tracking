function calculateSuccess  (maxHR,sesh) {

    var tarHR = Math.round(maxHR * (sesh.routine.targetHeartrate * 0.01));

    var secTot = 0;
    var secAbove = 0;
  
    const overUnder = ((tuple) => {
      if (tuple.value < tarHR) {
        secTot += 5;
      } else {
        secTot += 5;
        secAbove += 5;
      }
    });
  
    sesh.heartrate.forEach(element => {
      overUnder(element)
  });
  return Math.round((secAbove/secTot)*100)
  };
  

module.exports=calculateSuccess