const { mat4 } = require('../glMatrix');

module.exports = class Camera {
  constructor(x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.updateViewMatrix()
  }

  updateTranslations(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
    this.updateViewMatrix()
  }

  getViewMatrix() {
    return this.viewMatrix;
  }

  updateViewMatrix() {
    let m = mat4.identity();

    m = mat4.translate(m, [this.x, this.y, this.z]);

    m = mat4.rotateX(m, this.rx);
    m = mat4.rotateY(m, this.ry);
    m = mat4.rotateZ(m, this.rz);

    this.viewMatrix = m;
  }

}