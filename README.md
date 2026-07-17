# 🐾 A Casa do Bicho — Landing Page

Site mobile-first para o pet shop e clínica veterinária **A Casa do Bicho**
(Recreio dos Bandeirantes e Barra da Tijuca, RJ).

## Estrutura

```
acasadobicho/
├── index.html                 Estrutura (HTML semântico)
├── css/style.css              Estilos (mobile-first, variáveis de marca no topo)
├── js/
│   ├── main.js                CONFIG das unidades + menu + formulário → WhatsApp
│   ├── walker.js              Cachorro e gato que caminham com o scroll
│   └── vendor/anime.umd.min.js  Biblioteca anime.js v4 (local, sem CDN)
├── assets/
│   ├── logo.svg               Logo (casinha da marca)
│   └── post-*.jpeg            Fotos dos posts do Instagram (otimizadas)
└── README.md
```

## Seções da página

Header · Hero (letras flutuantes) · Chips de categorias · Vantagens ·
Serviços · Por que escolher · Depoimentos · Instagram · Unidades ·
Agendamento (WhatsApp) · Footer · Botão flutuante do WhatsApp

## Animações

- **Letras flutuantes** no título do hero (`js/main.js`), com patinhas e ossinhos
  derivando ao fundo.
- **Cachorro e gato caminhando** (`js/walker.js`): atravessam a tela conforme o
  scroll, usando anime.js. As patinhas só se mexem enquanto a página rola.
  Funciona no toque do celular (listeners passivos + requestAnimationFrame).
- Tudo respeita `prefers-reduced-motion` (movimento desligado / pets removidos).

## Como personalizar

- **Cores/marca:** variáveis em `:root` no topo do `css/style.css`.
- **Unidades e telefones:** objeto `CONFIG` no topo de `js/main.js`.
- **Textos:** direto no `index.html` (seções comentadas).
- **Velocidade do passeio dos pets:** constante `DURATION` em `js/walker.js`.

## Como publicar (GitHub + Vercel)

1. Crie um repositório no GitHub e suba esta pasta.
2. Na Vercel: **Add New → Project**, importe o repositório e clique em **Deploy**.
   Site estático — nenhuma configuração extra é necessária.

## ⚠️ Confirmar com o cliente antes de publicar

WhatsApps por unidade (vieram da bio do Instagram @acasadobicho):
- Olegário: (21) 98578-3707 · Fixo (21) 2492-5153
- Américas: (21) 98578-3708 · Fixo (21) 2498-3080
- Glaucio Gil: (21) 98661-5555
- Recreio Shopping: (21) 98555-4901

Os endereços completos (rua/número) não estavam disponíveis — os cards mostram
o bairro. Adicione-os no `CONFIG` do `js/main.js` quando o cliente passar.

As fotos usadas na seção Instagram são posts do próprio cliente — confirme que
ele autoriza o uso no site (normalmente sim, é material dele).
