/*==============================================================================
 * Javascript renderer engine of the HTMLTTChess package
 *
 * Copyright (C) 2007-2016  Michael Peeters <https://github.com/xeyownt>
 *
 * This file is part of the HTMLTTChess package 
 * <https://github.com/xeyownt/htmlttchess>.
 *
 * HTMLTTChess is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * HTMLTTChess is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 *==============================================================================
 */

var XMLNS="c:";

var ATTR_BORDER			= "border";				//"solid", "double", "square", "round", "pad", origin, nseo
var VALUE_BORDER_SOLID	= "solid";
var VALUE_BORDER_DOUBLE	= "double";
var VALUE_BORDER_SQUARE	= "square";
var VALUE_BORDER_ROUND	= "round";
var VALUE_BORDER_PAD	= "pad";
var ATTR_MODE			= "mode";				//"color", "bw"
var VALUE_MODE_COLOR	= "color";
var VALUE_MODE_BW		= "bw";
var ATTR_STYLE			= "cstyle";
var ATTR_CLASS			= "cclass";
var VALUE_CLASS_BW_TABLE		= "bwchess";
var VALUE_CLASS_COLOR_TABLE		= "chess";
var VALUE_CLASS_BW_SPAN_HL		= "bwhl";
var VALUE_CLASS_COLOR_SPAN_HL	= "hl";

// Use '\u00A0' for blank (nb-sp)
var MFB								= '\u00A0';

// Modified FEN notation (White pieces - Dark pieces - extra symbols)
var FEN 			 				= 'KQRBNPkqrbnp.+x';
// Merida pieces on light square (White pieces - Black pieces - extra symbols)
var MERIDA_LIGHT	 				= '\u2654\u2655\u2656\u2657\u2658\u2659\u265A\u265B\u265C\u265D\u265E\u265F'+MFB+'\u2022\u2715';
// Merida pieces on dark square (White pieces - Black pieces - extra symbols)
var MERIDA_DARK	 					= '\uE154\uE155\uE156\uE157\uE158\uE159\uE15A\uE15B\uE15C\uE15D\uE15E\uE15F\uE100\uE122\uE115';
//Merida Chess - pieces background
var MERIDA_PIECE_BG	 				= '\uE254\uE255\uE256\uE257\uE258\uE259\uE254\uE255\uE256\uE257\uE258\uE259'+MFB+MFB+MFB;

var BOARD_SQUARE_ROW				= MFB+'\uE200'+MFB+'\uE200'+MFB+'\uE200'+MFB+'\uE200'+MFB; 	// light dark light dark light dark light dark light
var MERIDA_COORD_COLS 				= 'abcdefgh';
var MERIDA_COORD_ROWS 				= '8<br/>7<br/>6<br/>5<br/>4<br/>3<br/>2<br/>1<br/>';
var MERIDA_FRAME_BLANK 				= MFB;
var MERIDA_FRAME_PADDING 			= MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB;
var MERIDA_FRAME_COL_PADDING 		= MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB+MFB;
var MERIDA_FRAME_ROW_PADDING 		= MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>'+MFB+'<br/>';

var MERIDA_FRAME_COLS 				= 'abcdefgh';
var MERIDA_FRAME_ROWS 				= '12345678';

var MERIDA_FRAME_D_BOTTOM 			= '\uE336\uE336\uE336\uE336\uE336\uE336\uE336\uE336';
var MERIDA_FRAME_D_BOTTOM_COORD 	= '\uE348\uE349\uE34A\uE34B\uE34C\uE34D\uE34E\uE34F';
var MERIDA_FRAME_D_LEFT 			= '\uE333\uE333\uE333\uE333\uE333\uE333\uE333\uE333';
var MERIDA_FRAME_D_LEFT_COORD 		= '\uE340\uE341\uE342\uE343\uE344\uE345\uE346\uE347';
var MERIDA_FRAME_D_RIGHT 			= '\uE334\uE334\uE334\uE334\uE334\uE334\uE334\uE334';
var MERIDA_FRAME_D_RIGHT_COORD 		= '\uE350\uE351\uE352\uE353\uE354\uE355\uE356\uE357'
var MERIDA_FRAME_D_ROUND_CORNER 	= '\uE338\uE339\uE33A\uE33B';
var MERIDA_FRAME_D_SQUARE_CORNER 	= '\uE330\uE332\uE335\uE337';
var MERIDA_FRAME_D_TOP 				= '\uE331\uE331\uE331\uE331\uE331\uE331\uE331\uE331';
var MERIDA_FRAME_D_TOP_COORD 		= '\uE358\uE359\uE35A\uE35B\uE35C\uE35D\uE35E\uE35F'

