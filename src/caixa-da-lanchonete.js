class CaixaDaLanchonete {
    produtos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]

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
        const produtosPrincipais = ["cafe", "suco", "sanduiche", "salgado"]
        if (metodoDePagamento === "dinheiro" || metodoDePagamento === "debito" || metodoDePagamento === "credito") {
            if (!itens.length) {
                return "Não há itens no carrinho de compra!"
            } else {
                let listaDeProdutos = ""
                for (let j = 0; j < itens.length; j++) {
                    let item = itens[j].split(",")
                    let codigoProduto = item[0]
                    listaDeProdutos += codigoProduto + " "
                }

                let listaDeProdutosArray = listaDeProdutos.split(" ")

                const veririficaItemEhValido = (elementoAtual) => this.produtos.includes(elementoAtual)
                const itemEhValido = listaDeProdutosArray.some(veririficaItemEhValido)

                if (itemEhValido) {
                    const veririficaProdutoPrincipal = (elementoAtual) => produtosPrincipais.includes(elementoAtual)
                    const temProdutoPrincipal = listaDeProdutosArray.some(veririficaProdutoPrincipal)


                    let itemExtra1, itemExtra2 = false
                    if (listaDeProdutosArray.includes("chantily") && listaDeProdutosArray.includes("cafe")) {
                        itemExtra1 = true
                    }
                    if (listaDeProdutosArray.includes("queijo") && listaDeProdutosArray.includes("sanduiche")) {
                        itemExtra2 = true
                    }
                    if (!temProdutoPrincipal) {
                        return "Item extra não pode ser pedido sem o principal"
                    } else if (temProdutoPrincipal && listaDeProdutosArray.includes("chantily") && !itemExtra1) {
                        return "Item extra não pode ser pedido sem o principal"
                    } else if (temProdutoPrincipal && listaDeProdutosArray.includes("queijo") && !itemExtra2) {
                        return "Item extra não pode ser pedido sem o principal"
                    }
                    else {
                        let preco = 0
                        for (let i = 0; i < itens.length; i++) {
                            let item = itens[i].split(",")
                            let codigoProduto = item[0]
                            let quantidade = Number(item[1])
                            preco += this.precoProdutos[codigoProduto] * quantidade
                        } if (preco === 0) {
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

