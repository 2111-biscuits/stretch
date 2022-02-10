import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { createArtBoxes } from "./sceneHelpers/artBoxes";
import ClickBox from "./sceneHelpers/clickBox";
import ThirdPersonCamera from "./sceneHelpers/thirdPersonCam";
import BasicCharacterControls from "./sceneHelpers/characterControls";

class World {
  constructor(reference) {
    // renderer
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadows
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight); // sets scene width
    reference.appendChild(this.renderer.domElement);

    // variables we'll need
    this.player;
    this.art = []; //used when we need to check if player is colliding with artwork
    this.mixers = []; // create this 'mixers' array to be mapped over & updated in renderAnimationFrame
    this.previousRenderFrame; // created a previous render frame variable to hold elapsed time
    this.characterCamera;
    this.controls;
    this.remotePlayers = [];
    this.remoteColliders = [];
    this.initialisingPlayers = [];
    this.remoteData = [];

    // clock for delta
    this.clock = new THREE.Clock();

    // camera
    const fov = 60; // field of view
    const aspect = 2;
    const near = 1.0;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(25, 0, 0);

    // scene
    this.scene = new THREE.Scene(); // container for everything in the scene

    // loads the background
    const loader = new THREE.TextureLoader();
    const texture = loader.load("resources/whitesands_pano2.jpg", () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(this.renderer, texture);
      this.scene.background = rt.texture;
    });

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

    //adding the art to the scene
    const artBoxes = createArtBoxes();
    artBoxes.forEach((box) => this.scene.add(box));
    artBoxes.forEach((box) => this.art.push(box)); // pushes each artwork into the this.art array which is used to check for collisions

    // initialize instance of class ClickBox, passing threejs scene and camera
    this.clickEvent = new ClickBox(this.scene, this.camera);

    // add a handler on mouse click for mesh (or meshes) with the name 'box_x'
    artBoxes.forEach((box) => {
      this.clickEvent.addHandler(box.name, "click", function (mesh) {
        //if mesh isn't already rotated, rotates mesh 180 degrees
        if (mesh.rotation.y !== Math.PI) {
          mesh.rotation.y = Math.PI;
        } else {
          //if mesh is already rotated, rotates back to 0 degrees
          mesh.rotation.y = mesh.rotation.y - Math.PI;
        }
      });
    });

    // loading the fbx file of the player model
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./resources/silverAvatarOrb.fbx", (fbxObj) => {
      fbxObj.scale.set(0.0015, 0.0015, 0.0015); // scales down the fbx object
      fbxObj.position.set(22, 1, -75);

      const params = {
        target: fbxObj,
        art: this.art,
        scene: this.scene,
        camera: this.camera,
      };
      this.controls = new BasicCharacterControls(params);

      // adding the animated fbx file to the scene
      this.scene.add(fbxObj);
      const camParams = { camera: this.camera, target: this.controls };
      this.characterCamera = new ThirdPersonCamera(camParams);
    });

    // handles resizing
    window.addEventListener(
      "resize",
      () => {
        this.onWindowResize();
      },
      false
    );

    // animation
    this.renderAnimationFrame();
  }

  // handling resize
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // rendering
  renderAnimationFrame() {
    requestAnimationFrame((time) => {
      if (this.previousRenderFrame === null) {
        this.previousRenderFrame = time;
      }

      this.renderAnimationFrame();

      this.renderer.render(this.scene, this.camera);

      this.stepIntoNextFrame(time - this.previousRenderFrame);
      this.previousRenderFrame = time;
    });
  }

  //updating
  stepIntoNextFrame(timeElapsed) {
    const timeElapsedSeconds = timeElapsed * 0.001;
    this.frameCount++;

    if (this.mixers) {
      this.mixers.map((mixer) => mixer.update(timeElapsedSeconds));
    }
    if (this.controls) {
      this.controls.Update(timeElapsedSeconds);
    }

    this.clickEvent.update();

    if (this.characterCamera) {
      this.characterCamera.Update(timeElapsed);
    }
  }
}

export default World;
