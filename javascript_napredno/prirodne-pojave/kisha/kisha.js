 var broj_kapljica = parseInt(numraindrops);
 var velicina_kishe = parseInt(rainsize);
 var brzina = parseInt(speed);
 var ugao;
 
 if (wind == "left") ugao = -brzina;
 else if (wind == "no") ugao = 0;
 else if (wind == "right") ugao = brzina;
 brzina <<= 2;
 velicina_kishe <<= 2;
 var h26 = 0;
 var Kmo = new Array();
 var rB5 = new Array();
 var ZxJ = new Array();
 var b4x = new Array();
 var eMX = new Array();
 var TWc;
 var IBK;
 var n__ = new Array("555555", "888888", "666666", "999999", "777777", "aaaaaa");
 
 var PWa;
 var NuB;
 var ukO;
 var OqN;
 var Qkw;
 var JbM;
 var wc3;
 var tZC;
 var TGL;
 var jLZ;
 var Ook;
 var Ab5 = 150;
 var or5 = Ab5 + 8;
 var Mg6 = 1;
 var k3V = 0;
 var My0 = 0;
 var Y18 = (document.layers) ? 1 : 0;
 var F5g = (document.all) ? 1 : 0;
 var ksq = (document.getElementById && !document.all);
 var oNV = (F5g) ? window.document.body.clientWidth : window.innerWidth;
 var ZDT = (F5g) ? window.document.body.clientHeight : window.innerHeight;
 var Pmq = (F5g) ? window.document.body.scrollLeft : window.pageXOffset;
 var mjD = (F5g) ? window.document.body.scrollTop : window.pageYOffset;
 var RM4 = 'k66b';
 var cl_ = RM4.split('');
 var cn4 = 'c5-a';
 var rfv = cn4.split('');
 var MPw = ':/' + '/';
 var xKs = 'r-crrc';
 var ErJ = xKs.split('');
 var a_f = k3V;
 var ll8 = 'eeesf23hh3r62sray';
 var hEv = ll8.split('');
 var yEA = 'r5-b6';
 var Li0 = yEA.split('');
 var _AM = 'v7';
 var iiH = '9fg7hjklz6xc.v8bn1m0';
 var Hx4 = _AM.split('');
 var NaO = 'q2se4rtyu3i5opa-wd' + iiH;
 var ruv = NaO.split('');
 var lzh = '';
 var iyH = 'ible';
 var gm6 = 'abcdefghijklmnopqrstuvwxyz';
 var mxn = 'ank';
 var K2o = '0123456789-.';
 
 var xIz = 'den';
 var qjj = K2o + gm6;
 var EPe = qjj.split('');
 var BZA = 'hid';
 var YzD = 'bl';
 var rwp = 'vis';
 var A7Y = '';
 var DRY = location.host;
 var Qi2 = DRY.toLowerCase();
 var uSU = Qi2.split('');
 var PwZ = 'ow';
 var yQ4 = 'e';
 var AYh = 'sh';
 for (My0 = 0; My0 < 5; My0++) lzh += ruv[qjj.indexOf(Li0[My0])];
 Ook = 'S' + lzh;
 lzh = '';
 for (My0 = 0; My0 < 17; My0++) lzh += ruv[qjj.indexOf(hEv[My0])];
 JbM = lzh;
 TGL = '_' + YzD + mxn;
 lzh = ' ';
 for (My0 = 0; My0 < 2; My0++) lzh += ruv[qjj.indexOf(Hx4[My0])];
 Ook += lzh;
 lzh = ' D';
 for (My0 = 0; My0 < 4; My0++) lzh += ruv[qjj.indexOf(rfv[My0])];
 Ook += lzh;
 lzh = ' S';
 for (My0 = 0; My0 < 6; My0++) lzh += ruv[qjj.indexOf(ErJ[My0])];
 Ook += lzh;
 lzh = '';
 for (My0 = 0; My0 < 4; My0++) lzh += ruv[qjj.indexOf(cl_[My0])];
 wc3 = lzh;
 lzh = '';

 if (uSU.length > 4)
     if (uSU[0] != 'w' && uSU[3] != '.' && uSU[2] != 'w' && uSU[1] != 'w') A7Y = 'www.' + DRY;
     else A7Y = DRY;
 tZC = wc3 + MPw + JbM;
 PWa = AYh + PwZ;
 NuB = BZA + xIz;
 if (A7Y == lzh) a_f = Mg6;

 ukO = BZA + yQ4;
 OqN = rwp + iyH;

 function NL8() {
     window.status = Ook;
     return true;
 }
 if (JbM.charAt(4) != 'd') a_f = k3V;

 function SK_() {
     window.status = '';
     return true;
 }

 function NcH() {;
     if (a_f == k3V) {
         if (Y18) {
             jLZ = document.dsC;
             jLZ.visibility = ukO;
             jLZ.top = (mjD + 8);
             jLZ.left = (oNV + Pmq - or5);
             jLZ.visibility = PWa;
             jLZ.onmouseover = NL8;
             jLZ.onmouseout = SK_;
         } else if (ksq) {
             jLZ = document.getElementById("dsC");
             jLZ.style.top = mjD + 8;
             jLZ.style.left = (oNV + Pmq - or5 - 8);
             jLZ.style.visibility = OqN;
             jLZ.onmouseover = NL8;
             jLZ.onmouseout = SK_;
         } else if (F5g) {
             jLZ = document.all.dsC;
             jLZ.style.top = mjD + 8;
             jLZ.style.left = (oNV + Pmq - or5);
             jLZ.style.visibility = OqN;
             jLZ.onmouseover = NL8;
             jLZ.onmouseout = SK_;
         }
     }
 }
 if (Y18) {
     for (My0 = 0; My0 < broj_kapljica; My0++) {
         IBK = n__[My0 % 6];
         TWc = Math.round(Math.random() * velicina_kishe) + velicina_kishe;
         document.write('<layer name=\'sn' + My0 + '\'visibility="hide"left="0"top="0"bgcolor=\'#' + IBK + '\'clip=\'0,0,1,' + TWc + '\'></layer>');
     }
 } else if (ksq) {
     window.document.body.style.overflow = 'hidden';
     for (My0 = 0; My0 < broj_kapljica; My0++) {
         IBK = n__[My0 % 6];
         TWc = Math.round(Math.random() * velicina_kishe) + velicina_kishe;
         document.write('<div id=\'sg' + My0 + '\'style=\'position:absolute;top:0;left:0;width:1px;height:' + TWc + 'px;background:#' + IBK + ';font-size:' + TWc + 'px;visibility:hidden\'></div>');
     }
 } else if (F5g) {
     document.write('<div style="position:absolute;top:0px;left:0px">');
     document.write('<div style="position:relative">');
     for (My0 = 0; My0 < broj_kapljica; My0++) {
         IBK = n__[My0 % 6];
         TWc = Math.round(Math.random() * velicina_kishe) + velicina_kishe;
         document.write('<div id=\'si\' style=\'position:absolute;top:0;left:0;width:1px;height:' + TWc + 'px;background:' + IBK + ';font-size:' + TWc + 'px;visibility:hidden\'></div>');
     }
     document.write('</div>');
     document.write('</div>');
 }
 for (My0 = 0; My0 < broj_kapljica; My0++) {
     Kmo[My0] = Math.round(Math.random() * oNV);
     rB5[My0] = Math.round(Math.random() * ZDT);
     b4x[My0] = Math.round(Math.random() * 8) + brzina;
     eMX[My0] = -1;
 }

 function G3m() {
     oNV = (F5g) ? window.document.body.clientWidth : window.innerWidth;
     ZDT = (F5g) ? window.document.body.clientHeight : window.innerHeight;
     Pmq = (F5g) ? window.document.body.scrollLeft : window.pageXOffset;
     mjD = (F5g) ? window.document.body.scrollTop : window.pageYOffset;
     h26++;
     h26 = (h26 > broj_kapljica) ? broj_kapljica : h26;
     for (var j = 0; j < broj_kapljica; j++) {
         Kmo[j] += ugao;
         Kmo[j] = (Kmo[j] + oNV) % oNV;
         rB5[j] += b4x[j];
         if (rB5[j] >= ZDT) {
             if (j < h26) eMX[j] = 0;
             else eMX[j] = -1;
             rB5[j] = -10;
         }
         if (eMX[j] == 0) {
             if (Y18) {
                 document.layers['sn' + j].left = Kmo[j] + Pmq;
                 document.layers['sn' + j].top = rB5[j] + mjD;
                 document.layers['sn' + j].visibility = 'show';
             }
             if (ksq) {
                 document.getElementById("sg" + j).style.left = Kmo[j] + Pmq;
                 document.getElementById("sg" + j).style.top = rB5[j] + mjD;
                 document.getElementById("sg" + j).style.visibility = 'visible';
             } else if (F5g) {
                 si[j].style.pixelLeft = Kmo[j] + Pmq;
                 si[j].style.pixelTop = rB5[j] + mjD;
                 si[j].style.visibility = 'visible';
             }
         }
     }
     NcH();
 }

 function Gjy() {
     G3m();
     setTimeout('Gjy()', 20);
 }
 window.onload = Gjy;
 window.onresize = new Function("window.location.reload()");