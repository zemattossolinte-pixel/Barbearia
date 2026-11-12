/* ==========================================================
   BARBEARIA PADRÃO — ARQUIVO ÚNICO DE CONFIGURAÇÃO
   Todos os dados abaixo são FICTÍCIOS / DEMONSTRATIVOS.
   Edite aqui para trocar contatos, preços, equipe e textos.
   Fotos: preencha o campo "img" com o caminho (ex: "assets/fade.jpg").
   Sem foto, o site mostra um painel gráfico no lugar.
   ========================================================== */
window.SITE = {
  nome: "Barbearia Padrão",
  slogan: "Seu estilo. Nosso padrão.",
  cidade: "Florianópolis/SC",
  endereco: "Rua das Palmeiras, 250 — Centro, Florianópolis/SC",
  referencia: "Endereço demonstrativo. Quando for real: indique ponto de referência, estacionamento e transporte público.",
  telefone: "(48) 3333-2020",
  telefoneLink: "+554833332020",
  whatsapp: "5548999992020",           // só números, com DDI 55
  whatsappExibicao: "(48) 99999-2020",
  email: "contato@barbeariapadrao.com.br",
  horarios: [
    { dia: "Segunda a sexta", hora: "09h às 20h" },
    { dia: "Sábado", hora: "09h às 18h" },
    { dia: "Domingo", hora: "Fechado" }
  ],
  // Grade de atendimento usada no agendamento (0 = domingo)
  grade: { 0: null, 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20], 6: [9, 18] },
  intervaloMin: 30,
  redes: { instagram: "#", facebook: "#", tiktok: "#" },
  msgPadrao: "Olá! Gostaria de agendar um horário na Barbearia Padrão. Poderia me informar os horários disponíveis?",

  // Integrações futuras: preencha os IDs para ativar. Vazio = desligado.
  integracoes: { googleAnalyticsId: "", metaPixelId: "", agendaWebhookUrl: "" },

  servicos: [
    { id: "tradicional", nome: "Corte masculino tradicional", desc: "Tesoura e máquina, lavagem e finalização com produto.", min: 40, preco: 60, cat: "Cabelo" },
    { id: "fade", nome: "Corte degradê (fade)", desc: "Low, mid ou high fade com transição limpa e navalha no acabamento.", min: 45, preco: 70, cat: "Cabelo", destaque: true },
    { id: "executivo", nome: "Corte executivo", desc: "Visual alinhado para o dia a dia profissional, com consultoria de estilo.", min: 40, preco: 65, cat: "Cabelo" },
    { id: "infantil", nome: "Corte infantil", desc: "Atendimento paciente para crianças até 12 anos.", min: 30, preco: 45, cat: "Cabelo" },
    { id: "barba", nome: "Barba completa", desc: "Toalha quente, navalha, óleo e balm pós-barba.", min: 35, preco: 50, cat: "Barba" },
    { id: "modelagem", nome: "Modelagem e acabamento de barba", desc: "Desenho do contorno e alinhamento do volume.", min: 25, preco: 40, cat: "Barba" },
    { id: "combo", nome: "Corte + barba", desc: "O ritual completo: corte, barba com toalha quente e finalização.", min: 75, preco: 110, cat: "Combo", destaque: true },
    { id: "pigmentacao", nome: "Pigmentação de barba", desc: "Preenche falhas e uniformiza o tom com resultado natural.", min: 30, preco: 45, cat: "Barba" },
    { id: "hidratacao", nome: "Hidratação capilar", desc: "Tratamento para fios ressecados, com massagem no couro cabeludo.", min: 30, preco: 45, cat: "Cuidados" },
    { id: "camuflagem", nome: "Camuflagem de fios brancos", desc: "Suaviza os brancos sem aparência de tinta.", min: 40, preco: 70, cat: "Cuidados" },
    { id: "sobrancelha", nome: "Sobrancelha masculina", desc: "Limpeza discreta, sem afinar.", min: 15, preco: 25, cat: "Cuidados" },
    { id: "tratamentos", nome: "Tratamentos e cuidados masculinos", desc: "Limpeza de pele, esfoliação e máscara facial.", min: 45, preco: 90, cat: "Cuidados" }
  ],

  equipe: [
    { id: "rafael", nome: "Rafael Martins", cargo: "Master Barber", bio: "Mais de 12 anos de cadeira. Referência em cortes clássicos e visagismo.", estilo: "Consultivo e detalhista: entende sua rotina antes de pegar a tesoura.", img: "" },
    { id: "lucas", nome: "Lucas Ferreira", cargo: "Especialista em degradê", bio: "Transições impecáveis do low ao skin fade. Atualizado com o que está em alta.", estilo: "Rápido, preciso e direto ao ponto.", img: "" },
    { id: "gabriel", nome: "Gabriel Costa", cargo: "Especialista em barba e acabamento", bio: "Toalha quente, navalha e desenho de barba sob medida para o formato do rosto.", estilo: "Calmo, ritual completo, sem pressa.", img: "" }
  ],

  galeria: [
    { titulo: "Mid fade texturizado", tag: "Degradê", img: "" },
    { titulo: "Side part clássico", tag: "Clássico", img: "" },
    { titulo: "Barba desenhada", tag: "Barba", img: "" },
    { titulo: "Crop moderno", tag: "Moderno", img: "" },
    { titulo: "Antes e depois", tag: "Transformação", img: "" },
    { titulo: "Acabamento na navalha", tag: "Detalhe", img: "" }
  ],

  espaco: [
    { titulo: "Cadeiras hidráulicas de couro", img: "" },
    { titulo: "Bancadas em madeira e metal", img: "" },
    { titulo: "Iluminação quente e pontual", img: "" },
    { titulo: "Lounge com café e espera confortável", img: "" }
  ],

  depoimentos: [
    { nome: "André S.", texto: "Cheguei no horário e fui atendido no horário. Parece pouco, mas faz diferença. Corte ficou do jeito que pedi.", servico: "Corte degradê" },
    { nome: "Marcelo T.", texto: "O Gabriel tirou um tempo pra entender o formato da minha barba. Primeira vez que saio satisfeito com ela.", servico: "Barba completa" },
    { nome: "Felipe R.", texto: "Ambiente tranquilo, café bom e conversa na medida. Virou meu lugar fixo a cada 15 dias.", servico: "Corte + barba" },
    { nome: "Diego M.", texto: "Levei meu filho e o atendimento foi bem paciente com ele. Já marcamos o próximo.", servico: "Corte infantil" }
  ],

  planos: [
    { nome: "Essencial", preco: 99, periodo: "/mês", itens: ["2 cortes por mês", "10% off em produtos", "Agendamento prioritário"] },
    { nome: "Padrão", preco: 169, periodo: "/mês", destaque: true, itens: ["Cortes ilimitados (seg–qui)", "2 barbas completas", "15% off em produtos", "Bebida de cortesia"] },
    { nome: "Black", preco: 249, periodo: "/mês", itens: ["Corte + barba ilimitados", "1 tratamento facial", "20% off em produtos", "Horários exclusivos"] }
  ],
  fidelidade: "A cada 10 atendimentos, o 11º corte é por nossa conta. Indique um amigo e os dois ganham 20% no próximo serviço.",

  produtos: [
    { nome: "Pomada Matte Forte", desc: "Fixação alta, efeito seco.", preco: 59, tipo: "pomada" },
    { nome: "Óleo para Barba Cedro", desc: "Hidrata e amacia sem pesar.", preco: 49, tipo: "oleo" },
    { nome: "Shampoo Mentolado", desc: "Limpeza profunda e refrescância.", preco: 45, tipo: "shampoo" },
    { nome: "Balm Pós-Barba", desc: "Acalma a pele e controla o frizz.", preco: 52, tipo: "balm" },
    { nome: "Spray Texturizador", desc: "Volume e textura natural.", preco: 55, tipo: "spray" }
  ]
};
