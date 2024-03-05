import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//this module allows us to export the current scene to a 3d file
//to convert to STL you can use https://products.aspose.app/3d/conversion/gltf-to-stl
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

let camera, scene, renderer;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const cubeWidth = 1;
    const cubeDepth = 1;
    const spacing = 1.5;

    for (let i = 0; i < 20; i++) {
        const cubeHeight = Math.random() * 5 + 1;
        const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
        
        const grayScale = Math.floor(cubeHeight / 6 * 255);
        const color = `rgb(${grayScale},${grayScale},${grayScale})`;
        
        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (i - 9.5) * spacing;
        cube.position.y = cubeHeight / 2;
        scene.add(cube);
    }
    
    camera.position.z = 30;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    document.getElementById('exportButton').addEventListener('click', exportScene);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//Export scene utility
//Remember to uncomment the export button in your index.html 
function exportScene() {
    const exporter = new GLTFExporter();
    exporter.parse(scene, function (gltf) {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.href = url;
        link.download = 'threejs_scene.gltf';
        link.click();
    });
}
