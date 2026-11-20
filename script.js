const content = {
  combat: [
    { title: "ATTAQUES", items: [
      { label: "Attaque réussie", icon: "⚔", lines: [
        "Votre lame trouve sa cible dans un bruit sourd. L'adversaire chancelle sous l'impact.",
        "Votre arme frappe avec précision. Un souffle rauque s'échappe de la gorge de votre adversaire.",
        "Le coup porte. Le métal mord la chair et votre ennemi recule sous la violence de l'impact."
      ]},
      { label: "Attaque critique", icon: "⚔⚔", lines: [
        "Votre frappe s'abat avec une violence terrible. Votre adversaire est projeté en arrière, incapable de contenir le choc.",
        "Vos armes croisées déchirent la garde adverse. Le coup frappe avec une brutalité dévastatrice.",
        "Votre attaque trouve une faille béante dans sa défense. L'impact résonne comme un coup de tonnerre."
      ]},
      { label: "Attaque ratée", icon: "◎", lines: [
        "Votre arme ne rencontre que le vide. L'adversaire esquive et reprend son équilibre.",
        "Votre coup siffle dans l'air avant de frapper le sol dans un bruit métallique.",
        "Votre adversaire se dérobe au dernier instant. Votre attaque ne laisse qu'une entaille dans le décor."
      ]}
    ]},
    { title: "DÉFENSES", items: [
      { label: "Esquive réussie", icon: "⇢", lines: [
        "Vous vous dérobez au dernier instant. L'attaque passe à quelques centimètres de vous.",
        "Votre corps pivote avec justesse. La lame ennemie fend l'air sans vous atteindre.",
        "Vous plongez sur le côté et laissez le coup s'écraser derrière vous."
      ]},
      { label: "Parade réussie", icon: "⛨", lines: [
        "Votre garde tient bon. Les armes s'entrechoquent dans une gerbe d'étincelles.",
        "Vous bloquez l'attaque de votre adversaire. Le choc fait vibrer votre bras jusqu'à l'épaule.",
        "Votre arme dévie le coup dans un fracas métallique. Vous restez debout, prêt à riposter."
      ]},
      { label: "Défense ratée", icon: "⛨", lines: [
        "Votre garde s'ouvre au mauvais moment. Le coup passe votre défense et vous atteint avec violence.",
        "Vous réagissez trop tard. L'arme ennemie traverse votre garde et vous frappe de plein fouet.",
        "Votre défense cède sous l'assaut. Le choc vous arrache un cri et vous fait vaciller."
      ]}
    ]}
  ],
  blessures: [{ title: "INTENSITÉ DES BLESSURES", items: [
    { label: "Blessure légère", icon: "♡", lines: ["Une entaille superficielle marque votre peau. La douleur est vive, mais supportable.", "Le coup vous érafle profondément. Quelques gouttes de sang viennent souiller vos vêtements.", "Une douleur sèche vous traverse. La blessure est légère, mais bien réelle."] },
    { label: "Blessure sérieuse", icon: "♥", lines: ["Le coup vous atteint durement. Votre corps vacille et une douleur profonde vous arrache un souffle.", "La lame ouvre une plaie profonde. Votre sang commence à couler le long de votre corps.", "L'impact vous coupe le souffle. Vous sentez vos forces vaciller sous la douleur."] },
    { label: "Blessure grave", icon: "♦", lines: ["La violence du coup vous terrasse presque. Votre vision se trouble et vos jambes peinent à vous porter.", "La blessure est profonde. Votre sang s'écoule rapidement tandis qu'une douleur brûlante vous submerge.", "Vous encaissez un choc terrible. Votre corps ploie et chaque mouvement devient une épreuve."] },
    { label: "Blessure mortelle", icon: "☠", lines: ["La blessure est terrible. Votre souffle se brise et le monde commence à s'éloigner.", "Le coup vous transperce. Vos forces vous abandonnent tandis que le sol se rapproche inexorablement.", "Une douleur fulgurante vous traverse. Vous sentez la vie quitter peu à peu vos membres."] }
  ]}],
  finisseurs: [{ title: "ISSUE DU COMBAT", items: [
    { label: "Adversaire terrassé", icon: "⚔", lines: ["Votre adversaire s'effondre lourdement au sol. Son arme lui échappe dans un dernier cliquetis.", "Le dernier coup le fait tomber à genoux. Il s'écroule ensuite face contre terre.", "Son corps s'affaisse, vaincu. Le silence retombe sur le champ de bataille."] },
    { label: "Coup fatal", icon: "ϟ", lines: ["Votre frappe met brutalement fin à l'affrontement. Le corps s'écroule sans un mot.", "Votre arme frappe une dernière fois. Votre adversaire s'immobilise avant de tomber lourdement.", "Le coup est définitif. Votre ennemi s'effondre et ne se relève pas."] },
    { label: "Exécution", icon: "☠", lines: ["Votre arme s'abat une dernière fois. Il n'y aura pas de second combat.", "Vous vous approchez de votre adversaire vaincu et mettez un terme à son agonie.", "Dans un geste sans hésitation, vous achevez celui qui ne peut plus se défendre."] },
    { label: "Dernier souffle", icon: "〰", lines: ["Un râle s'échappe de sa gorge. Ses doigts se détendent et son corps devient immobile.", "Sa poitrine se soulève une dernière fois. Puis plus rien.", "Un dernier souffle quitte ses lèvres. Ses yeux se figent dans le vide."] }
  ]}],
  creatures: [{ title: "FAMILLES DE CRÉATURES", items: [
    { label: "Aberration", icon: "◉", lines: ["Sa silhouette se déforme dans un craquement humide. Plusieurs membres s'agitent sous sa peau.", "La créature se contorsionne dans un mouvement impossible. Son corps semble ignorer toute anatomie connue."] },
    { label: "Bête", icon: "♟", lines: ["La bête baisse la tête et retrousse ses babines. Ses muscles se tendent avant qu'elle ne bondisse.", "Un grondement sourd monte de sa gorge. Ses griffes labourent le sol tandis qu'elle vous fixe."] },
    { label: "Artificiel", icon: "⚙", lines: ["Ses articulations grincent tandis que son corps mécanique pivote avec une précision inhumaine.", "Un cliquetis métallique résonne dans sa carcasse. Ses membres s'animent avec une froide régularité."] },
    { label: "Dragon", icon: "♨", lines: ["Le dragon déploie ses ailes dans un grondement qui fait trembler les alentours.", "Ses écailles captent la lumière tandis qu'un grondement profond monte de sa poitrine."] },
    { label: "Mort-vivant", icon: "☠", lines: ["Un râle s'échappe de sa gorge desséchée. Ses membres craquent tandis qu'il avance.", "La créature avance d'un pas traînant. Une odeur de terre humide et de décomposition l'accompagne."] },
    { label: "Plante", icon: "♧", lines: ["Des lianes jaillissent du sol et fouettent l'air autour de la créature.", "Ses racines se contractent et ses branches se dressent dans un bruissement inquiétant."] }
  ]}]
};

