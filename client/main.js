import * as THREE from "three";
import { DynamicDrawUsage } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const clock = new THREE.Clock();

class BasicWorld {
  constructor() {
    this.init();
  }

  init() {
    // renderer
    this.world = new THREE.WebGL1Renderer();
    this.world.shadowMap.enabled = true;
    this.world.shadowMap.type = THREE.PCFSoftShadowMap; // shadows
    this.world.setPixelRatio(window.devicePixelRatio);
    this.world.setSize(window.innerWidth, window.innerHeight); // sets scene width

    // handles resizing
    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    document.body.appendChild(this.world.domElement);

    // camera
    const fov = 60; // field of view
    const aspect = 2;
    const near = 1.0;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // controls
    const controls = new OrbitControls(this.camera, this.world.domElement);
    this.camera.position.set(75, 20, 0);
    controls.update();

    // scene
    this.scene = new THREE.Scene(); // container for everything in the scene

    // loads the background
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "./resources/Box_Right.bmp",
      "./resources/Box_Left.bmp",
      "./resources/Box_Top.bmp",
      "./resources/Box_Bottom.bmp",
      "./resources/Box_Front.bmp",
      "./resources/Box_Back.bmp",
    ]);
    this.scene.background = texture;

    // light
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.01;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 1.0;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = 200;
    light.shadow.camera.right = -200;
    light.shadow.camera.top = 200;
    light.shadow.camera.bottom = -200;
    this.scene.add(light);

    // creating "floor" + adding it to scene
    const planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4cb963 });
    const plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // makes it "on the floor"
    plane.castShadow = false;
    plane.receiveShadow = true;
    this.scene.add(plane);

    // // creating + adding single cubes to scene
    // const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    // const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xeae8ff });
    // const cube = new THREE.Mesh(cubeGeo, cubeMaterial);
    // cube.position.set(1, 0, 1);
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // this.scene.add(cube);

    // creating + adding many cubes to scene
    for (let x = 0; x < 8; x++) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({
          color: 0xeae8ff,
        })
      );
      box.position.set(Math.random() + x * 5, Math.random(), Math.random());
      box.castShadow = true;
      box.receiveShadow = true;
      this.scene.add(box);
    }

    // create this 'mixers' array to be mapped over & updated in renderAnimationFrame
    this.mixers = [];
    // created a previous render frame variable to hold elapsed time
    this.previousRenderFrame = null;

    // loading the fbx file of the player model
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./resources/model.fbx", (fbxObj) => {
      fbxObj.scale.set(0.01, 0.01, 0.01); // scales down the fbx object
      fbxObj.position.set(3, 0);

      // loading the fbx file of the player animation
      const animLoader = new FBXLoader();
      animLoader.load(
        "./resources/dance.fbx",
        (animObj) => {
          const animMixer = new THREE.AnimationMixer(fbxObj); // pass in the player model to the animation mixer
          this.mixers.push(animMixer);
          const dance = animMixer.clipAction(animObj.animations[0]); // why is this .animations[0]?
          dance.play();
        },
        undefined,
        (error) => {
          console.log(error);
        }
      );
      // adding the animated fbx file to the scene
      this.scene.add(fbxObj);
    });

    this.renderAnimationFrame();
  }

  _OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.world.setSize(window.innerWidth, window.innerHeight);
  }

  renderAnimationFrame() {
    requestAnimationFrame((time) => {
      if (this.previousRenderFrame === null) {
        this.previousRenderFrame = time;
      }

      this.world.render(this.scene, this.camera);
      this.stepIntoNextFrame(time - this.previousRenderFrame);
      this.previousRenderFrame = time;
      this.renderAnimationFrame(); // continuously call renderAnimationFrame so it is always updating
    });
  }

  stepIntoNextFrame(timeElapsed) {
    const timeElapsedSeconds = timeElapsed * 0.001;
    if (this.mixers) {
      this.mixers.map((mixer) => mixer.update(timeElapsedSeconds));
    }
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorld();
});
