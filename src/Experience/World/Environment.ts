import * as THREE from "three";
import Resources from "../Utils/Resources";

export default class Environment {
  resources: Resources;
  scene: THREE.Scene;
  ambientLight: THREE.AmbientLight;
  sunLight: THREE.DirectionalLight;
  spotLight: THREE.SpotLight;
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
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-7.5, 0, -15.0);
    this.scene.add(this.sunLight);

    /**
     * Set Spotlight
     */
    this.spotLight = new THREE.SpotLight(
      0xfdfbd3,
      2.0,
      1.5,
      Math.PI * 0.2,
      0.125,
      0.5
    );
    this.spotLight.position.set(0, 0.45, -6.0);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.scene.add(this.spotLight);

    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.environment = this.environmentMap.texture;

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
