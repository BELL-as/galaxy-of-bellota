// advanced-galaxy.js

// Initialize Three.js
import * as THREE from 'three';

let scene, camera, renderer, hearts, particles, controls;

function init() {
    // Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Star Field Background
    const starGeometry = new THREE.Geometry();
    for (let i = 0; i < 10000; i++) {
        const star = new THREE.Vector3(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
        );
        starGeometry.vertices.push(star);
    }
    const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Hearts
    hearts = []; 
    const heartGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
    for (let i = 0; i < 5; i++) {
        let heart = new THREE.Mesh(heartGeometry, heartMaterial);
        heart.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        scene.add(heart);
        hearts.push(heart);
    }

    // Particle Effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = Math.random() * 100 - 50;
        positions[i * 3 + 1] = Math.random() * 100 - 50;
        positions[i * 3 + 2] = Math.random() * 100 - 50;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Camera Position
    camera.position.z = 5;

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    hearts.forEach(heart => {
        heart.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

window.onload = init;