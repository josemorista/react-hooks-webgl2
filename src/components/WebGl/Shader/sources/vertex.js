
module.exports =
  `#version 300 es
  precision mediump float;
  in vec3 aVertexPosition;
  
  uniform mat4 uViewMatrix;
  uniform mat4 uModelTransformationMatrix;
  uniform mat4 uProjectionMatrix;

  void main () {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelTransformationMatrix * vec4(aVertexPosition, 1.0);
  }
`