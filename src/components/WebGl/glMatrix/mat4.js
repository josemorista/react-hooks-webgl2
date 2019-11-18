const { identity, multiply, transpose, inverse, determinant } = require('./common');

const toRadians = (ang) => {
  return (ang * Math.PI) / 180;
};

const translate = (m, v) => {
  let tm = identity(4, 4);
  tm[0][3] = v[0];
  tm[1][3] = v[1];
  tm[2][3] = v[2];
  return multiply(m, tm);
};

const scale = (m, sc) => {
  let sm = [];
  sm = identity(4, 4);
  sm[0][0] = sc;
  sm[1][1] = sc;
  sm[2][2] = sc;
  return multiply(m, sm);
};

const rotateX = (m, ang) => {
  let rx = identity(4, 4);
  const rAng = toRadians(ang);
  rx = identity(4, 4);

  rx[1][1] = Math.cos(rAng);
  rx[1][2] = -Math.sin(rAng);

  rx[2][1] = Math.sin(rAng);
  rx[2][2] = Math.cos(rAng);

  return multiply(m, rx);
};

const rotateY = (m, ang) => {
  let ry = identity(4, 4);
  const rAng = toRadians(ang);
  ry = identity(4, 4);


  ry[0][0] = Math.cos(rAng);
  ry[0][2] = -Math.sin(rAng);

  ry[2][0] = Math.sin(rAng);
  ry[2][2] = Math.cos(rAng);

  return multiply(m, ry)
};

const rotateZ = (m, ang) => {
  let rz = identity(4, 4);
  const rAng = toRadians(ang);

  rz[0][0] = Math.cos(rAng);
  rz[0][1] = -Math.sin(rAng);

  rz[1][0] = Math.sin(rAng);
  rz[1][1] = Math.cos(rAng);

  return multiply(m, rz);
};

const projectionMatrixByBounds = (left, right, bottom, top, near, far) => {
  let m = [[], [], [], []];

  m[0][0] = (2.0 * near) / (right - left);
  m[0][1] = 0;
  m[0][2] = (left + right) / (right - left);
  m[0][3] = 0;

  m[1][0] = 0;
  m[1][1] = (2.0 * near) / (top - bottom);
  m[1][2] = (top + bottom)(top - bottom);
  m[1][3] = 0;

  m[2][0] = 0;
  m[2][1] = 0;
  m[2][2] = (far + near) / (near - far);
  m[2][3] = (2.0 * far * near) / (near - far);

  m[3][0] = 0.0;
  m[3][1] = 0.0;
  m[3][2] = -1.0;
  m[3][3] = 0.0;

  return m;
}

const projectionMatrixByFov = (fov, ar, near, far) => {
  const zRange = near - far;
  const tanHalfFOV = Math.tan(toRadians(fov / 2.0));

  let m = [[], [], [], []]

  m[0][0] = 1.0 / (tanHalfFOV * ar);
  m[0][1] = 0.0;
  m[0][2] = 0.0;
  m[0][3] = 0.0;

  m[1][0] = 0.0;
  m[1][1] = 1.0 / tanHalfFOV;
  m[1][2] = 0.0;
  m[1][3] = 0.0;

  m[2][0] = 0.0;
  m[2][1] = 0.0;
  m[2][2] = (near + far) / zRange;
  m[2][3] = (2.0 * far * near) / zRange;

  m[3][0] = 0.0;
  m[3][1] = 0.0;
  m[3][2] = -1.0;
  m[3][3] = 0.0;

  return m;
};

module.exports = {
  translate,
  transpose,
  inverse,
  determinant,
  scale,
  rotateX,
  rotateY,
  rotateZ,
  projectionMatrixByBounds,
  projectionMatrix: projectionMatrixByFov,
  identity: () => identity(4, 4),
  multiply
}

