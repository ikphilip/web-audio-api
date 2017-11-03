var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Collect the distinct audio sources
var frontLeft = document.querySelector('.front-left');
var frontRight = document.querySelector('.front-right');
var surroundLeft = document.querySelector('.surround-left');
var surroundRight = document.querySelector('.surround-right');

// Add controls and fix Chrome CORS restriction
frontLeft.controls = true;
frontLeft.src = 'media/aintnoman-mono.aac';
frontRight.controls = true;
frontRight.src = 'media/sitting-on-top.mp3';
surroundLeft.controls = true;
surroundLeft.src = 'media/sitting-on-top.mp3';
surroundRight.controls = true;
surroundRight.src = 'media/aintnoman-mono.aac';

// createMediaElementSource grabs a resource referenced in DOM
var sourceFL = audioCtx.createMediaElementSource(frontLeft);
var sourceFR = audioCtx.createMediaElementSource(frontRight);
var sourceSL = audioCtx.createMediaElementSource(surroundLeft);
var sourceSR = audioCtx.createMediaElementSource(surroundRight);

// gainNode only has a single I/O so each source must have it's own
var gainNodeFL = audioCtx.createGain();
sourceFL.connect(gainNodeFL);

var gainNodeFR = audioCtx.createGain();
sourceFR.connect(gainNodeFR);

var gainNodeSL = audioCtx.createGain();
sourceSL.connect(gainNodeSL);

var gainNodeSR = audioCtx.createGain();
sourceSR.connect(gainNodeSR);

// Create an output stream which merges 4 channels
var merger = audioCtx.createChannelMerger(4);

// Now merge the streams into individual channels
gainNodeFL.connect(merger, 0, 0);
gainNodeFR.connect(merger, 0, 1);
gainNodeSL.connect(merger, 0, 2);
gainNodeSR.connect(merger, 0, 3);

// Connect to output
merger.connect(audioCtx.destination);