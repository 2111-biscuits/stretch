import * as THREE from "three";

//everything happens in three.js is only in this one DOM that is the canvas.
//1. to detect a click on a mesh, what you do is:
//2. add a click event listener on the canvas.
//3. check if mouse is on the mesh when clicked.
//and to check if mouse is on mesh, you use RayCaster.
//Raycaster: used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.

class MouseMeshInteractionHandler {
  constructor(mesh_name, handler_function) {
    this.mesh_name = mesh_name;
    this.handler_function = handler_function;
  }
}

class ClickBox {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.updated = false;
    this.event = "";

    // last mesh that the mouse cursor was over
    this.last_mouseenter_mesh = undefined;
    // last mesh that the mouse was pressing down
    this.last_pressed_mesh = undefined;

    this.handlers = new Map();

    this.handlers.set("click", []);

    this.handlers.set("mousedown", []);
    this.handlers.set("mouseup", []);
    this.handlers.set("mouseenter", []);
    this.handlers.set("mouseleave", []);

    window.addEventListener("mousemove", this);

    window.addEventListener("click", this);

    window.addEventListener("mousedown", this);
  }
  handleEvent(e) {
    switch (e.type) {
      case "mousemove":
        {
          this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
          this.updated = true;
          this.event = "motion";
        }
        break;
      default: {
        this.updated = true;
        this.event = e.type;
      }
    }
  }

  addHandler(mesh_name, event_type, handler_function) {
    if (this.handlers.has(event_type)) {
      this.handlers
        .get(event_type)
        .push(new MouseMeshInteractionHandler(mesh_name, handler_function));
    }
  }

  update() {
    if (this.updated) {
      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
        // special test for events: 'mouseenter', 'mouseleave'
        if (this.event === "motion") {
          let mouseenter_handlers = this.handlers.get("mouseenter");
          let mouseleave_handlers = this.handlers.get("mouseleave");

          if (mouseleave_handlers.length > 0) {
            for (const handler of mouseleave_handlers) {
              // if mesh was entered by mouse previously, but not anymore, that means it has been mouseleave'd
              if (
                this.last_mouseenter_mesh !== undefined &&
                intersects[0].object !== this.last_mouseenter_mesh &&
                handler.mesh_name === this.last_mouseenter_mesh.name
              ) {
                handler.handler_function(this.last_mouseenter_mesh);
                break;
              }
            }
          }

          if (mouseenter_handlers.length > 0) {
            for (const handler of mouseenter_handlers) {
              if (
                handler.mesh_name === intersects[0].object.name &&
                intersects[0].object !== this.last_mouseenter_mesh
              ) {
                this.last_mouseenter_mesh = intersects[0].object;
                handler.handler_function(intersects[0].object);
                break;
              }
            }
          }
        } else {
          // if mouseup event has occurred
          if (
            this.event === "click" &&
            this.last_pressed_mesh === intersects[0].object
          ) {
            for (const handler of this.handlers.get("mouseup")) {
              if (handler.mesh_name === intersects[0].object.name) {
                handler.handler_function(intersects[0].object);
                break;
              }
            }
            this.last_pressed_mesh = undefined;
          }

          // for mouseup event handler to work
          if (this.event === "mousedown") {
            this.last_pressed_mesh = intersects[0].object;
          }

          let handlers_of_event = this.handlers.get(this.event);
          for (const handler of handlers_of_event) {
            if (handler.mesh_name === intersects[0].object.name) {
              handler.handler_function(intersects[0].object);
              break;
            }
          }
        }
      }
      // if mouse doesn't intersect any meshes
      else if (this.event === "motion") {
        // special test for 'mouseleave' event
        // 			(since it may be triggered when cursor doesn't intersect with any meshes)
        for (const handler of this.handlers.get("mouseleave")) {
          // if mesh was entered by mouse previously, but not anymore, that means it has been mouseleave'd
          if (
            this.last_mouseenter_mesh !== undefined &&
            handler.mesh_name === this.last_mouseenter_mesh.name
          ) {
            handler.handler_function(this.last_mouseenter_mesh);
            this.last_mouseenter_mesh = undefined;
            break;
          }
        }
      }

      this.updated = false;
    }
  }
}

export default ClickBox;

//references:
//https://www.youtube.com/watch?v=hSBYYDx-KL0
//Github: https://github.com/danielblagy/three_mmi
//Copyright (c) 2021 danielblagy

//https://stackoverflow.com/questions/59641314/how-to-add-event-for-a-mesh-in-threejs

/*USAGE:
	
	// there are 5 types of interactions available:
	//		* 'click' 		(left mouse button click)
	//		* 'mouseenter' 	(mouse cursor is moved onto the element that has the listener attached)
	//		* 'mouseleave' 	(mouse cursor is moved off the element that has the listener attached)
	//		* 'mousedown' 	(mouse button is pressed on an element)
	//		* 'mouseup' 	(mouse button is released over an element)
	
	// create a handler for when user clicks on the mesh with name 'my_interactable_mesh'
	mmi.addHandler('my_interactable_mesh', 'click', function(mesh) {
		console.log('interactable mesh has been clicked!');
		console.log(mesh);
	});
	
	// put mmi.update() inside the graphics update function
	function animate() {
		requestAnimationFrame( animate );
		
		mmi.update();
		
		renderer.render( scene, camera );
	}
	animate();
	*/
