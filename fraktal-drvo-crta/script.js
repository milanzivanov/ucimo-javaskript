// Original code from: 
// http://rosettacode.org/wiki/Fractal_tree

var scale_x = 10.0;
var scale_y = 10.0;
var angle_amplitude = 50;
var depth = 9;

var $elem = $('#treeCanvas');
var context = $elem.get(0).getContext('2d');
context.fillStyle = '#000';
context.lineWidth = 0.7;

var deg_to_rad = Math.PI / 180.0;

var canvas_width = $('#treeCanvas').width();
var canvas_height = $('#treeCanvas').height();

function drawLine(x1, y1, x2, y2){
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
}
    
function drawTree(x1, y1, angle, depth){
    if (depth !== 0){
        var x2 = x1 + (Math.cos(angle * deg_to_rad) * scale_x * depth);
        var y2 = y1 + (Math.sin(angle * deg_to_rad) * scale_y * depth);
		drawLine(x1, y1, x2, y2);
		drawTree(x2, y2, angle - angle_amplitude*Math.random(), depth - 1);
		drawTree(x2, y2, angle + angle_amplitude*Math.random(), depth - 1);
	}
}

$(document).ready(function() {
    
    $('#sx_slider').slider(
        {
            min: 0,
            max: 10.0,
            step: 0.5,
            value: scale_x,
            change: function(event,ui){
                $('span#sx').html($(this).slider("value"));
            }
        });
    
    $('#sy_slider').slider(
        {
            min: 0,
            max: 10.0,
            step: 0.5,
            value: scale_y,
            change: function(event,ui){
                $('span#sy').html($(this).slider("value"));
            }
        });
    
    $('#aa_slider').slider(
        {
            min: 0,
            max: 90,
            step: 1,
            value: angle_amplitude,
            change: function(event,ui){
                $('span#aa').html($(this).slider("value"));
            }
        });
    
    $('#dp_slider').slider(
        {
            min: 1,
            max: 9,
            step: 1,
            value: depth,
            change: function(event,ui){
                $('span#dp').html($(this).slider("value"));
            }
        });
    
    $('#draw').button();
    $('#clear').button();
    
    $('#draw').click(function(){
        
        scale_x = $('#sx_slider').slider("value");
        scale_y = $('#sy_slider').slider("value");
        angle_amplitude = $('#aa_slider').slider("value");
        depth = $('#dp_slider').slider("value");
        
        context.beginPath();
        drawTree(canvas_width/2, canvas_height-25, -90, depth);
        context.closePath();
        context.stroke();
    });
    
    $('#clear').click(function(){
        
        context.clearRect(0,0,canvas_width,canvas_height);
    });
    
});
