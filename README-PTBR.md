# Atlas — pacote pronto para publicar

Este projeto é um aplicativo web instalável (PWA), pensado para celular Android. Inclui conversa com IA via servidor, calculadora de área, estimativa geométrica de volume de concreto, controle local de entradas/saídas, exportação/importação de backup, ditado por voz compatível com o navegador e leitura de respostas por voz.

## Importante: o que está e o que não está pronto

- O código do aplicativo e do servidor está incluído neste pacote.
- A IA só funciona depois que `OPENAI_API_KEY` for configurada no servidor. A chave fica no servidor, nunca no celular/navegador.
- Este pacote não está publicado na internet ainda. Para gerar um link permanente, é necessário publicar o projeto numa conta de hospedagem e configurar a chave secreta. Não é possível fazer isso sem acesso/autorizações da conta do usuário.
- O controle financeiro fica salvo no navegador deste aparelho. Faça backup regularmente. Não há sincronização entre aparelhos ou banco de dados remoto nesta versão.
- O app é PWA; não é um APK da Play Store. Depois de publicado em HTTPS, no Chrome Android use o menu ⋮ > “Instalar app” ou “Adicionar à tela inicial”.

## Publicação sugerida (Render)

1. Crie uma conta no GitHub e uma conta no Render.
2. Crie um repositório GitHub vazio e envie todos os arquivos desta pasta, preservando a pasta `public`.
3. No Render, crie um **Web Service** conectado ao repositório.
4. Configure: **Runtime** Node; **Build Command** vazio ou `npm install`; **Start Command** `npm start`.
5. Em Environment Variables, configure:
   - `OPENAI_API_KEY` = sua chave de API da OpenAI (secreta; nunca a publique no GitHub).
   - `OPENAI_MODEL` = `gpt-4.1-mini` (pode trocar por outro modelo disponível na sua conta).
6. Publique. Abra a URL HTTPS gerada e confirme que aparece “IA conectada”.
7. No Chrome do Android, abra essa URL, toque ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”.

A disponibilidade e o preço do serviço de hospedagem e da API podem mudar. O uso da API é cobrado separadamente e não está incluído na assinatura do ChatGPT. Configure limites de gastos no painel da API antes de usar regularmente. Um plano gratuito de hospedagem pode dormir/iniciar lentamente após períodos sem uso.

## Executar localmente (Node.js 20+)

```bash
OPENAI_API_KEY="sua_chave" npm start
```

Abra `http://localhost:3000`. Para instalar como PWA, a publicação deve usar HTTPS.

## Segurança e limites

- Nunca compartilhe sua chave de API nem a coloque em `public/app.js`.
- O histórico da conversa fica na memória da página; as contas ficam no `localStorage` do aparelho e podem ser apagadas ao limpar dados do navegador.
- Não há login nem sincronização na nuvem nesta versão.
- As respostas da IA são informativas. Projetos estruturais e decisões fiscais precisam de conferência profissional/oficial.

## Atalho de configuração

O arquivo `render.yaml` já descreve o serviço e as variáveis necessárias. Depois de colocar o projeto em um repositório GitHub, use a opção **New > Blueprint** no Render e selecione o repositório. O Render pedirá o valor secreto de `OPENAI_API_KEY`; preencha-o somente no painel do Render.
