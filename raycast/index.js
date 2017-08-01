// start primary process
var scene = init();
console.log(scene);

// primary process
function init() {
  console.log(THREE);

  // create scene
  var scene = new THREE.Scene();

  // add fog to scene
  scene.fog = new THREE.FogExp2('#fff', 0.02);

  // initialize several scene components and set props
  var box = getBox(1, 1, 1, 'lightcoral');
  var groundPlane = getPlane(100, '#666');
  var pointLight = getPointLight('#fff', 1);
  var lightSphere = getSphere(0.05, '#fff');

  scene.add(box);
  scene.add(groundPlane);
  scene.add(pointLight);
  pointLight.add(lightSphere);
  
  box.position.y = box.geometry.parameters.height / 2;
  groundPlane.rotation.x = Math.PI / 2;
  pointLight.position.y = 2;

  // create perspective camera and set position
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  // camera view target
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#fff');
  document.getElementById('webgl').appendChild(renderer.domElement);

  // call animation update function
  update(renderer, scene, camera);

  return scene;
}

// create a simple box
function getBox(w, h, d, c) {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: c,
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function getPlane(s, c) {
  var geometry = new THREE.PlaneGeometry(s, s);
  var material = new THREE.MeshPhongMaterial({
    color: c,
    side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

// create a simple point light
function getPointLight(color, intensity) {
  var light = new THREE.PointLight(color, intensity);

  return light;
}

// create a simple sphere
function getSphere(r, c) {
  var geometry = new THREE.SphereGeometry(r, 24, 24);
  var material = new THREE.MeshBasicMaterial({
    color: c
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

// animation update
function update(renderer, scene, camera) {
  renderer.render(
    scene,
    camera
  );

  requestAnimationFrame(function () {
    update(renderer, scene, camera);
  });

}