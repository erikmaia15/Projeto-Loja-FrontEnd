export default {
  reaisParaCentavos(valorReais) {
    // valorReais vem como string "12,34"
    const normalizado = valorReais.replace(/\./g, "").replace(",", ".");
    return Math.round(parseFloat(normalizado) * 100);
  },
};
