module.exports =
  `#version 300 es
  precision mediump float;

  in vec3 eyeVector;
  in vec3 vNormal;

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

    vec3 N = normalize(vNormal); 
    vec3 L = normalize(uLightPosition);
    vec3 V = normalize(-eyeVector);

    // Ambient light
    vec4 Ia = uLightAmbientIntensity * vec4(uMaterialAmbient, 1.0);

    // Diffuse Light
    float diffuse = clamp(dot(N, -L), 0.0, 1.0);
    vec4 Id = uLightDiffuseIntensity * vec4(uMaterialDiffuse, 1.0) * vec4(uLightColor, 1.0) * diffuse;

    // Specular Light
    vec3 R = reflect(-L, N);
    float specular = pow(clamp(dot(R, V), 0.0, 1.0), uMaterialSpecularPower);
    vec4 Is = uLightSpecularIntensity * vec4(uMaterialSpecular, 1.0) * specular;

    fragColor = (Ia + Id + Is);
  }
`
