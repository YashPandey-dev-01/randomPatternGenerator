const r = require("raylib");
const { screen, depth, gap, minDepth, maxDepth } = require("./inputs.js");
const { getRandomNumber, getRandomAxis, getRandomColor } = require("./random.js");

const getVcut = function (targetRect) {
  targetRect.width /= 2;

  const newRect = {
    x: targetRect.x + targetRect.width,
    y: targetRect.y,
    width: targetRect.width,
    height: targetRect.height
  }

  return newRect;
}

const getHcut = function (targetRect) {
  targetRect.height /= 2;

  const newRect = {
    x: targetRect.x,
    y: targetRect.y + targetRect.height,
    width: targetRect.width,
    height: targetRect.height
  }

  return newRect;
}

const bisectRectangle = function (coords, targetRect) {
  const randomAxis = getRandomAxis();
  const newRect = randomAxis === 'x' ? getHcut(targetRect) : getVcut(targetRect);

  coords.push(newRect);
}

const generateMoreCoordinates = function (coords) {
  if (depth.current >= depth.target) {
    return;
  }

  const targetRect = coords[getRandomNumber(0, coords.length - 1)];
  bisectRectangle(coords, targetRect);
  depth.current++;

  generateMoreCoordinates(coords);
}

const generateRectCoordinates = function () {
  const coords = [];

  if (depth.target >= 1) {
    const width = screen.width;
    const height = screen.height;

    coords.push({ x: 0, y: 0, width, height });
    depth.current++;

    generateMoreCoordinates(coords)
  }

  return coords;
}

const createRects = function (rectCoordinates, gap) {
  const rects = [];

  for (const coord of rectCoordinates) {
    const shape = {
      x: coord.x + gap,
      y: coord.y + gap,
      width: coord.width - gap,
      height: coord.height - gap
    }
    const color = getRandomColor();

    rects.push({ shape, color });
  }

  return rects;
}

const generatePattern = function () {
  const rectCoordinates = generateRectCoordinates();
  const rects = createRects(rectCoordinates, gap);

  return rects;
}

const setup = function () {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(screen.width, screen.height, "Random Patterns");
  r.SetTargetFPS(screen.fps);
}

const update = function (rects) {
  if (r.IsKeyPressed(r.KEY_R)) {
    depth.current = 0;
    depth.target = getRandomNumber(minDepth, maxDepth);
    rects = generatePattern();
  }

  return rects;
}

const draw = function (rects) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  for (const rect of rects) {
    r.DrawRectangleRec(rect.shape, rect.color);
  }

  r.EndDrawing();
}

const loop = function (rects) {
  while (!r.WindowShouldClose()) {
    rects = update(rects);
    draw(rects);
  }
}

const teardown = function () {
  r.CloseWindow();
}

const sketch = function () {
  const rects = generatePattern();

  loop(rects);
  teardown();
}

const main = function () {
  setup();
  sketch();
}

main();