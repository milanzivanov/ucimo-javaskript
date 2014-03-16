/**
 * Coordinates are specified as (X, Y, Z) where X and Z are horizontal and Y is vertical
 */

var map = [ // 1  2  3  4  5  6  7  8  9
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
           [1, 1, 0, 0, 0, 0, 0, 1, 1, 1,], // 1
           [1, 1, 0, 0, 2, 0, 0, 0, 0, 1,], // 2
           [1, 0, 0, 0, 0, 2, 0, 0, 0, 1,], // 3
           [1, 0, 0, 2, 0, 0, 2, 0, 0, 1,], // 4
           [1, 0, 0, 0, 2, 0, 0, 0, 1, 1,], // 5
           [1, 1, 1, 0, 0, 0, 0, 1, 1, 1,], // 6
           [1, 1, 1, 0, 0, 1, 0, 0, 1, 1,], // 7
           [1, 1, 1, 1, 1, 1, 0, 0, 1, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ], mapW = map.length, mapH = map[0].length;

// polu-konstante
var SIRINA_EKRANA = window.innerWidth,
	VISINA_EKRANA = window.innerHeight,
	RAZMERA_EKRANA = SIRINA_EKRANA / VISINA_EKRANA,
	VELICINA_JEDINICE = 250,
	VISINA_ZIDA = VELICINA_JEDINICE / 3,
	BRZINA_KRETANJA = 100,
	BRZINA_GLEDANJA = 0.075,
	BRZINA_METKA = BRZINA_KRETANJA * 5,
	NEPRIJATELJI = 5,
	METAK_DAMAGE = 20;

// globalne promenljive
var t = THREE, scena, kamera, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, kills = 0, health = 100;
var zdravljeKocka, lastHealthPickup = 0;

// iniciraj i pokreni kada je dokument spreman
$(document).ready(function() {
	$('body').append('<div id="zastor">U borbu!</div>');
	$('#zastor').css({width: SIRINA_EKRANA, height: VISINA_EKRANA}).one('click', function(e) {
		e.preventDefault();
		$(this).fadeOut();
		init();
		setInterval(crtaRadar, 1000);
		animate();
	});
});

// postavka
function init() {
	clock = new t.Clock(); // Used in render() for controls.update()
	projector = new t.Projector(); // Used in bullet projection
	scena = new t.Scene(); // Holds all objects in the canvas
	scena.fog = new t.FogExp2(0xD6F1FF, 0.0005); // color, density
	
	// Set up camera
	kamera = new t.PerspectiveCamera(60, RAZMERA_EKRANA, 1, 10000); // FOV, aspect, near, far
	kamera.position.y = VELICINA_JEDINICE * .2;
	scena.add(kamera);
	
	// Camera moves with mouse, flies around with WASD/arrow keys
	controls = new t.FirstPersonControls(kamera);
	controls.movementSpeed = BRZINA_KRETANJA;
	controls.lookSpeed = BRZINA_GLEDANJA;
	controls.lookVertical = false; // Temporary solution; play on flat surfaces only
	controls.noFly = true;

	// World objects
	postaviScenu();
	
	// Artificial Intelligence
	setupAI();
	
	// Handle drawing as WebGL (faster than Canvas but less supported)
	renderer = new t.WebGLRenderer();
	renderer.setSize(SIRINA_EKRANA, VISINA_EKRANA);
	
	// Add the canvas to the document
	renderer.domElement.style.backgroundColor = '#D6F1FF'; // easier to see
	document.body.appendChild(renderer.domElement);
	
	// Track mouse position so we know where to shoot
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	// Shoot on click
	$(document).click(function(e) {
		e.preventDefault;
		if (e.which === 1) { // Left click only
			createBullet();
		}
	});
	
	// Display HUD
	$('body').append('<canvas id="radar" width="200" height="200"></canvas>');
	$('body').append('<div id="tabela"><p>Zdravlje: <span id="health">100</span><br />Bodovi: <span id="score">0</span></p></div>');
	$('body').append('<div id="komande"><p>WASD je kretanje, mišem gledaš, klikom pucaš</p></div>');
	
	// Set up "povreda" flash
	$('body').append('<div id="povreda"></div>');
	$('#povreda').css({width: SIRINA_EKRANA, height: VISINA_EKRANA,});
}

// Helper function for browser frames
function animate() {
	if (runAnim) {
		requestAnimationFrame(animate);
	}
	render();
}

// Update and display
function render() {
	var delta = clock.getDelta(), speed = delta * BRZINA_METKA;
	var aispeed = delta * BRZINA_KRETANJA;
	controls.update(delta); // Move camera
	
	// Rotate the health kocka
	zdravljeKocka.rotation.x += 0.004
	zdravljeKocka.rotation.y += 0.008;
	// Allow picking it up once per minute
	if (Date.now() > lastHealthPickup + 60000) {
		if (distance(kamera.position.x, kamera.position.z, zdravljeKocka.position.x, zdravljeKocka.position.z) < 15 && health != 100) {
			health = Math.min(health + 50, 100);
			$('#health').html(health);
			lastHealthPickup = Date.now();
		}
		zdravljeKocka.material.wireframe = false;
	}
	else {
		zdravljeKocka.material.wireframe = true;
	}

	// Update meci. Walk backwards through the list so we can remove items.
	for (var i = meci.length-1; i >= 0; i--) {
		var b = meci[i], p = b.position, d = b.ray.direction;
		if (proveriSudarZid(p)) {
			meci.splice(i, 1);
			scena.remove(b);
			continue;
		}
		// Collide with AI
		var hit = false;
		for (var j = ai.length-1; j >= 0; j--) {
			var a = ai[j];
			var v = a.geometry.vertices[0];
			var c = a.position;
			var x = Math.abs(v.x), z = Math.abs(v.z);
			//console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
			if (p.x < c.x + x && p.x > c.x - x &&
					p.z < c.z + z && p.z > c.z - z &&
					b.owner != a) {
				meci.splice(i, 1);
				scena.remove(b);
				a.health -= METAK_DAMAGE;
				var color = a.material.color, percent = a.health / 100;
				a.material.color.setRGB(
						percent * color.r,
						percent * color.g,
						percent * color.b
				);
				hit = true;
				break;
			}
		}
		// Bullet hits player
		if (distance(p.x, p.z, kamera.position.x, kamera.position.z) < 25 && b.owner != kamera) {
			$('#povreda').fadeIn(75);
			health -= 10;
			if (health < 0) health = 0;
			val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
			$('#health').html(val);
			meci.splice(i, 1);
			scena.remove(b);
			$('#povreda').fadeOut(350);
		}
		if (!hit) {
			b.translateX(speed * d.x);
			//meci[i].translateY(speed * meci[i].direction.y);
			b.translateZ(speed * d.z);
		}
	}
	
	// azurira neprijatelja
	for (var i = ai.length-1; i >= 0; i--) {
		var a = ai[i];
		if (a.health <= 0) {
			ai.splice(i, 1);
			scena.remove(a);
			kills++;
			$('#score').html(kills * 100);
			dodajNeprijatelje();
		}
		// mrda neprijatelja
		var r = Math.random();
		if (r > 0.995) {
			a.lastRandomX = Math.random() * 2 - 1;
			a.lastRandomZ = Math.random() * 2 - 1;
		}
		a.translateX(aispeed * a.lastRandomX);
		a.translateZ(aispeed * a.lastRandomZ);
		var c = getMapSector(a.position);
		if (c.x < 0 || c.x >= mapW || c.y < 0 || c.y >= mapH || proveriSudarZid(a.position)) {
			a.translateX(-2 * aispeed * a.lastRandomX);
			a.translateZ(-2 * aispeed * a.lastRandomZ);
			a.lastRandomX = Math.random() * 2 - 1;
			a.lastRandomZ = Math.random() * 2 - 1;
		}
		if (c.x < -1 || c.x > mapW || c.z < -1 || c.z > mapH) {
			ai.splice(i, 1);
			scena.remove(a);
			dodajNeprijatelje();
		}
		var cc = getMapSector(kamera.position);
		if (Date.now() > a.lastShot + 750 && distance(c.x, c.z, cc.x, cc.z) < 2) {
			createBullet(a);
			a.lastShot = Date.now();
		}
	}

	renderer.render(scena, kamera); // Repaint
	
	// Death
	if (health <= 0) {
		runAnim = false;
		$(renderer.domElement).fadeOut();
		$('#radar, #tabela, #komande').fadeOut();
		$('#zastor').fadeIn();
		$('#zastor').html('O ne! Poginuo si...');
		$('#zastor').one('click', function() {
			location = location;
		});
	}
}

// postavlja objekte u svet
function postaviScenu() {
	var VELICINA_JEDINICE = 250, units = mapW;

	// geometrija: pod
	var pod = new t.Mesh(
			new t.CubeGeometry(units * VELICINA_JEDINICE, 10, units * VELICINA_JEDINICE),
			new t.MeshLambertMaterial({color: 0xEDCBA0,/*map: t.ImageUtils.loadTexture('images/trava.jpg')*/})
	);
	scena.add(pod);
	
	// geometrija: zidovi
	var kocka = new t.CubeGeometry(VELICINA_JEDINICE, VISINA_ZIDA, VELICINA_JEDINICE);
	var materijali = [
	                 new t.MeshLambertMaterial({/*color: 0x00CCAA,*/map: t.ImageUtils.loadTexture('images/wall-1.jpg')}),
	                 new t.MeshLambertMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('images/wall-2.jpg')}),
	                 new t.MeshLambertMaterial({color: 0xFBEBCD}),
	                 ];
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {
			if (map[i][j]) {
				var wall = new t.Mesh(kocka, materijali[map[i][j]-1]);
				wall.position.x = (i - units/2) * VELICINA_JEDINICE;
				wall.position.y = VISINA_ZIDA/2;
				wall.position.z = (j - units/2) * VELICINA_JEDINICE;
				scena.add(wall);
			}
		}
	}
	
	// zdravlje kocka
	zdravljeKocka = new t.Mesh(
			new t.CubeGeometry(30, 30, 30),
			new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('images/zdravlje.png')})
	);
	zdravljeKocka.position.set(-VELICINA_JEDINICE-15, 35, -VELICINA_JEDINICE-15);
	scena.add(zdravljeKocka);
	
	// Lighting
	var directionalLight1 = new t.DirectionalLight( 0xF7EFBE, 0.7 );
	directionalLight1.position.set( 0.5, 1, 0.5 );
	scena.add( directionalLight1 );
	var directionalLight2 = new t.DirectionalLight( 0xF7EFBE, 0.5 );
	directionalLight2.position.set( -0.5, -1, -0.5 );
	scena.add( directionalLight2 );
}

