
//primer greške sa decimalima
var a = 0.1;
var b = 0.2;
console.log(a * b); //ispisuje 0.020000000000000004 

//primer greške sa običnim brojevima
var a = 012;
console.log(a) // ispisuje 10 
//bazični sistem mu je oktalni, pa se zbuni kada počinje sa nulom
//ne počinjati nulom!!

//primer greške u prebacivanju
var j = parseInt("012");
var j = parseInt("019");
//nekad ispadnu neželjeni rezultati, treba ovako:
var j = parseInt("012", 10);
var j = parseInt("019", 10); //naznačiti da je decimalni sistem

