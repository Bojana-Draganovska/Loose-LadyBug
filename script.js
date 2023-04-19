const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

// Setting up scene in BabylonJS
function createScene() {

const scene = new BABYLON.Scene(engine); 

const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,1,-5), scene);
camera.attachControl();

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

light.intensity = 0.5;


return scene;

}

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

const ladybug = BABYLON.MeshBuilder.CreateSphere("ladybug", {diameter: 1}, scene);

ladybug.position = new BABYLON.Vector3(0,1,0);