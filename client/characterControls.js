import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

class BasicCharacterControls {
  constructor(params) {
    this._Init(params);
    this.art = params.art;
  }

  _Init(params) {
    this._params = params;
    this._move = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3();
    this._radius = 0.5; //used in collision

    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  get Position() {
    return this._position;
  }

  get Rotation() {
    if (!this._params.target) {
      return new THREE.Quaternion();
    }
    return this._params.target.quaternion;
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = true;
        break;
      case 65: // a
        this._move.left = true;
        break;
      case 83: // s
        this._move.backward = true;
        break;
      case 68: // d
        this._move.right = true;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = false;
        break;
      case 65: // a
        this._move.left = false;
        break;
      case 83: // s
        this._move.backward = false;
        break;
      case 68: // d
        this._move.right = false;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  _FindIntersections(boxes, position) {
    //creates a sphere around the player based on position
    //sphere is as large as the radius we set when player controls are initialized (ours is .5)
    const sphere = new THREE.Sphere(position, this._radius);

    //checks position of each canvas box in relation to the players current position and returns an array of all intersections
    //intersectsBox is available as part of sphere geometry
    const intersections = boxes.filter((b) => {
      return sphere.intersectsBox(b);
    });

    return intersections;
  }

  Update(timeInSeconds) {
    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._params.target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    if (this._move.forward) {
      velocity.z += this._acceleration.z * timeInSeconds;
    }
    if (this._move.backward) {
      velocity.z -= this._acceleration.z * timeInSeconds;
    }
    if (this._move.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._move.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    //Box3 represents an axis-aligned bounding box (AABB) in 3D space.
    //creating a Box3 based on the position of the canvas will set the min/max boundaries that will be detected when testing for collision
    const boxes = this.art.map((canvas) => {
      const box = new THREE.Box3().setFromObject(canvas);
      return box;
    });

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    let intersections = this._FindIntersections(boxes, controlObject.position);
    //if there are intersections between the players and the canvas boxes, the player can't move
    if (intersections.length > 0) {
      controlObject.position.copy(oldPosition);
    }

    this._position.copy(controlObject.position);
    intersections = this._FindIntersections(boxes, controlObject.position);
    if (intersections.length > 0) {
      controlObject.position.copy(oldPosition);
      //in next frame the player won't be able to keep moving if there is a collision/intersection detected
      this._velocity.y = Math.max(0, this._velocity.y);
    }
  }
}

export default BasicCharacterControls;
