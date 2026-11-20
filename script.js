'use strict';

const ICONS = {
  swords: '<path d="m14.5 17.5 3-3L21 11l-2-2-3.5 3.5-3 3M5 19l4-4m-2-2 4-4m-5 1 2-2 10 10-2 2zM3 21l3-3"/>',
  sword: '<path d="m14 3 7 7-11 11-4-4L17 6"/><path d="m5 17-2 4 4-2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  dodge: '<path d="M4 12h13M12 5l7 7-7 7"/><path d="M4 5v14"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m8 12 3 3 5-6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  heartCrack: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/><path d="m13 7-3 5h4l-3 5"/>',
  skull: '<circle cx="12" cy="11" r="8"/><path d="M8 17v4h8v-4M9 11h.01M15 11h.01M9 15h6"/>',
  zap: '<path d="m13 2-3 9h7l-6 11 1-9H5l8-11z"/>',
  wind: '<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 16h7a2 2 0 1 1-2 2"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  paw: '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="17" cy="8" r="2"/><path d="M5 17c0-3 3-5 7-5s7 2 7 5-3 3-5 2l-2-1-2 1c-2 1-5 1-5-2z"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.8z"/>',
  flame: '<path d="M12 22c5 0 8-3.5 8-8 0-3-2-6-5-9 0 4-2 5-3 5-1-3-3-5-4-6 0 4-4 7-4 11 0 4 3 7 8 7z"/><path d="M12 22c-2 0-3-1.5-3-3 0-2 2-3 3-5 2 2 3 3 3 5s-1 3-3 3z"/>',
  sprout: '<path d="M12 21v-9M12 12C5 12 4 7 4 4c5 0 8 2 8 8zM12 16c0-5 3-8 8-8 0 5-2 8-8 8z"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'
};
function icon(name) { return `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.sword}</svg>`; }

