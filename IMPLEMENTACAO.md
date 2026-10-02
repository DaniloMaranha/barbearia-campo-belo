# Barbearia Campo Belo — atualização implementada

Esta versão adiciona ao protótipo local uma gestão dinâmica de barbeiros.

## O que mudou

- O administrador agora possui a aba **Barbeiros** no painel `/admin`.
- É possível cadastrar um novo barbeiro com nome, especialidade, descrição, e-mail de acesso e senha inicial.
- O barbeiro criado recebe um ID próprio e fica disponível imediatamente para o fluxo de agendamento.
- Barbeiros ativos aparecem automaticamente no site público, na seção de profissionais e no agendamento.
- O novo barbeiro também aparece nos agendamentos manuais feitos pelo painel administrativo.
- O administrador pode **inativar/reativar** um barbeiro sem apagar seu histórico.
- Cada barbeiro cadastrado recebe seu próprio login no painel.
- O login do barbeiro usa a lista dinâmica cadastrada no navegador, em vez de ficar fixo no código.
- O barbeiro continua vendo apenas os próprios agendamentos.
- O administrador continua vendo todos os agendamentos.

## Importante sobre o estado atual

Esta versão ainda utiliza `localStorage` para o cadastro dos barbeiros, usuários de demonstração e agendamentos. Portanto, os dados são locais ao navegador/dispositivo.


## Teste rápido

1. Abra `/admin`.
2. Entre com:
   - Admin: `admin@barbeariacampobelo.local` / `admin123`
3. Abra a aba **Barbeiros**.
4. Cadastre um profissional, por exemplo:
   - Nome: Carlos
   - Especialidade: Corte e barba
   - E-mail: `carlos@barbeariacampobelo.local`
   - Senha: `carlos123`
5. Acesse o site público e abra **Profissionais** ou **Agendar**.
6. O Carlos deve aparecer automaticamente.
7. Volte ao `/admin` e faça login como Carlos para testar a visão individual da agenda.

## Produção

Antes de publicar, substituir a autenticação e persistência local por **Supabase Auth + PostgreSQL + RLS**. Nunca usar as credenciais de demonstração em produção.
