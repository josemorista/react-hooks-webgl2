module.exports = `#version 300 es
precision mediump float;
uniform vec3  uMaterialDiffuse;

in vec3  N;
in vec3  L;
in vec3  R;
in vec3  E;

out vec4 fragColor;

void main()
{
    vec3 cool    = min(vec3(0.0, 0.0, 0.6) + 0.35 * uMaterialDiffuse, 1.0);
    vec3 warm    = min(vec3(0.6, 0.6, 0.0) + 0.45 * uMaterialDiffuse, 1.0); 
    vec3 final   = mix(cool, warm, dot(N, -L));

    vec3 nreflect = normalize(R);
    vec3 nview    = normalize(E);

    float spec    = max(dot(nreflect, nview), 0.0);
    spec          = pow(spec, 32.0);

    fragColor = vec4(min(final + spec, 1.0), 1.0);
}`