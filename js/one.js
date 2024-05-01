const orange = "rgb(230, 159, 0)"
const skyBlue = "rgb(86, 180, 233)"
const blueishGreen = "rgb(0, 158, 115)"
const yellow = "rgb(240, 228, 66)" // main background colour
const blue = "rgb(0, 114, 178)"
const vermilion = "rgb(213, 94, 0)"
const reddishPurple = "rgb(204, 121, 167)"

var synth = new Tone.PolySynth().toDestination();        // call a new tone synth and patch it to the sound
var info = true;    // this tells us whether to display the info screen or not
var notePlaying = [0,0,0,0,0,0,0,0,0]; // array to store if a note is playing - not using this at the moment, but might
var ongoingTouches = []; // to store ongoing touches in for multitouch
const now = Tone.now(); // time variable to tell the tone.js when to play - i.e play now! (when function called for example)
var notes = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4"];    // array containing our musical notes that we are currently using (tone.js will respond to these as is)
var allTheNotes =  ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
                    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
                    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
                    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
                    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
                    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
                    "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
                    "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8"]; // all the notes available to us in the code
var major = [0,2,4,5,7,9,11,12,14]; // intervals for a major scale for 9 notes
var pentatonic = [0,2,4,7,9,12,14,16,19]; // intervals for a pentatonic scale for 9 notes
var minor = [0,2,3,5,7,8,10,12,14]; // intervals for a minor scale for 9 notes
var majorBlues = [0,2,3,4,7,9,12,14,15]; // intervals for a major blues scale for 9 notes
var minorBlues = [0,3,5,6,7,10,12,15,17]; // intervals for a minor scale for 9 notes
var scales = ["default", pentatonic, major, minor, majorBlues, minorBlues];
var scale = pentatonic; // this variable sets the default scale on load
var theKey = 0; // this variable sets the default key on load
var octave = 24; //set the default octave on load
var whichClicked = [0,0,0,0,0,0,0,0,0];
var whichKey = [0,0,0,0,0,0,0,0,0];

document.addEventListener("DOMContentLoaded", startup); // adding an event listener to the document which fires once the DOM is loaded and then triggers the startup function

