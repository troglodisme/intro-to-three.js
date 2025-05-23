//Creating a basic scene to display a cube

import * as THREE from 'three';

const scene = new THREE.Scene();

//Parameters for the camear: Field of view, aspect ratio, near and far clipping planes
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//create cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 1, 1); // Position it to shine from above
// scene.add(directionalLight);

//more about materials https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs


