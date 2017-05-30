//
// Camera and scene
//

var scene = new THREE.Scene();

//consider modifying this later for a full screen effect
var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );

camera.zoom = 5;
camera.updateProjectionMatrix();
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );

//puts canvas element in DOM
document.body.appendChild( renderer.domElement );


//
// Create sugar particle
//

var mesh;
var length = 12, width = 8;

//create base shape
var shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( length, 0 );
shape.lineTo( 0, 0 );

//extrude shape (see https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry)
var extrudeSettings = {
  steps: 2,
  amount: 16,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 1
};
var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshBasicMaterial( { color: 0x007fff } );
mesh = new THREE.Mesh(geometry, material) ;

scene.add(mesh);

//
// render to dom
//

//see https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene section "Rendering a scene" on using RAF vs setInterval
function render() {
    requestAnimationFrame( render );
    mesh.rotation.x += 0.03;
    mesh.rotation.y += 0.03;
    renderer.render( scene, camera );
}
render();
