const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

// Setting up scene in BabylonJS
function createScene() {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 1, -5),
    scene
  );
  camera.attachControl();
  camera.speed = 0.25;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  light.intensity = 1;

  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

const ground = BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 100, height: 100 },
  scene
);

const column = BABYLON.MeshBuilder.CreateCylinder(
  "column",
  { height: 2, diameter: 0.5, tessellation: 24 },
  scene
);

column.position = new BABYLON.Vector3(0, 1, 0);

// Setting Materials

const createColumnMaterial = () => {
  const columnMaterial = new BABYLON.StandardMaterial("columnMaterial", scene);
  const diffuseTex = new BABYLON.Texture("assets/textures/wood/wood-diffuse.jpg",scene); //color  map

  columnMaterial.diffuseTexture = diffuseTex;

  const normalTex = new BABYLON.Texture("assets/textures/wood/wood-normal.jpg",scene); //normal map

  columnMaterial.bumpTexture = normalTex;

  const aoTex = new BABYLON.Texture("assets/textures/wood/wood-ao.jpg", scene);

  columnMaterial.ambientTexture = aoTex;

  const specTex = new BABYLON.Texture("assets/textures/wood/wood-spec.jpg", scene);

  columnMaterial.specularTexture = specTex;

  return columnMaterial;
};

column.material = createColumnMaterial();
