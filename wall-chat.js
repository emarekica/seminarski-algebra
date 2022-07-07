"use strict";

// Connecting to Scaledrone channel ID
const CLIENT_ID = "M4trM8H1WVeEhszi";

// Creating instance for a single connection
const drone = new ScaleDrone(CLIENT_ID, {
  // adding custom data to members
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

// Stores members
let members = [];

//// ----------------------------- OPENING CONNECTION

//

const modalError = document.querySelector(".modal-error");

// A connection has been opened, if no errors
drone.on("open", (error) => {
  if (error) {
    modalError.classList.add("open");
    modalError.textContent =
      "An error has occured while connecting to the service. Please, try again.";

    return console.error(error);
  }
  console.log("Successfully connected to Scaledrone");

  // Listening for messages
  const room = drone.subscribe("observable-room");

  // Join room, connection has been opened
  room.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully joined room");
  });

  // Emits an array of members that have joined the room
  room.on("members", (m) => {
    members = m;
    updateMembersDOM();
  });

  // New member joins the room
  room.on("member_join", (member) => {
    members.push(member);
    updateMembersDOM();
  });

  // Member leaves the room
  room.on("member_leave", ({ id }) => {
    const index = members.findIndex((member) => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  // Listen to messages sent by users & add them to messages <div>
  room.on("data", (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    }
  });
});

//

// closing error message modal window
modalError.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-error")) {
    modalError.classList.remove("open");
  }
});

//

// Closing connection to Scaledrone
drone.on("close", (event) => {
  console.log("Connection was closed", event);
});

//

//// ----------------------------- RANDOMIZERS

// Function to get random name (15)
function getRandomName() {
  const adjs = [
    "arid",
    "acutum",
    "bellum",
    "cali",
    "cerule",
    "dulci",
    "gracili",
    "floresc",
    "gracili",
    "irise",
    "noct",
    "rubid",
    "solo",
    "viridis",
    "volumineux",
  ];
  const nouns = [
    "anemo",
    "anthemis",
    "astro",
    "blastus",
    "calia",
    "caulis",
    "cladus",
    "fluvia",
    "granum",
    "phytum",
    "pooecetes",
    "ramus",
    "sabell",
    "sentis",
    "sisymbrium",
  ];

  // Name randomizer
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

// Color randomizer
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

//// ----------------------------- DOM related

const DOM = {
  members: document.querySelector(".members"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".messageFormInput"),
  form: document.querySelector(".messageForm"),
};

// Event listener for sending messages
DOM.form.addEventListener("submit", sendMessage);

// Adding date & time to messages

// Sending message
function sendMessage() {
  const value = DOM.input.value;
  // console.log(value);

  if (value === "") {
    return;
  }

  DOM.input.value = "";
  drone.publish({
    room: "observable-room",
    message: value,
  });
}

// Updates who's online
function updateMembersDOM() {
  DOM.members.innerHTML = `${members.length} artists at the wall: ${members
    .map((value) => {
      return `<span style="color: ${value.clientData.color}">${value.clientData.name}</span>`;
    })
    .join(", ")}`;
}

// Creating and adding MESSAGES to the DOM
// Separate messages from other users and "me"

function createMessageElement(text, member) {
  // Define "me"
  const clientID = drone.clientId;
  const messageFromMe = member.id === clientID;

  // Check if the messages are from "me"
  const className = messageFromMe ? "message currentMember" : "message";
  const { name, color } = member.clientData;

  // Creating and adding MSG to DOM
  const msg = document.createElement("div");
  msg.className = "messageText";
  msg.appendChild(document.createTextNode(text));

  // Creating username profile with a name, color, and an icon
  const profile = document.createElement("div");
  profile.className = "profile";

  const character = document.createElement("div");
  character.appendChild(document.createTextNode(name));
  character.style.color = color;
  character.className = "name";

  profile.appendChild(character);

  // Add date & time to the msg
  // const msgElement = DOM.messages;

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`.padStart(2, "0");
  const date = new Intl.DateTimeFormat(navigator.language).format(now);

  // push date + time values to msg
  // 1. create a new element that will be above the message input value
  // 2. add content `${time}, ${date}`
  // 3. add class so you can style it
  // 4. append it to the DOM together with the MSG
  const msgDateTime = document.createElement("div");

  msgDateTime.textContent = `${date}, ${time}`;
  msgDateTime.classList.add("time-date");
  // console.log(msgDateTime.textContent);

  // msgElement.prepend(msgDateTime);

  //Combining user profile and message into one element based on whether the message is from you or other participants
  // addDateTime() here!!!

  const element = document.createElement("div");
  element.appendChild(profile);
  element.appendChild(msg);
  element.className = className; // check
  element.append(msgDateTime);

  return element;
}

// Add new messages to chat window
function addMessageToListDOM(text, member) {
  // auto-scroll to the bottom of the chat when the message is added
  const element = DOM.messages;
  const wasTop =
    element.scrollTop === element.scrollHeight - element.clientHeight;
  element.appendChild(createMessageElement(text, member));
  if (wasTop) {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
}

// Alert if message maxlength reached

const input = DOM.input;

input.addEventListener("keydown", function () {
  if (this.value.length >= 500) {
    // input.style.border = "solid";
    // input.style.borderColor = "#ba0000cc";
    // input.style.borderRadius = "5px";

    // modal with msg when character nuber exceeded
    modalError.classList.add("open");
    modalError.textContent = "You have exceeded the maximum message length.";
  }
});
