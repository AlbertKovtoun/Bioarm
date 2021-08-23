import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ACESFilmicToneMapping } from "three";

/**
 * Loader
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Axishelper
 */
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

/**
 * Upadte all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      //   child.material.envMap = environmentMap;
      child.material.envMapIntensity = debugObject.envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Models
 */
gltfLoader.load("/models/Bionic/Bionic arm.gltf", (gltf) => {
  let bionicArm = gltf.scene;

  bionicArm.scale.set(50, 50, 50);
  bionicArm.position.set(3, 0.6, 0);
  bionicArm.rotation.x = Math.PI / 2;

  gui
    .add(bionicArm.rotation, "x")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("rotationx");
  gui
    .add(bionicArm.rotation, "y")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("rotationy");
  gui
    .add(bionicArm.rotation, "z")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("rotationz");
  scene.add(bionicArm);

  bionicArm.map

  updateAllMaterials();
});

/**
 * Particles
 */
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);

// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true,
// });

// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

gui
  .add(renderer, "toneMapping", {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  })
  .onFinishChange(() => {
    renderer.toneMapping = Number(renderer.toneMapping);
    updateAllMaterials();
  });

gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
