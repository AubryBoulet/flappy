const canvas = document.querySelector("#mainCanvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;

const gravity = 0.5;
let spacePressed = 0;
let gameState = 0; //0 game not started yet, 1 in game, 2 game over,
let score = 0;
let clouds=[];
let pipes=[];
let pass = 0;