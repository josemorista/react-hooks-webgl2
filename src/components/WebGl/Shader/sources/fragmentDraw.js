module.exports = `#version 300 es
precision mediump float;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;
in vec3 fragPos;
in vec3 fragNormal;
out vec4 fragColor;
void main()
{
  vec3 N = normalize(fragNormal);
  vec3 V = normalize(-fragPos);
  vec3 vertexToLightSource = fragPos - uLightPosition;
  vec3 lightDirection = normalize(vertexToLightSource);
  vec3 fragmentColor = vec3(1, 1, 1);
  if (dot(V, N) < mix(0.088, 0.8, max(0.0, dot(N, -lightDirection)))) {
    fragmentColor = fragmentColor * vec3(uLightColor) * vec3(0,0,0);
  }
  fragColor = vec4(fragmentColor, 1.0);
}
`
