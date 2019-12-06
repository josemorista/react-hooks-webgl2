module.exports =
  `#version 300 es
  precision mediump float;
  in vec3 fragNormal;
  in vec3 fragPos;
  uniform vec3 uLightPosition;
  out vec4 fragColor;
  mat2 rotate(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }
  float horizontalLine(vec2 pixel, float y_pos, float width) {
    return 1.0 - smoothstep(-1.0, 1.0, abs(pixel.y - y_pos) - 0.5 * width);
  }
  void main () {
    vec3 N = normalize(fragNormal);
    vec3 L = normalize(fragPos - uLightPosition);
    float df = clamp(dot(N, -L), 0.0, 1.0);
    vec2 pos = gl_FragCoord.xy;
    
    float lineWidth = 7.0 * (1.0 - smoothstep(0.0, 0.3, df)) + 0.5;

    pos = rotate(radians(10.0)) * pos;
    float linesSep = 5.0;
    vec2 grid_pos = vec2(pos.x, mod(pos.y, linesSep));
    float line_1 = horizontalLine(grid_pos, linesSep, lineWidth);
    grid_pos.y = mod(pos.y + linesSep, linesSep);
    
    linesSep = 7.0;
    pos = rotate(radians(50.0)) * pos;
    grid_pos = vec2(pos.x, mod(pos.y, linesSep));
    float line_2 = horizontalLine(grid_pos, linesSep, lineWidth);

    linesSep = 8.0;
    pos = rotate(radians(90.0)) * pos;
    grid_pos = vec2(pos.x, mod(pos.y, linesSep));
    float line_3 = horizontalLine(grid_pos, linesSep, lineWidth);
    
    
    float color = 1.0;
    color -= line_1 * (1.0 - smoothstep(0.0, 0.3, df));
    color -= line_2 * (1.0 - smoothstep(0.3, 0.6, df));
    color -= line_3 * (1.0 - smoothstep(0.6, 0.9, df));
    
    color = clamp(color, 0.1, 1.0);
    fragColor = vec4(vec3(color), 1.0);
  }
`