module.exports =
  `#version 300 es
  precision mediump float;

  in vec3 eyeVector;
  in vec3 vNormal;

  uniform vec3 uLightPosition;
  uniform vec3 uLightColor;
  uniform float uLightAmbient;

  uniform vec3 uMaterialDiffuse;
  uniform vec3 uMaterialSpecular;

  out vec4 fragColor;
  
  void main () {

    vec3 N = normalize(vNormal); 
    vec3 L = normalize(uLightPosition);
    vec3 V = normalize(-eyeVector);

    float specularPower = 1.0;

    vec4 Ia = vec4(1.0);
    vec4 Is = vec4(1.0);

    // Ambient light
    Ia = uLightAmbient * Ia;

    // Diffuse Light
    float diffuse = clamp(dot(N, -L), 0.0, 1.0);
    vec4 Id = vec4(uMaterialDiffuse, 1.0) * vec4(uLightColor, 1.0) * vec4(1.0, 1.0, 0.0, 1.0) * diffuse;

    vec3 R = reflect(N, -L);
    float specular = pow(clamp(dot(R, V), 0.0, 1.0), specularPower);

    Is = specular * vec4(uMaterialSpecular, 1.0) * Is;

    fragColor = (Ia + Id + Is);
  }
`
