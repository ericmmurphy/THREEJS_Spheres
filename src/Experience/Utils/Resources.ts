import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import EventEmitter from "./EventEmitter";

interface source {
  name: string;
  type: string;
  path: string | string[];
}

type items = Record<string, string>;

export default class Resources extends EventEmitter {
  sources: source[];
  items: items;
  toLoad: number;
  loaded: number;
  loaders: any;

  constructor(sources: source[]) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.fontLoader = new FontLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      // console.log(source);

      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file: any) => {
          console.log(source, file);
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: any) => {
          console.log(source, file);
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file: any) => {
          console.log(source, file);
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "font") {
        this.loaders.fontLoader.load(source.path, (file: any) => {
          console.log(source, file);
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: source, file: any) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
