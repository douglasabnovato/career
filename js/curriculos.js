/**
 * curriculos.js
 * Modelos de currículos para referência profissional.
 */

export const curriculos = [
  {
    id: "marina-alves-ferreira",

    nome: "Marina Alves Ferreira",

    titulo: "Produto, Tecnologia & Educação",

    localizacao: "Belo Horizonte – MG",

    contato: {
      telefone: "(31) 98845-2176",
      email: "marina.alves.dev@example.com",
      linkedin: "linkedin.com/in/marinaalvesdev",
      github: "github.com/marinaalvesdev",
      portfolio: "marinaalves.dev",
    },

    objetivo:
      "Atuar em Produto e Tecnologia, conectando necessidades dos usuários, evolução de plataformas digitais e indicadores de negócio.",

    resumo:
      "Profissional com experiência na interseção entre tecnologia, produto e educação. Atualmente atua na coordenação de uma operação de formação em tecnologia, participando da definição de trilhas de aprendizagem, acompanhamento de alunos e evolução da plataforma digital. Possui experiência anterior em desenvolvimento frontend, CRM, automação de jornadas e análise de dados. Ao longo da carreira, combinou atuação técnica com organização de processos, acompanhamento de indicadores e desenvolvimento de pessoas.",

    competencias: [
      {
        categoria: "Produto e estratégia",
        itens: [
          "Descoberta de problemas",
          "Jornada do usuário",
          "Priorização de backlog",
          "Definição de MVP",
          "Especificação de requisitos",
          "User Stories",
          "OKRs",
          "Design Thinking",
        ],
      },

      {
        categoria: "Tecnologia",
        itens: [
          "React",
          "TypeScript",
          "Next.js",
          "HTML",
          "CSS",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "APIs REST",
          "Git",
          "GitHub",
          "Vercel",
        ],
      },

      {
        categoria: "Dados e Growth",
        itens: [
          "SQL",
          "CRM",
          "E-mail marketing",
          "WhatsApp",
          "Segmentação",
          "Automação de jornadas",
          "Dashboards",
          "Looker Studio",
        ],
      },

      {
        categoria: "Gestão e colaboração",
        itens: [
          "Coordenação de equipe",
          "Code review",
          "Mentoria",
          "Documentação",
          "Interface com fornecedores",
          "Interface com parceiros",
        ],
      },
    ],

    experiencias: [
      {
        cargo: "Coordenadora de Produto e Tecnologia",
        empresa: "Nexora Educação Digital",
        descricaoEmpresa:
          "Edtech especializada em formação profissional em tecnologia.",
        periodo: "Ago/2024 – atual",
        local: "Belo Horizonte – MG",
        modelo: "Híbrido",

        atividades: [
          "Estruturei trilhas de aprendizagem e organizei o roadmap de evolução da plataforma.",
          "Coordenei a operação de formação de aproximadamente 50 alunos.",
          "Criei processos para acompanhamento de progresso, engajamento e conclusão das trilhas.",
          "Atuei diretamente na evolução do LMS utilizado pelos alunos.",
          "Desenvolvi funcionalidades frontend utilizando React, TypeScript e Next.js.",
          "Participei da definição de requisitos e priorização do backlog.",
          "Realizei code reviews e acompanhei o desenvolvimento de profissionais em início de carreira.",
          "Criei dashboards para acompanhamento de indicadores de aprendizagem.",
          "Estruturei processos para transformar aulas e conteúdos presenciais em materiais digitais reutilizáveis.",
        ],

        tecnologias: [
          "React",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Git",
          "Vercel",
        ],
      },

      {
        cargo: "Sócia e Desenvolvedora Fullstack",
        empresa: "RotaLivre Tecnologia",
        periodo: "Mar/2022 – atual",
        local: "Remoto",
        modelo: "Remoto",

        atividades: [
          "Responsável pela evolução do produto digital e da plataforma web.",
          "Participei da definição do modelo de negócio e da estratégia de lançamento.",
          "Transformei necessidades operacionais em requisitos funcionais.",
          "Desenvolvi protótipos e MVPs para validação de novas ideias.",
          "Estruturei landing pages e fluxos digitais de aquisição.",
        ],

        tecnologias: [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "APIs REST",
          "Vercel",
        ],
      },

      {
        cargo: "Especialista em CRM e Automação",
        empresa: "Grupo Horizonte Varejo",
        descricaoEmpresa:
          "Grupo varejista com operação digital e lojas físicas.",
        periodo: "Jan/2022 – Jul/2024",
        local: "Belo Horizonte – MG",
        modelo: "Híbrido",

        atividades: [
          "Estruturei jornadas automatizadas de relacionamento com clientes.",
          "Criei segmentações para diferentes perfis e momentos da jornada.",
          "Operei campanhas de comunicação multicanal.",
          "Desenvolvi consultas SQL para análise e segmentação de bases.",
          "Criei páginas de campanha e componentes para ações de aquisição.",
          "Integrei ferramentas utilizando APIs REST e webhooks.",
          "Atuei como interface técnica entre marketing, tecnologia e fornecedores.",
          "Automatizei relatórios de acompanhamento de campanhas.",
        ],

        tecnologias: [
          "SQL",
          "CRM",
          "APIs REST",
          "Webhooks",
          "Looker Studio",
          "HTML",
          "CSS",
          "JavaScript",
        ],
      },

      {
        cargo: "Desenvolvedora Frontend",
        empresa: "Estação Digital",
        periodo: "Mai/2020 – Dez/2021",
        local: "Belo Horizonte – MG",
        modelo: "Remoto",

        atividades: [
          "Desenvolvi interfaces web a partir de protótipos de design.",
          "Criei componentes reutilizáveis para aplicações frontend.",
          "Integrei interfaces com APIs REST.",
          "Participei de cerimônias ágeis e planejamento de entregas.",
          "Atuei na correção de problemas de usabilidade e performance.",
        ],

        tecnologias: [
          "React",
          "JavaScript",
          "TypeScript",
          "CSS",
          "Tailwind CSS",
          "APIs REST",
        ],
      },

      {
        cargo: "Analista de Sistemas",
        empresa: "Conecta Serviços Digitais",
        periodo: "Jan/2018 – Abr/2020",
        local: "Belo Horizonte – MG",
        modelo: "Presencial",

        atividades: [
          "Realizei atendimento e investigação de problemas técnicos.",
          "Documentei incidentes e procedimentos operacionais.",
          "Participei da implantação de melhorias em sistemas internos.",
          "Atuei na comunicação entre usuários e equipe de desenvolvimento.",
          "Posteriormente passei a contribuir diretamente com pequenas evoluções de software.",
        ],

        tecnologias: ["JavaScript", "HTML", "CSS", "SQL", "Git"],
      },
    ],

    experienciaAnterior: [
      {
        empresa: "Aliança Atendimento",
        cargo: "Analista de Atendimento e Líder de Equipe",
        periodo: "2015 – 2017",
      },

      {
        empresa: "MídiaTech Comunicação",
        cargo: "Assistente de Conteúdo Digital",
        periodo: "2014 – 2015",
      },

      {
        empresa: "Instituto Metropolitano de Tecnologia",
        cargo: "Bolsista de Desenvolvimento Web",
        periodo: "2012 – 2014",
      },
    ],

    projetos: [
      {
        nome: "Plataforma de aprendizagem",
        descricao:
          "LMS com trilhas de aprendizagem, acompanhamento de progresso e área administrativa.",
        tecnologias: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      },

      {
        nome: "Portal de carreira",
        descricao:
          "Plataforma para reunir oportunidades, empresas, perfis profissionais e referências de carreira.",
        tecnologias: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      },

      {
        nome: "Dashboard de campanhas",
        descricao:
          "Painel para acompanhamento de indicadores de campanhas e jornadas de relacionamento.",
        tecnologias: ["SQL", "Looker Studio", "APIs REST"],
      },
    ],

    formacao: [
      {
        curso: "Tecnologia em Análise e Desenvolvimento de Sistemas",
        instituicao: "Centro Universitário Vale Digital",
        periodo: "Fev/2019 – Dez/2021",
        status: "Concluído",
      },

      {
        curso: "Técnico em Informática",
        instituicao: "Instituto Técnico Horizonte",
        periodo: "2015 – 2016",
        status: "Concluído",
      },

      {
        curso: "Gestão de Produtos Digitais",
        instituicao: "Escola Brasileira de Produtos",
        periodo: "2023",
        status: "Formação complementar",
      },
    ],

    certificados: [
      "Product Discovery",
      "Design Thinking",
      "OKRs",
      "Gestão de Produtos Digitais",
      "Fundamentos de UX",
      "Growth Hacking",
      "SQL para análise de dados",
      "React e TypeScript",
      "Next.js",
      "Node.js",
      "APIs REST",
      "Gerenciamento de Projetos",
    ],

    idiomas: [
      {
        idioma: "Inglês",
        nivel: "Intermediário — leitura técnica e conversação",
      },

      {
        idioma: "Espanhol",
        nivel: "Básico",
      },
    ],

    comunidade: [
      "Mentora voluntária em iniciativas de formação para pessoas iniciantes em tecnologia.",
      "Participação na organização de encontros da comunidade local de tecnologia.",
      "Colaboradora em projetos de conteúdo sobre carreira e desenvolvimento profissional.",
      "Palestrante convidada em encontros sobre tecnologia e carreira.",
    ],
  },
  {
    id: "rafael-martins-silva",
    nome: "Rafael Martins Silva",
    titulo: "UX Writing, Produto Digital & Frontend",
    localizacao: "Campinas – SP",

    contato: {
      telefone: "(19) 98742-3158",
      email: "rafael.martins.dev@example.com",
      linkedin: "linkedin.com/in/rafaelmartinsdev",
      portfolio: "rafaelmartins.dev",
    },

    objetivo:
      "Atuar em UX Writing e Produto Digital, conectando conteúdo estratégico, jornadas de usuário e prototipação à capacidade técnica de transformar layouts e referências de mercado em interfaces funcionais, acessíveis e orientadas à conversão.",

    resumo:
      "Profissional com experiência multidisciplinar em conteúdo digital, marketing, CRM e desenvolvimento de software. Atua na interseção entre experiência do usuário, comunicação e tecnologia, traduzindo protótipos, wireframes e referências de mercado em interfaces responsivas. Combina conhecimento de UX Writing, arquitetura de conteúdo e jornadas conversacionais com experiência prática em React, Vue, TypeScript, Tailwind CSS, APIs e plataformas de CRM.",

    competencias: [
      {
        categoria: "UX Writing e conteúdo",
        itens: [
          "Microcopy",
          "Arquitetura de conteúdo",
          "Tom de voz",
          "Conteúdo orientado à conversão",
          "Redução de atrito em interfaces",
          "Roteiros conversacionais",
          "Testes A/B",
        ],
      },
      {
        categoria: "UI/UX e prototipação",
        itens: [
          "Figma",
          "Wireframes",
          "Prototipação",
          "Jornada do usuário",
          "Personas",
          "Análise de usabilidade",
          "Benchmarking",
        ],
      },
      {
        categoria: "Frontend",
        itens: [
          "React",
          "Vue.js",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Styled-components",
        ],
      },
      {
        categoria: "CRM e automação",
        itens: [
          "Salesforce Marketing Cloud",
          "Journey Builder",
          "Automation Studio",
          "AMPscript",
          "SSJS",
          "SQL",
          "SOQL",
          "CloudPages",
        ],
      },
    ],

    experiencias: [
      {
        cargo: "Coordenador de Educação e Tecnologia",
        empresa: "CodeLab Formação Digital",
        periodo: "Ago/2025 – atual",
        local: "Campinas – SP",
        modelo: "Presencial",
        atividades: [
          "Estruturei trilhas de aprendizagem voltadas à formação profissional em tecnologia.",
          "Produzi conteúdos educacionais considerando clareza, progressão de aprendizagem e experiência do aluno.",
          "Desenvolvi Landing Pages orientadas à conversão e aquisição de novos alunos.",
          "Participei da definição da experiência de navegação dos ambientes digitais.",
          "Coordenei processos pedagógicos, técnicos e operacionais da instituição.",
          "Defini metodologias de ensino e acompanhamento orientadas a resultados.",
        ],
        tecnologias: [
          "HTML",
          "CSS",
          "JavaScript",
          "Figma",
          "CMS",
          "Google Analytics",
        ],
      },

      {
        cargo: "Desenvolvedor de Produtos Digitais",
        empresa: "NorteHub Tecnologia",
        periodo: "Mar/2021 – atual",
        local: "Remoto",
        modelo: "Remoto",
        atividades: [
          "Transformei protótipos, wireframes e referências de benchmarking em interfaces funcionais.",
          "Desenvolvi aplicações frontend responsivas com foco em usabilidade.",
          "Analisei produtos digitais de referência para identificar padrões de navegação e interação.",
          "Modelei bancos de dados relacionais e não relacionais.",
          "Integrei APIs REST aos produtos desenvolvidos.",
          "Participei da definição de funcionalidades e fluxos de produto.",
        ],
        tecnologias: [
          "React",
          "Vue.js",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "MongoDB",
          "APIs REST",
        ],
      },

      {
        cargo: "Especialista em CRM e Tecnologia",
        empresa: "Grupo NovaCasa",
        periodo: "Fev/2025 – Fev/2026",
        local: "Campinas – SP",
        modelo: "Híbrido",
        atividades: [
          "Estruturei jornadas multicanal utilizando Salesforce Marketing Cloud.",
          "Desenvolvi CloudPages para campanhas e experiências personalizadas.",
          "Configurei automações utilizando Automation Studio e Journey Builder.",
          "Desenvolvi consultas SQL e SOQL para segmentação e análise de dados.",
          "Criei scripts utilizando AMPscript e SSJS.",
          "Aprimorei conteúdos e fluxos de comunicação buscando maior clareza para o usuário.",
        ],
        tecnologias: [
          "Salesforce Marketing Cloud",
          "Journey Builder",
          "Automation Studio",
          "AMPscript",
          "SSJS",
          "SQL",
          "SOQL",
        ],
      },

      {
        cargo: "Especialista em Growth e Experiência Digital",
        empresa: "CasaNova Marketplace",
        periodo: "Jul/2023 – Jun/2025",
        local: "Campinas – SP",
        modelo: "Híbrido",
        atividades: [
          "Mantive e evoluí interfaces frontend de uma operação de e-commerce.",
          "Otimizei fluxos de navegação com foco em conversão.",
          "Desenvolvi componentes utilizando HTML, CSS e JavaScript.",
          "Estruturei campanhas de comunicação multicanal.",
          "Realizei processos de higienização e organização de bases de clientes.",
          "Analisei jornadas digitais para identificar oportunidades de melhoria.",
        ],
        tecnologias: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "CRM",
          "E-commerce",
          "Google Analytics",
        ],
      },

      {
        cargo: "Desenvolvedor Frontend",
        empresa: "Orbit Sistemas Digitais",
        periodo: "Nov/2022 – Fev/2023",
        local: "Campinas – SP",
        modelo: "Híbrido",
        atividades: [
          "Desenvolvi interfaces para produtos de fidelidade e comércio eletrônico.",
          "Transformei especificações visuais em componentes frontend reutilizáveis.",
          "Implementei interfaces responsivas seguindo padrões definidos pelo design.",
          "Integrei componentes com APIs utilizadas pelos produtos.",
          "Participei de ajustes de usabilidade e refinamento visual das interfaces.",
        ],
        tecnologias: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Styled-components",
          "JavaScript",
          "APIs REST",
        ],
      },
    ],

    experienciaAnterior: [
      {
        empresa: "Connecta Digital",
        cargo: "Assistente de Marketing Digital",
        periodo: "2020 – 2021",
      },
      {
        empresa: "Studio WebLab",
        cargo: "Analista de Conteúdo Digital",
        periodo: "2018 – 2020",
      },
      {
        empresa: "Instituto Técnico Paulista",
        cargo: "Estagiário de Desenvolvimento Web",
        periodo: "2017 – 2018",
      },
    ],

    projetos: [
      {
        nome: "Biblioteca de Microcopy",
        descricao:
          "Projeto de estudo para organização de padrões de microcopy, mensagens de erro, estados vazios, confirmações e chamadas para ação.",
        tecnologias: ["UX Writing", "HTML", "CSS", "JavaScript"],
      },

      {
        nome: "Interface de Jornada Digital",
        descricao:
          "Protótipo de uma jornada de aquisição que demonstra como conteúdo, navegação e componentes de interface podem trabalhar juntos para reduzir atrito.",
        tecnologias: ["Figma", "React", "TypeScript", "Tailwind CSS"],
      },

      {
        nome: "Dashboard de Comunicação",
        descricao:
          "Painel conceitual para acompanhamento de campanhas, segmentações, jornadas e indicadores de comunicação digital.",
        tecnologias: ["React", "TypeScript", "APIs REST", "SQL"],
      },
    ],

    formacao: [
      {
        curso: "Análise e Desenvolvimento de Sistemas",
        instituicao: "Centro Universitário Horizonte",
        periodo: "2019 – 2021",
        status: "Concluído",
      },
      {
        curso: "Técnico em Informática",
        instituicao: "Instituto Técnico de Tecnologia Aplicada",
        periodo: "2016 – 2017",
        status: "Concluído",
      },
      {
        curso: "Bacharelado em Sistemas de Informação",
        instituicao: "Universidade Metropolitana de Campinas",
        periodo: "2018 – 2020",
        status: "Cursado parcialmente",
      },
      {
        curso: "UX Writing e Conteúdo para Produtos Digitais",
        instituicao: "Escola de Produto Digital",
        periodo: "2024",
        status: "Formação complementar",
      },
    ],

    certificados: [
      "UX Writing para Produtos Digitais",
      "Fundamentos de UX Design",
      "React e Desenvolvimento Frontend",
      "TypeScript para Aplicações Web",
      "APIs REST",
      "Salesforce Marketing Cloud",
      "SQL para Análise de Dados",
      "Fundamentos de Product Discovery",
    ],

    idiomas: [
      {
        idioma: "Inglês",
        nivel: "Avançado — leitura, escrita e comunicação profissional",
      },
      {
        idioma: "Espanhol",
        nivel: "Básico",
      },
    ],

    comunidade: [
      "Mentor voluntário em iniciativas de formação para profissionais iniciantes em tecnologia.",
      "Participação em comunidades de UX, produto e desenvolvimento frontend.",
      "Produção de conteúdos educacionais sobre tecnologia e carreira.",
      "Participação em encontros e eventos relacionados a produtos digitais.",
    ],
  },
  {
  id: "lucas-augusto-ferreira",
  nome: "Lucas Augusto Ferreira",
  titulo: "Suporte Técnico, Tecnologia & Operações",
  localizacao: "Campinas – SP",

  contato: {
    telefone: "(19) 98652-4173",
    email: "lucas.ferreira.tech@example.com",
    linkedin: "linkedin.com/in/lucasferreiratech",
    portfolio: "lucasferreira.dev",
  },

  objetivo:
    "Atuar em Suporte Técnico e Customer Success, combinando experiência em atendimento especializado, resolução de incidentes, análise de indicadores e conhecimento em tecnologia para proporcionar uma experiência eficiente ao cliente.",

  resumo:
    "Profissional com trajetória em tecnologia, suporte técnico e gestão de operações. Possui experiência em atendimento especializado, investigação de incidentes, sistemas corporativos, infraestrutura de TI e desenvolvimento de software. Ao longo da carreira, também atuou na liderança de equipes, acompanhamento de KPIs e elaboração de planos de ação. Combina conhecimento técnico com comunicação, organização e foco na resolução de problemas e satisfação do cliente.",

  competencias: [
    {
      categoria: "Suporte técnico",
      itens: [
        "Atendimento multicanal",
        "Troubleshooting",
        "Análise de incidentes",
        "Suporte a sistemas",
        "Suporte a redes",
        "Telefonia IP",
        "Infraestrutura de TI",
        "Documentação técnica",
      ],
    },

    {
      categoria: "Gestão e qualidade",
      itens: [
        "Gestão de KPIs",
        "PDCA",
        "5W2H",
        "FMEA",
        "Diagrama de Ishikawa",
        "Análise SWOT",
        "Planos de ação",
        "Melhoria contínua",
      ],
    },

    {
      categoria: "Tecnologia",
      itens: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "SQL",
        "PostgreSQL",
        "Git",
        "GitHub",
        "APIs REST",
      ],
    },

    {
      categoria: "Liderança e Customer Success",
      itens: [
        "Gestão de equipes",
        "Customer Success",
        "Satisfação do cliente",
        "Acompanhamento de desempenho",
        "Feedback",
        "Treinamento",
        "Gestão de conflitos",
        "Análise de resultados",
      ],
    },
  ],

  experiencias: [
    {
      cargo: "Coordenador de Educação e Tecnologia",
      empresa: "CodeLab Formação Digital",
      periodo: "Ago/2025 – atual",
      local: "Campinas – SP",
      modelo: "Presencial",

      atividades: [
        "Coordenei a estrutura pedagógica, técnica e operacional da instituição.",
        "Atuei no suporte técnico às plataformas utilizadas por alunos e equipes.",
        "Acompanhei indicadores de retenção, engajamento e satisfação dos usuários.",
        "Investiguei problemas técnicos e organizei processos para reduzir impactos na experiência dos alunos.",
        "Estruturei procedimentos internos para atendimento e resolução de problemas.",
        "Conectei necessidades operacionais às demandas técnicas da plataforma.",
      ],

      tecnologias: [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "GitHub",
        "Plataformas LMS",
      ],
    },

    {
      cargo: "Analista de Sistemas e Suporte Técnico",
      empresa: "VozLink Tecnologia",
      periodo: "Dez/2020 – Ago/2021",
      local: "Campinas – SP",
      modelo: "Híbrido",

      atividades: [
        "Atuei no suporte técnico especializado a clientes e novos usuários.",
        "Investiguei problemas de configuração e utilização de sistemas de telefonia digital.",
        "Acompanhei clientes durante processos de implementação e ativação da tecnologia.",
        "Realizei diagnóstico de incidentes e encaminhamento de problemas para equipes técnicas.",
        "Desenvolvi interfaces frontend para ferramentas internas de suporte.",
        "Integrei aplicações frontend com serviços backend e bancos de dados.",
      ],

      tecnologias: [
        "React",
        "JavaScript",
        "Java",
        "MariaDB",
        "APIs",
        "Git",
      ],
    },

    {
      cargo: "Supervisor de Operações",
      empresa: "Aliança Contact Center",
      periodo: "Jul/2019 – Out/2019",
      local: "Campinas – SP",
      modelo: "Presencial",

      atividades: [
        "Supervisionei equipes responsáveis pelo atendimento de produtos e serviços.",
        "Acompanhei indicadores de produtividade, qualidade e satisfação dos clientes.",
        "Atuei no suporte operacional aos atendentes durante situações críticas.",
        "Analisei resultados e identifiquei oportunidades de melhoria nos processos.",
        "Apoiei a elaboração de planos de ação para melhoria dos indicadores.",
        "Realizei acompanhamento individual de desempenho.",
      ],

      tecnologias: [
        "CRM",
        "Excel",
        "Pacote Office",
        "KPIs",
        "Gestão de operações",
      ],
    },

    {
      cargo: "Analista de Suporte Técnico e Líder de Equipe",
      empresa: "Conecta Telecom",
      periodo: "Set/2015 – Set/2019",
      local: "Campinas – SP",
      modelo: "Presencial",

      atividades: [
        "Realizei atendimento especializado para clientes de serviços de telecomunicações.",
        "Atuei na investigação de problemas relacionados a rede, conectividade e serviços digitais.",
        "Prestei suporte em situações de maior complexidade encaminhadas pela operação.",
        "Acompanhei indicadores de qualidade, produtividade e satisfação.",
        "Utilizei ferramentas de análise de causa para investigação de problemas recorrentes.",
        "Assumi posteriormente a liderança de equipe, acompanhando resultados e desenvolvendo planos de ação.",
        "Realizei feedbacks e acompanhamento de desempenho dos integrantes da equipe.",
      ],

      tecnologias: [
        "CRM",
        "Pacote Office",
        "Excel",
        "PDCA",
        "5W2H",
        "FMEA",
        "Ishikawa",
      ],
    },

    {
      cargo: "Estagiário de TI e Planejamento",
      empresa: "Centro Administrativo Federal",
      periodo: "Mai/2011 – Jun/2013",
      local: "Campinas – SP",
      modelo: "Presencial",

      atividades: [
        "Atuei no suporte à infraestrutura de tecnologia da organização.",
        "Realizei configuração e substituição de estações de trabalho.",
        "Acompanhei o ciclo de vida de equipamentos de informática.",
        "Apoiei processos de modernização e digitalização de atividades internas.",
        "Desenvolvi ferramentas para apoio às rotinas administrativas.",
        "Criei soluções para processamento de documentos e controle de prazos.",
      ],

      tecnologias: [
        "Delphi",
        "Microsoft Access",
        "SQL",
        "Windows",
        "Hardware",
        "Redes",
      ],
    },
  ],

  experienciaAnterior: [
    {
      empresa: "TechService Informática",
      cargo: "Assistente de Suporte",
      periodo: "2013 – 2015",
    },
    {
      empresa: "DataCenter Solutions",
      cargo: "Auxiliar de Infraestrutura",
      periodo: "2010 – 2011",
    },
  ],

  projetos: [
    {
      nome: "Central de Diagnóstico de Incidentes",
      descricao:
        "Projeto conceitual de uma central para registro, classificação e acompanhamento de incidentes técnicos, facilitando a identificação de problemas recorrentes.",
      tecnologias: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
      ],
    },

    {
      nome: "Dashboard de Suporte",
      descricao:
        "Painel para acompanhamento de chamados, tempo médio de atendimento, incidentes recorrentes e indicadores de satisfação.",
      tecnologias: [
        "JavaScript",
        "SQL",
        "APIs REST",
        "Charts",
      ],
    },

    {
      nome: "Base de Conhecimento Técnico",
      descricao:
        "Estrutura de documentação para registrar procedimentos de diagnóstico, soluções de incidentes frequentes e orientações para equipes de atendimento.",
      tecnologias: [
        "Markdown",
        "Git",
        "GitHub",
        "Documentação técnica",
      ],
    },
  ],

  formacao: [
    {
      curso: "Análise e Desenvolvimento de Sistemas",
      instituicao: "Centro Universitário Nova Geração",
      periodo: "2018 – 2021",
      status: "Concluído",
    },

    {
      curso: "Técnico em Informática",
      instituicao: "Instituto Técnico do Interior",
      periodo: "2014 – 2016",
      status: "Concluído",
    },

    {
      curso: "Bacharelado em Ciência da Computação",
      instituicao: "Universidade Metropolitana de Tecnologia",
      periodo: "2016 – 2018",
      status: "Cursado parcialmente",
    },
  ],

  certificados: [
    "Fundamentos de Customer Success",
    "Gestão de Incidentes e Problemas",
    "ITIL Foundation",
    "React e Desenvolvimento Frontend",
    "JavaScript e TypeScript",
    "SQL para Análise de Dados",
    "Fundamentos de APIs REST",
    "Gestão de Indicadores e KPIs",
    "Gestão da Qualidade",
  ],

  idiomas: [
    {
      idioma: "Inglês",
      nivel: "Intermediário — leitura técnica e comunicação profissional",
    },

    {
      idioma: "Espanhol",
      nivel: "Básico",
    },
  ],

  comunidade: [
    "Participação em comunidades de tecnologia e suporte técnico.",
    "Mentoria informal para profissionais iniciantes em tecnologia.",
    "Compartilhamento de conhecimentos sobre diagnóstico de problemas e desenvolvimento de software.",
    "Participação em eventos relacionados a tecnologia, atendimento e Customer Success.",
  ],
},
];
