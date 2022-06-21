const { welcome, goodbye, tell } = require("../utils/fortune-teller");

function ask(question) {
  return tell(question).then((response) => [
    `Your question was: ${question}`,
    `Your fortune is: ${response}`,
  ]);
}


function getFortune(question) {
  if(!question){
    return Promise.resolve("There was an error: A question is required...");
  }
  return ask(question);
}




function fullSession(question) {
  let result = [];
  return welcome()
  .then((welcomeMessage) => result.push(welcomeMessage))
  .then(() => getFortune(question))
  .then((fortuneMessage) => {
    if(Array.isArray(fortuneMessage)){
      result = result.concat(fortuneMessage);
    }else {
      result.push(fortuneMessage)
    }
    return result;
  })
  .then(() => goodbye())
  .then((goodbyeMessage) => result.push(goodbyeMessage))
  .then(() => result);
    
}

module.exports = { getFortune, fullSession };
