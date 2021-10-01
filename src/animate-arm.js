import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { bionicArm, pane } from "./script"

export const animateOnScroll = () => {
  //Arm Position Tweaks
  pane.addInput(bionicArm.position, "x", {
    min: -5,
    max: 5,
    step: 0.01,
    label: "armPosX",
  })
  pane.addInput(bionicArm.position, "y", {
    min: -5,
    max: 5,
    step: 0.01,
    label: "armPosY",
  })
  pane.addInput(bionicArm.position, "z", {
    min: -5,
    max: 5,
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

  const tl = gsap.timeline()
  const scrubAmount = true

  //?1st Position
  tl.to(bionicArm.position, {
    x: 0.35,
    y: 0.1,
    z: 1.8,

    scrollTrigger: {
      trigger: ".design-container",
      scrub: scrubAmount,
      // markers: true,
      start: "top bottom",
      end: "center center",
    },
  })
    .to(bionicArm.rotation, {
      x: 0,
      y: -Math.PI / 2,
      z: -Math.PI / 2,

      scrollTrigger: {
        trigger: ".design-container",
        scrub: scrubAmount,
        // markers: true,
        start: "top bottom",
        end: "center center",
      },
    })

    //?2nd Position
    .to(bionicArm.position, {
      x: 0,
      y: 0.2,
      z: 1.8,
      scrollTrigger: {
        trigger: ".materials-container",
        scrub: scrubAmount,
        markers: false,
        start: "top bottom",
        end: "center center",
      },
    })
    .to(bionicArm.rotation, {
      x: 0.45,
      y: 0,
      z: 0,
      scrollTrigger: {
        trigger: ".materials-container",
        scrub: scrubAmount,
        markers: false,
        start: "top bottom",
        end: "center center",
      },
    })

  //?3rd Position
  tl.to(bionicArm.position, {
    x: 0,
    y: -0.5,
    z: 2.2,
    scrollTrigger: {
      trigger: ".core-container",
      scrub: scrubAmount,
      markers: false,
      start: "top bottom",
      end: "center center",
    },
  }).to(bionicArm.rotation, {
    x: 1.57,
    y: 0,
    z: 0,
    scrollTrigger: {
      trigger: ".core-container",
      scrub: scrubAmount,
      markers: false,
      start: "top bottom",
      end: "center center",
    },
  })

  tl.invalidate()
}
