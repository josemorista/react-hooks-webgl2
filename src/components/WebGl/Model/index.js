const glc = require('../glContext');

const gl = glc.getContext();

// Returns computed normals for provided vertices.
// Note: Indices have to be completely defined--NO TRIANGLE_STRIP only TRIANGLES.
function calculateNormals(vs, ind) {
  const
    x = 0,
    y = 1,
    z = 2,
    ns = [];

  // For each vertex, initialize normal x, normal y, normal z
  for (let i = 0; i < vs.length; i += 3) {
    ns[i + x] = 0.0;
    ns[i + y] = 0.0;
    ns[i + z] = 0.0;
  }

  // We work on triads of vertices to calculate
  for (let i = 0; i < ind.length; i += 3) {
    // Normals so i = i+3 (i = indices index)
    const v1 = [], v2 = [], normal = [];

    // p2 - p1
    v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
    v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
    v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];

    // p0 - p1
    v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];
    v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];
    v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];

    // Cross product by Sarrus Rule
    normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
    normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
    normal[z] = v1[x] * v2[y] - v1[y] * v2[x];

    // Update the normals of that triangle: sum of vectors
    for (let j = 0; j < 3; j++) {
      ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
      ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
      ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
    }
  }

  // Normalize the result.
  // The increment here is because each vertex occurs.
  for (let i = 0; i < vs.length; i += 3) {
    // With an offset of 3 in the array (due to x, y, z contiguous values)
    const nn = [];
    nn[x] = ns[i + x];
    nn[y] = ns[i + y];
    nn[z] = ns[i + z];

    let len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
    if (len === 0) len = 1.0;

    nn[x] = nn[x] / len;
    nn[y] = nn[y] / len;
    nn[z] = nn[z] / len;

    ns[i + x] = nn[x];
    ns[i + y] = nn[y];
    ns[i + z] = nn[z];
  }

  return ns;
}

class Model {
  constructor(vertices, indexes, normals = [], colors = [], diffuse = [0.8, 0.8, 0.8], specular = [0.4, 0.4, 0.4]) {
    this.vertices = vertices;
    this.indexes = indexes;
    this.colors = colors;

    this.specular = specular;
    this.diffuse = diffuse;

    if (!normals || normals.length === 0) {
      this.normals = calculateNormals(vertices, indexes);
    } else {
      this.normals = normals;
    }

    this.buffers = {
      vertexBuffer: this.genArrayBuffer(this.vertices),
      indexBuffer: this.genIndexBuffer(this.indexes),
      normalBuffer: this.genArrayBuffer(this.normals),
      colorBuffer: this.genArrayBuffer(this.colors)
    };
  }

  genArrayBuffer(data) {
    const arrayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return arrayBuffer;
  }

  genIndexBuffer(indexes) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return indexBuffer;
  }

  bindArrayBuffer(name) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
  }

  bindIndexBuffer(name) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers[name]);
  }

}

module.exports = Model