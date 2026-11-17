# Fotografando com Jackomo

Site estático para Cloudflare Pages, com páginas públicas, galerias por link, painel autenticado e metadados no Supabase.

## O que já está incluído
- Home responsiva com identidade visual preta/dourada.
- Página de galeria por endereço exclusivo (`galeria.html?g=slug`).
- Painel de administração com login Supabase.
- Cadastro, edição, publicação e exclusão de galerias.
- Inclusão de links de fotos e vídeos; link opcional de álbum Google Drive.
- Link de QR Code para cada galeria.
- Políticas RLS no `schema.sql`.

## Limites importantes
Este projeto não oferece armazenamento ilimitado gratuito. Os arquivos de mídia são hospedados por você em um serviço externo (por exemplo, Google Drive com permissões apropriadas) e o site registra os links. O visitante pode abrir o álbum completo do Drive pelo botão da galeria. A experiência de visualização dentro do site depende de links diretos públicos e compatíveis. O projeto ainda não implementa upload próprio de arquivos, processamento ZIP em lote, analytics detalhado ou permissões separadas por tipo de mídia. Esses recursos exigem uma camada de armazenamento/processamento e configuração adicional; não prometa isso como ativo.

## Configuração inicial
1. No Supabase, abra o projeto e vá a **SQL Editor**.
2. Cole e execute todo o conteúdo de `schema.sql`.
3. Em **Authentication > Users**, crie seu usuário administrador. Não habilite cadastro público.
4. Em **Project Settings > API**, copie a Project URL e a chave pública `anon`/`publishable`.
5. Abra `config.js` e substitua:
   - `COLE_AQUI_A_URL_DO_PROJETO`
   - `COLE_AQUI_A_CHAVE_PUBLISHABLE_OU_ANON`
   - `5543999999999` pelo número do WhatsApp com código do país e DDD, só números.
   A chave pública é destinada ao navegador; nunca coloque a senha do banco ou `service_role` no site.
6. Publique os arquivos deste projeto no repositório GitHub conectado ao Cloudflare Pages. Como o projeto é estático, use build command vazio e diretório de saída `.`.
7. Acesse `https://SEU-SITE/admin.html`, entre com o usuário criado e cadastre a primeira galeria.

## Como organizar uma galeria
- Crie uma pasta do evento no Google Drive.
- Configure o compartilhamento da pasta conforme a privacidade desejada. Um link compartilhável pode permitir que qualquer pessoa com o link veja o conteúdo; confirme essa opção antes de enviar ao cliente.
- No painel, crie a galeria com um slug simples, sem espaços (ex.: `casamento-ana-pedro`).
- Informe a URL da pasta Drive se quiser oferecer o botão para o álbum completo.
- Para mostrar imagens dentro do site, adicione URLs diretas de imagem no formulário de mídia. Um link comum de pasta do Drive não é um link direto de imagem.

## Segurança
- Não compartilhe a chave `service_role`, senha do banco ou credenciais administrativas.
- Use senha forte e mantenha o cadastro público desativado.
- As políticas do SQL permitem gerenciamento a qualquer usuário autenticado; por isso, mantenha apenas o administrador cadastrado. Para uma equipe com vários usuários, as políticas devem ser refinadas por função.
- Galerias com links não são criptograficamente privadas: quem receber ou encaminhar o link poderá acessá-las enquanto estiverem publicadas.
