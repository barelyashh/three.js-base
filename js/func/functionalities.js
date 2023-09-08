
/* Function to delete last added geometry from the scene */

function deleteLast() {

    var arrayText = scene.children;
    var lastGeoAdded = arrayText[arrayText.length - 1];
    if (lastGeoAdded instanceof THREE.Mesh) {
        scene.remove(lastGeoAdded);

    }

}

/* Function to create two scenes */

function divideScene() {
    
    while (scene.children[0]) {
        scene.remove(scene.children[0]);
    }
    controlsT.reset();
    rendering();
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    for (var i = 0; i < 500; i++) {
        var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.9) * 10;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.2) * 70;
        scene.add(mesh);
        
        
    }
}



