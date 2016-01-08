	/**
	 * Lalit Patel's CSS/Javascript font detector. http://www.lalit.org/lab/fontdetect.php
	 * (released under Apache License, Version 2.0. - http://www.apache.org/licenses/LICENSE-2.0.html)
	 *
	 * This script has been modified to only detect availability of the Chess Merida Unicode font
	 */

	var fontToDetect = "Chess Merida Unicode";

	var Detector = function(){
		var h = document.getElementsByTagName("BODY")[0];
		var d = document.createElement("DIV");
		var s = document.createElement("SPAN");

		d.appendChild(s);
		d.style.fontFamily = "sans-serif";		//font for the parent element DIV.
		s.style.fontFamily = "sans-serif";		//arial font used as a comparator.
		s.style.fontSize   = "72px";			//we test using 72px font size, we may use any size. I guess larger the better.
		s.innerHTML        = "mmmmmmmmmml";		//we use m or w because these two characters take up the maximum width. And we use a L so that the same matching fonts can get separated
		h.appendChild(d);
		var defaultWidth   = s.offsetWidth;		//now we have the defaultWidth
		var defaultHeight  = s.offsetHeight;	//and the defaultHeight, we compare other fonts with these.
		h.removeChild(d);

		/* test
		 * params:
		 * font - name of the font you wish to detect
		 * return:
		 * f[0] - Input font name.
		 * f[1] - Computed width.
		 * f[2] - Computed height.
		 * f[3] - Detected? (true/false).
		 */
		function test(font) {
			h.appendChild(d);
			var f = [];
			f[0] = s.style.fontFamily = font;	// Name of the font
			f[1] = s.offsetWidth;				// Width
			f[2] = s.offsetHeight;				// Height
			h.removeChild(d);

			font = font.toLowerCase();
			if (font == "arial" || font == "sans-serif") {
				f[3] = true;	// to set arial and sans-serif true
			} else {
				f[3] = (f[1] != defaultWidth || f[2] != defaultHeight);	// Detected?
			}
			return f;
		}
		this.test = test;
	}

	function detectChessMerida() {
		d = new Detector();
		return d.test(fontToDetect)[3];
	}

	var ChessMeridaDetected = detectChessMerida();

