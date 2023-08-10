import * as THREE from "three";
import Resources from "../Utils/Resources";

export const sphereSize = 0.65;
export const spheresMultiplier = 4.5;

export default class Sphere {
  resources: Resources;
  geometry: THREE.SphereGeometry | null;
  textures: any;
  material: THREE.MeshStandardMaterial | null;
  mesh: THREE.Mesh | null;

  constructor(resources: Resources, name: string) {
    this.resources = resources;
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh(name);

    // this.disposeSphere();
    return this;
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(sphereSize, 32, 32);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.bluePlasticColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(2.5, 2.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.bluePlasticNormalTexture;
    this.textures.normal.repeat.set(2.5, 2.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;

    this.textures.ao = this.resources.items.bluePlasticAOTexture;
    this.textures.ao.repeat.set(2.5, 2.5);
    this.textures.ao.wrapS = THREE.RepeatWrapping;
    this.textures.ao.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    // this.material = new THREE.MeshMatcapMaterial();
    // this.material.matcap = this.resources.items.matcapTexture;
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      aoMap: this.textures.ao,
      aoMapIntensity: 1.0,
    });
  }

  setMesh(name: string) {
    this.mesh = new THREE.Mesh(this.geometry!, this.material!);
    this.mesh.name = name;
    this.mesh.receiveShadow = true;
  }
}
