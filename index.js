/* eslint-disable  func-names */
/* eslint-disable  no-console */

'use strict';

const Alexa = require('alexa-sdk');
const dataSet = require('./dataSet.js');

//const APP_ID = amzn1.ask.skill.03249535-d143-4bc7-8e21-e03627893312;

const languageStrings = {
  PARKING: dataSet.PARKING_STRUCTURES,
  DINING: dataSet.DINING_OPEN_TIMES,
  DATES: dataSet.DATES,
  SKILL_NAME:"Comet Helper",
  WELCOME_MESSAGE: "Hi, I'm %s. You can ask me if there are rooms available, or what time dining hall west is open, and other things... How can I help?",
  WELCOME_REPROMPT: 'For instructions on what to say, please say help me.',
  HELP_MESSAGE:"You can ask me about room availablity, until when places are open, how much parking is available, or you can say exit... Now, what can I help you with?",
  HELP_REPROMPT:"You can ask me about room availablity, until when places are open, how much parking is available, or you can say exit... Now, what can I help you with?",
  STOP_MESSAGE:'WHOOSH!',
  PARKING_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know.",
  DINING_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know.",
  DATES_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know.",
  NOT_FOUND_REPROMT:"What else can I help with?"
}


const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t(languageStrings.WELCOME_MESSAGE, this.t(languageStrings.SKILL_NAME));
        // If the user either does not reply to the welcome message or says 'something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'calendarIntent':function(){
      const dateSlot=this.event.request.intent.slots.date;
      let dateName;

      if(dateSlot && dateSlot.value){
        dateName=dateSlot.value.toLowerCase();
      }

      const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t(languageStrings.SKILL_NAME), dateName);
      const myDate=this.t(languageStrings.DATES);
      const date=myDate[dateName];

      if(date){
        this.attributes.speechOutput = date;
        this.attributes.repromptSpeech=this.t(languageStrings.RECIPE_REPEAT_MESSAGE);

        this.response.speak(date).listen(this.attributes.repromptSpeech);
        this.response.cardRenderer(cardTitle, date);
        this.emit(':responseReady');
      }

      else {
        let speechOutput=this.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
        const repromptSpeech=this.t(languageStrings.NOT_FOUND_REPROMT);
        speechOutput +=" " + repromptSpeech;

        this.attributes.speechOutput = speechOutput;
        this.attributes.repromptSpeech = repromptSpeech;

        this.response.speak(speechOutput).listen(repromptSpeech);
        this.emit(':responseReady');
      }
    }

}


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

/*const timeData = [
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
*/
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
//    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
