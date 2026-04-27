# 🚀 PM2 Manager para Vollmed

## Gerenciamento dos Serviços

### Scripts Disponíveis

```bash
# Iniciar todos os serviços (backend + frontend)
npm run server:start

# Parar todos os serviços
npm run server:stop

# Reiniciar todos os serviços
npm run server:restart

# Ver status dos serviços
npm run pm2:status

# Ver logs em tempo real
npm run pm2:logs

# Salvar configuração atual
npm run pm2:salvar
```

### Comandos PM2 Diretos

```bash
# Iniciar serviços
pm2 start ecosystem.config.js

# Parar serviços
pm2 stop all

# Reiniciar serviços
pm2 restart all

# Ver status
pm2 status

# Ver logs
pm2 logs

# Salvar configuração
pm2 save
```

### Startup Automático

Para configurar inicialização automática com o sistema:

```bash
# Execute manualmente (requer sudo):
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u jessica --hp /home/jessica

# Depois salve a configuração atual:
pm2 save
```

### Estrutura dos Serviços

- **backend-api**: Servidor Node.js na porta 8080
- **frontend-web**: Aplicação web (porta configurada no frontend)

### Troubleshooting

1. **Serviços não iniciam**: Verifique se as dependências estão instaladas
2. **Porta em uso**: Use `lsof -ti:8080` para verificar o processo usando a porta
3. **Logs de erro**: Use `pm2 logs` para ver detalhes dos erros

### Manager Script

Use o script `pm2-manager.sh` diretamente:

```bash
./pm2-manager.sh start    # Inicia serviços
./pm2-manager.sh stop     # Para serviços
./pm2-manager.sh restart  # Reinicia serviços
./pm2-manager.sh status   # Mostra status
./pm2-manager.sh logs     # Mostra logs
./pm2-manager.sh setup    # Mostra setup commands
```