var MERIDA_FRAME_S_BOTTOM 			= '\uE306\uE306\uE306\uE306\uE306\uE306\uE306\uE306';
var MERIDA_FRAME_S_BOTTOM_COORD 	= '\uE318\uE319\uE31A\uE31B\uE31C\uE31D\uE31E\uE31F';
var MERIDA_FRAME_S_LEFT 			= '\uE303\uE303\uE303\uE303\uE303\uE303\uE303\uE303';
var MERIDA_FRAME_S_LEFT_COORD 		= '\uE310\uE311\uE312\uE313\uE314\uE315\uE316\uE317';
var MERIDA_FRAME_S_RIGHT 			= '\uE304\uE304\uE304\uE304\uE304\uE304\uE304\uE304';
var MERIDA_FRAME_S_RIGHT_COORD 		= '\uE320\uE321\uE322\uE323\uE324\uE325\uE326\uE327'
var MERIDA_FRAME_S_ROUND_CORNER 	= '\uE308\uE309\uE30A\uE30B';
var MERIDA_FRAME_S_SQUARE_CORNER 	= '\uE300\uE302\uE305\uE307';
var MERIDA_FRAME_S_TOP 				= '\uE301\uE301\uE301\uE301\uE301\uE301\uE301\uE301';
var MERIDA_FRAME_S_TOP_COORD 		= '\uE328\uE329\uE32A\uE32B\uE32C\uE32D\uE32E\uE32F'



function detectIE()
{
	//This is my very simple IE browser detection.
	return (navigator.appName == "Microsoft Internet Explorer");
}

