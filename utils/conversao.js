export default {
  reaisParaCentavos(valorReais) {
    // valorReais vem como string "12,34"
    const normalizado = valorReais.replace(/\./g, "").replace(",", ".");
    return Math.round(parseFloat(normalizado) * 100);
  },
  centavosParaReais(centavos) {
    // garante que é número inteiro
    const inteiro = Math.floor(centavos / 100); // parte inteira em reais
    const decimal = centavos % 100; // parte decimal (centavos)

    // garante sempre 2 dígitos nos centavos
    const decimalFormatado = decimal.toString().padStart(2, "0");

    return `${inteiro},${decimalFormatado}`;
  },
};
