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

// Create the repeated objects (down)

var numRepetitions = 5; // Number of repetitions you want
var objectPositions = []; // Array to store object positions

objectPositions[0] = column;

for (var i = 0; i < numRepetitions; i++) {
  // Calculate the position of each object
  var posX = i * 2; // Example calculation, adjust as needed
  var posY = 0; // Example calculation, adjust as needed
  var posZ = 0; // Example calculation, adjust as needed

  // Store the position in the array
  objectPositions.push(new BABYLON.Vector3(posX, posY, posZ));

}
for (var i = 1; i < objectPositions.length; i++) {
    // Clone the initial object
    var repeatedObject = column.clone();
  
    // Set the position of the repeated object
      repeatedObject.position = objectPositions[i];
      repeatedObject.position = new BABYLON.Vector3(i * 2, 1, 0); 
  
    // Add the repeated object to the scene
    scene.addMesh(repeatedObject);
  }
  
// Create the repeated objects (up)

var numRepetitions = 5; // Number of repetitions you want
var objectPositions = []; // Array to store object positions

objectPositions[0] = column;

for (var i = 0; i < numRepetitions; i++) {
  // Calculate the position of each object
  var posX = i * 2; // Example calculation, adjust as needed
  var posY = 0; // Example calculation, adjust as needed
  var posZ = 0; // Example calculation, adjust as needed

  // Store the position in the array
  objectPositions.push(new BABYLON.Vector3(posX, posY, posZ));

}
for (var i = 0; i < objectPositions.length; i++) {
    // Clone the initial object
    var repeatedObject = column.clone();
  
    // Set the position of the repeated object
      repeatedObject.position = objectPositions[i];
      repeatedObject.position = new BABYLON.Vector3(i * 2, 4, 0); 
  
    // Add the repeated object to the scene
    scene.addMesh(repeatedObject);
  }


  //Setting the Backgournd

// var skybox = BABYLON.MeshBuilder.CreateBox("skybox", { size: 1000 }, scene);

// var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
// skyboxMaterial.backFaceCulling = false;
// skybox.material = skyboxMaterial;                                                         //prv nacin
// skyboxMaterial.diffuseTexture = new BABYLON.Texture("Background-Scene-2.png", scene);
// skyboxMaterial.disableDepthWrite = true;

var backgroundTexture = new BABYLON.Texture("Background-Scene-2.png", scene);
var plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: 30, height: 10 }, scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = backgroundTexture;
plane.material = material;
plane.position = new BABYLON.Vector3(3, 5, 10);  // Adjust the position as needed
plane.rotation = new BABYLON.Vector3(Math.PI / 50, 0, 0);
plane.scaling = new BABYLON.Vector3(1, 1, 1);

//Importing the character

// Load the character
BABYLON.SceneLoader.ImportMesh("/LadyBugCharacter/","LadyBug.gltf", scene, function (newMeshes) {
  // Access the character mesh and modify its properties if needed
  var characterMesh = newMeshes[0];
  character.position = new BABYLON.Vector3(0, 0, 0);
  character.scaling = new BABYLON.Vector3(1, 1, 1);

  scene.activeCamera.parent = character;
});