var ai = [];
var aiGeo = new t.CubeGeometry(40, 40, 40);
function setupAI() {
	for (var i = 0; i < NEPRIJATELJI; i++) {
		dodajNeprijatelje();
	}
}

function dodajNeprijatelje() {
	var c = getMapSector(kamera.position);
	var neprijateljTekstura = new t.MeshBasicMaterial({/*color: 0xEE3333,*/map: t.ImageUtils.loadTexture('images/face.png')});
	var o = new t.Mesh(aiGeo, neprijateljTekstura);
	do {
		var x = getRandBetween(0, mapW-1);
		var z = getRandBetween(0, mapH-1);
	} while (map[x][z] > 0 || (x == c.x && z == c.z));
	x = Math.floor(x - mapW/2) * VELICINA_JEDINICE;
	z = Math.floor(z - mapW/2) * VELICINA_JEDINICE;
	o.position.set(x, VELICINA_JEDINICE * 0.15, z);
	o.health = 100;
	//o.path = kretnjaNeprijatelja(o);
	o.pathPos = 1;
	o.lastRandomX = Math.random();
	o.lastRandomZ = Math.random();
	o.lastShot = Date.now(); // Higher-fidelity timers aren't a big deal here.
	ai.push(o);
	scena.add(o);
}

function kretnjaNeprijatelja(a) {
	var p = getMapSector(a.position);
	do { // Cop-out
		do {
			var x = getRandBetween(0, mapW-1);
			var z = getRandBetween(0, mapH-1);
		} while (map[x][z] > 0 || distance(p.x, p.z, x, z) < 3);
		var path = findAIpath(p.x, p.z, x, z);
	} while (path.length == 0);
	return path;
}

