import gsap from "gsap";
import {
  bionicArm,
  bionicArmBase,
  bionicarmPurpleMaterial,
  bionicarmRedMaterial,
  bionicarmYellowMaterial,
} from "./script";

gsap.defaults({ ease: "power3.inOut" });

const purpleButton = document.querySelector(".color-overlay-purple");
const redButton = document.querySelector(".color-overlay-red");
const yellowButton = document.querySelector(".color-overlay-yellow");

const bionicArmToPurple = (time) => {
  purpleButton.addEventListener("click", () => {
    gsap.to(bionicArm.rotation, {
      z: "+=" + Math.PI * 12,
      duration: time,
      onStart: () => {
        window.setTimeout(() => {
          bionicArmBase.material = bionicarmPurpleMaterial;
        }, (time * 1000) / 2);
      },
      onComplete: () => {
        bionicArm.rotation.z = 0;
      },
    });
  });
};

const bionicArmToRed = (time) => {
  redButton.addEventListener("click", () => {
    gsap.to(bionicArm.rotation, {
      z: "+=" + Math.PI * 12,
      duration: time,
      onStart: () => {
        window.setTimeout(() => {
          bionicArmBase.material = bionicarmRedMaterial;
        }, (time * 1000) / 2);
      },
      onComplete: () => {
        bionicArm.rotation.z = 0;
      },
    });
  });
};

const bionicArmToYellow = (time) => {
  yellowButton.addEventListener("click", () => {
    gsap.to(bionicArm.rotation, {
      z: "+=" + Math.PI * 12,
      duration: time,
      onStart: () => {
        window.setTimeout(() => {
          bionicArmBase.material = bionicarmYellowMaterial;
        }, (time * 1000) / 2);
      },
      onComplete: () => {
        bionicArm.rotation.z = 0;
      },
    });
  });
};

export { bionicArmToPurple, bionicArmToRed, bionicArmToYellow };
