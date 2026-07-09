# Galeria Privada — Passo a Passo Completo

Este é um site privado para guardar fotos e vídeos, protegido por login,
com categorias. Os arquivos ficam guardados no **Supabase** (banco de dados
+ armazenamento de arquivos), e só quem tiver o login e a senha consegue ver.

Este guia foi escrito para quem **nunca mexeu com nada disso**. Siga
exatamente na ordem, sem pular etapas.

---

## O que você vai precisar

- Um navegador (Chrome, Firefox, etc.)
- Um e-mail para criar a conta no Supabase
- Uns 20-30 minutos, com calma

---

## PARTE 1 — Criar a conta e o projeto no Supabase

1. Acesse **https://supabase.com** e clique em **"Start your project"**.
2. Crie uma conta (pode ser com GitHub ou e-mail).
3. Depois de logado, clique em **"New Project"**.
4. Preencha:
   - **Name**: qualquer nome interno, ex: `meu-painel` (não aparece pro público)
   - **Database Password**: crie uma senha forte e **guarde ela em um lugar seguro** (não é a senha de login do site, é a senha do banco de dados)
   - **Region**: escolha a mais próxima de você (ex: South America - São Paulo)
5. Clique em **"Create new project"** e aguarde uns 2 minutos enquanto ele é criado.

---

## PARTE 2 — Pegar as chaves de acesso (URL e chave anon)

1. Dentro do projeto, no menu lateral esquerdo, clique no ícone de engrenagem **"Project Settings"**.
2. Clique em **"API"** (ou "API Keys" dependendo da versão).
3. Você vai ver dois campos importantes:
   - **Project URL** → copie esse valor
   - **anon public** (uma chave longa) → copie esse valor também
4. Guarde os dois em um bloco de notas, você vai usar já já.

---

## PARTE 3 — Criar as tabelas e as regras de segurança

1. No menu lateral, clique em **"SQL Editor"**.
2. Clique em **"New query"**.
3. Abra o arquivo `sql/setup.sql` que veio junto com este projeto (dentro da pasta `sql`), copie **todo o conteúdo** dele.
4. Cole no editor SQL do Supabase.
5. Clique no botão **"Run"** (ou "RUN" no canto inferior direito).
6. Deve aparecer "Success. No rows returned" — isso significa que deu certo.

Isso cria:
- A tabela de categorias
- A tabela de arquivos
- As regras de segurança (só você consegue ver seus próprios arquivos)
- O espaço de armazenamento privado ("bucket") chamado `media`

---

## PARTE 4 — Desligar cadastro público (MUITO IMPORTANTE)

Isso impede que qualquer pessoa crie uma conta sozinha no seu site.

1. No menu lateral, clique em **"Authentication"**.
2. Clique em **"Providers"** (ou "Sign In / Providers").
3. Em **"Email"**, procure a opção **"Allow new users to sign up"** (ou "Enable email signup") e **desative** essa opção.
4. Salve.

A partir de agora, só será possível entrar com contas criadas manualmente por você (próximo passo).

---

## PARTE 5 — Criar o login seu e da sua namorada

1. Ainda em **"Authentication"**, clique em **"Users"**.
2. Clique em **"Add user"** → **"Create new user"**.
3. Preencha:
   - **Email**: pode ser um e-mail qualquer, real ou não muito óbvio (ex: `acesso.painel88@algumdominio.com`) — não precisa ser um e-mail que existe de verdade, mas recomendo usar um de verdade caso precise recuperar a senha no futuro.
   - **Password**: crie uma senha forte, que só vocês dois vão saber.
   - Marque **"Auto Confirm User"** se aparecer essa opção (assim não precisa confirmar por e-mail).
4. Clique em **"Create user"**.
5. Se vocês quiserem logins separados (um pra você, outro pra ela), repita o processo criando um segundo usuário. Se preferirem só **um login compartilhado**, crie apenas um usuário e usem os dois o mesmo e-mail/senha.

**Guarde esse e-mail e senha em um lugar seguro** (ex: um gerenciador de senhas). É isso que vocês vão digitar para entrar no site.

---

## PARTE 6 — Configurar o projeto com suas chaves

1. Abra a pasta do projeto que você recebeu, entre em `js`, e abra o arquivo `supabaseClient.js` em qualquer editor de texto (pode ser o Bloco de Notas).
2. Troque:
   ```js
   const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SEU_PROJETO";
   const SUPABASE_ANON_KEY = "COLE_AQUI_A_CHAVE_ANON_PUBLIC";
   ```
   pelos valores que você copiou na **Parte 2**. Fica assim, por exemplo:
   ```js
   const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......";
   ```
3. Salve o arquivo.

> A "anon key" pode ficar visível no código — ela é pública por natureza e
> não dá acesso a nada sozinha. Quem protege seus dados de verdade são as
> regras que criamos na Parte 3 (RLS) e o login da Parte 5.

---

## PARTE 7 — Colocar o site no ar

Você tem duas opções. Recomendo a opção A por ser mais simples e privada.

### Opção A — Netlify (grátis, rápido, 5 minutos)

