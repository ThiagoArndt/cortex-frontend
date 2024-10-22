# Cortex - Gerenciamento de Tarefas

### Grupo de Desenvolvimento
- Gustavo Jose Rosa
- Thomas Taiga Martinez Nakagawa
- Thiago Cirne Arndt
- Khatlyllen Vyctória Constantino

---

## Descrição

O **Cortex** é um sistema de gerenciamento de tarefas projetado para ajudar equipes a organizar, priorizar e acompanhar tarefas dentro de projetos. A aplicação suporta hierarquias complexas de subtarefas, atualizações em tempo real e personalização da visualização de tarefas em formato Kanban.

---

## Funcionalidades Principais

### 1. **Gerenciamento de Tarefas**
   - Criar, editar, excluir e visualizar tarefas.
   
### 2. **Reorganização de Tarefas**
   - Reorganizar tarefas, alterando sua ordem e prioridades.

### 3. **Relacionamento Pai/Filho entre Tarefas**
   - Criar hierarquias de tarefas, permitindo que uma tarefa tenha subtarefas, e essas subtarefas também possam ter suas próprias subtarefas, formando uma hierarquia ilimitada.

### 4. **Clonagem de Tarefas**
   - Clonar tarefas, incluindo todas as propriedades e subtarefas.

### 5. **Organização em Projetos**
   - Organizar tarefas dentro de projetos, cada projeto contendo suas próprias tarefas e subtarefas.

### 6. **Reprogramação de Tarefas**
   - Alterar o prazo de conclusão de tarefas e subtarefas.

### 7. **Atualizações em Tempo Real (WebSockets)**
   - Utilizar WebSockets para garantir atualizações em tempo real, permitindo que os usuários vejam mudanças instantaneamente.

### 8. **Notificações**
   - Notificações automáticas sobre mudanças nas tarefas atribuídas ao usuário ou em um projeto.
   - Notificação por e-mail caso uma tarefa esteja atrasada.

### 9. **Atribuição de Tarefas**
   - Atribuir tarefas a outros membros do projeto.

### 10. **Filtros e Categorias**
   - Filtrar tarefas por status (pendente, em progresso, concluída ou atrasada), por projeto ou por data.

### 11. **Controle de Status das Tarefas**
   - Marcar tarefas como "pendente", "em progresso", "concluída" ou "atrasada".

### 12. **Histórico de Alterações**
   - Registrar todas as mudanças feitas em uma tarefa, como alterações de status e prazo.

### 13. **Seleção de Grupo no Login**
   - Se o usuário pertencer a mais de um grupo, ele deve escolher o grupo desejado ao fazer login. Caso pertença a apenas um grupo, este será selecionado automaticamente.

### 14. **Navegação por Grupos e Projetos**
   - Navegar entre grupos e visualizar seus respectivos projetos e tarefas.

### 15. **Visualização Kanban com Raias Customizáveis**
   - Visualizar tarefas em um quadro Kanban com raias iniciais: **Backlog**, **In Progress** e **Done**.
   - Personalizar o Kanban: adicionar novas raias, renomear ou excluir raias (exceto as obrigatórias).

### 16. **Movimentação de Tarefas no Kanban**
   - Arrastar e soltar tarefas entre as raias para atualizar seu status.

### 17. **Persistência de Configurações Personalizadas**
   - As configurações de personalização do Kanban devem ser salvas para cada usuário e projeto.

### 18. **Convite para a Equipe via E-mail (Admin)**
   - O administrador pode convidar novos membros para a equipe via e-mail.
   - Se o convidado não tiver uma conta, ele receberá um e-mail com um link para completar o cadastro.

---

## Requisitos Não Funcionais

### 1. **Desempenho**
   - Atualizações em tempo real devem ser feitas com baixa latência (< 1 segundo).

### 2. **Segurança**
   - Apenas usuários autenticados podem acessar e modificar tarefas.
   - Convites por e-mail devem ser seguros, garantindo que apenas administradores possam convidar membros e que os links de convite tenham validade limitada.

