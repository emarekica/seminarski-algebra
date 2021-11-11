"use strict";

// const CHANNEL_ID: "M4trM8H1WVeEhszi";

// Connecting to a created Scaledrone channel
const drone = new ScaleDrone("M4trM8H1WVeEhszi", {
  // Properties sent out as clientData via events
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

// Function to get random color 
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}


// Function to get random name -- MAKE MINE
function getRandomName() {
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
    adjetives[Math.floor(Math.random() * adjectives.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}


