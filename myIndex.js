/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const dataSet = require('./dataSet.js');
const launchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'; // || (request.type === 'IntentRequest' && request.intent.name === 'launchIntent');
  },
  handle(handlerInput) {
    const speechOutput = "Hi, you can ask me if there are rooms available, or what time dining hall west is open, and other things. How can I help? ";
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  }
};

const SKILL_NAME = 'Comet Helper';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can ask me if there are rooms available, or what until when an office is open, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//const dataSet = (/dataSet.js)

//const timeData = dataSet.DINING_OPEN_TIMES;
//const parkingData = dataSet.PARKING_STRUCTURES;
//const dateData = dataSet.DATES;

const timeData = [
    {name:'lemma coffee roasters', content : 'lemma coffee roasters is open from seven-thirty a m to six p m'},
    {name:'the market at ecsw', content : 'the market at e c s west is open from eight a m to five p m'},
    {name: 'novel brew', content: 'novel brew is open from nine a m to four p m'},
    {name: 'food truck park', content: 'the food truck park is open from eleven a m to two p m'},
    {name: 'jason\'s deli', content: 'jason\'s deli is open from eleven a m to seven p m'},
    {name: 'the market at jsom', content: 'the market at j som is open from eight a m to nine p m'},
    {name: 'einstien bros bagels', content: 'einstien bros bagels is open from seven-thirty a m to four p m'},
    {name: 'ihop', content: 'i hop is open from eight a m to twelve a m'},
    {name: 'dining hall west', content: 'dining hall west is open from seven a m to nine a m'},
    {name: 'the market at rhw', content: 'the market at r h west is open from eleven a m to one a m'},
    {name: 'papa john\'s pizza', content: 'papa john\'s pizza is open from eleven a m to one a m'},
    {name: 'the market at ssa', content: 'the market at s s a is open from eight a m to five p m'},
    {name: 'ben and jerry\'s', content: 'ben and jerry\'s is open from eleven a m to eight p m'},
    {name: 'chic-fil-a', content: 'chic-fil-a is open from seven-thirty a m to eight p m'},
    {name: 'the market at su', content: 'the market at s u is open from nine a m to five p m'},
    {name: 'moes', content: 'moe\'s is open from eleven a m to eight p m'},
    {name: 'panda express', content: 'panda express is open from eleven a m to eight p m'},
    {name: 'the pub', content: 'the pub is open from eleven a m to ten p m'},
    {name: 'smash\'d', content: 'smash\'d is open from eleven a m to six p m'},
    {name: 'starbucks', content: 'starbucks is open from seven-thirty a m to ten p m'},
    {name: 'subway', content: 'subway is open from seven-thirty a m to eight p m'},
    {name: 'za\'tar', content: 'za\'tar is open from eleven a m to five p m'},
    {name: 'the market at vcb', content: 'the market at v c b is open from eight a m to three p m'}
];

const parkingData = [
    {name: 'ps4', content: 'REEEEEEEEEEEEEEEEEEE'},
    {name: 'ps1', content: 'real estate'},
    {name: 'ps3', content: 'save money, live better, walmart'}
];

const dateData = [
    {name: 'classes end', content: 'the last day of class is friday, may third'},
    {name: 'registraton open', content: 'class registration opens monday, october twenty second'},
    {name: 'second session', content: 'the second eight week session begins monday, march eleventh'},
    {name: 'first session', content: 'the first eight week session begins monday, january fourteenth'},
    {name: 'classes begin', content: 'the full term session begins monday, january fourteenth'},
    {name: 'final exams', content: 'final exams begin monday, may sixth and ends saturday, may eleventh'},
    {name: 'spring break', content: 'spring break begins monday, march eigth and ends sunday, march twenty fourth'}
];

const data = [
  'A year on Mercury is just 88 days long.',
  'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
  'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
  'On Mars, the Sun appears about half the size as it does on Earth.',
  'Earth is the only planet not named after a god.',
  'Jupiter has the shortest day of all the planets.',
  'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
  'The Sun contains 99.86% of the mass in the Solar System.',
  'The Sun is an almost perfect sphere.',
  'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
  'Saturn radiates two and a half times more energy into space than it receives from the sun.',
  'The temperature inside the Sun can reach 15 million degrees Celsius.'
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    launchHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
