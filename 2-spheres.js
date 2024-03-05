import * as THREE from 'three';

// Let's import the OrbitControls module, or class, for enabling camera control (pan, zoom, rotate) with mouse
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// add the renderer's canvas element to our document body 
document.body.appendChild(renderer.domElement);

//At the moment this is just a variable, but could we control it with external data?
let spheresQuantity = 50;

// Function to generate a specified number of spheres with random sizes and positions
function generateSpheres(numSpheres) {

    for (let i = 0; i < numSpheres; i++) {

        // Create a sphere geometry with a random size
        const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const sphere = new THREE.Mesh(geometry, material);

        // Set the sphere's position to a random value within a range
        sphere.position.x = Math.random() * 20 - 10;
        sphere.position.y = Math.random() * 20 - 10;
        sphere.position.z = Math.random() * 20 - 10;

        // Add the sphere to the scene
        scene.add(sphere);
    }
}

// Generate the spheres with the specified quantity
generateSpheres(spheresQuantity);

camera.position.z = 30;

// Initialize OrbitControls for interactive camera control
const controls = new OrbitControls(camera, renderer.domElement);

let isMoving = false;
let angle = 0;


//Control the animation 
function animate() {
    requestAnimationFrame(animate);

    if (isMoving) {
        angle += 0.01;
        // Calculate the new positions based on the angle
        camera.position.x = Math.sin(angle) * 30;
        camera.position.z = Math.cos(angle) * 30;
        camera.lookAt(scene.position);
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Function to toggle the camera movement on and off
function toggleCameraMovement() {
    isMoving = !isMoving;
}

// Add an this functionality to out html button
document.getElementById('animateCamera').addEventListener('click', toggleCameraMovement);

