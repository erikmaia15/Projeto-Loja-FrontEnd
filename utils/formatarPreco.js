export default {
  formatPrice(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    if (!value) {
      return "0,0";
    }
    console.log(value);

    // Divide em reais
    const numberValue = (parseInt(value, 10) / 100).toFixed(2);
    console.log(numberValue);
    console.log(numberValue.replace(".", ","));
    // Formata no padrão BR (vírgula nos decimais)
    return numberValue.replace(".", ",");
  },
};
