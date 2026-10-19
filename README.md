# Cocriando em 7 · versão 2

Versão reformulada: identidade escura e violeta, logo original no cabeçalho, títulos em Barlow Condensed 800, pitch com desconto em primeiro plano e efeitos de interface.

Landing page estática em português, com HTML, CSS e JavaScript puro. Não precisa de Node, npm, framework ou build. Abra `index.html` para inspecionar os arquivos; para reproduzir o vídeo incorporado, use a versão publicada em HTTPS.

## O que está funcionando

- Todos os botões de participação anteriores à oferta levam a `#oferta`.
- Preços do curso aparecem apenas na oferta final da página de vendas.
- Compra: `https://pay.kiwify.com.br/EsxrUl1`, em nova aba, com os parâmetros de campanha permitidos preservados.
- Suporte e reembolso: `https://wa.me/5583999935710`, com mensagens de contexto.
- Vídeo: `On6n-RriodU`, carregado somente depois do clique, via YouTube com modo de privacidade aprimorada.
- Depoimentos: dois relatos que citam o Cocriando em 7, com opção de abrir a mensagem original. Fotografias e nomes de participantes não são expostos nos recortes.
- Bônus: aulas de gratidão, crenças e espiritualidade, ferramenta de reprogramação, instruções em PDF e exercício espiritual, conforme a tela da área de membros.
- Garantia incondicional de sete dias, conforme autorizado pelo produtor.
- FAQ nativo acessível; os textos continuam acessíveis sem JavaScript.
- Barra de participação no celular aparece depois do hero e fica oculta quando a oferta está na tela. Não mostra preço fora da oferta.
- Fontes e imagens locais, sem rastreadores de terceiros instalados e sem cookies próprios.

## Publicar no GitHub Pages — recomendado

1. Crie um repositório no GitHub com a branch `main`.
2. Envie **o conteúdo desta pasta**, mantendo a estrutura. `index.html` deve estar na raiz do repositório. Inclua `.github/workflows/pages.yml`.
3. Vá a **Settings → Pages → Build and deployment → Source** e escolha **GitHub Actions**.
4. Em **Actions**, abra **Publicar Cocriando em 7** e execute **Run workflow**. Novos envios à branch `main` também acionam a publicação.
5. O workflow descobre o endereço oficial do GitHub Pages, ajusta canonical, Open Graph, sitemap e robots, e publica apenas os arquivos públicos. Não é preciso editar um domínio fictício à mão.
6. Abra a URL mostrada no resultado do workflow e confira a página e o checkout antes de enviar tráfego.

