const $ = s => document.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;

const S = [
    {
        n: 'Restaurantes',
        d: 'Apresente seu cardápio, ambiente, localização e formas de contato.',
        a: '#e8590c',
        b: '#1a0f0a',
        t: 'Sabor da casa, a um toque de distância',
        c: 'Ver cardápio'
    },
    {
        n: 'Barbearias',
        d: 'Mostre seus serviços, preços, localização e facilite o contato.',
        a: '#c9a24a',
        b: '#0e0e0e',
        t: 'Corte, barba e horário marcado',
        c: 'Agendar'
    },
    {
        n: 'Oficinas mecânicas',
        d: 'Apresente seus serviços, especialidades, localização e canais de atendimento.',
        a: '#f5c400',
        b: '#13151a',
        t: 'Seu carro em boas mãos',
        c: 'Pedir orçamento'
    },
    {
        n: 'Clínicas odontológicas',
        d: 'Transmita profissionalismo e confiança desde o primeiro contato.',
        a: '#14a9a0',
        b: '#eef7f7',
        fg: '#0b2a30',
        t: 'Cuidado com o seu sorriso',
        c: 'Marcar consulta'
    },
    {
        n: 'Clínicas veterinárias',
        d: 'Mostre seus serviços, estrutura e facilite o contato com os tutores.',
        a: '#5aa63a',
        b: '#f3f7ee',
        fg: '#1b2a14',
        t: 'Quem cuida do seu bicho de verdade',
        c: 'Falar com a clínica'
    },
    {
        n: 'Óticas',
        d: 'Apresente produtos, serviços, localização e diferenciais.',
        a: '#6d5dfc',
        b: '#0f0e1a',
        t: 'Armações, lentes e bom atendimento',
        c: 'Ver coleção'
    },
    {
        n: 'Lojas',
        d: 'Catálogo digital com pedidos direto no WhatsApp.',
        a: '#e5386d',
        b: '#fff',
        fg: '#1a1a1a',
        t: 'Seu catálogo sempre aberto',
        c: 'Ver produtos'
    }
];

const mk = (s, id) => `
    <div class="bar">
        <i></i>
        <i></i>
        <i></i>
        <span>seunegocio.com.br</span>
    </div>

    <div class="pg">
        <div class="nv">
            <b>${s.n.split(' ')[0]}</b>
            <u></u>
            <u></u>
            <u></u>
        </div>

        <div class="hr">
            <h4>${s.t}</h4>
            <p></p>
            <span class="bt">${s.c}</span>
        </div>

        <div class="gr">
            <s></s>
            <s></s>
            <s></s>
        </div>
    </div>
`;

const th = (el, s) => {
    el.style.setProperty('--bgc', s.b);
    el.style.setProperty('--ac', s.a);
    el.style.setProperty('--fg', s.fg || '#fff');
    el.innerHTML = mk(s);
};

th($('#hm'), S[1]);

$('#hp').className = 'bw';
th($('#hp'), S[0]);

if (!RM) {
    let i = 0;

    setInterval(() => {
        i = (i + 1) % S.length;
        th($('#hm'), S[i]);
    }, 3800);
}


/* Header + menu */

const hd = $('#hd');
const nv = $('#nv');
const bg = $('#bg');

const sc = () => {
    hd.classList.toggle('s', scrollY > 30);
};

addEventListener('scroll', sc, {
    passive: true
});

sc();

const tg = o => {
    nv.classList.toggle('open', o);

    bg.setAttribute(
        'aria-expanded',
        o
    );

    bg.setAttribute(
        'aria-label',
        o ? 'Fechar menu' : 'Abrir menu'
    );

    document.body.style.overflow = o ? 'hidden' : '';
};

bg.onclick = () => {
    tg(!nv.classList.contains('open'));
};

nv.querySelectorAll('a').forEach((a, i) => {
    a.parentNode.style.transitionDelay = i * 0.05 + 's';

    a.onclick = () => {
        tg(false);
    };
});

addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        tg(false);
    }
});

const ls = [...nv.querySelectorAll('a')];

const ss = ls.map(a => $(a.getAttribute('href')));


/* Solutions */

