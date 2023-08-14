class CaixaDaLanchonete {


    precoProdutos = {
        cafe: 300,
        chantily: 150,
        suco: 620,
        sanduiche: 650,
        queijo: 200,
        salgado: 725,
        combo1: 950,
        combo2: 750,
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const produtos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]
        const produtosPrincipais = ["cafe", "suco", "sanduiche", "salgado"]
        const formasDePagamentoValidas = ["dinheiro", "debito", "credito"]

        if (formasDePagamentoValidas.includes(metodoDePagamento)) {
            if (!itens.length) {
                return "Não há itens no carrinho de compra!"
            } else {
                const listaDeProdutos = itens.map(item => item.split(",")[0]).join(" ")
                const listaDeProdutosArray = listaDeProdutos.split(" ")

                const itemEhValido = listaDeProdutosArray.some(item => produtos.includes(item))

                if (itemEhValido) {
                    const temProdutoPrincipal = listaDeProdutosArray.some(item => produtosPrincipais.includes(item))
                    const itemExtraDoCafe = ["chantily"]
                    const itemExtraDoSanduiche = ["queijo"]
                    const temItemExtraDoCafe = listaDeProdutosArray.some(item => itemExtraDoCafe.includes(item))
                    const temItemExtraDoSanduiche = listaDeProdutosArray.some(item => itemExtraDoSanduiche.includes(item))

                    if (!temProdutoPrincipal) {
                        return "Item extra não pode ser pedido sem o principal"
                    }
                    else if (temProdutoPrincipal && temItemExtraDoCafe && !(listaDeProdutosArray.includes("cafe"))) {
                        return "Item extra não pode ser pedido sem o principal"
                    }
                    else if (temProdutoPrincipal && temItemExtraDoSanduiche && !(listaDeProdutosArray.includes("sanduiche"))) {
                        return "Item extra não pode ser pedido sem o principal"
                    }

                    else {
                        let preco = itens.reduce((total, item) => {
                            const [codigoProduto, quantidade] = item.split(",")
                            return total + this.precoProdutos[codigoProduto] * Number(quantidade)
                        }, 0)

                        if (preco === 0) {
                            return "Quantidade inválida!"
                        } else {
                            if (metodoDePagamento === "dinheiro") {
                                preco = preco * 0.95
                            }
                            else if (metodoDePagamento === "credito") {
                                preco = preco * 1.03
                            }

                            preco = Number((preco / 100).toFixed(2))

                            const locale = 'pt-BR'
                            const valorFormatado = new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(preco);
                            return valorFormatado
                        }
                    }
                } else {
                    return "Item inválido!"
                }
            }
        } else {
            return "Forma de pagamento inválida!"
        }
    }
}
export { CaixaDaLanchonete };

