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

  float circle(vec2 pixel, vec2 center, float radius) {
    return 1.0 - smoothstep(radius - 1.0, radius + 1.0, length(pixel - center));
  }

  mat2 rotate(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }


  float horizontalLine(vec2 pixel, float y_pos, float width) {
    return 1.0 - smoothstep(-1.0, 1.0, abs(pixel.y - y_pos) - 0.5 * width);
  }
  
  // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.
  uint random( uint x ) {
    x+= ( x << 10u );
    x ^= ( x >>  6u );
    x += ( x <<  3u );
    x ^= ( x >> 11u );
    x += ( x << 15u );
    return x;
  }

  void main () {
    vec3 N = normalize(fragNormal);
    vec3 L = normalize(fragPos - uLightPosition);
  
    // Diffuse Light
    float df = clamp(dot(N, -L), 0.0, 1.0);

    // Move the pixel coordinates origin to the center of the screen
    vec2 pos = gl_FragCoord.xy;

    // Define the first group of pencil lines
    float line_width = 7.0 * (1.0 - smoothstep(0.0, 0.3, df)) + 0.5;
    float lines_sep = 16.0;
    vec2 grid_pos = vec2(pos.x, mod(pos.y, lines_sep));
    float line_1 = horizontalLine(grid_pos, lines_sep / 2.0, line_width);
    grid_pos.y = mod(pos.y + lines_sep / 2.0, lines_sep);
    float line_2 = horizontalLine(grid_pos, lines_sep / 2.0, line_width);

    // Rotate the coordinates
    pos = rotate(radians(10.0)) * pos;

    // Define the group of lines
    lines_sep = 10.0;
    grid_pos = vec2(pos.x, mod(pos.y, lines_sep));
    float line_3 = horizontalLine(grid_pos, lines_sep / 2.0, line_width);
    grid_pos.y = mod(pos.y + lines_sep / 2.0, lines_sep);
    float line_4 = horizontalLine(grid_pos, lines_sep / 2.0, line_width);

    // Calculate the surface color
    float surface_color = 1.0;
    surface_color -= 0.8 * line_1 * (1.0 - smoothstep(0.5, 0.75, df));
    surface_color -= 0.8 * line_2 * (1.0 - smoothstep(0.4, 0.5, df));
    surface_color -= 0.8 * line_3 * (1.0 - smoothstep(0.4, 0.65, df));
    surface_color -= 0.8 * line_4 * (1.0 - smoothstep(0.2, 0.4, df));
    surface_color = clamp(surface_color, 0.05, 1.0);

    // Fragment shader output
    fragColor = vec4(vec3(surface_color), 1.0);
  }
`