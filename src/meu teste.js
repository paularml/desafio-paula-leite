const produtosPrincipais = ["cafe", "suco", "sanduiche", "salgado"]
const listaDeProdutosArray = ["cafe", "suco"]
const veririficaProdutoPrincipal = (elementoAtual) => produtosPrincipais.includes(elementoAtual)
const temProdutoPrincipal = listaDeProdutosArray.some(veririficaProdutoPrincipal)

console.log(temProdutoPrincipal)