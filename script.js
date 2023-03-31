// // VANILLA JS

// // Get the canvas element and its context
// const canvas2d = document.getElementById("canvas");
// var ctx = canvas2d.getContext("2d");

// var positionX = 50;

// for (let i = 0; i < 10; i++) {

//   ctx.fillStyle = "pink";
//   ctx.fillRect(positionX += 50, 0, 25, (Math.floor(Math.random() * 101) + 100));
// }

// positionX = 50;

// const helper2d = document.getElementById("helper");
// var ctxHelper = helper2d.getContext("2d");


// for (let i = 0; i < 10; i++) {

//   ctxHelper.fillStyle = "pink";
//   ctxHelper.fillRect(positionX += 50, 0, 25, (Math.floor(Math.random() * 101) + 100));
// }



// // BABYLON JS

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// // canvas2d.width = canvas.clientWidth;
// // canvas2d.height = canvas.clientHeight;

// const createScene = function () {
//   const scene = new BABYLON.Scene(engine);

//   // This sets the background color
//   scene.clearColor = new BABYLON.Color4(1.0, 0.63, 0.79, 1.0);


//   const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
//   camera.attachControl(canvas, true);
//   const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

//   return scene;
// };

// const scene = createScene(); //Call the createScene function

// // Register a render loop to repeatedly render the scene
// engine.runRenderLoop(function () {
//   scene.render();
// });

// // Watch for browser/canvas resize events
// // window.addEventListener("resize", function () {
// //   engine.resize();
// // });

// // Create a new rectangle mesh
// var rectangle = BABYLON.MeshBuilder.CreateBox("rectangle", { width: 3, height: 5, depth: 1.5 });

// // Set the position and rotation of the rectangle
// rectangle.position = new BABYLON.Vector3(0, 0, 0);
// rectangle.rotation = new BABYLON.Vector3(0, 0, 0);

// // Set the material of the rectangle
// var material = new BABYLON.StandardMaterial("mat", scene);

// // Create a new texture for the material
// var texture = new BABYLON.DynamicTexture("gradient", { width: 256, height: 256 }, scene);

// // Set the material's diffuse texture to the gradient texture
// material.diffuseTexture = texture;

// // material.diffuseColor = new BABYLON.Color3(0, 2, 2);
// rectangle.material = material;

// // Create a linear gradient for the texture
// var context = texture.getContext();
// var gradient = context.createLinearGradient(256, 0, 256, 256);


// gradient.addColorStop(0, "rgb(0, 255, 209)"); // Base Color - Green
// gradient.addColorStop(0.5, "rgb(239, 200, 235)"); // Pink
// gradient.addColorStop(1, "rgb(255, 255, 255)"); // White



// // Fill the texture with the gradient
// context.fillStyle = gradient;
// context.fillRect(0, 0, 256, 256);
// texture.update();

// // Assign the material to the rectangle mesh
// rectangle.material = material;

// Create a new scene
var scene = new BABYLON.Scene(engine);

// Add a camera to the scene
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);

// Add a light to the scene
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 10, 0), scene);

// Load the ladybug mesh and create a new instance of it
BABYLON.SceneLoader.ImportMesh("", "https://models.babylonjs.com/", "ladybug.glb", scene, function (newMeshes) {
  var ladybug = newMeshes[0];
  
  // Position the ladybug in the scene
  ladybug.position = new BABYLON.Vector3(0, 0, 0);
  
  // Set the material of the ladybug to a red color
  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(1, 0, 0);
  ladybug.material = material;
});

// Start the render loop
engine.runRenderLoop(function () {
  scene.render();
});
