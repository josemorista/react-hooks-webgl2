module.exports = class Light {
  constructor(x, y, z, r, g, b, ambient = 1, diffuse = 1, specular = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.g = g;
    this.b = b;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
  }

  getColor() {
    return [this.r, this.g, this.b];
  }

  getPosition() {
    return [this.x, this.y, this.z];
  }

  getAmbientIntensity() {
    return this.ambient;
  }

  getSpecularIntensity() {
    return this.specular;
  }

  getDiffuseIntensity() {
    return this.diffuse;
  }

}