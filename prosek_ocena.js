var ucenik = {
    ime:"",
    prezime:"",
    prosecna: 0,
    psihologija:0,
    matematika:0,
    srpski:0,
    vladanje:0,
    prosek: function(){
        return (this.psihologija + this.matematika + this.srpski + this.vladanje) / 2;
    }
};

ucenik.ime = "Vatroslav";
ucenik.vladanje = 2;
ucenik.psihologija = 4;

console.log('Moje im je '+ ucenik.ime);
console.log('Moja ocena iz psihologije je: '+ ucenik.psihologija);
console.log('Moj prosek je: ' + ucenik.prosek);