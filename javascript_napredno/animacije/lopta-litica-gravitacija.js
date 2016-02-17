
var stage = new Kinetic.Stage({
  container: 'container',
  width: 578,
  height: 400
});

var curveLayer = new Kinetic.Layer();
var ballLayer = new Kinetic.Layer();
var radius = 20;
var anim;

var curve = new Kinetic.Shape({
  sceneFunc: function(context) {
    var height = stage.getHeight();
    var width = stage.getWidth();
    context.beginPath();
    context.moveTo(40, height);
    context.bezierCurveTo(width * 0.2, -1 * height * 0.5, width * 0.7, height * 1.3, width, height * 0.5);
    context.lineTo(width, height);
    context.lineTo(40, height);
    context.closePath();
    context.fillShape(this);
  },
  fill: '#8dbdff'
});

curveLayer.add(curve);

// create ball
var ball = new Kinetic.Circle({
  x: 190,
  y: 20,
  radius: radius,
  fillBlue: 255,
  draggable: true,
  opacity: 0.8
});

// custom property
ball.velocity = {
  x: 0,
  y: 0
};

ballLayer.add(ball);
stage.add(curveLayer);
stage.add(ballLayer);

var tween = new Kinetic.Tween({
  node: ball,
  fillRed: 255,
  fillGreen: 0,
  fillBlue: 0,
  duration: 0.3,
  easing: Kinetic.Easings.EaseOut
});

anim = new Kinetic.Animation(function(frame) {
  updateBall(frame)
}, ballLayer);

anim.start();


/*** LISTENERS ***/

ball.on('dragstart', function() {
  ball.velocity = {
    x: 0,
    y: 0
  };
  anim.start();
});

ball.on('mousedown', function() {
  anim.stop();
});

ball.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});

ball.on('mouseout', function() {
  document.body.style.cursor = 'default';
});


/*** VECTOR MATH FUNCTIONS ***/

function dot(a, b) {
  return ((a.x * b.x) + (a.y * b.y));
}

function magnitude(a) {
  return Math.sqrt((a.x * a.x) + (a.y * a.y));
}

function normalize(a) {
  var mag = magnitude(a);

  if (mag == 0) {
    return {
      x: 0,
      y: 0
    };
  } else {
    return {
      x: a.x / mag,
      y: a.y / mag
    };
  }
}

function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

function angleBetween(a, b) {
  return Math.acos(dot(a, b) / (magnitude(a) * magnitude(b)));
}

function rotate(a, angle) {
  var ca = Math.cos(angle);
  var sa = Math.sin(angle);
  var rx = a.x * ca - a.y * sa;
  var ry = a.x * sa + a.y * ca;
  return {
    x: rx * -1,
    y: ry * -1
  };
}

function invert(a) {
  return {
    x: a.x * -1,
    y: a.y * -1
  };
}
/*
 * this cross product function has been simplified by
 * setting x and y to zero because vectors a and b
 * lie in the canvas plane
 */
function cross(a, b) {
  return {
    x: 0,
    y: 0,
    z: (a.x * b.y) - (b.x * a.y)
  };
}

function getNormal(curve, ball, frame) {
  var curveLayer = curve.getLayer();
  var context = curveLayer.getContext();
  var testRadius = 20;
  // pixels
  var totalX = 0;
  var totalY = 0;
  var x = ball.getX();
  var y = ball.getY();
  /*
   * check various points around the center point
   * to determine the normal vector
   */
  for (var n = 0; n < 20; n++) {
    var angle = n * 2 * Math.PI / 20;
    var offsetX = testRadius * Math.cos(angle);
    var offsetY = testRadius * Math.sin(angle);
    var testX = x + offsetX;
    var testY = y + offsetY;
    if (!context._context.isPointInPath(testX, testY)) {
      totalX += offsetX;
      totalY += offsetY;
    }
  }

  var normal;

  if (totalX === 0 && totalY === 0) {
    normal = {
      x: 0,
      y: -1
    };
  } else {
    normal = {
      x: totalX,
      y: totalY
    };
  }

  return normalize(normal);
}

