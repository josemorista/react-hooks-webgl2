const glc = require('./glContext')

module.exports = function (canvasId) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl2');

  glc.init(gl);


  const Shader = require('./Shader')
  const Model = require('./Model')
  const ModelInstance = require('./Model/ModelInstance')
  const triangle = require('../../models/triangle')

  const shader = new Shader();

  shader.useProgram();
  let triangleModel = new Model(triangle.vertices, triangle.indices, []);
  let instance = new ModelInstance()

  const render = () => {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    triangleModel.bindBuffers()

    shader.enableAttribute('aVertexPosition');

    instance.updateRotations(1, 1, 1);

    shader.enableUMatrix4fv('uModelTransformationMatrix', instance.getModelTransformationMatrix())

    gl.drawElements(gl.TRIANGLES, triangleModel.indexes.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

}