function startup() {
  for(var i = 0; i < 9; i++) {    // loop through the divs containing images and add event listeners
    var el = document.getElementById("image"+i);
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
    }
  for(var i = 0; i < 9; i++) {    // loop through the divs containing images and add event listeners
    var el = document.getElementById("image"+i);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener('keydown', handleKeyDown); //add listener for keyboard input
    document.addEventListener('keyup', handleKeyUp); //add listener for keyboard input

}

function hideLoadScreen() {
  document.getElementById('loadscreen').style.visibility="hidden";
  var welcome = document.getElementById('welcomescreen');
  welcome.style.visibility="visible";
  welcome.addEventListener("click", startHorn);
  welcome.addEventListener("touchstart", startHorn);
}

function startHorn() {
  document.getElementById('welcomescreen').style.visibility="hidden";
  if(info === true) { // is the info screen on?
    Tone.start(); // we need this to allow audio to start. probably best to put it on a different button soon though
    info = false;
  }
}

function handleKeyDown(e) {

  if(info === true) { // is the info screen on?
    Tone.start(); // we need this to allow audio to start. probably best to put it on a different button soon though
    info = false;
    document.getElementById('welcomescreen').style.visibility="hidden";
  }

  var key = e.code;
  console.log("keydown "+key); //debugging

  switch(key) {  /// working here! - retriggering keys so remove the play synth and do a for loop on the array to play
    case "KeyQ" :
      if(whichKey[0] === 0) {
        playSynth(0);
        whichKey[0] = 1;
        break;
      } else {
        break;
      }
    case "KeyW" :
      if(whichKey[1] === 0) {
        playSynth(1);
        whichKey[1] = 1;
        break;
      } else {
        break;
      }
    case "KeyE" :
      if(whichKey[2] === 0) {
        playSynth(2);
        whichKey[2] = 1;
        break;
      } else {
        break;
      }
    case "KeyR" :
      if(whichKey[3] === 0) {
        playSynth(3);
        whichKey[3] = 1;
        break;
      } else {
        break;
      }
    case "KeyT" :
      if(whichKey[4] === 0) {
        playSynth(4);
        whichKey[4] = 1;
        break;
      } else {
        break;
      }
    case "KeyY" :
      if(whichKey[5] === 0) {
        playSynth(5);
        whichKey[5] = 1;
        break;
      } else {
        break;
      }
    case "KeyU" :
      if(whichKey[6] === 0) {
        playSynth(6);
        whichKey[6] = 1;
        break;
      } else {
        break;
      }
    case "KeyI" :
      if(whichKey[7] === 0) {
        playSynth(7);
        whichKey[7] = 1;
        break;
      } else {
        break;
      }
    case "KeyO" :
      if(whichKey[8] === 0) {
        playSynth(8);
        whichKey[8] = 1;
        break;
      } else {
        break;
      }
  }
}

function handleKeyUp(e) {
  var key = e.code;
  console.log("keyup "+key); //debugging
  switch(key) {
    case "KeyQ" :
      stopSynth(0);
      whichKey[0] = 0;
      break;
    case "KeyW" :
      stopSynth(1);
      whichKey[1] = 0;
      break;
    case "KeyE" :
      stopSynth(2);
      whichKey[2] = 0;
      break;
    case "KeyR" :
      stopSynth(3);
      whichKey[3] = 0;
      break;
    case "KeyT" :
      stopSynth(4);
      whichKey[4] = 0;
      break;
    case "KeyY" :
      stopSynth(5);
      whichKey[5] = 0;
      break;
    case "KeyU" :
      stopSynth(6);
      whichKey[6] = 0;
      break;
    case "KeyI" :
      stopSynth(7);
      whichKey[7] = 0;
      break;
    case "KeyO" :
      stopSynth(8);
      whichKey[8] = 0;
      break;
  }

}

function handleMouseDown(evt) {

  if(info === true) { // is the info screen on?
    Tone.start(); // we need this to allow audio to start. probably best to put it on a different button soon though
    info = false;
  }

  evt.preventDefault();

  var elem = this.id; //returns the id of the element that triggered the mouse event
  console.log("mouseDown id "+elem); //debugging

  for(var i = 0; i < 9; i++) { // for loop to check which element it is and get a number to send to the synth
    if(elem === "image"+i){ // this looks confusing because the id name also contains "i" - see that HTML
      playSynth(i); // call the playSynth function
      whichClicked[i] = 1; //store the click in an array as a boolean true
    }
  }

}

function handleMouseUp() {

  var elem = this.id; //returns the id of the element that triggered the mouse event
  console.log("mouseUp id "+elem); //debugging
  for(var i = 0; i < 9; i++) { // for loop to check which click is ending and get a number to send to the synth
    if(whichClicked[i] === 1){
      stopSynth(i); // call the stopSynth function
      whichClicked[i] = 0;//set the click state in an array as a boolean false
    }
  }

}

  function handleStart(evt) { // this function handles touchstart
    evt.preventDefault(); // prevent default touch actions like scroll

    if(info === true) { // is the info screen on?
      Tone.start(); // we need this to allow audio to start. probably best to put it on a different button soon though
      info = false;
    }

    console.log("touchstart."); //debugging
    var touches = evt.changedTouches; //assign the changedTouches to an array called touches
    ongoingTouches.push(copyTouch(touches[0])); //copy the new touch into the ongoingTouches array
    var elem = evt.targetTouches[0].target.id; //returns the id of the element that triggered the touch
    console.log("image id = "+elem); //debugging
    for(var i = 0; i < 9; i++) { // for loop to check which element it is and get a number to send to the synth
      if(elem === "i"+i){ // this looks confusing because the id name also contains "i" - see that HTML
        playSynth(i); // call the playSynth function
      }
    }
  }

  function handleMove(evt) { // this function handles touchmove
    evt.preventDefault(); // prevent default touch actions like scroll
    var touches = evt.changedTouches; //assign the changedTouches to an array called touches

    for (var i = 0; i < touches.length; i++) {

      var idx = ongoingTouchIndexById(touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx

      if (idx >= 0) { // did we get a match?
        // console.log("continuing touch "+idx); // debugging

        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        // console.log(".");
      } else { // no match
        console.log("can't figure out which touch to continue");
      }
    }
  }

  function handleEnd(evt) {  // this function handles touchend
    evt.preventDefault(); // prevent default touch actions like scroll

    var touches = evt.changedTouches; //assign the changedTouches to an array called touches
    var elem = touches[0].target.id //returns the id of the element that triggered the touch (that has just ended)
    console.log("ended image id = "+elem); //debugging
    for(var i = 0; i < 9; i++) { //get a number to end the right note
        if(elem === "i"+i){
          stopSynth(i); // call stopSynth
        }
      }
    for (var i = 0; i < touches.length; i++) {

      var idx = ongoingTouchIndexById(touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx

      if (idx >= 0) { // did we get a match?
        console.log("touchend "+idx);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else { // no match
        console.log("can't figure out which touch to end");
      }
    }
  }

  function handleCancel(evt) { // this handles touchcancel
    evt.preventDefault();  // prevent default touch actions like scroll
    console.log("touchcancel."); //debugging
    var touches = evt.changedTouches; //assign the changedTouches to an array called touches

    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
  }


  function copyTouch({ identifier, pageX, pageY }) { // this function is used to facilitate copying touch ID properties
    return { identifier, pageX, pageY };
  }

  function ongoingTouchIndexById(idToFind) { //compares the more complex stuff to give a simple answer to the question "which touch"
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;

      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }


  // the following is to do with the select boxes and making them look pretty


selectBoxes("keymenu"); //make a pretty keymenu
selectBoxes("scalemenu"); //make a pretty scalemenu
selectBoxes("octavemenu"); //make a pretty octavemenu

function selectBoxes(name) {

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName(name);
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            console.log(name + (" ") + s.selectedIndex); //debugging
            handleMenu(name, s.selectedIndex);   // send the menu name and the index of the selection to the handlemenu function
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    //console.log(a.innerHTML);
  });
}
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

function handleMenu(menu, index) { // function to handle the menu selections and change scales and keys
  if(menu === "keymenu"){
    theKey = index -1; // set the variable to the correct scale - the minus 1 is to offset it to allow for the default menu setting
    console.log("the key is "+theKey); //debugging
    for(var i = 0; i < 9; i++) {
      var theNote = scale[i] + octave + theKey; // the note plus the octave plus the offset from the key menu
      notes[i] = allTheNotes[theNote]; // pick the notes from the all the notes array
    }
  }else if(menu === "scalemenu"){
    console.log("the scale is "+index);
    scale = scales[index];
    console.log(scale);
    for(var i = 0; i < 9; i++) {
      var theNote = scale[i] + octave + theKey; // the note plus the octave plus the offset from the key menu
      notes[i] = allTheNotes[theNote]; // pick the notes from the all the notes array
    }
  } else {
    console.log("the octave is "+index);
    octave = index * 12;                      //octave switching here WORKING HERE
    for(var i = 0; i < 9; i++) {
      var theNote = scale[i] + octave + theKey; // the note plus the octave plus the offset from the key menu
      notes[i] = allTheNotes[theNote]; // pick the notes from the all the notes array
    }
  }
}



//following is to do with sound and image management

const sampler = new Tone.Sampler({
	urls: {
		B3: "bassoon_b3.mp3",
	},
	baseUrl: "/sounds/",
	onload: () => {
    hideLoadScreen();
  }
})


// const sampler = new Tone.Sampler({
// 	urls: {
// 		A2: "355893__mtg__violin-a3.mp3",
//     C3: "356134__mtg__violin-c4.mp3",
//     D3: "356048__mtg__violin-d4.mp3",
//     E3: "355976__mtg__violin-e4.mp3",
//     F3: "356107__mtg__violin-f4.mp3",
//     G3: "356045__mtg__violin-g4.mp3",
//     A3: "356075__mtg__violin-a4.mp3",
//     B3: "355998__mtg__violin-b4.mp3"


// 	},
// 	baseUrl: "/sounds/",
// 	onload: () => {
//     hideLoadScreen();
//   }
// })

// const sampler = new Tone.Sampler({
// 	urls: {
// 		B2: "horn-tone-b2.mp3",
//     C3: "horn-tone-c3.mp3",
//     E3: "horn-tone-e3.mp3",
//     G3: "horn-tone-g3.mp3",
//     A3: "horn-tone-a3.mp3",
//     C4: "horn-tone-c4.mp3"
// 	},
// 	baseUrl: "/sounds/",
// 	onload: () => {
//     hideLoadScreen();
//   }
// })

const reverb = new Tone.Reverb({
  decay: 3,
  predelay: 0,
  wet: 0.5
}).toDestination();

sampler.connect(reverb);


sampler.set({
  release: 8
});

synth.set(  // setup the synth - this is audio stuff really
  {
    "volume": 0,
    "detune": 0,
    "portamento": 0,
    "envelope": {
      "attack": 40,
      "attackCurve": "linear",
      "decay": 0.1,
      "decayCurve": "exponential",
      "release": 2,
      "releaseCurve": "exponential",
      "sustain": 0.3
    },
  }
);

function playSynth(i) {
  sampler.triggerAttack(notes[i], Tone.now());
  document.getElementById(`i${i}`).style.backgroundColor=reddishPurple;
}

var col = [yellow, orange, yellow, orange, yellow, orange, yellow, orange, yellow]; //colour of button

function stopSynth(i) {
  sampler.triggerRelease(notes[i], Tone.now());
  document.getElementById(`i${i}`).style.backgroundColor=col[i];
}