/* My Board object */
function ChessBoard(_fenCode,_attrBorder,_colorMode,_attrStyle,_attrClass)
{
	this.fenCode = _fenCode;
	this.attrBorder = _attrBorder.split(" ");
	this.colorMode = _colorMode;
	this.attrStyle = _attrStyle;
	this.attrClass = _attrClass;

	this.rowCount = 0;
	this.colCount = 0;

	this.isBorderShownTop = false;
	this.isBorderShownBottom = false;
	this.isBorderShownLeft = false;
	this.isBorderShownRight = false;
	this.isCoordShownTop = false;
	this.isCoordShownBottom = false;
	this.isCoordShownLeft = false;
	this.isCoordShownRight = false;
	this.isBorderStyleSimple = true;
	this.isCornerStyleRound = true;
	this.isCoordPadded = false;
	this.coordOriginCol = 0;
	this.coordOriginRow = 0;

	function isCoordinate(coord)
	{
		if (coord.length != 2) return false;
		var coordOriginCol = coord.charCodeAt(0) - 0x60;
		var coordOriginRow = coord.charCodeAt(1) - 0x30;
		return (coordOriginCol>=1) && (coordOriginCol<=8) && (coordOriginCol>=1) && (coordOriginRow<=8);
	}

	function isNSEO(nseo)
	{
		if(nseo.length > 4) return false;
		for(x=0;x<nseo.length; x++)
		{
			var y=nseo.charAt(x);
			if((y != "n") && (y != "s") && (y != "e") && (y != "o")) return false;
		}
		return true;
	}

	this.parseFen = function()
	{
		//Remove white space
		this.fenCode=this.fenCode.replace(/[\r\n\t ]/g,"");

		//Replace 1,2...8 by multiple occurence of '.' (empty cells)
		this.fenCode=this.fenCode.replace(/1/g,".");
		this.fenCode=this.fenCode.replace(/2/g,"..");
		this.fenCode=this.fenCode.replace(/3/g,"...");
		this.fenCode=this.fenCode.replace(/4/g,"....");
		this.fenCode=this.fenCode.replace(/5/g,".....");
		this.fenCode=this.fenCode.replace(/6/g,"......");
		this.fenCode=this.fenCode.replace(/7/g,".......");
		this.fenCode=this.fenCode.replace(/8/g,"........");

		var flatFenCode = this.fenCode.replace(/\(/g,"").replace(/\)/g,"").split("/");
		this.fenCode=this.fenCode.split("/");
		this.rowCount=this.fenCode.length;

                             		//Check Col Count consistency
		this.colCount=flatFenCode[0].length;
		var checkOk=(this.rowCount <= 8) && (this.colCount <= 8);
		for(row in this.fenCode)
		{
			checkOk = checkOk && (flatFenCode[row].length == this.colCount);
		}

		if (!checkOk)
		{
			return false;
		}

		return true;
	}

    this.parseattrBorder = function()
    {
		var isCoordShown = false;

    	for (attrIdx in this.attrBorder)
    	{
    		var attr=this.attrBorder[attrIdx];
    		if(attr == VALUE_BORDER_SOLID)
    		{
				this.isBorderShownTop = true;
				this.isBorderShownBottom = true;
				this.isBorderShownLeft = true;
				this.isBorderShownRight = true;
    			this.isBorderStyleSimple = true;
    		}
    		else if(attr == VALUE_BORDER_DOUBLE)
    		{
				this.isBorderShownTop = true;
				this.isBorderShownBottom = true;
				this.isBorderShownLeft = true;
				this.isBorderShownRight = true;
    			this.isBorderStyleSimple = false;
    		}
    		else if(isCoordinate(attr))
    		{
    			isCoordShown = true;
    			this.coordOriginCol = attr.charCodeAt(0) - 0x61;
    			this.coordOriginRow = attr.charCodeAt(1) - 0x31;
				if((this.coordOriginCol + this.colCount > 8) || (this.coordOriginRow + this.rowCount > 8))
				{
					this.coordOriginCol = 0;
					this.coordOriginRow = 0;
				}
				this.isCoordShownLeft 	    = this.isBorderShownLeft 	= (this.coordOriginCol == 0);
				this.isCoordShownRight 		= this.isBorderShownRight 	= (this.coordOriginCol + this.colCount == 8);
				this.isCoordShownBottom		= this.isBorderShownBottom 	= (this.coordOriginRow == 0);
				this.isCoordShownTop		= this.isBorderShownTop 	= (this.coordOriginRow + this.rowCount == 8);
    		}
    		else if(attr == VALUE_BORDER_SQUARE)
    		{
				this.isBorderShownTop = true;
				this.isBorderShownBottom = true;
				this.isBorderShownLeft = true;
				this.isBorderShownRight = true;
    			this.isCornerStyleRound = false;
    		}
    		else if(attr == VALUE_BORDER_ROUND)
    		{
				this.isBorderShownTop = true;
				this.isBorderShownBottom = true;
				this.isBorderShownLeft = true;
				this.isBorderShownRight = true;
    			this.isCornerStyleRound = true;
    		}
	    	else if(attr == VALUE_BORDER_PAD)
	    	{
	    		this.isCoordPadded = true;
	    	}
	    	else if(isNSEO(attr))
			{
				this.isCoordShownTop = false;
				this.isCoordShownBottom = false;
				this.isCoordShownLeft = false;
				this.isCoordShownRight = false;
				for(x=0;x<attr.length; x++)
				{
					switch (attr.charAt(x))
					{
						case "n": this.isCoordShownTop = true; break;
						case "s": this.isCoordShownBottom = true; break;
						case "o": this.isCoordShownLeft = true; break;
						case "e": this.isCoordShownRight = true; break;
					}
				}
				if(!isCoordShown)
				{
					// Border can't be overridden if board origin is already specified
					this.isBorderShownLeft		= this.isCoordShownLeft 	;
					this.isBorderShownRight		= this.isCoordShownRight 	;
					this.isBorderShownBottom	= this.isCoordShownBottom 	;
					this.isBorderShownTop		= this.isCoordShownTop 		;
				}
			}
    	}
    	//Coordinates shown only if isCoordShown is true
		this.isCoordShownLeft 	= isCoordShown && this.isCoordShownLeft;
		this.isCoordShownRight 	= isCoordShown && this.isCoordShownRight;
		this.isCoordShownBottom = isCoordShown && this.isCoordShownBottom;
		this.isCoordShownTop 	= isCoordShown && this.isCoordShownTop 	;

		return true;
	}

	this.genColorHTML = function()
	{
		if(! (this.parseFen() && this.parseattrBorder()) )
		{
			return '<span style="color:red; font-weight: bold; font-family:monospace;">PARSE ERROR</span>';
		}

		if( (this.colCount == 0) || (this.rowCount == 0) )
		{
			return "";			//empty chess tag
		}

	    var generatedHTML="";
		this.attrClass = VALUE_CLASS_COLOR_TABLE + (this.attrClass == "" ? "" : " " + this.attrClass);

    	/* ----- Chess table ---------------------------------------------------------------------------------------------------- */
    	generatedHTML	+=	'<table class="' + this.attrClass + '"'
    					+ 	(this.attrStyle != "" ? ' style="'+this.attrStyle+'"' : "")
    					+ 	'>';

    	/* ----- Top cols ------------------------------------------------------------------------------------------------------- */

	    if(this.isCoordShownTop)
	    {
	    	generatedHTML+='<tr>';
	    	generatedHTML+=(this.isCoordShownLeft || this.isCoordPadded ? "<td>&nbsp;</td>" : "") +
	    	            '<td class="cols">' + MERIDA_COORD_COLS.substr(this.coordOriginCol,this.colCount) + '</td>' +
	    	            (this.isCoordShownRight || this.isCoordPadded ? "<td>&nbsp;</td>" : "") + "";
	    	generatedHTML+='</tr>';
	    }
		else if(this.isCoordPadded)
		{
	    	generatedHTML+='<tr>';
	    	generatedHTML+=(this.isCoordShownLeft || this.isCoordPadded ? "<td>&nbsp;</td>" : "") +
	    	            '<td class="cols">' + MERIDA_FRAME_COL_PADDING.substr(0,this.colCount) + '</td>' +
	    	            (this.isCoordShownRight || this.isCoordPadded ? "<td>&nbsp;</td>" : "") + "";
	    	generatedHTML+='</tr>';
		}
    	/* ----- Left rows ------------------------------------------------------------------------------------------------------ */

        generatedHTML+='<tr>';

	    if(this.isCoordShownLeft)
	    {
	    	generatedHTML+='<td class="rows">';
	    	generatedHTML+=MERIDA_COORD_ROWS.substr((8-this.coordOriginRow-this.rowCount)*6,this.rowCount*6);
	    	generatedHTML+='</td>';
	    }
		else if(this.isCoordPadded)
		{
	    	generatedHTML+='<td class="rows">';
			generatedHTML+=MERIDA_FRAME_ROW_PADDING.substr(0,this.rowCount*6);
	    	generatedHTML+='</td>';
		}

    	/* ----- Board ---------------------------------------------------------------------------------------------------------- */

    	var generatedSq = "";
    	var generatedBg = "";
    	var generatedFg = "";

	    var isTopLeftSquareLight = (this.coordOriginRow+this.coordOriginCol+this.rowCount)&1;		/* 0 light, 1 dark*/
	    for(row=0;row<this.rowCount;row++)
	    {
		    var isALightSquare 	= (row+isTopLeftSquareLight)&1 ? false : true;
	    	var inputRow		= this.fenCode[row];
	    	var outputSqRow		= "";
	    	var outputBgRow		= "";
	    	var outputFgRow		= "";
	    	var isHLOn			= false;

	        for(col=0;col<inputRow.length;col++)
	    	{
	    		var cell=inputRow.charAt(col);

        		if(cell == "(") {if(!isHLOn) {outputSqRow += '<span class="'+VALUE_CLASS_COLOR_SPAN_HL+'">';} isHLOn = true;}
	        	else if(cell == ")") {if(isHLOn) {outputSqRow += '</span>';} isHLOn = false;}
		        else
	        	{
					var idx=FEN.indexOf(cell);
					if(idx>-1)
					{
						outputFgRow += MERIDA_LIGHT.charAt(idx);
						outputBgRow += MERIDA_PIECE_BG.charAt(idx);
					}
					outputSqRow += isALightSquare ? BOARD_SQUARE_ROW.charAt(0) : BOARD_SQUARE_ROW.charAt(1);
		        	isALightSquare = !isALightSquare;
	        	}
			}
		    generatedSq+=outputSqRow + (isHLOn ? '</span>' : "") + "<br/>";
		    generatedBg+=outputBgRow + "<br/>";
		    generatedFg+=outputFgRow + "<br/>";
		}

		var boardStyle=(this.isBorderShownTop ? "" : "border-top:none !important;")
						+(this.isBorderShownBottom ? "" : "border-bottom:none !important;")
						+(this.isBorderShownLeft ? "" : "border-left:none !important;")
						+(this.isBorderShownRight ? "" : "border-right:none !important;");

    	generatedHTML	+=	'<td class="board" style="width: '+this.colCount+'em;'+boardStyle+'">'
    					+	'<div class="board">'
    					+	'<div class="sq">'+generatedSq+'</div>'
    					+	'<div class="pcbg">'+generatedBg+'</div>'
    					+	'<div class="pcfg">'+generatedFg+'</div>'
    					+	'</div></td>';

    	/* ----- Right Rows ----------------------------------------------------------------------------------------------------- */

	    if(this.isCoordShownRight)
	    {
	    	generatedHTML+='<td class="rows">';
	    	generatedHTML+=MERIDA_COORD_ROWS.substr((8-this.coordOriginRow-this.rowCount)*6,this.rowCount*6);
	    	generatedHTML+='</td>';
	    }
		else if(this.isCoordPadded)
		{
	    	generatedHTML+='<td class="rows">';
			generatedHTML+=MERIDA_FRAME_ROW_PADDING.substr(0,this.rowCount*6);
	    	generatedHTML+='</td>';
		}

    	generatedHTML+='</tr>';

    	/* ----- Bottom Cols --- ------------------------------------------------------------------------------------------------ */

	    if(this.isCoordShownBottom)
	    {
	    	generatedHTML+='<tr>';
	    	generatedHTML+=(this.isCoordShownLeft || this.isCoordPadded ? "<td>&nbsp;</td>" : "") +
	    	            '<td class="cols">' + MERIDA_COORD_COLS.substr(this.coordOriginCol,this.colCount) + '</td>' +
	    	            (this.isCoordShownRight || this.isCoordPadded ? "<td>&nbsp;</td>" : "") + "";
	    	generatedHTML+='</tr>';
	    }
		else if(this.isCoordPadded)
		{
	    	generatedHTML+='<tr>';
	    	generatedHTML+=(this.isCoordShownLeft || this.isCoordPadded ? "<td>&nbsp;</td>" : "") +
	    	            '<td class="cols">' + MERIDA_FRAME_COL_PADDING.substr(0,this.colCount) + '</td>' +
	    	            (this.isCoordShownRight || this.isCoordPadded ? "<td>&nbsp;</td>" : "") + "";
	    	generatedHTML+='</tr>';
		}

    	generatedHTML+='</table>';

	    return generatedHTML;
	}

	this.genBWHTML = function()
	{
		if(! (this.parseFen() && this.parseattrBorder()) )
		{
			return '<span style="color:red; font-weight: bold; font-family:monospace;">PARSE ERROR</span>';
		}

		if( (this.colCount == 0) || (this.rowCount == 0) )
		{
			return "";			//empty chess tag
		}

		var boardLeft;
		var boardRight;
		var boardTop;
		var boardBottom;
		var boardCorner;

		if(this.isBorderStyleSimple)
		{
			boardTop = this.isCoordShownTop
							? (this.isBorderShownTop ? MERIDA_FRAME_S_TOP_COORD : MERIDA_FRAME_COLS)
							: (this.isBorderShownTop ? MERIDA_FRAME_S_TOP : MERIDA_FRAME_PADDING);
			boardRight = this.isCoordShownRight
							? (this.isBorderShownRight ? MERIDA_FRAME_S_RIGHT_COORD : MERIDA_FRAME_ROWS)
							: (this.isBorderShownRight ? MERIDA_FRAME_S_RIGHT : MERIDA_FRAME_PADDING);
			boardBottom = this.isCoordShownBottom
							? (this.isBorderShownBottom ? MERIDA_FRAME_S_BOTTOM_COORD : MERIDA_FRAME_COLS)
							: (this.isBorderShownBottom ? MERIDA_FRAME_S_BOTTOM : MERIDA_FRAME_PADDING);
			boardLeft = this.isCoordShownLeft
							? (this.isBorderShownLeft ? MERIDA_FRAME_S_LEFT_COORD : MERIDA_FRAME_ROWS)
							: (this.isBorderShownLeft ? MERIDA_FRAME_S_LEFT : MERIDA_FRAME_PADDING);
			boardCorner = this.isCornerStyleRound ? MERIDA_FRAME_S_ROUND_CORNER : MERIDA_FRAME_S_SQUARE_CORNER;
		}
		else
		{
			boardTop = this.isCoordShownTop
							? (this.isBorderShownTop ? MERIDA_FRAME_D_TOP_COORD : MERIDA_FRAME_COLS)
							: (this.isBorderShownTop ? MERIDA_FRAME_D_TOP : MERIDA_FRAME_PADDING);
			boardRight = this.isCoordShownRight
							? (this.isBorderShownRight ? MERIDA_FRAME_D_RIGHT_COORD : MERIDA_FRAME_ROWS)
							: (this.isBorderShownRight ? MERIDA_FRAME_D_RIGHT : MERIDA_FRAME_PADDING);
			boardBottom = this.isCoordShownBottom
							? (this.isBorderShownBottom ? MERIDA_FRAME_D_BOTTOM_COORD : MERIDA_FRAME_COLS)
							: (this.isBorderShownBottom ? MERIDA_FRAME_D_BOTTOM : MERIDA_FRAME_PADDING);
			boardLeft = this.isCoordShownLeft
							? (this.isBorderShownLeft ? MERIDA_FRAME_D_LEFT_COORD : MERIDA_FRAME_ROWS)
							: (this.isBorderShownLeft ? MERIDA_FRAME_D_LEFT : MERIDA_FRAME_PADDING);
			boardCorner = this.isCornerStyleRound ? MERIDA_FRAME_D_ROUND_CORNER : MERIDA_FRAME_D_SQUARE_CORNER;
		}

	    var generatedHTML="";
		var divWidth	=	((this.isCoordShownLeft || this.isBorderShownLeft || this.isCoordPadded) ? 1 : 0)
	    					+	this.colCount
	    					+((this.isCoordShownRight || this.isBorderShownRight || this.isCoordPadded) ? 1 : 0);

		this.attrClass = VALUE_CLASS_BW_TABLE + (this.attrClass == "" ? "" : " " + this.attrClass);

    	/* ----- Chess table ---------------------------------------------------------------------------------------------------- */
    	generatedHTML+='<table class="' + this.attrClass + '"' + (this.attrStyle != "" ? ' style="'+this.attrStyle+'"' : "") + '>'
    				   +'<tr><td>';

	    if(this.isCoordShownTop || this.isBorderShownTop || this.isCoordPadded)
	    {
	    	generatedHTML+=	(this.isBorderShownLeft && this.isBorderShownTop
	    					? boardCorner.charAt(0)
	    					: (this.isBorderShownLeft || this.isCoordShownLeft || this.isCoordPadded ? MERIDA_FRAME_BLANK : ""))
	    	  	        +	boardTop.substr(this.coordOriginCol,this.colCount)
						+	(this.isBorderShownRight && this.isBorderShownTop
	    	  	        	? boardCorner.charAt(1)
	    	  	        	: (this.isBorderShownRight || this.isCoordShownRight || this.isCoordPadded ? MERIDA_FRAME_BLANK : ""))
	    	            +	"<br/>";
	    }

	    var isTopLeftSquareLight = (this.coordOriginRow+this.coordOriginCol+this.rowCount)&1;		/* 0 light, 1 dark*/
	    for(row=0;row<this.rowCount;row++)
	    {
		    var isALightSquare 	= (row+isTopLeftSquareLight)&1 ? false : true;
	    	var inputRow		= this.fenCode[row];
	    	var outputRow		= "";
	    	var isHLOn			= false;

	        for(col=0;col<inputRow.length;col++)
	    	{
	    		var cell=inputRow.charAt(col);

        		if(cell == "(") {if(!isHLOn) {outputRow += '<span class="'+VALUE_CLASS_BW_SPAN_HL+'">';} isHLOn = true;}
	        	else if(cell == ")") {if(isHLOn) {outputRow += '</span>';} isHLOn = false;}
		        else
	        	{
					var idx=FEN.indexOf(cell);
					if(idx>-1)
					{
						outputRow += isALightSquare ? MERIDA_LIGHT.charAt(idx) : MERIDA_DARK.charAt(idx);
					}
		        	isALightSquare = !isALightSquare;
	        	}
			}
	    	generatedHTML	+=	((this.isCoordShownLeft || this.isBorderShownLeft || this.isCoordPadded) ? boardLeft.charAt(this.coordOriginRow+this.rowCount-1-row) : "")
	    					+	outputRow
						    +	(isHLOn ? '</span>' : "")
	    					+	((this.isCoordShownRight || this.isBorderShownRight || this.isCoordPadded) ? boardRight.charAt(this.coordOriginRow+this.rowCount-1-row) : "")
						    +	"<br/>";
		}

	    if(this.isCoordShownBottom || this.isBorderShownBottom || this.isCoordPadded)
	    {
	    	generatedHTML+=	(this.isBorderShownLeft && this.isBorderShownBottom
	    					? boardCorner.charAt(2)
	    					: (this.isBorderShownLeft || this.isCoordShownLeft || this.isCoordPadded ? MERIDA_FRAME_BLANK : ""))
	    	  	        +	boardBottom.substr(this.coordOriginCol,this.colCount)
						+	(this.isBorderShownRight && this.isBorderShownBottom
	    	  	        	? boardCorner.charAt(3)
	    	  	        	: (this.isBorderShownRight || this.isCoordShownRight || this.isCoordPadded ? MERIDA_FRAME_BLANK : ""))
	    	            +	"<br/>";
	    }

    	generatedHTML+='<div class="nowrap" style="width:'+divWidth+'em"></div></td></tr></table>';

	    return generatedHTML;
	}

	this.generateHTML = function()
	{
		return this.colorMode ? this.genColorHTML() : this.genBWHTML();
	}

}

