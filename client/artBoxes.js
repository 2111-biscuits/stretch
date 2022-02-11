import * as THREE from "three";

export function createArtBoxes() {
  let artBoxes = [];
  const boxLoader = new THREE.TextureLoader();
  const blankSide = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const art = [
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/cara_art.JPG"), //0
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/cara_art2.JPG"), //1
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/lucy_untitled.jpg"), //2
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/ShallowCopy.jpg"), //3
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Octopus.jpg"), //4
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Dipping_Hot_Earth.jpg"), //5
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/IMG_0011.JPG"), //6
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Sunflower.png"), //7
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Warpspeed_Sweet_Angel.jpg"), //8
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/nicoledrawing.jpg"), //9
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Yooboo_art.JPG"), //10
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Eclipse.jpg"), //11
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_NightCar.jpg"), //12
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection1.jpg"), //13
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection5.jpg"), //14
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection7.jpg"), //15
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Snow.jpg"), //16
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_ThreeTrees.jpg"), //17
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Window.jpg"), //18
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Nicole_Headache.jpg"), //19
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Nicole_Untitled.jpg"), //20
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/TerryPark_Germs.jpg"), //21
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_PortlandLobster.jpg"), //22
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_RedTurbulence.jpg"), //23
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_Untitled.jpg"), //24
    }),
  ];

  const descriptions = [
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/CaraArtDesc.PNG"), //0
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/CaraArtDesc.PNG"), //1
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/lucy_untitled_desc.JPG"), //2
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/ShallowCopy_desc.JPG"), //3
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Octopus_desc.JPG"), //4
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Dipping_Hot_Earth_desc.JPG"), //5
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/IMG_0011_desc.JPG"), //6
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Sunflower_desc.PNG"), //7
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Warpspeed_Sweet_Angel_desc.JPG"), //8
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/nicoledrawing_desc.JPG"), //9
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Yooboo_desc.JPG"), //10
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Eclipse_Info.png"), //11
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_NightCar_Info.png"), //12
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection1_Info.png"), //13
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection5_Info.png"), //14
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Reflection7_Info.png"), //15
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Snow_Info.png"), //16
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_ThreeTrees_Info.png"), //17
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Lucy_Window_Info.png"), //18
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Nicole_Headache_Info.png"), //19
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/Nicole_Untitled_Info.png"), //20
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/TerryPark_Germs_Info.png"), //21
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_PortlandLobster_Info.png"), //22
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_RedTurbulence_Info.png"), //23
    }),

    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/WilliamPark_Untitled_Info.png"), //24
    }),
  ];

  for (let x = 0; x < art.length; x++) {
    let panels = [];
    for (let i = 1; i <= 6; i++) {
      if (i === 6) {
        panels.push(art[x]);
      } else if (i === 5) {
        panels.push(descriptions[x]);
      } else {
        panels.push(blankSide);
      }
    }
    const box = new THREE.Mesh(new THREE.BoxGeometry(6, 8, 1), panels);
    if (x === 0) {
      box.position.set(0, 4, -30);
    } else if (x === 1) {
      box.position.set(-15, 6, -15);
    } else if (x === 2) {
      box.position.set(10, 4, 20);
    } else if (x === 3) {
      box.position.set(25, 4, 10);
    } else if (x === 4) {
      box.position.set(18, 8, 30);
    } else if (x === 5) {
      box.position.set(40, 4, 60);
    } else if (x === 6) {
      box.position.set(50, 4, 40);
    } else if (x === 7) {
      box.position.set(45, 6, -20);
    } else if (x === 8) {
      box.position.set(50, 4, -40);
    } else if (x === 9) {
      box.position.set(-20, 4, 60);
    } else if (x === 10) {
      box.position.set(-10, 6, 50);
    } else {
      box.position.set(Math.random() + x * 10, 4, 0);
    }
    box.name = `box_${x}`;
    box.castShadow = true;
    box.receiveShadow = true;
    artBoxes.push(box);
  }
  return artBoxes;
}
