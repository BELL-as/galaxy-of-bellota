// Import Three.js
import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create heart shape
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(1, 1, 1, -1, 0, -1);
heartShape.bezierCurveTo(-1, -1, -1, 1, 0, 0);

// Geometry and material
const geometry = new THREE.ExtrudeGeometry(heartShape, { depth: 1, bevelEnabled: false });
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const heartMesh = new THREE.Mesh(geometry, material);
scene.add(heartMesh);

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    heartMesh.rotation.x += 0.01;
    heartMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();