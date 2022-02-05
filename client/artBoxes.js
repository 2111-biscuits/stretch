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
      map: boxLoader.load("artBox/lucydrawing.jpg"), //2
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/lucy2.jpg"), //3
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/lucy3.jpg"), //4
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
  ];

  const descriptions = [
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/CaraArtDesc.PNG"), //0
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/CaraArtDesc.PNG"), //1
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/LucyArtDesc.PNG"), //2
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/LucyArtDesc.PNG"), //3
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/LucyArtDesc.PNG"), //4
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/GermanArtDesc.PNG"), //5
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/GermanArtDesc.PNG"), //6
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/GermanArtDesc.PNG"), //7
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/GermanArtDesc.PNG"), //8
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/NicoleArtDesc.PNG"), //9
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
      console.log(panels);
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
