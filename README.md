# 🐾 A Casa do Bicho — Landing Page

Site mobile-first para o pet shop e clínica veterinária **A Casa do Bicho**
(Recreio dos Bandeirantes e Barra da Tijuca, RJ).

## Estrutura

```
acasadobicho/
├── index.html        Estrutura (HTML semântico)
├── css/style.css     Estilos (mobile-first, variáveis de marca no topo)
├── js/main.js        Comportamento (CONFIG das unidades + formulário → WhatsApp)
├── assets/logo.svg   Logo (casinha da marca)
└── README.md
```

## Como personalizar

- **Cores/marca:** edite as variáveis em `:root` no `css/style.css`.
- **Unidades e telefones:** edite o objeto `CONFIG` no topo de `js/main.js`.
- **Textos:** direto no `index.html` (seções comentadas).

## Como publicar (GitHub + Vercel)

1. Crie um repositório no GitHub e suba esta pasta.
2. Na Vercel: **Add New → Project**, importe o repositório e clique em **Deploy**.
   Site estático — nenhuma configuração extra é necessária.

## Verificação de números

Os WhatsApps por unidade vieram da bio do Instagram (@acasadobicho).
Confirme com o cliente antes de publicar:
- Olegário: (21) 98578-3707 · Fixo (21) 2492-5153
- Américas: (21) 98578-3708 · Fixo (21) 2498-3080
- Glaucio Gil: (21) 98661-5555
- Recreio Shopping: (21) 98555-4901

⚠️ Os endereços completos (rua/número) não estavam na ficha — os cards mostram
o bairro. Adicione os endereços no `CONFIG` quando o cliente passar.