### 3. **Escalabilidade**
   - O sistema deve ser escalável para suportar múltiplos usuários simultâneos com atualizações em tempo real.

### 4. **Interface Responsiva**
   - O sistema deve ser acessível em dispositivos móveis e desktops.

### 5. **Compatibilidade com WebSockets**
   - Deve haver suporte completo a WebSockets nos navegadores modernos.

### 6. **Persistência de Grupo Selecionado**
   - O sistema deve lembrar qual grupo foi selecionado na última sessão para facilitar o login.

### 7. **Desempenho do Kanban**
   - As ações de movimentação e personalização no Kanban devem ser rápidas e com feedback visual imediato.

---

## User Stories

1. **Criação de Tarefas:**  
   - *Como usuário*, quero criar uma nova tarefa com nome, descrição e prazo, para organizar meu trabalho.
   
2. **Reorganização de Tarefas:**  
   - *Como usuário*, quero alterar a ordem de uma tarefa e reprogramar suas datas conforme mudanças de prioridades.

3. **Hierarquia Pai/Filho:**  
   - *Como usuário*, quero criar subtarefas dentro de uma tarefa, para detalhar etapas de um trabalho maior.  
   - *Como usuário*, quero que subtarefas possam ser pais de outras subtarefas, criando hierarquias complexas.

4. **Clonagem de Tarefas:**  
   - *Como usuário*, quero clonar uma tarefa, incluindo suas subtarefas, para replicar um padrão de trabalho em diferentes projetos.

5. **Atribuição de Tarefas:**  
   - *Como usuário*, quero atribuir tarefas a outros membros da equipe, para distribuir responsabilidades.

6. **Atualização em Tempo Real:**  
   - *Como usuário*, quero ver as atualizações das tarefas em tempo real, à medida que outros membros do projeto fazem alterações.

7. **Organização por Projetos:**  
   - *Como usuário*, quero organizar tarefas em diferentes projetos, para gerenciar múltiplos trabalhos simultâneos.

8. **Notificações de Mudanças:**  
   - *Como usuário*, quero receber notificações quando houver mudanças nas tarefas que me foram atribuídas.

9. **Reprogramação de Prazo:**  
   - *Como usuário*, quero poder reprogramar o prazo de uma tarefa para acomodar mudanças no planejamento.

10. **Filtros de Tarefas:**  
    - *Como usuário*, quero filtrar tarefas por status, projeto e datas, para encontrar rapidamente as tarefas que precisam de atenção.

11. **Histórico de Alterações:**  
    - *Como usuário*, quero ver o histórico de alterações das tarefas para saber quem mudou o quê.

12. **Seleção de Grupo no Login:**  
    - *Como usuário*, quero escolher entre os grupos ao realizar login e, se houver apenas um grupo, que ele seja selecionado automaticamente.

13. **Visualização Kanban:**  
    - *Como usuário*, quero ver minhas tarefas organizadas em um Kanban com três raias: **Backlog**, **In Progress** e **Done**.

14. **Customização de Raias do Kanban:**  
    - *Como usuário*, quero personalizar o Kanban, adicionando, renomeando e excluindo raias.

15. **Movimentação de Tarefas no Kanban:**  
    - *Como usuário*, quero arrastar e soltar tarefas entre as raias para atualizar seu status de forma simples.

16. **Persistência de Customizações:**  
    - *Como usuário*, quero que minhas customizações no Kanban sejam salvas para uso futuro.

17. **Convite para Equipe (Admin):**  
    - *Como administrador*, quero convidar pessoas para meu grupo por e-mail, para colaborar em nossos projetos.  
    - *Como administrador*, quero que se o convidado não tiver uma conta, ele receba um link para finalizar o cadastro.

---

## Diagrama UML
![diagram (2)](https://github.com/user-attachments/assets/11950c13-e563-47f6-9d40-15a39f175220)

---

## Casos de Uso
![diagram](https://github.com/user-attachments/assets/0a5c96a7-9a11-4e9a-8098-e8e285750744)

---

## Stack
- **Front: Next**
- **Back: .Net**
- **Banco: SQL**
