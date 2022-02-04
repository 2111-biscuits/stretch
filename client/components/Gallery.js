import React from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import BasicCharacterControls from "../characterControls.js";
import { createArtBoxes } from "../artBoxes.js";
import ThirdPersonCamera from "../thirdPersonCam.js";
import Audio from "./Audio.js";
import { Link } from "react-router-dom";

class Gallery extends React.Component {
  componentDidMount() {
    // renderer
    let factor1 = 0.98; // percentage of the screen width
    let factor2 = 0.96; // percentage of the screen height
    let world = new THREE.WebGL1Renderer();
    world.shadowMap.enabled = true;
    world.shadowMap.type = THREE.PCFSoftShadowMap; // shadows
    world.setPixelRatio(window.devicePixelRatio);
    world.setSize(window.innerWidth * factor1, window.innerHeight * factor2); // sets scene width
    let art = []; //used when we need to check if player is colliding with artwork
    this.mount.appendChild(world.domElement);

    // camera
    const fov = 60; // field of view
    const aspect = 2;
    const near = 1.0;
    const far = 1000.0;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(25, 0, 0);

    // scene
    let scene = new THREE.Scene(); // container for everything in the scene

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
    scene.background = texture;

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
    scene.add(light);

    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // creating "floor" + adding it to scene
    const planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4cb963,
    });
    const plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // makes it "on the floor"
    plane.castShadow = false;
    plane.receiveShadow = true;
    scene.add(plane);

    //adding the art to the scene
    const artBoxes = createArtBoxes();
    artBoxes.forEach((box) => scene.add(box));
    artBoxes.forEach((box) => art.push(box)); // pushes each artwork into the this.art array which is used to check for collisions

    // create this 'mixers' array to be mapped over & updated in renderAnimationFrame
    let mixers = [];
    // created a previous render frame variable to hold elapsed time
    let previousRenderFrame;
    let characterCamera;
    let controls;

    // loading the fbx file of the player model
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./resources/silverAvatarOrb.fbx", (fbxObj) => {
      fbxObj.scale.set(0.0015, 0.0015, 0.0015); // scales down the fbx object
      fbxObj.position.set(22, 1, -25);

      const params = {
        target: fbxObj,
        art: art,
        scene,
        camera, //possibly this.camera
      };
      controls = new BasicCharacterControls(params);

      // adding the animated fbx file to the scene
      scene.add(fbxObj);
      const camParams = { camera, target: controls };
      characterCamera = new ThirdPersonCamera(camParams);
    });

    const OnWindowResize = () => {
      camera.aspect =
        ((window.innerWidth * factor1) / window.innerHeight) * factor2;
      camera.updateProjectionMatrix();
      world.setSize(window.innerWidth * factor1, window.innerHeight * factor2);
    };

    const renderAnimationFrame = () => {
      requestAnimationFrame((time) => {
        if (previousRenderFrame === null) {
          previousRenderFrame = time;
        }

        renderAnimationFrame();

        world.render(scene, camera);

        stepIntoNextFrame(time - previousRenderFrame);
        previousRenderFrame = time;
      });
    };

    const stepIntoNextFrame = (timeElapsed) => {
      const timeElapsedSeconds = timeElapsed * 0.001;
      if (mixers) {
        mixers.map((mixer) => mixer.update(timeElapsedSeconds));
      }
      if (controls) {
        controls.Update(timeElapsedSeconds);
      }

      if (characterCamera) {
        characterCamera.Update(timeElapsed);
      }
    };

    // handles resizing
    window.addEventListener(
      "resize",
      () => {
        OnWindowResize();
      },
      false
    );
    // animation
    renderAnimationFrame();
  }

  render() {
    return (
      <div id="gallery">
        <div id="navbar">
          <Audio />
          <Link to="/">
            <button id="exit-button">Exit</button>
          </Link>
        </div>
        <div id="3dworld" ref={(ref) => (this.mount = ref)}></div>
      </div>
    );
  }
}

export default Gallery;
