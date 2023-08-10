import * as THREE from "three";
import Environment from "./Environment";
import Sizes from "../Utils/Sizes";
import Resources from "../Utils/Resources";
import { callbackObject } from "../Utils/EventEmitter";
// import Floor from "./Floor";
import Spheres from "./Spheres";
import Controls from "../Utils/Controls";
import Camera from "../Camera";
import Raycaster from "../Utils/Raycaster";

export default class World {
  sizes: Sizes;
  controls: Controls;
  scene: THREE.Scene;
  resources: Resources;
  camera: Camera;
  raycaster: Raycaster;
  spheres: Spheres | null;
  environment: Environment | null;
  callbackObj: callbackObject;

  constructor(
    sizes: Sizes,
    controls: Controls,
    scene: THREE.Scene,
    resources: Resources,
    camera: Camera,
    raycaster: Raycaster
  ) {
    this.sizes = sizes;
    this.controls = controls;
    this.scene = scene;
    this.resources = resources;
    this.camera = camera;
    this.raycaster = raycaster;
    this.spheres = null;
    this.environment = null;

    this.callbackObj = {
      callbackName: "startWorld",
      callback: () => {
        console.log("resources are ready");

        this.spheres = new Spheres(
          this.sizes,
          this.controls,
          this.scene,
          this.resources,
          this.camera,
          this.raycaster
        );
        this.environment = new Environment(this.resources, this.scene);
      },
    };
    this.resources.on("ready", this.callbackObj);

    // // I'll need to despose of old meshes before this works
    // this.sizes.on("resize", () => {
    //   this.spheres.setSpheres();
    // });
  }
}
