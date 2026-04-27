#!/bin/bash

echo "🚀 Gerenciador PM2 para Vollmed"

case "$1" in
    "start")
        echo "🔄 Iniciando serviços..."
        pm2 start ecosystem.config.js
        pm2 save
        echo "✅ Serviços iniciados e salvos"
        ;;
    "stop")
        echo "⏹️ Parando serviços..."
        pm2 stop all
        echo "✅ Serviços parados"
        ;;
    "restart")
        echo "🔄 Reiniciando serviços..."
        pm2 restart all
        echo "✅ Serviços reiniciados"
        ;;
    "status")
        echo "📊 Status dos serviços:"
        pm2 status
        ;;
    "logs")
        echo "📝 Logs dos serviços:"
        pm2 logs
        ;;
    "setup")
        echo "⚙️ Configurando startup automático..."
        echo "Execute manualmente:"
        echo "sudo env PATH=\$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u jessica --hp /home/jessica"
        echo "pm2 save"
        ;;
    *)
        echo "Uso: $0 {start|stop|restart|status|logs|setup}"
        echo ""
        echo "Comandos:"
        echo "  start   - Inicia backend e frontend"
        echo "  stop    - Para todos os serviços"
        echo "  restart - Reinicia todos os serviços"
        echo "  status  - Mostra status atual"
        echo "  logs    - Mostra logs em tempo real"
        echo "  setup   - Mostra comandos para startup automático"
        ;;
esac
