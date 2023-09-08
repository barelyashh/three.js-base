

/* global variables */
var scene, camera, renderer,container, scene2, camera2, renderer2,container2, controlsT, controlsD,
    mouse, raycaster, intersected, light,texture, description, userguide, boxHelper,
     intersect, currentHex, materialIndex , stats;


description = document.getElementById('description');
userguide = document.getElementById('userguide');

var widthO = 1116;
var heightO = 657;
var width2 = 200;
var height2 = 200;
   

init();
animate();

/* Initial function that will be used to render our scene. */

function init() {

	container = document.getElementById('canvas');
	document.body.appendChild(container);

	//renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(widthO, heightO);
	container.appendChild(renderer.domElement);

	//scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xe5e5e5);

	//camera
	camera = new THREE.PerspectiveCamera(45, widthO / heightO, 1, 10000);
	camera.position.set(0, 0, 10);
	camera.lookAt(scene.position)
	scene.add(camera);
	/* --------------------- */
	stats = new Stats();
	stats.domElement.style.marginLeft = '250px';
	stats.showPanel( 0 );
	/* --------------------- */  
    container.appendChild( stats.dom );
	mouse = new THREE.Vector3();
	raycaster = new THREE.Raycaster();
	var lights = new THREE.HemisphereLight(0x83B8F1, 0xff0000, 1);
    scene.add(lights);

	//TrackballControls
	controlsT = new THREE.TrackballControls(camera, renderer.domElement);

	//Window Resize Event
	window.addEventListener('resize', onWindowResize, false);

	/*   canvas2 */
	var container2 = document.getElementById('canvas2');

	//renderer2
	renderer2 = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer2.setPixelRatio(window.devicePixelRatio);
	renderer2.setSize(width2, height2);
	container2.appendChild(renderer2.domElement);

	//scene2
	scene2 = new THREE.Scene();
	scene2.background = new THREE.Color(0xe5e5e5);

	//camera2
	camera2 = new THREE.PerspectiveCamera(45, width2 / height2, 1, 1000);
	camera2.up = camera2.up;

	//axis trade
	var axes2 = new THREE.AxesHelper(100);
	scene2.add(axes2);

}


//window resize function
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

}

/* animate loop that draws the scene every time the screen is refreshed */

function animate() {

	requestAnimationFrame(animate);
	controlsT.update();
	stats.update();
	camera2.position.copy(camera.position);
	camera2.position.sub(controlsT.target);
	camera2.position.setLength(300);
	camera2.lookAt(scene2.position);
	render();


}

/* This function is used to clear mesh objects from the scene after button click */

function reset() {

	camera.position.set(0, 0, 15);
	scene.add(camera);
	while (scene.children[0]) {
		scene.remove(scene.children[0]);
	}
	controlsT.reset();
	renderer.setSize(widthO, heightO);
	light = new THREE.AmbientLight();
	scene.add(light);
}


/* Funtion to divide scene by 2 */

function rendering() {

	// corner scene
	var widthHalf = widthO / 2;
	var heightHalf = heightO / 2;

	renderer.setScissor(0, 0, widthHalf, heightHalf);
	renderer.setViewport(widthHalf, heightHalf, widthHalf, heightHalf);

}


function render() {

	renderer.render(scene, camera);
    renderer2.render(scene2, camera2);
    
}










