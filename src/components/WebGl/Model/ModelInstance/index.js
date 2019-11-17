const { mat4 } = require('../../glMatrix')

module.exports = class ModelInstance {
  constructor(x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sc = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.sc = sc;
    this.parents = []
    this.updateModelTransformationMatrix()
  }

  pushParent(parent) {
    this.parents.push(parent);
  }

  popParent() {
    return this.parents.pop()
  }

  updateRotations(rx, ry, rz) {
    this.rx += rx;
    this.ry += ry;
    this.rz += rz;
    this.updateModelTransformationMatrix()
  }

  updateTranslations(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
    this.updateModelTransformationMatrix()
  }

  updateScale(sc) {
    this.sc += sc;
  }

  getModelTransformationMatrix() {
    let m = mat4.identity();
    for (let i = 0; i < this.parents.length; i++) {
      m = mat4.multiply(m, this.parents[i].getModelTransformationMatrix());
    }
    return mat4.multiply(m, this.modelTransformationMatrix);
  }

  updateModelTransformationMatrix() {
    let m = mat4.identity();

    m = mat4.translate(m, [this.x, this.y, this.z]);

    m = mat4.rotateX(m, this.rx);

    m = mat4.rotateY(m, this.ry);

    m = mat4.rotateZ(m, this.rz);

    m = mat4.scale(m, this.sc);

    this.modelTransformationMatrix = m;
  }

}