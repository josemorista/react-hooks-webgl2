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

function getCofactor(m, p, q, n) {
  let i = 0, j = 0;
  let tmp = [];
  for (let row = 0; row < n; row++) {
    tmp[i] = [];
    for (let col = 0; col < n; col++) {
      if (row !== p && col !== q) {
        tmp[i][j++] = m[row][col];
        if (j === n - 1) {
          j = 0;
          i++;
        }
      }
    }
  }
  return tmp;
}

function adjoint(m) {
  if (m.length === 1) {
    let adj = [[]];
    adj[0][0] = 1;
    return adj;
  }
  let sign = 1, tmp, adj = [];

  for (let i = 0; i < m.length; i++) {
    adj[i] = []
    for (let j = 0; j < m.length; j++) {

      tmp = getCofactor(m, i, j, m.length);

      sign = ((i + j) % 2 === 0) ? 1 : -1;

      adj[i][j] = (sign) * (determinant(tmp, m.length - 1));
    }
  }
  return transpose(adj);
}

function inverse(m) {
  let det = determinant(m, m.length);
  if (det === 0) {
    console.log(`Singular matrix, can't find its inverse`);
    return null;
  }
  let adj = adjoint(m);
  let inverse = [];
  for (let i = 0; i < m.length; i++) {
    inverse[i] = [];
    for (let j = 0; j < m.length; j++) {
      inverse[i][j] = adj[i][j] / parseFloat(det);
    }
  }
  return inverse;
}

function determinant(m, n) {
  let D = 0;
  if (n === 1)
    return m[0][0];

  let temp = [];

  let sign = 1;


  for (let f = 0; f < n; f++) {

    temp = getCofactor(m, 0, f, n);
    D += sign * m[0][f] * determinant(temp, n - 1);
    sign = -sign;
  }
  return D;
}

function transpose(m) {
  let resp = [];
  for (let i = 0; i < m.length; i++) {
    resp[i] = [];
    for (let j = 0; j < m[i].length; j++) {
      resp[i][j] = m[j][i];
    }
  }
  return resp;
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
  multiply,
  determinant,
  transpose,
  inverse
}