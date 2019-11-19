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
    this.camera = null;
    this.updateModelTransformationMatrix()
  }

  pushParent(parent) {
    this.parents.push(parent);
    this.updateModelTransformationMatrix()
  }

  popParent() {
    const tmp = this.parents.pop();
    this.updateModelTransformationMatrix();
    return tmp;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  updateRotations(rx, ry, rz) {
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.updateModelTransformationMatrix()
  }

  updateTranslations(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.updateModelTransformationMatrix()
  }

  updateScale(sc) {
    this.sc = sc;
  }

  getModelViewTransformationMatrix() {
    if (this.camera) {
      return mat4.multiply(this.camera.getViewMatrix(), this.getModelTransformationMatrix());
    }
    return this.getModelTransformationMatrix();
  }

  getModelTransformationMatrix() {
    return this.modelTransformationMatrix;
  }

  getNormalTransformationMatrix() {
    return this.normalTransformationMatrix;
  }

  updateNormalTransformationMatrix() {
    let m = mat4.inverse(this.getModelViewTransformationMatrix());
    m = mat4.transpose(m);
    this.normalTransformationMatrix = m;
  }

  updateModelTransformationMatrix() {
    let m = mat4.identity();

    m = mat4.translate(m, [this.x, this.y, this.z]);

    m = mat4.rotateX(m, this.rx);

    m = mat4.rotateY(m, this.ry);

    m = mat4.rotateZ(m, this.rz);

    m = mat4.scale(m, this.sc);

    let hierarchy = mat4.identity();
    for (let i = 0; i < this.parents.length; i++) {
      hierarchy = mat4.multiply(hierarchy, this.parents[i].getModelTransformationMatrix());
    }
    m = mat4.multiply(hierarchy, m);

    this.modelTransformationMatrix = m;

    this.updateNormalTransformationMatrix();
  }

}