var crystals = [];
var crystalNum = 200;

//////////////////////////////
// Camera and scene
//////////////////////////////
var scene = new THREE.Scene();

//consider modifying this later for a full screen effect
var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );

camera.zoom = 5;
camera.updateProjectionMatrix();
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );

//puts canvas element in DOM
document.body.appendChild( renderer.domElement );


//////////////////////////////
// All things sugar particle
//////////////////////////////

function createMesh() {
  var length = randBetween(1, 6);
  var width = randBetween(1, 8);

  var shape = new THREE.Shape();
  shape.moveTo( randBetween(0,1.5),randBetween(0,1.5) );
  shape.lineTo( randBetween(0,1.5), width );
  shape.lineTo( length, width );
  shape.lineTo( length, randBetween(0,1.5) );
  shape.lineTo( randBetween(0,1.5), randBetween(0,1.5) );
  var extrudeSettings = {
    steps: 2,
    amount: randBetween(3,6),
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: randBetween(1,3),
    bevelSegments: 1.5
  };

  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = true;
  textureLoader.load('../vendor/sugar-texture-4.png', function(texture) {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(0.1,0.1);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      premultipliedAlpha: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    mesh = new THREE.Mesh(geometry, material);
    var xCor = randBetween(-50,50);
    var yCor = randBetween(-50,50);
    var zCor = randBetween(-50,50);
    mesh.position.set(xCor,yCor,zCor);
    mesh.geometry.center();
    mesh.rotateAt = randBetween(0.01, 0.04);
    scene.add(mesh);
    crystals.push(mesh);
  });
}

//////////////////////////////
// functions to call elsewhere
//////////////////////////////

//see https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene section "Rendering a scene" on using RAF vs setInterval
function render() {
    requestAnimationFrame( render );
    crystals.forEach(function(mesh) {
      mesh.rotation.x += mesh.rotateAt;
      mesh.rotation.y += mesh.rotateAt;
    });
    renderer.render( scene, camera );
}

function randBetween(min, max) {
  return (Math.random() * (max - min)) + min;
}

// call render to get it all working
for ( var i = 0; i < crystalNum; i ++ ) {
  createMesh();
}
render();
