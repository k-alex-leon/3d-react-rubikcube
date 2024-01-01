import React, { useEffect, useState } from "react";
import RubiksCube from "./RubiksCube";
import SceneInit from "./SceneInit";
import { Raycaster, Vector2 } from "three";
import Controls from "./Controls";

function App() {
  useEffect(() => {
    const test = new SceneInit("myThreeCanvas");
    test.initScene();
    test.animate();

    const r = new RubiksCube();
    test.scene.add(r.rubiksCubeGroup);

    const mouse = new Vector2();
    const raycaster = new Raycaster();

    // EVENTOS DEL MOUSE
    function onMouseDown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, test.camera);
      const objects = raycaster.intersectObjects(r.rubiksCubeGroup.children);
      const cubeObjects = objects.filter((c) => {
        return c.object.type === "Mesh";
      });

      if (cubeObjects.length !== 0) r.highlightCubes(cubeObjects[0].object);
    }

    // EVENTOS DEL TECLADO

    const onKeyDown = (event) => {
      if (event.repeat) return;

      r.onKeyDown(event);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <>
      <div className="absolute">
        <canvas id="myThreeCanvas"></canvas>
      </div>

      {/* <Controls /> */}

      <Controls />
    </>
  );
}

export default App;
