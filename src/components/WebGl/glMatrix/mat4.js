const { identity, multiply } = require('./common');

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

const projectionMatrix = (fov, ar, near, far) => {
  const zNear = near
  const zFar = far;
  const zRange = zNear - zFar;
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
  m[2][2] = (-zNear - zFar) / zRange;
  m[2][3] = (2.0 * zFar * zNear) / zRange;

  m[3][0] = 0.0;
  m[3][1] = 0.0;
  m[3][2] = 1.0;
  m[3][3] = 0.0;

  return m;
};

module.exports = {
  translate,
  scale,
  rotateX,
  rotateY,
  rotateZ,
  projectionMatrix,
  identity: () => identity(4, 4)
}