var x = 5;
var y = 50;
var point = new Point(x, y);
var path = new Path.Line(point);
path.strokeColor = 'red';
var dir_changed = false;
function onFrame(event) {
  point.length = point.length * 5;
  path += point;
}