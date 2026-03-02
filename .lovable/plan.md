

# Corrigir todas as politicas RLS de RESTRICTIVE para PERMISSIVE

## Problema

Todas as tabelas do projeto possuem politicas RLS marcadas como **RESTRICTIVE** (`Permissive: No`). Em PostgreSQL, quando nao ha nenhuma politica PERMISSIVE, o acesso e bloqueado por padrao, mesmo que existam politicas RESTRICTIVE. Isso explica por que os dados nao aparecem para o usuario autenticado.

As migracoes anteriores tentaram corrigir `teams`, `team_members` e `campaigns`, mas as politicas continuam como RESTRICTIVE.

## Tabelas afetadas

Todas as tabelas com RLS ativo:
1. **teams** - 4 politicas (SELECT, INSERT, UPDATE, DELETE)
2. **team_members** - 4 politicas
3. **campaigns** - 4 politicas
4. **voters** - 4 politicas
5. **colaboradores** - 4 politicas
6. **activities** - 3 politicas (SELECT, INSERT, UPDATE)
7. **demands** - 4 politicas
8. **demand_history** - 2 politicas (SELECT, INSERT)
9. **demand_comments** - 2 politicas (SELECT, INSERT)
10. **demand_watchers** - 1 politica (ALL)
11. **demand_reminders** - 1 politica (ALL)
12. **communications** - 3 politicas (SELECT, INSERT, UPDATE)
13. **segments** - 4 politicas
14. **chat_history** - 2 politicas (SELECT, INSERT)
15. **lgpd_consents** - 2 politicas (SELECT, INSERT)
16. **saved_filters** - 1 politica (ALL)
17. **audit_logs** - 1 politica (SELECT)
18. **tse_results** - 3 politicas (SELECT, INSERT, UPDATE)
19. **profiles** - 2 politicas (SELECT, UPDATE)
20. **team_actions** - 4 politicas

## Solucao

Uma unica migracao SQL que:
1. Dropa cada politica existente por nome
2. Recria cada politica com `AS PERMISSIVE` explicito, mantendo exatamente a mesma logica de acesso (USING/WITH CHECK)

A logica de cada politica permanece identica -- apenas o tipo muda de RESTRICTIVE para PERMISSIVE.

## Detalhes tecnicos

A migracao tera aproximadamente 200 linhas de SQL cobrindo todas as 20 tabelas. Cada bloco segue o padrao:

```text
DROP POLICY IF EXISTS "nome" ON public.tabela;
CREATE POLICY "nome"
ON public.tabela AS PERMISSIVE FOR <comando> TO authenticated
USING (...) / WITH CHECK (...);
```

Nenhuma alteracao de codigo e necessaria -- o problema e exclusivamente nas politicas do banco de dados.

