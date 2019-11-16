class GlContext {
  init(gl) {
    this.gl = gl;
  }

  getContext() {
    return this.gl;
  }

}

const glc = new GlContext();

module.exports = glc;