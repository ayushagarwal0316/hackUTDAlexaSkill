// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const dataSet = require('./dataSet');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');


const languageStrings = {
  PARKING: dataSet.PARKING_STRUCTURES,
  DINING: dataSet.DINING_OPEN_TIMES,
  DATES: dataSet.DATES,
  ROOMS: dataSet.BUILDINGS,
  SKILL_NAME:"Comet Helper",
  WELCOME_MESSAGE: "Hi, I'm %s. You can ask me if there are rooms available, or what time dining hall west is open, and other things... How can I help?",
  WELCOME_REPROMPT: 'For instructions on what to say, please say help me.',
  HELP_MESSAGE:"You can ask me about room availablity, until when places are open, how much parking is available, or you can say exit... Now, what can I help you with?",
  HELP_REPROMPT:"You can ask me about room availablity, until when places are open, how much parking is available, or you can say exit... Now, what can I help you with?",
  STOP_MESSAGE:'WHOOSH!',
  REPEAT_MESSAGE:"Try saying repeat.",
  PARKING_NOT_FOUND_MESSAGE: "I'm sorry, I currently do not know.",
  DINING_NOT_FOUND_MESSAGE: "I'm sorry, I currently do not know.",
  DATES_NOT_FOUND_MESSAGE: "I'm sorry, I currently do not know.",
  REPROMPT_MESSAGE:"What else can I help with?"
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const parking = requestAttributes.t(Object.keys(dataSet.PARKING_STRUCTURES));
    const dining = requestAttributes.t(Object.keys(dataSet.DINING_OPEN_TIMES));
    const dates = requestAttributes.t(Object.keys(dataSet.DATES));
    const rooms = requestAttributes.t(Object.keys(dataSet.BUILDINGS));

    const speakOutput = requestAttributes.t('WELCOME_MESSAGE', requestAttributes.t('SKILL_NAME'), dates);
    const repromptOutput = requestAttributes.t('WELCOME_REPROMPT');

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const calendarIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'calendarIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const roomSlot=handlerInput.requestEnvelope.request.intent.slots.dates;
        let dateName;
        if(dateSlot&&dateSlot.value){
            dateName=dateSlot.value.toLowerCase();
        }

        const myDate=requestAttributes.t(languageStrings.DATES);
        const date=myDate[dateName];
        let speakOutput="";

        if(date){
            sessionAttributes.speakOutput=date;
            handlerInput.attributesManager.sessionAttributes(sessionAttributes);

            return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput) // .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
        else{
            speakOutput=requestAttributes.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
            const repromptSpeech=requestAttributes.t(languageStrings.NOT_FOUND_REPROMPT);
            speakOutput+=" "+repromptSpeech;

        sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
        sessionAttributes.repromptSpeech = repromptSpeech;

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(sessionAttributes.speakOutput)
            .reprompt(sessionAttributes.repromptSpeech)
            .getResponse();
        }
    }
};

const buildingIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'roomIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const buildingSlot=handlerInput.requestEnvelope.request.intent.slots.building;
        let buildingName;
        if(dateSlot&&dateSlot.value){
            dateName=dateSlot.value.toLowerCase();
        }

        const myBuilding=requestAttributes.t(languageStrings.ROOMS);
        const building=myBuilding[buidlingName];
        let speakOutput="";

        if(building){
            sessionAttributes.speakOutput=building;
            handlerInput.attributesManager.sessionAttributes(sessionAttributes);

            return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput) // .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
        else{
          speakOutput=requestAttributes.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
          const repromptSpeech=requestAttributes.t(languageStrings.REPROMPT_MESSAGE);
          speakOutput+=" "+repromptSpeech;

          sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
          sessionAttributes.repromptSpeech = repromptSpeech;

          handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

          return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput)
              .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
    }
};

const officeHoursIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'officeHoursIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const officeSlot=handlerInput.requestEnvelope.request.intent.slots.office;
        let officeName;
        if(officeSlot&&officeSlot.value){
            officeName=officeSlot.value.toLowerCase();
        }

        const myOffice=requestAttributes.t(languageStrings.DINING);
        const office=myOffice[officeName];
        let speakOutput="";

        if(office){
            sessionAttributes.speakOutput=office;
            handlerInput.attributesManager.sessionAttributes(sessionAttributes);

            return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput) // .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
        else{
          speakOutput=requestAttributes.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
          const repromptSpeech=requestAttributes.t(languageStrings.REPROMPT_MESSAGE);
          speakOutput+=" "+repromptSpeech;

          sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
          sessionAttributes.repromptSpeech = repromptSpeech;

          handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

          return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput)
              .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
    }
};

const parkingIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'parkingIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const parkingSlot=handlerInput.requestEnvelope.request.intent.slots.parkingStructure;
        let parkingName;
        if(parkingSlot&&parkingSlot.value){
            parkingName=parkingSlot.value.toLowerCase();
        }

        const myParking=requestAttributes.t(languageStrings.PARKING);
        const parking=myParking[parkingName];
        let speakOutput="";

        if(parking){
            sessionAttributes.speakOutput=parking;
            handlerInput.attributesManager.sessionAttributes(sessionAttributes);

            return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput) // .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
        else{
          speakOutput=requestAttributes.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
          const repromptSpeech=requestAttributes.t(languageStrings.REPROMPT_MESSAGE);
          speakOutput+=" "+repromptSpeech;

          sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
          sessionAttributes.repromptSpeech = repromptSpeech;

          handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

          return handlerInput.responseBuilder
              .speak(sessionAttributes.speakOutput)
              .reprompt(sessionAttributes.repromptSpeech)
              .getResponse();
        }
    }
};


const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t(getRandomItem(Object.keys(recipes.RECIPE_EN_US)));

    sessionAttributes.speakOutput = requestAttributes.t('HELP_MESSAGE', item);
    sessionAttributes.repromptSpeech = requestAttributes.t('HELP_REPROMPT', item);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('STOP_MESSAGE', requestAttributes.t('SKILL_NAME'));

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
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
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  },
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        calendarIntentHandler,
        buildingIntentHandler,
        officeHoursIntentHandler,
        parkingIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
// make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();