document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector) => document.querySelector(selector);
  const actionsEl = $('#actions'), resultEl = $('#result'), historyEl = $('#history-list');
  const history = [], variantIndex = Object.create(null);
  $('#brand-icon').innerHTML = icon('swords');
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });

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
      ]},
      { label: "Distance touchée", icon: "➶", lines: [
        "Votre projectile file à travers le tumulte et frappe sa cible avec un claquement sec.",
        "La flèche trouve son chemin jusqu'à l'adversaire. Celui-ci vacille sous l'impact.",
        "Votre tir atteint sa cible. Un cri bref se perd dans le fracas du combat."
      ]},
      { label: "Distance ratée", icon: "➶", lines: [
        "Votre projectile siffle dans l'air et va se perdre au loin sans atteindre sa cible.",
        "Le tir passe à côté. Le projectile frappe le sol ou se brise contre un obstacle dans un claquement sec.",
        "Votre adversaire se dérobe et votre projectile poursuit sa course dans le vide."
      ]},
      { label: "Distance critique", icon: "➶", lines: [
        "Votre projectile fend l'air avec une précision implacable et frappe un point vital.",
        "Le trait atteint sa cible avec une violence exceptionnelle. L'adversaire s'effondre presque sous le choc.",
        "Votre tir trouve une ouverture parfaite et transperce les défenses de votre ennemi."
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

  const actionIcons = {
    'Attaque réussie':'sword','Attaque critique':'swords','Attaque ratée':'target',
    'Distance touchée':'target','Distance ratée':'wind','Distance critique':'zap',
    'Esquive réussie':'paw','Parade réussie':'shield','Défense ratée':'shield',
    'Blessure légère':'heart','Blessure sérieuse':'heartCrack','Blessure grave':'heartCrack','Blessure mortelle':'skull',
    'Adversaire terrassé':'swords','Coup fatal':'zap','Exécution':'skull','Dernier souffle':'wind',
    'Aberration':'eye','Bête':'paw','Artificiel':'cog','Dragon':'flame','Mort-vivant':'skull','Plante':'sprout'
  };
  function renderHistory() {
    historyEl.replaceChildren();
    if (!history.length) { const li=document.createElement('li'); li.className='empty-history'; li.textContent='Aucune action pour le moment.'; historyEl.append(li); return; }
    history.forEach(entry => { const li=document.createElement('li'); const title=document.createElement('div'); title.className='history-label'; title.textContent=entry.label; const text=document.createElement('div'); text.className='history-phrase'; text.textContent=entry.phrase; li.append(title,text); historyEl.append(li); });
  }

  // Moteur narratif : les textes sont composés à partir de fragments adaptés
  // à chaque action. Aucun résultat mécanique n'est décidé par le générateur.
  const narrativeProfiles = {
    'Distance touchée': {
      openings: [
        "Vous ajustez votre visée et relâchez votre projectile",
        "Votre flèche fend l'air dans un sifflement aigu",
        "D'un geste rapide, vous décochez votre tir",
        "Votre projectile traverse le tumulte du combat",
        "Vous profitez d'une ouverture pour lâcher votre trait"
      ],
      impacts: [
        "et atteint sa cible dans un bruit mat",
        "et se fiche dans la chair de votre adversaire",
        "et frappe l'ennemi avec une précision redoutable",
        "et l'impact fait vaciller votre cible",
        "et un cri de douleur couvre un instant le vacarme"
      ],
      reactions: [
        "L'adversaire porte instinctivement la main à sa blessure.",
        "Il chancelle et tente de retrouver ses appuis.",
        "Sa posture se brise sous la douleur.",
        "Il tourne brusquement la tête vers vous, cherchant l'origine du tir.",
        "Le projectile reste fiché dans sa cible tandis que le combat fait rage."
      ],
      endings: [
        "Vous avez déjà porté votre attention sur la suite de l'affrontement.",
        "Le tumulte reprend aussitôt autour de vous.",
        "Votre arme est prête pour le prochain tir.",
        "La distance ne vous a pas empêché de faire couler le sang."
      ]
    },
    'Distance critique': {
      openings: [
        "Vous prenez une fraction de seconde pour ajuster votre visée et relâchez votre projectile",
        "Votre trait fuse dans les airs avec une vitesse fulgurante",
        "Vous décochez un tir d'une précision redoutable",
        "Votre projectile traverse le tumulte et trouve une ouverture infime",
        "Profitant d'un instant de vulnérabilité, vous libérez votre tir"
      ],
      impacts: [
        "et frappe un point vital avec une précision terrifiante",
        "et se plante profondément dans une zone sans protection",
        "et transperce la défense adverse dans un impact brutal",
        "et atteint sa cible avec une force dévastatrice",
        "et l'impact arrache un cri qui domine le vacarme du combat"
      ],
      reactions: [
        "L'adversaire se plie sous le choc, le souffle coupé.",
        "Ses forces semblent l'abandonner tandis qu'il porte la main à sa blessure.",
        "Il chancelle lourdement, incapable de masquer la douleur.",
        "Son regard se trouble et sa posture s'effondre.",
        "La violence du coup le laisse un instant sans réaction."
      ],
      endings: [
        "Autour de vous, le combat continue sans attendre.",
        "Vous préparez déjà votre prochain geste.",
        "Le silence d'un instant est bientôt englouti par le fracas des armes.",
        "Votre tir vient de marquer les esprits autant que la chair."
      ]
    },
    'Distance ratée': {
      openings: [
        "Vous décochez votre projectile, mais votre cible se déplace au dernier instant",
        "Votre trait fend l'air dans un sifflement avant de dévier de sa trajectoire",
        "Vous lâchez votre tir, mais l'adversaire a déjà quitté votre ligne de mire",
        "Votre projectile traverse le champ de bataille sans trouver sa cible",
        "Vous profitez d'une ouverture et relâchez votre tir"
      ],
      impacts: [
        "Le projectile se perd dans le vide.",
        "Il frappe le sol dans un bruit sec.",
        "Le trait ricoche contre la pierre et disparaît dans le tumulte.",
        "Votre tir passe à quelques doigts de votre adversaire.",
        "Le projectile se fiche dans le bois ou la pierre derrière sa cible."
      ],
      reactions: [
        "Votre adversaire profite de cet instant pour se repositionner.",
        "Vous devez déjà préparer un nouveau tir.",
        "La cible reste hors d'atteinte et garde les yeux fixés sur vous.",
        "Un bref instant suffit à votre adversaire pour reprendre l'initiative.",
        "Le combat ne vous laisse aucun répit pour corriger votre visée."
      ],
      endings: [
        "Vous ramenez votre attention sur le champ de bataille.",
        "Le sifflement du projectile se perd dans le vacarme.",
        "Il faudra trouver une meilleure ouverture.",
        "Votre adversaire est toujours debout, prêt à poursuivre l'affrontement."
      ]
    },
    'Attaque réussie': {
      openings: [
        "Vous engagez votre poids dans le mouvement",
        "Votre lame part dans un éclair d'acier",
        "D'un geste précis, vous trouvez l'ouverture",
        "Votre arme fend l'air dans un sifflement bref",
        "Vous frappez au moment où la garde adverse vacille"
      ],
      impacts: [
        "et le tranchant atteint sa cible dans un choc sourd",
        "et l'acier mord la chair au travers de la défense",
        "et l'impact fait trembler les armes jusque dans vos mains",
        "et votre adversaire encaisse le coup de plein fouet",
        "et un bruit mat résonne au milieu du tumulte"
      ],
      reactions: [
        "L'ennemi recule, le souffle brusquement coupé.",
        "Son visage se crispe tandis qu'il tente de retrouver son équilibre.",
        "Il chancelle et sa garde s'abaisse un instant.",
        "Un grognement lui échappe ; ses appuis deviennent incertains.",
        "Le choc le force à céder du terrain."
      ],
      endings: [
        "Autour de vous, le combat ne ralentit pas.",
        "Le fracas des armes reprend aussitôt autour de vous.",
        "Vous avez à peine le temps de reprendre votre souffle.",
        "La poussière retombe lentement entre les combattants."
      ]
    },
    'Attaque critique': {
      openings: [
        "Vous rassemblez toute votre force et abattez votre arme",
        "Votre attaque explose dans un mouvement d'une précision redoutable",
        "Vous percez la garde adverse au moment décisif",
        "Votre frappe traverse la défense avec une brutalité implacable",
        "Dans un élan fulgurant, vous trouvez une ouverture que l'ennemi ne peut plus refermer"
      ],
      impacts: [
        "L'impact résonne comme un coup de tonnerre.",
        "Le choc projette votre adversaire en arrière.",
        "Les armes s'entrechoquent dans une gerbe d'étincelles avant que le coup ne porte.",
        "La violence de la frappe lui arrache un cri.",
        "Toute sa défense cède sous la puissance du coup."
      ],
      reactions: [
        "Il vacille, incapable de masquer l'ampleur du choc.",
        "Ses jambes fléchissent et son arme menace de lui échapper.",
        "Il recule lourdement, désorienté par la violence de l'assaut.",
        "Un instant, il semble avoir perdu le fil du combat."
      ],
      endings: [
        "Le vacarme alentour paraît s'effacer derrière le fracas de votre frappe.",
        "Vous sentez la vibration du choc remonter le long de vos bras.",
        "La poussière et les cris se mêlent autour de vous."
      ]
    },
    'Attaque ratée': {
      openings: [
        "Vous lancez votre attaque, mais votre adversaire se dérobe au dernier instant",
        "Votre lame siffle dans le vide",
        "Vous cherchez l'ouverture, mais votre coup arrive trop tard",
        "Votre arme s'abat là où se trouvait votre cible un instant plus tôt",
        "Vous vous engagez trop loin et perdez momentanément votre appui"
      ],
      impacts: [
        "L'acier ne rencontre que l'air.",
        "Votre arme frappe le sol dans un claquement sec.",
        "Le tranchant érafle une pierre et fait jaillir quelques étincelles.",
        "Le mouvement vous entraîne au-delà de votre cible.",
        "Votre coup ne laisse qu'une entaille dans le bois tout proche."
      ],
      reactions: [
        "L'ennemi profite de cette ouverture pour se repositionner.",
        "Votre adversaire reste hors de portée, prêt à riposter.",
        "Vous devez corriger votre posture avant de pouvoir frapper à nouveau.",
        "Un bref instant de déséquilibre vous expose au danger."
      ],
      endings: [
        "Le combat continue sans vous accorder de répit.",
        "Le bruit de votre arme résonne encore dans le tumulte.",
        "Vous ramenez votre garde, conscient de l'ouverture laissée."
      ]
    },
    'Esquive réussie': {
      openings: [
        "Vous pivotez sur le côté au tout dernier instant",
        "Vous vous baissez brusquement sous la trajectoire du coup",
        "D'un pas vif, vous quittez la ligne d'attaque",
        "Vous laissez votre corps suivre le mouvement plutôt que de lui résister",
        "Votre pied glisse sur le sol et vous emporte hors de portée"
      ],
      impacts: [
        "La lame ennemie fend l'air à quelques doigts de vous.",
        "Le coup passe au-dessus de votre épaule et s'écrase derrière vous.",
        "L'arme adverse ne rencontre que le vide.",
        "Le choc frappe le sol dans un bruit qui résonne à vos pieds.",
        "Le souffle de l'attaque frôle votre visage."
      ],
      reactions: [
        "Votre adversaire doit reprendre son mouvement pour vous faire face.",
        "Vous retrouvez vos appuis avant que l'ennemi ne puisse corriger sa trajectoire.",
        "L'assaillant poursuit son élan et vous offre un bref répit.",
        "Vous restez hors d'atteinte, les yeux fixés sur votre adversaire."
      ],
      endings: [
        "Vous avez échappé au coup de peu.",
        "Le combat reprend autour de vous dans un vacarme d'acier.",
        "Votre souffle reste court, mais votre garde est intacte."
      ]
    },
    'Parade réussie': {
      openings: [
        "Vous levez votre arme juste à temps",
        "Votre garde se referme au moment où le coup arrive",
        "Vous ancrez vos pieds et présentez votre défense",
        "D'un mouvement maîtrisé, vous déviez l'attaque adverse",
        "Vous interposez votre bouclier dans un geste sec"
      ],
      impacts: [
        "Les armes s'entrechoquent dans un fracas métallique.",
        "Une gerbe d'étincelles éclate entre vous.",
        "Le choc fait vibrer votre bras jusqu'à l'épaule.",
        "L'attaque glisse le long de votre garde sans vous atteindre.",
        "Le coup est détourné dans un grincement d'acier."
      ],
      reactions: [
        "Votre adversaire doit rompre son élan pour se rétablir.",
        "Vous tenez votre position malgré la force de l'impact.",
        "L'assaillant se retrouve momentanément à découvert.",
        "Vos appuis tiennent et vous restez face à lui."
      ],
      endings: [
        "Le son du métal résonne encore dans l'air.",
        "Vous n'avez pas cédé un pouce de terrain.",
        "Le tumulte du combat reprend aussitôt ses droits."
      ]
    },
    'Défense ratée': {
      openings: [
        "Votre garde s'ouvre au mauvais moment",
        "Vous réagissez une fraction de seconde trop tard",
        "Votre défense cède sous la pression de l'assaut",
        "Vous tentez de détourner le coup, mais votre mouvement manque de force",
        "L'attaque adverse passe au travers de votre garde"
      ],
      impacts: [
        "Le choc vous atteint de plein fouet.",
        "Une douleur vive traverse votre corps.",
        "L'impact vous coupe brutalement le souffle.",
        "Le coup vous fait perdre vos appuis.",
        "Vous sentez la violence de l'attaque jusque dans vos os."
      ],
      reactions: [
        "Vous reculez, contraint de lutter pour rester debout.",
        "Votre vision se trouble un bref instant.",
        "Votre souffle se brise et vos muscles se crispent.",
        "Vous cherchez à reprendre votre garde malgré la douleur."
      ],
      endings: [
        "Le danger est toujours devant vous.",
        "Vous devez retrouver vos appuis sans attendre.",
        "Autour de vous, les combattants poursuivent leur affrontement."
      ]
    },
    'Blessure légère': {
      openings: ["Le coup vous atteint en biais", "Une lame vous effleure dans la mêlée", "Un choc sec vous arrache un mouvement de recul", "Vous sentez une brûlure soudaine vous traverser"],
      impacts: ["Une entaille superficielle apparaît sur votre peau.", "Le tissu se déchire et une fine ligne rouge marque votre chair.", "La douleur est vive, mais reste supportable.", "Quelques gouttes de sang viennent tacher vos vêtements."],
      reactions: ["Vous serrez les dents et gardez les yeux sur votre adversaire.", "Vous pouvez encore vous tenir droit, malgré la douleur.", "Votre main se crispe un instant avant de retrouver sa prise."],
      endings: ["La blessure est réelle, mais le combat n'est pas terminé.", "Vous reprenez votre souffle sans quitter la menace du regard."]
    },
    'Blessure sérieuse': {
      openings: ["Le coup vous atteint avec une force terrible", "L'arme adverse trouve une ouverture dans votre défense", "Un impact brutal vous plie en deux", "La douleur explose au point d'impact"],
      impacts: ["Une plaie profonde s'ouvre et le sang commence à couler.", "Votre souffle se bloque dans votre poitrine.", "La douleur irradie dans tout votre corps.", "Vos jambes fléchissent sous la violence du choc."],
      reactions: ["Vous devez lutter pour rester debout.", "Votre prise se relâche avant que vous ne resserriez les doigts.", "Chaque mouvement réclame désormais un effort."],
      endings: ["Le combat continue, mais votre état ne peut plus être ignoré.", "Le monde semble se resserrer autour de cette douleur."]
    },
    'Blessure grave': {
      openings: ["La violence du coup vous terrasse presque", "L'attaque vous frappe avec une force dévastatrice", "Votre corps encaisse un choc qui vous coupe les jambes", "Une douleur fulgurante vous submerge"],
      impacts: ["Votre vision se trouble et le sol semble vaciller.", "Le sang s'écoule rapidement de la blessure.", "Vos muscles se contractent malgré vous.", "Vous peinez à reprendre votre souffle."],
      reactions: ["Vous vacillez, incapable de dissimuler votre faiblesse.", "Vous cherchez un appui pour ne pas tomber.", "Le moindre mouvement devient une épreuve."],
      endings: ["Il vous faut toute votre volonté pour rester dans le combat.", "Le vacarme alentour vous parvient comme à travers un voile."]
    },
    'Blessure mortelle': {
      openings: ["Le coup vous transperce avec une violence irréparable", "La blessure vous frappe au cœur de vos forces", "Une douleur fulgurante vous traverse et vous coupe le souffle", "L'impact vous arrache toute stabilité"],
      impacts: ["Votre souffle se brise dans votre gorge.", "Vos forces vous abandonnent peu à peu.", "Le monde se trouble tandis que vos jambes cèdent.", "La chaleur de votre sang s'étend sous vos vêtements."],
      reactions: ["Vous luttez pour garder les yeux ouverts.", "Vos doigts se desserrent malgré vos efforts.", "Chaque inspiration devient un combat en soi."],
      endings: ["Le bruit des armes s'éloigne peu à peu.", "Le sol se rapproche tandis que vos forces vous quittent."]
    },
    'Adversaire terrassé': {
      openings: ["Votre adversaire s'effondre lourdement", "Le dernier échange brise enfin la résistance de votre ennemi", "Ses jambes cèdent sous lui", "Votre adversaire tombe à genoux avant de basculer au sol"],
      impacts: ["Son arme lui échappe dans un cliquetis.", "Son corps heurte la terre dans un bruit sourd.", "Un nuage de poussière se soulève autour de lui.", "Sa garde disparaît et il ne trouve plus la force de se relever."],
      reactions: ["Il reste immobile, vaincu.", "Sa respiration demeure faible et irrégulière.", "Le silence s'installe autour de sa chute."],
      endings: ["Un adversaire de moins se dresse désormais devant vous.", "Le combat n'est peut-être pas terminé pour autant."]
    },
    'Coup fatal': {
      openings: ["Votre dernière frappe atteint son but", "Vous trouvez l'ouverture décisive", "Votre arme s'abat dans un mouvement sans retour", "Le coup porte avec une précision implacable"],
      impacts: ["Le corps de votre adversaire se raidit.", "Son arme tombe au sol avant lui.", "Un souffle étranglé s'échappe de ses lèvres.", "Ses forces le quittent et il s'écroule."],
      reactions: ["Il ne se relève pas.", "Son regard perd peu à peu sa lumière.", "Le mouvement cesse, laissant place au silence."],
      endings: ["L'affrontement vient de trouver son terme.", "Il ne reste que le bruit du vent et des armes au loin."]
    },
    'Exécution': {
      openings: ["Vous vous approchez de l'adversaire vaincu", "Votre ennemi ne peut plus se défendre", "Vous le dominez tandis qu'il tente vainement de se redresser", "Vous levez votre arme au-dessus de celui qui est à votre merci"],
      impacts: ["Votre geste est bref et sans hésitation.", "L'acier s'abat dans un silence pesant.", "Le mouvement s'achève avant qu'il puisse réagir.", "Un dernier souffle lui échappe."],
      reactions: ["Son corps retombe inerte.", "Le silence retombe sur la scène.", "Personne ne bouge pendant un bref instant."],
      endings: ["Il n'y aura pas de second affrontement.", "Le prix de ce geste demeure suspendu dans l'air."]
    },
    'Dernier souffle': {
      openings: ["Un râle s'échappe de sa gorge", "Sa poitrine se soulève avec difficulté", "Ses doigts se crispent une dernière fois", "Son regard cherche encore quelque chose dans le vide"],
      impacts: ["Une inspiration tremblante lui échappe.", "Ses lèvres remuent sans qu'aucun mot n'en sorte.", "Sa main retombe lentement sur le sol.", "Son souffle devient de plus en plus faible."],
      reactions: ["Puis son corps s'immobilise.", "Ses yeux se figent et ne suivent plus rien.", "Le silence prend la place de sa respiration."],
      endings: ["Le combat est terminé pour lui.", "Il ne reste que le silence après le dernier souffle."]
    },
    'Aberration': {
      openings: ["L'aberration se contorsionne dans un mouvement impossible", "La créature se redresse avec un craquement humide", "Sa silhouette semble se défaire puis se recomposer", "Une masse informe glisse hors de l'ombre"],
      impacts: ["Des membres trop nombreux s'agitent sous sa peau.", "Sa chair ondule comme si quelque chose remuait à l'intérieur.", "Ses articulations plient dans des directions contre nature.", "Un son humide accompagne chacun de ses mouvements."],
      reactions: ["Elle avance sans tenir compte de sa propre anatomie.", "Sa présence trouble les sens et glace le sang.", "Elle semble réagir à des choses que vous ne percevez pas."],
      endings: ["Rien dans cette créature ne semble obéir aux lois du vivant.", "Sa seule présence rend l'air lourd et malsain."]
    },
    'Bête': {
      openings: ["La bête baisse la tête et retrousse ses babines", "Un grondement sourd monte de la gorge de la créature", "L'animal gratte le sol de ses griffes", "La bête se ramasse sur elle-même"],
      impacts: ["Ses muscles se tendent sous son pelage.", "Ses crocs luisent dans un souffle rauque.", "Ses griffes labourent la terre.", "Ses yeux restent fixés sur votre gorge."],
      reactions: ["Elle attend le moment propice pour bondir.", "Son grondement s'intensifie à mesure qu'elle approche.", "Elle tourne autour de vous, cherchant une faille."],
      endings: ["L'instinct guide chacun de ses mouvements.", "Vous sentez que le moindre faux pas suffirait à déclencher l'assaut."]
    },
    'Artificiel': {
      openings: ["L'automate pivote dans un grincement de métal", "La créature mécanique redresse lentement la tête", "Des engrenages s'animent sous sa carcasse", "L'être artificiel avance d'un pas régulier"],
      impacts: ["Ses articulations claquent avec une précision froide.", "Des étincelles jaillissent d'une jointure endommagée.", "Un mécanisme interne émet un cliquetis soutenu.", "Ses membres se verrouillent dans un mouvement calculé."],
      reactions: ["Aucune hésitation ne trouble sa progression.", "Son regard demeure vide et immobile.", "Il poursuit son mouvement comme si rien ne pouvait l'arrêter."],
      endings: ["Aucune émotion ne transparaît de cette carcasse.", "Seul le bruit de ses mécanismes trahit sa présence."]
    },
    'Dragon': {
      openings: ["Le dragon déploie ses ailes immenses", "La créature antique redresse son cou écailleux", "Un grondement profond monte de la poitrine du dragon", "Le dragon tourne vers vous ses yeux brûlants"],
      impacts: ["Ses écailles captent la lumière comme des plaques de métal.", "Une haleine brûlante s'échappe de ses mâchoires.", "Ses griffes labourent le sol dans un crissement pierreux.", "L'air vibre sous la puissance de son rugissement."],
      reactions: ["Sa masse impose sa présence à tout le champ de bataille.", "Il vous observe avec une intelligence ancienne.", "Chaque mouvement rappelle la puissance qui sommeille en lui."],
      endings: ["Vous faites face à une créature dont l'âge dépasse les royaumes.", "Le sol tremble sous son poids."]
    },
    'Mort-vivant': {
      openings: ["Le mort-vivant avance d'un pas traînant", "Un râle s'échappe de sa gorge desséchée", "La créature relève lentement sa tête décharnée", "Ses membres se mettent en mouvement dans un craquement sinistre"],
      impacts: ["Ses os grincent sous une chair morte.", "Une odeur de terre humide et de décomposition l'accompagne.", "Ses doigts noueux se referment dans le vide.", "Sa mâchoire pend dans un rictus immobile."],
      reactions: ["Rien ne semble pouvoir l'effrayer.", "Il poursuit sa marche sans manifester la moindre douleur.", "Son regard vide reste fixé sur vous."],
      endings: ["La mort elle-même semble avoir refusé de le garder.", "Un froid étrange accompagne son approche."]
    },
    'Plante': {
      openings: ["Les racines se contractent sous la terre", "Des lianes jaillissent autour de la créature", "La plante monstrueuse déploie ses branches noueuses", "Un bruissement profond parcourt son feuillage"],
      impacts: ["Des épines se dressent le long de ses tiges.", "Ses lianes fouettent l'air avec une force surprenante.", "Des racines épaisses déchirent le sol.", "Une sève sombre perle le long de son écorce."],
      reactions: ["La créature semble réagir à chacun de vos mouvements.", "Son feuillage frémit comme agité par un souffle invisible.", "Elle referme lentement ses lianes autour de l'espace qui vous sépare."],
      endings: ["Une odeur de terre retournée emplit l'air.", "La végétation autour d'elle semble elle aussi prendre vie."]
    }
  };


  // Enrichissement narratif : nouvelles variations pour éviter les scènes interchangeables.
  // Le moteur reste descriptif et ne décide jamais des conséquences mécaniques.
  const narrativeEnhancements = {
    'Attaque réussie': {
      openings: ["Vous feintez d'un mouvement de l'épaule avant de changer brusquement d'angle", "Vous attendez que son arme s'écarte, puis vous vous engouffrez dans l'ouverture", "Votre pas chasse la distance et votre attaque jaillit sans prévenir", "Vous détournez son attention d'un geste bref avant de porter votre coup"],
      impacts: ["et votre tranchant ouvre une ligne rouge sur son flanc", "et l'acier heurte sa protection avant de trouver la chair", "et le coup frappe sous sa garde dans un claquement brutal", "et votre arme entame sa défense dans un choc qui résonne jusque dans vos épaules"],
      reactions: ["Il serre les dents et tente de masquer sa douleur derrière une nouvelle garde.", "Sa respiration se fait irrégulière ; son regard revient aussitôt vers vous.", "Il perd un instant le fil de l'échange, juste assez pour mesurer votre avantage.", "Une trace sombre s'étend sur son vêtement tandis qu'il réajuste sa posture."],
      endings: ["Vous ne lui laissez pas le loisir de reprendre pleinement l'initiative.", "Le prochain échange se jouera avant même que l'écho du choc ne s'éteigne.", "Autour de vous, les cris et le fracas des armes couvrent déjà le bruit de l'impact."]
    },
    'Attaque critique': {
      openings: ["Vous lisez son mouvement avant même qu'il ne l'achève", "Dans un éclair de lucidité, vous abandonnez toute retenue et frappez", "Vous brisez le rythme de l'affrontement par une attaque fulgurante", "Votre regard trouve la faille ; votre corps s'y engouffre avec une précision implacable"],
      impacts: ["et votre arme traverse sa défense dans un fracas brutal", "et le coup s'abat avec une force qui semble faire trembler le sol", "et l'acier frappe avec une précision chirurgicale, là où la protection ne couvre plus rien", "et l'impact déchire le silence comme un coup de tonnerre"],
      reactions: ["Sa posture se disloque et son arme manque de lui échapper.", "Il reste un instant figé, incapable de répondre à la violence du coup.", "Son visage se contracte ; toute assurance a disparu de son regard.", "Ses appuis cèdent et il doit lutter pour ne pas s'effondrer."],
      endings: ["Pendant un battement de cœur, votre adversaire ne semble plus voir que vous.", "La brutalité de l'échange laisse les combattants proches suspendus un instant.", "Vous venez de prendre l'ascendant, mais le combat n'a pas encore livré son verdict."]
    },
    'Attaque ratée': {
      openings: ["Vous amorcez une feinte, mais votre adversaire ne mord pas", "Votre attaque part avec un instant de retard", "Vous cherchez à forcer le passage et votre mouvement devient trop prévisible", "Votre lame décrit un large arc, mais la cible a déjà changé de place"],
      impacts: ["L'acier ne fait que griffer la pierre dans une pluie d'étincelles.", "Votre arme frappe le vide et votre élan vous entraîne trop loin.", "Le coup s'écrase contre un bouclier présenté au dernier instant.", "Votre pointe passe à côté et ne laisse qu'un souffle dans son sillage."],
      reactions: ["L'adversaire a désormais une vue nette sur votre flanc découvert.", "Il profite de votre mouvement pour se replacer hors de portée.", "Vous devez rompre votre élan et reconstruire votre garde.", "Son regard suit votre arme ; il a compris votre intention."],
      endings: ["La moindre hésitation pourrait lui offrir une ouverture.", "Vous reprenez vos appuis tandis que l'affrontement se poursuit.", "Le temps de corriger votre erreur, votre adversaire est déjà en mouvement."]
    },
    'Distance touchée': {
      openings: ["Vous retenez votre souffle, alignez votre cible et libérez le trait", "Profitant d'un intervalle entre deux combattants, vous décochez", "Votre bras se tend et le projectile quitte la corde dans un claquement sec", "Vous ajustez votre tir au milieu du tumulte"],
      impacts: ["et le projectile se fiche dans la cible avec un bruit sourd", "et la pointe trouve une ouverture entre deux pièces d'armure", "et le trait frappe avec une netteté presque sèche", "et l'impact arrache un sursaut à votre adversaire"],
      reactions: ["La cible porte la main à l'endroit frappé sans vous quitter des yeux.", "Son mouvement se brise, mais elle demeure dans le combat.", "Un bref cri se perd parmi les clameurs du champ de bataille.", "Le projectile tremble encore tandis que l'adversaire cherche à vous repérer."],
      endings: ["Vous avez déjà une main prête à saisir un nouveau projectile.", "La distance vous protège encore, mais votre position est désormais connue.", "Le combat ne vous accorde qu'un instant avant le prochain mouvement."]
    },
    'Distance critique': {
      openings: ["Vous attendez l'instant exact où la cible se découvre", "Votre visée se fixe sur une faille minuscule et vous relâchez le tir", "Vous ne cherchez pas la vitesse, mais le point juste", "Au cœur du chaos, votre geste demeure parfaitement maîtrisé"],
      impacts: ["et le projectile frappe avec une précision foudroyante", "et le trait traverse la protection à l'endroit le plus vulnérable", "et la pointe se plante profondément dans sa cible", "et le tir atteint un point exposé avec une violence sèche"],
      reactions: ["L'adversaire se plie sous le choc, incapable de dissimuler l'atteinte.", "Son geste s'interrompt net et son regard se vide un instant.", "Il chancelle, sa défense entièrement désorganisée.", "La douleur lui arrache un cri qui domine brièvement le vacarme."],
      endings: ["Votre précision vient de transformer l'équilibre de l'affrontement.", "Le silence d'une fraction de seconde est aussitôt englouti par le tumulte.", "Vous avez frappé juste ; à présent, tout dépendra de la suite du combat."]
    },
    'Distance ratée': {
      openings: ["Vous relâchez votre tir au moment où la cible rompt sa trajectoire", "Le projectile quitte votre arme, mais votre adversaire change brusquement d'appui", "Vous décochez dans l'ouverture qui se referme déjà", "Votre tir fend l'espace entre les combattants"],
      impacts: ["Le trait ricoche contre la pierre et disparaît dans la poussière.", "Le projectile se plante dans le bois derrière sa cible.", "La flèche frôle une épaule avant de poursuivre sa course.", "Votre tir se perd au-dessus de la mêlée."],
      reactions: ["Votre adversaire a repéré votre position et tourne son attention vers vous.", "L'occasion est passée ; il vous faut déjà retrouver une ligne de tir.", "La cible poursuit son mouvement sans ralentir.", "Vous sentez que le prochain tir exigera une meilleure ouverture."],
      endings: ["Le claquement du tir se dissout dans le vacarme.", "Vous réajustez votre position tandis que la mêlée se déplace.", "La bataille ne vous laisse pas le temps de regretter ce projectile perdu."]
    },
    'Esquive réussie': {
      openings: ["Vous abandonnez votre position au moment précis où l'arme s'abat", "Votre bassin pivote et vos pieds vous arrachent à la trajectoire", "Vous vous laissez tomber sous la frappe, presque au ras du sol", "Un pas de côté suffit : vous quittez la ligne de mort"],
      impacts: ["La lame passe dans un souffle à l'endroit où se trouvait votre gorge.", "L'arme ennemie s'écrase contre le sol et fait voler des éclats.", "Le coup ne rencontre que votre manteau, qu'il déchire au passage.", "La frappe traverse l'espace vide et entraîne votre adversaire dans son élan."],
      reactions: ["Vous retrouvez un angle que votre adversaire ne peut pas immédiatement couvrir.", "L'assaillant doit se retourner pour vous faire face.", "Votre mouvement vous éloigne du danger sans rompre votre vigilance.", "Vous restez mobile, prêt à exploiter l'instant gagné."],
      endings: ["Le souffle vous revient tandis que l'acier se remet à chanter.", "Vous avez échappé à la frappe d'un cheveu.", "Un pas de plus, et le coup aurait trouvé sa cible."]
    },
    'Parade réussie': {
      openings: ["Vous croisez votre arme devant vous et verrouillez votre garde", "Vous avancez au-devant du coup plutôt que de le subir", "Votre bouclier pivote juste avant l'impact", "Vous accompagnez la frappe adverse pour en détourner la force"],
      impacts: ["Le choc éclate dans un grondement de métal.", "Les deux armes se heurtent et une vibration remonte le long de vos bras.", "L'attaque glisse sur votre défense dans un crissement aigu.", "Une gerbe d'étincelles jaillit au point de contact."],
      reactions: ["Votre adversaire doit réarmer son geste tandis que vous tenez votre position.", "Son attaque est déviée et son épaule s'ouvre un instant.", "Vous absorbez la poussée sans laisser vos pieds glisser.", "Le mouvement adverse s'éteint contre votre garde."],
      endings: ["Vous avez gagné un instant, pas encore la victoire.", "Le fracas résonne entre vous avant que chacun ne retrouve sa garde.", "Vous demeurez face à lui, prêt à répondre au prochain assaut."]
    },
    'Défense ratée': {
      openings: ["Vous levez votre garde trop tard", "Votre parade manque son point d'appui et se désagrège sous l'assaut", "Vous tentez de pivoter, mais votre pied accroche le sol", "La défense se referme mal et laisse une ouverture béante"],
      impacts: ["L'arme adverse franchit votre garde et vous frappe sans détour.", "Le choc vous percute aux côtes et chasse l'air de vos poumons.", "Une douleur fulgurante éclate au point d'impact.", "Le coup heurte votre protection avec une force qui vous déséquilibre."],
      reactions: ["Votre corps accuse le choc avant que vous puissiez retrouver vos appuis.", "Votre garde est rompue et l'adversaire reste dangereusement proche.", "Vous devez lutter contre la douleur pour relever votre arme.", "Un instant de confusion vous empêche de lire le mouvement suivant."],
      endings: ["Le combat continue, mais vous avez perdu le contrôle de cet échange.", "Vous rassemblez vos forces tandis que la menace reste à portée.", "Le prochain mouvement devra être défensif si vous voulez tenir." ]
    },
    'Blessure légère': {
      openings: ["Une pointe trouve le passage entre deux pièces de votre armure", "Le tranchant vous cueille au détour d'un mouvement", "Un éclat ou une lame vous entaille dans la confusion", "Vous sentez une brûlure vive courir sur votre peau"],
      impacts: ["Une coupure fine perle aussitôt de sang.", "Le tissu se fend et une ligne rouge apparaît sur votre peau.", "La douleur pique, précise, sans vous couper vos moyens.", "Une éraflure cuisante marque votre bras."],
      reactions: ["Vous serrez les dents et conservez votre prise.", "Votre attention revient aussitôt sur la menace.", "Vous éprouvez la blessure d'un mouvement bref, puis reprenez votre garde.", "La douleur reste présente, mais ne détourne pas votre regard."],
      endings: ["Ce n'est qu'une entaille ; le combat, lui, ne ralentit pas.", "Le sang est peu abondant, mais la marque restera visible.", "Vous n'avez pas le loisir de vous en occuper maintenant."]
    },
    'Blessure sérieuse': {
      openings: ["Le coup passe votre défense et vous atteint de plein fouet", "Une lame s'enfonce assez profondément pour vous arracher un cri", "L'impact vous prend de côté et vous coupe le souffle", "Votre protection cède sous une frappe particulièrement lourde"],
      impacts: ["Une plaie profonde s'ouvre et le sang imbibe vos vêtements.", "Une douleur sourde irradie depuis le point d'impact.", "Votre souffle se bloque tandis que vos muscles se contractent.", "La blessure vous arrache un mouvement de recul incontrôlé."],
      reactions: ["Vous devez réorganiser votre posture pour continuer à tenir votre arme.", "Votre regard se trouble, puis se fixe à nouveau sur l'adversaire.", "Chaque mouvement sollicite désormais la zone blessée.", "Votre corps vous rappelle brutalement le prix de cet échange."],
      endings: ["La blessure pèsera sur chacun de vos gestes à venir.", "Vous tenez encore, mais la douleur ne vous laissera aucun répit.", "Le combat continue autour de vous comme si rien ne s'était passé."]
    },
    'Blessure grave': {
      openings: ["La frappe vous atteint avec une violence qui vous plie en deux", "Votre corps encaisse un choc terrible au cœur de la mêlée", "L'arme adverse trouve une ouverture et s'y enfonce profondément", "Un impact brutal vous arrache presque le sol sous les pieds"],
      impacts: ["La douleur vous submerge et votre vision se couvre de taches sombres.", "Le sang s'écoule rapidement le long de votre corps.", "Un craquement sinistre accompagne le choc.", "Vos forces vacillent sous la brutalité de la blessure."],
      reactions: ["Vous cherchez un appui pour ne pas vous effondrer.", "Votre arme devient soudain lourde dans votre main.", "Vous devez puiser dans vos dernières forces pour rester dans l'affrontement.", "Votre respiration se fait courte et laborieuse."],
      endings: ["Vous ne pourrez pas ignorer longtemps une blessure pareille.", "Le monde vacille, mais la menace est toujours là.", "Chaque seconde passée debout devient une lutte en soi."]
    },
    'Blessure mortelle': {
      openings: ["Le coup vous atteint avec une précision fatale", "Une douleur blanche vous traverse et efface un instant tout le reste", "La blessure frappe au-delà de ce que votre corps peut endurer", "L'impact vous arrache vos forces d'un seul coup"],
      impacts: ["Votre souffle se brise dans votre gorge.", "La chaleur du sang se répand sous vos vêtements.", "Vos jambes se dérobent et le monde bascule autour de vous.", "Chaque inspiration devient une lutte désespérée."],
      reactions: ["Vos doigts s'ouvrent malgré vous et votre arme vous échappe presque.", "Les sons du combat semblent s'éloigner derrière un voile épais.", "Vous luttez pour garder les yeux ouverts.", "Votre corps ne répond plus qu'avec un retard terrible."],
      endings: ["Tout se joue désormais dans les quelques forces qui vous restent.", "La frontière entre conscience et ténèbres se rapproche.", "Autour de vous, le combat continue sans attendre."]
    },
    'Adversaire terrassé': {
      openings: ["La résistance de votre adversaire finit par se briser", "Un dernier échange lui arrache ses appuis", "Votre ennemi ne parvient plus à soutenir sa garde", "La fatigue et les coups ont finalement raison de lui"],
      impacts: ["Il s'affaisse contre le sol, son arme glissant hors de portée.", "Ses genoux heurtent la terre avant que son corps ne bascule.", "Il tombe lourdement dans la poussière.", "Sa défense s'effondre et il ne trouve plus la force de se relever."],
      reactions: ["Sa poitrine se soulève encore, mais il ne représente plus une menace immédiate.", "Il tente de bouger, puis retombe, vidé de ses forces.", "Son regard cherche encore votre silhouette sans parvenir à se fixer.", "Le silence autour de lui contraste avec le tumulte du combat."],
      endings: ["La victoire de cet échange est acquise ; le champ de bataille, lui, reste vivant.", "Vous pouvez enfin tourner votre attention vers les autres adversaires.", "La poussière retombe sur celui qui vient de céder."]
    },
    'Coup fatal': {
      openings: ["Vous saisissez l'ultime ouverture et portez le coup décisif", "Votre arme suit une trajectoire sans retour", "L'adversaire ne peut plus éviter votre dernière frappe", "Vous rassemblez votre dernier élan dans un geste définitif"],
      impacts: ["Le coup atteint sa cible et toute résistance s'éteint.", "L'acier frappe avec un bruit mat, puis le corps s'affaisse.", "Son arme tombe avant que ses jambes ne cèdent.", "L'impact met un terme brutal à son mouvement."],
      reactions: ["Il ne parvient pas à se relever.", "Son regard se perd tandis que son corps devient inerte.", "Un dernier souffle quitte ses lèvres.", "Le mouvement quitte peu à peu ses membres."],
      endings: ["L'affrontement vient de trouver son terme pour lui.", "Le vacarme reprend autour de vous, indifférent à cette fin.", "Il ne reste qu'un corps immobile là où se tenait votre adversaire."]
    },
    'Exécution': {
      openings: ["Vous vous tenez au-dessus de l'adversaire désarmé", "Votre ennemi ne peut plus opposer la moindre défense", "Vous le regardez une dernière fois avant d'abattre votre arme", "Le temps semble se resserrer autour de votre décision"],
      impacts: ["Votre geste est bref, précis et sans hésitation.", "L'acier s'abat dans un bruit sourd.", "La lame met fin à ses derniers mouvements.", "Le coup tranche court à toute possibilité de retour."],
      reactions: ["Son corps retombe et ne bouge plus.", "Un dernier souffle s'échappe avant que le silence ne s'installe.", "La vie quitte son regard.", "Plus aucun mouvement ne vient troubler la scène."],
      endings: ["Le geste est accompli ; son poids demeure.", "Le champ de bataille ne s'arrête pas pour autant.", "Le silence qui suit ne dure qu'un instant."]
    },
    'Dernier souffle': {
      openings: ["Sa poitrine se soulève dans un effort presque imperceptible", "Ses doigts cherchent une dernière fois à se refermer", "Un souffle râpeux remonte de sa gorge", "Son regard s'attarde sur quelque chose que vous ne voyez pas"],
      impacts: ["Une inspiration tremblante lui échappe.", "Ses lèvres bougent sans parvenir à former un mot.", "Sa main retombe lentement contre la terre.", "Son souffle s'interrompt au milieu d'une expiration."],
      reactions: ["Puis son corps s'immobilise.", "Ses yeux cessent de suivre les mouvements autour de lui.", "La tension quitte peu à peu ses traits.", "Il n'y a plus de lutte dans ses membres."],
      endings: ["Le combat a cessé pour lui.", "Il ne reste que le bruit lointain des armes.", "Un silence bref accompagne cette fin."]
    }
  };
  Object.assign(narrativeEnhancements, {
    'Aberration': { openings: ["La chose se déplie depuis l'ombre dans un froissement humide", "Une masse difforme se hisse sur des membres qui n'ont pas leur place", "L'aberration tourne vers vous une face qui semble changer à chaque regard"], impacts: ["Sa chair se contracte en vagues sous une peau trop tendue.", "Des appendices fouettent l'air dans un mouvement désordonné.", "Un craquement mou accompagne une torsion impossible de son torse."], reactions: ["Elle avance sans rythme perceptible, comme si elle ignorait la peur.", "Sa présence dérègle vos repères et rend chacun de ses gestes imprévisible.", "Quelque chose remue sous sa peau, à contretemps de ses mouvements."], endings: ["Rien dans cette chose ne rappelle un être vivant ordinaire.", "L'air semble se charger d'une odeur âcre et étrangère."] },
    'Bête': { openings: ["La bête s'aplatit sur ses pattes, prête à bondir", "L'animal tourne autour de vous en gardant les crocs découverts", "Un grondement profond monte de sa poitrine"], impacts: ["Ses griffes labourent la terre et projettent des mottes derrière elle.", "Ses muscles roulent sous le pelage à chacun de ses pas.", "Sa mâchoire s'ouvre sur une rangée de crocs luisants."], reactions: ["Elle jauge votre moindre mouvement avant de choisir son angle d'attaque.", "Son instinct semble guider chacun de ses déplacements.", "Elle ne vous quitte pas des yeux et attend une faiblesse."], endings: ["Vous sentez la menace animale dans chacun de ses gestes.", "Un faux pas suffirait à déclencher son assaut."] },
    'Artificiel': { openings: ["L'automate s'éveille dans un déclic métallique", "Une lueur froide s'allume au fond de ses orbites", "La carcasse pivote avec une régularité mécanique"], impacts: ["Des pistons sifflent tandis que ses articulations se verrouillent.", "Des engrenages grincent sous les plaques de métal.", "Une étincelle bleue jaillit d'une jointure puis disparaît."], reactions: ["Il poursuit sa progression sans marquer la moindre hésitation.", "Aucune douleur ni émotion ne semble infléchir son mouvement.", "Sa tête se tourne vers vous avec une précision inquiétante."], endings: ["La machine ne connaît ni fatigue ni doute.", "Seul le rythme de ses mécanismes trouble le silence."] },
    'Dragon': { openings: ["Le dragon redresse lentement son immense tête", "Ses ailes s'ouvrent et plongent les alentours dans leur ombre", "La créature antique tourne vers vous ses yeux brûlants"], impacts: ["Ses griffes creusent la pierre comme une terre meuble.", "Une haleine brûlante ondule entre ses crocs.", "Ses écailles s'entrechoquent dans un grondement sourd."], reactions: ["Il vous observe avec une intelligence ancienne et terrible.", "Sa masse écrase tout sentiment de sécurité autour de lui.", "Un grondement roule dans sa poitrine avant même qu'il ne bouge."], endings: ["Vous faites face à une puissance qui dépasse de loin celle d'un simple prédateur.", "Le sol tremble sous son poids et l'air devient irrespirable."] },
    'Mort-vivant': { openings: ["La silhouette morte se redresse avec une lenteur contre nature", "Un cadavre animé traîne ses pas dans votre direction", "La créature relève un visage où la vie s'est éteinte depuis longtemps"], impacts: ["Ses articulations craquent comme des branches sèches.", "Des lambeaux de chair pendent à ses membres.", "Ses doigts osseux se referment et s'ouvrent dans le vide."], reactions: ["Il ne manifeste aucune crainte et ne semble pas sentir la douleur.", "Son regard vide demeure fixé sur vous.", "Il avance malgré les obstacles qui devraient arrêter un vivant."], endings: ["La mort n'a pas suffi à retenir cette chose.", "Une odeur de terre froide accompagne chacun de ses pas."] },
    'Plante': { openings: ["Les racines frémissent sous la terre avant que la créature ne s'éveille", "Des lianes se déploient lentement autour de son tronc noueux", "Le feuillage se met à bruisser alors qu'aucun vent ne souffle"], impacts: ["Des épines longues comme des dagues jaillissent de ses tiges.", "Ses racines déchirent le sol dans un grondement sourd.", "Une sève sombre perle le long de son écorce."], reactions: ["La plante semble réagir à votre présence plutôt qu'à vos mouvements.", "Ses lianes cherchent à refermer l'espace autour de vous.", "Le feuillage frémit comme une multitude de doigts impatients."], endings: ["La végétation alentour paraît retenir son souffle.", "Une odeur de terre retournée et de sève envahit l'air."] }
  });
  for (const [label, additions] of Object.entries(narrativeEnhancements)) {
    const profile = narrativeProfiles[label];
    if (!profile) continue;
    for (const [part, fragments] of Object.entries(additions)) profile[part].push(...fragments);
  }

  const recentFragments = new Map();
  function pickFragment(label, part, fragments) {
    const key = `${label}:${part}`;
    let previous = recentFragments.get(key) || [];
    let available = fragments.filter(value => !previous.includes(value));
    if (!available.length) available = fragments.slice();
    const chosen = available[Math.floor(Math.random() * available.length)];
    previous = [chosen, ...previous].slice(0, Math.min(3, fragments.length - 1));
    recentFragments.set(key, previous);
    return chosen;
  }

  function composeNarrative(item) {
    const profile = narrativeProfiles[item.label];
    if (!profile) {
      const index = variantIndex[item.label] || 0;
      variantIndex[item.label] = index + 1;
      return item.lines[index % item.lines.length];
    }
    const opening = pickFragment(item.label, 'opening', profile.openings);
    const impact = pickFragment(item.label, 'impact', profile.impacts);
    const reaction = pickFragment(item.label, 'reaction', profile.reactions);
    const ending = pickFragment(item.label, 'ending', profile.endings);
    // Trois phrases : geste, conséquence physique, puis retombée narrative.
    const first = `${opening.charAt(0).toUpperCase()}${opening.slice(1)}.`;
    const second = `${impact} ${reaction}`;
    const third = ending;
    variantIndex[item.label] = (variantIndex[item.label] || 0) + 1;
    return `${first} ${second} ${third}`;
  }

  function generate(item, button) {
    const phrase = composeNarrative(item);
    resultEl.textContent = phrase;
    history.unshift({label:item.label,phrase});
    if(history.length>5) history.length=5;
    renderHistory();
    document.querySelectorAll('.action-button').forEach(b=>b.setAttribute('aria-pressed','false'));
    button.setAttribute('aria-pressed','true');
  }
  function renderActions(tab) {
    actionsEl.replaceChildren();
    content[tab].forEach(group=>{
      const section=document.createElement('section'); section.className='action-group';
      const heading=document.createElement('h2'); heading.className='section-title'; heading.textContent=group.title; section.append(heading);
      const grid=document.createElement('div'); grid.className='action-grid';
      group.items.forEach(item=>{
        const button=document.createElement('button'); button.type='button'; button.className='action-button'; button.setAttribute('aria-pressed','false');
        const symbol=document.createElement('span'); symbol.className='action-icon'; symbol.setAttribute('aria-hidden','true'); symbol.innerHTML=icon(actionIcons[item.label]);
        const label=document.createElement('span'); label.className='action-label'; label.textContent=item.label;
        button.append(symbol,label); button.addEventListener('click',()=>generate(item,button)); grid.append(button);
      });
      section.append(grid); actionsEl.append(section);
    });
  }
  document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));});
    renderActions(button.dataset.tab);
  }));
  $('#copy').addEventListener('click',async()=>{
    const status=$('#copy-status');
    try { await navigator.clipboard.writeText(resultEl.textContent); status.textContent='Copié !'; }
    catch { status.textContent='Copie indisponible dans ce navigateur.'; }
    window.setTimeout(()=>{status.textContent='';},2200);
  });
  $('#clear-history').addEventListener('click',()=>{history.length=0;renderHistory();});
  renderActions('combat');
});
