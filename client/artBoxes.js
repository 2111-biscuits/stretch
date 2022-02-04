import * as THREE from "three";

export function createArt() {
  let artPanels = [];
  const boxLoader = new THREE.TextureLoader();
  const art = [
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/troll_rainbow.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/lotus_background.jpg"),
    }),
    new THREE.MeshBasicMaterial({ map: boxLoader.load("artBox/norm.png") }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/spacey_background.jpeg"),
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/tropiVapor.jpeg"),
    }),
    new THREE.MeshBasicMaterial({
      map: boxLoader.load("artBox/vaporWater.jpeg"),
    }),
  ];
  const blankSide = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let x = 0; x < art.length; x++) {
    let panels = [];
    for (let i = 1; i <= 6; i++) {
      if (i === 6) {
        panels.push(art[x]);
      } else {
        panels.push(blankSide);
      }
    }
    const box = new THREE.Mesh(new THREE.BoxGeometry(6, 8, 1), panels);
    box.position.set(Math.random() + x * 10, 4, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    artPanels.push(box);
  }
  return artPanels;
}
