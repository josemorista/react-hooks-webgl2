module.exports = `#version 300 es
precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;
uniform float uLightAmbientIntensity;
uniform float uLightDiffuseIntensity;
uniform float uLightSpecularIntensity;

uniform vec3 uMaterialDiffuse;
uniform vec3 uMaterialSpecular;
uniform vec3 uMaterialAmbient;
uniform float uMaterialSpecularPower;

in vec3 fragPos;
in vec3 fragNormal;

out vec4 fragColor;

void main()
{
  vec3 N = normalize(fragNormal);
  vec3 V = normalize(-fragPos);
  vec3 vertexToLightSource = uLightPosition - fragPos;
  vec3 lightDirection = normalize(vertexToLightSource);

  vec3 fragmentColor = vec3(1, 1, 1);
  
  if (dot(V, N) < mix(0.085, 0.8, max(0.0, dot(N, lightDirection)))) {
    fragmentColor = fragmentColor * vec3(uLightColor) * vec3(0,0,0);
  }

  fragColor = vec4(fragmentColor, 1.0);
}
`
