# Verificação da versão 2

## Verificações concluídas

- 45 referências locais e âncoras verificadas, sem arquivo ausente.
- Três documentos HTML parseados; cada um com um único h1.
- JSON-LD válido, preços do produto ausentes antes do pitch e CTAs intermediários apontando para `#oferta`.
- Imagens com dimensões e textos alternativos; logo original aplicada no cabeçalho das três páginas.
- Nova tipografia Barlow Condensed 800 local, com licença de distribuição; Inter preservada no corpo.
- JavaScript sem erros de sintaxe.
- Testes programáticos aprovados para checkout, UTMs permitidos, clique dos CTAs, FAQ, visualização da oferta, barra móvel e vídeo carregado após clique.
- Testes programáticos aprovados para revelação dos blocos por rolagem, barra de progresso, estado do cabeçalho, inclinação dos cards e resposta à preferência por movimento reduzido.
- Eventos de origem diferente do player são rejeitados; a reprodução é registrada apenas quando o player informa que começou.
- Conteúdo visível sem JavaScript; nenhuma classe que esconde conteúdo foi embutida no HTML inicial.
- Open Graph atualizado com 1200 × 630 e inspecionado visualmente.
- Títulos principais conferidos por cálculo das métricas da fonte nos tamanhos 320, 360, 390, 430, 768, 1024, 1366, 1440 e 1920 px. Isso é uma checagem de dimensões tipográficas, não renderização de navegador.
- No celular, o cartão de preço foi colocado antes das entregas; nenhuma informação de preço foi adicionada ao hero ou à barra móvel.
- Nova copy possui aproximadamente 21% menos palavras nos blocos principais comparados à versão anterior (447 versus 567; respostas fechadas do FAQ não incluídas nessa comparação).

## Limites

Não houve navegação visual em browser nem medição de Lighthouse: o controle de navegador necessário não está disponível neste ambiente. Os testes acima não substituem a revisão visual da página publicada, da reprodução de vídeo e da compra real no checkout. Não foi medida taxa de conversão.

O link da Kiwify é o fornecido pelo produtor. Na verificação anterior, a consulta automática recebeu HTTP 403; não se verificou o preço efetivo nem a configuração da garantia. O vídeo e os links externos foram preservados. Nenhuma compra ou mensagem foi enviada.

A urgência é apresentada como condição promocional temporária informada pelo produtor. Não há contador, perda fictícia do desconto ao fechar a aba ou promessa de que a equipe conseguirá reaplicar o preço. A equipe deve consultar a disponibilidade real se houver diferença no checkout.

As instruções de publicação, configurações de domínio e pendências estão no README.
