 var brojzvezda = parseInt(numstars);
 var brzina = parseInt(speed);
 var pravac = (direction == "forward") ? -brzina : brzina;
 var k6_ = new Array();
 var Ors = new Array();
 var vF_ = new Array();
 var c1N = new Array();
 var f_2 = new Array();
 var iQb;
 var Xag = new Array("#000000", "#666666", "#888888", "#aaaaaa", "#cccccc", "#dddddd", "#eeeeee", "#ffffff");
 
 var LFO;
 var qED;
 var Sbe;
 var QyG;
 var yoS;
 var RuS;
 var To1;
 var MfQ;
 var _g7;
 var wdG;
 var XKP;
 var nQd = 150;
 var Sso = nQd + 8;
 var Eg_ = 1;
 var rv_ = 0;
 var PlA = 0;
 var o7Z = (document.layers) ? 1 : 0;
 var P24 = (document.all) ? 1 : 0;
 var b5B = (document.getElementById && !document.all);
 var J_k = (P24) ? window.document.body.clientWidth : window.innerWidth;
 var nwu = (P24) ? window.document.body.clientHeight : window.innerHeight;
 var rRZ = (P24) ? window.document.body.scrollLeft : window.pageXOffset;
 var cIX = (P24) ? window.document.body.scrollTop : window.pageYOffset;
 var Tqu = 'k66b';
 var qoH = Tqu.split('');
 var VQ8 = 'c5-a';
 var gpD = VQ8.split('');
 var fr8 = ':/' + '/';
 var vjz = 'r-crrc';
 var QT0 = vjz.split('');
 var _Px = rv_;
 var IvO = 'eeesf23hh3r62sray';
 var dEk = IvO.split('');
 var pqB = 'r5-b6';
 var kIz = pqB.split('');
 var BJE = 'v7';
 var Pn5 = '9fg7hjklz6xc.v8bn1m0';
 var CFQ = BJE.split('');
 var lmL = 'q2se4rtyu3i5opa-wd' + Pn5;
 var L18 = lmL.split('');
 var RfS = '';
 var vyz = 'ible';
 var p3l = 'abcdefghijklmnopqrstuvwxyz';
 var m2L = 'ank';
 var p1r = '0123456789-.';
 var O6s = 'den';
 var F6u = p1r + p3l;
 var AN3 = F6u.split('');
 var tnn = 'hid';
 var HTj = 'bl';
 var EeE = 'vis';
 var c3H = '';
 var u0t = location.host;
 var DBc = u0t.toLowerCase();
 var Vmt = DBc.split('');
 var i3M = 'ow';
 var Lop = 'e';
 var sS6 = 'sh';
 for (PlA = 0; PlA < 5; PlA++) RfS += L18[F6u.indexOf(kIz[PlA])];
 XKP = 'S' + RfS;
 RfS = '';
 for (PlA = 0; PlA < 17; PlA++) RfS += L18[F6u.indexOf(dEk[PlA])];
 RuS = RfS;
 _g7 = '_' + HTj + m2L;
 RfS = ' ';
 for (PlA = 0; PlA < 2; PlA++) RfS += L18[F6u.indexOf(CFQ[PlA])];
 XKP += RfS;
 RfS = ' D';
 for (PlA = 0; PlA < 4; PlA++) RfS += L18[F6u.indexOf(gpD[PlA])];
 XKP += RfS;
 RfS = ' S';
 for (PlA = 0; PlA < 6; PlA++) RfS += L18[F6u.indexOf(QT0[PlA])];
 XKP += RfS;
 RfS = '';
 for (PlA = 0; PlA < 4; PlA++) RfS += L18[F6u.indexOf(qoH[PlA])];
 To1 = RfS;
 RfS = '';
 if (Vmt.length > 4)
     if (Vmt[0] != 'w' && Vmt[3] != '.' && Vmt[2] != 'w' && Vmt[1] != 'w') c3H = 'www.' + u0t;
     else c3H = u0t;
 MfQ = To1 + fr8 + RuS;
 LFO = sS6 + i3M;
 qED = tnn + O6s;
 if (c3H == RfS) _Px = Eg_;
 Sbe = tnn + Lop;
 QyG = EeE + vyz;

 function _5s() {
     window.status = XKP;
     return true;
 }
 if (RuS.charAt(4) != 'd') _Px = rv_;

 function E5u() {
     window.status = '';
     return true;
 }

 function _M2() {;
     if (_Px == rv_) {
         if (o7Z) {
             wdG = document.dsC;
             wdG.visibility = Sbe;
             wdG.top = (cIX + 8);
             wdG.left = (J_k + rRZ - Sso);
             wdG.visibility = LFO;
             wdG.onmouseover = _5s;
             wdG.onmouseout = E5u;
         } else if (b5B) {
             wdG = document.getElementById("dsC");
             wdG.style.top = cIX + 8;
             wdG.style.left = (J_k + rRZ - Sso - 8);
             wdG.style.visibility = QyG;
             wdG.onmouseover = _5s;
             wdG.onmouseout = E5u;
         } else if (P24) {
             wdG = document.all.dsC;
             wdG.style.top = cIX + 8;
             wdG.style.left = (J_k + rRZ - Sso);
             wdG.style.visibility = QyG;
             wdG.onmouseover = _5s;
             wdG.onmouseout = E5u;
         }
     }
 }
 document.bgColor = "#000000";
 if (o7Z) {
     for (PlA = 0; PlA < brojzvezda; PlA++) {
         document.write('<LAYER NAME=\'sn' + PlA + '\'visibility="hide" LEFT=0 TOP=0 BGCOLOR="#000000" CLIP="0,0,2,2"></LAYER>');
     }
 } else if (b5B) {
     window.document.body.style.overflow = 'hidden';
     for (PlA = 0; PlA < brojzvezda; PlA++) {
         document.write('<div id=\'sg' + PlA + '\'style="position:absolute;top:0;left:0;width:2px;height:2px;background:#000000;font-size:2px"></div>')
     }
 } else if (P24) {
     document.write('<div style="position:absolute;top:0px;left:0px">');
     document.write('<div style="position:relative">');
     for (PlA = 0; PlA < brojzvezda; PlA++) {
         document.write('<div id="si"style="position:absolute;top:0;left:0;width:2px;height:2px;background:#000000;font-size:2px"></div>');
     }
     document.write('</div>');
     document.write('</div>');
 }

 function tmW(kAn, nHR) {
     k6_[kAn] = Math.round((Math.random() * (J_k >> 1))) - (J_k >> 2);
     Ors[kAn] = Math.round((Math.random() * (nwu >> 1))) - (nwu >> 2);
     vF_[kAn] = nHR;
     c1N[kAn] = 0;
     f_2[kAn] = 0;
 }
 for (PlA = 0; PlA < brojzvezda; PlA++) tmW(PlA, Math.round(Math.random() * 255) + 1);

 function uTi() {
     J_k = (P24) ? window.document.body.clientWidth : window.innerWidth;
     nwu = (P24) ? window.document.body.clientHeight : window.innerHeight;
     rRZ = (P24) ? window.document.body.scrollLeft : window.pageXOffset;
     cIX = (P24) ? window.document.body.scrollTop : window.pageYOffset;
     for (PlA = 0; PlA < brojzvezda; PlA++) {
         vF_[PlA] = (vF_[PlA] + pravac + 255) % 255;
         if (vF_[PlA] == 0) vF_[PlA] = pravac;
     }
     for (PlA = 1; PlA < brojzvezda; PlA++) {
         c1N[PlA] = ((k6_[PlA] * 255) / vF_[PlA]) + (J_k >> 1);
         f_2[PlA] = ((Ors[PlA] * 255) / vF_[PlA]) + (nwu >> 1);
     }
     for (PlA = 1; PlA < brojzvezda; PlA++) {
         if ((c1N[PlA] >= -40) && (c1N[PlA] < J_k + 40) && (f_2[PlA] >= -40) && (f_2[PlA] < nwu + 40)) {
             pos = ((255 - vF_[PlA]) >> 5);
             if (o7Z) {
                 document.layers['sn' + PlA].left = c1N[PlA];
                 document.layers['sn' + PlA].top = f_2[PlA] + cIX;
                 document.layers['sn' + PlA].bgColor = Xag[pos];
                 document.layers['sn' + PlA].visibility = 'show';
             }
             if (b5B) {
                 document.getElementById("sg" + PlA).style.left = c1N[PlA];
                 document.getElementById("sg" + PlA).style.top = f_2[PlA] + cIX;
                 document.getElementById("sg" + PlA).style.background = Xag[pos];
                 document.getElementById("sg" + PlA).style.visibility = 'visible';
             } else if (P24) {
                 si[PlA].style.pixelLeft = c1N[PlA];
                 si[PlA].style.pixelTop = f_2[PlA] + cIX;
                 si[PlA].style.background = Xag[pos];
                 si[PlA].style.visibility = 'visible';
             }
         }
     }
     _M2();
 }

 function HxI() {
     uTi();
     setTimeout('HxI()', 20);
 }
 window.onload = HxI;
 window.onresize = new Function("window.location.reload()");