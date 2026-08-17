# GRSControl - ERP Empresarial

## Sobre o Projeto

GRSControl é um ERP empresarial desenvolvido com React (Vite), PHP e MySQL. O sistema oferece gestão completa para operações empresariais, priorizando segurança, performance e escalabilidade.

## Demonstração

- Visual Geral
https://youtu.be/E_t17DXiszE

- Padrão CRUD/Form


## Metas do GRSControl

- CRUD Padronizado, sempre enviando a API (API sempre verificando o que chega)
- Foco em Desempenho e Intuitividade
- Otimização de Querys
- Registro de Logs, Registro de atividades a cada Select-Insert-Update (Grava Usuário, Data, text de apoio)
- Sem DELETE, apenas mudança de Status

## Segurança

- Token-based Authentication com JWT
- Rate Limiting para prevenção de ataques
- Arquivo security.php para validação no backend
- Proteção contra SQL Injection com PDO
- Sanitização de dados
- CORS configurado

## Tecnologias

Frontend: React 18, Vite, Axios, React Router DOM, Styled Components

Backend: PHP 7.2, MySQL 7.0, JWT, PDO, Composer
