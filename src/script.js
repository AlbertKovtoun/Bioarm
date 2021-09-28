import "./style.scss"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { gsap } from "gsap"
import {
  bionicArmToPurple,
  bionicArmToRed,
  bionicArmToYellow,
} from "./change-arm-color"

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
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Axishelper
 */
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

/**
 * Models
 */

let bionicArm

// Bionicarm material
const bionicarmPurpleMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmPurple,
})
const bionicarmRedMaterial = new THREE.MeshBasicMaterial({ map: bionicArmRed })
const bionicarmYellowMaterial = new THREE.MeshBasicMaterial({
  map: bionicArmYellow,
})

// Other materials
const screwMaterial = new THREE.MeshBasicMaterial({ map: bionicArmScrew })
const plateMaterial = new THREE.MeshBasicMaterial({ map: bionicArmPlate })
const dotMaterial = new THREE.MeshBasicMaterial({ map: bionicArmDot })
const boardMaterial = new THREE.MeshBasicMaterial({ map: bionicArmBoard })
const chipMaterial = new THREE.MeshBasicMaterial({ map: bionicArmChip })

let bionicArmBase

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
  const bionicArmCover = bionicArm.children.find((child) => {
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

  bionicArm.scale.set(50, 50, 50)
  bionicArm.position.set(0, 0.6, 0)
  bionicArm.rotation.x = Math.PI / 2
  scene.add(bionicArm)
})

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
  75,
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

gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001)

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

export {
  bionicArm,
  bionicArmBase,
  bionicarmPurpleMaterial,
  bionicarmRedMaterial,
  bionicarmYellowMaterial,
}
