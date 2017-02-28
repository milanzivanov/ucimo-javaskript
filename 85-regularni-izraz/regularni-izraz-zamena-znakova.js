const niz = 'U 34657 povodu 1945 obilježavanja i 70 proslave 700 obljetnice značajnih događaja iz Narodnooslobodilačke borbe Hrvatske, Savez antifašističkih boraca i antifašista Republike Hrvatske priredio je u svojim prostorijama i na internetu izložbu fotografija iz perioda Narodno-oslobodilačkog rata.'
const patern = /[0-9]{4}/g

// samo nalazi
const result = niz.match(patern)
console.log(result)

// pronalazi i menja
const novi = niz.replace(patern, 'xxxxx')
console.log(novi)
