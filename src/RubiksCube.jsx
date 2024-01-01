import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import Cube from "./Cube";

export default class RubiksCube {
  constructor() {
    this.scale = 20;
    this.epsilon = 0.5;
    this.consoleDebug = true;
    this.animationPlaying = false

    // this cube makes all rotation work
    this.selectedCube = null;

    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;

    this.rubiksCubeGroup.rotation.x = Math.PI / 7;
    this.rubiksCubeGroup.rotation.y = -Math.PI / 4;

    this.initializeRubiksCube();

    const anim = (t) => {
      TWEEN.update(t);
      requestAnimationFrame(anim);
    };

    anim();
  }

  // ROTATION ANIMATION

  rotateArdWorldAxis(cubeGroup, axis) {
    const start = { rotation: 0 };
    const prev = { rotation: 0 };
    const end = { rotation: Math.PI / 2 };

    new TWEEN.Tween(start)
      .to(end, 200)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onStart(() => {
        this.animationPlaying = true
      })
      .onComplete(() => {
        this.animationPlaying = false
      })
      .onUpdate(({ rotation }) => {
        cubeGroup.position.applyAxisAngle(axis, rotation - prev.rotation);
        cubeGroup.rotateOnWorldAxis(axis, rotation - prev.rotation);

        prev.rotation = rotation;
      }).start();

  }

  // ROTATE IN SAME COORDS

  cubeInSameY(c1, c2) {
    return (
      c1.cubeGroup.position.y > c2.cubeGroup.position.y - this.epsilon &&
      c1.cubeGroup.position.y < c2.cubeGroup.position.y + this.epsilon
    );
  }

  cubeInSameX(c1, c2) {
    return (
      c1.cubeGroup.position.x > c2.cubeGroup.position.x - this.epsilon &&
      c1.cubeGroup.position.x < c2.cubeGroup.position.x + this.epsilon
    );
  }

  cubeInSameZ(c1, c2) {
    return (
      c1.cubeGroup.position.z > c2.cubeGroup.position.z - this.epsilon &&
      c1.cubeGroup.position.z < c2.cubeGroup.position.z + this.epsilon
    );
  }

  // EVENTOS DEL TECLADO
  onKeyDown(e) {
    if(this.animationPlaying) return

    if (e.key === "w") {
      const axis = new THREE.Vector3(-1, 0, 0);

      this.cubes.forEach((cube) => {
        if (this.cubeInSameX(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    } else if (e.key === "a") {
      const axis = new THREE.Vector3(0, -1, 0);

      this.cubes.forEach((cube) => {
        if (this.cubeInSameY(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    } else if (e.key === "s") {
      const axis = new THREE.Vector3(1, 0, 0);

      this.cubes.forEach((cube) => {
        if (this.cubeInSameX(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    } else if (e.key === "d") {
      const axis = new THREE.Vector3(0, 1, 0);

      this.cubes.forEach((cube) => {
        if (this.cubeInSameY(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    } else if (e.key === "q") {
      const axis = new THREE.Vector3(0, 0, 1);
      this.cubes.forEach((cube) => {
        if (this.cubeInSameZ(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    } else if (e.key === "e") {
      const axis = new THREE.Vector3(0, 0, -1);

      this.cubes.forEach((cube) => {
        if (this.cubeInSameZ(cube, this.selectedCube))
          this.rotateArdWorldAxis(cube.cubeGroup, axis);
      });
    }
  }

  // CHANGE CUBE SELECTED COLORS

  highlightCubes(cubeToHighlight) {
    this.cubes.forEach((cube) => {
      let materialFaces = cube.cubeMesh.material;
      if (cube.cubeMesh.uuid === cubeToHighlight.uuid) {
        this.selectedCube = cube;

        materialFaces.map((face) => {
          face.opacity = 0.8;
        });
      } else {
        materialFaces.map((face) => (face.opacity = 1.0));
      }
    });
  }


  initializeRubiksCube() {
    this.cubes = [
      // Front face.
      new Cube(-1, 1, 1),
      new Cube(0, 1, 1),
      new Cube(1, 1, 1),
      new Cube(-1, 0, 1),
      new Cube(0, 0, 1),
      new Cube(1, 0, 1),
      new Cube(-1, -1, 1),
      new Cube(0, -1, 1),
      new Cube(1, -1, 1),

      // Middle face.
      new Cube(-1, 1, 0),
      new Cube(0, 1, 0),
      new Cube(1, 1, 0),
      new Cube(-1, 0, 0),
      new Cube(0, 0, 0),
      new Cube(1, 0, 0),
      new Cube(-1, -1, 0),
      new Cube(0, -1, 0),
      new Cube(1, -1, 0),

      // Back face.
      new Cube(-1, 1, -1),
      new Cube(0, 1, -1),
      new Cube(1, 1, -1),
      new Cube(-1, 0, -1),
      new Cube(0, 0, -1),
      new Cube(1, 0, -1),
      new Cube(-1, -1, -1),
      new Cube(0, -1, -1),
      new Cube(1, -1, -1),
    ];

    // agregamos todos los cubes al group
    this.cubes.forEach((cube) => {
      this.rubiksCubeGroup.add(cube.cubeGroup);
    });

    // pasamos un cube selected by default
    this.selectedCube = this.cubes[0];
  }
}
