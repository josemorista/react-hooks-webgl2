function getNormalizeFunctions(obj) {
  var vertices = obj.vertices;
  var min_x = vertices[0];
  var max_x = vertices[0];

  var min_y = vertices[1];
  var max_y = vertices[1];

  var min_z = vertices[2];
  var max_z = vertices[2];

  var i, n = vertices.length;
  for (i = 3; i < n; i += 3) {
    min_x = Math.min(min_x, vertices[i]);
    min_y = Math.min(min_y, vertices[i + 1]);
    min_z = Math.min(min_z, vertices[i + 2]);

    max_x = Math.max(max_x, vertices[i]);
    max_y = Math.max(max_y, vertices[i + 1]);
    max_z = Math.max(max_z, vertices[i + 2]);
  }

  return {
    normalizeX: x => (x - min_x) / (max_x - min_x),
    normalizeY: y => (y - min_y) / (max_y - min_y),
    normalizeZ: z => (z - min_z) / (max_z - min_z)
  };
}

function getCenter(obj) {
  var vertices = obj.vertices;
  var min_x = vertices[0];
  var max_x = vertices[0];

  var min_y = vertices[1];
  var max_y = vertices[1];

  var min_z = vertices[2];
  var max_z = vertices[2];

  var i, n = vertices.length;
  for (i = 3; i < n; i += 3) {
    min_x = Math.min(min_x, vertices[i]);
    min_y = Math.min(min_y, vertices[i + 1]);
    min_z = Math.min(min_z, vertices[i + 2]);

    max_x = Math.max(max_x, vertices[i]);
    max_y = Math.max(max_y, vertices[i + 1]);
    max_z = Math.max(max_z, vertices[i + 2]);
  }

  let center = [];
  center[0] = (min_x + max_x) / 2.0;
  center[1] = (min_y + max_y) / 2.0;
  center[2] = (min_z + max_z) / 2.0;
  return center;
}

function normalize(obj) {
  if (!obj) return null;
  let vertices = [];
  const { normalizeX, normalizeY, normalizeZ } = getNormalizeFunctions(obj);
  for (let i = 0; i < obj.vertices.length; i += 3) {
    vertices[i] = normalizeX(obj.vertices[i]);
    vertices[i + 1] = normalizeY(obj.vertices[i + 1]);
    vertices[i + 2] = normalizeZ(obj.vertices[i + 2]);
  }
  return { indices: obj.indices, vertices, normals: obj.normals, diffuse: obj.diffuse };
}

module.exports = {
  normalize,
  getCenter
}