function handleCurveCollision(ball, curve) {
  var curveLayer = curve.getLayer();
  var curveContext = curveLayer.getContext();
  var x = ball.getX();
  var y = ball.getY();
  var radius = ball.getRadius();

  var curveDamper = 0.05;
  // 5% energy loss
  if (curveLayer.getIntersection({
      x: x,
      y: y
    })) {
    var normal = getNormal(curve, ball);
    if (normal !== null) {
      var angleToNormal = angleBetween(normal, invert(ball.velocity));
      var crossProduct = cross(normal, ball.velocity);
      var polarity = crossProduct.z > 0 ? 1 : -1;
      var collisonAngle = polarity * angleToNormal * 2;
      var collisionVector = rotate(ball.velocity, collisonAngle);

      ball.velocity.x = collisionVector.x;
      ball.velocity.y = collisionVector.y;
      ball.velocity.x *= (1 - curveDamper);
      ball.velocity.y *= (1 - curveDamper);

      x += normal.x;
      if (ball.velocity.y > 0.1) {
        y += normal.y;
      } else {
        y += normal.y / 10;
      }
      ball.x(x).y(y);
    }

    tween.finish();
  }

}

function updateBall(frame) {
  var timeDiff = frame.timeDiff;
  var ballLayer = ball.getLayer();
  var stage = ball.getStage();
  var height = stage.getHeight();
  var width = stage.getWidth();
  var x = ball.getX();
  var y = ball.getY();
  var radius = ball.getRadius();

  tween.reverse();

  // physics variables
  var gravity = 10;
  // px / second^2
  var speedIncrementFromGravityEachFrame = gravity * timeDiff / 1000;
  var collisionDamper = 0.2;
  // 20% energy loss
  var floorFriction = 5;
  // px / second^2
  var floorFrictionSpeedReduction = floorFriction * timeDiff / 1000;

  // if ball is being dragged and dropped
  if (ball.isDragging()) {
    var mousePos = stage.getPointerPosition();

    if (mousePos) {
      var mouseX = mousePos.x;
      var mouseY = mousePos.y;

      var c = 0.06 * timeDiff;
      ball.velocity = {
        x: c * (mouseX - ball.lastMouseX),
        y: c * (mouseY - ball.lastMouseY)
      };

      ball.lastMouseX = mouseX;
      ball.lastMouseY = mouseY;
    }
  } else {
    // gravity
    ball.velocity.y += speedIncrementFromGravityEachFrame;
    x += ball.velocity.x;
    y += ball.velocity.y;

    // ceiling condition
    if (y < radius) {
      y = radius;
      ball.velocity.y *= -1;
      ball.velocity.y *= (1 - collisionDamper);
    }

    // floor condition
    if (y > (height - radius)) {
      y = height - radius;
      ball.velocity.y *= -1;
      ball.velocity.y *= (1 - collisionDamper);
    }

    // floor friction
    if (y == height - radius) {
      if (ball.velocity.x > 0.1) {
        ball.velocity.y -= floorFrictionSpeedReduction;
      } else if (ball.velocity.x < -0.1) {
        ball.velocity.x += floorFrictionSpeedReduction;
      } else {
        ball.velocity.x = 0;
      }
    }

    // right wall condition
    if (x > (width - radius)) {
      x = width - radius;
      ball.velocity.x *= -1;
      ball.velocity.x *= (1 - collisionDamper);
    }

    // left wall condition
    if (x < radius) {
      x = radius;
      ball.velocity.x *= -1;
      ball.velocity.x *= (1 - collisionDamper);
    }

    ball.setPosition({
      x: x,
      y: y
    });

    /*
     * if the ball comes into contact with the
     * curve, then bounce it in the direction of the
     * curve's surface normal
     */
    collision = handleCurveCollision(ball, curve);

  }
}
