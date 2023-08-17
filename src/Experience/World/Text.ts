import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Resources from "../Utils/Resources";

export const textZ = 0.65;

export default class Text {
  resources: Resources;
  geometry: TextGeometry | null;
  material: THREE.MeshStandardMaterial | null;
  mesh: THREE.Mesh | null;

  constructor(resources: Resources, text: string, position: THREE.Vector3) {
    this.resources = resources;
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.setGeometry(text);
    this.setTextures();
    this.setMaterial();
    this.setMesh(position);

    return this;
  }

  setGeometry(text: string) {
    this.geometry = new TextGeometry(text, {
      font: this.resources.items.roboto as any,
      size: 0.225,
      height: 0.05,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.001,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    this.geometry.computeBoundingBox();
    this.geometry.center();
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
  }

  setMesh(position: THREE.Vector3) {
    this.mesh = new THREE.Mesh(this.geometry!, this.material!);
    this.mesh.castShadow = true;
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;

    this.mesh.rotation.z = Math.PI;
  }
}
