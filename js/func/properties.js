function raycasterIntersect(event) {

    event.preventDefault();
    mouse.x = ((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);   // an array containing all objects in the scene with which the ray intersects
    return intersects;
}


document.addEventListener("DOMContentLoaded", function() {

    var selector1 = document.querySelector('input[name=checkbox1]');
    var selector2 = document.querySelector('input[name=checkbox2]');
    var selector3 = document.querySelector('input[name=checkbox3]');
    var selector4 = document.querySelector('input[name=checkbox4]');
    var selector5 = document.querySelector('input[name=checkbox5]');
    var selector6 = document.querySelector('input[name=checkbox6]');
    var selector7 = document.querySelector('input[name=checkbox7]');

    selector1.addEventListener('change', function() {

        if (selector1.checked) {
            userguide.innerHTML = 'Select object from the scene ';
            document.addEventListener('pointerdown', pointerdownForWireframe);

        } else {
            userguide.innerHTML = '';
            for (var i = 0; i < scene.children.length; i++) {
                if (scene.children[i] instanceof THREE.Mesh) {
                    scene.children[i].material.wireframe = false;
                }
            }
            for (var i = 0; i < scene.children.length; i++) {
                if (scene.children[i] instanceof THREE.Mesh) {
                    for (var m = 0; m < scene.children[i].material.length; m++) {
                        scene.children[i].material[m].wireframe = false;
                    }
                }
            }
        
            document.removeEventListener('pointerdown', pointerdownForWireframe);
        }
    });

    selector2.addEventListener('change', function() {

        if (selector2.checked) {
            userguide.innerHTML = 'Select object from the scene ';
            document.addEventListener('pointerdown', mousemoveForColor);

        } else {
            userguide.innerHTML = '';
            document.removeEventListener('pointerdown', mousemoveForColor);

        }
    });

    selector3.addEventListener('change', function() {
        if (selector3.checked) {
            userguide.innerHTML = 'Mousehover on the object to highlight ';
            document.addEventListener('pointerdown', mousemoveToHighlight);

        } else {
            userguide.innerHTML = '';
            document.removeEventListener('pointerdown', mousemoveToHighlight);
        }
    });

    selector4.addEventListener('change', function() {

        if (selector4.checked) {
            userguide.innerHTML = 'Select object from the scene to remove ';
            document.addEventListener('pointerdown', pointerdownToRemove);

        } else {
            userguide.innerHTML = '';
            document.removeEventListener('pointerdown', pointerdownToRemove);

        }
    });


    selector5.addEventListener('change', function() {

        if (selector5.checked) {
            userguide.innerHTML = 'Select object from the scene to use drag';
            controlsT.enabled = false;
            controlsD = new THREE.DragControls(scene.children, camera, renderer.domElement);
            controlsD.addEventListener('drag', render);

        } else {
            userguide.innerHTML = '';
            controlsD.enabled = false;
            controlsT.enabled = true;
            controlsT.removeEventListener('drag', render);

        }
    });

    selector6.addEventListener('change', function() {

        if (selector6.checked) {
            userguide.innerHTML = 'You can select textures from three_js_asssign/images folder';

        } else {

            userguide.innerHTML = '';
            document.removeEventListener('pointerdown', select);
        }
    });

    selector7.addEventListener('change', function(event) {

        if (selector7.checked) {
            userguide.innerHTML = 'Select object To Zoom ';
            document.addEventListener('dblclick', zoom);

        } else {
            document.removeEventListener('dblclick', zoom);
        }
    });

});


//selector1 Wireframe
function pointerdownForWireframe(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects
    if (intersects.length > 0) {
        if (intersects[0].object.name == '') {
            intersected = intersects[0].object;
            intersected.material.wireframe = true;
        }
        if (intersects[0].object.name == 'facecube') {
            for (var i = 0; i < intersects[0].object.material.length; i++) {
                intersected = intersects[0].object;
                intersected.material[i].wireframe = true;
            }
        }
    }
    render();
}


//selector2 Color
function mousemoveForColor(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects
console.log(intersects)
    if (intersects.length > 0) {
        if (intersects[0].object.name == '') {
            intersected = intersects[0].object;
            currentHex = intersected.material.color.getHex();
            console.log(Math.random() * 0xffffff);
            intersected.material.color.setHex(Math.random() * 0xffffff);
        }
        if (intersects[0].object.name == 'facecube') {
            materialIndex = intersects[0].face.materialIndex;
            intersected = intersects[0].object;
            intersected.material[materialIndex].color.setHex(Math.random() * 0xffffff);
            intersected.material.colorsNeedUpdate = true;
        }
    }
    render();
}


//selector3 Highlight
function mousemoveToHighlight(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects

    if (intersects.length > 0) {

        if ((intersects[0].object.name == '')) {
            if (intersected) {
                intersected.material.color.setHex(currentHex);
            }

            intersected = intersects[0].object;
            currentHex = intersected.material.color.getHex();
            intersected.material.color.set(0xff0000);
        }

    } else {
        if (intersected) {
            intersected.material.color.setHex(currentHex);
        }

        intersected = null;
    }
    if (intersects.length > 0) {
console.log('1')
        if ((intersects[0].object.name == 'facecube')) {
            console.log('2')
            if (intersect) {
                console.log('3')
                intersect.material[materialIndex].color.setHex(currentHex);
            }
            console.log('4')
            materialIndex = intersects[0].face.materialIndex;
            intersect = intersects[0].object;
            currentHex = intersect.material[materialIndex].color.getHex();
            intersect.material[materialIndex].color.setHex(0xffffff);
            intersect.material.colorsNeedUpdate = true;
        }
    } else {
        console.log('5')
        if (intersect) {
            console.log('6')
            intersect.material[materialIndex].color.setHex(currentHex);
        }
        console.log('7')
        intersect = null;
    }

}


//selector4 Remove
function pointerdownToRemove(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects

    if (intersects.length > 0) {
        var object = intersects[0].object;
        if (scene.children.includes(object) === true) {
            scene.remove(object);
        } else {
            intersected = null;
        }
    }
    render();
}


//selector5 DRAG
function onClick(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects

    if (enableSelection === true) {
        var draggableObjects = controlsTD.getObjects();
        draggableObjects.length = 0;
        if (intersects.length > 0) {
            var object = intersects[0].object;
            if (scene.children.includes(object) === true) {
                scene.attach(object);
            }
        }
    }
    render();

}

//selector6 ZOOM
function zoom(event) {

    var intersects = raycasterIntersect(event);
    if (intersects.length > 0) {

        var offset = offset || 3;

        var boundingBox = new THREE.Box3();

        boundingBox.setFromObject(intersects[0].object);

        var center = boundingBox.getCenter(new THREE.Vector3());
        var size = boundingBox.getSize(new THREE.Vector3());
        var maxSize = Math.max(size.x, size.y, size.z);
        var fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
        var fitWidthDistance = fitHeightDistance / camera.aspect;
        var distance = offset * Math.max(fitHeightDistance, fitWidthDistance);
        var direction = controlsT.target.clone()
            .sub(camera.position)
            .normalize()
            .multiplyScalar(distance);
        controlsT.maxDistance = distance * 1000;
        controlsT.target.copy(center);
        camera.near = distance / 1000;
        camera.far = distance * 1000;
        camera.updateProjectionMatrix();
        camera.position.copy(controlsT.target).sub(direction);

        controlsT.update();

    }
    render()
}

//selector7 Texture
function applySelectedTexture() {
    var input, file, x;
    var loader = new THREE.TextureLoader();
    input = document.getElementById('fileuploads');
    for (var i = 0; i < input.files.length; ++i) {
        file = input.files[i];
        console.log(file.name);
        x = ('../../images/' + file.name);
    }
    texture = loader.load(x);
    console.log(texture)
    console.log(x);
    userguide.innerHTML = '';
    document.addEventListener('pointerdown', select);

}

function select(event) {

    var intersects = raycasterIntersect(event); //function call that returns intersects

    if (intersects.length > 0) {
        if (intersects[0].object.name == '') {
            intersects[0].object.material.color = false;
            intersects[0].object.material.map = texture;
            intersects[0].object.material.needsUpdate = true;
        }
    }
    if (intersects.length > 0) {
        if ((intersects[0].object.name == 'facecube')) {

            materialIndex = intersects[0].face.materialIndex;
            intersects[0].object.material[materialIndex].map = texture;
            intersects[0].object.material[materialIndex].needsUpdate = true;
        }
    }
    render();
}



$(document).ready(function() {
    $('#uploads').hide();
    $('#enable_uploads').change(function() {
        $('#uploads').toggle()
    });
});


//enable disable checkbox
$(".checkbox-list").change(function() {
    this.checked ? $("." + this.className).not(this).prop("disabled", true) : $("." + this.className).not(this).prop("disabled", false);
});

//Condition for file input 
$(document).ready(function() {
    $('#submitimages').bind("click", function() {
        var imgVal = $('#fileuploads').val();
        if (imgVal == '') {
            alert("empty input file");
            return false;
        }
    });
});
