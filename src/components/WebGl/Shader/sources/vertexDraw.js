
module.exports =
  `#version 300 es

precision mediump float;

in vec3 aVertexPosition;
in vec3 aVertexNormal;

uniform mat4 uModelViewTransformationMatrix;
uniform mat4 uProjectionTransformationMatrix;
uniform mat4 uNormalTransformationMatrix;

out vec3 fragPos;
out vec3 fragNormal;

void main () {
fragPos = (uModelViewTransformationMatrix * vec4(aVertexPosition, 1.0)).xyz;
fragNormal = (uNormalTransformationMatrix * vec4(aVertexNormal, 1.0)).xyz;

gl_Position = uProjectionTransformationMatrix * uModelViewTransformationMatrix * vec4(aVertexPosition, 1.0);
}
`