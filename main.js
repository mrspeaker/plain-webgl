const gl = document.querySelector("#scr").getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vert = `
attribute vec2 a_pos;
varying vec4 v_colour;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_colour = gl_Position * 0.5 + 0.5;
}
`;
const frag = `
precision mediump float;
varying vec4 v_colour;

void main() {
  gl_FragColor = v_colour;
}
`;

// Compile shaders
const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vert);
gl.compileShader(vs);
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
  console.log("vert err:", gl.getShaderInfoLog(vs));
}
const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, frag);
gl.compileShader(fs);
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
  console.log("frag err:", gl.getShaderInfoLog(fs));
}

// Create a program from shaders
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

// Upload vertex data (two triangles)
const posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -1, 1,
    1, -1,
    -1, -1,
    -1, 1,
    1, 1,
    1, -1
  ]),
  gl.STATIC_DRAW
);

// Set position attribute details
const posAttributeLocation = gl.getAttribLocation(program, "a_pos");
gl.enableVertexAttribArray(posAttributeLocation);
gl.vertexAttribPointer(posAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Draw it all
gl.useProgram(program);
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

gl.drawArrays(gl.TRIANGLES, 0, 6);
