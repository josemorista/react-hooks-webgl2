const glc = require('../glContext');

const gl = glc.getContext();

module.exports = class Shader {
  constructor() {

    this.vertexSource = require('./sources/vertex');
    this.fragmentSource = require('./sources/fragment');

    console.log(this.vertexSource)

    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(this.vertexShader, this.vertexSource);
    gl.compileShader(this.vertexShader);

    if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
      alert("Um erro ocorreu ao compilar os shaders: " + gl.getShaderInfoLog(this.vertexShader));
    }

    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(this.fragmentShader, this.fragmentSource);
    gl.compileShader(this.fragmentShader);

    if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
      alert("Um erro ocorreu ao compilar os shaders: " + gl.getShaderInfoLog(this.fragmentShader));
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      alert("Não foi possível inicializar o programa shader.");
    }
  }

  useProgram() {
    gl.useProgram(this.program);
  }

  enableAttribute(name) {
    const attribute = gl.getAttribLocation(this.program, name);
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
  }

  enableUMatrix4fv(name, matrix = [], flatten = true) {
    const uniform = gl.getUniformLocation(this.program, name);
    const m = flatten ? new Float32Array(matrix.flat()) : matrix;
    gl.uniformMatrix4fv(uniform, false, m);
  }

}