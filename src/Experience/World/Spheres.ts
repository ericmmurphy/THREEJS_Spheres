import * as THREE from "three";
import Sizes from "../Utils/Sizes";
import Resources from "../Utils/Resources";
import SphereGroup from "./SphereGroup";
import { spheresMultiplier } from "./Sphere";
import Text, { textZ } from "./Text";
import Camera from "../Camera";
import Raycaster from "../Utils/Raycaster";
import Controls from "../Utils/Controls";
import { callbackObject } from "../Utils/EventEmitter";

export default class Spheres {
  sizes: Sizes;
  controls: Controls;
  scene: THREE.Scene;
  resources: Resources;
  camera: Camera;
  raycaster: Raycaster;
  sphereGroupOneObj: SphereGroup | null;
  sphereGroupTwoObj: SphereGroup | null;
  sphereGroupThreeObj: SphereGroup | null;
  sphereGroupFourObj: SphereGroup | null;
  sphereGroupFiveObj: SphereGroup | null;
  sphereGroupObjsArr: SphereGroup[] | null;
  spheresGroup: THREE.Group | null;
  selectedSphere: number;
  comparison: number;
  objectsToTest: THREE.Object3D<THREE.Event>[];
  intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[];
  testSpheresCallbackObj: callbackObject;

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

    this.sphereGroupOneObj = null;
    this.sphereGroupTwoObj = null;
    this.sphereGroupThreeObj = null;
    this.sphereGroupFourObj = null;
    this.sphereGroupFiveObj = null;

    this.sphereGroupObjsArr = null;
    this.spheresGroup = null;

    this.selectedSphere = 1;
    this.comparison = 0;

    this.setSpheres();

    this.objectsToTest = [];
    this.intersects = [];

    this.testSpheresCallbackObj = {
      callbackName: "testSpheres",
      callback: () => {
        if (!this.spheresGroup) return;
        // if (!this.overlayCanvas.className.split(" ").includes("hidden")) return;

        this.objectsToTest = this.spheresGroup.children.map(
          (el) => el.children[0]
        );

        this.intersects = this.raycaster.raycaster.intersectObjects(
          this.objectsToTest
        );
        console.log(this.intersects);

        this.setSpheresAnimation();
      },
    };

