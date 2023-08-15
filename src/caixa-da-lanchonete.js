/**
 * @typedef{{
 * codigo: string;
 * descricao: string;
 * valor: number;
 * }} MenuItem
 */

// Define o tipo de dado "MenuItem" com três propriedades: código, descrição e valor.
// Serve para representar um item do cardápio.

/**
 * Define o tipo de dado "MenuItem" com três propriedades: código, descrição e valor.
 * Serve para representar um item do cardápio.
 */
const cardapio = {
  cafe: { descricao: "Café", valor: 3.0, tipo: "principalBebida" },
  chantily: {
    descricao: "Chantily (extra do Café)",
    valor: 1.5,
    tipo: "extraBebida",
  },
  suco: { descricao: "Suco Natural", valor: 6.2, tipo: "principalBebida" },
  sanduiche: { descricao: "Sanduíche", valor: 6.5, tipo: "principalComida" },
  queijo: {
    descricao: "Queijo (extra do Sanduíche)",
    valor: 2.0,
    tipo: "extraComida",
  },
  salgado: { descricao: "Salgado", valor: 7.25, tipo: "principalComida" },
  combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5, tipo: "combo" },
  combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5, tipo: "combo" },
};

class CaixaDaLanchonete {
  /**
   * @param {'debito' | 'credito' | 'dinheiro'} metodoDePagamento Qual método de pagamento
   * @param {Array<string>} itens Os itens do pedido no formato código, quantidade
   * @returns O valor total da compra
   */
  calcularValorDaCompra(metodoDePagamento, itens) {
    // Função que calcula o valor total da compra com base nos itens selecionados e no método de pagamento.

    if (
      !(
        metodoDePagamento === "debito" ||
        metodoDePagamento === "dinheiro" ||
        metodoDePagamento === "credito"
      )
    )
      return "Forma de pagamento inválida!";

    if (itens.length === 0) return "Não há itens no carrinho de compra!";

    const verificar = this.verificarCarrinho(itens);

    if (verificar !== "OK") return verificar;

    // Inicializa o valor total como 0.
    let valor = 0;

    itens.forEach((item) => {
      // Itera sobre cada item no array de itens.

      const codigo = item.split(",")[0];
      const quantidade = Number(item.split(",")[1]);

      // Divide o item em partes: código e quantidade.

      const itemNoCardapio = cardapio[codigo];
      if (!itemNoCardapio) {
        return "Item inválido!";
      }

      // Obtém o valor do item do cardápio.
      const valordoitem = itemNoCardapio.valor;

      // Calcula o valor total do item multiplicando o valor unitário pelo número de unidades.
      valor += valordoitem * quantidade;
    });

    const valorRefinado = (
      metodoDePagamento === "credito"
        ? valor * 1.03
        : metodoDePagamento === "dinheiro"
        ? valor * 0.95
        : valor
    ).toFixed(2);

    return `R$ ${valorRefinado}`.replace(".", ",");
    // Retorna o valor total da compra com base no método de pagamento escolhido.
    // Se for crédito, acrescenta 3%; se for dinheiro, aplica um desconto de 5%.
  }

  // Método para verificar o carrinho de compras
  verificarCarrinho(carrinho) {
    // Inicializa contadores de quantidade de itens principais e extras de comidas e bebidas
    let principalComida = 0;
    let principalBebida = 0;

    let extraComida = 0;
    let extraBebida = 0;

    // Itera sobre cada item no carrinho
    for (const item of carrinho) {
      // Verifica se o item existe no cardápio
      const codigo = item.split(",")[0];
      const quantidade = Number(item.split(",")[1]);

      if (quantidade === 0) break;

      const itemDoCardapio = cardapio[codigo];
      if (!itemDoCardapio) {
        return "Item inválido!";
      }

      // Verifica o tipo do item e atualiza os contadores
      if (itemDoCardapio.tipo === "principalBebida") {
        principalBebida++;
      } else if (itemDoCardapio.tipo === "principalComida") {
        principalComida++;
      } else if (itemDoCardapio.tipo === "extraComida") {
        // Verifica se o item extra tem um item principal correspondente
        if (principalComida === 0) {
          return "Item extra não pode ser pedido sem o principal";
        }
        extraComida++;
      } else if (itemDoCardapio.tipo === "extraBebida") {
        // Verifica se o item extra tem um item principal correspondente
        if (principalBebida === 0) {
          return "Item extra não pode ser pedido sem o principal";
        }
        extraBebida++;
      }
    }

    // Verifica se há itens principais no carrinho
    if (principalComida === 0 && principalBebida === 0) {
      return "Quantidade inválida!";
    }

    return "OK";
  }
}

// Exporta a classe CaixaDaLanchonete para uso em outros módulos
export { CaixaDaLanchonete };
