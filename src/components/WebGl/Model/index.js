const glc = require('../glContext');

const gl = glc.getContext();

class Model {
  constructor(vertices, indexes, normals) {
    this.vertices = vertices;
    this.normals = normals;
    this.indexes = indexes;

    this.vertexBuffer = this.genArrayBuffer(this.vertices);
    this.indexBuffer = this.genIndexBuffer(this.indexes);
    this.normalBuffer = this.genArrayBuffer(this.normals);
  }

  genArrayBuffer(data) {
    const arrayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return arrayBuffer;
  }

  genIndexBuffer(indexes) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return indexBuffer;
  }

  bindBuffers() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  }

}

module.exports = Model