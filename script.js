const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    BABYLON.Tools.ToRadians(90),
    BABYLON.Tools.ToRadians(65),
    10,
    BABYLON.Vector3.Zero(),
    scene
  );

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Load the character
  BABYLON.SceneLoader.ImportMesh(
    "",
    "LadyBugCharacter/",
    "LadyBug.gltf",
    scene,
    function (meshes) {
      //   // Set the position and scale of the character
      //   var character = meshes[0];
      //   const vector = new BABYLON.Vector3(0, 0, 0);
      //   // character.scaling = new BABYLON.Vector3(1, 1, 1);
      const character = meshes[0];
      

      
      character.position = new BABYLON.Vector3(0, 5, 0);
      character.rotation = new BABYLON.Vector3(0, 0, 0);

      character.lockRotation = true;
      
      scene.addMesh(character);
      //   scene.onKeyboardObservable.add((e) => {
      //     if (e.event.key === "ArrowUp") {
      //       console.log('clicked')
      //       character.vector.x += 1;
      //     }

      //     character.lockRotation = true;

      //   });

      // Attach the camera to the character or position it appropriately
      // scene.activeCamera.parent = character;
    }
  );

  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
