import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Camera from "./Camera";
import sources from "./sources";
import Renderer from "./Renderer";
import World from "./World/World";
import { callbackObject } from "./Utils/EventEmitter";
import Controls from "./Utils/Controls";
import Raycaster from "./Utils/Raycaster";

export default class Experience {
  canvas: Element;
  sizes: Sizes;
  controls: Controls;
  time: Time;
  scene: THREE.Scene;
  resources: Resources;
  camera: Camera;
  renderer: Renderer;
  world: World;
  raycaster: Raycaster;
  resizeCallbackObj: callbackObject;
  // mousemoveCallbackObj: callbackObject;
  // clickCallbackObj: callbackObject;
  updateCallbackObj: callbackObject;

  constructor(canvas: Element) {
    this.canvas = canvas;

    this.sizes = new Sizes();
    this.controls = new Controls(this.sizes);
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this.canvas, this.sizes, this.scene);
    this.renderer = new Renderer(
      this.canvas,
      this.sizes,
      this.scene,
      this.camera
    );
    this.raycaster = new Raycaster(this.controls, this.resources, this.camera);
    this.world = new World(
      this.sizes,
      this.controls,
      this.scene,
      this.resources,
      this.camera,
      this.raycaster
    );

    /**
     * Resize Event
     */
    this.resizeCallbackObj = {
      callbackName: "resize",
      callback: () => {
        // console.log("resize happened");

        this.resize();
      },
    };
    this.sizes.on("resize", this.resizeCallbackObj);

    // /**
    //  * Mouse Move Event
    //  */
    // this.mousemoveCallbackObj = {
    //   callbackName: "mousemove",
    //   callback: () => {
    //     console.log(this.controls.coords);
    //   },
    // };
    // this.controls.on("mousemove", this.mousemoveCallbackObj);

    // /**
    //  * Mouse Click Event
    //  */
    // this.clickCallbackObj = {
    //   callbackName: "click",
    //   callback: () => {
    //     console.log(this.controls.coords);
    //   },
    // };
    // this.controls.on("click", this.clickCallbackObj);

    /**
     * Tick Event
     */
    this.updateCallbackObj = {
      callbackName: "updateExperience",
      callback: () => {
        // console.log("tick");

        this.update();
      },
    };
    this.time.on("tick", this.updateCallbackObj);
  }

  resize() {
    if (this.world.spheres) this.world.spheres.setSpheres();
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    // this.camera.update();

    if (this.world.spheres) this.world.spheres.spheresAnimation();

    this.renderer.update();
  }
}