const SO = [
    [
        'Criação de sites',
        'Sites feitos sob medida para a sua marca, do layout ao código.'
    ],
    [
        'Landing pages',
        'Uma página focada em uma ação: pedir orçamento, agendar, chamar no WhatsApp.'
    ],
    [
        'Sites institucionais',
        'Apresente a empresa, os serviços e a equipe com credibilidade.'
    ],
    [
        'Catálogos digitais',
        'Seus produtos organizados e fáceis de consultar pelo celular.'
    ],
    [
        'Cardápios digitais',
        'Cardápio atualizado, bonito e acessível por QR Code ou link.'
    ],
    [
        'Presença digital',
        'Informações do negócio claras para quem procura você na internet.'
    ],
    [
        'Integração com WhatsApp',
        'Botões e links que levam o cliente direto para a conversa.'
    ],
    [
        'Redes sociais',
        'Seu Instagram e outros perfis conectados ao site.'
    ],
    [
        'Soluções personalizadas',
        'Tem uma necessidade específica? Desenhamos a solução com você.'
    ]
];

const acc = $('#acc');

acc.innerHTML = SO
    .map((s, i) => `
        <button aria-expanded="${i == 0}">
            <h3>${s[0]}</h3>
            <p>${s[1]}</p>
        </button>
    `)
    .join('');

const ab = [...acc.children];

const op = b => {
    ab.forEach(x => {
        x.setAttribute(
            'aria-expanded',
            x === b
        );
    });
};

ab.forEach(b => {
    b.onclick = () => op(b);

    if (matchMedia('(hover:hover)').matches) {
        b.addEventListener('mouseenter', () => op(b));
    }
});


/* Segments */

const sl = $('#sl');

sl.innerHTML = S
    .map((s, i) => `
        <button
            role="tab"
            aria-selected="${i == 0}">
            
            <span>${s.n}</span>
            <small>${s.d}</small>

        </button>
    `)
    .join('');

const sb = [...sl.children];

const pick = i => {
    sb.forEach((b, j) => {
        b.setAttribute(
            'aria-selected',
            i == j
        );
    });

    th($('#sv'), S[i]);
};

sb.forEach((b, i) => {
    b.onclick = () => pick(i);
    b.onmouseenter = () => pick(i);
    b.onfocus = () => pick(i);
});

pick(0);


/* Identity */

const ch = $('#ch');

ch.innerHTML = S
    .map((s, i) => `
        <button aria-pressed="${i == 0}">
            ${s.n}
        </button>
    `)
    .join('');

const cb = [...ch.children];

const pi = i => {
    cb.forEach((b, j) => {
        b.setAttribute(
            'aria-pressed',
            i == j
        );
    });

    th($('#iv'), S[i]);
};

cb.forEach((b, i) => {
    b.onclick = () => pi(i);
});

pi(0);


/* Projects */

const IMG = {
    cardapio: {
        d: 'assets/cardapio-desktop.webp',
        m: 'assets/cardapio-celular.webp'
    },

    barbearia: {
        d: 'assets/barbearia-desktop.webp',
        m: 'assets/barbearia-celular.webp'
    },

    oficina: {
        d: 'assets/oficina-desktop.webp',
        m: 'assets/oficina-celular.webp'
    },

    otica: {
        d: 'assets/otica-desktop.webp',
        m: 'assets/otica-celular.webp'
    },

    estetica: {
        d: 'assets/estetica-desktop.webp',
        m: 'assets/estetica-celular.webp'
    },

    loja: {
        d: 'assets/loja-desktop.webp',
        m: 'assets/loja-celular.webp'
    }
};

const PJ = [
    [
        'cardapio',
        'Casa Aurora',
        'Restaurante'
    ],
    [
        'barbearia',
        'Navalha de Ouro',
        'Barbearia'
    ],
    [
        'oficina',
        'Rota 66',
        'Oficina mecânica'
    ],
    [
        'otica',
        'Ótica Vértice',
        'Ótica'
    ],
    [
        'estetica',
        'Lumière Estética',
        'Clínica de estética'
    ],
    [
        'loja',
        'TechStore',
        'Loja virtual'
    ]
];

