import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ACESFilmicToneMapping } from "three";
import { gsap } from "gsap";
import { TweenLite } from "gsap/gsap-core";

/**
 * Loader
 */
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Load textures
 */
const bionicArmPurple = textureLoader.load(
  "/models/Bionic/textures/Bionic Color.jpg"
);
bionicArmPurple.flipY = false;
bionicArmPurple.encoding = THREE.sRGBEncoding;

const bionicArmRed = textureLoader.load(
  "/models/Bionic/textures/Bionic Color Red.jpg"
);
bionicArmRed.flipY = false;
bionicArmRed.encoding = THREE.sRGBEncoding;

const bionicArmYellow = textureLoader.load(
  "/models/Bionic/textures/Bionic Color Yellow.jpg"
);
bionicArmYellow.flipY = false;
bionicArmYellow.encoding = THREE.sRGBEncoding;

const bionicArmScrew = textureLoader.load(
  "/models/Bionic/textures/Screw Baked.jpg"
);
bionicArmScrew.flipY = false;
bionicArmScrew.encoding = THREE.sRGBEncoding;

const bionicArmPlate = textureLoader.load(
  "/models/Bionic/textures/Japanese side Baked.jpg"
);
bionicArmPlate.flipY = false;
bionicArmPlate.encoding = THREE.sRGBEncoding;

const bionicArmDot = textureLoader.load(
  "/models/Bionic/textures/Japanese button Baked.jpg"
);
bionicArmDot.flipY = false;
bionicArmDot.encoding = THREE.sRGBEncoding;

/**
 * Base
 */
const changeColorButton = document.querySelector(".btn");

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
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.needsUpdate = true;
    }
  });
};

/**
 * Models
 */

let bionicArm;

// Bionicarm material
const bionicarmPurpleMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmPurple,
});
const bionicarmRedMaterial = new THREE.MeshBasicMaterial({ map: bionicArmRed });
const bionicarmYellowMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmYellow,
});

// Other materials
const screwMaterial = new THREE.MeshBasicMaterial({ map: bionicArmScrew });
const plateMaterial = new THREE.MeshBasicMaterial({ map: bionicArmPlate });
const dotMaterial = new THREE.MeshBasicMaterial({ map: bionicArmDot });

let bionicArmBase;

gltfLoader.load("/models/Bionic/Bionic arm.gltf", (gltf) => {
  bionicArm = gltf.scene;

  bionicArmBase = gltf.scene.children[0].children[0];
  const bionicArmScrews = gltf.scene.children[0].children[1];
  const bionicArmPlate = gltf.scene.children[0].children[2];
  const bionicArmDot = gltf.scene.children[0].children[3];

  // bionicArm.traverse(function (child) {
  //   if (child instanceof THREE.Mesh) {
  //     console.log(child);
  //     child.material = bionicarmRedMaterial;
  //   }
  // });

  bionicArmBase.material = bionicarmPurpleMaterial;
  bionicArmScrews.material = screwMaterial;
  bionicArmPlate.material = plateMaterial;
  bionicArmDot.material = dotMaterial;

  bionicArm.scale.set(50, 50, 50);
  bionicArm.position.set(3, 0.6, 0);
  bionicArm.rotation.x = Math.PI / 2;
  scene.add(bionicArm);

  // gui
  //   .add(bionicArm.rotation, "x")
  //   .min(-Math.PI)
  //   .max(Math.PI)
  //   .step(0.01)
  //   .name("rotationx");
  // gui
  //   .add(bionicArm.rotation, "y")
  //   .min(-Math.PI)
  //   .max(Math.PI)
  //   .step(0.01)
  //   .name("rotationy");
  // gui
  //   .add(bionicArm.rotation, "z")
  //   .min(-Math.PI)
  //   .max(Math.PI)
  //   .step(0.01)
  //   .name("rotationz");

  updateAllMaterials();
});

/**
 * Click events
 */

gsap.defaults({ ease: "power1.in" });

const purpleButton = document.querySelector(".color-overlay-purple");
const redButton = document.querySelector(".color-overlay-red");
const yellowButton = document.querySelector(".color-overlay-yellow");

purpleButton.addEventListener("click", () => {
  bionicArmBase.material = bionicarmPurpleMaterial;

  gsap.to(bionicArm.rotation, {
    z: Math.PI * 12,
    duration: 2,
  });
});
redButton.addEventListener("click", () => {
  bionicArmBase.material = bionicarmRedMaterial;
});
yellowButton.addEventListener("click", () => {
  bionicArmBase.material = bionicarmYellowMaterial;
});

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
renderer.toneMappingExposure = 1;
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
