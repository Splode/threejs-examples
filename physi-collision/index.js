Physijs.scripts.worker = './lib/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var boxOne, camera, controls, groundPlane, ground, ground_material, initScene, light, render, renderer, scene;

initScene = function () {
  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#fff');
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  document.getElementById('webgl').appendChild(renderer.domElement);

  // create Physijss scene
  scene = new Physijs.Scene;
  scene.setGravity(
    new THREE.Vector3(0, -30, 0)
  );

  // camera
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(60, 40, 60);
  camera.lookAt(scene.position);
  scene.add(camera);

  // load orbit controls lib
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Light
  light = new THREE.DirectionalLight('#fff');
  light.position.set(20, 40, 10);
  light.target.position.copy(scene.position);
  light.castShadow = true;
  light.shadow.camera.left = -60;
  light.shadow.camera.top = -60;
  light.shadow.camera.right = 60;
  light.shadow.camera.bottom = 60;
  light.shadow.camera.near = 20;
  light.shadow.camera.far = 200;
  light.shadow.bias = -.0001;
  light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
  scene.add(light);

  groundPlane = createPlane(1000, '#fbfbfb');
  groundPlane.rotation.x = Math.PI / 2;
  scene.add(groundPlane);

  // create cube
  // boxOne = createBox(5, 5, 5, '#999');
  // boxOne.castShadow = true;
  // boxOne.position.y = 20;
  // scene.add(boxOne);

  // Ground
  ground_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({
      opacity: 0,
      transparent: true
    }),
    .8, // high friction
    .3 // low restitution
  );
  
  ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(100, 0, 100),
    ground_material,
    0 // mass
  );
  ground.receiveShadow = true;
  scene.add(ground);

  spawnBox();

  // call animation update
  requestAnimationFrame(render);

};

// create a cube
function createBox(w, h, d, c) {
  var box = new Physijs.BoxMesh(
    new THREE.CubeGeometry(w, h, d),
    new THREE.MeshPhongMaterial({
      color: c
    })
  );

  return box;
}

// create a simple plane
function createPlane(s, c) {
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

function spawnBox () {
  setInterval(function() {
    var box = createBox(5, 5, 5, '#999');
    box.castShadow = true;
    box.position.y = 1;
    scene.add(box);
  }, 1000);
}

// update animation
render = function () {
  scene.simulate();
  renderer.render(scene, camera);
  requestAnimationFrame(render, controls);
};

// create scene on load
window.onload = initScene();