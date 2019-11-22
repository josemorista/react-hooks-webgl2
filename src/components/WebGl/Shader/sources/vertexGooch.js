module.exports = `#version 300 es
  precision mediump float;
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;
  uniform vec3  uLightPosition; 
  uniform mat4 uModelViewTransformationMatrix;
  uniform mat4 uProjectionTransformationMatrix;
  uniform mat4 uNormalTransformationMatrix;
  out vec3  N;
  out vec3  L;
  out vec3  R;
  out vec3  E;
  void main()
  { 
      N = normalize(((uNormalTransformationMatrix * vec4(aVertexNormal, 1.0)).xyz));
      vec3 pos = (uModelViewTransformationMatrix * vec4(aVertexPosition, 1.0)).xyz;
      E = normalize(-pos); // we are in Eye Coordinates, so EyePos is (0,0,0)
      L = normalize(pos - uLightPosition);
      R = reflect(L, N);
      gl_Position = uProjectionTransformationMatrix * uModelViewTransformationMatrix * vec4(aVertexPosition, 1.0);
  }
`