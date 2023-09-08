

/* Function to create a cone */

function changeToCone() {

	reset();
	description.innerHTML = 'Cone geometry';
	var geometry = new THREE.ConeGeometry(2, 4, 20);
	var material = new THREE.MeshLambertMaterial({color: 0xb4004b});
	var cone = new THREE.Mesh(geometry, material);
	scene.add(cone);
}

/* Function to create a cube */

function changeToCube() {

	reset();
	description.innerHTML = 'Cube geometry';
	var geometry = new THREE.CubeGeometry(3, 3, 3);
	var material = new THREE.MeshLambertMaterial({color: 0x0080ff});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
}

/* Function to create a Pyramid */

function changeToPyramid() {

	reset();
	description.innerHTML = 'Pyramid geometry';
	var geometry = new THREE.CylinderGeometry(0, 3, 4, 3, 1);
	var material = new THREE.MeshLambertMaterial({color: 0x008080});
	var pyramid = new THREE.Mesh(geometry, material);
	scene.add(pyramid);
}

/* Function to create a sphere */

function changeToSphere() {

	reset();
	description.innerHTML = 'Sphere geometry';
	var geometry = new THREE.SphereGeometry(2);
	material = new THREE.MeshLambertMaterial({color: 0x7b3bb3});
	var sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
}

/* Function to create multiple geometries at random positions */

function addMultiple() {

	reset();
	description.innerHTML = 'Multiple geometries';
	var geometry1 = new THREE.CubeGeometry(1, 1, 1);

	for (var i = 0; i < 500; i++) {
		var mesh1 = new THREE.Mesh(geometry1, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
		mesh1.position.x = (Math.random() - 0.9) * 10;
		mesh1.position.y = (Math.random() - 0.5) * 40;
		mesh1.position.z = (Math.random() - 0.2) * 70;
		scene.add(mesh1);
	}

	var geometry2 = new THREE.SphereGeometry(1);
	for (var i = 0; i < 500; i++) {
		var mesh2 = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
		mesh2.position.x = (Math.random() - 0.7) * 30;
		mesh2.position.y = (Math.random() - 0.5) * 60;
		mesh2.position.z = (Math.random() - 0.2) * 90;
		scene.add(mesh2);
	}
}


/* Function to create cube with textures */

function boxWithTexture() {

	reset();
	description.innerHTML = 'Cube With Texture';
	var loader = new THREE.TextureLoader();
	var array = ['../images/THREE_gates.jpg',];
	var textureToShow = 0;

	var material = new THREE.MeshLambertMaterial();
	var geometry = new THREE.BoxGeometry(2, 2, 2);
	var texturecube = new THREE.Mesh(geometry, material);
	loader.load(array[textureToShow], function (tex) {
		material.map = tex;
		textureToShow++;
		scene.add(texturecube);

	});

}

/* Function to create faceted cube with six materials on each face */

function facetedCube() {

	reset();
	description.innerHTML = '6 face cube';
	var geometry = new THREE.BoxBufferGeometry(2, 2, 2);

	var materials = [
		new THREE.MeshLambertMaterial({color: 0xFF0000}),
		new THREE.MeshLambertMaterial({color: 0x00FF00}),
		new THREE.MeshLambertMaterial({color: 0x000000}),
		new THREE.MeshLambertMaterial({color: 0x808080}),
		new THREE.MeshLambertMaterial({color: 0x0000FF}),
		new THREE.MeshLambertMaterial({color: 0xFFFF00})
	];

	mesh = new THREE.Mesh(geometry, materials);
	mesh.name = 'facecube';
	scene.add(mesh);
}

