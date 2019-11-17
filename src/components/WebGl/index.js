const glc = require('./glContext');

const { mat4 } = require('./glMatrix')

module.exports = async function (canvasId) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl2');

  glc.init(gl);

  const Shader = require('./Shader');
  const Model = require('./Model');
  const ModelInstance = require('./Model/ModelInstance');
  const Camera = require('./Camera');

  let cube = require('../../models/cube.json');

  let projectionMatrix = [];
  projectionMatrix = mat4.projectionMatrix(45, gl.canvas.width / gl.canvas.height, 0.1, 100);

  const shader = new Shader();

  shader.useProgram();

  let cubeModel = new Model(cube.vertices, cube.indices, []);
  let instance = new ModelInstance(0, 0, -6, 0, 0, 0, 0.5);

  let camera = new Camera(0, 0, 0)

  const render = () => {

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cubeModel.bindBuffers();

    instance.updateRotations(1, 1, 1);
    shader.enableAttribute('aVertexPosition');

    camera.updateTranslations(0, 0, 0.01);

    shader.enableUMatrix4fv('uViewMatrix', camera.getViewMatrix());
    shader.enableUMatrix4fv('uModelTransformationMatrix', instance.getModelTransformationMatrix());
    shader.enableUMatrix4fv('uProjectionMatrix', projectionMatrix);

    gl.drawElements(gl.TRIANGLES, cubeModel.indexes.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

}