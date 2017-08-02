function init() {
  console.log(THREE);

  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  var box = getBox(1, 1, 1);
  var plane = getPlane(20);
  var pointLight = getPointLight('#fff', 1);
  var sphere = getSphere(0.05);

  plane.name = 'plane-1';

  scene.add(box);
  scene.add(plane);
  pointLight.add(sphere);
  scene.add(pointLight);

  box.position.y = box.geometry.parameters.height / 2;
  plane.rotation.x = Math.PI / 2;
  pointLight.position.y = 2;
  pointLight.intensity = 1.5;

  gui.add(pointLight, 'intensity', 0, 10);
  gui.add(pointLight.position, 'y', 0, 5);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#666');
  document.getElementById('webgl').appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);

  return scene;
}

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: 'lightcoral'
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  mesh.castShadow = true;
  return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (var i = 0; i < amount; i++) {
    var obj = getBox(1, 1, 1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height / 2;
    group.add(obj);

    for (var j = 0; j < amount; j++) {
      var obj = getBox(1, 1, 1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height / 2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
    
    group.position.x = -(separationMultiplier * (amount - 1)) / 2;
    group.position.z = -(separationMultiplier * (amount - 1)) / 2;
  }
}

function getSphere(r) {
  var geometry = new THREE.SphereGeometry(r, 24, 24);
  var material = new THREE.MeshBasicMaterial({
    color: '#fff'
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  return mesh;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: 'grey',
    side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  mesh.receiveShadow = true;
  return mesh;
}

function getPointLight(color, intensity) {
  var light = new THREE.PointLight(color, intensity);
  light.castShadow = true;

  return light;
}

function update(renderer, scene, camera, controls) {
  renderer.render(
    scene,
    camera
  );

  controls.update();

  requestAnimationFrame(function () {
    update(renderer, scene, camera, controls);
  });
}

var scene = init();
console.log(scene);