function parseChess()
{
	var contextColorMode = true;
	var chessElt=document.getElementsByTagName((detectIE()? "" : XMLNS) + "chess");

	for (idx=0; idx<chessElt.length;idx++)
	{
		var boardFenCode= chessElt[idx].innerHTML;

		var attrBorder	= (chessElt[idx].getAttribute(ATTR_BORDER) != null) ? chessElt[idx].getAttribute(ATTR_BORDER) : "";
		var attrMode	= (chessElt[idx].getAttribute(ATTR_MODE) != null) ? (chessElt[idx].getAttribute(ATTR_MODE) == VALUE_MODE_COLOR) : contextColorMode;
		var attrStyle	= (chessElt[idx].getAttribute(ATTR_STYLE) != null) ? chessElt[idx].getAttribute(ATTR_STYLE) : "";
		var attrClass	= (chessElt[idx].getAttribute(ATTR_CLASS) != null) ? chessElt[idx].getAttribute(ATTR_CLASS) : "";

		//Was the page parsed already...
		if (typeof chessElt[idx].fenCode != "undefined")
		{
			boardFenCode = chessElt[idx].fenCode;
		}

		var board = new ChessBoard(boardFenCode, attrBorder, attrMode, attrStyle, attrClass);
		var generatedHTML = board.generateHTML();
		if(generatedHTML.length == 0)
		{
			/* No board position given. Color mode is kept for upcoming chess tags. */
			contextColorMode = attrMode;
		}
		else
		{
			chessElt[idx].innerHTML=generatedHTML;
		}

		//Keep previous fenCode to enable page reparsing...
		chessElt[idx].fenCode = boardFenCode;
	}
}
