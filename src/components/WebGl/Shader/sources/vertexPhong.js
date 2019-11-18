
module.exports =
  `#version 300 es
  precision mediump float;
  
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;

  uniform mat4 uViewTransformationMatrix;
  uniform mat4 uModelTransformationMatrix;
  uniform mat4 uProjectionTransformationMatrix;
  uniform mat4 uNormalTransformationMatrix;
  
  uniform vec3 uCamPosition;

  out vec3 vNormal;
  out vec3 eyeVector;

  void main () {
    vNormal = (uNormalTransformationMatrix * vec4(aVertexNormal, 1.0)).xyz;
    vec4 worldPosition = uModelTransformationMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uProjectionTransformationMatrix * uViewTransformationMatrix * worldPosition;
    eyeVector = (vec4(uCamPosition, 1.0) - worldPosition).xyz;
  }
`