/**
 * Find a path from one grid cell to another.
 *
 * @param sX
 *   Starting grid x-coordinate.
 * @param sZ
 *   Starting grid z-coordinate.
 * @param eX
 *   Ending grid x-coordinate.
 * @param eZ
 *   Ending grid z-coordinate.
 * @returns
 *   An array of coordinates including the start and end positions representing
 *   the path from the starting cell to the ending cell.
 */
function findAIpath(sX, sZ, eX, eZ) {
	var backupGrid = grid.clone();
	var path = finder.findPath(sX, sZ, eX, eZ, grid);
	grid = backupGrid;
	return path;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

function getMapSector(v) {
	var x = Math.floor((v.x + VELICINA_JEDINICE / 2) / VELICINA_JEDINICE + mapW/2);
	var z = Math.floor((v.z + VELICINA_JEDINICE / 2) / VELICINA_JEDINICE + mapW/2);
	return {x: x, z: z};
}

/**
 * Check whether a Vector3 overlaps with a wall.
 *
 * @param v
 *   A THREE.Vector3 object representing a point in space.
 *   Passing kamera.position is especially useful.
 * @returns {Boolean}
 *   true if the vector is inside a wall; false otherwise.
 */
function proveriSudarZid(v) {
	var c = getMapSector(v);
	return map[c.x][c.z] > 0;
}

// Radar
function crtaRadar() {
	var c = getMapSector(kamera.position), context = document.getElementById('radar').getContext('2d');
	context.font = '10px Helvetica';
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {
			var d = 0;
			for (var k = 0, n = ai.length; k < n; k++) {
				var e = getMapSector(ai[k].position);
				if (i == e.x && j == e.z) {
					d++;
				}
			}
			if (i == c.x && j == c.z && d == 0) {
				context.fillStyle = '#0000FF';
				context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
			}
			else if (i == c.x && j == c.z) {
				context.fillStyle = '#AA33FF';
				context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
				context.fillStyle = '#000000';
				context.fillText(''+d, i*20+8, j*20+12);
			}
			else if (d > 0 && d < 10) {
				context.fillStyle = '#FF0000';
				context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
				context.fillStyle = '#000000';
				context.fillText(''+d, i*20+8, j*20+12);
			}
			else if (map[i][j] > 0) {
				context.fillStyle = '#666666';
				context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
			}
			else {
				context.fillStyle = '#CCCCCC';
				context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
			}
		}
	}
}

