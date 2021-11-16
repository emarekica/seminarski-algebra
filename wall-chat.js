// "use strict";

const CLIENT_ID = 'M4trM8H1WVeEhszi';

const drone = new ScaleDrone(CLIENT_ID, {
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

// Stores members
let members = [];


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
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  // Gives array of members that joined the room
  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  // New member joins the room
  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  // Member leaves the room
  room.on('member_leave', ({id}) => {                              // wtf on
    const index = members.findIndex(member => member.id === id);   
    members.splice(index, 1);
    updateMembersDOM();
  });

  // Listen to messages sent by users & add them to messages <div>
  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } 
  });
});

// Closing connection to Scaledrone
drone.on('close', event => {
  console.log('Connection was closed', event);
});

// Problems with the connection
drone.on('error', error => {
  console.error(error);
});


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


// Function to get random color 
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}


///////////////////////////////////////////////////////

// DOM related

const DOM = {
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
    message: value,
  });
}


// creating and adding MEMBERS
function createMemberElement(member) {
  const { name, color } = member.clientData;          

  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;

  return el;
}

// Who's online
function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';

  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

// creating and adding MESSAGES
function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';

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
}