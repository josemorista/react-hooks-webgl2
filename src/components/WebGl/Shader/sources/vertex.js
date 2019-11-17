
module.exports =
  `#version 300 es
  precision mediump float;
  in vec3 aVertexPosition;
  
  uniform mat4 uModelTransformationMatrix;

  void main () {
    gl_Position = vec4(aVertexPosition, 1.0) * uModelTransformationMatrix;
  }
`