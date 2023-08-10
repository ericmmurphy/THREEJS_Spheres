export interface callbackObject {
  callbackName: string;
  callback: Function;
}

type eventRecord = Record<string, callbackObject[]>;

export default class EventEmitter {
  eventRecord: eventRecord;

  constructor() {
    this.eventRecord = {};
  }

  // adds callbackObject to an array of callbackObjects
  on(eventName: string, callback: callbackObject) {
    if (!(eventName in this.eventRecord)) {
      this.eventRecord[eventName] = [callback];
      return;
    }

    this.eventRecord[eventName].push(callback);
  }

  // removes callbackObject from an array of callbackObjects
  off(eventName: string, callback: callbackObject) {
    // Record for eventName does not exist
    if (!(eventName in this.eventRecord)) return;

    // Record for eventName has length of 1 and callbackName matches
    if (
      this.eventRecord[eventName].length === 1 &&
      this.eventRecord[eventName][0].callbackName === callback.callbackName
    ) {
      delete this.eventRecord[eventName];
      return;
    }

    // Removing callback object from record's callback array
    const newCallbackObjArray = this.eventRecord[eventName].filter((el) => {
      if (el.callbackName !== callback.callbackName) return el;
    });
    this.eventRecord[eventName] = newCallbackObjArray;
  }

  // calls each callback in an array of callbackObjects
  trigger(eventName: string) {
    if (!(eventName in this.eventRecord)) return;

    // Looping through record's callback array and calling each callback
    this.eventRecord[eventName].forEach((el) => {
      el.callback();
    });
  }
}