$('#pj').innerHTML = PJ
    .map(p => `
        <figure>

            <div
                class="fw"
                tabindex="0"
                role="button"
                aria-label="Ampliar ${p[1]}"
                data-k="${p[0]}">

                <div class="bw">

                    <div class="bar">
                        <i></i>
                        <i></i>
                        <i></i>

                        <span>
                            ${p[1].toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br
                        </span>
                    </div>

                    <img
                        loading="lazy"
                        src="${IMG[p[0]].d}"
                        alt="Projeto demonstrativo ${p[1]}: site para ${p[2].toLowerCase()}, versão desktop">

                </div>

                <div class="pm">
                    <img
                        loading="lazy"
                        src="${IMG[p[0]].m}"
                        alt="${p[1]} no celular">
                </div>

            </div>

            <figcaption>
                <b>${p[1]} · ${p[2]}</b>
                <span>Projeto demonstrativo</span>
            </figcaption>

        </figure>
    `)
    .join('');


/* Project dialog */

const dg = document.createElement('dialog');

dg.innerHTML = `
    <img alt="">
    <button aria-label="Fechar">×</button>
`;

document.body.append(dg);

document.querySelectorAll('.fw').forEach(f => {

    const o = () => {
        dg.querySelector('img').src = IMG[f.dataset.k].d;
        dg.querySelector('img').alt = f.getAttribute('aria-label');

        dg.showModal();
    };

    f.onclick = o;

    f.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            o();
        }
    };
});

dg.onclick = e => {
    if (e.target !== dg.querySelector('img')) {
        dg.close();
    }
};


/* Reveal */

const io = new IntersectionObserver(
    es => {
        es.forEach(e => {

            if (e.isIntersecting) {
                e.target.classList.add('on');
                io.unobserve(e.target);
            }

        });
    },
    {
        threshold: 0.2
    }
);

document
    .querySelectorAll(
        '.sol .t,.why .t,.wl div,.pp,.pj figure,.idn .top,.seg h2,.cta .wrap>*'
    )
    .forEach((e, i) => {
        e.classList.add('rv');
        io.observe(e);
    });


/* Impact words */

const ws = [];

document.querySelectorAll('.sc').forEach(p => {

    p.innerHTML = p.textContent
        .split(' ')
        .map(w => `
            <span class="w">${w}</span>
        `)
        .join(' ');

    ws.push(...p.querySelectorAll('.w'));
});


/* Timeline + scroll */

const st = [...document.querySelectorAll('.st')];
const tl = $('#tl');
const tf = $('#tf');

let tk = 0;

const up = () => {

    tk = 0;

    const h = innerHeight;

    const f = ws[0].getBoundingClientRect().top;
    const L = ws.at(-1).getBoundingClientRect().bottom;

    ws.forEach((w, i) => {
        const r = w.getBoundingClientRect();

        w.classList.toggle(
            'on',
            r.top < h * 0.62
        );
    });

    const r = tl.getBoundingClientRect();

    const p = Math.max(
        0,
        Math.min(
            r.height,
            h * 0.6 - r.top
        )
    );

    tf.style.height = p + 'px';

    st.forEach(s => {
        s.classList.toggle(
            'on',
            s.getBoundingClientRect().top < h * 0.62
        );
    });

    let cur = -1;

    ss.forEach((s, i) => {
        if (s.getBoundingClientRect().top < h * 0.4) {
            cur = i;
        }
    });

    ls.forEach((a, i) => {
        a.classList.toggle(
            'on',
            i === cur
        );
    });
};

addEventListener(
    'scroll',
    () => {
        if (!tk) {
            tk = requestAnimationFrame(up);
        }
    },
    {
        passive: true
    }
);

addEventListener('resize', up);

up();


/* Hero parallax */

if (
    !RM &&
    matchMedia('(hover:hover)').matches
) {
    const hs = $('.stage');

    $('.hero').addEventListener('mousemove', e => {

        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;

        hs.querySelectorAll('[data-d]').forEach(el => {

            const d = +el.dataset.d;

            el.style.transform = `
                translate(${x * d}px, ${y * d}px)
            `;
        });

        hs.firstChild.style.transform = `
            rotateY(${-14 + x * 6}deg)
            rotateX(${6 - y * 5}deg)
        `;
    });
}


$('#yr').textContent = new Date().getFullYear();