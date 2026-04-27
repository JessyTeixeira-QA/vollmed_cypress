# 🚀 Vollmed Cypress Testing Project

## 📋 Configuração do PM2

### Scripts Disponíveis

```bash
# Iniciar serviços PM2
npm run start

# Ver status
npm run pm2:status

# Ver logs
npm run pm2:logs

# Parar serviços
npm run pm2:stop

# Reiniciar serviços
npm run pm2:restart
```

### Deploy no Render

#### 🎯 Problemas Corrigidos:

1. **Comando `start` não encontrado**: ✅ Adicionado script `start` no package.json
2. **Compatibilidade Yarn/NPM**: ✅ Adicionado `.yarnrc` para evitar warnings
3. **Configuração múltiplos serviços**: ✅ Criado `render.yaml` para deploy separado

#### 📁 Estrutura de Deploy:

- **Backend**: API Node.js (porta 8080)
- **Frontend**: React App (porta 3000) 
- **Cypress**: Worker PM2 para testes

#### 🚀 Deploy Steps:

1. **Backend API**:
   ```bash
   # No Render: Web Service
   cd server
   npm install
   npm start
   ```

2. **Frontend Web**:
   ```bash
   # No Render: Static Site
   cd web
   npm install
   npm run build
   ```

3. **Cypress Worker**:
   ```bash
   # No Render: Worker Service
   npm install
   pm2 start ecosystem.config.js --no-daemon
   ```

### 🔧 Variáveis de Ambiente

```bash
NODE_ENV=production
PORT=8080
```

### 📊 Monitoramento

- **Logs**: `pm2 logs`
- **Status**: `pm2 status`
- **Restart automático**: Configurado no ecosystem.config.js

### 🛠️ Troubleshooting

1. **Serviços não iniciam**: Verifique logs com `pm2 logs`
2. **Porta em uso**: `lsof -ti:8080`
3. **Build falha**: Verifique dependências no package.json

### 📝 Arquivos de Configuração

- `ecosystem.config.js` - Configuração PM2
- `render.yaml` - Deploy no Render
- `.yarnrc` - Configuração Yarn
- `pm2-manager.sh` - Script de gerenciamento

---

**Pronto para deploy! 🎉**