var meci = [];
var sphereMaterial = new t.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new t.SphereGeometry(2, 6, 6);
function createBullet(obj) {
	if (obj === undefined) {
		obj = kamera;
	}
	var sphere = new t.Mesh(sphereGeo, sphereMaterial);
	sphere.position.set(obj.position.x, obj.position.y * 0.8, obj.position.z);

	if (obj instanceof t.Camera) {
		var vector = new t.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, obj);
		sphere.ray = new t.Ray(
				obj.position,
				vector.subSelf(obj.position).normalize()
		);
	}
	else {
		var vector = kamera.position.clone();
		sphere.ray = new t.Ray(
				obj.position,
				vector.subSelf(obj.position).normalize()
		);
	}
	sphere.owner = obj;
	meci.push(sphere);
	scena.add(sphere);
	
	return sphere;
}

function onDocumentMouseMove(e) {
	e.preventDefault();
	mouse.x = (e.clientX / SIRINA_EKRANA) * 2 - 1;
	mouse.y = - (e.clientY / VISINA_EKRANA) * 2 + 1;
}

// Handle window resizing
$(window).resize(function() {
	SIRINA_EKRANA = window.innerWidth;
	VISINA_EKRANA = window.innerHeight;
	RAZMERA_EKRANA = SIRINA_EKRANA / VISINA_EKRANA;
	if (kamera) {
		kamera.aspect = RAZMERA_EKRANA;
		kamera.updateProjectionMatrix();
	}
	if (renderer) {
		renderer.setSize(SIRINA_EKRANA, VISINA_EKRANA);
	}
	$('#zastor, #povreda').css({width: SIRINA_EKRANA, height: VISINA_EKRANA,});
});

// Stop moving around when the window is unfocused (keeps my sanity!)
$(window).focus(function() {
	if (controls) controls.freeze = false;
});
$(window).blur(function() {
	if (controls) controls.freeze = true;
});

//Get a random integer between lo and hi, inclusive.
function getRandBetween(lo, hi) {
 return parseInt(Math.floor(Math.random()*(hi-lo+1))+lo, 10);
}



