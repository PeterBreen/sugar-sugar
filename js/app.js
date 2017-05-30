var THREE = require('three');
var scene = new THREE.Scene();

//consider modifying this later for a full screen effect
var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );

camera.zoom = 5;
camera.updateProjectionMatrix();
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );

//puts canvas element in DOM
document.body.appendChild( renderer.domElement );

//see three.js docs on why it uses RAF instead of a SetInterval
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();
