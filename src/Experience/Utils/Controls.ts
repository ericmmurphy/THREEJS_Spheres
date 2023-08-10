import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import Sizes from "./Sizes";

export default class Controls extends EventEmitter {
  sizes: Sizes;
  coords: THREE.Vector2;

  constructor(sizes: Sizes) {
    super();

    this.sizes = sizes;
    this.coords = new THREE.Vector2();

    window.addEventListener("mousemove", (event) => {
      this.coords.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.coords.y = -(event.clientY / this.sizes.height) * 2 + 1;

      this.trigger("mousemove");
    });

    window.addEventListener("click", () => {
      this.trigger("click");
    });
  }
}
