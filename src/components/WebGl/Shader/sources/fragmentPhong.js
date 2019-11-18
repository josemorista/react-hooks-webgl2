module.exports =
  `#version 300 es
  precision mediump float;

  in vec3 eyeVector;
  in vec3 normalVector;

  uniform vec3 uLightPosition;
  uniform vec3 uLightColor;
  uniform float uLightDiffuseIntensity;
  uniform float uLightSpecularIntensity;
  uniform float uLightAmbientIntensity;
  
  uniform vec3 uMaterialAmbient;
  uniform vec3 uMaterialDiffuse;
  uniform vec3 uMaterialSpecular;
  uniform float uMaterialSpecularPower;

  out vec4 fragColor;
  
  void main () {
    vec3 N = normalize(normalVector);
    vec3 L = normalize(uLightPosition);
    vec3 V = normalize(eyeVector);
    
    vec3 Ia	= uMaterialAmbient * uLightAmbientIntensity;
  
    float diffuse = clamp(dot(N, -L), 0.0, 1.0);
    vec3 Id = diffuse * uMaterialDiffuse * uLightDiffuseIntensity * uLightColor;
    
    vec3 R = reflect(L, N);	
    float specular = pow(clamp(dot(R, V), 0.0, 1.0), uMaterialSpecularPower);
    vec3 Is = uMaterialSpecular * uLightSpecularIntensity * specular;
    
    fragColor = vec4((Ia + Id + Is), 1.0);
  }
`