    this.controls.on("click", this.testSpheresCallbackObj);
  }

  setSpheres() {
    if (!this.spheresGroup && this.sizes.width >= this.sizes.height) {
      /**
       * Sphere Group One
       */
      this.sphereGroupOneObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, 0, -1.0 * spheresMultiplier),
        "sphereOne",
        [
          new Text(
            this.resources,
            "About",
            new THREE.Vector3(0, -0.075, textZ)
          ),
          new Text(this.resources, "Me", new THREE.Vector3(0, 0.225, textZ)),
        ]
      );

      // console.log(this.sphereGroupOneObj);

      /**
       * Sphere Group Two
       */
      this.sphereGroupTwoObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(
          -0.951 * spheresMultiplier,
          0,
          -0.309 * spheresMultiplier
        ),
        "sphereTwo",
        [new Text(this.resources, "Skills", new THREE.Vector3(0, 0.025, textZ))]
      );

      /**
       * Sphere Group Three
       */
      this.sphereGroupThreeObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(
          -0.5878 * spheresMultiplier,
          0,
          0.809 * spheresMultiplier
        ),
        "sphereThree",
        [
          new Text(
            this.resources,
            "Projects",
            new THREE.Vector3(0, 0.025, textZ)
          ),
        ]
      );

      /**
       * Sphere Group Four
       */
      this.sphereGroupFourObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(
          0.5878 * spheresMultiplier,
          0,
          0.809 * spheresMultiplier
        ),
        "sphereFour",
        [
          new Text(
            this.resources,
            "Contact",
            new THREE.Vector3(0, -0.075, textZ)
          ),
          new Text(this.resources, "Me", new THREE.Vector3(0, 0.225, textZ)),
        ]
      );

      /**
       * Sphere Group Five
       */
      this.sphereGroupFiveObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(
          0.951 * spheresMultiplier,
          0,
          -0.309 * spheresMultiplier
        ),
        "sphereFive",
        [new Text(this.resources, "Resume", new THREE.Vector3(0, 0.025, textZ))]
      );

      this.sphereGroupObjsArr = [
        this.sphereGroupOneObj,
        this.sphereGroupTwoObj,
        this.sphereGroupThreeObj,
        this.sphereGroupFourObj,
        this.sphereGroupFiveObj,
      ];

      this.spheresGroup = new THREE.Group();
      this.spheresGroup.add(
        this.sphereGroupOneObj.sphereGroup,
        this.sphereGroupTwoObj.sphereGroup,
        this.sphereGroupThreeObj.sphereGroup,
        this.sphereGroupFourObj.sphereGroup,
        this.sphereGroupFiveObj.sphereGroup
      );

      this.spheresGroup.position.set(0, 0, 0);
      this.spheresGroup.rotation.x = Math.PI * 0.0425;
      this.spheresGroup.rotation.y = (0.0 * (Math.PI * 2.0)) / 5.0;
      this.spheresGroup.rotation.z = Math.PI;

      this.rotateSphereGroups();
    } else if (!this.spheresGroup && this.sizes.width < this.sizes.height) {
      /**
       * Sphere Group One
       */
      this.sphereGroupOneObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, 4.0, -1.0 * spheresMultiplier),
        "sphereOne",
        [
          new Text(
            this.resources,
            "About",
            new THREE.Vector3(-0.025, 0.175, textZ)
          ),
          new Text(
            this.resources,
            "Me",
            new THREE.Vector3(-0.025, 0.525, textZ)
          ),
        ]
      );

      /**
       * Sphere Group Two
       */
      this.sphereGroupTwoObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, 2.0, -1.0 * spheresMultiplier),
        "sphereTwo",
        [
          new Text(
            this.resources,
            "Skills",
            new THREE.Vector3(-0.025, 0.175, textZ)
          ),
        ]
      );

      /**
       * Sphere Group Three
       */
      this.sphereGroupThreeObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, 0, -1.0 * spheresMultiplier),
        "sphereThree",
        [
          new Text(
            this.resources,
            "Projects",
            new THREE.Vector3(-0.025, 0.025, textZ)
          ),
        ]
      );

      /**
       * Sphere Group Four
       */
      this.sphereGroupFourObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, -2.0, -1.0 * spheresMultiplier),
        "sphereFour",
        [
          new Text(
            this.resources,
            "Contact",
            new THREE.Vector3(-0.025, -0.2625, textZ)
          ),
          new Text(
            this.resources,
            "Me",
            new THREE.Vector3(-0.025, 0.0625, textZ)
          ),
        ]
      );

      /**
       * Sphere Group Five
       */
      this.sphereGroupFiveObj = new SphereGroup(
        this.sizes,
        this.resources,
        this.camera,
        new THREE.Vector3(0, -4.0, -1.0 * spheresMultiplier),
        "sphereFive",
        [
          new Text(
            this.resources,
            "Resume",
            new THREE.Vector3(-0.025, -0.325, textZ)
          ),
        ]
      );

      this.sphereGroupObjsArr = [
        this.sphereGroupOneObj,
        this.sphereGroupTwoObj,
        this.sphereGroupThreeObj,
        this.sphereGroupFourObj,
        this.sphereGroupFiveObj,
      ];

      this.spheresGroup = new THREE.Group();
      this.spheresGroup.add(
        this.sphereGroupOneObj.sphereGroup,
        this.sphereGroupTwoObj.sphereGroup,
        this.sphereGroupThreeObj.sphereGroup,
        this.sphereGroupFourObj.sphereGroup,
        this.sphereGroupFiveObj.sphereGroup
      );

      this.spheresGroup.position.set(0, 0, 0);
      this.rotateSphereGroups();
      // this.spheresGroup.rotation.z = Math.PI;
    } else if (this.spheresGroup && this.sizes.width >= this.sizes.height) {
      this.sphereGroupOneObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, 0, -1.0 * spheresMultiplier),
        [
          new THREE.Vector3(0, -0.075, textZ),
          new THREE.Vector3(0, 0.225, textZ),
        ]
      );
      this.sphereGroupTwoObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(
          -0.951 * spheresMultiplier,
          0,
          -0.309 * spheresMultiplier
        ),
        [new THREE.Vector3(0, 0.025, textZ)]
      );
      this.sphereGroupThreeObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(
          -0.5878 * spheresMultiplier,
          0,
          0.809 * spheresMultiplier
        ),
        [new THREE.Vector3(0, 0.025, textZ)]
      );
      this.sphereGroupFourObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(
          0.5878 * spheresMultiplier,
          0,
          0.809 * spheresMultiplier
        ),
        [
          new THREE.Vector3(0, -0.075, textZ),
          new THREE.Vector3(0, 0.225, textZ),
        ]
      );
      this.sphereGroupFiveObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(
          0.951 * spheresMultiplier,
          0,
          -0.309 * spheresMultiplier
        ),
        [new THREE.Vector3(0, 0.025, textZ)]
      );

      this.spheresGroup.rotation.x = Math.PI * 0.0425;
      this.spheresGroup.rotation.y = this.comparison;
      this.spheresGroup.rotation.z = Math.PI;
      this.rotateSphereGroups();
    } else if (this.spheresGroup && this.sizes.width < this.sizes.height) {
      this.sphereGroupOneObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, 4.0, -1.0 * spheresMultiplier),
        [
          new THREE.Vector3(-0.025, 0.175, textZ),
          new THREE.Vector3(-0.025, 0.525, textZ),
        ]
      );
      this.sphereGroupTwoObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, 2.0, -1.0 * spheresMultiplier),
        [new THREE.Vector3(-0.025, 0.175, textZ)]
      );
      this.sphereGroupThreeObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, 0, -1.0 * spheresMultiplier),
        [new THREE.Vector3(-0.025, 0.025, textZ)]
      );
      this.sphereGroupFourObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, -2.0, -1.0 * spheresMultiplier),
        [
          new THREE.Vector3(-0.025, -0.2625, textZ),
          new THREE.Vector3(-0.025, 0.0625, textZ),
        ]
      );
      this.sphereGroupFiveObj?.sphereGroupUpdatePosition(
        new THREE.Vector3(0, -4.0, -1.0 * spheresMultiplier),
        [new THREE.Vector3(-0.025, -0.325, textZ)]
      );

      this.spheresGroup.rotation.x = 0;
      this.spheresGroup.rotation.y = 0;
      this.spheresGroup.rotation.z = 0;
      this.rotateSphereGroups();
    }

    this.scene.add(this.spheresGroup!);
  }

  rotateSphereGroups() {
    if (!this.sphereGroupObjsArr) return;

    this.sphereGroupObjsArr.forEach((el) => {
      el.sphereGroupUpdate();
    });
  }

  spheresAnimation() {
    this.rotateSphereGroups();
  }

  setSpheresAnimation() {
    const modifySpheresRotationMethod = () => {
      if (this.sizes.width >= this.sizes.height) {
        /**
         * Full screen sphere animation
         */
        this.spheresAnimation = () => {
          if (!this.spheresGroup) return;

          if (this.sizes.height > this.sizes.width) {
            this.spheresGroup.rotation.y = 0;
            this.rotateSphereGroups();
            return (this.spheresAnimation = () => {
              this.rotateSphereGroups();
            });
          }

          const distance =
            this.comparison === 0
              ? Math.abs(
                  (this.spheresGroup.rotation.y % (Math.PI * 2.0)) -
                    Math.PI * 2.0
                )
              : Math.abs(
                  (this.spheresGroup.rotation.y % (Math.PI * 2.0)) -
                    this.comparison
                );
          // console.log(distance);

          if (
            this.spheresGroup.rotation.y % (Math.PI * 2.0) ===
            this.comparison
          ) {
            this.rotateSphereGroups();
            return (this.spheresAnimation = () => {
              this.rotateSphereGroups();
            });
          } else if (distance < 0.00025) {
            this.rotateSphereGroups();
            this.spheresGroup.rotation.y = this.comparison;
            return (this.spheresAnimation = () => {
              this.rotateSphereGroups();
            });
          } else {
            this.rotateSphereGroups();
            this.spheresGroup.rotation.y += Math.abs(
              1 - Math.pow(1 - 0.01 * distance, 3)
            );
          }
        };
      } else if (this.sizes.height > this.sizes.width) {
        /**
         * Mobile spheres animation
         */
        this.spheresAnimation = () => {
          if (!this.spheresGroup) return;

          if (this.sizes.width >= this.sizes.height) {
            this.spheresGroup.rotation.y = this.comparison;
            this.rotateSphereGroups();
            return (this.spheresAnimation = () => {
              this.rotateSphereGroups();
            });
          }
        };
      }
    };

    if (this.intersects.length > 0) {
      switch (this.intersects[0].object.name) {
        case "sphereOne":
          // console.log("click on object 1");
          // console.log(aboutMe);
          // const overlay = document.querySelector("div.overlay");
          // const overlay = document.querySelector("canvas.overlay");
          // const aboutMe = document.querySelector("div.aboutMe");

          // overlay!.classList.remove("hidden");
          // aboutMe!.classList.remove("hidden");

          this.selectedSphere = 1.0;
          this.comparison = this.selectedSphere - 1.0;
          modifySpheresRotationMethod();
          break;

        case "sphereTwo":
          // console.log("click on object 2");
          this.selectedSphere = 2.0;
          this.comparison =
            ((this.selectedSphere - 1.0) * (Math.PI * 2.0)) / 5.0;
          modifySpheresRotationMethod();
          break;

        case "sphereThree":
          // console.log("click on object 3");
          this.selectedSphere = 3.0;
          this.comparison =
            ((this.selectedSphere - 1.0) * (Math.PI * 2.0)) / 5.0;
          modifySpheresRotationMethod();
          break;

        case "sphereFour":
          // console.log("click on object 4");
          this.selectedSphere = 4.0;
          this.comparison =
            ((this.selectedSphere - 1.0) * (Math.PI * 2.0)) / 5.0;
          modifySpheresRotationMethod();
          break;

        case "sphereFive":
          // console.log("click on object 5");
          this.selectedSphere = 5.0;
          this.comparison =
            ((this.selectedSphere - 1.0) * (Math.PI * 2.0)) / 5.0;
          modifySpheresRotationMethod();
          break;
      }
    }
  }
}
