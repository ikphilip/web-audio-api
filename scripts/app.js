var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var isChrome = false;
var mediaPrefix = '';

if (navigator.userAgent.indexOf('Chrome') !== -1) {
  isChrome = true;
  mediaPrefix = 'https://raw.githubusercontent.com/ikphilip/web-audio-api/multiple-audio-sources/';
}

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
frontLeft.src = mediaPrefix + 'media/art-tatum.mp3';
frontRight.controls = true;
frontRight.src = mediaPrefix + 'media/sitting-on-top.mp3';
surroundLeft.controls = true;
surroundLeft.src = mediaPrefix + 'media/sitting-on-top.mp3';
surroundRight.controls = true;
surroundRight.src = mediaPrefix + 'media/art-tatum.mp3';
center.controls = true;
center.src = mediaPrefix + 'media/since-i-fell-for-you.mp3';
sub.controls = true;
sub.src = mediaPrefix + 'media/of-its-own-kind.mp3';
surroundBackLeft.controls = true;
surroundBackLeft.src = mediaPrefix + 'media/of-its-own-kind.mp3';
surroundBackRight.controls = true;
surroundBackRight.src = mediaPrefix + 'media/since-i-fell-for-you.mp3';

if (isChrome) {
  frontLeft.crossOrigin = 'anonymous';
  frontRight.crossOrigin = 'anonymous';
  surroundLeft.crossOrigin = 'anonymous';
  surroundRight.crossOrigin = 'anonymous';
  center.crossOrigin = 'anonymous';
  sub.crossOrigin = 'anonymous';
  surroundBackLeft.crossOrigin = 'anonymous';
  surroundBackRight.crossOrigin = 'anonymous';
}

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

// Print some debug info
var ele0 = document.getElementById('browser');
var ele1 = document.getElementById('max-channel-count');
var ele2 = document.getElementById('channel-count');
var ele3 = document.getElementById('channel-count-mode');
var ele4 = document.getElementById('channel-interpretation');

ele0.innerHTML = '<h2>Detected Browser : ' + (isChrome ? 'Chrome' : 'Not Chrome') + '</h2>';
ele1.innerHTML = '<h2>Max Channel Count : ' + audioCtx.destination.maxChannelCount + '</h2>';
ele2.innerHTML = '<h2>Channel Count : ' + audioCtx.destination.channelCount + '</h2>';
ele3.innerHTML = '<h2>Channel Count Mode : ' + audioCtx.destination.channelCountMode + '</h2>';
ele4.innerHTML = '<h2>Channel Interpretation : ' + audioCtx.destination.channelInterpretation + '</h2>';