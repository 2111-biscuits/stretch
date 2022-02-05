import * as THREE from "three";
//import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

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
      up: false,
      down: false,
    };

    //Vector3: establishes class representing 3D Vector such as a point in 3D space.
    //x,y,z represent a direction and length in 3D space.
    //In three.js the length will always be the Euclidean distance (straight-line distance)
    //from (0, 0, 0) to (x, y, z) and the direction is also measured from (0, 0, 0) towards (x, y, z).
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3();
    this._radius = 0.25; //used in collision

    //listeners for keyup and keydown events
    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  get Position() {
    return this._position;
  }

  get Rotation() {
    //Quaternions are used in three.js to represent rotations.
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

  //Update gets called every frame applies movement to character
  Update(timeInSeconds) {
    const velocity = this._velocity;
    //frame decceleration is calculating distance from original vector(velocity) from old frame
    //in relation to time/new frame
    //the frame is moving in the opposite direction of the control object
    //For instance, when accelerating away from a stoplight, the acceleration
    //is forward and the perceived force is backward.
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );

    //multiplyScalar is Vector3 method: Multiplies this vector by scalar (s).
    //in our case s = timeInSeconds
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    //adds current value of frameDecceleration to Vector3(0,0,0)(original velocity)
    //or updated value of _velocity
    velocity.add(frameDecceleration);

    const controlObject = this._params.target;
    //rotation and position of control object established
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    //Creates a new Quaternion with identical x, y, z and w properties to controlObject
    const _R = controlObject.quaternion.clone();

    if (this._move.forward) {
      //calculates how far the object will move along the z axis based on
      //variables set as _acceleration when we init the controls
      velocity.z += this._acceleration.z * timeInSeconds;
    }
    if (this._move.backward) {
      velocity.z -= this._acceleration.z * timeInSeconds;
    }
    if (this._move.left) {
      //Sets the x, y and z components of this vector.
      _A.set(0, 1, 0);
      //Sets this quaternion from rotation specified by axis(_A) and angle(Math.PI...).
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
    //Convert this vector to a unit vector:
    //sets it equal to a vector with the same direction as this one, but length 1.
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
  }
}

export default BasicCharacterControls;

//controls references:
//https://phys.libretexts.org/Bookshelves/University_Physics/Radically_Modern_Introductory_Physics_Text_I_(Raymond)/06%3A_Acceleration_and_General_Relativity/6.05%3A_Accelerated_Reference_Frames
//https://www.youtube.com/watch?v=8n_v1aJmLmc
//https://threejs.org/docs

//collision references:
//https://github.com/flutterfromscratch/threejs-rocket-game/blob/master/game/collisionDetection.ts
//https://github.com/simondevyoutube/Quick_MinecraftClone2
