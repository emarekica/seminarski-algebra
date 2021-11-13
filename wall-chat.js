"use strict";

// const CHANNEL_ID: "M4trM8H1WVeEhszi";

// Connecting to a created Scaledrone channel
const drone = new ScaleDrone("M4trM8H1WVeEhszi", {
  // Properties sent out as clientData via events
  data: {
    name: randomName(),
    color: randomColor(),
  },
});

// members array that stores users connecting to a room
let members = [];

// connecting to OBSERVABLE-ROOM
// provide additional functionality for keeping track of connected users and linking messages to users
// way to attach data to a Socket connection (name, id)


// opening connection, adding event listener
drone.on("open", (error) => {
  // error with connection
  if (error) {
    return console.error(error);
  }
  console.log(
    "You are successfully connected! Welcome to the wall of writings!"
  );

  // event listener for messages
  const room = drone.subscribe("observable-room");

  // event listener - array of members that joined the room
  room.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully joined room");
  });

  // list of currently online members
  room.on("members", (m) => {
    members = m;
    // updateMembersDOM(); uncomment later
  });

  // event listener for users joining the room
  room.on("member_join", (member) => {
    members.push(member);
    // updateMembersDOM(); uncomment later
  });

  // event listener for members leaving the room
  room.on("member_leave", ({ id }) => {
    const index = members.findIndex((member) => member.id === id);
    members.splice(index, 1);
    // updateMembersDOM(); uncomment later
  });

  // Event listener for messages sent by user
  room.on('data', (text, member) => {
  if (member) {
    // addMessageToListDOM(text, member); uncomment later
  } else {
    // Message is from server
  }
  });
});


// RANDOMIZERS

// Function to get random name (15)
function randomName() {
  const adjectives = [
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
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}


// Function to get random color 
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}



///////////////////////////////////////////////////////

const DOM = {
  members: document.querySelector(".members"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".message-form__input"),
  form: document.querySelector(".message-form"),
};

// Creating message element
function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement("div");
  el.appendChild(document.createTextNode(name));
  el.className = "member";
  el.style.color = color;

  return el;
}

function updateMembersDOM() {
  DOM.members.innerHTML = '';
  members.forEach(member => {
    DOM.members.appendChild(createMemberElement(member))
  });
}