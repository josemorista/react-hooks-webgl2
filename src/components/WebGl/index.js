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
  const { normalize, getCenter } = require('../../models');
  let modelData = normalize(require('../../models/laurana.json'));

  let projectionMatrix = [];
  projectionMatrix = mat4.projectionMatrix(45, gl.canvas.width / gl.canvas.height, 0.1, 100);

  const shader = new Shader('vertexPhong', 'fragmentPhong');

  shader.useProgram();

  let model = new Model(modelData.vertices, modelData.indices);
  let center = getCenter(model);
  let instance = new ModelInstance(0, 0, 0, 0, 0, 0, 1);

  let camera = new Camera(0, 0, -2)
  let light = new Light(0, 0, -1, 1, 1, 1);
  instance.updateTranslations(-center[0], -center[1], -center[2]);
  instance.setCamera(camera);
  const render = () => {

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /*instance.updateTranslations(center[0], center[1], center[2]);
    instance.updateRotations(0, 1, 0);
    instance.updateTranslations(-center[0], -center[1], -center[2]);*/

    model.bindArrayBuffer('vertexBuffer');
    shader.enableAttribute('aVertexPosition');

    model.bindArrayBuffer('normalBuffer');
    shader.enableAttribute('aVertexNormal');

    shader.enableUMatrix4fv('uModelViewTransformationMatrix', instance.getModelViewTransformationMatrix());
    shader.enableUMatrix4fv('uProjectionTransformationMatrix', projectionMatrix);
    shader.enableUMatrix4fv('uNormalTransformationMatrix', instance.getNormalTransformationMatrix());

    shader.enableUArray3fv('uLightPosition', light.getPosition());
    shader.enableUArray3fv('uLightColor', light.getColor());
    shader.enableU1f('uLightSpecularIntensity', light.getSpecularIntensity());
    shader.enableU1f('uLightAmbientIntensity', light.getAmbientIntensity());
    shader.enableU1f('uLightDiffuseIntensity', light.getDiffuseIntensity());

    shader.enableU1f('uMaterialSpecularPower', model.specularPower);
    shader.enableUArray3fv('uMaterialAmbient', model.ambient);
    shader.enableUArray3fv('uMaterialDiffuse', model.diffuse);
    shader.enableUArray3fv('uMaterialSpecular', model.specular);

    model.bindIndexBuffer('indexBuffer');
    gl.drawElements(gl.TRIANGLES, model.indexes.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

}