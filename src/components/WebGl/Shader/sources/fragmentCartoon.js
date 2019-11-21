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
  vec3 vertexToLightSource = fragPos- uLightPosition;
  float distance = length(vertexToLightSource);
  float attenuation = 1.0 / distance; // linear attenuation
  vec3 lightDirection = normalize(vertexToLightSource);

  // Ambient Lighting
  vec3 Ia = uMaterialAmbient * uLightAmbientIntensity;

  // Diffuse Lighting
  vec3 fragmentColor = vec3(uLightColor) * vec3(uMaterialDiffuse) * uLightDiffuseIntensity;

  // Outline
  if (dot(V, N) < mix(0.4, 0.4, max(0.0, dot(N, -lightDirection)))) {
    fragmentColor = fragmentColor * vec3(uLightColor) * vec3(0,0,0);
  }

  // HighLights
  if (dot(-lightDirection, N) > 0.0 && attenuation * pow(max(0.0, dot(reflect(lightDirection, N), V)), uMaterialSpecularPower) > 0.5) {
    fragmentColor = uLightSpecularIntensity * vec3(0.8) * fragmentColor;
  }

  fragColor = vec4(Ia + fragmentColor, 1.0);
}
`
