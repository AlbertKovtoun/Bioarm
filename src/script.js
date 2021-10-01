import "./style.scss"
import * as THREE from "three"
import { Pane } from "tweakpane"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Stats from "stats.js"

import {
  bionicArmToPurple,
  bionicArmToRed,
  bionicArmToYellow,
} from "./change-arm-color"
import { animateOnScroll } from "./animate-arm"
import { textReveal } from "./text-reveal"

/**
 * Stats
 */
// const stats = new Stats()
// stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

/**
 * Loader
 */
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Load textures
 */
const bionicArmPurple = textureLoader.load(
  "/models/Bionic/textures/Bionic Color.jpg"
)
bionicArmPurple.flipY = false
bionicArmPurple.encoding = THREE.sRGBEncoding

const bionicArmRed = textureLoader.load(
  "/models/Bionic/textures/Bionic Color Red.jpg"
)
bionicArmRed.flipY = false
bionicArmRed.encoding = THREE.sRGBEncoding

const bionicArmYellow = textureLoader.load(
  "/models/Bionic/textures/Bionic Color Yellow.jpg"
)
bionicArmYellow.flipY = false
bionicArmYellow.encoding = THREE.sRGBEncoding

const bionicArmScrew = textureLoader.load(
  "/models/Bionic/textures/Screw Baked.jpg"
)
bionicArmScrew.flipY = false
bionicArmScrew.encoding = THREE.sRGBEncoding

const bionicArmPlate = textureLoader.load(
  "/models/Bionic/textures/Japanese side Baked.jpg"
)
bionicArmPlate.flipY = false
bionicArmPlate.encoding = THREE.sRGBEncoding

const bionicArmDot = textureLoader.load(
  "/models/Bionic/textures/Japanese button Baked.jpg"
)
bionicArmDot.flipY = false
bionicArmDot.encoding = THREE.sRGBEncoding

const bionicArmBoard = textureLoader.load(
  "/models/Bionic/textures/Circuit board Baked.png"
)
bionicArmBoard.flipY = false
bionicArmBoard.encoding = THREE.sRGBEncoding

const bionicArmChip = textureLoader.load(
  "/models/Bionic/textures/Chip Baked.png"
)
bionicArmChip.flipY = false
bionicArmChip.encoding = THREE.sRGBEncoding

/**
 * Base
 */

// Debug
export const pane = new Pane()
pane.hidden = !pane.hidden

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Model
 */
export let bionicArm

// Bionicarm material
export const bionicarmPurpleMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmPurple,
})
export const bionicarmRedMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmRed,
})
export const bionicarmYellowMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmYellow,
})

// Other materials
const screwMaterial = new THREE.MeshBasicMaterial({ map: bionicArmScrew })
const plateMaterial = new THREE.MeshBasicMaterial({ map: bionicArmPlate })
const dotMaterial = new THREE.MeshBasicMaterial({ map: bionicArmDot })
const boardMaterial = new THREE.MeshBasicMaterial({ map: bionicArmBoard })
const chipMaterial = new THREE.MeshBasicMaterial({ map: bionicArmChip })

export let bionicArmBase
export let bionicArmCover

gltfLoader.load("/models/Bionic/Bionic arm.glb", (gltf) => {
  bionicArm = gltf.scene

  //Fetch the names of the objects
  bionicArmBase = bionicArm.children.find((child) => {
    return child.name === "base"
  })
  const bionicArmScrews = bionicArm.children.find((child) => {
    return child.name === "screws"
  })
  const bionicArmPlate = bionicArm.children.find((child) => {
    return child.name === "japaneseSide"
  })
  const bionicArmDot = bionicArm.children.find((child) => {
    return child.name === "japaneseButton"
  })
  bionicArmCover = bionicArm.children.find((child) => {
    return child.name === "cover"
  })
  const bionicArmBoard = bionicArm.children.find((child) => {
    return child.name === "board"
  })
  const bionicArmChip = bionicArm.children.find((child) => {
    return child.name === "chip"
  })

  //Assign Materials
  bionicArmBase.material = bionicarmPurpleMaterial
  bionicArmCover.material = bionicarmPurpleMaterial
  bionicArmScrews.material = screwMaterial
  bionicArmPlate.material = plateMaterial
  bionicArmDot.material = dotMaterial
  bionicArmBoard.material = boardMaterial
  bionicArmChip.material = chipMaterial

  bionicArm.scale.set(28, 28, 28)
  bionicArm.position.set(2, 0.3, 0.2)
  bionicArm.rotation.x = Math.PI / 2
  // bionicArm.rotation.y = -Math.PI / 2
  scene.add(bionicArm)
})

/**
 * Animate on scroll
 */
setTimeout(() => {
  animateOnScroll()
}, 1000)

textReveal()
/**
 * Click events
 */
bionicArmToPurple(5)
bionicArmToRed(5)
bionicArmToYellow(5)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true
controls.enabled = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001)

/**
 * Animate
 */
const tick = () => {
  // stats.begin()
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
  // stats.end()
}

tick()
