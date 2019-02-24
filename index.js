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
  REPROMT_MESSAGE:"What else can I help with?"
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = languageStrings.WELCOME_MESSAGE;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const calendarIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'calendarIntent';
    },
    handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const dateSlot=handlerInput.requestEnvelope.request.intent.slots.dates;
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
            const repromptSpeech=requestAttributes.t(languageStrings.NOT_FOUND_REPROMT);
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

const officeTimeIntentHandler={
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

        if(office){
            let speechOutput=office;
            this.attributes.repromptSpeech=this.t(languageStrings.REPEAT_MESSAGE);

            const speechText=speechOutput;
            this.emit(':resposneReady');
        }
        else{
            let speechOutput=this.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
            const repromptSpeech=this.t(languageStrings.NOT_FOUND_REPROMT);
            speechOutput+=" "+repromptSpeech;

            this.attributes.speechOutput=speechOutput;
            this.attributes.repromptSpeech=repromptSpeech;
            const speechText=speechOutput;

            this.resonse.speach(speechOutput).listen(repromptSpeech);
            this.emit(':responseReady');
        }
        return handlerInput.responseBuilder
//        .speak(speechText)
        .reprompt(languageStrings.REPROMPT_MESSAGE)
        .getResponse();
    }
}
const roomFinderIntentHandler={
        canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'roomIntent';
    },
    handle(handlerInput) {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const buildingSlot=handlerInput.requestEnvelope.request.intent.slots.building;
        let buildingName;

        if(buildingSlot&&buildingSlot.value){
            buildingName=buildingSlot.value.toLowerCase();
        }

        const myBuilding=requestAttributes.t(languageStrings.DINING);
        const building=myBuilding[buildingName];

        if(building){
            let speechOutput=building;
            this.attributes.repromptSpeech=this.t(languageStrings.REPEAT_MESSAGE);

            const speechText=speechOutput;
            this.emit(':resposneReady');
        }
        else{
            let speechOutput=this.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
            const repromptSpeech=this.t(languageStrings.NOT_FOUND_REPROMT);
            speechOutput+=" "+repromptSpeech;

            this.attributes.speechOutput=speechOutput;
            this.attributes.repromptSpeech=repromptSpeech;
            const speechText=speechOutput;

            this.resonse.speach(speechOutput).listen(repromptSpeech);
            this.emit(':responseReady');
        }
        return handlerInput.responseBuilder
//        .speak(speechText)
        .reprompt(languageStrings.REPROMPT_MESSAGE)
        .getResponse();
    }
}
const parkingSpaceIntentHandler={
        canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'parkingIntent';
    },
    handle(handlerInput) {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const structureSlot=handlerInput.requestEnvelope.request.intent.slots.parkingSturcture;
        let structureName;

        if(structureSlot&&structureSlot.value){
            structureName=structureSlot.value.toLowerCase();
        }

        const myParkingStructure=requestAttributes.t(languageStrings.PARKING);
        const parkingStructure=myParkingStructure[structureName];

        if(parkingStructure){
            let speechOutput=parkingStructure;
            this.attributes.repromptSpeech=this.t(languageStrings.REPEAT_MESSAGE);

            const speechText=speechOutput;
            this.emit(':resposneReady');
        }
        else{
            let speechOutput=this.t(languageStrings.DATES_NOT_FOUND_MESSAGE);
            const repromptSpeech=this.t(languageStrings.NOT_FOUND_REPROMT);
            speechOutput+=" "+repromptSpeech;

            this.attributes.speechOutput=speechOutput;
            this.attributes.repromptSpeech=repromptSpeech;
            const speechText=speechOutput;

            this.resonse.speach(speechOutput).listen(repromptSpeech);
            this.emit(':responseReady');
        }
        return handlerInput.responseBuilder
//        .speak(speechText)
        .reprompt(languageStrings.REPROMPT_MESSAGE)
        .getResponse();
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        roomFinderIntentHandler,
        officeTimeIntentHandler,
        parkingSpaceIntentHandler,
        officeTimeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
