function init() {
	var scene = new THREE.Scene();

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
  );
  
  var gui = new dat.GUI();

	camera.position.z = 30;
	camera.position.x = 0;
	camera.position.y = 20;
  camera.lookAt(new THREE.Vector3(0, 0, 0));  
  
  var particleMat = new THREE.PointsMaterial({
    color: '#ffeb3b',
    size: 0.25,
    map: new THREE.TextureLoader().load('./assets/particle.jpg'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  var particleGeo = new THREE.SphereGeometry(10, 128, 128);

  particleGeo.vertices.forEach(function(vertex) {
    vertex.x += (Math.random() - 0.5) * 10;
    vertex.y += (Math.random() - 0.5) * 10;
    vertex.z += (Math.random() - 0.5) * 10;
  }, this);

  var particleSystem = new THREE.Points(
    particleGeo,
    particleMat
  )

  particleSystem.name = 'particleSystem';

  scene.add(particleSystem);

  // bind dat gui to scene object props
  // gui.add(particleSystem.geometry.vertices, 'y', 0, 100);

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}


function update(renderer, scene, camera, controls) {
	controls.update();
  renderer.render(scene, camera);
  
  var particleSystem = scene.getObjectByName('particleSystem');

  particleSystem.rotation.x += 0.0005;
  particleSystem.rotation.y += 0.0005;

  particleSystem.geometry.verticesNeedUpdate = true;
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

var scene = init();1