
$(document).ready(function() {
jQuery.fn.extend({
  startGame: function(params) {
    var initialBoard, notify;
    this.html("<canvas id='GCAPI-main' />\n<div id='GCAPI-noclick' />\n<canvas id='GCAPI-control' />\n<canvas id='GCAPI-vvh' />\n<div id='GCAPI-status' />");
    window.mainCanvas = document.getElementById('GCAPI-main');
    window.coverCanvas = document.getElementById('GCAPI-noclick');
    window.controlPanel = document.getElementById('GCAPI-control');
    window.vvhPanel = document.getElementById('GCAPI-vvh');
    $(mainCanvas).css('display', 'block');
    $(mainCanvas).css('position', 'absolute');
    $(coverCanvas).css('display', 'none');
    $(coverCanvas).css('z-index', '1000');
    $(coverCanvas).css('background-color', 'rgba(255,255,255,.5)');
    $(coverCanvas).css('position', 'absolute');
    $(controlPanel).css('display', 'block');
    $(controlPanel).css('position', 'absolute');
    $(controlPanel).css('left', '0px');
    $(vvhPanel).css('display', 'none');
    $(vvhPanel).css('position', 'absolute');
    $(this).css('width', window.innerWidth);
    $(this).css('height', window.innerHeight);
    $('#GCAPI-status').css('position', 'absolute');
    $('#GCAPI-status').css('bottom', '0px');
    $('#GCAPI-status').css('text-align', 'center');
    $('#GCAPI-status').css('width', '100%');
    $('#GCAPI-status').css('height', '20px');
    initialBoard = game.getInitialBoard(params);
    notify = new game.notifier($(mainCanvas), params);
    window.gameController = new GCAPI.Game(game.asset, params, notify, initialBoard, coverCanvas, '#GCAPI-status', vvhPanel);
    window.uiController = new GCAPI.Ui(gameController, mainCanvas, controlPanel, vvhPanel, coverCanvas, '#GCAPI-status', this, GCAPI.getAspectRatio(params));
    return uiController.startGame();
  }
});

window.ensureGameFunctions = function() {
  var problems;
  problems = [];
  if (!(window.game != null)) {
    problems.push("You must create a window.game object in your game file");
  } else {
    if (!(window.game.getDimensions != null)) {
      problems.push("You must define a game.getDimensions function in your game file");
    }
    if (!(window.game.getInitialBoard != null)) {
      problems.push("You must define a game.getInitialBoard function in your game file");
    }
    if (!(window.game.notifier != null)) {
      problems.push("You must define a game.notifier class in your game file");
    }
  }
  if (problems.length > 0) {
    alert(problems.join("\n\n"));
    return false;
  }
  return true;
};
});
