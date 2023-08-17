import * as THREE from "three";
import Resources from "../Utils/Resources";
import { spheresMultiplier } from "./Sphere";

export default class Environment {
  resources: Resources;
  scene: THREE.Scene;
  ambientLight: THREE.AmbientLight;
  sunLight: THREE.DirectionalLight;
  spotLight: THREE.SpotLight;
  // spotLightHelper: THREE.SpotLightHelper;
  environmentMap: any;

  constructor(resources: Resources, scene: THREE.Scene) {
    this.resources = resources;
    this.scene = scene;

    /**
     * Set Ambient Light
     */
    this.ambientLight = new THREE.AmbientLight(0xfdfbd3, 0.8);
    this.scene.add(this.ambientLight);

    /**
     * Set Directional Light
     */
    this.sunLight = new THREE.DirectionalLight(0xe2725b, 1.0);
    // this.sunLight = new THREE.DirectionalLight(0xfdfbd3, 0.6);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-7.5, 0, -15.0);
    this.scene.add(this.sunLight);

    /**
     * Set Spotlight
     */
    // this.spotLight = new THREE.SpotLight(
    //   0xfdfbd3,
    //   2.0,
    //   1.5,
    //   Math.PI * 0.2,
    //   0.125,
    //   0.5
    // );
    this.spotLight = new THREE.SpotLight(
      0xfdfbd3,
      5.0,
      1.5,
      Math.PI * 0.25,
      0.125,
      0.5
    );
    // this.spotLight.position.set(0, 0.45, -6.0);
    this.spotLight.position.set(0.075, 0.5, -6.0);
    // this.spotLight.lookAt(
    //   new THREE.Vector3(-0.75, 0, -1.0 * spheresMultiplier)
    // );
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.scene.add(this.spotLight);

    // this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    // this.scene.add(this.spotLightHelper);

    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1.0;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = this.environmentMap.texture;
    this.scene.environment = this.environmentMap.texture;
    this.scene.backgroundBlurriness = 0.05;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environmentMap.updateMaterial();
  }
}
