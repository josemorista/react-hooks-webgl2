module.exports =
  `#version 300 es

  precision mediump float;
  
  in vec3 fragNormal;
  in vec3 fragPos;
  
  uniform float uLightAmbientIntensity;
  uniform float uLightDiffuseIntensity;
  uniform float uLightSpecularIntensity;
  uniform vec3 uLightColor;
  uniform vec3 uLightPosition;
  
  uniform vec3 uMaterialSpecular;
  uniform vec3 uMaterialDiffuse;
  uniform vec3 uMaterialAmbient;
  uniform float uMaterialSpecularPower;
  
  out vec4 fragColor;
  
  void main () {
    vec3 N = normalize(fragNormal);
    vec3 E = normalize(-fragPos); // we are in Eye Coordinates, so EyePos is (0,0,0)
    vec3 L = normalize(fragPos - uLightPosition);
    vec3 R = reflect(L, N);
  
    // Ambient Light
    vec3 Ia = uMaterialAmbient * uLightAmbientIntensity;
  
    // Diffuse Light
    float diffuse = clamp(dot(N, -L), 0.0, 1.0);
    vec3 Id = diffuse * uMaterialDiffuse * uLightColor * uLightDiffuseIntensity;
    
    // Specular Light
    float specular = pow(clamp(dot(R, E), 0.0, 1.0), uMaterialSpecularPower);
    vec3 Is = specular * uMaterialSpecular * uLightSpecularIntensity;
  
    fragColor = vec4((Ia + Id + Is), 1.0);
  }
  
`