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

    this.sphereGroup = new THREE.Group();
    this.sphereGroup.add(this.sphere.mesh!, ...this.textMeshArr);
    this.sphereGroup.position.x = position.x;
    this.sphereGroup.position.y = position.y;
    this.sphereGroup.position.z = position.z;

    // this.sphereGroup.rotation.y = Math.PI;
    // this.sphereGroup.rotation.y = Math.PI + (0.0 * (Math.PI * 2.0)) / 5.0;

    this.update();

    return this;
  }

  update() {
    if (this.sizes.width >= this.sizes.height)
      this.sphereGroup.lookAt(this.camera.instance.position);
    else {
      this.sphereGroup.rotation.y = Math.PI;
      this.sphereGroup.rotation.z = Math.PI;
    }
  }
}
