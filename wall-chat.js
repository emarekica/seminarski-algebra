// "use strict";

<<<<<<< HEAD
// Connecting to Scaledrone channel ID
const CLIENT_ID = "M4trM8H1WVeEhszi";

// creating instance for a single connection
const drone = new ScaleDrone(CLIENT_ID, {
  // adding custom data to members (set as JS object)
  // properties sent out as clientData via events/passed to each user
=======
const CLIENT_ID = 'M4trM8H1WVeEhszi';

const drone = new ScaleDrone(CLIENT_ID, {
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

// Stores members
let members = [];

<<<<<<< HEAD
//// ----------------------------- OPENING CONNECTION
// events: open, error
// a connection has been opened, if no errors
drone.on("open", (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Successfully connected to Scaledrone");

  // Subscribe to messages
  // wait until it is successful and then execute the first passed callback function - updateMembersDOM()
  const room = drone.subscribe("observable-room");

  room.on("open", (error) => {
=======

// connecting to and joining the room
drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  // Subscribe to messages
  // wait until it is successful and then execute the first passed callback function - updateMembersDOM()
  const room = drone.subscribe('observable-room');

  room.on('open', error => {
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  // Gives array of members that joined the room
<<<<<<< HEAD
  room.on("members", (m) => {
=======
  room.on('members', m => {
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    members = m;
    updateMembersDOM();
  });

  // New member joins the room
<<<<<<< HEAD
  room.on("member_join", (member) => {
=======
  room.on('member_join', member => {
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    members.push(member);
    updateMembersDOM();
  });

  // Member leaves the room
<<<<<<< HEAD
  room.on("member_leave", ({ id }) => {
    // wtf on
    const index = members.findIndex((member) => member.id === id);
=======
  room.on('member_leave', ({id}) => {                              // wtf on
    const index = members.findIndex(member => member.id === id);   
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    members.splice(index, 1);
    updateMembersDOM();
  });

  // Listen to messages sent by users & add them to messages <div>
<<<<<<< HEAD
  room.on("data", (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    }
=======
  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } 
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
  });
});

// Closing connection to Scaledrone
<<<<<<< HEAD
drone.on("close", (event) => {
  console.log("Connection was closed", event);
});

// Problems with the connection
drone.on("error", (error) => {
  console.error(error);
});

=======
drone.on('close', event => {
  console.log('Connection was closed', event);
});

// Problems with the connection
drone.on('error', error => {
  console.error(error);
});


>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
///////////////////////////////////////////////////////////////////////////

// RANDOMIZERS

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
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

<<<<<<< HEAD
// Function to get random color
=======

// Function to get random color 
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

<<<<<<< HEAD
=======

>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
///////////////////////////////////////////////////////

// DOM related

const DOM = {
<<<<<<< HEAD
  membersCount: document.querySelector(".members-count"),
  membersList: document.querySelector(".members-list"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".message-form__input"),
  form: document.querySelector(".message-form"),
};

// Event listener for sending messages
DOM.form.addEventListener("submit", sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === "") {
    return;
  }
  DOM.input.value = ""; // how to write differently, publish() is deprecated
  drone.publish({
    room: "observable-room",
=======
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

// Event listener for sending messages
DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';                 // how to write differently, publish() is deprecated
  drone.publish({                       
    room: 'observable-room',
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    message: value,
  });
}

<<<<<<< HEAD
// creating and adding MEMBERS
function createMemberElement(member) {
  const { name, color } = member.clientData;

  const el = document.createElement("div");
=======

// creating and adding MEMBERS
function createMemberElement(member) {
  const { name, color } = member.clientData;          

  const el = document.createElement('div');
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;

  return el;
}

// Who's online
function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} artists near the wall:`;
<<<<<<< HEAD
  DOM.membersList.innerHTML = "";

  members.forEach((member) =>
=======
  DOM.membersList.innerHTML = '';

  members.forEach(member =>
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

// creating and adding MESSAGES
function createMessageElement(text, member) {
<<<<<<< HEAD
  const el = document.createElement("div");
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = "message";
=======
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4

  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;

  // auto-scroll to the bottom of the chat
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));

  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 7e1ebee2ae3d432313a89947c62f2e81fefb98a4
