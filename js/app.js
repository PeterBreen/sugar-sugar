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

var mesh;
var length = randBetween(1, 6);
var width = randBetween(1, 8);

//create base shape
var shape = new THREE.Shape();
shape.moveTo( randBetween(0,1.5),randBetween(0,1.5) );
shape.lineTo( randBetween(0,1.5), width );
shape.lineTo( length, width );
shape.lineTo( length, randBetween(0,1.5) );
shape.lineTo( randBetween(0,1.5), randBetween(0,1.5) );

//extrude shape (see https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry)
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
    side: THREE.doubleSide,
    blending: THREE.AdditiveBlending
  });
  mesh = new THREE.Mesh(geometry, material) ;
  mesh.geometry.center();
  scene.add(mesh);
  render();
});

//////////////////////////////
// functions to call elsewhere
//////////////////////////////

//see https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene section "Rendering a scene" on using RAF vs setInterval
function render() {
    requestAnimationFrame( render );
    mesh.rotation.x += 0.03;
    mesh.rotation.y += 0.03;
    mesh.geometry.center();
    renderer.render( scene, camera );
}

function randBetween(min, max) {
  return (Math.random() * (max - min)) + min;
}
