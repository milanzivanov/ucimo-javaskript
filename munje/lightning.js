/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Lightning draws a randomly generated lightning with glow effect on html page
 * from x and y coordinates, to other x and y coordinates.
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Javascript-lightning-effect
**************************************************************/
var lightning = function(config){
	
	var conf = {
		detail: 1,
		displace: 500,
		glowWidth: 20,
		boltWidth: 3,
		boltColor: "#ffff88",
		glow: true,
		glowColor: "#ffffff",
		glowAlpha: 0.1
	};
	
	var d;
	var ctx;
	
	var construct = function(){
		d = doc_size();
		//copying configuration
		for(var opt in config){
			conf[opt] = config[opt];
		}

		if(document.getElementById("lightning_canvas"))
		{
			ctx = document.getElementById("lightning_canvas").getContext("2d");
		}
		else
		{
			//create canvas for drawing
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", d.width + "px");
			canvas.setAttribute("height", d.height + "px");
			canvas.style.position = "absolute";
			canvas.style.top = "0px";
			canvas.style.left = "0px";
			canvas.id = "lightning_canvas";
			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);
		}
	};
	
	this.show = function(startX, startY, endX, endY){
		drawLightning(startX, startY, endX, endY, conf.displace);
	};
	
	this.hide = function(){
		ctx.clearRect(0, 0, d.width, d.height);
	};
	
	var drawLightning = function(x1, y1, x2, y2, displace){
		if(displace < conf.detail)
		{	
			if(conf.glow)
			{
				//glow around lightning
				ctx.lineCap = "round";
				ctx.strokeStyle = "#fff";
				ctx.globalAlpha = conf.glowAlpha;
				ctx.lineWidth = conf.glowWidth;
				ctx.lineJoin = "round";
				ctx.shadowBlur = 10;
				ctx.shadowColor = conf.glowColor;
				ctx.beginPath();
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);
				ctx.stroke();
			}

			//draw bolt
			ctx.strokeStyle = conf.boltColor;
			ctx.globalAlpha = 1;
			ctx.lineWidth = conf.boltWidth;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}
		else{
			var midx = (x2+x1)/2;
			var midy = (y2+y1)/2;
			midx = midx + (Math.random() - 0.5)*displace;
			midy = midy + (Math.random() - 0.5)*displace;
			drawLightning(x1, y1, midx, midy, displace/2);
			drawLightning(x2, y2, midx, midy, displace/2);
		}
	};
	
	//get document dimensions
	var doc_size = function(){
		var docsize = new Object();
		docsize.width = 0;
		docsize.height = 0;
		docsize.width = Math.max(
			Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
			Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
			Math.max(document.body.clientWidth, document.documentElement.clientWidth)
		);
		docsize.height = Math.max(
			Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
			Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
			Math.max(document.body.clientHeight, document.documentElement.clientHeight)
		);
		return docsize;
	};
	
	construct();
}