O workflow usa as ações oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`. Referência: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

### Publicação manual ou hospedagem convencional

Se não for usar o workflow, configure a URL pública uma vez:

```bash
python3 scripts/configurar-publicacao.py https://SEU-DOMINIO.com/cocriando/
```

Substitua pelo endereço real, incluindo o caminho correto. O script atualiza metadados, sitemap e robots. Depois envie `index.html`, `styles.css`, `script.js`, as duas páginas legais, `robots.txt`, `sitemap.xml`, `.nojekyll` e `assets/` à hospedagem. Não há build.

**Importante:** os arquivos de origem usam `example.invalid` e `noindex` como marcações de pré-publicação. O workflow resolve isso automaticamente. Na rota manual, execute o configurador antes de publicar. Isso evita anunciar um domínio inventado. O script também aceita uma segunda execução para trocar o domínio.

## Domínio personalizado

Em **Settings → Pages → Custom domain**, cadastre seu domínio e siga os registros DNS indicados pelo GitHub. Ative HTTPS depois que o certificado estiver disponível. Execute novamente o workflow; ele usará o endereço configurado pelo GitHub Pages. Em hospedagem convencional, execute o configurador com o domínio definitivo e reenvie os arquivos.

## Alterar textos, fotos e cores

- Textos, FAQ, oferta e garantia: `index.html`.
- Cores e tamanhos: variáveis no início de `styles.css`.
- Fotos e capas: `assets/images/`. Preserve os nomes ou ajuste os caminhos no HTML.
- Checkout: altere o link em `index.html` **e** `CHECKOUT_URL` em `script.js`. Sem JavaScript o link do HTML continua funcionando.
- Vídeo: altere `VIDEO_ID` em `script.js` e o link alternativo do YouTube em `index.html`. Troque `capa-vsl.webp` se necessário.
- WhatsApp: substitua todas as ocorrências de `5583999935710`, inclusive termos, privacidade e garantia.
- Open Graph: `assets/images/open-graph.jpg`, em 1200 × 630. Após trocar domínio ou arquivo, teste o compartilhamento; serviços podem manter uma miniatura antiga em cache.
- Tipografia: Barlow Condensed 800 nos títulos e Inter no corpo. A marca do cabeçalho utiliza o arquivo original da logo, sem recriar sua fonte, hospedadas localmente; licenças em `assets/fonts/`.

## Rastreamento preparado

O `script.js` centraliza uma função `track()` que adiciona eventos ao `window.dataLayer`, somente em memória. Não há Pixel, GA ou GTM instalado nem IDs inventados. Eventos: `cta_offer`, `offer_view`, `checkout_click`, `whatsapp_click`, `faq_open`, `video_request`, `video_play` e `video_external`. `video_play` depende de o player informar o início real da reprodução. Não há formulário, portanto não há eventos de formulário simulados.

Parâmetros repassados ao checkout: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `src`, `sck`. Parâmetros arbitrários e dados pessoais não são repassados pelo código. Antes de instalar rastreadores, revise privacidade e os mecanismos de consentimento aplicáveis.

## Oferta e pontos de operação

- Histórico informado: R$ 147. Condição anunciada: R$ 47, pagamento único, desconto de R$ 100.
- **Confira na Kiwify que o checkout fornecido está efetivamente em R$ 47 e corresponde ao Cocriando em 7.** O ambiente de verificação recebeu bloqueio 403 e não pôde consultar os dados do checkout.
- A página não afirma que fechar a aba elimina o desconto. Uma página estática não impõe preço na Kiwify nem identifica de forma confiável a mesma pessoa em outros dispositivos. Para oferecer essa regra, configure elegibilidade real na plataforma antes de alterar a copy. Não há cronômetro, expiração simulada ou redirecionamento punitivo.
- Configure também a garantia de sete dias no produto e no atendimento. O site informa a garantia autorizada, mas não altera a conta da Kiwify. A copy agora informa que a condição é promocional temporária e orienta a falar com a equipe se o checkout exibir R$ 147, sem prometer que o preço será restabelecido.
- Prazo total de acesso, horários de suporte e parcelamento não foram informados. O site não promete acesso vitalício, atendimento individual, encontros ao vivo ou um parcelamento não confirmado.

## Antes do tráfego

- [ ] Abra o checkout e confirme produto, preço, meios de pagamento e garantia.
- [ ] Confirme o prazo de acesso com a equipe e inclua a informação no FAQ/termos.
- [ ] Revise a identificação jurídica do vendedor e os documentos legais de acordo com a operação. CNPJ, razão social e endereço não foram fornecidos; nenhum foi inventado.
- [ ] Confirme a autorização de uso dos dois relatos e o contexto de participação. Não foram usados relatos atribuíveis ao LEAP nem porcentagens de satisfação sem base de pesquisa.
- [ ] Abra o vídeo em celular real: clique, som, tela cheia e reprodução incorporada.
- [ ] Teste a página e os botões em 320, 360, 390, 430, 768, 1024, 1366, 1440 e 1920 px. O CSS cobre esses intervalos, mas o ambiente desta entrega não disponibilizou revisão visual em navegador.
- [ ] Faça uma compra de teste e um teste do fluxo de reembolso na sua operação.
- [ ] Confirme que o endereço real aparece em `og:url`, `og:image`, canonical, robots e sitemap depois da publicação.
- [ ] Se quiser incluir Instagram, forneça o perfil oficial; foi usado apenas o canal de YouTube retornado para o vídeo fornecido.
- [ ] Rode Lighthouse na URL publicada. Não foi atribuída nota de desempenho sem medição.

## Estrutura

```text
cocriando-em-7/
  index.html
  styles.css
  script.js
  politica-de-privacidade.html
  termos-de-uso.html
  robots.txt
  sitemap.xml
  README.md
  BRIEFING.md
  VALIDACAO.md
  .nojekyll
  .github/workflows/pages.yml
  scripts/configurar-publicacao.py
  scripts/verificar.py
  assets/images/
  assets/icons/favicon.svg
  assets/fonts/
```

Não envie PDFs internos do curso ao repositório público. O pacote contém somente recursos usados na apresentação e documentação do site.


## O que mudou na versão 2

- Headline: **VOCÊ QUER PROSPERAR. QUANDO VAI COMEÇAR POR VOCÊ?**
- Texto principal com cerca de 21% menos palavras nos blocos comparados à versão anterior (447 versus 567, sem contar as respostas fechadas do FAQ).
- Logo original no cabeçalho e nas páginas legais; removido somente o fundo escuro ao preparar o asset, sem redesenhar letras.
- Tipografia Barlow Condensed 800 para títulos, com aparência própria de campanha.
- Hero com trama gráfica, luz que acompanha o ponteiro no desktop, órbitas e selo flutuante.
- Entradas dos blocos por rolagem, reflexo nos botões, realce e inclinação moderada nos cards, movimento nas capas e borda luminosa na oferta.
- Progresso de leitura no topo; cabeçalho acompanha a rolagem.
- Efeitos reduzidos no celular e desativados conforme `prefers-reduced-motion`. Conteúdo não depende de animações para funcionar.
- O cartão da oferta vem antes das entregas no celular, com R$ 100 de economia, R$ 147 riscado e R$ 47 em tamanho maior.
- Não há cronômetro nem data final inventada. A disponibilidade real precisa ser administrada na Kiwify pelo produtor.

Para atualizar um repositório existente, substitua os arquivos e a pasta `assets/` pelos desta versão. Preserve o seu domínio configurado e execute o workflow novamente; ele aplica os metadados corretos no resultado publicado. Se usar publicação manual, execute o configurador antes de enviar os arquivos.
