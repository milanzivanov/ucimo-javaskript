const osoba = {
  ime: 'John',
  prezime: 'Doe',
  starost: 25
}

for (const svojstvo in osoba) {
  console.log(osoba[svojstvo])
}
