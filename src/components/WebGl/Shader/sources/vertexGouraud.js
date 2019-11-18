module.exports = `#version 300 es
  precision mediump float;

  in vec3 aVertexPosition;
  in vec3 aVertexNormal;

  out vec4 vColor;

  uniform mat4 uNormalTransformationMatrix;
  uniform mat4 uModelTransformationMatrix;
  uniform mat4 uViewTransformationMatrix;
  uniform mat4 uProjectionTransformationMatrix;

  uniform vec3 uCamPosition;

  uniform vec3 uLightPosition;
  uniform vec3 uLightColor;
  uniform float uLightAmbientIntensity;
  uniform float uLightDiffuseIntensity;
  uniform float uLightSpecularIntensity;

  uniform vec3 uMaterialAmbient;
  uniform vec3 uMaterialDiffuse;
  uniform vec3 uMaterialSpecular;
  uniform float uMaterialSpecularPower;

  void main () {
    vec4 worldPosition = uModelTransformationMatrix * vec4(aVertexPosition, 1.0);

    gl_Position = uProjectionTransformationMatrix * uViewTransformationMatrix * worldPosition;

    vec3 vNormal = (uNormalTransformationMatrix * vec4(aVertexNormal, 1.0)).xyz;
    vec3 eyeVector = (vec4(uCamPosition, 1.0) - worldPosition).xyz;

    vec3 L = normalize(uLightPosition);
    vec3 N = normalize(vNormal);
    vec3 V = normalize(eyeVector);
    vec3 R = reflect(L, N);

    float diffuse = clamp(dot(N, -L), 0.0, 1.0);
    float specular = pow(clamp(dot(R, V), 0.0, 1.0), uMaterialSpecularPower);

    vec4 Ia = uLightAmbientIntensity * vec4(uMaterialAmbient, 1.0);
    vec4 Id = uLightDiffuseIntensity * vec4(uLightColor, 1.0) * vec4(uMaterialDiffuse, 1.0) * diffuse;
    vec4 Is = uLightSpecularIntensity * vec4(uMaterialSpecular, 1.0) * specular;

    vColor = Ia + Id + Is;

  }

`
