import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";

export default class Renderer {
  canvas: Element;
  sizes: Sizes;
  scene: THREE.Scene;
  camera: Camera;
  instance: THREE.WebGLRenderer;

  constructor(
    canvas: Element,
    sizes: Sizes,
    scene: THREE.Scene,
    camera: Camera
  ) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.scene = scene;
    this.camera = camera;

    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.setInstance();
  }

  setInstance() {
    this.instance.useLegacyLights = false;
    // this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
