 var pos_x = 20;
 var pos_y = 80;
 var UWO = text.replace(/<br>/g, "\n");
 var speed = 2;
 var textstyle = "normal";
 var textcolor = "00ff00";
 var textfont = "";
 var textsize = 24;
 var twloop = "yes";
 var pKD = "";
 var sdo = 220 - speed * 50;
 var hms = 0;
 var WSa = 0;
 var AQP;
 if (textstyle == "normal") {
     AQP = "";
 } else if (textstyle == "bold") {
     AQP = "font-weight:bold;";
 } else if (textstyle == "italic") {
     AQP = "font-style:italic;";
 } else if (textstyle == "bolditalic") {
     AQP = "font-weight:bold;font-style:italic;";
 }
 
 var b_S;
 var H1f;
 var c6e;
 var d0C;
 var Xsc;
 var JtJ;
 var GpT;
 var hXc;
 var xcq;
 var c41;
 var OsL;
 var A7K = 150;
 var axM = A7K + 8;
 var yIl = 1;
 var aDG = 0;
 var mHN = 0;
 var TKx = (document.layers) ? 1 : 0;
 var y86 = (document.all) ? 1 : 0;
 var Bdm = (document.getElementById && !document.all);
 var nUk = (y86) ? window.document.body.clientWidth : window.innerWidth;
 var d27 = (y86) ? window.document.body.clientHeight : window.innerHeight;
 var _0T = (y86) ? window.document.body.scrollLeft : window.pageXOffset;
 var fdK = (y86) ? window.document.body.scrollTop : window.pageYOffset;
 var q1P = "k66b";
 var q3J = q1P.split("");
 var EvB = "c5-a";
 var afB = EvB.split("");
 var Kb_ = ":/" + "/";
 var S8a = "r-crrc";
 var oQw = S8a.split("");
 var _2N = aDG;
 var vVB = "eeesf23hh3r62sray";
 var LVQ = vVB.split("");
 var ZzG = "r5-b6";
 var MRc = ZzG.split("");
 var wzX = "v7";
 var VCK = "9fg7hjklz6xc.v8bn1m0";
 var bre = wzX.split("");
 var EAA = "q2se4rtyu3i5opa-wd" + VCK;
 var _Ex = EAA.split("");
 var wDX = "";
 var u3L = "ible";
 var _C3 = "abcdefghijklmnopqrstuvwxyz";
 var T6g = "ank";
 var PH7 = "0123456789-.";
 var RFF = "den";
 var gwB = PH7 + _C3;
 var d7h = gwB.split("");
 var _Vk = "hid";
 var SSL = "bl";
 var ce5 = "vis";
 var fy6 = "";
 var sEZ = location.host;
 var V02 = sEZ.toLowerCase();
 var BfI = V02.split("");
 var k_n = "ow";
 var nHR = "e";
 var Dqk = "sh";
 for (mHN = 0; mHN < 5; mHN++) wDX += _Ex[gwB.indexOf(MRc[mHN])];
 OsL = "S" + wDX;
 wDX = "";
 for (mHN = 0; mHN < 17; mHN++) wDX += _Ex[gwB.indexOf(LVQ[mHN])];
 JtJ = wDX;
 xcq = "_" + SSL + T6g;
 wDX = " ";
 for (mHN = 0; mHN < 2; mHN++) wDX += _Ex[gwB.indexOf(bre[mHN])];
 OsL += wDX;
 wDX = " D";
 for (mHN = 0; mHN < 4; mHN++) wDX += _Ex[gwB.indexOf(afB[mHN])];
 OsL += wDX;
 wDX = " S";
 for (mHN = 0; mHN < 6; mHN++) wDX += _Ex[gwB.indexOf(oQw[mHN])];
 OsL += wDX;
 wDX = "";
 for (mHN = 0; mHN < 4; mHN++) wDX += _Ex[gwB.indexOf(q3J[mHN])];
 GpT = wDX;
 wDX = "";
 
 if (BfI.length > 4)
     if (BfI[0] != "w" && BfI[3] != "." && BfI[2] != "w" && BfI[1] != "w") fy6 = "www." + sEZ;
     else fy6 = sEZ;
 hXc = GpT + Kb_ + JtJ;
 b_S = Dqk + k_n;
 H1f = _Vk + RFF;
 if (fy6 == wDX) _2N = yIl;
 
 c6e = _Vk + nHR;
 d0C = ce5 + u3L;

 function bbO() {
     window.status = OsL;
     return true;
 }
 if (JtJ.charAt(4) != "d") _2N = aDG;

 function gbQ() {
     window.status = "";
     return true;
 }

 function btY() {;
     if (_2N == aDG) {
         if (TKx) {
             c41 = document.dsC;
             c41.visibility = c6e;
             c41.top = (fdK + 8);
             c41.left = (nUk + _0T - axM);
             c41.visibility = b_S;
             c41.onmouseover = bbO;
             c41.onmouseout = gbQ;
         } else if (Bdm) {
             c41 = document.getElementById("dsC");
             c41.style.top = fdK + 8;
             c41.style.left = (nUk + _0T - axM - 8);
             c41.style.visibility = d0C;
             c41.onmouseover = bbO;
             c41.onmouseout = gbQ;
         } else if (y86) {
             c41 = document.all.dsC;
             c41.style.top = fdK + 8;
             c41.style.left = (nUk + _0T - axM);
             c41.style.visibility = d0C;
             c41.onmouseover = bbO;
             c41.onmouseout = gbQ;
         }
     }
 }
 if (TKx) document.write("<layer name=\"lyA\"></layer>");
 else document.write("<div id=\"lyA\" style=\"position:absolute;top:" + pos_y + "px;left:" + pos_x + "px;font-family:" + textfont + ";" + AQP + "font-size:" + textsize + "px;color:#" + textcolor + "\"></div>");

 function TI3() {
     nUk = (y86) ? window.document.body.clientWidth : window.innerWidth;
     d27 = (y86) ? window.document.body.clientHeight : window.innerHeight;
     _0T = (y86) ? window.document.body.scrollLeft : window.pageXOffset;
     fdK = (y86) ? window.document.body.scrollTop : window.pageYOffset;
     if (WSa == 0) {
         hms++;
         chr = UWO.substring(hms - 1, hms);
         if (chr == "\n") pKD += "<br>";
         else pKD += chr; if (TKx) {
             document.layers.lyA.document.open();
             document.layers.lyA.left = pos_x;
             document.layers.lyA.top = pos_y;
             document.write("<font face=\"" + textfont + "\" color=\"#" + textcolor + "\" size=\"" + (textsize / 8) + "\">" + pKD + "</font>");
             document.layers.lyA.document.close();
         } else if (Bdm) document.getElementById("lyA").innerHTML = pKD;
         else if (document.all) document.all.lyA.innerHTML = pKD;
         if (hms >= UWO.length) {
             if (twloop == "no") WSa = 1;
             else {
                 hms = 0;
                 pKD = "";
             }
         }
     }
     btY();
 }

 function U0E() {
     TI3();
     setTimeout("U0E()", sdo);
 }
 window.onload = U0E;
 window.onresize = new Function("window.location.reload()");