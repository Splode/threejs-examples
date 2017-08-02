// start primary process
var scene = init();
console.log(scene);

// primary process
function init() {
  console.log(THREE);

  // create scene
  var scene = new THREE.Scene();
  // enable dat GUI lib
  var gui = new dat.GUI();
  // create raycaster
  // var raycaster = new THREE.Raycaster();
  // var mouse = new THREE.Vector2();

  // initialize several scene components and set props
  var box = getBox(1, 1, 1, 'yellowgreen');
  var groundPlane = getPlane(1000, 'blanchedalmond');
  var pointLight = getPointLight('#fff', .22);
  var lightSphere = getSphere(0.05, '#fff');
  var hemisphereLight = getHemisphereLight('royalblue', 'tan');
  var grid = getBoxGrid(10, 1.5);

  // add scene objects
  scene.add(box);
  scene.add(groundPlane);
  scene.add(pointLight);
  scene.add(hemisphereLight);
  scene.add(grid);
  pointLight.add(lightSphere);

  // set props
  box.position.y = box.geometry.parameters.height / 2;
  groundPlane.rotation.x = Math.PI / 2;
  pointLight.position.x = 40;
  pointLight.position.y = 100;
  pointLight.position.z = 100;

  // bind dat gui to scene object props
  gui.add(pointLight, 'intensity', 0, 1);
  gui.add(pointLight.position, 'x', -100, 100);
  gui.add(pointLight.position, 'y', 0, 100);
  gui.add(pointLight.position, 'z', -100, 100);

  // create perspective camera and set position
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.x = -10;
  camera.position.y = 5;
  camera.position.z = 10;
  // camera view target
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create renderer
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#fff');
  document.getElementById('webgl').appendChild(renderer.domElement);

  // load orbit controls lib
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  // call animation update function
  update(renderer, scene, camera, controls);

  // add event listeners for raycasting
  document.addEventListener('mousedown', function () {
    onDocumentMouseDown(event, camera, renderer, scene.children);
  }, false);
  document.addEventListener('touchstart', function () {
    onDocumentTouchStart(event, camera, renderer, scene.children);
  }, false);

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

  mesh.castShadow = true;

  return mesh;
}

// create a grid of boxes
function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (var i = 0; i < amount; i++) {
    var box = getBox(1, 1, 1, 'lightseagreen');
    box.position.x = i * separationMultiplier;
    box.position.y = box.geometry.parameters.height / 2;
    group.add(box);
  }

  group.position.x = -(separationMultiplier * (amount - 1)) / 2;
  group.position.z = -(separationMultiplier * (amount - 1)) / 2;

  return group;
}

// create a hemispherical dome light
function getHemisphereLight(skyColor, groundColor) {
  return new THREE.HemisphereLight(skyColor, groundColor);
}

// create a simple plane
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

  mesh.receiveShadow = true;

  return mesh;
}

// create a simple point light
function getPointLight(color, intensity) {
  var light = new THREE.PointLight(color, intensity);
  light.castShadow = true;
  light.shadowMapWidth = 4096;
  light.shadowMapHeight = 4096;

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

// raycasting capture events
function onDocumentMouseDown(event, camera, renderer, objects) {
  // create raycaster and mouse object
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  event.preventDefault();

  // normalize mouse position relative to browser window
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // set raycaster origin
  raycaster.setFromCamera(mouse, camera);

  // get raycaster intersection and act upon first (closest) object
  var intersects = raycaster.intersectObjects(objects, true);
  if (intersects.length > 0) {
    var obj = intersects[0];
    var id = obj.object.uuid;
    
    // set html content to selected object uuid
    document.getElementById('objId').innerHTML = id;
  }
}

function onDocumentTouchStart(event, camera, renderer, objects) {
  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;

  onDocumentMouseDown(event, camera, renderer, objects);
}

// animation update
function update(renderer, scene, camera, controls) {
  renderer.render(
    scene,
    camera
  );

  // call to update orbit controls
  controls.update();

  requestAnimationFrame(function () {
    update(renderer, scene, camera, controls);
  });

}