function $ (selector, el) {
  if (!el) {el = document;}
  return el.querySelector(selector);
}
function $$ (selector, el) {
  if (!el) {el = document;}
  return el.querySelectorAll(selector);
  // Note: the returned object is a NodeList.
  // If you'd like to convert it to a Array for convenience, use this instead:
  // return Array.prototype.slice.call(el.querySelectorAll(selector));
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Collect the distinct audio sources
var stereoSource = document.querySelector('.stereo-source');

// Add controls and fix Chrome CORS restriction
stereoSource.controls = true;
stereoSource.src = 'media/left-right-stereo-voice.mp3';

// createMediaElementSource grabs a resource referenced in DOM
var source = audioCtx.createMediaElementSource(stereoSource);

// Splitter node
var splitter = audioCtx.createChannelSplitter();
source.connect(splitter);

// gainNode only has a single I/O so each source must have it's own
var gainNode = audioCtx.createGain();
splitter.connect(gainNode);

// Create an output stream which merges 4 channels
var merger = audioCtx.createChannelMerger(2);

// Now merge the streams into individual channels
splitter.connect(merger, 0, 1);
splitter.connect(merger, 1, 1);

// Connect to output
merger.connect(audioCtx.destination);

// Handle switching channels in current output
var switchChannels = function(element) {
  source.disconnect();
  splitter.disconnect();
  merger.disconnect();
  source.connect(splitter);
  
  switch (element.id) {
    case 'stereo':
      splitter.connect(merger, 0, 0);
      splitter.connect(merger, 1, 1);
      break;
    case 'left':
      splitter.connect(merger, 0, 0);
      splitter.connect(merger, 1, 0);
      break;
    case 'right':
      splitter.connect(merger, 0, 1);
      splitter.connect(merger, 1, 1);
      break;
  }

  merger.connect(audioCtx.destination);
};

// Create event listener for radio selection
$$('input').forEach(function( element ) {
  element.addEventListener('click', function (event) {
    switchChannels(event.target);
  });
});