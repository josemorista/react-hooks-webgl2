module.exports = class Light {
  constructor(x, y, z, r, g, b, ambient) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.g = g;
    this.b = b;
    this.ambient = ambient;
  }

  getColor() {
    return [this.r, this.g, this.b];
  }

  getPosition() {
    return [this.x, this.y, this.z];
  }

  getAmbient() {
    return this.ambient;
  }

}