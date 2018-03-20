var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Collect the distinct audio sources
var frontLeft = document.querySelector('.front-left');
var frontRight = document.querySelector('.front-right');
var surroundLeft = document.querySelector('.surround-left');
var surroundRight = document.querySelector('.surround-right');
var center = document.querySelector('.center');
var sub = document.querySelector('.sub');
var surroundBackLeft = document.querySelector('.surround-back-left');
var surroundBackRight = document.querySelector('.surround-back-right');

// Add controls and fix Chrome CORS restriction
frontLeft.controls = true;
frontLeft.src = 'media/art-tatum.mp3';
frontRight.controls = true;
frontRight.src = 'media/sitting-on-top.mp3';
surroundLeft.controls = true;
surroundLeft.src = 'media/sitting-on-top.mp3';
surroundRight.controls = true;
surroundRight.src = 'media/art-tatum.mp3';
center.controls = true;
center.src = 'media/since-i-fell-for-you.mp3';
sub.controls = true;
sub.src = 'media/of-its-own-kind.mp3';
surroundBackLeft.controls = true;
surroundBackLeft.src = 'media/of-its-own-kind.mp3';
surroundBackRight.controls = true;
surroundBackRight.src = 'media/since-i-fell-for-you.mp3';

// createMediaElementSource grabs a resource referenced in DOM
var sourceFL = audioCtx.createMediaElementSource(frontLeft);
var sourceFR = audioCtx.createMediaElementSource(frontRight);
var sourceSL = audioCtx.createMediaElementSource(surroundLeft);
var sourceSR = audioCtx.createMediaElementSource(surroundRight);
var sourceC = audioCtx.createMediaElementSource(center);
var sourceSub = audioCtx.createMediaElementSource(sub);
var sourceSBL = audioCtx.createMediaElementSource(surroundBackLeft);
var sourceSBR = audioCtx.createMediaElementSource(surroundBackRight);

// gainNode only has a single I/O so each source must have it's own
var gainNodeFL = audioCtx.createGain();
sourceFL.connect(gainNodeFL);

var gainNodeFR = audioCtx.createGain();
sourceFR.connect(gainNodeFR);

var gainNodeSL = audioCtx.createGain();
sourceSL.connect(gainNodeSL);

var gainNodeSR = audioCtx.createGain();
sourceSR.connect(gainNodeSR);

var gainNodeC = audioCtx.createGain();
sourceC.connect(gainNodeC);

var gainNodeSub = audioCtx.createGain();
sourceSub.connect(gainNodeSub);

var gainNodeSBL = audioCtx.createGain();
sourceSBL.connect(gainNodeSBL);

var gainNodeSBR = audioCtx.createGain();
sourceSBR.connect(gainNodeSBR);

// Create an output stream which merges 7.1 surround
// 0 FL, 1 FR, 2 SL, 3 SR, 4 C, 5 Sub, 6 SBL, 7 SBR 
var merger = audioCtx.createChannelMerger(8);

// Now merge the streams into individual channels
gainNodeFL.connect(merger, 0, 0);
gainNodeFR.connect(merger, 0, 1);
gainNodeSL.connect(merger, 0, 2);
gainNodeSR.connect(merger, 0, 3);
gainNodeC.connect(merger, 0, 4);
gainNodeSub.connect(merger, 0, 5);
gainNodeSBL.connect(merger, 0, 6);
gainNodeSBR.connect(merger, 0, 7);

// Connect to output
merger.connect(audioCtx.destination);