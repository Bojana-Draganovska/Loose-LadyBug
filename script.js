const playBtn = document.getElementById("startBtn");

playBtn.addEventListener('click', function() {
  playBtn.classList.add('hidden');
})

const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.2, 0.3, 0);


  // Setting up the camera
  var camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(1, 1, -50),
    scene
  );
  camera.setTarget(new BABYLON.Vector3(35, 0, 0));
  camera.attachControl(canvas, true);

  const column = BABYLON.MeshBuilder.CreateCylinder(
    "column",
    { height: 2, diameter: 0.5, tessellation: 24 },
    scene
  );

  // Columns
  var columns = [];

  // Setting Materials for Columns
  const createColumnMaterial = () => {
    const columnMaterial = new BABYLON.StandardMaterial(
      "columnMaterial",
      scene
    );
    const diffuseTex = new BABYLON.Texture(
      "assets/textures/wood/wood-diffuse.jpg",
      scene
    ); //color  map

    columnMaterial.diffuseTexture = diffuseTex;

    const normalTex = new BABYLON.Texture(
      "assets/textures/wood/wood-normal.jpg",
      scene
    ); //normal map

    columnMaterial.bumpTexture = normalTex;

    const aoTex = new BABYLON.Texture(
      "assets/textures/wood/wood-ao.jpg",
      scene
    );

    columnMaterial.ambientTexture = aoTex;

    const specTex = new BABYLON.Texture(
      "assets/textures/wood/wood-spec.jpg",
      scene
    );

    columnMaterial.specularTexture = specTex;

    // columnMaterial.position.x = 10;
    // columnMaterial.position.y = Math.random() * 4 - 2;
    // columns.push(columnMaterial);

    return columnMaterial;
  };

  let startingPositionColX = -12;
  let startingPositionColY = -12;
  let startingPositionColZ = 1;

  for (let i = 0; i < 10; i++) {
    column.scaling = new BABYLON.Vector3(10, 8, -10);
    column.position = new BABYLON.Vector3(
      startingPositionColX + i,
      startingPositionColY + i,
      startingPositionColZ + 1
    );
    column.material = createColumnMaterial();
  }



  // function movePipes() {
  //   for (var i = 0; i < pipes.length; i++) {
  //     pipes[i].position.x -= 0.05;
  //     if (pipes[i].position.x < -10) {
  //       pipes[i].dispose();
  //       pipes.splice(i, 1);
  //       i--;
  //     }
  //   }
  // }

  // Generate initial pipes and create new pipes periodically
  createColumnMaterial();
  setInterval(createColumnMaterial, 2000);

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
      // Set the position and scale of the character
      // var character = meshes[0];

      //   const vector = new BABYLON.Vector3(0, 0, 0);

      console.log("tukaaaaasum");

      meshes.scaling = new BABYLON.Vector3(1, 1, 1);
      meshes.position = new BABYLON.Vector3(8, 1, 2);
      meshes.rotation = new BABYLON.Vector3(10, 21, 0);

      meshes._isDirty = true;
      // meshes._position._isDirty = true;

      var character = meshes[0];

      console.log(character);

      // meshes.setPosition(new BABYLON.Vector3(5, 2, -3));

      character.lockRotation = true;

      scene.addMesh(character);
      //   scene.onKeyboardObservable.add((e) => {
      //     if (e.event.key === "ArrowUp") {
      //       console.log('clicked')
      //       character.vector.x += 1;
      //     }

      //     character.lockRotation = true;

      //   });
      console.log("hahahahhaha");

      // Attach the camera to the character or position it appropriately
      scene.activeCamera.parent = character;
    }
  );

  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