const tabLabels = {
  combat: ["⚔", "Combat"], blessures: ["♡", "Blessures"],
  finisseurs: ["☠", "Finisseurs"], creatures: ["♟", "Créatures"]
};
const actions = document.getElementById("actions");
const result = document.getElementById("result");
const historyList = document.getElementById("history-list");
const counts = {};
let history = [];

function renderActions(tab) {
  actions.innerHTML = "";
  content[tab].forEach(group => {
    const section = document.createElement("section");
    section.className = "action-group";
    const heading = document.createElement("h2");
    heading.className = "section-title";
    heading.textContent = group.title;
    section.appendChild(heading);
    const grid = document.createElement("div");
    grid.className = "action-grid";
    group.items.forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "action-button";
      const icon = document.createElement("span");
      icon.className = "action-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = item.icon;
      const label = document.createElement("span");
      label.className = "action-label";
      label.textContent = item.label;
      button.append(icon, label);
      button.addEventListener("click", () => generate(item));
      grid.appendChild(button);
    });
    section.appendChild(grid);
    actions.appendChild(section);
  });
}

function generate(item) {
  const index = counts[item.label] || 0;
  const phrase = item.lines[index % item.lines.length];
  counts[item.label] = index + 1;
  result.textContent = phrase;
  history.unshift({ label: item.label, phrase });
  history = history.slice(0, 5);
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  if (history.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-history";
    empty.textContent = "Aucune action pour le moment.";
    historyList.appendChild(empty);
    return;
  }
  history.forEach(entry => {
    const li = document.createElement("li");
    const label = document.createElement("div");
    label.className = "history-label";
    label.textContent = entry.label;
    const phrase = document.createElement("div");
    phrase.className = "history-phrase";
    phrase.textContent = entry.phrase;
    li.append(label, phrase);
    historyList.appendChild(li);
  });
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab === button));
    renderActions(button.dataset.tab);
  });
});

document.getElementById("copy").addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText(result.textContent);
    status.textContent = "Copié !";
  } catch {
    status.textContent = "Copie indisponible dans ce navigateur.";
  }
  setTimeout(() => { status.textContent = ""; }, 2200);
});

document.getElementById("clear-history").addEventListener("click", () => {
  history = [];
  renderHistory();
});

renderActions("combat");