1. Acesse **https://app.netlify.com** e crie uma conta grátis.
2. Depois de logado, procure a área de **"Deploy manually"** / **"Sites"** e a caixa que diz algo como **"Drag and drop your site folder here"**.
3. Arraste a pasta inteira do projeto (`galeria-privada`) para essa caixa.
4. Aguarde alguns segundos — o Netlify vai gerar um link tipo `https://algumnome123.netlify.app`.
5. **Recomendado**: vá em "Site settings" → "Change site name" e troque para um nome bem genérico e difícil de adivinhar (ex: `painel-x92k4`), assim ninguém acha por acaso.

Pronto! Esse link é o endereço do seu site. Só abre quem tiver o login.

### Opção B — Usar localmente, sem publicar na internet

Se preferir que o site nunca fique acessível pela internet:

1. Simplesmente abra o arquivo `index.html` direto no navegador (duplo clique) — funciona no seu computador.
2. Isso significa que só vai funcionar na máquina onde os arquivos estão salvos (as fotos, porém, continuam salvas no Supabase, na nuvem, com segurança).

---

## PARTE 8 — Usando o site

1. Acesse o link do site (ou abra o `index.html`).
2. Digite o e-mail e senha criados na Parte 5.
3. Dentro do painel:
   - **Criar categoria**: digite um nome e clique em "Criar categoria" (ex: "Praia", "Viagem", etc — o nome fica visível só pra vocês).
   - **Enviar arquivo**: escolha a categoria, selecione a(s) foto(s) ou vídeo(s) no botão de arquivo, e clique em "Enviar".
   - **Ver por categoria**: use as abas no topo da galeria para filtrar ("Todas" mostra tudo).
   - **Excluir**: passe o mouse sobre um arquivo e clique no "×" no canto.

---

## Segurança — cuidados importantes

- **Nunca compartilhe** o link do site publicamente (redes sociais, grupos, etc). Ele foi feito para não ter nenhuma identificação visual do conteúdo, mas mesmo assim é melhor mantê-lo só entre vocês dois.
- A senha de login é a única barreira de entrada — escolha uma senha forte (misture letras, números e símbolos) e não reutilize senhas de outros sites.
- Os arquivos ficam em um espaço **privado** no Supabase (não público). Ninguém consegue acessar as fotos sem estar logado com a conta autorizada.
- Se um dia quiserem trocar a senha: Supabase → Authentication → Users → clique no usuário → "Reset password" ou "Send magic link".
- Evite acessar o site em computadores/celulares compartilhados. Sempre clique em "Sair" ao terminar.

---

## PARTE 9 — Publicando no GitHub com segurança

Se você quiser guardar o projeto no GitHub (versionamento, backup, etc), siga estas dicas:

1. **De preferência, crie o repositório como "Private"** (só você e convidados veem o código). No GitHub, ao criar o repositório, marque a opção **Private** em vez de **Public**.

2. **A chave real do Supabase nunca vai pro GitHub.** O arquivo `js/supabaseClient.js` (com sua URL e chave de verdade) já está listado no `.gitignore`, então o Git vai ignorá-lo automaticamente — ele fica só na sua máquina e no Netlify.

3. **O que vai pro GitHub no lugar** é o arquivo `js/supabaseClient.example.js`, que é só um modelo, sem nenhuma chave real. Assim, se alguém clonar o repositório, vai precisar copiar esse arquivo, renomear para `supabaseClient.js` e colocar as próprias chaves — igual você fez na Parte 6.

4. **Passo a passo pra subir:**
   ```
   cd galeria-privada
   git init
   git add .
   git commit -m "primeira versão"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
   (troque `SEU-USUARIO/SEU-REPOSITORIO` pelo link do repositório que você criou no GitHub)

5. Depois disso, rode `git status` — o arquivo `js/supabaseClient.js` **não deve aparecer** na lista de arquivos a serem enviados. Se aparecer, pare e me avise antes de continuar.

> Resumindo: mesmo que o repositório seja privado, manter a chave real fora do Git é uma boa prática — assim, se um dia você tornar o repo público ou convidar alguém, a chave continua protegida.

---

## Problemas comuns

**"Usuário ou senha inválidos" mesmo com os dados certos**
→ Confira se marcou "Auto Confirm User" ao criar o usuário na Parte 5. Se não marcou, vá em Authentication → Users, clique nos "..." do usuário e confirme manualmente.

**A página fica em branco / não faz login**
→ Confira se colou certinho a URL e a chave no arquivo `supabaseClient.js` (Parte 6), sem espaços extras ou aspas erradas.

**Erro ao enviar arquivo ("upload failed" / "row-level security")**
→ Confira se rodou o script `setup.sql` inteiro, sem erros, na Parte 3.

**Quero aumentar o tamanho máximo de arquivo (vídeos grandes)**
→ No Supabase: Storage → clique no bucket `media` → configurações → aumente o limite de tamanho por arquivo.

---

Qualquer coisa, revise a etapa correspondente com calma — cada parte foi
pensada para funcionar sozinha, sem precisar entender de programação.
