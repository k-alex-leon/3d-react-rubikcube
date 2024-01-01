import * as THREE from "three";

export default class Cube {
  constructor(xOffset, yOffset, zOffset) {
    this.cubeGroup = new THREE.Group();
    this.uniforms = {
      opacity: {
        type: "f",
        value: 1.0,
      },
    };

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cubeMesh = new THREE.Mesh(geometry, [
      // BLUE
      new THREE.MeshBasicMaterial({
        color: 0x046eff,
        fog: true,
        transparent: true,
      }),
      // GREEN
      new THREE.MeshBasicMaterial({
        color: 0x02bf19,
        fog: true,
        transparent: true,
      }),
      // YELLOW
      new THREE.MeshBasicMaterial({
        color: 0xffce04,
        fog: true,
        transparent: true,
      }),
      // WHITE
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        fog: true,
        transparent: true,
      }),
      // RED
      new THREE.MeshBasicMaterial({
        color: 0xffe0404,
        fog: true,
        transparent: true,
      }),
      // ORANGE
      new THREE.MeshBasicMaterial({
        color: 0xff6602,
        fog: true,
        transparent: true,
      }),
    ]);

    const lineEdges = new THREE.EdgesGeometry(this.cubeMesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#000000" });
    this.lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);

    this.cubeGroup.add(this.cubeMesh);
    this.cubeGroup.add(this.lineMesh);
    this.cubeGroup.position.x = xOffset;
    this.cubeGroup.position.y = yOffset;
    this.cubeGroup.position.z = zOffset;
  }
}
