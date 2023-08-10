import * as THREE from "three";
import Sizes from "../Utils/Sizes";
import Resources from "../Utils/Resources";
import Camera from "../Camera";
import Text from "./Text";
import Sphere from "./Sphere";

export default class SphereGroup {
  sizes: Sizes;
  resources: Resources;
  camera: Camera;
  sphere: Sphere;
  textObjArr: Text[];
  textMeshArr: any;
  sphereGroup: THREE.Group;

  constructor(
    sizes: Sizes,
    resources: Resources,
    camera: Camera,
    position: THREE.Vector3,
    name: string,
    textObjArr: Text[]
  ) {
    this.sizes = sizes;
    this.resources = resources;
    this.camera = camera;

    this.sphere = new Sphere(this.resources, name);

    this.textObjArr = textObjArr;
    this.textMeshArr = textObjArr.map((el) => el.mesh);
    // console.log(this.textMeshArr);

    this.sphereGroup = new THREE.Group();
    this.sphereGroup.add(this.sphere.mesh!, ...this.textMeshArr);
    this.sphereGroup.position.x = position.x;
    this.sphereGroup.position.y = position.y;
    this.sphereGroup.position.z = position.z;

    // this.sphereGroup.rotation.y = Math.PI;
    // this.sphereGroup.rotation.y = Math.PI + (0.0 * (Math.PI * 2.0)) / 5.0;

    this.sphereGroupUpdate();

    return this;
  }

  sphereGroupUpdate() {
    if (this.sizes.width >= this.sizes.height) {
      this.sphereGroup.lookAt(this.camera.instance.position);
    } else {
      this.sphereGroup.rotation.x = 0;
      this.sphereGroup.rotation.y = Math.PI;
      this.sphereGroup.rotation.z = Math.PI;
    }
  }

  sphereGroupUpdatePosition(
    position: THREE.Vector3,
    textPositionArr: THREE.Vector3[]
  ) {
    // console.log(this.textMeshArr);
    // console.log(this.sphereGroup);

    this.sphereGroup.position.x = position.x;
    this.sphereGroup.position.y = position.y;
    this.sphereGroup.position.z = position.z;

    textPositionArr.forEach((el: THREE.Vector3, index: number) => {
      // console.log(el);
      // console.log(this.textMeshArr[index]);
      this.textMeshArr[index].position.x = el.x;
      this.textMeshArr[index].position.y = el.y;
      this.textMeshArr[index].position.z = el.z;
    });
  }
}
