function identity(rows, cols) {
  let m = [];
  for (let i = 0; i < rows; i++) {
    m[i] = [];
    for (let j = 0; j < cols; j++) {
      if (i === j) {
        m[i][j] = 1.0;
      } else {
        m[i][j] = 0.0;
      }
    }
  }
  return m;
}

function multiply(m1, m2) {
  let resp = []
  for (let i = 0; i < m1.length; i++) {
    resp[i] = [];
    for (let j = 0; j < m2[i].length; j++) {
      resp[i][j] = 0;
      for (let k = 0; k < m2[i].length; k++) {
        resp[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }
  return resp;
}

module.exports = {
  identity,
  multiply
}