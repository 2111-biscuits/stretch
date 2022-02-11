import React from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import BasicCharacterControls from "../characterControls.js";
import ClickBox from "../clickBox.js";
import { createArtBoxes } from "../artBoxes.js";
import ThirdPersonCamera from "../thirdPersonCam.js";
import Audio from "./Audio.js";
import { Link } from "react-router-dom";
import socket from "socket.io-client";

class Gallery extends React.Component {
  componentDidMount() {
    // renderer
    let world = new THREE.WebGL1Renderer();
    world.shadowMap.enabled = true;
    world.shadowMap.type = THREE.PCFSoftShadowMap; // shadows
    world.setPixelRatio(window.devicePixelRatio);
    world.setSize(window.innerWidth, window.innerHeight); // sets scene width
    let art = []; //used when we need to check if player is colliding with artwork
    let night = false;
    this.mount.appendChild(world.domElement);

    // camera
    const fov = 60; // field of view
    const aspect = 2;
    const near = 1.0;
    const far = 1000.0;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(25, 0, 0);

    //     let control = new OrbitControls(camera, world.domElement);
    //     control.addEventListener('change', world);
    //     window.minDistance = 5;
    //     control.maxDistance = 30;
    // scene
    let scene = new THREE.Scene(); // container for everything in the scene

    // loads the background
    let loader = new THREE.TextureLoader();
    let texture = loader.load("resources/whitesands_pano2.jpg", () => {
      let rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(world, texture);
      scene.background = rt.texture;
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
    scene.add(light);

    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //adding the art to the scene
    const artBoxes = createArtBoxes();
    artBoxes.forEach((box) => scene.add(box));
    artBoxes.forEach((box) => art.push(box)); // pushes each artwork into the this.art array which is used to check for collisions

    //creating box for night-mode
    let nightBoxLoader = new THREE.TextureLoader();
    let arr = ["resources/night.PNG", "resources/light.PNG"];
    let textureToShow = 0;
    let nightBoxTexture = new THREE.MeshBasicMaterial();
    let nightBox = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      nightBoxTexture
    );
    nightBox.position.set(150, 20, 250);
    nightBox.name = "nightbox";
    nightBox.castShadow = true;
    nightBox.receiveShadow = true;

    nightBoxLoader.load(arr[textureToShow], function (tex) {
      // Once the texture has loaded
      // Asign it to the material
      nightBoxTexture.map = tex;
      // Update the next texture to show
      textureToShow++;
      // Add the mesh into the scene
      scene.add(nightBox);
    });

    // initialize instance of class ClickBox, passing threejs scene and camera
    const clickEvent = new ClickBox(scene, camera);

    // add a handler on mouse click for mesh (or meshes) with the name 'box_x'
    artBoxes.forEach((box) => {
      clickEvent.addHandler(box.name, "click", function (mesh) {
        //if mesh isn't already rotated, rotates mesh 180 degrees
        if (mesh.rotation.y !== Math.PI) {
          mesh.rotation.y = Math.PI;
        } else {
          //if mesh is already rotated, rotates back to 0 degrees
          mesh.rotation.y = mesh.rotation.y - Math.PI;
        }
      });
    });

    clickEvent.addHandler("nightbox", "click", function () {
      if (!night) {
        loader = new THREE.TextureLoader();
        texture = loader.load("resources/UnearthlyRed4k.png", () => {
          let rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
          rt.fromEquirectangularTexture(world, texture);
          scene.background = rt.texture;
        });
      } else {
        loader = new THREE.TextureLoader();
        texture = loader.load("resources/whitesands_pano2.jpg", () => {
          let rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
          rt.fromEquirectangularTexture(world, texture);
          scene.background = rt.texture;
        });
      }
      nightBoxLoader = new THREE.TextureLoader();
      nightBoxLoader.load(arr[textureToShow], function (tex) {
        nightBoxTexture.map = tex;
        textureToShow++;
        // Have we got to the end of the textures array
        if (textureToShow > arr.length - 1) {
          textureToShow = 0;
        }
      });
      night = !night;
    });

    // created a previous render frame variable to hold elapsed time
    let previousRenderFrame;
    let characterCamera;
    let controls;

    const playerSocket = socket(window.location.origin);

    playerSocket.on("connect", () => {
      console.log("connected to server");
    });
    // loading the fbx file of the player model
    const fbxLoader = new FBXLoader();
    fbxLoader.load("./resources/silverAvatarOrb.fbx", (fbxObj) => {
      fbxObj.scale.set(0.0015, 0.0015, 0.0015); // scales down the fbx object
      fbxObj.position.set(22, 1, -75);

      const params = {
        target: fbxObj,
        art: art,
        scene,
        camera,
      };
      controls = new BasicCharacterControls(params);

      // adding the animated fbx file to the scene
      scene.add(fbxObj);
      const camParams = { camera, target: controls };
      characterCamera = new ThirdPersonCamera(camParams);
    });

    const OnWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      world.setSize(window.innerWidth, window.innerHeight);
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
      if (controls) {
        controls.Update(timeElapsedSeconds);
      }

      clickEvent.update();

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
          <span className="movement-directions">
            use arrow keys to move | click objects to learn more
          </span>
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

//reference for nightBox changing texture click event:
//https://codepen.io/dipscom/pen/MpGYrq?editors=0010
