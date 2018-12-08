// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";

// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const { dialogflow, Suggestions } = require("actions-on-google");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

const meeting_rooms = ["Jogi", "Kafi", "Basant", "Asavari"];

function searchMeetingRoom(person_count, date, duration, time) {
  return meeting_rooms;
}
app.intent(
  "search meeting room",
  (conv, { person_count, date, duration, time }) => {
    // Present user with the corresponding basic card and end the conversation.
    const rooms = searchMeetingRoom(person_count, date, duration, time);
    conv.user.storage = {
      pc: person_count,
      date: date,
      duration: duration,
      time: time
    };
    conv.add("Please select your meeting room ");
    conv.ask(new Suggestions(["Jogi", "Kafi", "Basant", "Asavari"]));
  }
);

app.intent("search meeting room - book", (conv, { meeting_room }) => {
  conv.close(
    "You selected " + meeting_room + " for " + conv.user.storage.pc + " people"
  );
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
