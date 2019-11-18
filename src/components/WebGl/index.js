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
  const Light = require('./Light');

  let cube = require('../../models/cube.json');

  let projectionMatrix = [];
  projectionMatrix = mat4.projectionMatrix(45, gl.canvas.width / gl.canvas.height, 0.1, 100);

  const shader = new Shader();

  shader.useProgram();

  let cubeModel = new Model(cube.vertices, cube.indices, []);
  let instance = new ModelInstance(0, 0, -6, 0, 0, 0, 0.5);

  let camera = new Camera(0, 0, 0)
  let light = new Light(0, 0, -1, 1.0, 1.0, 1.0, 0.1);

  const render = () => {

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cubeModel.bindArrayBuffer('vertexBuffer');
    shader.enableAttribute('aVertexPosition');

    cubeModel.bindArrayBuffer('normalBuffer');
    shader.enableAttribute('aVertexNormal');

    instance.updateRotations(instance.rx + 1, instance.ry + 1, instance.rz + 1);

    shader.enableUMatrix4fv('uViewMatrix', camera.getViewMatrix());
    shader.enableUMatrix4fv('uModelTransformationMatrix', instance.getModelTransformationMatrix());
    shader.enableUMatrix4fv('uProjectionMatrix', projectionMatrix);
    shader.enableUMatrix4fv('uNormalTransformationMatrix', instance.getNormalTransformationMatrix());
    shader.enableUArray3fv('uCamPosition', camera.getPosition());

    shader.enableUArray3fv('uLightPosition', light.getPosition());
    shader.enableUArray3fv('uLightColor', light.getColor());
    shader.enableU1f('uLightSpecularIntensity', light.getSpecularIntensity());
    shader.enableU1f('uLightAmbientIntensity', light.getAmbientIntensity());
    shader.enableU1f('uLightDiffuseIntensity', light.getDiffuseIntensity());

    shader.enableU1f('uMaterialSpecularPower', cubeModel.specularPower);
    shader.enableUArray3fv('uMaterialAmbient', cubeModel.ambient);
    shader.enableUArray3fv('uMaterialDiffuse', cubeModel.diffuse);
    shader.enableUArray3fv('uMaterialSpecular', cubeModel.specular);

    cubeModel.bindIndexBuffer('indexBuffer');
    gl.drawElements(gl.TRIANGLES, cubeModel.indexes.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

}