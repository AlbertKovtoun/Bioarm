import gsap from "gsap"

export const textReveal = () => {
  const tl = gsap.timeline()

  tl.from(".landing-page *", {
    y: 50,
    ease: "power4.out",
    duration: 1.5,
    delay: 1,
    skewY: 2,
    opacity: 0,
    stagger: {
      amount: 0.3,
    },
  })
}
