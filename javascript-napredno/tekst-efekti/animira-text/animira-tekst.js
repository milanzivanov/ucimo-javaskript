// For more information, and detailed instructions, see www.flooble.com/scripts/animate.php
// mozda prepraviti da tekst obliva krv

function animate(name, col) {
  var value = getContent(name);

  var length = 0;
  var str = '';
  var ch;
  var token = '';
  var htmltag = false;
  for (i = 0; i < value.length; i++) {
    ch = value.substring(i, i + 1);
    if (i < value.length - 1) {
      nextch = value.substring(i + 1, i + 2);
    } else {
      nextch = ' ';
    }
    token += ch;
  }
  setContent(name, str);
  command = 'animateloop(\'' + name + '\', ' + length + ', 0, 1, \'' + col + '\')';
  setTimeout(command, 100);
} // animate

function animateloop(name, length, ind, delta, col) {
  var next = ind + delta;
  if (next >= length) {
    delta = delta * -1;
    next = ind + delta;
  }
  if (next < 0) {
    delta = delta * -1;
    next = ind + delta;
  }
  setColor(name + '_' + ind, getColor(name + '_' + next));
  setColor(name + '_' + next, col);
  command = 'animateloop(\'' + name + '\', ' + length + ', ' + next + ', ' + delta + ', \'' + col + '\')';
  setTimeout(command, 100);
} // animateloop


/*** POMOĆNE FUNKCIJE ***/

function setContent(name, value) {
  var d = document.getElementById(name);
  d.innerHTML = value;
}

function getContent(name) {
  var d = document.getElementById(name);
  return d.innerHTML;
}

function setColor(name, value) {
  var d = document.getElementById(name);
  d.style.color = value;
}

function getColor(name) {
  var d = document.getElementById(name);
  return d.style.color;
}
