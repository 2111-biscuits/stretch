import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import BasicCharacterControls from "./characterControls.js";
import { createArt } from "./artBoxes.js"

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
    this.camera.position.set(25, 0, 0);

    class ThirdPersonCamera {
      constructor(params) {
        this._params = params;
        this._camera = params.camera;

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();
      }

      _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(-1, 1, -3);
        idealOffset.applyQuaternion(this._params.target.Rotation);
        idealOffset.add(this._params.target.Position);
        return idealOffset;
      }

      _CalculateIdealLookat() {
        const idealLookat = new THREE.Vector3(0, 10, 50);
        idealLookat.applyQuaternion(this._params.target.Rotation);
        idealLookat.add(this._params.target.Position);
        return idealLookat;
      }

      Update(timeElapsed) {
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - Math.pow(0.001, timeElapsed);

        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
      }
    }

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

    light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);

    // creating "floor" + adding it to scene
    const planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4cb963 });
    const plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // makes it "on the floor"
    plane.castShadow = false;
    plane.receiveShadow = true;
    this.scene.add(plane);


    //adding the art to the scene
    const artBoxes = createArt()
    artBoxes.forEach(panel => this.scene.add(panel))



    // create this 'mixers' array to be mapped over & updated in renderAnimationFrame
    this.mixers = [];
    // created a previous render frame variable to hold elapsed time
    this.previousRenderFrame = null;
    this.character;
    this.characterCamera;

    // loading the fbx file of the player model
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./resources/model.fbx", (fbxObj) => {
      fbxObj.scale.set(0.01, 0.01, 0.01); // scales down the fbx object
      fbxObj.position.set(3, 0);

      const params = {
        target: fbxObj,
        scene: this.scene,
        camera: this.camera, //possibly this.camera
      };
      this._controls = new BasicCharacterControls(params);


      // loading the fbx file of the player animation
      /*     const animLoader = new FBXLoader();
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
      ); */


      // adding the animated fbx file to the scene
      this.scene.add(fbxObj);
      this.character = fbxObj;
      const camParams = { camera: this.camera, target: this._controls };
      this.characterCamera = new ThirdPersonCamera(camParams);
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

      this.renderAnimationFrame(); // continuously call renderAnimationFrame so it is always updating

      this.world.render(this.scene, this.camera);

      this.stepIntoNextFrame(time - this.previousRenderFrame);
      this.previousRenderFrame = time;
    });
  }

  stepIntoNextFrame(timeElapsed) {
    const timeElapsedSeconds = timeElapsed * 0.001;
    if (this.mixers) {
      this.mixers.map((mixer) => mixer.update(timeElapsedSeconds));
    }
    if (this._controls) {
      this._controls.Update(timeElapsedSeconds);
    }

    if (this.characterCamera) {
      this.characterCamera.Update(timeElapsed);
    }
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorld();
});
