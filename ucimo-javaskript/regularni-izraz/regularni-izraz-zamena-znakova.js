var niz = "U 34657 povodu 1945 obilježavanja i 70 proslave 700 obljetnice značajnih događaja iz Narodnooslobodilačke borbe Hrvatske, Savez antifašističkih boraca i antifašista Republike Hrvatske priredio je u svojim prostorijama i na internetu izložbu fotografija iz perioda Narodno-oslobodilačkog rata.";
var patern = /[0-9]{5}/g;
var result = niz.match(patern);

console.log(result);

//pronalazi 5 brojeva i menja ih bilo čim
var novi = niz.replace(/[0-9]{5}/g, "xxxxx");

console.log(novi);