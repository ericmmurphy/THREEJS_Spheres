import * as THREE from "three";
import { callbackObject } from "../Utils/EventEmitter";
import Controls from "./Controls";
import Resources from "./Resources";
import Camera from "../Camera";

export default class Raycaster {
  controls: Controls;
  resources: Resources;
  camera: Camera;
  raycaster: THREE.Raycaster;
  mouseMoveCastRayCallbackObj: callbackObject;
  readyCallbackObj: callbackObject;

  constructor(controls: Controls, resources: Resources, camera: Camera) {
    this.controls = controls;
    this.resources = resources;
    this.camera = camera;

    this.raycaster = new THREE.Raycaster();

    this.mouseMoveCastRayCallbackObj = {
      callbackName: "castRay",
      callback: () => {
        // console.log("casting ray");
        // console.log(this.raycaster);
        this.castRay();
      },
    };

    this.readyCallbackObj = {
      callbackName: "raycasterReady",
      callback: () => {
        console.log("raycaster ready");
        this.controls.on("mousemove", this.mouseMoveCastRayCallbackObj);
      },
    };

    this.resources.on("ready", this.readyCallbackObj);
  }

  castRay() {
    this.raycaster.setFromCamera(this.controls.coords, this.camera.instance);
  }
}
