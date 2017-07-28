function init() {
  console.log(THREE);

  var scene = new THREE.Scene();

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#666');
  document.getElementById('webgl').appendChild(renderer.domElement);

  update(renderer, scene, camera);

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
  return mesh;
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
  return mesh;
}

function getPointLight(color, intensity) {
  var light = new THREE.PointLight(color, intensity);

  return light;
}

function update(renderer, scene, camera) {
  renderer.render(
    scene,
    camera
  );

  requestAnimationFrame(function () {
    update(renderer, scene, camera);
  });
}

var scene = init();