import * as THREE from "three";
import Sizes from "./Utils/Sizes";

const cameraMultiplier = 7.5;

export default class Camera {
  canvas: Element;
  sizes: Sizes;
  scene: THREE.Scene;
  instance: THREE.PerspectiveCamera;

  constructor(canvas: Element, sizes: Sizes, scene: THREE.Scene) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.scene = scene;

    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.setInstance();
  }

  setInstance() {
    if (this.sizes.width >= this.sizes.height) {
      this.instance.position.set(0, 0, -1.0 * cameraMultiplier);
      this.instance.lookAt(new THREE.Vector3(0, 0.75, 0));
      this.instance.rotation.z = Math.PI * 0.1125;
    } else {
      this.instance.position.set(0, 0, -1.5 * cameraMultiplier);
      this.instance.lookAt(new THREE.Vector3(0, 0, 0));
    }

    this.scene.add(this.instance);
  }

  resize() {
    if (this.sizes.width >= this.sizes.height) {
      this.instance.position.set(0, 0, -1.0 * cameraMultiplier);
      this.instance.lookAt(new THREE.Vector3(0, 0.75, 0));
      this.instance.rotation.z = Math.PI * 0.1125;
    } else {
      this.instance.position.set(0, 0, -1.5 * cameraMultiplier);
      this.instance.lookAt(new THREE.Vector3(0, 0, 0));
    }

    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
