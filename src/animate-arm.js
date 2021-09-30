import gsap from "gsap"
import { bionicArm, pane } from "./script"

export const animateOnScroll = () => {
  //Arm Position Tweaks
  pane.addInput(bionicArm.position, "x", {
    min: -2,
    max: 2,
    step: 0.01,
    label: "armPosX",
  })
  pane.addInput(bionicArm.position, "y", {
    min: -2,
    max: 2,
    step: 0.01,
    label: "armPosY",
  })
  pane.addInput(bionicArm.position, "z", {
    min: -2,
    max: 2,
    step: 0.01,
    label: "armPosZ",
  })

  //Arm Rotation Tweaks
  pane.addInput(bionicArm.rotation, "x", {
    min: -5,
    max: 5,
    step: 0.01,
    label: "armRotX",
  })
  pane.addInput(bionicArm.rotation, "y", {
    min: -5,
    max: 5,
    step: 0.01,
    label: "armRotY",
  })
  pane.addInput(bionicArm.rotation, "z", {
    min: -5,
    max: 5,
    step: 0.01,
    label: "armRotZ",
  })

  gsap.registerPlugin(ScrollTrigger)
  console.log(ScrollTrigger)

  const tl = gsap.timeline()

  //?1st Position
  tl.to(bionicArm.position, {
    x: 0.35,
    y: 0.1,
    z: 1.8,
    duration: 2,
  })
  tl.to(
    bionicArm.rotation,
    {
      y: -Math.PI / 2,
      duration: 2,
    },
    "<"
  )
}
