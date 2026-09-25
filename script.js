import { BOOKS, CHARACTERS, TRIBES, ARCS } from './data.js';


/* ============================================
   WINGS OF FIRE — Complete Data
   ============================================ */

const SERIES_INFO = {
  title: "Wings of Fire",
  author: "Tui T. Sutherland",
  publisher: "Scholastic Press",
  firstBook: "July 2012",
  totalBooks: 16,
  arcs: 4,
  genre: "Middle-Grade Epic Fantasy",
  description: "Wings of Fire is a bestselling middle-grade fantasy series by Tui T. Sutherland, published by Scholastic Press. The series follows the stories of dragons across two continents and four epic story arcs, totaling 16+ main novels. The world is inhabited by 10 dragon tribes, each with unique abilities and cultures."
};

/* Canonical tribe reference art from the Wings of Fire Wiki's tribe-reference
   category. These replace decorative emoji tokens in rendered UI. */
const WIKI_ART = Object.freeze({
  mud: 'https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest?cb=20170522180607',
  sea: 'https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest?cb=20231206022616',
  rain: 'https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest?cb=20200704113253',
  night: 'https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest?cb=20190703193003',
  sand: 'https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest?cb=20170522181909',
  ice: 'https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest?cb=20240823073539',
  sky: 'https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest?cb=20210921210053',
  hive: 'https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest?cb=20180623080016',
  silk: 'https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest?cb=20180601122354',
  leaf: 'https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest?cb=20180623080022',
  generic: 'https://static.wikia.nocookie.net/wingsoffire/images/4/41/Wings_of_Fire_16_Full_Edited.jpg/revision/latest/scale-to-width-down/600'
});
const LOCAL_ART_FALLBACK = 'IceTransparent.webp';

function wikiArtFor(tribe) {
  return WIKI_ART[tribe] || WIKI_ART.generic;
}

function renderWikiArt({ src, tribe, alt = 'Wings of Fire artwork', className = '', style = '' } = {}) {
  const fallback = wikiArtFor(tribe);
  const primary = src || fallback;
  const safeAlt = String(alt).replace(/"/g, '&quot;');
  const fallbackHandler = primary === fallback
    ? ` onerror="this.onerror=null;this.src='${LOCAL_ART_FALLBACK}'"`
    : ` onerror="if(this.dataset.fallback){this.onerror=null;this.src='${LOCAL_ART_FALLBACK}';}else{this.dataset.fallback='1';this.src='${fallback}';}"`;
  return `<img class="${className}" src="${primary}" alt="${safeAlt}" loading="lazy" decoding="async" referrerpolicy="no-referrer" style="${style}"${fallbackHandler}>`;
}

function renderWikiIcon(tribe, alt, size = 42) {
  return renderWikiArt({
    tribe,
    alt,
    className: 'wiki-art-icon',
    style: `width:${size}px;height:${size}px;object-fit:contain;display:block;`
  });
}

function libraryArtForCategory(key) {
  return ({ mainSeries: 'sky', legends: 'night', winglets: 'rain', graphicNovels: 'silk', guides: 'leaf' })[key] || 'generic';
}

const VARIED_ART = ['sky', 'rain', 'sea', 'night', 'sand', 'ice', 'hive', 'silk', 'leaf', 'mud'];

function rotateArt(preferred, index = 0) {
  const start = Math.max(0, VARIED_ART.indexOf(preferred));
  return VARIED_ART[(start + index) % VARIED_ART.length];
}

function newsArtFor(item, index = 0) {
  const text = `${item.title || ''} ${item.summary || ''}`.toLowerCase();
  let preferred = 'sky';
  if (text.includes('icewing') || text.includes('winter') || text.includes('snow')) preferred = 'ice';
  else if (text.includes('silkwing') || text.includes('blue') || text.includes('lost continent')) preferred = 'silk';
  else if (text.includes('leafwing') || text.includes('leaf')) preferred = 'leaf';
  else if (text.includes('hivewing') || text.includes('hive')) preferred = 'hive';
  else if (text.includes('seawing') || text.includes('sea')) preferred = 'sea';
  else if (text.includes('nightwing') || text.includes('darkstalker')) preferred = 'night';
  else if (text.includes('sandwing') || text.includes('scorching')) preferred = 'sand';
  else if (text.includes('mudwing') || text.includes('clay')) preferred = 'mud';
  else if (text.includes('rainwing') || text.includes('glory')) preferred = 'rain';
  else if (text.includes('skywing') || text.includes('peril')) preferred = 'sky';
  return rotateArt(preferred, index);
}

function locationArtFor(location, index = 0) {
  const text = String(location).toLowerCase();
  const preferred = text.includes('sea') || text.includes('ocean') || text.includes('reef') ? 'sea'
    : text.includes('ice') || text.includes('glacier') || text.includes('cave') ? 'ice'
      : text.includes('forest') || text.includes('rain') || text.includes('jungle') ? 'rain'
        : text.includes('desert') || text.includes('sand') || text.includes('den') ? 'sand'
          : text.includes('mountain') || text.includes('sky') ? 'sky' : 'night';
  return rotateArt(preferred, index);
}

function authorArtFor(kind, index = 0) {
  const preferred = kind === 'achievement' ? 'sky' : kind === 'work' ? 'silk' : 'night';
  return rotateArt(preferred, index);
}





const ANTAGONISTS = [
{
  id: "burn",
  name: "Burn",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  category: "antagonist",
  physical: "Massive SandWing, far bigger than either of her sisters, with pale yellow-gold scales crisscrossed in old battle scars and a vicious burn along her left flank. Her eyes are solid obsidian black with no whites at all. Her talons are long and stained dark from blood.",
  role: "Antagonist — Eldest Princess of the War of SandWing Succession",
  personality: ["Brutal", "Domineering", "Violent", "Controlling", "Unforgiving"],
  abilities: ["Immense physical strength, easily the most powerful combatant of the three warring sisters", "Commands a large, loyal army built from the SkyWing and MudWing alliance", "Collector of strange creatures and oddities, giving her a network of unusual informants", "Fearless and brutal in direct combat, rarely needing to rely on tricks or schemes"],
  description: "Burn is the eldest and most physically dangerous of Queen Oasis's three warring daughters, a princess who answers every problem with overwhelming force. She has no patience for prophecy, politics, or mercy — to Burn, the SandWing throne belongs to whoever is left standing when the killing stops. She murdered her own brothers for irritating her and crippled subordinates who questioned her judgment, and her soldiers obey her out of pure terror.",
  background: "Burn, Blister, and Blaze plunged Pyrrhia into the War of SandWing Succession after their mother, Queen Oasis, was murdered by treasure-hunting scavengers. As the strongest of the three, Burn allied with the SkyWings and later the MudWings, intent on simply outlasting and outfighting her sisters. She kept her brother Smolder alive only because he obeyed her without question, and she imprisoned the deposed SkyWing queen Scarlet as a 'guest' rather than killing her outright, for reasons of her own.",
  arcStory: "Burn hunts the dragonets of destiny throughout the war, certain that ending the prophecy will secure her claim to the throne. She murders the IceWing guardian Hvitur before the Brightest Night and later besieges Scarlet's arena hoping to add Sunny to her collection of oddities. In the climactic SandWing succession scene, Blister sends her a 'gift' box — Burn recognizes the hiss of a dragonbite viper inside and tries to use it against her sister, only for a second hidden viper to bite her own ankle, killing her instantly.",
  relationships: [
    { name: "Blister", relation: "Younger sister and rival claimant. The two avoided each other but were closer to one another than either was to Blaze — until Blister's final 'gift' killed her." },
    { name: "Blaze", relation: "Youngest sister and rival claimant, whom Burn was fully willing to kill to remove from the succession." },
    { name: "Smolder", relation: "Younger brother, the only sibling she spared. Kept compliant through constant threat of death." },
    { name: "Scarlet", relation: "Wartime ally and SkyWing queen. Burn used her as a living shield against dragonfire venom and later kept her prisoner." }
  ],
  quotes: ["\"No prophecy decides what happens to me. We can have peace when my sisters are dead and I am queen of the SandWings.\""]
},
{
  id: "blister",
  name: "Blister",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  category: "antagonist",
  physical: "A slender, calculating SandWing with the same solid black eyes as her sisters. Where Burn is built for combat, Blister is built for stillness and patience — she moves and speaks with deliberate precision, never wasting a motion.",
  role: "Antagonist — The Scheming Princess of the War of SandWing Succession",
  personality: ["Calculating", "Patient", "Manipulative", "Intelligent", "Ruthless"],
  abilities: ["Exceptional strategic and political mind, the most cunning of the three warring princesses", "Skilled poisoner, favoring dragonbite vipers and other subtle methods over open combat", "Forms alliances through negotiation and leverage rather than brute force", "Collector of rare and forbidden knowledge, including scrolls of animus magic"],
  description: "Blister is the schemer of the SandWing succession war, a princess who understood early that the throne could be won with patience and poison just as easily as with claws. She negotiated alliances with the SeaWings and courted the loyalty of scholars and animus dragons alike, always playing a longer game than her sisters realized. Cold and exacting, she rarely raises her voice — she doesn't need to.",
  background: "The middle daughter of Queen Oasis, Blister recognized that she could never out-muscle Burn or out-charm Blaze, so she built her power base through alliances, secrets, and carefully placed threats. She allied with the SeaWings and sought animus-touched objects to tip the war in her favor, always positioning herself to win by other dragons' hands rather than her own claws.",
  arcStory: "Blister attempts to win over the dragonets of destiny with reasoned arguments about her fitness to rule, believing herself the obvious rational choice for queen. When that fails, she resorts to the same brutal tools as her sisters — sending Burn a 'congratulatory gift' box rigged with two dragonbite vipers, intending to eliminate her rival in a final, decisive stroke disguised as a peace offering.",
  relationships: [
    { name: "Burn", relation: "Eldest sister and rival claimant, whom she ultimately killed with a poisoned 'gift' of dragonbite vipers." },
    { name: "Blaze", relation: "Youngest sister, whom Blister considered the weakest and least threatening of the three." },
    { name: "Queen Coral", relation: "SeaWing monarch and wartime ally, courted through diplomacy and shared strategic interest." }
  ],
  quotes: ["\"Of course it is, especially if it is from my clever little sister.\" — Burn, recognizing Blister's gift for what it was"]
},
{
  id: "blaze",
  name: "Blaze",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/33/Blaze_GN_Infobox.png/revision/latest/scale-to-width-down/330?cb=20200518032245",
  category: "antagonist",
  physical: "The youngest of Oasis's daughters, vain and self-absorbed in her appearance, with the same black eyes as her sisters but a noticeably less battle-scarred frame, since she relies on others to fight her battles for her.",
  role: "Antagonist — The Vain Princess of the War of SandWing Succession",
  personality: ["Vain", "Self-absorbed", "Lazy", "Easily flattered", "Surprisingly survives by luck"],
  abilities: ["Skilled at securing protectors and allies through charm and flattery rather than personal combat", "Adept at avoiding direct danger, having survived the entire war largely by letting others fight for her", "Persuasive when it benefits her directly"],
  description: "Blaze is the least dangerous of the three warring SandWing princesses in personal combat, but she compensates with an uncanny ability to convince others to fight and die on her behalf. Obsessed with her own appearance and comfort, she treats the war as an inconvenience to be delegated rather than a cause to lead personally, surrounding herself with soldiers like Six-Claws who do the actual fighting.",
  background: "The youngest daughter of Queen Oasis, Blaze was driven out of the SandWing palace by her sisters Burn and Blister early in the succession crisis. Rather than building an army through fear or cunning, she relied on loyal protectors and a gift for making others feel important to her cause, surviving years of war largely by staying out of the worst of the fighting.",
  arcStory: "Blaze courts the dragonets of destiny by appealing to vanity and comfort rather than threats, offering them an easy, indulgent life if they simply choose her as queen. Unlike her sisters, she survives the climactic confrontation at the stronghold — when Burn dies from Blister's poisoned gift, Blaze is left as one of the only royal claimants still standing, though the dragonets ultimately choose Thorn as the new queen instead.",
  relationships: [
    { name: "Burn", relation: "Eldest sister and rival claimant, who was fully prepared to kill Blaze to remove her from the succession." },
    { name: "Blister", relation: "Middle sister and rival claimant, who once conspired with Burn to lure Blaze into a fatal sandstorm." },
    { name: "Six-Claws", relation: "Loyal general who rescued her from her sisters' ambush and protected her for years afterward." }
  ],
  quotes: []
},
{
  id: "morrowseer",
  name: "Morrowseer",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/37/MorrowseerGN2.png/revision/latest/scale-to-width-down/368?cb=20201229194220",
  category: "antagonist",
  physical: "A large, imposing NightWing with shimmering black scales that seem to absorb the light around him, and the silver-flecked eyes characteristic of a NightWing born with both fire-breathing and future-sight — though his prophetic visions are far weaker than he ever admits.",
  role: "Antagonist — Architect of the Dragonet Prophecy",
  personality: ["Manipulative", "Arrogant", "Secretive", "Ruthless", "Tribalist"],
  abilities: ["Fire-breathing, a rare trait among NightWings", "Claims limited future-sight, though his actual prophetic ability is exaggerated", "Master manipulator who orchestrated the entire Talons of Peace movement to serve NightWing interests", "Commands absolute loyalty from NightWing assassins like Deathbringer"],
  description: "Morrowseer is the NightWing mastermind behind the so-called Dragonet Prophecy — not a divine vision at all, but a fabrication he engineered to manipulate the other tribes into ending the war on NightWing terms. Cold, condescending, and utterly convinced of NightWing superiority, he views the dragonets of destiny as pawns to be guided, controlled, and discarded the moment they stop being useful.",
  background: "A senior NightWing strategist on the volcanic NightWing island, Morrowseer invented the Dragonet Prophecy and helped found the Talons of Peace to manipulate dragons across Pyrrhia into raising five hand-picked dragonets — one of whom, Starflight, was meant to be his tribe's secret agent embedded among the others. His true goal was always securing NightWing access to the mainland's resources, using the prophecy as a tool of pure propaganda.",
  arcStory: "Throughout The Dragonet Prophecy, Morrowseer oversees the guardians raising the dragonets in secret, growing furious when Starflight escapes the cave with the others instead of staying loyal to NightWing interests alone. He continues manipulating events from the shadows, willing to sacrifice any dragon — including the dragonets he helped create — if it serves the NightWings' survival.",
  relationships: [
    { name: "Starflight", relation: "One of the dragonets of destiny, whom Morrowseer views primarily as a NightWing asset rather than an individual with his own loyalties." },
    { name: "Deathbringer", relation: "NightWing assassin under his command, sent on missions to protect NightWing secrets by any means necessary." },
    { name: "Queen Battlewinner", relation: "NightWing ruler whose authority Morrowseer operates under while pursuing his own agenda." }
  ],
  quotes: []
},
{
  id: "darkstalker",
  name: "Darkstalker",
  tribe: "night",
  gender: "Male",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "",
  category: "antagonist",
  physical: "An immense NightWing-IceWing hybrid, ebony-black from snout to tail except for a stripe of icy white scales where his wings meet his body. A silver teardrop scale marks each eye, signaling his mind-reading gift. After 2,000 years asleep beneath Agate Mountain, he emerged three times the size of any living dragon, with scales enchanted to feel as hard as armor.",
  role: "Antagonist — The Most Powerful Animus Dragon in Pyrrhian History",
  personality: ["Charming", "Brilliant", "Possessive", "Self-justifying", "Desperately lonely"],
  abilities: ["Animus magic — the rarest and most dangerous power among dragons, allowing him to enchant any object with nearly any effect", "Mind-reading, allowing him to hear the thoughts of every dragon around him", "Limited prophetic future-sight, inherited alongside his other gifts from being hatched on the brightest night under three full moons", "Enchanted invulnerability, healing instantly from nearly any wound", "Centuries of accumulated magical knowledge and enchantments, from mind control to plagues to immortality"],
  description: "Darkstalker is, by every measure, the single most powerful dragon to ever exist in Pyrrhia — a NightWing-IceWing hybrid born with animus magic, mind-reading, and prophecy all at once. He genuinely believes he wants to build a peaceful world for everyone he loves, and that belief is precisely what makes him so dangerous: every act of control, manipulation, and cruelty he commits is, in his own mind, simply the price of being good enough to deserve power. He cannot understand why the dragons he loves keep being afraid of him.",
  background: "Hatched in the ancient NightWing kingdom two thousand years before the events of The Dragonet Prophecy, Darkstalker grew from a brilliant, affectionate dragonet into an increasingly controlling young animus after the disappearance of his mother, Foeslayer, taken by the IceWings. He secretly enchanted his own scroll to store his magic safely, manipulated his closest friends Clearsight and Fathom without their consent, and forced his own father to kill himself in a fit of vengeance — finally pushing Clearsight to betray him, trapping him in an enchanted sleep beneath Agate Mountain for two thousand years.",
  arcStory: "Awakened by Kinkajou and Moonwatcher centuries later, Darkstalker positions himself as a misunderstood, gentle mentor to Moon while secretly enchanting all of Pyrrhia to like and trust him, unleashing a deadly plague on the IceWing tribe as vengeance for his mother's kidnapping, and attempting to seize the NightWing throne by force and charm in equal measure. He is finally stopped not by a weapon but by his own conscience — confronted with proof from a soul reader that he has become genuinely evil, he chooses to eat an enchanted strawberry that erases his memories and powers, transforming into the innocent dragonet Peacemaker.",
  relationships: [
    { name: "Clearsight", relation: "His soulmate and the love of his life, who ultimately had no choice but to trap him for two thousand years to stop his growing tyranny." },
    { name: "Fathom", relation: "One of his closest friends, whom he manipulated for years before Fathom turned against him and helped seal him away." },
    { name: "Foeslayer", relation: "His beloved mother, kidnapped by the IceWings, whose loss broke something in him and triggered his slide toward vengeance and control." },
    { name: "Moonwatcher", relation: "The first dragon he speaks to upon waking, and one of the very few he never tries to enchant — a genuine friendship that nonetheless does not stop her from opposing him." },
    { name: "Arctic", relation: "His IceWing father, whom Darkstalker forced to commit suicide after discovering his betrayal." }
  ],
  quotes: ["\"I'm nothing like my father. I don't need saving. I can choose my own future, and I like the one I see, and you're going to learn to like it too.\""]
},
{
  id: "scarlet",
  name: "Scarlet",
  tribe: "sky",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/b/b9/ScarletTopShot.png/revision/latest/scale-to-width-down/402?cb=20251116213248",
  category: "antagonist",
  physical: "Majestic and strong, with dark orange scales and narrow, slitted, bright yellow eyes that always seem to hold a glimmer of menace. Constant wisps of white smoke curl from her nostrils around her horns. After being scarred by dragonfire venom, half her once-beautiful face melts into a ruined mass of scar tissue.",
  role: "Antagonist — The Tyrant Queen of the SkyWings",
  personality: ["Malicious", "Vain", "Sadistic", "Manipulative", "Power-hungry"],
  abilities: ["Survived fourteen separate royal challenges for the SkyWing throne over twenty-nine years of rule", "Commands the SkyWing arena and military with absolute, feared authority", "Skilled manipulator who controls subjects through fear of her violent unpredictability", "Possesses a dreamvisitor, allowing her to invade the dreams of dragons across Pyrrhia even from hiding"],
  description: "Scarlet is the longest-reigning and most feared SkyWing queen in living memory, a ruler who turned her arena into a personal source of entertainment by forcing prisoners to fight to the death for her amusement. She is vain, adorning her throne room and herself with gold and gems, but beneath the glamour she is utterly without mercy — willing to murder guards on a whim, manipulate orphaned dragonets into killers, and burn entire clutches of eggs to maintain her grip on power.",
  background: "As a dragonet, Scarlet was already infamous for screaming until she got whatever she wanted, eventually challenging and killing her own mother, Queen Firestorm, on her wedding day to claim the SkyWing throne. She allied with Burn during the War of SandWing Succession purely because the ongoing war gave her endless fresh prisoners for her arena, and she raised the firescales dragonet Peril as a weapon, lying to her about her own mother to ensure total loyalty.",
  arcStory: "Scarlet captures the dragonets of destiny early in their journey and forces them to fight in her gladiatorial arena for her entertainment, caging Sunny, using Glory as living decoration, and manipulating Peril into being her champion. During the chaos of Glory's venom attack, Burn shoves Scarlet in front of herself as a shield — the venom melts half of Scarlet's face and she is presumed dead, though she survives in hiding for years afterward, scheming for vengeance against the dragonets and her own usurping daughter, Ruby.",
  relationships: [
    { name: "Peril", relation: "The firescales dragonet Scarlet raised as a weapon, lying to her about her true mother Kestrel to ensure obedience — a relationship built entirely on manipulation." },
    { name: "Kestrel", relation: "A loyal soldier whose hatchlings Scarlet ordered killed, manipulating her into apparently murdering her own son before discovering the deception." },
    { name: "Ruby", relation: "Her daughter, who took the SkyWing throne after Scarlet's presumed death and whom Scarlet later plotted to kill in revenge." },
    { name: "Burn", relation: "Wartime ally who used Scarlet as a literal shield against dragonfire venom, leaving her permanently scarred." }
  ],
  quotes: ["\"You think you're so smart, pathetic daughter. But your love for that dragonet is a weakness.\" — to Ruby, about Cliff"]
},
{
  id: "vulture",
  name: "Vulture",
  tribe: "sand",
  gender: "Male",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/2/2f/Vulture_GN_2.png/revision/latest?cb=20241219013606",
  category: "antagonist",
  physical: "An elderly SandWing with pale yellow scales covered in hundreds of black dragon-skull tattoos — each one representing a dragon he has personally killed — giving him a leopard-spotted look from a distance. He wears a black cape lined with gold and drapes gold chains along his wings, the picture of ostentatious, menacing wealth.",
  role: "Antagonist — Crime Lord of the Scorpion Den and Founder of the Talons of Power",
  personality: ["Sinister", "Calculating", "Smug", "Condescending", "Cold"],
  abilities: ["Vast criminal network and information web extending throughout the Scorpion Den and beyond", "Fortified compound lined with traps, mines, and explosives", "Skilled manipulator and public speaker, able to turn crowds against a ruling queen", "Enormous accumulated wealth used to buy loyalty and silence"],
  description: "Vulture is the underworld king of the Scorpion Den, a crime lord who built a criminal empire of mines, gold, and fear out of the chaos left behind by the War of SandWing Succession. Outwardly composed and almost theatrical in his menace, he is utterly without loyalty — willing to manipulate his own grandson, fund a coup, and ally with anyone, including an ancient animus dragon, if it gets him closer to a throne.",
  background: "Once deeply entwined with the SandWing monarchy in ways that remain mysterious, Vulture rose to become the most powerful crime boss in the Scorpion Den, founding the criminal organization called the Talons of Power. He fathered Cobra, whose children — Qibli, Sirocco, and Rattlesnake — became unwitting pieces in his long game to seize the SandWing throne.",
  arcStory: "In Darkness of Dragons, Vulture kidnaps Ostrich to lure Qibli into his compound, tries to manipulate his own grandson into supporting a coup against Queen Thorn, and backs Onyx — secretly Queen Oasis's granddaughter — as his chosen replacement monarch. He forms an alliance with the newly awakened animus Darkstalker, who ultimately enchants Vulture into obedience and then strips him down to the mind of a newly hatched dragonet, ending his decades of scheming in an instant.",
  relationships: [
    { name: "Qibli", relation: "His grandson, whom Vulture tries repeatedly to manipulate and recruit into his criminal schemes, with little regard for Qibli's wellbeing." },
    { name: "Cobra", relation: "His daughter, who shares his ruthless, scheming nature and assists him in the Talons of Power." },
    { name: "Onyx", relation: "His chosen candidate for the SandWing throne, secretly the granddaughter of the old Queen Oasis." },
    { name: "Darkstalker", relation: "A temporary and disastrous ally, who ultimately enchants Vulture to obey him before erasing his mind entirely." }
  ],
  quotes: ["\"Have we really come to this? SandWings fighting SandWings? Look how divided we are! Do you know why we fight each other? Because we are ruled by a false queen.\""]
},
{
  id: "cobra",
  name: "Cobra",
  tribe: "sand",
  gender: "Female",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/7/75/Cobra_and_Qibli_GN_1.png/revision/latest/scale-to-width-down/500?cb=20240121073751",
  category: "antagonist",
  physical: "A SandWing with the same sharp, calculating eyes as her father Vulture, carrying herself with cold composure even in the middle of the Scorpion Den's chaos and danger.",
  role: "Antagonist — Lieutenant of the Talons of Power",
  personality: ["Manipulative", "Cold", "Pragmatic", "Secretive"],
  abilities: ["Skilled deceiver, having concealed the true nature of her family's criminal dealings from her own children for years", "Operates effectively within the Talons of Power's criminal hierarchy", "Strategic thinker who understands how to use family ties as leverage"],
  description: "Cobra is Vulture's daughter and an active lieutenant within the Talons of Power, a mother who kept her children — including Qibli — largely in the dark about her father's criminal empire and her own role within it. She is pragmatic to the point of coldness, treating family bonds as just another tool to be used when convenient.",
  background: "Raised within Vulture's criminal underworld, Cobra became entangled in his schemes long before her children were born, eventually having three dragonets — Qibli, Sirocco, and Rattlesnake — whose lives became unknowingly tied to the Talons of Power's plans.",
  arcStory: "When Qibli is captured and brought before Vulture in Darkness of Dragons, he is also reunited with his mother Cobra, confronting the truth about her involvement in his grandfather's schemes and the family secrets kept from him his entire life.",
  relationships: [
    { name: "Vulture", relation: "Her father and the head of the criminal organization she serves." },
    { name: "Qibli", relation: "Her son, kept largely unaware of her true role in the Talons of Power until he is drawn into Vulture's plot." },
    { name: "Sirocco and Rattlesnake", relation: "Her other children, raised within the same web of secrecy." }
  ],
  quotes: []
},
{
  id: "onyx",
  name: "Onyx",
  tribe: "sand",
  gender: "Female",
  arc: 3,
  book: 9,
  bookTitle: "Talons of Power",
    firstAppearance: "Talons of Power",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/43/Onyx_GN_1.png/revision/latest?cb=20221230073908",
  category: "antagonist",
  physical: "A SandWing dragonet who looks unremarkable at first glance, blending easily into the student body at Jade Mountain Academy — a deliberate camouflage for her royal secret.",
  role: "Antagonist — Secret Heir and Student Spy at Jade Mountain Academy",
  personality: ["Secretive", "Manipulative", "Ambitious", "Patient"],
  abilities: ["Skilled at blending in and deceiving her fellow students for an extended period", "Operates as an undercover agent for Vulture's Talons of Power", "Strong claim to royal legitimacy as a granddaughter of the old SandWing queen"],
  description: "Onyx is secretly the granddaughter of Queen Oasis, making her a legitimate claimant to the SandWing throne — a secret she keeps hidden while enrolled at Jade Mountain Academy as part of Vulture's long game to install her as queen. Calm and watchful, she plays the part of an ordinary student while quietly working against Queen Thorn's interests from within.",
  background: "Recruited by her grandfather Vulture as the secret heir around whom his coup against Thorn could be built, Onyx was sent to Jade Mountain Academy under the guise of an ordinary student, gathering information and watching for opportunities to advance the Talons of Power's plans.",
  arcStory: "Onyx kidnaps Ostrich to use as leverage against Qibli and is eventually revealed as Vulture's chosen replacement for Queen Thorn. Her plot collapses alongside the rest of the Talons of Power's schemes when Vulture is neutralized by Darkstalker.",
  relationships: [
    { name: "Vulture", relation: "Her grandfather and the architect of the plan to put her on the SandWing throne." },
    { name: "Ostrich", relation: "A fellow student she kidnapped to use as a bargaining chip against Qibli." },
    { name: "Qibli", relation: "A fellow Jade Mountain student she attempted to manipulate and use against Thorn." }
  ],
  quotes: []
},
{
  id: "sirocco",
  name: "Sirocco",
  tribe: "sand",
  gender: "Male",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/eb/Sirocco_GN.png/revision/latest?cb=20250119062249",
  category: "antagonist",
  physical: "A SandWing built for intimidation, working as muscle within his grandfather's criminal organization in the Scorpion Den.",
  role: "Antagonist — Enforcer of the Talons of Power",
  personality: ["Aggressive", "Loyal to Vulture", "Intimidating"],
  abilities: ["Physical combat and intimidation on behalf of the Talons of Power", "Familiarity with the layout and defenses of Vulture's compound"],
  description: "Sirocco is one of Vulture's grandsons, working as an enforcer within the Talons of Power's criminal operations in the Scorpion Den. Loyal to his grandfather's authority, he serves as muscle for the organization's schemes.",
  background: "Raised alongside his siblings Qibli and Rattlesnake under Cobra, Sirocco became entangled in Vulture's criminal empire rather than pursuing a path outside it.",
  arcStory: "Sirocco helps guide Qibli and Winter into Vulture's compound and later assists in confronting them when their true motives become clear, knocked unconscious during their escape.",
  relationships: [
    { name: "Vulture", relation: "His grandfather and the head of the criminal organization he serves." },
    { name: "Qibli", relation: "His brother, on opposing sides of the conflict over Vulture's schemes." },
    { name: "Rattlesnake", relation: "His sibling, also embedded within the Talons of Power." }
  ],
  quotes: []
},
{
  id: "rattlesnake",
  name: "Rattlesnake",
  tribe: "sand",
  gender: "Female",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/b/b8/Rattlesnake_GN.png/revision/latest?cb=20250119062243",
  category: "antagonist",
  physical: "A SandWing dragonet, sibling to Qibli and Sirocco, embedded within Vulture's criminal compound in the Scorpion Den.",
  role: "Antagonist — Member of the Talons of Power",
  personality: ["Loyal to family criminal ties", "Sharp", "Guarded"],
  abilities: ["Familiarity with Vulture's compound and its defenses", "Operates within the Talons of Power's hierarchy"],
  description: "Rattlesnake is another of Cobra's children, raised within the orbit of Vulture's criminal empire and loyal to the family's interests over Qibli's growing doubts about their grandfather's schemes.",
  background: "Like her siblings, Rattlesnake grew up partly shielded from the full truth of the Talons of Power until events at the Scorpion Den forced everything into the open.",
  arcStory: "Rattlesnake is present during Qibli and Winter's infiltration of Vulture's compound and is knocked unconscious during their escape attempt, alongside Sirocco.",
  relationships: [
    { name: "Vulture", relation: "Her grandfather, head of the Talons of Power." },
    { name: "Qibli", relation: "Her brother, who ultimately opposes their grandfather's plans." }
  ],
  quotes: []
},
{
  id: "chameleon",
  name: "Chameleon",
  tribe: "rain",
  gender: "Male",
  arc: 2,
  book: 10,
  bookTitle: "Darkness of Dragons",
    firstAppearance: "Darkness of Dragons",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/e5/Chameleon_GN_4.png/revision/latest?cb=20241224095037",
  category: "antagonist",
  physical: "Outwardly an unremarkable MudWing, but his true identity as the informant 'Bog' is a deliberate disguise used to deceive others on Vulture's behalf.",
  role: "Antagonist — Hired Informant for the Talons of Power",
  personality: ["Deceptive", "Mercenary", "Calculating"],
  abilities: ["Skilled at assuming false identities and feeding disinformation", "Willing to lie under a false name for payment"],
  description: "Chameleon operates under the false identity of 'Bog,' a planted informant paid by Vulture to spread disinformation blaming the MudWings for a string of bombings they did not commit — a lie designed to destabilize Queen Thorn's rule and manipulate Qibli's trust.",
  background: "Little is known of Chameleon's life beyond his role as a hired liar for the Talons of Power, brought in specifically to deceive Qibli and other SandWings about the true source of the attacks plaguing the kingdom.",
  arcStory: "Vulture presents 'Bog' to Qibli as a credible witness, using the fabricated testimony to cast doubt on Queen Thorn and the MudWings, before Qibli sees through the deception as part of unraveling the larger plot.",
  relationships: [
    { name: "Vulture", relation: "His employer, who paid him to spread false testimony implicating the MudWings." },
    { name: "Qibli", relation: "The target of his deception, presented as a 'witness' to manipulate Qibli's judgment." }
  ],
  quotes: []
},
{
  id: "diamond",
  name: "Queen Diamond",
  tribe: "ice",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "",
  category: "antagonist",
  physical: "An imposing IceWing queen adorned with ice-blue diamonds at her ears, neck, and tail band, with sharp, glittering eyes and a permanently superior, condescending bearing befitting her absolute rule over the tribe.",
  role: "Antagonist — Tyrant Queen of the IceWings During the Era of Darkstalker",
  personality: ["Ruthless", "Vengeful", "Judgmental", "Controlling", "Cruel"],
  abilities: ["Rare animus magic, used in direct violation of IceWing tradition that animus dragons may only enchant once in their lives", "Enchanted the Diamond Caves into an eternal torture mechanism for her enemy", "Enchanted the Royal IceWing Crown to instill generational hatred of NightWings in every wearer", "Absolute political and military authority over the IceWing tribe"],
  description: "Queen Diamond is the architect of the ancient hatred between IceWings and NightWings, a monarch whose obsession with tribal purity and personal vengeance reshaped Pyrrhian history for thousands of years. She broke her own tribe's sacred animus law not once but four times, each transgression driven by spite rather than necessity, and inflicted a punishment on her enemy so cruel it became a permanent fixture of IceWing culture.",
  background: "As queen, Diamond controlled every aspect of her son Arctic's life, reminding him constantly of his duties as an IceWing prince. When Arctic fell in love with the NightWing Foeslayer and fled the Ice Kingdom to be with her, Diamond's fury curdled into an obsession with revenge — she offered to forgive Arctic only if he murdered his own dragonets, and when that failed, she had Foeslayer kidnapped instead.",
  arcStory: "After capturing Foeslayer, Diamond used her animus power to enchant frozen shackles and spears, creating the 'gift of vengeance' — the Diamond Trial — a ritual in which Foeslayer would be thawed, killed, and refrozen over and over, eternally, so that IceWing dragonets could murder her repeatedly as a rite of passage. Diamond herself killed Foeslayer the first forty times purely to vent her own rage, cementing one of the cruelest punishments in the series' history.",
  relationships: [
    { name: "Arctic", relation: "Her son, whom she controlled obsessively and tried to manipulate into killing his own dragonets in exchange for her forgiveness." },
    { name: "Foeslayer", relation: "Her son's NightWing lover, whom Diamond hated so completely that she invented an eternal torture ritual just to keep killing her over and over." },
    { name: "Darkstalker", relation: "Her grandson, whose animus magic and fury at the IceWings can be traced directly back to Diamond's cruelty toward his mother." }
  ],
  quotes: ["\"You're a dragon who knows how to keep her mouth shut. Either you understand that I'm not interested in your opinions, or you don't have any, which would be preferable.\""]
},
{
  id: "arctic",
  name: "Arctic",
  tribe: "ice",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/1/11/Arctic_GN_18.png/revision/latest/scale-to-width-down/445?cb=20251105102127",
  category: "antagonist",
  physical: "An IceWing prince with the typical icy pale scales of his tribe, carrying himself with the resentful bitterness of a dragon caught between two worlds he belongs fully to neither.",
  role: "Antagonist — Disgraced IceWing Prince and Father of Darkstalker",
  personality: ["Bitter", "Resentful", "Weak-willed", "Cruel when cornered", "Self-pitying"],
  abilities: ["Born an IceWing animus, though he rarely used his magic and grew to resent his own son's far greater power", "Royal authority and standing within the IceWing tribe, before his exile"],
  description: "Arctic is a prince torn between his IceWing heritage and his love for the NightWing Foeslayer, a conflict he resolves badly at every turn — fleeing his tribe for love, then resenting the children that love produced, and ultimately betraying his own family when given the chance to return to royal favor. He never looks his son Darkstalker in the eye, jealous of and threatened by the boy's power.",
  background: "Raised under Queen Diamond's smothering control, Arctic eventually abandoned the Ice Kingdom to live with Foeslayer, fathering Darkstalker and Whiteout. He never fully committed to the relationship emotionally, resenting his hybrid children and longing for the royal status he'd given up.",
  arcStory: "When his mother offers to forgive him and restore his royal status if he kills his own dragonets, Arctic seriously considers it, secretly attempting to take Whiteout back to the Ice Kingdom and revealing NightWing secrets to Diamond in a bid for reinstatement. Darkstalker discovers the betrayal, enchants Arctic to obey his every command, and forces his own father to publicly disembowel himself as punishment.",
  relationships: [
    { name: "Foeslayer", relation: "His NightWing lover, whom he loved enough to abandon his kingdom for, yet never fully committed to or protected." },
    { name: "Darkstalker", relation: "His son, whom he resented and ultimately betrayed — and who, in turn, forced him to take his own life." },
    { name: "Queen Diamond", relation: "His controlling mother, whose conditional offer of forgiveness drove him to consider killing his own children." }
  ],
  quotes: []
},
{
  id: "snowfox",
  name: "Snowfox",
  tribe: "ice",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/d9/SnowfoxTemplateLeslie.png/revision/latest/scale-to-width-down/500?cb=20210309012647",
  category: "antagonist",
  physical: "An IceWing noble with the pale, icy scales typical of her tribe, carrying herself with the same cold superiority common among the IceWing aristocracy of her era.",
  role: "Antagonist — IceWing Noble of the Ancient Era",
  personality: ["Cold", "Status-conscious", "Loyal to IceWing tradition"],
  abilities: ["Standing within the IceWing nobility and royal circles", "Knowledge of IceWing customs and political maneuvering"],
  description: "Snowfox is part of the IceWing royal family during the era of Queen Diamond and Darkstalker, embedded in a culture that prized tribal purity and viewed NightWings, and especially Arctic's hybrid children, with suspicion and disdain.",
  background: "A member of the IceWing nobility connected to the royal line, Snowfox lived through the period of escalating hostility between the IceWings and NightWings sparked by Arctic and Foeslayer's relationship.",
  arcStory: "As part of the IceWing court during Queen Diamond's reign, Snowfox represents the broader IceWing aristocracy whose prejudices and rigid traditions helped fuel the long-running NightWing-IceWing conflict.",
  relationships: [
    { name: "Queen Diamond", relation: "Fellow member of the IceWing royal family during the same turbulent era." }
  ],
  quotes: []
},
{
  id: "prudence",
  name: "Prudence",
  tribe: "night",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/dc/PrudenceTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210421053740",
  category: "antagonist",
  physical: "An IceWing of the ancient royal line, sharing the tribe's characteristic pale, glinting scales and reserved bearing.",
  role: "Antagonist — Member of the Ancient IceWing Royal Family",
  personality: ["Reserved", "Tradition-bound", "Cautious"],
  abilities: ["Royal IceWing lineage and standing within the tribe's hierarchical Circle ranking system"],
  description: "Prudence is part of the extended IceWing royal family during the era surrounding Darkstalker's rise, embedded in the same rigid caste structure and anti-NightWing sentiment that defined IceWing society at the time.",
  background: "Connected to the IceWing royal bloodline alongside Diamond, Arctic, and Snowfox, Prudence lived through the period when Arctic's relationship with Foeslayer scandalized the tribe and triggered generations of conflict.",
  arcStory: "As a member of the IceWing court during this turbulent era, Prudence's story is woven into the larger tragedy of the NightWing-IceWing War sparked by Queen Diamond's vengeance.",
  relationships: [
    { name: "Queen Diamond", relation: "Fellow member of the IceWing royal family." }
  ],
  quotes: []
},
{
  id: "allknowing",
  name: "Allknowing",
  tribe: "night",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/a3/Allknowing_GN_6.png/revision/latest?cb=20251104084904",
  category: "antagonist",
  physical: "An ancient NightWing seer marked by the silver teardrop scale of a mind-reader, carrying the weight of prophecy and secrecy in her watchful eyes.",
  role: "Antagonist — NightWing Seer and Advisor to Queen Vigilance",
  personality: ["Cryptic", "Watchful", "Loyal to the Queen", "Calculating"],
  abilities: ["Limited future-sight, used to deliver prophetic warnings to the NightWing court", "Trusted advisor with access to the highest levels of NightWing royal decision-making"],
  description: "Allknowing is a NightWing seer in Queen Vigilance's court whose prophetic warning about Darkstalker — 'hatched of ice and hatched of night, cursed with moons all shining bright, longs for power not his own, comes to steal your very throne' — sets in motion the queen's fear and eventual attempt to have Darkstalker assassinated.",
  background: "Serving as an oracle within the ancient NightWing royal court, Allknowing's visions carried significant political weight, shaping how Queen Vigilance perceived the growing threat posed by the young animus prince.",
  arcStory: "Allknowing delivers her ominous prophecy about Darkstalker to Queen Vigilance, directly contributing to the queen's decision to send an assassin after him — an attempt that fails due to Darkstalker's self-enchanted invulnerability.",
  relationships: [
    { name: "Queen Vigilance", relation: "The NightWing monarch she serves and advises with her prophetic visions." },
    { name: "Darkstalker", relation: "The subject of her dire prophecy, which set the queen against him." }
  ],
  quotes: ["\"Hatched of ice and hatched of night. Cursed with moons all shining bright. Longs for power not his own. Comes to steal your very throne.\""]
},
{
  id: "vigilance",
  name: "Queen Vigilance",
  tribe: "night",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "",
  category: "antagonist",
  physical: "A regal, ancient NightWing queen, commanding and severe, ruling the NightWing tribe during the era before the great Scorching.",
  role: "Antagonist — Historical Queen of the NightWings",
  personality: ["Authoritative", "Fearful of threats to her power", "Decisive", "Ruthless when threatened"],
  abilities: ["Absolute political and military authority over the ancient NightWing tribe", "Commands the loyalty of assassins and royal guards"],
  description: "Queen Vigilance ruled the NightWings during the era depicted in Darkstalker, a monarch who, upon hearing Allknowing's prophecy about a power-hungry hybrid threatening her throne, moved decisively and violently to eliminate the perceived threat before it could grow.",
  background: "As the reigning NightWing queen, Vigilance presided over a court increasingly anxious about the rise of animus magic and the political instability it could bring, with Darkstalker's existence representing exactly the kind of uncontrolled power she feared.",
  arcStory: "Acting on Allknowing's prophecy, Vigilance sends an assassin, Quickdeath, to kill Darkstalker — an attempt that fails because of his self-enchanted invincibility, setting her further at odds with the prince she fears.",
  relationships: [
    { name: "Allknowing", relation: "Her trusted seer, whose prophecy convinced her Darkstalker posed a mortal threat to her throne." },
    { name: "Darkstalker", relation: "The young prince she views as an existential threat and attempts to have assassinated." },
    { name: "Clearsight", relation: "A young NightWing seer in her court, whose visions Vigilance also monitors closely." }
  ],
  quotes: []
},
{
  id: "quickdeath",
  name: "Quickdeath",
  tribe: "night",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/1/11/Quickdeath_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104093559",
  category: "antagonist",
  physical: "A NightWing assassin built for stealth and lethal precision, able to strike and vanish before his targets fully register the threat.",
  role: "Antagonist — Assassin Hired to Kill Darkstalker",
  personality: ["Lethal", "Professional", "Mercenary"],
  abilities: ["Highly skilled assassin, hired specifically for difficult or politically sensitive targets", "Capable of striking with a spear thrust directly into a target's heart with near-fatal precision"],
  description: "Quickdeath is the assassin sent — likely on Queen Vigilance's orders — to kill Darkstalker during a festival in the Great Diamond. His attack should have been lethal, driving a spear straight into Darkstalker's chest, but Darkstalker's secretly enchanted invulnerable scales save him, and Quickdeath is tackled and killed before he can finish the job.",
  background: "Little is documented about Quickdeath's life before his fateful contract on Darkstalker's life, beyond his reputation as a dangerous, reliable hired blade within NightWing political circles.",
  arcStory: "Quickdeath ambushes Darkstalker at a festival, plunging a spear into his heart in what should have been an instant kill. Darkstalker survives unharmed thanks to his invulnerability enchantment, and Quickdeath is killed on the spot by Lionfish before he can be questioned about who hired him.",
  relationships: [
    { name: "Darkstalker", relation: "His target, whom he nearly succeeded in assassinating before being thwarted by enchanted invulnerability." }
  ],
  quotes: []
},
{
  id: "wasp",
  name: "Queen Wasp",
  tribe: "hive",
  gender: "Female",
  arc: 3,
  book: 11,
  bookTitle: "The Lost Continent",
    firstAppearance: "The Lost Continent",
  image: "",
  category: "antagonist",
  physical: "An enormous HiveWing with black and yellow striped scales, black horns, and large, completely black eyes ringed by an oval of yellow scales. She radiates menace even when standing still, and a retractable venomous stinger hidden at the tip of her tail is her signature weapon.",
  role: "Antagonist — Tyrant Queen of the HiveWings, Main Antagonist of The Lost Continent Prophecy",
  personality: ["Cold", "Cruel", "Ruthless", "Coldly manipulative", "Vengeful"],
  abilities: ["Mind-control over nearly every HiveWing in Pantala, achieved by injecting hatchlings twice with venom from her tail stinger", "Can see and speak through any HiveWing she controls simultaneously, giving her an empire-wide surveillance network", "Commands the HiveWing military and propaganda apparatus across all nine Hives", "Secretly under the influence of the parasitic Othermind plant, which amplifies and directs her own cruelty"],
  description: "Queen Wasp is the iron-fisted ruler who very nearly conquered the entire continent of Pantala, exterminating the LeafWings and subjugating the SilkWings beneath a regime of total surveillance and mind control. She rules through fear and propaganda, isolating any dragon who resists her — like the HiveWing Cricket, naturally immune to her control — and treating cruelty as simply the cost of order. Unbeknownst even to herself, she is a puppet of a deeper evil: the Othermind, a hive-mind plant intelligence that has been steering her actions for years.",
  background: "Wasp hatched into the HiveWing royal family over fifty years before the events of The Lost Continent, the daughter of the comparatively milder Queen Cochineal. She killed her mother in traditional combat to claim the throne and began the Tree Wars almost immediately, falsely claiming the ancient Book of Clearsight commanded the SilkWings and LeafWings to submit to HiveWing rule. The resulting war nearly wiped out the LeafWings and left Pantala's forests razed to ash.",
  arcStory: "Throughout the Pantala arc, Wasp hunts the HiveWing Cricket and her friends Blue, Swordtail, and Sundew after they steal the real Book of Clearsight and discover the truth about her lies. Her empire of mind-controlled subjects nearly crushes the growing rebellion, until it's revealed that Wasp herself has been controlled all along by a parasitic plant called the Othermind. After the Othermind is finally destroyed, Wasp is dethroned and imprisoned, later escaping to become a free and even more dangerous threat.",
  relationships: [
    { name: "Cricket", relation: "A HiveWing immune to Wasp's mind control whom she labels a dangerous traitor and personally hunts." },
    { name: "Queen Cochineal", relation: "Her mother, the previous HiveWing queen, whom Wasp killed in combat to claim the throne." },
    { name: "Cottonmouth", relation: "Secretly the true power behind her reign — the dragon possessed by the Othermind, who treats Wasp as merely his most useful puppet." }
  ],
  quotes: ["\"You don't have to be different anymore. I can fix you. I'm on my way right now. And when I get there… I can make you just like everybody else.\""]
},
{
  id: "cottonmouth",
  name: "Cottonmouth",
  tribe: "leaf",
  gender: "Male",
  arc: 3,
  book: 13,
  bookTitle: "The Poison Jungle",
    firstAppearance: "The Poison Jungle",
  category: "antagonist",
  physical: "A LeafWing whose body has been fundamentally altered by years of exposure to the Othermind's influence, his presence carrying an unnatural, plant-corrupted menace beneath an otherwise unremarkable LeafWing appearance.",
  role: "Antagonist — Host and Voice of the Othermind",
  personality: ["Possessive", "Cold", "Manipulative", "Patient across decades"],
  abilities: ["Serves as the primary physical vessel and mouthpiece for the Othermind's hive-mind consciousness", "Commands the Othermind's mind-controlled network indirectly through Wasp and the breath of evil plant", "Long-term strategic patience, having orchestrated events across decades through proxies"],
  description: "Cottonmouth is the true power behind Queen Wasp's tyranny, the dragon possessed and controlled by the Othermind — a parasitic, hive-minded plant intelligence that has been pulling the strings of HiveWing rule from the shadows for years. As Freedom bluntly puts it, Wasp is not truly in charge; she is merely 'one of his big toes,' a powerful but ultimately disposable instrument of the Othermind's will.",
  background: "Long before the events of the main story, Cottonmouth became entangled with and eventually consumed by the Othermind, a sentient plant network capable of controlling minds through a substance called the breath of evil. Through Cottonmouth, the Othermind extended its influence into Queen Wasp herself, using her HiveWing mind-control powers as an amplifier for its own.",
  arcStory: "Cottonmouth's true nature as the Othermind's vessel is gradually uncovered across The Poison Jungle and The Flames of Hope, revealing that the entire HiveWing regime of fear has been, in part, an extension of a much older and stranger threat. The destruction of the Othermind finally frees both Cottonmouth and Wasp's countless mind-controlled subjects.",
  relationships: [
    { name: "Wasp", relation: "His most prominent and powerful puppet, used to extend the Othermind's control across the HiveWing tribe." },
    { name: "Sundew", relation: "A LeafWing protagonist who ultimately helps uncover and confront the truth of the Othermind's influence." }
  ],
  quotes: []
},
{
  id: "othermind",
  name: "The Othermind",
  tribe: "leaf",
  gender: "Female",
  arc: 3,
  book: 13,
  bookTitle: "The Poison Jungle",
    firstAppearance: "The Poison Jungle",
  category: "antagonist",
  physical: "Not a dragon at all but a vast, hive-minded plant network, spreading its influence through a substance called the breath of evil and manifesting its will through possessed hosts and mind-controlled subjects rather than a body of its own.",
  role: "Antagonist — The Hidden Hive-Mind Intelligence Behind the HiveWing Regime",
  personality: ["Alien", "Collective", "Patient", "Utterly indifferent to individual suffering"],
  abilities: ["Mind control on a massive scale, transmitted and reinforced through the breath of evil plant", "Operates through and amplifies the natural abilities of possessed hosts, such as Queen Wasp's venom-based control", "Capable of extending influence across years and through multiple proxies simultaneously"],
  description: "The Othermind is one of the strangest and most insidious threats in the series — not a dragon villain at all, but an ancient, plant-based hive intelligence that spreads through possession and mind control, treating individual dragons as mere extensions of its singular collective will. It has no interest in dragons as individuals, only as instruments, making its brand of evil colder and more alien than any single tyrant's cruelty.",
  background: "The Othermind's origins predate the main conflicts of the Pantala arc, having slowly extended its influence through Cottonmouth and into the HiveWing regime over the course of many years, hidden behind the more visible and conventional tyranny of Queen Wasp.",
  arcStory: "The true scope of the Othermind's influence is uncovered across The Poison Jungle and The Flames of Hope, recontextualizing Wasp's reign as only the visible surface of a much deeper threat. It is finally destroyed by Luna, freeing the countless dragons it had controlled for years.",
  relationships: [
    { name: "Cottonmouth", relation: "Its primary physical host and mouthpiece." },
    { name: "Wasp", relation: "A powerful secondary puppet, used to extend its mind control across the HiveWing tribe." }
  ],
  quotes: []
},
{
  id: "belladonna",
  name: "Belladonna",
  tribe: "leaf",
  gender: "Female",
  arc: 3,
  book: 12,
  bookTitle: "The Hive Queen",
    firstAppearance: "The Hive Queen",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/32/BelladonnaTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260328045530",
  category: "antagonist",
  physical: "A LeafWing marked by the trauma of surviving the near-extermination of her tribe, hardened into an uncompromising militant willing to use any means necessary to ensure LeafWing survival.",
  role: "Antagonist — Militant Leader of the LeafWing Resistance",
  personality: ["Ruthless", "Survival-driven", "Uncompromising", "Protective of her tribe to a fault"],
  abilities: ["Leafspeak, the rare LeafWing ability to command plant growth", "Skilled guerrilla strategist, having helped the LeafWing remnant survive years in hiding after the Tree Wars", "Willing to use extreme and morally questionable tactics in pursuit of LeafWing survival and revenge"],
  description: "Belladonna is Sundew's mother and one of the leaders of the LeafWing resistance, a dragon forged by genocide into someone who believes utterly that the ends justify the means. Having watched her tribe nearly wiped from existence by Queen Wasp's Tree Wars, she has little patience left for half-measures, mercy toward HiveWings, or anyone who questions the resistance's increasingly violent methods.",
  background: "Belladonna survived the Tree Wars that devastated the LeafWing tribe, going into hiding alongside other survivors and raising her daughter Sundew within a culture of justified militancy and deep distrust of the other Pantalan tribes.",
  arcStory: "As Sundew becomes increasingly involved in the rebellion against Queen Wasp, she finds herself at odds with her own mother's willingness to escalate violence and sacrifice others for the LeafWing cause, forcing Sundew to grapple with how much of her mother's ruthlessness she is willing to inherit.",
  relationships: [
    { name: "Sundew", relation: "Her daughter, a protagonist of the Pantala arc who comes to question her mother's uncompromising methods." },
    { name: "Hemlock", relation: "Sundew's father and fellow LeafWing resistance member." }
  ],
  quotes: []
},
{
  id: "hemlock",
  name: "Hemlock",
  tribe: "leaf",
  gender: "Male",
  arc: 3,
  book: 12,
  bookTitle: "The Hive Queen",
    firstAppearance: "The Hive Queen",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/ac/HemlockTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260426054357",
  category: "antagonist",
  physical: "A LeafWing survivor of the Tree Wars, marked by the same hardened resolve as Belladonna, his mate and fellow resistance leader.",
  role: "Antagonist — LeafWing Resistance Fighter",
  personality: ["Hardened", "Loyal to the resistance cause", "Pragmatic about violence"],
  abilities: ["Leafspeak, allowing him to command and manipulate plant growth in combat and survival", "Experience in guerrilla resistance tactics developed during years in hiding"],
  description: "Hemlock is Sundew's father, a LeafWing resistance fighter who, alongside Belladonna, survived the devastation of the Tree Wars and has dedicated himself since to the militant LeafWing cause, regardless of the moral costs.",
  background: "Like Belladonna, Hemlock lived through the near-extermination of the LeafWing tribe and has spent the years since rebuilding a resistance movement focused on LeafWing survival and eventual retribution against the HiveWings.",
  arcStory: "Hemlock supports the LeafWing resistance's increasingly extreme tactics alongside Belladonna, putting him at odds with his daughter Sundew as she begins to question how far the cause should go.",
  relationships: [
    { name: "Sundew", relation: "His daughter, who grows increasingly conflicted about the resistance's methods." },
    { name: "Belladonna", relation: "His mate and fellow resistance leader." }
  ],
  quotes: []
},
{
  id: "albatross",
  name: "Albatross",
  tribe: "sea",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  category: "antagonist",
  physical: "An elderly SeaWing prince, nearly a neck-length taller than his sister Queen Lagoon, with long majestic wings and bluish-gray scales so pale they look almost white in places. His eyes are hooded and so dark blue they appear nearly black, and he is repeatedly compared to a seagull in both coloring and his shrewd, suspicious expression.",
  role: "Antagonist — Perpetrator of the Royal SeaWing Massacre",
  personality: ["Resentful beneath a jovial surface", "Bitter", "Eventually murderous", "Possessive of his diminishing importance"],
  abilities: ["The first known SeaWing animus dragon in Pyrrhian history", "Capable of large-scale enchantments, including growing the entire Summer Palace from raw rock", "Years of accumulated magical skill, used both constructively and, eventually, for mass murder"],
  description: "Albatross began as a kind, if distant, animus dragon who built the SeaWings' Summer Palace with his magic and mentored his grandson Fathom with real affection. But decades of being mocked and used by his sister Queen Lagoon — atoning forever for an accident in his childhood — eroded his soul with every spell he cast, until one night at the Summer Palace he finally snapped, murdering most of the SeaWing royal family in cold blood.",
  background: "As a dragonet, Albatross was teased relentlessly by his older sisters Lagoon and Sapphire for his odd coloring and ungainly swimming. When Sapphire snatched a clamshell from him, his rage unconsciously triggered his first known animus spell, enchanting the shell to bite off her claws and drive her permanently insane. Queen Lagoon then exploited his guilt for decades, forcing him to use his magic again and again in her service, slowly consuming his soul.",
  arcStory: "At a party at the newly finished Summer Palace, Albatross's accumulated madness finally erupts — he enchants a knife to slit Queen Lagoon's throat, then turns it on the rest of the royal family and the visiting SkyWing princess Sunset, killing nine dragons in total. He hunts his own grandson Fathom next, but Fathom — protecting Indigo — kills him first with enchanted spears, ending the massacre and prompting Queen Pearl to outlaw all use of animus magic in the SeaWing kingdom.",
  relationships: [
    { name: "Fathom", relation: "His grandson and apprentice, whom he genuinely cared for and mentored — until his own madness forced Fathom to kill him to stop the massacre." },
    { name: "Queen Lagoon", relation: "His sister and queen, who exploited his guilt over Sapphire's injury to control him for decades — and was among the first he killed." },
    { name: "Sapphire", relation: "His other sister, whose claws he accidentally maimed with his very first spell, driving her permanently insane." }
  ],
  quotes: ["\"You know I could easily kill you from a distance. It would barely take a thought. But you've been such a thorn in my side for the last few years... I want to see your face as you die.\""]
},
{
  id: "lagoon",
  name: "Queen Lagoon",
  tribe: "sea",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "",
  category: "antagonist",
  physical: "A regal SeaWing queen of the ancient era, carrying herself with the entitled confidence of a monarch accustomed to having her every demand met without question.",
  role: "Antagonist — Queen of the SeaWings During the Era of Darkstalker",
  personality: ["Exploitative", "Entitled", "Dismissive of others' wellbeing", "Self-serving"],
  abilities: ["Absolute political authority over the SeaWing tribe", "Strategic use of her animus brother's powers to benefit the kingdom and herself"],
  description: "Queen Lagoon ruled the SeaWings with an entitled disregard for her own brother's wellbeing, treating Albatross's rare and dangerous animus magic as a resource to be exploited rather than a burden to be protected. Her years of casual cruelty and constant belittlement directly contributed to the erosion of his soul — and ultimately got her killed when his magic finally turned on her.",
  background: "As queen, Lagoon discovered her brother Albatross possessed animus magic and saw immediately how useful that power could be to her reign, repeatedly pressuring him to cast spells for the kingdom's benefit while showing him little gratitude or concern for the toll it took on his soul.",
  arcStory: "At the unveiling party for the newly completed Summer Palace, Lagoon's casual cruelty toward Albatross proves to be the final straw — he enchants a knife that slits her throat, the opening act of the Royal SeaWing Massacre that would claim her life along with eight other royal SeaWings.",
  relationships: [
    { name: "Albatross", relation: "Her brother, whose magic she exploited for years and whose final breakdown she did not survive." },
    { name: "Sapphire", relation: "Her sister, also a victim of the family's casual cruelty toward Albatross in their youth." }
  ],
  quotes: []
},
{
  id: "sapphire",
  name: "Sapphire",
  tribe: "sea",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/d4/Sapphire_GN.png/revision/latest?cb=20251104101411",
  category: "antagonist",
  physical: "A SeaWing princess whose claws were permanently maimed by an accidental animus spell in her childhood, leaving her unable to swim or fight — an injury that ultimately broke her mind.",
  role: "Antagonist — Mad SeaWing Princess, Catalyst for Albatross's Animus Magic",
  personality: ["Cruel as a dragonet", "Entitled", "Later driven insane by her injury"],
  abilities: ["Originally next in line for significant standing in the SeaWing royal family before her injury"],
  description: "Sapphire began as an ordinary, if unkind, SeaWing princess who teased her younger brother Albatross mercilessly — until the day she snatched away a clamshell he was playing with, triggering his first, uncontrolled animus spell. The clam bit off her claws, crippling her ability to swim or fight, and the trauma of the injury eventually drove her to madness, after which she was confined to a secret island palace for the rest of her life.",
  background: "As an older sister to Albatross, Sapphire taunted him constantly about his odd coloring and ungainly swimming style, telling him as a dragonet that the entire Kingdom of the Sea would someday belong to her.",
  arcStory: "Sapphire's casual cruelty toward Albatross becomes the unwitting trigger for his very first animus spell, an act of accidental vengeance that maims her for life and sets in motion the slow corruption of his soul that would culminate decades later in the Royal SeaWing Massacre.",
  relationships: [
    { name: "Albatross", relation: "Her younger brother, whose first uncontrolled animus spell maimed her claws and drove her to insanity." },
    { name: "Queen Lagoon", relation: "Her sister, who went on to exploit Albatross's magic in the years that followed." }
  ],
  quotes: []
},
{
  id: "whirlpool",
  name: "Whirlpool",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/c/c3/Whirlpool_GN.png/revision/latest/scale-to-width-down/313?cb=20200518013054",
  category: "antagonist",
  physical: "A SeaWing soldier with the typical sleek, aquatic build of his tribe, known for his short temper and willingness to use force against those weaker than himself.",
  role: "Antagonist — Cruel SeaWing Soldier",
  personality: ["Cruel", "Bullying", "Short-tempered", "Abusive of authority"],
  abilities: ["Trained SeaWing soldier with combat experience", "Position of authority that he abused over the SeaWing dragonets in his charge"],
  description: "Whirlpool is a SeaWing soldier whose casual cruelty toward the young animus princess Anemone proves fatal to him — she ultimately kills him after enduring his abuse, an act that haunts her with guilt for the rest of the series even as it reveals the depth of his mistreatment of her.",
  background: "Serving within the SeaWing military and palace structure, Whirlpool held a position of authority that allowed him to torment Anemone and other young dragons under his watch, abusing his power with little fear of consequence.",
  arcStory: "After enduring repeated cruelty from Whirlpool, the young animus dragon Anemone uses her magic against him in a moment of desperation, killing him — an act that becomes one of the central sources of her guilt and the moral weight animus magic carries throughout the series.",
  relationships: [
    { name: "Anemone", relation: "A young SeaWing animus princess he tormented, who ultimately killed him in self-defense." }
  ],
  quotes: []
},
{
  id: "gill",
  name: "Gill",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/0/04/Gill_GN_12.png/revision/latest/scale-to-width-down/500?cb=20251118023950",
  category: "antagonist",
  physical: "A SeaWing commander with a hardened, militaristic bearing, carrying himself with the harsh discipline he enforces on those under his command.",
  role: "Antagonist — Harsh SeaWing Military Commander",
  personality: ["Strict", "Harsh", "Authoritarian", "Dismissive of dragonets under his charge"],
  abilities: ["Command authority within the SeaWing military structure", "Years of experience enforcing SeaWing discipline and tradition"],
  description: "Gill is a SeaWing commander whose harsh treatment of the dragonets under his authority, including Tsunami, reflects the more rigid and unforgiving side of SeaWing military culture, prioritizing discipline and obedience over the wellbeing of those he oversees.",
  background: "As a senior figure within the SeaWing palace's military hierarchy, Gill enforced strict discipline among young SeaWings, including those being raised in anticipation of the Dragonet Prophecy.",
  arcStory: "Gill's harsh treatment of Tsunami during her time in the Kingdom of the Sea becomes a point of conflict, illustrating the broader tension between SeaWing tradition and the dragonets of destiny's growing independence.",
  relationships: [
    { name: "Tsunami", relation: "A SeaWing dragonet of destiny whom Gill treated with characteristic harshness." }
  ],
  quotes: []
},
{
  id: "fierceteeth",
  name: "Fierceteeth",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/f/f7/Fierceteeth_GN_11.png/revision/latest?cb=20260109095851",
  category: "antagonist",
  physical: "A NightWing with black scales and a disgruntled, bedraggled look, noticeably smaller than her companion Strongwings, with a perpetually sharp, suspicious expression earned from a hard upbringing on the NightWing volcanic island.",
  role: "Antagonist — NightWing Kidnapper and Schemer",
  personality: ["Hardened", "Pragmatic", "Distrustful", "Secretly capable of deep loyalty"],
  abilities: ["Raised in harsh survivalist conditions on the NightWing volcano, giving her sharp instincts for danger and self-preservation", "Skilled schemer, willing to use kidnapping and manipulation to secure NightWing independence", "Eventually proves herself a capable leader, founding and leading the NightWing settlement Renewal"],
  description: "Fierceteeth is a NightWing shaped entirely by deprivation — raised on a volcanic island stripped of resources, taught from birth that survival comes before sentiment. She, Strongwings, and Preyhunter kidnap Sunny to trade her to one of Queen Burn's warring sisters in exchange for resources and protection for the starving NightWing tribe, a brutal calculation born of genuine desperation rather than simple cruelty.",
  background: "Growing up on the resource-poor NightWing volcanic island under Morrowseer's harsh leadership, Fierceteeth learned early that mercy was a luxury her tribe could rarely afford. Her hardened pragmatism made her one of the NightWings most willing to take drastic action to secure her tribe's future.",
  arcStory: "Fierceteeth, Strongwings, and Preyhunter kidnap Sunny, intending to sell her to the highest-bidding SandWing princess in exchange for an alliance that would save the starving NightWings. The scheme falls apart, and the trio ends up imprisoned in the SandWing stronghold — though Fierceteeth's story continues well beyond this, eventually leading the splinter NightWing settlement called Renewal and finding genuine partnership with Strongwings.",
  relationships: [
    { name: "Strongwings", relation: "Her fellow conspirator and eventual romantic partner, with whom she shares both schemes and genuine loyalty." },
    { name: "Preyhunter", relation: "The third member of their kidnapping trio, whose fate diverges from theirs after their capture." },
    { name: "Sunny", relation: "The dragonet of destiny they kidnapped in a desperate bid to secure resources for the starving NightWings." }
  ],
  quotes: ["\"NightWings. Well, well, well. We haven't had any of you visit our fine city in about seven years.\" — Thorn, upon capturing her"]
},
{
  id: "strongwings",
  name: "Strongwings",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/1/19/Strongwings_TBN_1.jpeg/revision/latest/scale-to-width-down/340?cb=20211229133229",
  category: "antagonist",
  physical: "A large, physically imposing NightWing, noticeably bigger than his companion Fierceteeth, with a somewhat dopey but ultimately loyal demeanor beneath his intimidating size.",
  role: "Antagonist — NightWing Conspirator in the Kidnapping of Sunny",
  personality: ["Loyal", "Easily led", "Gentle beneath an imposing exterior", "Devoted to Fierceteeth"],
  abilities: ["Significant physical strength, the largest of the NightWing trio", "Capable of long-term resilience through imprisonment and hardship"],
  description: "Strongwings is the physical muscle of the NightWing trio who kidnap Sunny, a large dragon whose intimidating size belies a fundamentally loyal, almost gentle nature — his devotion to Fierceteeth runs far deeper than his commitment to the scheme itself.",
  background: "Raised alongside Fierceteeth and Preyhunter under the same harsh NightWing conditions, Strongwings became part of their plan to trade Sunny for resources, following Fierceteeth's lead more than driving the scheme himself.",
  arcStory: "Strongwings participates in Sunny's kidnapping and is imprisoned alongside Fierceteeth in the SandWing stronghold afterward. His story continues well beyond this defeat, eventually building a genuine partnership and family with Fierceteeth.",
  relationships: [
    { name: "Fierceteeth", relation: "His fellow conspirator and eventual romantic partner." },
    { name: "Preyhunter", relation: "The third member of their kidnapping scheme." }
  ],
  quotes: []
},
{
  id: "preyhunter",
  name: "Preyhunter",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/e7/Preyhunter_TBN_1.jpeg/revision/latest/scale-to-width-down/359?cb=20211229201618",
  category: "antagonist",
  physical: "A NightWing of the same hardened, volcanic-island upbringing as his companions, marked by the wariness and toughness common to NightWings raised in scarcity.",
  role: "Antagonist — NightWing Conspirator in the Kidnapping of Sunny",
  personality: ["Cautious", "Anxious", "Loyal to his companions"],
  abilities: ["Survival skills honed on the resource-scarce NightWing volcanic island", "Capable tracker and conspirator within the kidnapping scheme"],
  description: "Preyhunter is the third member of the NightWing trio that kidnaps Sunny, generally more anxious and cautious than his companions, frequently anticipating danger and warning the others — including a famous moment of paranoia about 'The Darkstalker' after finding an ominous threat written near their stolen mirror.",
  background: "Like Fierceteeth and Strongwings, Preyhunter grew up under harsh conditions on the NightWing volcanic island before joining the scheme to kidnap Sunny in exchange for resources from the warring SandWing princesses.",
  arcStory: "Preyhunter participates in Sunny's kidnapping and is killed by Thorn when the scheme collapses in the Scorpion Den, ending his arc abruptly compared to his surviving companions.",
  relationships: [
    { name: "Fierceteeth", relation: "Fellow conspirator in the kidnapping scheme." },
    { name: "Strongwings", relation: "Fellow conspirator in the kidnapping scheme." }
  ],
  quotes: []
},
{
  id: "dune",
  name: "Dune",
  tribe: "sand",
  gender: "Male",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/b/b7/Dune_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518230906",
  category: "antagonist",
  physical: "A SandWing involved in the criminal trade of the Scorpion Den, known for stealing eggs as part of larger schemes tied to the Talons of Peace and the war.",
  role: "Antagonist — Egg Thief of the Scorpion Den",
  personality: ["Opportunistic", "Mercenary", "Willing to traffic in stolen eggs for profit"],
  abilities: ["Familiarity with the Scorpion Den's black market dealings", "Skilled at evading capture for years despite a substantial bounty on his head"],
  description: "Dune is the SandWing who stole Sunny's egg from the Scorpion Den, setting her on the path to becoming one of the dragonets of destiny. Thorn — Sunny's birth mother — placed a substantial bounty on his head out of sheer hatred for the theft, though he managed to evade her wrath until his eventual death.",
  background: "Operating within the criminal underbelly of the Scorpion Den during the War of SandWing Succession, Dune was involved in stealing eggs, including Sunny's, likely as part of the larger Talons of Peace scheme to gather the dragonets of the prophecy.",
  arcStory: "Dune's theft of Sunny's egg sets much of the series' plot in motion, though he himself dies before Thorn — who searched for him relentlessly — ever gets the chance to confront him directly, leaving her bitterly disappointed.",
  relationships: [
    { name: "Thorn", relation: "Sunny's birth mother, who hated Dune fiercely for stealing her daughter's egg and placed a standing bounty on his capture." },
    { name: "Sunny", relation: "The dragonet whose egg he stole, setting her on the path to becoming part of the Dragonet Prophecy." }
  ],
  quotes: []
},
{
  id: "addax",
  name: "Addax",
  tribe: "sand",
  gender: "Male",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  category: "antagonist",
  physical: "A SandWing soldier with a sneaky, opportunistic bearing, willing to manufacture danger for his own gain.",
  role: "Antagonist — SandWing Soldier and Schemer of the Scorpion Den Orphanage Fire",
  personality: ["Deceptive", "Opportunistic", "Willing to endanger others for personal advantage"],
  abilities: ["Skilled at staging convincing hoaxes and manipulating panic for personal advantage", "Connections within Burn's army that he hoped to leverage for personal gain"],
  description: "Addax staged a fire and a fake dragonbite viper sighting at the Scorpion Den orphanage, hoping to use the resulting chaos to kidnap Sunny and deliver her to Queen Burn in exchange for regaining his place in Burn's army.",
  background: "A soldier who had lost his standing in Burn's forces, Addax saw the orphaned, unusual-looking Sunny as a potential bargaining chip to win back his position, willing to set a populated orphanage on fire to create the opportunity.",
  arcStory: "Addax's scheme to kidnap Sunny during the staged orphanage fire is foiled by the Outclaws before he can succeed, exposing his deception and ending his attempt to curry favor with Burn.",
  relationships: [
    { name: "Burn", relation: "The SandWing princess he hoped to win back favor with by delivering Sunny to her." },
    { name: "Sunny", relation: "The dragonet he attempted to kidnap during the staged orphanage fire." }
  ],
  quotes: []
},
{
  id: "scorpionqueen",
  name: "Queen Scorpion",
  tribe: "sand",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "",
  category: "antagonist",
  physical: "An adult SandWing queen of the ancient era depicted in Darkstalker, adorned in heavy jewelry befitting her status, ruling over the Kingdom of Sand during a period of opportunistic neutrality.",
  role: "Antagonist — Queen of the SandWings During the Era of Darkstalker",
  personality: ["Greedy", "Power-hungry", "Opportunistic", "Mercenary in her diplomacy"],
  abilities: ["Absolute political authority over the ancient SandWing kingdom", "Skilled at extracting profit from neutrality, leveraging her territory's strategic value"],
  description: "Queen Scorpion ruled the SandWings during the era of Darkstalker with a singular focus on enriching her own kingdom, famously allowing the warring NightWings and IceWings to battle directly on SandWing territory in exchange for massive piles of treasure from both sides — prioritizing profit over any moral stake in the conflict.",
  background: "Queen Scorpion governed the SandWing tribe for approximately sixty years, maintaining her wealth and power through calculated neutrality in the era's growing tribal conflicts, always finding a way to profit from other tribes' wars rather than her own.",
  arcStory: "Scorpion's decision to let the NightWing-IceWing conflict play out on SandWing soil for payment exemplifies her reign's defining trait — using her kingdom's strategic position as a bargaining chip rather than taking any principled stance, until her rule ends after roughly sixty years.",
  relationships: [],
  quotes: []
},
{
  id: "magnificent",
  name: "Queen Magnificent",
  tribe: "rain",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "",
  category: "antagonist",
  physical: "A RainWing queen with the typical color-shifting scales of her tribe, carrying herself with the entitled self-importance of a monarch who values her title far more than her duties.",
  role: "Antagonist — Negligent Pre-Glory Queen of the RainWings",
  personality: ["Lazy", "Self-absorbed", "Defensive of her status", "Incompetent as a ruler"],
  abilities: ["RainWing venom spit and camouflage abilities", "Political maneuvering aimed primarily at securing and keeping her own throne"],
  description: "Queen Magnificent is one of the laziest and most self-interested rulers in RainWing history, a queen who schemed and cheated to win the Royal Challenge for her throne but did almost nothing useful with the power once she had it, neglecting the rampant kidnapping of her own subjects by the NightWings rather than confront the problem.",
  background: "Magnificent secured the RainWing throne through the tribe's traditional Royal Challenge, reportedly through underhanded means, and ruled with a focus on personal comfort rather than her subjects' wellbeing — emblematic of the broader complacency among RainWing royalty before Glory's reign.",
  arcStory: "When Glory investigates the disappearance of numerous RainWings — secretly kidnapped by the NightWings — Magnificent shows almost no urgency or concern, more interested in being rid of the annoyance than actually solving the crisis, ultimately setting the stage for Glory's challenge to the throne.",
  relationships: [
    { name: "Exquisite", relation: "A fellow former RainWing queen and frequent companion, whom Magnificent dismissively calls 'a big furhead' despite their shared circle." },
    { name: "Glory", relation: "The dragonet of destiny who eventually challenges and defeats the RainWing monarchy's complacent rule, including Magnificent's own claim." }
  ],
  quotes: ["\"And don't forget to report back to me on that investigation. It'll be nice to have something to make Mangrove go away. What's your name, anyhow?\""]
},
{
  id: "exquisite",
  name: "Exquisite",
  tribe: "rain",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/34/Ex_GN_1.png/revision/latest/scale-to-width-down/500?cb=20200519205422",
  category: "antagonist",
  physical: "A RainWing former queen with the tribe's typical color-shifting scales, almost always found surrounded by her beloved collection of sloths.",
  role: "Antagonist — Former RainWing Queen Obsessed with Sloths",
  personality: ["Obsessive about her sloths", "Petty", "Indifferent to her royal duties", "Defensive when challenged"],
  abilities: ["RainWing venom spit, used to win the tree-gliding portion of a Royal Challenge with the help of her sloths", "Owns and commands the loyalty of over twenty sloths"],
  description: "Exquisite is a former RainWing queen whose true priority has never been the tribe but her beloved collection of more than twenty sloths, which she values, by her own apparent admission, well above her actual subjects. She reportedly won a key portion of the Royal Challenge for her throne using a vine snare set by her sloths — a possible act of cheating that was never proven.",
  background: "As one of the RainWing queens in the cycle of negligent rulers before Glory, Exquisite secured her throne the same way most RainWing queens of her era did — through the tribe's ritual challenge — and proceeded to govern with minimal interest in anything beyond her personal comforts and pets.",
  arcStory: "Exquisite's obsessive love for her sloths becomes a recurring point of conflict, including confronting Winter when he tries to eat one of them, and she remains closely allied with Magnificent's circle of former queens even after losing the throne to Glory.",
  relationships: [
    { name: "Magnificent", relation: "A fellow former RainWing queen, often at her side despite Magnificent's irritation at being called 'Auntie Maggie.'" },
    { name: "Glory", relation: "The dragonet of destiny whose challenge ended the era of negligent RainWing rule that Exquisite represented." }
  ],
  quotes: ["\"Toe-Fur is nobody's lunch! Those nasty black dragons have already gotten one of my sloths! I'm not letting it happen again!\""]
},
{
  id: "fruitbat",
  name: "Queen Fruit Bat",
  tribe: "rain",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "",
  category: "antagonist",
  physical: "A RainWing former queen with the tribe's typical color-shifting scales, part of the same circle of self-interested monarchs who preceded Glory's reign.",
  role: "Antagonist — Former RainWing Queen of the Negligent Era",
  personality: ["Self-interested", "Indifferent to tribal welfare", "Comfort-focused"],
  abilities: ["RainWing venom spit and camouflage abilities", "Standing within the cycle of former RainWing royalty"],
  description: "Queen Fruit Bat is another of the disengaged former RainWing queens, ruling during an era when the tribe's monarchy was defined more by personal indulgence than genuine leadership, doing little of lasting note for her subjects during her reign.",
  background: "Like Magnificent, Exquisite, and Dazzling, Fruit Bat ascended through the RainWing Royal Challenge system and ruled in the same complacent style that left the tribe vulnerable and disengaged from real threats like the ongoing NightWing kidnappings.",
  arcStory: "Fruit Bat is part of the broader backdrop of ineffective RainWing leadership that Glory's rise to power directly responds to and ultimately replaces.",
  relationships: [
    { name: "Glory", relation: "The dragonet of destiny whose reign succeeded the era of queens like Fruit Bat." }
  ],
  quotes: []
},
{
  id: "dazzling",
  name: "Queen Dazzling",
  tribe: "rain",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "",
  category: "antagonist",
  physical: "A RainWing former queen with the tribe's typical vivid, color-shifting scales, part of the same circle of self-interested pre-Glory monarchs.",
  role: "Antagonist — Former RainWing Queen of the Negligent Era",
  personality: ["Vain", "Self-interested", "Disengaged from ruling"],
  abilities: ["RainWing venom spit and camouflage abilities", "Standing within the cycle of former RainWing royalty"],
  description: "Queen Dazzling represents another link in the chain of RainWing monarchs who valued personal indulgence and status over the actual welfare of their tribe, ruling during the same general era of complacency that defined the RainWings before Glory's reforms.",
  background: "Dazzling rose to the throne through the traditional Royal Challenge system, governing in the same largely disengaged style as her fellow former queens Magnificent, Exquisite, and Fruit Bat.",
  arcStory: "Like her peers, Dazzling's reign is part of the broader pattern of RainWing royal apathy that left the tribe unprepared for crises like the mass kidnapping of its citizens, setting the stage for Glory's eventual challenge and reform of the throne.",
  relationships: [
    { name: "Glory", relation: "The dragonet of destiny whose ascension marked the end of the era of queens like Dazzling." }
  ],
  quotes: []
},
{
  id: "anaconda",
  name: "Queen Anaconda",
  tribe: "rain",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "A Guide to the Dragon World",
    firstAppearance: "A Guide to the Dragon World",
  image: "",
  category: "antagonist",
  physical: "A fierce, powerful RainWing queen from the ancient era of Darkstalker, carrying herself with an aggressive confidence unusual for her tribe's later, more peaceful reputation.",
  role: "Antagonist — Militant Ancient Queen of the RainWings",
  personality: ["Fierce", "Ambitious", "Militaristic", "Uncompromising"],
  abilities: ["Commanded a fierce RainWing army, unusual for the tribe's later pacifist reputation", "Maintained assassin training programs within her court", "Skilled and ruthless in traditional combat, ruling through strength"],
  description: "Queen Anaconda ruled the RainWings during the ancient era of Darkstalker as a militaristic, ambitious monarch utterly unlike the peaceful tribe RainWings would later become — she disregarded peace treaties, maintained assassin training programs, and vowed she would never surrender in battle even as the last RainWing standing.",
  background: "Sister to Princess Python and grandmother to the future reformist Queen Jacaranda, Anaconda represented the RainWings' more violent ancient history, before generations of cultural change transformed the tribe into the pacifist society seen in the modern series.",
  arcStory: "Anaconda's militant reign eventually ends when she is challenged for the throne by her own daughter, dying in the contest — a death that, combined with the broader trajectory of RainWing history, eventually paves the way toward Jacaranda's later peaceful reforms.",
  relationships: [
    { name: "Princess Python", relation: "Her sister, whose letters preserve much of what is known about Anaconda's fierce reign." },
    { name: "Queen Jacaranda", relation: "Her granddaughter, who would later transform RainWing society into the peaceful culture seen in the present-day series." }
  ],
  quotes: []
},
{
  id: "vermilion",
  name: "Vermilion",
  tribe: "sky",
  gender: "Male",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/7/71/Vermilion_GN_6.png/revision/latest?cb=20241224113515",
  category: "antagonist",
  physical: "An adult SkyWing prince with bright red scales, Ex-Queen Scarlet's eldest surviving son, carrying himself with the wary posture of a dragon who has spent his whole life trying not to anger his mother.",
  role: "Antagonist — Scarlet's Cowed Eldest Son and Former Arena Announcer",
  personality: ["Fearful", "Weak-willed", "Self-preserving", "Quietly resentful"],
  abilities: ["Served as the announcer for Scarlet's gladiatorial arena, skilled at riling up crowds and arguing for prosecution", "Survived decades of his mother's volatile rule through careful, fearful compliance"],
  description: "Vermilion is Scarlet's eldest son, a SkyWing prince whose loyalty to his mother was never affection but pure survival instinct, born from watching so many of his siblings die at her talons over the years. He served faithfully as her arena announcer throughout her reign, but the moment she vanished, he transferred his allegiance to Ruby almost overnight, recognizing a far better queen when he saw one.",
  background: "Raised under Scarlet's volatile, murderous rule, Vermilion learned early that compliance was the only path to survival, watching countless siblings perish under her temper while he carefully stayed in her good graces by performing his role at the arena without complaint.",
  arcStory: "After Scarlet's apparent death, Vermilion quickly and genuinely commits to serving the new Queen Ruby — and when Scarlet later resurfaces and uses a dreamvisitor to order him to help her reclaim the throne and kill Ruby, Vermilion, despite his fear, ultimately ignores every one of her commands.",
  relationships: [
    { name: "Scarlet", relation: "His mother and former queen, whose fear-based control over him persisted even after her presumed death, though he ultimately defied her final orders." },
    { name: "Ruby", relation: "The SkyWing queen he transferred his loyalty to, recognizing her as a far better ruler than his own mother." }
  ],
  quotes: []
},
{
  id: "flame",
  name: "Flame",
  tribe: "sky",
  gender: "Male",
  arc: 2,
  book: 7,
  bookTitle: "Winter Turning",
    firstAppearance: "Winter Turning",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/dd/Flame_GN_38.png/revision/latest/scale-to-width-down/500?cb=20260109103502",
  category: "antagonist",
  physical: "A SkyWing dragonet at Jade Mountain Academy, marked by a visible scar on his snout from a training accident with Viper and a noticeably forked tongue, unusual for his tribe.",
  role: "Antagonist — Embittered SkyWing of the False Dragonets of Destiny",
  personality: ["Angry", "Grouchy", "Quick-tempered", "Resentful", "Hiding deep insecurity"],
  abilities: ["Fire-breathing SkyWing combat training, honed as one of the false dragonets of destiny", "Skilled at masking his vulnerabilities behind hostility"],
  description: "Flame is a SkyWing who despises nearly everyone around him, carrying a simmering hatred behind his eyes that other characters describe as genuinely dark — Moonwatcher compares the inside of his mind to inky bile, and Mindreader calls his thoughts 'nasty boiling tar.' Beneath the hostility, however, Sunny senses he could be a different dragon if someone genuinely cared for him, as his mother Avalanche clearly does.",
  background: "Flame's mother, Avalanche, joined the Talons of Peace specifically to save him from being drafted into the SkyWing army, and he hatched as one of the false dragonets of destiny meant to fulfill the prophecy in Glory's place before Glory's egg was recovered.",
  arcStory: "Raised among the other false dragonets, Flame teamed up with Viper to bully Squid during training, and his short temper and resentment carry into his time at Jade Mountain Academy, where his animosity toward Stonemover for refusing to heal his scar, and his general hostility, mark him as one of the more difficult dragonets to win over.",
  relationships: [
    { name: "Avalanche", relation: "His mother, whose genuine care for him stands in stark contrast to his hostile demeanor toward everyone else." },
    { name: "Viper", relation: "A fellow false dragonet and frequent ally in bullying Squid, though their training partnership also left Flame with a permanent scar." }
  ],
  quotes: ["\"I already asked an animus to do that, and he said he wouldn't. Or couldn't. Slithering toadstool worm.\" — about Stonemover, after he refused to heal Flame's scar"]
},
{
  id: "viper",
  name: "Viper",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/5/5a/ViperGN3.png/revision/latest/scale-to-width-down/443?cb=20201229213255",
  category: "antagonist",
  physical: "A SandWing dragonet among the false dragonets of destiny, marked by her sharp, combative temperament in training exercises.",
  role: "Antagonist — Hostile SandWing of the False Dragonets of Destiny",
  personality: ["Combative", "Aggressive", "Teaming up against weaker dragonets"],
  abilities: ["SandWing venomous tail barb and fire-breathing, honed through training as a false dragonet", "Skilled in coordinated combat alongside Flame against weaker training partners"],
  description: "Viper is one of the false dragonets raised in place of the true Dragonets of Destiny, frequently teaming up with Flame to bully Squid during training exercises — a partnership that also left Flame with a lasting scar after Viper accidentally caught him with her tail during a sparring match.",
  background: "Raised within the Talons of Peace's training program for the false dragonets, Viper developed a combative, often cruel disposition toward her weaker training partners.",
  arcStory: "Viper's role among the false dragonets ends in her death, an event that Flame notably shows little grief over despite their training partnership.",
  relationships: [
    { name: "Flame", relation: "Her frequent training partner in bullying Squid, though she also accidentally scarred him during a sparring match." },
    { name: "Squid", relation: "A fellow false dragonet whom she and Flame regularly targeted during training." }
  ],
  quotes: []
},
{
  id: "tourmaline",
  name: "Tourmaline",
  tribe: "sky",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "A Guide to the Dragon World",
    firstAppearance: "A Guide to the Dragon World",
  category: "antagonist",
  physical: "A SkyWing of the royal family, named after the colorful gemstone in the SkyWing tradition of naming royalty after minerals.",
  role: "Antagonist — SkyWing Royal Figure",
  personality: ["Ambitious", "Politically minded"],
  abilities: ["Standing within the SkyWing royal family", "Familiarity with SkyWing court politics following Scarlet's downfall"],
  description: "Tourmaline is a SkyWing connected to the royal family during the period of upheaval following Scarlet's disappearance and Ruby's ascension, with some fans and in-world dragons divided on which of the two would have made the better queen.",
  background: "As part of the broader SkyWing royal lineage, Tourmaline's standing places her amid the political reshuffling that occurred in the wake of Scarlet's long and brutal reign.",
  arcStory: "Tourmaline's place in the SkyWing succession reflects the ongoing instability of the tribe's monarchy even after Scarlet's fall, with citizens divided over the competing claims to the throne.",
  relationships: [
    { name: "Queen Ruby", relation: "A fellow SkyWing royal whose claim to the throne some dragons compared against Tourmaline's." }
  ],
  quotes: []
},
{
  id: "crow",
  name: "Crow",
  tribe: "sky",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "A Guide to the Dragon World",
    firstAppearance: "A Guide to the Dragon World",
  category: "antagonist",
  physical: "A SkyWing named in the tribe's tradition of naming dragons after mountain-dwelling birds, carrying the typical fierce bearing common among SkyWing warriors.",
  role: "Antagonist — SkyWing Figure",
  personality: ["Militaristic", "Hardened"],
  abilities: ["SkyWing fire-breathing and combat training typical of the tribe's militaristic culture"],
  description: "Crow is a SkyWing whose name follows the tribe's tradition of naming dragons after mountain birds, embedded within the broader militaristic, often harsh culture that defines much of SkyWing society as depicted throughout the series.",
  background: "Like many SkyWings, Crow's background ties into the tribe's long history of conflict and rigid military structure, particularly during and after the War of SandWing Succession.",
  arcStory: "Crow represents the broader, often unnamed rank-and-file of SkyWing society shaped by generations of conflict and harsh leadership under queens like Scarlet.",
  relationships: [],
  quotes: []
},
{
  id: "battlewinner",
  name: "Queen Battlewinner",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "",
  category: "antagonist",
  physical: "Massive, as large as Morrowseer, with gleaming black scales seemingly emitting white steam. Her eyes carry a glint of icy blue, and two of her teeth are frozen into pale icicles, her throat and tongue lined with feathery frost from a wound that never fully healed.",
  role: "Antagonist — Hidden Queen of the NightWings, Co-Creator of the Dragonet Prophecy",
  personality: ["Vicious", "Cunning", "Manipulative", "Secretly desperate", "Impulsive when enraged"],
  abilities: ["Massive size and physical power, rivaling even Morrowseer", "Survived a near-fatal IceWing frostbreath attack by diving into a lava pool, fusing fire and ice into a permanent, lethal balance", "Strategic mind behind the Dragonet Prophecy, devised with Morrowseer to find the starving NightWings a new home"],
  description: "Queen Battlewinner is the secret, hidden ruler of the NightWings — confined permanently to a hidden lava cauldron after an old IceWing wound left her unable to survive outside its heat. She rules from the shadows through her daughter Greatness, who serves as her mouthpiece, projecting an aura of mystery and danger that masks the desperation of a starving, dying tribe. Vicious to subordinates and willing to order executions on a whim, she nonetheless genuinely cares about her tribe's survival, having co-created the Dragonet Prophecy specifically to find the NightWings a new home.",
  background: "Decades before the events of the main series, Battlewinner was nearly killed by an IceWing's frostbreath attack; the only thing keeping the ice from finishing her off was diving into a lava pool, leaving her permanently trapped between fire and ice, unable to ever leave her cauldron without dying. She concealed this weakness from her tribe, ruling instead through Greatness and cultivating an image of unknowable power.",
  arcStory: "When Glory and her allies discover Battlewinner's secret and confront her, demanding she stop kidnapping RainWings, Battlewinner refuses and, in a final fit of fury, lunges out of her lava cauldron to attack them — only for Glory's frost breath ally to finish what the IceWings started years before, killing her within seconds and clearing the way for Glory to become the NightWings' new queen.",
  relationships: [
    { name: "Greatness", relation: "Her daughter and reluctant spokesdragon, whom she dismissed as cowardly and unfit to rule." },
    { name: "Morrowseer", relation: "Her most trusted advisor, with whom she co-created the Dragonet Prophecy as a survival strategy for the starving NightWings." },
    { name: "Glory", relation: "The RainWing dragonet of destiny who ultimately confronts and kills her, taking the NightWing throne in the aftermath." }
  ],
  quotes: []
},
{
  id: "greatness",
  name: "Greatness",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/e0/GreatnessGN8.png/revision/latest/scale-to-width-down/315?cb=20201229202531",
  category: "antagonist",
  physical: "An adult NightWing princess with black eyes and a scar rippling down her chest, her wings drooping oddly as though weighted down. She wears clusters of diamonds around her neck and smaller teardrop diamonds wound around her horns.",
  role: "Antagonist — Reluctant Heir and Mouthpiece of Queen Battlewinner",
  personality: ["Anxious", "Reluctant", "Quietly empathetic", "Self-aware about her own limitations"],
  abilities: ["Serves as the official voice and public face of Queen Battlewinner, relaying her mother's hidden commands to the tribe", "Limited but genuine political authority as heir to the NightWing throne"],
  description: "Greatness is Battlewinner's only daughter and the reluctant face of NightWing leadership, a princess who openly admits she has no interest in ruling and believes herself unfit for the crown. Unlike her mother, she shows real moments of empathy — sparing Deathbringer's life after a failed mission and ultimately recognizing that Glory would make a far better queen than she ever could.",
  background: "As Battlewinner's heir, Greatness was thrust into a public leadership role she never wanted, forced to relay her mother's often cruel commands to the tribe from behind a hidden screen while privately doubting her own capability and right to rule.",
  arcStory: "When Glory and her allies confront the NightWing regime, Greatness shows little resistance, willingly revealing her mother's secret and ultimately stepping aside in favor of Glory's leadership — one of the first NightWings to flee into the escape tunnel toward the rainforest rather than fight.",
  relationships: [
    { name: "Battlewinner", relation: "Her mother and queen, who dismissed her as cowardly and unambitious despite relying on her as the tribe's voice." },
    { name: "Deathbringer", relation: "An assassin under her authority, whose life she spared despite his failed mission — earning him the nickname 'her pet assassin.'" },
    { name: "Glory", relation: "The RainWing dragonet of destiny whom Greatness ultimately bows to, believing her a far better ruler than herself." }
  ],
  quotes: ["\"Please listen. You're dooming us to a horrible end. The volcano is not only a future threat — it's killing us now. There's almost no prey left. We're all starving.\""]
},
{
  id: "vengeance",
  name: "Vengeance",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/af/Vengeance_GN_1.png/revision/latest?cb=20200518013907",
  category: "antagonist",
  physical: "A NightWing assassin and council member, carrying himself with the hardened, suspicious bearing typical of the tribe's volcanic-island upbringing.",
  role: "Antagonist — NightWing Council Member and Rival Assassin",
  personality: ["Vengeful", "Resentful", "Reckless", "Quick to accuse others"],
  abilities: ["Trained NightWing assassin", "Political standing within Battlewinner's council, used to maneuver against rivals"],
  description: "Vengeance is a NightWing council member and assassin whose resentment toward Deathbringer — and desire to prove himself — drives him to dangerously overstep, ultimately bringing a venomous threat into the NightWing council chamber disguised as something harmless, an act of recklessness that costs him his life.",
  background: "Operating within Battlewinner's inner political circle, Vengeance competed for status and recognition among the NightWing's elite assassins, his rivalry with Deathbringer simmering beneath the council's formal proceedings.",
  arcStory: "After being accused of endangering the tribe by bringing a disguised viper into the council chamber, Vengeance is sentenced to death by Queen Battlewinner's order and is executed by being thrown into her lava pool.",
  relationships: [
    { name: "Deathbringer", relation: "A rival NightWing assassin whose accusations and successes Vengeance resented deeply." },
    { name: "Queen Battlewinner", relation: "The monarch who ultimately ordered his execution for endangering the tribe." }
  ],
  quotes: []
},
{
  id: "slaughter",
  name: "Slaughter",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003",
  category: "antagonist",
  physical: "A NightWing assassin trained within the tribe's elite ranks, carrying a name as blunt and threatening as his profession.",
  role: "Antagonist — NightWing Assassin",
  personality: ["Lethal", "Disciplined", "Loyal to the tribe's hierarchy"],
  abilities: ["Trained NightWing assassin, among the tribe's most feared killers"],
  description: "Slaughter is one of the NightWings' trained assassins, operating within the same dangerous political and military hierarchy as Deathbringer and Vengeance under Queen Battlewinner's hidden rule.",
  background: "Raised and trained within the NightWing tribe's harsh assassin program on the resource-scarce volcanic island, Slaughter became one of several lethal operatives serving the queen's interests.",
  arcStory: "Slaughter is named as a target a young dragonet must kill in stealth to prove himself worthy of joining Queen Battlewinner's service, part of the brutal trials NightWing assassins are expected to pass.",
  relationships: [
    { name: "Queen Battlewinner", relation: "The monarch he serves as part of her assassin corps." }
  ],
  quotes: []
},
{
  id: "icicle",
  name: "Icicle",
  tribe: "ice",
  gender: "Female",
  arc: 2,
  book: 6,
  bookTitle: "Moon Rising",
    firstAppearance: "Moon Rising",
  image: "",
  category: "antagonist",
  physical: "Gleaming white scales kept pristine through ritual ocean dives six times a day, pale arctic blue eyes, and a haughty, smooth, high-pitched voice. Larger than her brother Winter and most RainWings, with sharp claws and gleaming teeth she keeps immaculate even after brutal combat.",
  role: "Antagonist — Winter's Vengeful Older Sister",
  personality: ["Haughty", "Ferocious", "Desperate beneath her cruelty", "Fiercely loyal to Hailstorm specifically"],
  abilities: ["Skilled solitary combat, capable of clubbing prey single-handedly without aid", "Frostbreath and IceWing physical combat training", "Ruthless determination, willing to act entirely alone rather than ask for help"],
  description: "Icicle is Winter's older sister, a brilliant and dangerous IceWing who values appearance and intimidation as much as raw combat skill — bathing repeatedly each day to keep her scales gleaming because she believes a glittering IceWing is the more frightening one. She shows little warmth toward Winter, calling him useless and a disappointment, but her devotion to their brother Hailstorm runs bottomlessly deep, a loyalty that Scarlet exploits ruthlessly to manipulate her into murder.",
  background: "Raised within the same rigid, status-obsessed IceWing culture as Winter, Icicle developed a cold, calculating personality from an early age, favoring Hailstorm over her other siblings and measuring worth by strength, cleanliness, and dominance — values she absorbed completely from IceWing tradition.",
  arcStory: "Believing Hailstorm to be Scarlet's prisoner, Icicle is manipulated through invasive dreamvisitor messages into attempting to murder the dragonets of destiny at Jade Mountain Academy in exchange for her brother's life. When her attempt fails, she goes into hiding, increasingly desperate and self-destructive, burning her own scales to avoid Scarlet's continued psychological torment in her dreams — only to learn afterward that Winter had already killed Hailstorm himself, years earlier, in a mercy killing she never knew about.",
  relationships: [
    { name: "Winter", relation: "Her younger brother, whom she dismisses as useless even as he continues to care about her despite her cruelty." },
    { name: "Hailstorm", relation: "Her favored brother, whose presumed captivity by Scarlet drove her to attempt murder — only to learn the truth of his fate far too late." },
    { name: "Scarlet", relation: "The SkyWing queen who manipulated her through dreams, exploiting her love for Hailstorm to turn her into an assassin." }
  ],
  quotes: ["\"I don't need your help, of all dragons.\" — to Winter"]
},
{
  id: "mastermind",
  name: "Mastermind",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/4c/MastermindGN2.png/revision/latest/scale-to-width-down/466?cb=20201229200059",
  category: "antagonist",
  physical: "An adult NightWing scientist, carrying himself with the focused, methodical bearing of a researcher more interested in his experiments than in moral implications.",
  role: "Antagonist — NightWing Head Scientist and Torturer",
  personality: ["Methodical", "Loyal to the tribe", "Scientifically curious to a disturbing degree", "Genuinely believes he's helping his people"],
  abilities: ["Skilled inventor and scientist, capable of devising practical countermeasures like a venom-resistant helmet against RainWing attacks", "Extensive knowledge gained through years of experimentation on captive RainWings"],
  description: "Mastermind served as the NightWing tribe's head scientist on the volcanic island, applying his considerable intellect toward experiments on captured RainWings in service of his starving, desperate people. He never relished cruelty for its own sake — by his own account, and according to many who've reconsidered his portrayal, he genuinely believed he was protecting his tribe rather than indulging in malice, viewing other tribes as scientifically and culturally inferior in the way many NightWings of his generation did.",
  background: "As the NightWing tribe's foremost scientist, Mastermind dedicated his skills to solving the practical problems of NightWing survival on their resource-poor volcanic island, including researching ways to counteract RainWing venom for use against captured prisoners.",
  arcStory: "After the NightWing Exodus to the rainforest, Mastermind is imprisoned for his crimes against the RainWings he experimented on, a punishment that continues for years as he remains confined in the Rainforest Kingdom.",
  relationships: [
    { name: "Queen Battlewinner", relation: "The monarch he served loyally, applying his scientific skill toward her tribe's survival." }
  ],
  quotes: []
},
{
  id: "quickstrike",
  name: "Quickstrike",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/b/b4/QuickstrikeTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210421154413",
  category: "antagonist",
  physical: "A NightWing council member, carrying the typical sharp, watchful bearing common to the tribe's political and military elite.",
  role: "Antagonist — NightWing Council Member",
  personality: ["Calculating", "Politically engaged", "Loyal to Battlewinner's regime"],
  abilities: ["Standing within Queen Battlewinner's NightWing council", "Political maneuvering within the tribe's hierarchy"],
  description: "Quickstrike is a member of Queen Battlewinner's NightWing council during the era of the tribe's hidden volcanic rule, embedded in the political machinery that enforced the queen's often harsh decisions.",
  background: "As part of the NightWing council, Quickstrike operated within the same political structure that birthed the Dragonet Prophecy and ruled the starving tribe under Battlewinner's secretive, fear-based authority.",
  arcStory: "Quickstrike's role within the council places her among the dragons whose decisions shaped the NightWings' approach to the dragonets of destiny and the broader war, operating within Battlewinner's regime until the tribe's eventual exodus to the rainforest.",
  relationships: [
    { name: "Queen Battlewinner", relation: "The monarch whose council she served on." }
  ],
  quotes: []
},
{
  id: "secretkeeper",
  name: "Secretkeeper",
  tribe: "night",
  gender: "Female",
  arc: 2,
  book: 6,
  bookTitle: "Moon Rising",
    firstAppearance: "Moon Rising",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/2/2f/Secretkeeper_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251101064749",
  category: "antagonist",
  physical: "Tall and thin, resembling her daughter Moonwatcher closely, though without the silver teardrop scales that mark NightWing mind-readers.",
  role: "Antagonist — Moonwatcher's Mother, Branded a Tribal Traitor",
  personality: ["Fiercely protective", "Secretive", "Guarded with her emotions", "Practical"],
  abilities: ["Skilled at maintaining a years-long deception to protect her daughter", "Willingness to act ruthlessly in defense of those she loves, including threatening lethal action to protect Moonwatcher's secret"],
  description: "Secretkeeper is widely branded a traitor among the NightWings for lying to her tribe about her daughter's egg in order to secretly raise Moonwatcher safely in the rainforest, away from the volcanic island's misery, smoke, and constant fear. Though her actions are rooted in maternal love rather than malice, the wiki categorizes her among the tribe's antagonist figures for her years of deception and willingness to act against her own people to protect that secret.",
  background: "In a relationship with Morrowseer, Secretkeeper hid the truth about her daughter Moonwatcher's egg, claiming it had cracked and died rather than allow the dragonet to grow up amid the volcano's deprivation — a lie that protected Moonwatcher but devastated Morrowseer, who died never knowing his daughter survived.",
  arcStory: "Secretkeeper's long-buried secret comes to light as Moonwatcher grows older and begins asking questions about her past, forcing a reckoning between mother and daughter over years of hidden truth, fierce protectiveness, and the cost of secrets kept even from those they're meant to protect.",
  relationships: [
    { name: "Moonwatcher", relation: "Her daughter, whom she raised in secret away from the NightWing island to protect her from its hardships." },
    { name: "Morrowseer", relation: "Moonwatcher's father, who died believing his daughter's egg had never hatched." }
  ],
  quotes: ["\"I should have kept her with me. I shouldn't have lied to my tribe. I only wanted to protect her from that island — from the smoke and the smell and the rules and the misery.\""]
},
{
  id: "sora",
  name: "Sora",
  tribe: "mud",
  gender: "Female",
  arc: 2,
  book: 6,
  bookTitle: "Moon Rising",
    firstAppearance: "Moon Rising",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/c/cc/Sora_GN_14.png/revision/latest/scale-to-width-down/268?cb=20260731060742",
  category: "antagonist",
  physical: "Brown scales and eyes resembling her brother Marsh, smaller than Mulberry, wearing a self-woven necklace of reeds and small paper cranes that shine white and gold in memory of her dead sister.",
  role: "Antagonist — Grief-Driven Bomber of Jade Mountain Academy",
  personality: ["Shy and introverted on the surface", "Consumed by grief and guilt", "Fiercely loyal to her siblings", "Increasingly fragile under pressure"],
  abilities: ["Capable of constructing and planting an explosive device within Jade Mountain Academy", "MudWing combat training from her service in the War of SandWing Succession", "Skilled at concealing her plans and emotional state from those around her"],
  description: "Sora is a quiet, bookish MudWing whose gentle exterior conceals a devastating secret — a years-long obsession with avenging her sister Crane's murder at Icicle's talons. Clay calls her 'the least offensive dragon at Jade Mountain Academy,' which makes her transformation into a bomber all the more shocking: she sets off an explosive in the school's history cave attempting to kill Icicle, accidentally killing two other students, Bigtail and Carnelian, and injuring Tamarin in the process.",
  background: "Sora watched her sister Crane die in battle during the War of SandWing Succession, slashed across the throat by an IceWing she would later recognize as Icicle. The trauma of witnessing this murder, combined with deep MudWing sibling loyalty, transformed her grief into an all-consuming need for vengeance that she nursed in secret for years.",
  arcStory: "Enrolling at Jade Mountain Academy specifically to get close to Icicle, Sora makes repeated failed attempts on her life before finally planting a bomb that kills innocent bystanders instead of her intended target. Wracked with guilt over the collateral deaths, she flees with her brother Umber to the Dungeon Isle, where she eventually begins training as a healer — trying, slowly, to become someone other than the dragon who built that bomb.",
  relationships: [
    { name: "Crane", relation: "Her deceased sister, whose murder by Icicle drove her years-long quest for vengeance." },
    { name: "Icicle", relation: "The IceWing she blamed for Crane's death and made repeated attempts to kill." },
    { name: "Umber", relation: "Her brother, who fled with her after her crimes were exposed and who continues to see the good in her despite what she's done." }
  ],
  quotes: ["\"And then everyone was looking at me. Everyone was thinking about me and how awful I am and how much they hate me. They could see right through me, I know they could.\""]
},
{
  id: "taipan",
  name: "Taipan",
  tribe: "leaf",
  gender: "Male",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/1/10/TaipanProfile.png/revision/latest/scale-to-width-down/419?cb=20260323154957",
  category: "antagonist",
  physical: "Short and stocky with muscular shoulders, covered in sharp rose-thorn spikes across his body, with bright green and black blobby-striped scales and a sharp, bristling horn on his snout reminiscent of a rhinoceros.",
  role: "Antagonist — Bully of the Court of Refuge",
  personality: ["Cruel", "Bullying", "Status-obsessed", "Cowardly when confronted as a group"],
  abilities: ["Capable fire-based combat, used to test and intimidate weaker dragons", "Physical intimidation through size and aggression", "Leadership over a small bullying clique within the Court of Refuge"],
  description: "Taipan is the ringleader of a trio of bullies in the Court of Refuge, using his royal-adjacent status to torment dragons he considers beneath him — particularly Mulberry, whom he resents for having authority over him, and Dugong, whom he mocks relentlessly for cowardice. His cruelty escalates dramatically when he takes Mulberry hostage at knifepoint during a tribal uprising, threatening real violence to maintain control.",
  background: "Operating within the social hierarchy of the Court of Refuge, Taipan built a reputation for bullying through his alliance with Royal and Dugong, frequently locking the more sensitive Dugong away for days at a time and using fire attacks to test new arrivals like Umber.",
  arcStory: "When Beryl and Snakeroot's rule is challenged, Taipan sides with them, taking Mulberry hostage and threatening him with a knife to maintain leverage over the rebellion. His former underlings Royal and Dugong ultimately turn against him, and Taipan is imprisoned in the dungeons once the uprising succeeds.",
  relationships: [
    { name: "Mulberry", relation: "A dragon he resented and ultimately took hostage at knifepoint during the uprising against Beryl and Snakeroot." },
    { name: "Royal and Dugong", relation: "His former underlings in bullying, who eventually turned against him when his cruelty escalated too far." },
    { name: "Umber", relation: "A MudWing he attacked with fire upon first meeting, testing whether he had fireproof scales." }
  ],
  quotes: ["\"Fine, I'm lying. It's only one question. Are you the useful kind of MudWing – or not?\" — before blasting Umber with fire"]
},
{
  id: "beryl",
  name: "Beryl",
  tribe: "sky",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/3c/BerylTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20260314095922",
  category: "antagonist",
  physical: "A HiveWing ruler of the Court of Refuge, carrying herself with regal authority over her domain.",
  role: "Antagonist — Ruler of the Court of Refuge",
  personality: ["Authoritarian", "Controlling", "Image-conscious"],
  abilities: ["Political authority over the Court of Refuge's population", "Commands loyalty through a mix of charisma and intimidation, enforced by subordinates like Taipan"],
  description: "Beryl rules the Court of Refuge alongside Snakeroot, maintaining her authority through controlling subordinates like Taipan, Royal, and Dugong, and through curated public events such as the Northern Lights concerts that mask the harsher realities of her rule.",
  background: "As co-ruler of the Court of Refuge with Snakeroot, Beryl built a system of control that relied on loyal enforcers to manage dissent and maintain her grip on power within the isolated community.",
  arcStory: "When Mulberry's actions help expose the truth about her rule, Beryl and Snakeroot's authority collapses in an uprising, with Taipan's hostage-taking of Mulberry marking a last, desperate attempt to maintain control before they are overthrown.",
  relationships: [
    { name: "Snakeroot", relation: "Her co-ruler of the Court of Refuge." },
    { name: "Mulberry", relation: "A dragon whose betrayal of her rule helped trigger the uprising that ended her reign." },
    { name: "Taipan", relation: "An enforcer who took hostages in a desperate bid to preserve her authority during the rebellion." }
  ],
  quotes: []
},
{
  id: "snakeroot",
  name: "Snakeroot",
  tribe: "leaf",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/c/c3/SnakerootTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260304160516",
  category: "antagonist",
  physical: "A LeafWing co-ruler of the Court of Refuge, carrying the same authoritative bearing as her counterpart Beryl.",
  role: "Antagonist — Co-Ruler of the Court of Refuge",
  personality: ["Authoritarian", "Controlling", "Allied closely with Beryl's methods of rule"],
  abilities: ["Leafspeak, the LeafWing ability to command plant growth", "Political authority within the Court of Refuge"],
  description: "Snakeroot rules the Court of Refuge alongside Beryl, their joint authority eventually challenged and overturned in an uprising sparked in part by revelations about Mulberry and the loyalty enforced through dragons like Taipan.",
  background: "As co-ruler alongside Beryl, Snakeroot helped maintain the Court of Refuge's social order through a combination of curated public spectacle and underlying intimidation.",
  arcStory: "Snakeroot's rule collapses alongside Beryl's when the Court of Refuge rises up against them, ending their joint authority over the community.",
  relationships: [
    { name: "Beryl", relation: "Her co-ruler of the Court of Refuge." }
  ],
  quotes: []
},
{
  id: "kestrel",
  name: "Kestrel",
  tribe: "sky",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/0/0b/KestrelGN-TDP.png/revision/latest?cb=20230305200612",
  category: "antagonist",
  physical: "Jewel-hard, bright red-gold scales the color of rust and flame, orange-yellow eyes, with a hardened, militaristic bearing befitting a soldier-turned-reluctant-guardian.",
  role: "Antagonist — Abusive Guardian of the Dragonets of Destiny",
  personality: ["Harsh", "Hostile", "Prejudiced", "Capable of fierce, if twisted, protectiveness"],
  abilities: ["Trained SkyWing combat skills, used to instruct the dragonets in fighting", "Knowledge of tribal strengths and weaknesses, which she imparted (often cruelly) to her young charges"],
  description: "Kestrel was one of the Talons of Peace guardians tasked with raising the dragonets of destiny in an underground cave, and she made their childhood miserable through years of hostility, favoritism, and outright abuse — particularly toward Glory, whom she resented for being a RainWing substitute rather than the true SkyWing the prophecy demanded. Nearly every dragonet of destiny's later trauma around their guarded upbringing traces back to her harsh treatment.",
  background: "A SkyWing soldier recruited into the Talons of Peace, Kestrel was assigned to help guard and train the five dragonets meant to fulfill the Dragonet Prophecy, a duty she carried out with resentment and cruelty rather than care, even as she secretly hid her own twin dragonets — Peril and an unnamed brother — from Queen Scarlet's wrath.",
  arcStory: "After leaving her daughter Peril and the dragonets behind, Kestrel is murdered by Blister during the chaos of the ongoing war — a death the dragonets receive with deeply mixed feelings, given how much harm she caused them even as some recognize a flicker of protectiveness underneath her cruelty.",
  relationships: [
    { name: "Peril", relation: "Her daughter, secretly hidden from Queen Scarlet and raised separately from the dragonets she guarded." },
    { name: "Glory", relation: "A dragonet of destiny she abused relentlessly for being a RainWing substitute rather than the 'true' SkyWing prophecy candidate." },
    { name: "Clay", relation: "A dragonet she favored for combat training due to his size and fire-breathing ability." }
  ],
  quotes: ["\"Where's the monster I saw when you hatched? That's the dragon we need for the prophecy.\"", "\"I'm your teacher. Nothing I do is cheating. Get down here and fight like a SkyWing.\""]
},
{
  id: "orca",
  name: "Princess Orca",
  tribe: "sea",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  image: "",
  category: "antagonist",
  physical: "A SeaWing princess of the royal animus bloodline, carrying herself with the entitled ambition of a dragon convinced the throne belonged to her by right.",
  role: "Antagonist — SeaWing Princess Who Cursed Her Own Bloodline",
  personality: ["Ambitious", "Vengeful", "Willing to commit atrocities to secure power"],
  abilities: ["Rare SeaWing animus magic", "Enchanted a statue of herself with a curse targeting an entire category of royal heirs — one of the most devastating uses of animus magic in SeaWing history"],
  description: "Princess Orca challenged her own mother, Queen Coral, for the SeaWing throne, and when the contest turned fatal, used her animus magic to ensure that even her own death wouldn't stop her ambitions: she enchanted a statue of herself to kill every female heir born afterward in the SeaWing Royal Hatchery, a curse that haunted Coral's family for years.",
  background: "Part of the SeaWing royal bloodline that carries animus magic, Orca challenged Queen Coral for the throne, a contest that escalated into violence when Coral, in self-defense, accidentally killed her with a narwhal horn.",
  arcStory: "Even in death, Orca's animus-enchanted statue continues killing newly hatched female heirs in the Royal Hatchery for years afterward, an ongoing tragedy that haunts Coral's reign until the curse is finally discovered and dealt with.",
  relationships: [
    { name: "Queen Coral", relation: "Her mother, whom she challenged for the throne — a contest that ended in Orca's accidental death at Coral's talons." }
  ],
  quotes: []
},
{
  id: "unnamedcharacters",
  name: "Unnamed Characters",
  tribe: "mixed",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Various",
    firstAppearance: "Various",
  category: "antagonist",
  physical: "A collective entry covering numerous minor, unnamed antagonistic figures across the series — soldiers, guards, and bystanders whose actions still carry real weight despite never being given individual names.",
  role: "Antagonist — Collective Entry for Minor Unnamed Villains",
  personality: ["Varies by individual, ranging from coldly obedient to opportunistically cruel"],
  abilities: ["Varies — includes soldiers, guards, and agents acting on behalf of named villains throughout the series"],
  description: "Across the Wings of Fire series, numerous antagonistic acts are carried out by dragons who are never given individual names — guards who chain and interrogate prisoners on Burn's orders, NightWing council members debating how to most efficiently terrorize the rainforest, soldiers who participate in massacres without being singled out by the narrative. Collectively, these unnamed figures illustrate how systems of cruelty function through ordinary obedience as much as through named, charismatic villains.",
  background: "These figures appear throughout the series' various arcs, frequently as the operational hands behind named antagonists' plans — guarding prisoners for Burn, debating tactics within Battlewinner's NightWing council, or carrying out kidnappings and killings as part of broader military campaigns.",
  arcStory: "Their actions range from holding Hvitur captive while Burn interrogates him and destroys a stolen SkyWing egg, to NightWing council members casually discussing the most efficient way to terrorize the rainforest's other tribes — moments that underscore how institutional cruelty doesn't require a single mastermind to inflict real harm.",
  relationships: [],
  quotes: []
},
{
  id: "snowflake",
  name: "Snowflake",
  tribe: "ice",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Runaway",
    firstAppearance: "Runaway",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/5/55/Snowflake_GN_2.png/revision/latest/scale-to-width-down/362?cb=20250926214648",
  category: "antagonist",
  physical: "Silvery-white scales, wearing a silver chain with a single circle around her neck. Arctic described her as 'pretty in a boring, glassy way.' One of her wings is permanently scarred and unusable after a fire injury.",
  role: "Antagonist — Arctic's Scorned Arranged Fiancée",
  personality: ["Repressed", "Quietly furious", "Loyal beneath a reserved exterior", "Vengeful once provoked"],
  abilities: ["Standing within the First Circle of IceWing aristocracy", "Capable of fierce, violent action once her composure breaks"],
  description: "Snowflake was arranged to marry Prince Arctic, a match neither of them wanted, and what began as mutual irritation curdled into genuine hatred after Arctic's reckless use of animus magic got several IceWing guards killed and left her permanently grounded with a burned, ruined wing. Diamond mistook her quiet repression for submissiveness, never realizing the fury simmering beneath Snowflake's controlled exterior.",
  background: "As a respectable First Circle aristocrat, Snowflake was arranged to marry Arctic as part of Queen Diamond's plans for the IceWing royal bloodline, a match defined by mutual disinterest from the very beginning.",
  arcStory: "When Arctic and Foeslayer's escape attempt turns lethal, Snowflake watches him accidentally kill several IceWing guards she knew, and her hatred boils over — she attacks him, declaring he doesn't deserve happiness, only to be shot down by friendly fire that Arctic redirects toward her, permanently destroying her ability to fly. She partners with Snowfox afterward, scheming together to remove Arctic from the succession entirely.",
  relationships: [
    { name: "Arctic", relation: "Her unwilling arranged fiancé, whose recklessness with animus magic permanently crippled her." },
    { name: "Snowfox", relation: "Her scheming partner and eventual romantic partner, with whom she plotted against Arctic." },
    { name: "Queen Diamond", relation: "Arctic's mother, who mistook Snowflake's repressed fury for ideal submissive obedience." }
  ],
  quotes: ["\"But he doesn't deserve to live! He doesn't deserve to be happy!\""]
},
{
  id: "snowfoxruna",
  name: "Snowfox",
  tribe: "ice",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Runaway",
    firstAppearance: "Runaway",
  category: "antagonist",
  physical: "An IceWing aristocrat and niece of Queen Diamond, carrying herself with bold, assertive confidence unusual among her more reserved tribemates.",
  role: "Antagonist — Vengeful Niece of Queen Diamond",
  personality: ["Cunning", "Manipulative", "Determined", "Quietly vengeful"],
  abilities: ["Skilled schemer, capable of long-term strategic planning to eliminate rivals", "Frostbreath, used to save Snowflake from further fire damage", "Strong claim within the IceWing royal succession as Diamond's niece"],
  description: "Snowfox is Queen Diamond's niece, a sharp, scheming IceWing who partners with Snowflake to remove the obstacle of Arctic from both of their lives — Snowflake's unwanted marriage and Snowfox's own path to power. Her ambitions are dangerous enough that the seer Clearsight foresees entire futures in which Snowfox, as queen, orchestrates a complete genocide of the NightWing tribe in revenge for the chaos Arctic and Foeslayer's relationship caused.",
  background: "As Diamond's niece and a member of the IceWing royal line, Snowfox held a real claim to influence and potentially the throne, watching the NightWing-IceWing conflict escalate around Arctic's relationship with Foeslayer with calculating interest.",
  arcStory: "After Arctic's escape attempt leaves several IceWings dead and Snowflake's wing permanently ruined, Snowfox swears vengeance on the entire NightWing tribe, scheming alongside Snowflake to remove Arctic and clear both their paths — ambitions so severe that Clearsight specifically warns Darkstalker not to let Diamond die before Snowfox has an heir, fearing the genocide Snowfox would unleash as queen.",
  relationships: [
    { name: "Snowflake", relation: "Her scheming partner and eventual romantic partner in plotting against Arctic." },
    { name: "Queen Diamond", relation: "Her aunt, whose throne she stood to potentially inherit." }
  ],
  quotes: ["\"I'll kill every last NightWing when I get the chance! You'll wake up one day with my claws in your eyes!\""]
},
{
  id: "tundra",
  name: "Tundra",
  tribe: "ice",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/2/2b/Tundra_%28gn7_excerpt%2C_wings_of_fire%29.jpg/revision/latest/scale-to-width-down/303?cb=20231205013551",
  category: "antagonist",
  physical: "Cold, shimmering, stormy gray eyes and a perpetually frozen, marble-smooth expression that almost never betrays emotion. She wears a necklace made of SkyWing teeth that clatters jarringly whenever she moves.",
  role: "Antagonist — Disapproving Royal Advisor to Queen Snowfall",
  personality: ["Smug", "Judgmental", "Disapproving", "Coldly impassive", "Favoritism-driven"],
  abilities: ["Decades of political experience as former second-in-command to Queen Glacier", "Standing as a senior advisor and former First Circle warrior", "Skilled at subtly undermining authority she resents"],
  description: "Tundra is Winter's aunt and one of Queen Snowfall's senior advisors, a former First Circle warrior who never forgave fate for placing her niece on the throne instead of her own favored daughter, Icicle. Her face almost never shows emotion — Snowfall notes she's never once seen sadness, rage, or resentment cross it — but her quiet favoritism runs deep, openly admiring Icicle and Hailstorm's accomplishments while demeaning Winter at every opportunity.",
  background: "Formerly second-in-command to Queen Glacier alongside her husband Narwhal, Tundra resented having to bow to her niece Snowfall after Glacier's death, having long hoped her own daughter Icicle would inherit the throne instead.",
  arcStory: "As an advisor, Tundra enforces the IceWings' rigid 'gift of order' ranking wall and frequently clashes with Snowfall's more reform-minded approach to ruling, including physically attempting to stop Snowfall from destroying the cruel ranking system, an effort that ends with Tundra fainting from the shock of seeing her tribe's old order literally shattered.",
  relationships: [
    { name: "Winter", relation: "Her nephew, whom she has always disapproved of and unfavorably compared to his siblings." },
    { name: "Icicle", relation: "Her daughter and clear favorite, whom she hoped would become queen instead of Snowfall." },
    { name: "Queen Snowfall", relation: "Her niece and reigning monarch, whose reforms to IceWing tradition she resists at every turn." }
  ],
  quotes: ["\"What is wrong with you? Are you hunting or sightseeing? Are you an IceWing or a RainWing? Kill that bear!\" — to Winter during a hunt"]
},
{
  id: "narwhalice",
  name: "Narwhal",
  tribe: "ice",
  gender: "Male",
  arc: 2,
  book: 7,
  bookTitle: "Winter Turning",
    firstAppearance: "Winter Turning",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/0/07/Narwhal.jpg/revision/latest/scale-to-width-down/333?cb=20240115165223",
  category: "antagonist",
  physical: "An IceWing prince of the royal family, carrying the cold, rank-obsessed bearing typical of the IceWing First Circle aristocracy.",
  role: "Antagonist — Winter's Disappointed and Manipulative Father",
  personality: ["Disappointed easily", "Favoritism-driven", "Willing to sacrifice his own child for status", "Disgusted by perceived weakness"],
  abilities: ["Senior standing as former second-in-command to Queen Glacier", "Political influence over the IceWing ranking system, the Circles"],
  description: "Narwhal is Winter's father, a prince so consumed by IceWing status obsession that he openly favors his other children, Icicle and Hailstorm, while treating Winter's lower aptitude as a personal humiliation. His disappointment runs deep enough that he was willing to let Winter be sacrificed in the brutal Diamond Trial just to restore Hailstorm's place at the top of the family rankings.",
  background: "As former second-in-command to Queen Glacier alongside his wife Tundra, Narwhal built his identity around rank and achievement within the rigid IceWing Circle system, a worldview that left no room for a son he considered an underachiever.",
  arcStory: "Narwhal's open favoritism and willingness to sacrifice Winter for the family's standing becomes a defining wound in Winter's life, shaping his desperate need to prove himself throughout his journey at Jade Mountain Academy and beyond.",
  relationships: [
    { name: "Winter", relation: "His son, whom he consistently disappointed in and was willing to sacrifice to restore the family's status." },
    { name: "Icicle and Hailstorm", relation: "His favored children, whose accomplishments he praised openly while belittling Winter's." },
    { name: "Tundra", relation: "His wife and fellow former second-in-command under Queen Glacier." }
  ],
  quotes: []
},
{
  id: "permafrost",
  name: "Permafrost",
  tribe: "ice",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539",
  category: "antagonist",
  physical: "An IceWing aristocrat of the royal court, carrying herself with the same status-conscious bearing as her fellow First Circle nobles.",
  role: "Antagonist — IceWing Noble Who Attempted to Crown a Puppet Queen",
  personality: ["Power-hungry", "Manipulative", "Opportunistic"],
  abilities: ["Standing within the IceWing aristocracy", "Political maneuvering exploiting royal succession ambiguity"],
  description: "Permafrost, alongside Tundra, attempted to crown the young, easily-influenced princess Mink as queen during Snowfall's temporary absence from the Ice Kingdom — a transparent bid to install a puppet ruler who would be far easier to control than the strong-willed, reform-minded Snowfall.",
  background: "As part of the IceWing nobility uneasy with Snowfall's reformist rule, Permafrost saw an opportunity during the queen's absence to seize effective control of the kingdom through a more pliable figurehead.",
  arcStory: "When Snowfall returns to find Mink crowned and wearing Queen Diamond's enchanted, NightWing-hating crown, she immediately has it destroyed and reasserts her authority, ending Permafrost and Tundra's attempted power grab.",
  relationships: [
    { name: "Tundra", relation: "Her fellow conspirator in attempting to crown Mink as a puppet queen." },
    { name: "Mink", relation: "The young princess they attempted to install as an easily-controlled monarch." },
    { name: "Queen Snowfall", relation: "The reigning monarch whose authority they tried to undermine during her absence." }
  ],
  quotes: []
},
{
  id: "deathbringer",
  name: "Deathbringer",
  tribe: "night",
  gender: "Male",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/ec/Deathbringer_GN_.png/revision/latest/scale-to-width-down/333?cb=20200518015436",
  category: "antagonist",
  physical: "Black scales, eyes, and wings with a glittering spray of scattered silver scales underneath that catch the light like trapped stars.",
  role: "Antagonist — Former NightWing Assassin (Wiki-Categorized for Early Actions)",
  personality: ["Thoughtful", "Charming", "Confident", "Deeply protective once he loves someone"],
  abilities: ["Trained NightWing assassin since dragonethood, raised as an apprentice under his mother Quickstrike", "Skilled at controlling his emotions and following orders precisely", "Later becomes Glory's devoted bodyguard, applying the same lethal skill in her defense"],
  description: "Deathbringer is included in the wiki's antagonist category for his early life as a trained NightWing assassin, following orders without question — including killing a MudWing prisoner as cleanly as he could manage despite his curiosity about the dragon. In truth, he is one of the series' most beloved characters, whose arc moves decisively away from his assassin origins once he falls for Glory, vowing that protecting the dragons he loves will always come before any mission again.",
  background: "Trained from a young age as an apprentice assassin under his mother Quickstrike, Deathbringer carried out NightWing assignments with quiet professionalism, suppressing his doubts about the morality of his orders in favor of duty.",
  arcStory: "After his mother's execution and his growing closeness with Glory, Deathbringer abandons his identity as a tool of NightWing politics, becoming Glory's loyal bodyguard and eventual partner — using his combat skill exclusively to protect the dragons he cares about rather than to serve a queen's agenda.",
  relationships: [
    { name: "Quickstrike", relation: "His mother and mentor in assassination, whose execution by Blister marked a turning point in his loyalties." },
    { name: "Glory", relation: "The RainWing queen he comes to love deeply, for whom he abandons his assassin's detachment entirely." }
  ],
  quotes: []
},
{
  id: "jerboa",
  name: "Jerboa",
  tribe: "sand",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/a6/JerboaTopShot.png/revision/latest/scale-to-width-down/358?cb=20220330001643",
  category: "antagonist",
  physical: "A SandWing animus whose unnaturally extended lifespan and isolation have left her psychologically frozen at a much younger age than her true years, despite an adult dragon's body.",
  role: "Antagonist — Abused Animus Who Became an Abuser",
  personality: ["Traumatized", "Terrified of magic's potential for harm", "Controlling out of fear rather than malice", "Arrested emotional development"],
  abilities: ["Powerful animus magic, used and abused throughout an unnaturally long life", "Capable of enchantments affecting her own descendants, including her daughter Jerboa III"],
  description: "Jerboa is a deeply tragic figure — an animus dragon abused by her own mother in ways the text suggests were severe and dehumanizing, robbed of any real chance to grow up despite living through hundreds of years. That trauma calcified into a desperate fear of what animus magic could do in the wrong hands, including her own, and ultimately led her to commit a violation against her own daughter, Jerboa III, eerily mirroring the abuse she herself survived — disregarding her child's autonomy in the name of protecting her from a magic-filled world Jerboa never stopped being terrified of.",
  background: "Subjected to severe abuse by her own animus mother for generations, Jerboa's psychological development was permanently stunted even as her body and magical power continued for centuries, leaving her perpetually a frightened child wearing an adult's power.",
  arcStory: "Jerboa's fear of animus magic's destructive potential — sharpened by her own abuse and the close call of nearly losing control entirely to a figure like Darkstalker — eventually drives her to enchant her own daughter Jerboa III in a way that strips away her autonomy, repeating the exact pattern of harm she endured without ever fully recognizing the repetition.",
  relationships: [
    { name: "Jerboa III", relation: "Her daughter, whom she ultimately enchanted in a way that echoed the abuse she herself suffered as a child." },
    { name: "Mulberry", relation: "A figure connected to her family line in the more recent generations of the Hybrid Prince era." }
  ],
  quotes: []
},
{
  id: "smolder",
  name: "Smolder",
  tribe: "sand",
  gender: "Male",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/9/98/Guide_Portrait_Smolder.jpg/revision/latest?cb=20231010014535",
  category: "antagonist",
  physical: "A SandWing prince, brother to Burn, Blister, and Blaze, sharing the family's pale gold scales and solid black eyes.",
  role: "Antagonist — Burn's Compliant Younger Brother (Wiki-Categorized)",
  personality: ["Pragmatic survivor", "Outwardly compliant", "Quietly more thoughtful than his sisters give him credit for"],
  abilities: ["SandWing fire-breathing and venomous tail barb", "Skilled at navigating the dangerous politics of Burn's stronghold to stay alive"],
  description: "Smolder is one of the few siblings Burn allowed to survive the War of SandWing Succession, kept alive specifically because he obeyed her without question — a survival strategy that placed him on the antagonist side of the war's ledger even as his personal cruelty never matched his sisters'. He later develops into one of the more sympathetic and complex SandWing royals, particularly in his care for the human Rose.",
  background: "As Burn's younger brother, Smolder learned early that compliance was the only way to survive in his sister's brutal household, projecting loyalty to her cause throughout the war while privately developing his own perspective on the conflict.",
  arcStory: "Smolder's role within Burn's stronghold during the war places him among the antagonist faction by association, though his story continues well beyond the war's end as he navigates the aftermath of the succession crisis and his complicated family legacy.",
  relationships: [
    { name: "Burn", relation: "His older sister and queen-claimant, who spared his life specifically because of his unwavering obedience." },
    { name: "Blister and Blaze", relation: "His other sisters and rival claimants in the War of SandWing Succession." }
  ],
  quotes: []
},
{
  id: "moray",
  name: "Moray",
  tribe: "sea",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/f/f3/Moray_GN_6.png/revision/latest?cb=20260221030953",
  category: "antagonist",
  physical: "A SeaWing soldier with the typical sleek build of her tribe, marked by a harsh, bullying disposition toward dragonets under her authority.",
  role: "Antagonist — Bullying SeaWing Soldier",
  personality: ["Cruel", "Bullying", "Abusive of authority over younger dragons"],
  abilities: ["Trained SeaWing soldier and combat instructor", "Position of authority within the SeaWing palace hierarchy"],
  description: "Moray is a SeaWing soldier whose harsh, bullying treatment of young dragonets under her supervision — including Tsunami during her time training in the Kingdom of the Sea — exemplifies the harsher, more militaristic side of SeaWing palace culture.",
  background: "Serving within the SeaWing military structure, Moray held authority over young dragonets in training, wielding that power with cruelty rather than mentorship.",
  arcStory: "Moray's mistreatment of Tsunami during her time in the SeaWing kingdom becomes part of the broader friction between Tsunami's independent spirit and the rigid, often harsh expectations of SeaWing royal upbringing.",
  relationships: [
    { name: "Tsunami", relation: "A SeaWing dragonet of destiny whom Moray treated with characteristic cruelty during training." }
  ],
  quotes: []
},
{
  id: "shark",
  name: "Shark",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/a3/Shark_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518075546",
  category: "antagonist",
  physical: "A SeaWing soldier with the lean, powerful build typical of his tribe, carrying himself with an aggressive, combative bearing.",
  role: "Antagonist — Hostile SeaWing Soldier",
  personality: ["Aggressive", "Combative", "Dismissive of outsiders"],
  abilities: ["Trained SeaWing soldier", "Familiarity with the SeaWing palace's military hierarchy"],
  description: "Shark is a SeaWing soldier whose hostility toward Tsunami and her companions reflects the broader suspicion and harshness some SeaWings showed toward the dragonets of destiny during their time in the Kingdom of the Sea.",
  background: "As part of the SeaWing military, Shark operated within Queen Coral's palace structure during a turbulent period shaped by the ongoing War of SandWing Succession.",
  arcStory: "Shark's antagonistic encounters with Tsunami and the other dragonets highlight the friction between the SeaWings' rigid traditions and the disruptive presence of the prophecy's chosen dragonets.",
  relationships: [
    { name: "Tsunami", relation: "A SeaWing dragonet of destiny he treated with hostility during her time in the Kingdom of the Sea." }
  ],
  quotes: []
},
{
  id: "trout",
  name: "Trout",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  category: "antagonist",
  physical: "A SeaWing with the sleek, aquatic build typical of his tribe, embedded within the kingdom's social or military structure.",
  role: "Antagonist — Minor SeaWing Antagonist",
  personality: ["Dismissive", "Aligned with the harsher elements of SeaWing culture"],
  abilities: ["Standard SeaWing aquatic combat and swimming ability"],
  description: "Trout is a minor SeaWing figure whose antagonistic role reflects the broader friction within the Kingdom of the Sea during the dragonets of destiny's disruptive arrival, part of the contingent of SeaWings unwelcoming to outsiders disrupting palace tradition.",
  background: "Living within the SeaWing kingdom's social hierarchy, Trout's interactions with the dragonets of destiny placed him among the tribe's more hostile or dismissive citizens.",
  arcStory: "Trout's minor antagonistic presence is part of the broader texture of SeaWing society's mixed reception toward Tsunami and her companions.",
  relationships: [],
  quotes: []
},
{
  id: "hope",
  name: "Hope",
  tribe: "night",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "Runaway",
    firstAppearance: "Runaway",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/5/51/Foeslayer_Gn1.jpg/revision/latest/scale-to-width-down/500?cb=20240115182728",
  category: "antagonist",
  physical: "Huge, with black scales as dark as a moonless night, dark green underscales, dark green eyes, and a smooth, dark neck.",
  role: "Antagonist — Formerly Foeslayer, Blamed for the NightWing-IceWing War (Wiki-Categorized)",
  personality: ["Scatterbrained but passionate", "Loudmouthed", "Sharp-tongued", "Loyal", "Hopeful despite tragedy"],
  abilities: ["NightWing fire-breathing and flight", "Granted accidental resurrective immortality by Queen Diamond's curse", "Resilient survivor of over 2,000 years of magical imprisonment"],
  description: "Hope, formerly known as Foeslayer, is blamed by many IceWings as one of the root causes of the catastrophic NightWing-IceWing War — her forbidden love for Prince Arctic infuriated Queen Diamond enough to declare war on the entire NightWing tribe. In truth, Hope is far more victim than villain: a scatterbrained, passionate young NightWing who fell in love and paid an almost unimaginable price, imprisoned in the Diamond Caves for over two thousand years as a living torture device for IceWing dragonets' rite of passage.",
  background: "As a young NightWing, Foeslayer fell deeply in love with the IceWing prince Arctic, a relationship that scandalized both tribes and ultimately led Queen Diamond to have her kidnapped and magically imprisoned as punishment, beginning the generations-long NightWing-IceWing conflict that would define her son Darkstalker's entire life.",
  arcStory: "Trapped and repeatedly killed and revived in the Diamond Trial for over two thousand years, Hope is finally freed by Winter, who melts the diamond shackles binding her with frostbreath after his own trial concludes. She now lives in the NightWing village, raising her once-monstrous son Darkstalker — transformed back into the innocent dragonet Peacemaker — with the hope of finally giving him the gentle life he never had.",
  relationships: [
    { name: "Arctic", relation: "Her IceWing lover, whose relationship with her ignited the war that defined both their lives and ultimately destroyed him." },
    { name: "Darkstalker", relation: "Her son, whom she loved fiercely and now raises again as the innocent dragonet Peacemaker, hoping for a gentler outcome this time." },
    { name: "Queen Diamond", relation: "Arctic's mother, who imprisoned and tortured her for over two thousand years out of pure vengeful hatred." }
  ],
  quotes: ["\"And of course you think your 'rank' is higher than mine. But we're not in your kingdom. My dragonets will never set foot in your frozen wasteland. We are here, whether you like it or not, and he is my son, and his name is Darkstalker.\""]
},
{
  id: "heath",
  name: "Heath",
  tribe: "sand",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/9/9f/Heath_GN.jpeg/revision/latest/scale-to-width-down/387?cb=20211221203503",
  category: "antagonist",
  physical: "A SandWing connected to the human village of Valor and the legacy of Queen Oasis's death, carrying himself with the deceptive confidence of someone who has built a comfortable lie.",
  role: "Antagonist — Liar Who Concealed the Truth of Queen Oasis's Death",
  personality: ["Deceptive", "Self-serving", "Willing to let false narratives stand for personal benefit"],
  abilities: ["Skilled at maintaining a long-running deception about the true circumstances of Queen Oasis's death"],
  description: "Heath is central to one of the human storyline's core mysteries — the true circumstances of Queen Oasis's death, which he misrepresented for his own benefit. The protagonists of Dragonslayer spend much of the book's third act working to expose his lies and reveal what actually happened.",
  background: "Connected to the events surrounding the death of the SandWing Queen Oasis — an event that catalyzed the entire War of SandWing Succession — Heath built a false narrative around the circumstances that served his own interests rather than the truth.",
  arcStory: "Ivy, Leaf, and Wren's investigation in Dragonslayer eventually exposes Heath as a liar, unraveling the false story he constructed around Oasis's death and revealing the more complicated truth behind the event that sparked the war.",
  relationships: [
    { name: "Queen Oasis", relation: "The SandWing monarch whose true cause of death Heath concealed for his own benefit." }
  ],
  quotes: []
},
{
  id: "fjordice",
  name: "Fjord",
  tribe: "ice",
  gender: "Male",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/a5/Fjord_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518032042",
  category: "antagonist",
  physical: "An IceWing soldier or noble of the royal Circle hierarchy, ultimately killed when struck in the eye by RainWing venom.",
  role: "Antagonist — IceWing Figure",
  personality: ["Aligned with IceWing military or political interests"],
  abilities: ["IceWing frostbreath and combat training"],
  description: "Fjord is an IceWing whose story ends in one of the series' recurring grim injuries — death by RainWing venom striking the eye, a fate he shares with the MudWing Crocodile, underscoring the lethal precision RainWings are capable of in combat.",
  background: "As a member of IceWing society during a turbulent period of tribal conflict, Fjord's path crossed with the broader wars and skirmishes that defined much of the series' first arc.",
  arcStory: "Fjord is killed by RainWing venom in combat, one of several casualties illustrating the very real lethality behind the RainWings' otherwise peaceful reputation.",
  relationships: [],
  quotes: []
},
{
  id: "crocodilemud",
  name: "Crocodile",
  tribe: "mud",
  gender: "Male",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/a1/Crocodile_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518234652",
  category: "antagonist",
  physical: "A MudWing soldier, ultimately killed when struck in the eye by RainWing venom, the same grim fate suffered by the IceWing Fjord.",
  role: "Antagonist — MudWing Figure",
  personality: ["Aligned with MudWing military interests during wartime"],
  abilities: ["MudWing combat training and fire-breathing"],
  description: "Crocodile is a MudWing whose death by RainWing venom to the eye stands alongside Fjord's as one of the series' notable combat casualties, illustrating just how dangerous RainWing venom can be in skilled hands despite the tribe's pacifist reputation.",
  background: "As part of MudWing military involvement during the broader conflicts of the series' first arc, Crocodile's path led him into direct combat with RainWing forces.",
  arcStory: "Crocodile is killed by precise RainWing venom during combat, a death that underscores the real danger RainWings pose when provoked.",
  relationships: [],
  quotes: []
},
{
  id: "summit",
  name: "Queen Summit",
  tribe: "sky",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "",
  category: "antagonist",
  physical: "A SkyWing queen carrying herself with arrogant, self-satisfied confidence, convinced of her own brilliance as a ruler.",
  role: "Antagonist — Conspirator Who Murdered Her Own Sister for the Throne",
  personality: ["Xenophobic", "Cunning", "Arrogant", "Deceitful", "Ruthlessly ambitious"],
  abilities: ["Political manipulation on a continental scale, orchestrating a royal assassination and tribal expulsion simultaneously", "Commands significant SkyWing military and political resources as queen", "Skilled at framing others for her own crimes"],
  description: "Queen Summit secured the SkyWing throne by secretly arranging her own sister Queen Falcon's assassination — too cowardly to challenge her directly — then used the chaos to frame the LeafWings and BeetleWings, banishing both tribes from Pyrrhia entirely to seize their territory. She considers herself the smartest queen the SkyWings have ever had, takes credit for nearly doubling her kingdom's size through this betrayal, and treats the animus dragon Precipice as a controllable pet rather than a person, openly stating she'll kill her the moment she becomes inconvenient.",
  background: "As Queen Falcon's sister, Summit grew resentful of her position as the lesser royal, eventually conspiring with Queen Hibiscus and Queen Retribution to engineer Falcon's assassination via the dragons Darkling and Lemur, framing the LeafWings and BeetleWings for the crime to justify expelling them from Pyrrhia.",
  arcStory: "After successfully claiming the throne through her sister's murder, Summit helps create the Dungeon Isle's magical prison barrier alongside Retribution, exploiting the animus Precipice to cast the spell while treating her as a disposable asset rather than an ally — a betrayal that would echo for generations among the isle's trapped inhabitants.",
  relationships: [
    { name: "Queen Falcon", relation: "Her sister and predecessor, whom she had assassinated rather than challenge directly for the throne." },
    { name: "Retribution and Hibiscus", relation: "Her fellow conspirators in framing the LeafWings and BeetleWings and orchestrating Falcon's death." },
    { name: "Precipice", relation: "The animus dragon she exploited to create the Dungeon Isle's prison barrier, treating her as a pet to be discarded if she became a threat." }
  ],
  quotes: ["\"My sister didn't know how to use her magic properly, but Precipice will get used to doing what I say. Especially once she realizes that driving out the BeetleWings and LeafWings means almost doubling the size of the Sky Kingdom... I'm the smartest queen we've ever had.\""]
},
{
  id: "retribution",
  name: "Queen Retribution",
  tribe: "ice",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "",
  category: "antagonist",
  physical: "An IceWing queen of the ancient era, carrying the calculating, status-conscious bearing typical of her tribe's royalty.",
  role: "Antagonist — Co-Conspirator in the Founding of the Dungeon Isle",
  personality: ["Xenophobic", "Cunning", "Cautious", "Calculating"],
  abilities: ["Political authority as an IceWing queen", "Skilled at managing magical assets like Precipice with calculated caution", "Co-architect of the Dungeon Isle's prison spell"],
  description: "Queen Retribution conspired alongside Summit and Hibiscus to drive the LeafWings and BeetleWings out of Pyrrhia, helping engineer the framing that followed Queen Falcon's assassination. More cautious than Summit, she was the one who warned that the animus Precipice might eventually piece together the truth of their conspiracy and become a genuine threat.",
  background: "As one of the ancient queens involved in founding the Dungeon Isle, Retribution shared Summit's xenophobic distaste for inter-tribal relationships and played a key role in justifying the expulsion of two entire tribes from the continent.",
  arcStory: "Retribution helps Summit construct the Dungeon Isle's magical barrier using Precipice's animus power, and her warnings about Precipice's potential to uncover their plot ultimately prove well-founded, since the secret of the Dungeon Isle's true founding is what protagonists like Umber and Sora later work to uncover.",
  relationships: [
    { name: "Summit and Hibiscus", relation: "Her fellow conspirators in framing the LeafWings and BeetleWings and assassinating Queen Falcon." },
    { name: "Precipice", relation: "The animus dragon whose magic they exploited and whom Retribution warned could become a danger to their conspiracy." }
  ],
  quotes: []
},
{
  id: "hibiscusqueen",
  name: "Queen Hibiscus",
  tribe: "rain",
  gender: "Female",
  arc: 4,
  book: 16,
  bookTitle: "The Hybrid Prince",
    firstAppearance: "The Hybrid Prince",
  image: "",
  category: "antagonist",
  physical: "A RainWing queen of the ancient era, sharing the tribe's typical color-shifting scales beneath a calculating political demeanor unusual for her people's later pacifist reputation.",
  role: "Antagonist — Co-Conspirator in Queen Falcon's Assassination",
  personality: ["Manipulative", "Politically opportunistic", "Willing to betray allies for personal gain"],
  abilities: ["Commanded an assassin, Lemur, whom she sent to join Darkling in murdering Queen Falcon", "Political standing as a RainWing queen during the era of the Dungeon Isle's founding"],
  description: "Queen Hibiscus joined Summit and Retribution's plot against Queen Falcon, sending her own lead assassin Lemur to carry out the murder alongside Darkling, helping secure Summit's claim to the SkyWing throne in exchange for her own benefit from the resulting territorial reshuffling.",
  background: "As one of several monarchs who later signed the sentencing document founding the Dungeon Isle, Hibiscus was deeply complicit in the conspiracy against Falcon and the broader expulsion of the LeafWings and BeetleWings.",
  arcStory: "Hibiscus's role in the assassination conspiracy and the founding of the Dungeon Isle's prison system places her among the queens whose ancient betrayal continues to shape the isle's descendants generations later.",
  relationships: [
    { name: "Summit and Retribution", relation: "Her fellow conspirators in the plot against Queen Falcon." },
    { name: "Lemur", relation: "Her lead assassin, sent to carry out Falcon's murder alongside Darkling." }
  ],
  quotes: []
},
{
  id: "hawthorn",
  name: "Hawthorn",
  tribe: "leaf",
  gender: "Male",
  arc: 3,
  book: 13,
  bookTitle: "The Poison Jungle",
    firstAppearance: "The Poison Jungle",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022",
  category: "antagonist",
  physical: "An adult LeafWing with very powerful leafspeak abilities, his appearance and demeanor marked by the toll of fifty years of complete isolation.",
  role: "Antagonist — Unwitting Creator of the Othermind's Mind-Control Plague",
  personality: ["Friendly but lonely", "Prideful about his intentions", "Anxious", "Psychologically frayed by decades of isolation"],
  abilities: ["Exceptionally powerful leafspeak, the LeafWing ability to command plant growth", "Deep botanical knowledge developed over fifty years of solitary research"],
  description: "Hawthorn is the tragic, unwitting origin of Queen Wasp's mind-control plague — banished by Queen Sequoia after a failed attempt to use a substance on Wasp during a peace summit, intending to neutralize her threat to the LeafWings. Instead of the harmless effect he hoped for, his plant inadvertently gave rise to Wasp's mind-control powers, a catastrophic unintended consequence he didn't even realize he'd caused until much later. Fifty years of total isolation afterward fractured his mental state, leaving him talking to his own carvings and eventually making him the perfect, lonely target for the Othermind to claim as a host.",
  background: "Once a respected LeafWing with rare and powerful leafspeak, Hawthorn was banished after the peace summit incident, exiled to live alone for fifty years as punishment for his failed and catastrophic intervention.",
  arcStory: "Found by Cricket, Sundew, and their companions while researching a cure for Wasp's mind control, Hawthorn reveals the truth of what he did decades earlier, torn between guilt, pride in his good intentions, and desperate loneliness — even as the Othermind has already begun using his isolation to claim him as one of its hosts.",
  relationships: [
    { name: "Queen Sequoia", relation: "The LeafWing monarch who banished him for fifty years following the failed plot against Wasp." },
    { name: "Queen Wasp", relation: "The unintended beneficiary of his sabotage attempt, whose mind-control tyranny he accidentally enabled." }
  ],
  quotes: ["\"She threatened our trees, HiveWing. The trees we loved, our homes and souls. We saw the war that was coming. We knew how dangerous she was, and we knew we couldn't give her the LeafWings... I put it in her food that night.\""]
},
{
  id: "sandstormsand",
  name: "Sandstorm",
  tribe: "sand",
  gender: "Male",
  arc: 0,
  book: 1,
  bookTitle: "Legend 1",
    firstAppearance: "Legend 1",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/8/80/Sandstorm_Infobox.jpeg/revision/latest/scale-to-width-down/500?cb=20200229175101",
  category: "antagonist",
  physical: "An enormous SandWing wearing armor and a key around his neck, intimidating in size and presence.",
  role: "Antagonist — General Under Burn, Threat to the Indestructible City",
  personality: ["Obnoxious", "Erratic", "Threatening", "Widely disliked even by his allies"],
  abilities: ["Former general under Queen Burn, commanding real military authority", "Imposing size and physical presence used to intimidate"],
  description: "Sandstorm was one of Burn's generals during the War of SandWing Succession, a dragon so obnoxious and unstable that Wren describes him as a total lunatic, particularly when he threatens the Indestructible City. His erratic, threatening behavior made him unpopular even among fellow SandWings.",
  background: "Serving as a general under Queen Burn during the war, Sandstorm built a reputation for instability and aggression that outlasted the conflict itself, continuing to threaten and intimidate even after the war's resolution.",
  arcStory: "Sandstorm is ultimately poisoned and killed by the human Wren in order to rescue Sky, ending his threatening presence at the SandWing stronghold.",
  relationships: [
    { name: "Burn", relation: "The SandWing princess he served as a general during the War of SandWing Succession." },
    { name: "Wren", relation: "The human who ultimately poisoned and killed him to rescue Sky." }
  ],
  quotes: []
},
{
  id: "nautilus",
  name: "Nautilus",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/f/fa/Nautilus_GN_9.jpg/revision/latest/scale-to-width-down/479?cb=20241224090433",
  category: "antagonist",
  physical: "Green scales with black spiral patterns, and cold, glittering green eyes. He carries himself with a haughty, self-important bearing, especially when discussing the Talons of Peace's sacrifices for their cause.",
  role: "Antagonist — Founder of the Talons of Peace, Architect of the False Dragonets",
  personality: ["Zealously devoted to his cause", "Nervous beneath his haughty exterior", "Ruthlessly willing to sacrifice individuals for 'the greater good'", "Self-righteous"],
  abilities: ["Founded and led the Talons of Peace, a continent-spanning organization devoted to ending the war", "Devised the false dragonets contingency plan alongside Morrowseer", "Commands the loyalty of numerous Talons of Peace operatives across Pyrrhia"],
  description: "Nautilus founded the Talons of Peace with the genuine belief that peace mattered more than any individual life — a philosophy that, in practice, made him willing to order the murder of his own ally Webs for threatening their backup plan, declaring flatly that 'peace is more important than any one dragon.' He came up with or significantly contributed to the false dragonets scheme alongside Morrowseer, training five replacement dragonets as a contingency in case the true Dragonet Prophecy didn't pan out, with little apparent concern for their wellbeing as individuals rather than instruments.",
  background: "As founder and original leader of the Talons of Peace, Nautilus dedicated himself entirely to ending the War of SandWing Succession through the Dragonet Prophecy, eventually ceding leadership of the organization to Riptide after the war's end.",
  arcStory: "Nautilus orders Cirrus to kill Webs when his actions threaten to expose or disrupt the Talons' backup plan, and he works closely with Morrowseer to raise and train the false dragonets of destiny — Squid, Flame, Fatespeaker, Ochre, and Viper — never having known the original prophecy was fabricated by Morrowseer from the start.",
  relationships: [
    { name: "Webs", relation: "A fellow Talons of Peace member whose death Nautilus ordered when he became a liability to their backup plan." },
    { name: "Morrowseer", relation: "His collaborator in devising the false dragonets contingency, though Nautilus remained unaware of the deeper NightWing agenda behind the prophecy." },
    { name: "Squid", relation: "His son, raised among the false dragonets as part of the very plan Nautilus orchestrated." }
  ],
  quotes: ["\"Peace is more important than any one dragon. And you would disrupt our backup plan. We're doing this for your own good. For the prophecy. For peace... Cirrus, rip out his heart.\""]
},
{
  id: "ochre",
  name: "Ochre",
  tribe: "mud",
  gender: "Male",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/e/ed/OchreGN3.png/revision/latest?cb=20201229212140",
  category: "antagonist",
  physical: "Dark mahogany-brown scales and dull eyes, with a visibly heavier build from his near-constant eating.",
  role: "Antagonist — MudWing of the False Dragonets of Destiny",
  personality: ["Greedy", "Uncaring", "Pushy", "Pessimistic", "Disagreeable"],
  abilities: ["MudWing fire-breathing and combat training, developed as part of the false dragonets' preparation", "A voracious, unmatched appetite, eating both more and more often than anyone around him"],
  description: "Ochre is one of the false dragonets raised as a backup plan for the Dragonet Prophecy, a deeply unpleasant MudWing whom Sunny describes as the unfunny, unlikeable version of Clay. Bluntly described by Fatespeaker as 'the fat one,' Ochre is greedy and pushy, refusing to share food with anyone and treating most situations with a flat, uncaring pessimism.",
  background: "Raised in the Talons of Peace camp as part of the false dragonets contingency plan, Ochre was trained alongside Squid, Flame, Fatespeaker, and Viper, eventually being delivered to the NightWing island under Morrowseer's personal supervision.",
  arcStory: "Ochre's role among the false dragonets places him in direct contrast with the true dragonets of destiny, his unpleasant disposition serving as a constant source of friction within his own group, particularly with Squid, whom he bullied alongside Flame and Viper.",
  relationships: [
    { name: "Squid", relation: "A fellow false dragonet whom Ochre bullied alongside Flame and Viper." },
    { name: "Nautilus and Morrowseer", relation: "The architects of the false dragonets program that raised and trained him." }
  ],
  quotes: []
},
{
  id: "squid",
  name: "Squid",
  tribe: "sea",
  gender: "Male",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/f/f2/SquidGN15.jpg/revision/latest?cb=20260122043117",
  category: "antagonist",
  physical: "A SeaWing dragonet among the false dragonets of destiny, Nautilus's son, marked by the typical sleek build of his tribe.",
  role: "Antagonist — SeaWing of the False Dragonets of Destiny (Bullying Victim Turned Wiki-Listed Antagonist)",
  personality: ["Earnest", "Frequently targeted by his peers", "Loyal to the Talons of Peace's ideals despite his treatment"],
  abilities: ["SeaWing aquatic abilities and combat training, developed as part of the false dragonets' preparation"],
  description: "Squid is Nautilus's son and one of the false dragonets, frequently bullied by Flame, Viper, and Ochre during their training together. Despite this mistreatment, he largely internalized the Talons of Peace's mission, including his father's belief that peace was worth significant individual sacrifice.",
  background: "Raised among the false dragonets as the son of the Talons of Peace's own founder, Squid's upbringing placed him in an unusual position — both an instrument of his father's grand plan and a target for his fellow false dragonets' cruelty.",
  arcStory: "Squid's place among the false dragonets ties his story closely to the broader unraveling of the Talons of Peace's secrets, including the revelation of the prophecy's fabricated origins.",
  relationships: [
    { name: "Nautilus", relation: "His father and the founder of the Talons of Peace, who raised him as part of the false dragonets program." },
    { name: "Flame, Viper, and Ochre", relation: "Fellow false dragonets who regularly bullied him during their training." }
  ],
  quotes: []
},
{
  id: "fatespeaker",
  name: "Fatespeaker",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/f/fe/FatespeakerGN3.png/revision/latest/scale-to-width-down/324?cb=20201229205753",
  category: "antagonist",
  physical: "A NightWing dragonet among the false dragonets of destiny, sharing the tribe's characteristic black scales.",
  role: "Antagonist — NightWing of the False Dragonets of Destiny",
  personality: ["Talkative", "Earnest", "Eventually shown to be warm and loyal beyond her false-dragonet origins"],
  abilities: ["NightWing fire-breathing and abilities, developed as part of the false dragonets' preparation"],
  description: "Fatespeaker is one of the false dragonets raised as a contingency for the Dragonet Prophecy, introduced as part of Morrowseer's backup plan alongside Squid, Flame, Ochre, and Viper. Despite her origins among this group, she later develops into a far warmer, more sympathetic character in her own right, distinct from the harsher dynamics of her fellow false dragonets.",
  background: "Raised in the Talons of Peace camp as part of the contingency plan for the Dragonet Prophecy, Fatespeaker was trained alongside the other false dragonets before being brought to the NightWing island.",
  arcStory: "Fatespeaker's placement among the false dragonets connects her story to the broader unraveling of Morrowseer's manipulations, though her own arc moves well beyond this origin as she becomes a more central, sympathetic figure in later books.",
  relationships: [
    { name: "Starflight", relation: "A true dragonet of destiny she develops deep affection for over the course of the series." },
    { name: "Morrowseer", relation: "The NightWing strategist who helped orchestrate the false dragonets program she was raised within." }
  ],
  quotes: []
},
{
  id: "cirrus",
  name: "Cirrus",
  tribe: "sky",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  category: "antagonist",
  physical: "A SkyWing member of the Talons of Peace, carrying out orders within the organization's more ruthless operations.",
  role: "Antagonist — Talons of Peace Operative Ordered to Kill Webs",
  personality: ["Obedient", "Willing to carry out lethal orders without hesitation"],
  abilities: ["SkyWing combat training", "Operative experience within the Talons of Peace's covert operations"],
  description: "Cirrus is the Talons of Peace member ordered by Nautilus to kill Webs after his actions threatened the organization's backup plan — a stark illustration of how far Nautilus and the Talons were willing to go in pursuit of their cause, even against their own.",
  background: "As a member of the Talons of Peace, Cirrus operated within the organization's more covert and ruthless operational side, carrying out orders from leadership without apparent hesitation.",
  arcStory: "When Nautilus orders Webs's death for endangering their backup plan, it falls to Cirrus to carry out the killing — though Webs ultimately manages to escape with Crocodile's help.",
  relationships: [
    { name: "Nautilus", relation: "The Talons of Peace leader who ordered the killing of Webs through Cirrus." },
    { name: "Webs", relation: "The fellow Talons member Cirrus was ordered to kill." }
  ],
  quotes: []
},

{
  id: "anemone",
  name: "Anemone",
  tribe: "sea",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/1/1e/AnemoneTopShot.png/revision/latest/scale-to-width-down/403?cb=20210518170957",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Anemone is a SeaWing princess and the twin sister of Turtle. She possesses animus magic, making her one of the rarest and most powerful dragons in the series. Anemone is spoiled, demanding, and often manipulative, using her magical abilities to get what she wants. She plays a significant role in the Jade Mountain arc and beyond.",
  background: "Background information for Anemone.",
  arcStory: "Story arc involving Anemone.",
  relationships: [],
  quotes: []
},
{
  id: "coral",
  name: "Queen Coral",
  tribe: "sea",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Queen Coral is the queen of the SeaWings, a vain and self-absorbed ruler who is obsessed with beauty and jewelry. She is Tsunami mother and rules the underwater kingdom with an iron fin, executing random dragons after each assassination of her daughters. Her paranoia and cruelty make her one of the more complex antagonists in the series.",
  background: "Background information for Queen Coral.",
  arcStory: "Story arc involving Queen Coral.",
  relationships: [],
  quotes: []
},
{
  id: "icicle",
  name: "Icicle",
  tribe: "ice",
  gender: "Female",
  arc: 2,
  book: 6,
  bookTitle: "Moon Rising",
    firstAppearance: "Moon Rising",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Icicle is an IceWing princess and the sister of Winter. She is vengeful and aggressive, holding grudges against those who wronged her family. Icicle kills Smolder at Jade Mountain Academy and is eventually killed by Sora in revenge, making her one of the more tragic antagonists in the series.",
  background: "Background information for Icicle.",
  arcStory: "Story arc involving Icicle.",
  relationships: [],
  quotes: []
},
{
  id: "admiral",
  name: "Admiral",
  tribe: "silk",
  gender: "Male",
  arc: 3,
  book: 11,
  bookTitle: "The Lost Continent",
    firstAppearance: "The Lost Continent",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/0/0e/AdmiralTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260421172505",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Admiral is a LeafWing dragon who appears in the Lost Continent arc. He is one of the LeafWings who survived the Tree Wars and plays a role in the resistance against Queen Wasp, using his military knowledge to help coordinate the rebellion.",
  background: "Background information for Admiral.",
  arcStory: "Story arc involving Admiral.",
  relationships: [],
  quotes: []
},
{
  id: "bloodshed",
  name: "Bloodshed",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Bloodshed is a dragon who appears in the Wings of Fire universe. He is a supporting character with connections to the larger story arc.",
  background: "Background information for Bloodshed.",
  arcStory: "Story arc involving Bloodshed.",
  relationships: [],
  quotes: []
},
{
  id: "cadelle",
  name: "Cadelle",
  tribe: "hive",
  gender: "Female",
  arc: 2,
  book: 8,
  bookTitle: "Escaping Peril",
    firstAppearance: "Escaping Peril",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/a/ad/CadelleTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210829061555",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Cadelle is a dragon who appears in the Wings of Fire universe. She is a supporting character with connections to the larger story arc.",
  background: "Background information for Cadelle.",
  arcStory: "Story arc involving Cadelle.",
  relationships: [],
  quotes: []
},
{
  id: "mushroom",
  name: "Mushroom",
  tribe: "mud",
  gender: "Female",
  arc: 1,
  book: 3,
  bookTitle: "The Hidden Kingdom",
    firstAppearance: "The Hidden Kingdom",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/d9/Mushroom_GN.png/revision/latest?cb=20200922121516",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Mushroom is a dragon who appears in the Wings of Fire universe. He is a supporting character with connections to the larger story arc.",
  background: "Background information for Mushroom.",
  arcStory: "Story arc involving Mushroom.",
  relationships: [],
  quotes: []
},
{
  id: "saguaro",
  name: "Saguaro",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Saguaro is a SandWing dragon who appears in the Dragonets of Destiny storyline. He is one of the SandWing citizens and has connections to the desert kingdom.",
  background: "Background information for Saguaro.",
  arcStory: "Story arc involving Saguaro.",
  relationships: [],
  quotes: []
},
{
  id: "scorpion",
  name: "Queen Scorpion",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Queen Scorpion is the ancient queen of the SandWings who ruled during the era of Darkstalker. She was a powerful and ruthless ruler who maintained control over the SandWing tribe through fear and military might.",
  background: "Background information for Queen Scorpion.",
  arcStory: "Story arc involving Queen Scorpion.",
  relationships: [],
  quotes: []
},
{
  id: "weevil",
  name: "Weevil",
  tribe: "hive",
  gender: "Female",
  arc: 3,
  book: 11,
  bookTitle: "The Lost Continent",
    firstAppearance: "The Lost Continent",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Weevil is a dragon who appears in the Wings of Fire universe. He is a supporting character with connections to the larger story arc.",
  background: "Background information for Weevil.",
  arcStory: "Story arc involving Weevil.",
  relationships: [],
  quotes: []
},
{
  id: "oasis",
  name: "Queen Oasis",
  tribe: "sand",
  gender: "Female",
  arc: 0,
  book: 1,
  bookTitle: "The Dragonet Prophecy",
    firstAppearance: "The Dragonet Prophecy",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 0",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Queen Oasis is the former queen of the SandWings who was murdered by scavengers (humans) during a treasure hunt, triggering the War of SandWing Succession. Her death plunged the SandWing tribe into civil war as her three daughters fought for the throne.",
  background: "Background information for Queen Oasis.",
  arcStory: "Story arc involving Queen Oasis.",
  relationships: [],
  quotes: []
},
{
  id: "cochineal",
  name: "Queen Cochineal",
  tribe: "hive",
  gender: "Female",
  arc: 3,
  book: 12,
  bookTitle: "The Hive Queen",
    firstAppearance: "The Hive Queen",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 3",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Queen Cochineal is a HiveWing queen who appears in the Lost Continent arc. She is one of the rulers of the HiveWing tribes and has connections to Queen Wasp regime, though she eventually breaks free from the mind control.",
  background: "Background information for Queen Cochineal.",
  arcStory: "Story arc involving Queen Cochineal.",
  relationships: [],
  quotes: []
},
{
  id: "jacaranda",
  name: "Queen Jacaranda",
  tribe: "hive",
  gender: "Female",
  arc: 3,
  book: 13,
  bookTitle: "The Poison Jungle",
    firstAppearance: "The Poison Jungle",
  category: "antagonist",
  image: "",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 3",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Queen Jacaranda is a HiveWing queen who appears in the Lost Continent arc. She is one of the rulers of the HiveWing tribes and has connections to Queen Wasp regime.",
  background: "Background information for Queen Jacaranda.",
  arcStory: "Story arc involving Queen Jacaranda.",
  relationships: [],
  quotes: []
},
{
  id: "avalanche",
  name: "Avalanche",
  tribe: "sky",
  gender: "Female",
  arc: 1,
  book: 4,
  bookTitle: "The Dark Secret",
    firstAppearance: "The Dark Secret",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/3/3e/Avalanche_GN_6.jpg/revision/latest/scale-to-width-down/227?cb=20241224094424",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Avalanche is an IceWing dragon who appears in the Jade Mountain Academy storyline. She is one of the IceWing students at the academy and has connections to the IceWing royal family.",
  background: "Background information for Avalanche.",
  arcStory: "Story arc involving Avalanche.",
  relationships: [],
  quotes: []
},
{
  id: "bandit",
  name: "Bandit",
  tribe: "sand",
  gender: "Female",
  arc: 1,
  book: 5,
  bookTitle: "The Brightest Night",
    firstAppearance: "The Brightest Night",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/46/BanditGN7.jpg/revision/latest?cb=20240122021718",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Bandit is a dragon who appears in the Wings of Fire universe. He is a supporting character with connections to the larger story arc.",
  background: "Background information for Bandit.",
  arcStory: "Story arc involving Bandit.",
  relationships: [],
  quotes: []
},
{
  id: "bigtail",
  name: "Bigtail",
  tribe: "night",
  gender: "Female",
  arc: 1,
  book: 2,
  bookTitle: "The Lost Heir",
    firstAppearance: "The Lost Heir",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/d/d1/Bigtail_GN_3.png/revision/latest?cb=20241219013923",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Bigtail is a dragon who appears in the Wings of Fire universe. She is a supporting character with connections to the larger story arc.",
  background: "Background information for Bigtail.",
  arcStory: "Story arc involving Bigtail.",
  relationships: [],
  quotes: []
},
{
  id: "deadlyclaws",
  name: "Deadlyclaws",
  tribe: "night",
  gender: "Female",
  arc: 3,
  book: 1,
  bookTitle: "Unknown",
    firstAppearance: "Unknown",
  category: "antagonist",
  image: "https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003",
  physical: "A dragon from the Wings of Fire universe.",
  role: "Character from Arc 1",
  personality: [
    "Brave",
    "Loyal",
    "Determined"
  ],
  abilities: [
    "Dragon abilities"
  ],
  description: "Deadlyclaws is a dragon who appears in the Wings of Fire universe. He is a supporting character with connections to the larger story arc.",
  background: "Background information for Deadlyclaws.",
  arcStory: "Story arc involving Deadlyclaws.",
  relationships: [],
  quotes: []
}
];




// ===== BOOK LIBRARY — All Categories =====
const BOOK_LIBRARY = {
  mainSeries: {
    title: "Main Series",
    description: "The core novels across four arcs — the heart of the Wings of Fire saga.",
    books: [
      { title: "The Dragonet Prophecy", number: 1, year: 2012, arc: "Arc 1", status: "Published" },
      { title: "The Lost Heir", number: 2, year: 2013, arc: "Arc 1", status: "Published" },
      { title: "The Hidden Kingdom", number: 3, year: 2014, arc: "Arc 1", status: "Published" },
      { title: "The Dark Secret", number: 4, year: 2014, arc: "Arc 1", status: "Published" },
      { title: "The Brightest Night", number: 5, year: 2015, arc: "Arc 1", status: "Published" },
      { title: "Moon Rising", number: 6, year: 2015, arc: "Arc 2", status: "Published" },
      { title: "Winter Turning", number: 7, year: 2016, arc: "Arc 2", status: "Published" },
      { title: "Escaping Peril", number: 8, year: 2017, arc: "Arc 2", status: "Published" },
      { title: "Talons of Power", number: 9, year: 2017, arc: "Arc 2", status: "Published" },
      { title: "Darkness of Dragons", number: 10, year: 2018, arc: "Arc 2", status: "Published" },
      { title: "The Lost Continent", number: 11, year: 2018, arc: "Arc 3", status: "Published" },
      { title: "The Hive Queen", number: 12, year: 2019, arc: "Arc 3", status: "Published" },
      { title: "The Poison Jungle", number: 13, year: 2019, arc: "Arc 3", status: "Published" },
      { title: "The Dangerous Gift", number: 14, year: 2021, arc: "Arc 3", status: "Published" },
      { title: "The Flames of Hope", number: 15, year: 2022, arc: "Arc 3", status: "Published" },
      { title: "The Hybrid Prince", number: 16, year: 2026, arc: "Arc 4", status: "Published" },
    ]
  },
  legends: {
    title: "Legends",
    description: "Standalone companion novels set in different eras of the Wings of Fire world. Each Legends book explores the backstories of iconic characters and pivotal events that shaped the dragon world.",
    books: [
      {
        title: "Darkstalker", number: 1, year: 2016, id: "darkstalker",
        description: "Set 2,000 years before the main series. The epic origin story of Darkstalker, the most powerful NightWing ever born.",
        plot: "Darkstalker, son of the IceWing prince Arctic and the NightWing seer Foeslayer, inherits both animus magic and NightWing powers — making him the most powerful dragon in history. He falls in love with Clearsight, a NightWing with prophetic abilities even stronger than his own, and befriends Fathom, a shy SeaWing prince who also possesses animus magic. As Darkstalker's powers grow, so does his paranoia and desire for control. He creates enchanted objects including an obsidian mind-reading scroll and attempts to force Clearsight to love him through enchantment — a violation that horrifies her. With Fathom's help, Clearsight uses Darkstalker's own enchantments and precognitive scrolls to lead him into a trap, sealing him beneath the earth where he remains for 2,000 years until his awakening in Book 10.",
        characters: [
          { name: "Darkstalker", role: "Protagonist — NightWing animus dragon", desc: "The most powerful dragon ever born, with animus magic, mind-reading, and precognition. His descent from brilliant genius to paranoid tyrant is the tragedy at the heart of the book." },
          { name: "Clearsight", role: "NightWing seer, Darkstalker's love", desc: "A NightWing with prophective abilities even more powerful than Darkstalker's. She genuinely loves him but becomes horrified by his increasing darkness and eventually seals him underground." },
          { name: "Fathom", role: "SeaWing prince, animus dragon", desc: "Darkstalker's best friend, a shy and kind SeaWing who also possesses animus magic. He helps Clearsight stop Darkstalker, though the betrayal of his friend devastates him." },
          { name: "Whiteout", role: "Darkstalker's half-sister", desc: "A NightWing/IceWing hybrid who enchants a mirror to discover who truly loves her — revealing painful truths about how she is treated." },
          { name: "Arctic", role: "IceWing prince, Darkstalker's father", desc: "An IceWing animus who defected to the NightWings. His complex relationship with Darkstalker shapes the young dragon's worldview." }
        ],
        setting: "Set on the NightWing volcanic island and the Ice Kingdom, 2,000 years before the main series. The NightWings live in a hidden volcanic kingdom, while the IceWings maintain their rigid hierarchical society.",
        themes: ["Free will vs. control", "Love vs. obsession", "Corruption of power", "Loyalty and betrayal"]
      },
      {
        title: "Dragonslayer", number: 2, year: 2020, id: "dragonslayer",
        description: "Set in the human world a generation before the main series. A groundbreaking perspective — told from the human side of the dragon-human conflict.",
        plot: "Ivy, a young woman in a human village on an island ruled by dragons, dreams of becoming a dragonslayer — a warrior who can defeat the massive creatures that dominate her world. When her village is threatened by the conflict between rival dragon queens, Ivy discovers that the line between hero and villain is not as clear as she believed. She encounters dragons who challenge everything she thought she knew about her enemies, and must decide whether to fight or seek understanding. The book explores the dragon-human relationship from a completely new perspective, revealing that humans in the Wings of Fire world are not mere background characters but have their own rich culture, fears, and aspirations.",
        characters: [
          { name: "Ivy", role: "Human protagonist", desc: "A determined, resourceful young woman from a human village who dreams of becoming a dragonslayer. Her journey challenges everything she thought she knew about dragons and herself." },
          { name: "Wren", role: "Human ally", desc: "Another human character who helps Ivy navigate the dangerous world between humans and dragons." }
        ],
        setting: "Set on an island in the human world, ruled by dragon queens. The human villages exist in the shadow of dragon civilization, with humans viewed as lesser beings by the dragon tribes.",
        themes: ["Prejudice and understanding", "Perspective and empathy", "Courage", "The nature of heroism"]
      },
    ]
  },
  winglets: {
    title: "Winglets",
    description: "Short companion stories (~100 pages each) following side characters from the main series. Originally released as e-book exclusives, later collected in print. Each Winglet provides a fresh perspective on events from the main novels.",
    books: [
      {
        title: "Prisoners", year: 2016, id: "winglet-prisoners",
        character: "Fjord (SkyWing)",
        plot: "Follows Fjord, a SkyWing soldier, during the events of the main series. Explores his imprisonment and the circumstances that led to his capture, providing insight into the SkyWing kingdom during the War of SandWing Succession. Offers a ground-level view of the war's impact on ordinary soldiers.",
        setting: "SkyWing kingdom and imprisonment during the War of SandWing Succession."
      },
      {
        title: "Assassin", year: 2016, id: "winglet-assassin",
        character: "Preyhunter/Flame (SkyWing)",
        plot: "Centers on a SkyWing assassin and his mission related to the RainWing challenge during the events of The Hidden Kingdom. Explores the darker side of the war through the eyes of a dragon trained to kill, showing the moral complexities of following orders in wartime.",
        setting: "SkyWing kingdom and mission territory during the War of SandWing Succession."
      },
      {
        title: "Deserter", year: 2016, id: "winglet-deserter",
        character: "Riptide (SeaWing)",
        plot: "Follows Riptide, a SeaWing who considers deserting during the war. His story runs alongside Tsunami's journey in The Lost Heir, revealing the pressures and conflicts faced by SeaWings caught between loyalty to their queen and their own conscience.",
        setting: "SeaWing kingdom and territories during the War of SandWing Succession."
      },
      {
        title: "Runaway", year: 2016, id: "winglet-runaway",
        character: "Fierceteeth (NightWing)",
        plot: "Follows Fierceteeth, a NightWing dragonet who escapes from the Rainforest Kingdom. Her escape reveals the harsh conditions the NightWings endured after their volcanic island was destroyed, and the desperation that drove them to invade the Rainforest.",
        setting: "Rainforest Kingdom and NightWing territory after the volcanic island's destruction."
      },
    ]
  },
  graphicNovels: {
    title: "Graphic Novels",
    description: "Full-color comic adaptations of the main series, published by Graphix (Scholastic). Planned to cover books 1-13 of the main series. Beautiful artwork brings the dragon world to life in vivid color.",
    books: [
      { title: "The Dragonet Prophecy", adapts: "Book 1", year: 2018, illustrator: "Joy Ang", description: "The first graphic novel adaptation, bringing the Dragonets of Destiny's escape from the underground cave to vivid life. Joy Ang's artwork established the visual style for the entire graphic novel series." },
      { title: "The Lost Heir", adapts: "Book 2", year: 2019, illustrator: "Mike Schley", description: "Tsunami's discovery of her SeaWing heritage and the deadly palace intrigue of the underwater kingdom. Mike Schley's detailed underwater environments bring the SeaWing world to life." },
      { title: "The Hidden Kingdom", adapts: "Book 3", year: 2019, illustrator: "Mike Schley", description: "Glory's journey to the Rainforest Kingdom and her discovery of the NightWing kidnapping plot. The lush rainforest environments are beautifully rendered." },
      { title: "The Dark Secret", adapts: "Book 4", year: 2020, illustrator: "Mike Schley", description: "Starflight's revelation of the NightWing deception and the volcanic eruption. The dramatic action sequences and emotional moments are powerfully conveyed." },
      { title: "The Brightest Night", adapts: "Book 5", year: 2022, illustrator: "Michael Mucci", description: "The conclusion of Arc 1, with Sunny's role in ending the SandWing War. Michael Mucci brings fresh energy to the visual storytelling." },
      { title: "Moon Rising", adapts: "Book 6", year: 2026, illustrator: "Mike Holmes", description: "The first Arc 2 adaptation, introducing Jade Mountain Academy and Moonwatcher's story. Mike Holmes takes over illustration duties for the second arc." },
    ]
  },
  guides: {
    title: "Guides & Companion Books",
    description: "Official reference guides and encyclopedias covering the world, characters, and lore of Wings of Fire. Essential companions for dedicated fans.",
    books: [
      {
        title: "The Ultimate Guide", year: 2022, illustrator: "Joy Ang",
        description: "A comprehensive illustrated encyclopedia covering the main series books. Features detailed dragon tribe profiles with physical descriptions and abilities, character guides with portraits, maps of Pyrrhia and Pantala, timeline of events, and deep dives into the lore and mythology of the Wings of Fire world. Illustrated by Joy Ang, the original graphic novel artist.",
        contents: ["Tribe profiles and abilities", "Character portraits and biographies", "Maps of both continents", "Timeline of major events", "Behind-the-scenes lore"]
      },
      {
        title: "A Guide to the Dragon World", year: 2023,
        description: "The official illustrated guide to the Wings of Fire universe, written by Tui T. Sutherland herself. Covers all 10 dragon tribes with detailed cultural information, maps of Pyrrhia and Pantala, dragon history from the Age of Fire to the present, and profiles of major characters. This guide is sometimes cataloged as Wings of Fire #16.",
        contents: ["All 10 tribe cultures and histories", "Author-written world lore", "Detailed maps", "Character relationships", "Behind-the-scenes insights from Tui T. Sutherland"]
      },
    ]
  }
};



const AUTHOR_INFO = {
  name: "Tui T. Sutherland",
  fullName: "Tui Tor Sutherland",
  born: "July 8, 1978",
  birthplace: "Caracas, Venezuela",
  nationality: "American",
  bio: "Tui T. Sutherland is an American author of children's and young adult fiction, best known as the creator of the Wings of Fire series. Born in Caracas, Venezuela, she grew up in various places including New Jersey and Florida. She is the sister of fellow authors Kody Keplinger and Emily Sutherland.",
  inspiration: "The idea for Wings of Fire came from a conversation with her editor about writing a fantasy series where dragons are the main characters rather than monsters or obstacles. Inspired by her love of mythology, nature documentaries, and epic fantasy, Sutherland created a world told entirely from the dragon perspective — with complex politics, diverse cultures, and deeply human stories of friendship, identity, and courage.",
  otherWorks: [
    "Warriors series (as part of the Erin Hunter pseudonym collective)",
    "Seekers series",
    "Spirit Animals series",
    "Menagerie series",
    "Winglets: A Wings of Fire Companion",
    "The Guide to the Dragon World"
  ],
  achievements: [
    "New York Times bestselling author",
    "Wings of Fire has sold over 50 million copies worldwide",
    "Translated into 38+ languages",
    "Adapted into graphic novels",
    "Inspired a Netflix animated series",
    "Hachette Book Group partnership for ongoing expansion"
  ]
};

const WORLD_LOCATIONS = {
  pyrrhia: {
    name: "Pyrrhia",
    description: "The first continent explored in the series, home to seven dragon tribes. Pyrrhia is a land of diverse biomes — from frozen tundra to scorching deserts, from underwater kingdoms to dense rainforests. The continent is dominated by the aftermath of the War of SandWing Succession, a twenty-year conflict between three SandWing sisters vying for the throne.",
    kingdoms: [
      { name: "Mud Kingdom", tribe: "mud", terrain: "Swamps and marshes" },
      { name: "Kingdom of the Sea", tribe: "sea", terrain: "Underwater coral palaces" },
      { name: "Rainforest Kingdom", tribe: "rain", terrain: "Tropical canopy" },
      { name: "Night Kingdom", tribe: "night", terrain: "Volcanic island (destroyed), relocated to rainforest" },
      { name: "Sand Kingdom", tribe: "sand", terrain: "Desert wastes" },
      { name: "Ice Kingdom", tribe: "ice", terrain: "Frozen tundra and glaciers" },
      { name: "Sky Kingdom", tribe: "sky", terrain: "Volcanic mountains and high peaks" }
    ],
    keyLocations: [
      "Jade Mountain Academy — school where dragons of all tribes learn together",
      "The Talons of Peace cave — where the dragonets were raised",
      "The Hidden Palace — ancient NightWing home",
      "The Scorching — desert region of the Sand Kingdom"
    ]
  },
  pantala: {
    name: "Pantala",
    description: "The second continent introduced in Arc 3, home to three dragon tribes: SilkWings, HiveWings, and LeafWings. Pantala's history is shaped by the Tree Wars, a devastating conflict that nearly wiped out the LeafWings. The continent is ruled by the tyrannical Queen Wasp, who controls the HiveWings through individual mind possession.",
    kingdoms: [
      { name: "Hive Cities", tribe: "hive", terrain: "Massive tower cities" },
      { name: "SilkWing territories", tribe: "silk", terrain: "Coastal and urban areas under HiveWing rule" },
      { name: "The Poison Jungle", tribe: "leaf", terrain: "Deadly tropical forest, LeafWing sanctuary" }
    ],
    keyLocations: [
      "The Tree of Life — ancient and sacred location",
      "Cirrus — the Hive capital",
      "The Poison Jungle — deadly and mysterious, home of the surviving LeafWings",
      "The Sanctuary — safe haven for freed dragons"
    ]
  }
};

const NEWS_DATA = [
  {
    id: 1,
    date: "March 3, 2026",
    title: "Book 16: The Hybrid Prince Released!",
    category: "Book Release",
    summary: "The Hybrid Prince, the first book of Arc 4: The Forgotten Isles Prophecy, has been released! Follow Umber, Clay's younger brother, as he discovers the mysterious Court of Refuge and uncovers a three-thousand-year-old prison island's secrets.",
    link: "?page=book&id=16",
    hot: true
  },
  {
    id: 2,
    date: "October 23, 2025",
    title: "Book 16 Cover Revealed",
    category: "Cover Reveal",
    summary: "Scholastic revealed the cover art for Wings of Fire Book 16: The Hybrid Prince online at 4:30 PM EST. The cover features Umber on the mysterious island of the Court of Refuge.",
    link: null,
    hot: false
  },
  {
    id: 4,
    date: "2026",
    title: "Graphic Novel #6: Moon Rising",
    category: "Graphic Novel",
    summary: "The graphic novel adaptation of Moon Rising (Book 6) is scheduled for release in 2026, illustrated by Mike Holmes. This marks the beginning of the Arc 2 graphic novel adaptations.",
    link: null,
    hot: false
  },
  {
    id: 6,
    date: "March 2026",
    title: "Netflix Animated Series Update",
    category: "Adaptation",
    summary: "The Wings of Fire animated series, originally announced with Netflix and showrunner Ava DuVernay, remains in development discussions. Fan campaigns continue to push for the adaptation.",
    link: null,
    hot: false
  }
];

const ARCHIVE_DATA = [
  { date: "March 3, 2026", title: "The Hybrid Prince Released", category: "Book Release", summary: "Book 16: The Hybrid Prince by Tui T. Sutherland released. First book of Arc 4: The Forgotten Isles Prophecy. Umber's story begins." },
  { date: "March 3, 2026", title: "Graphic Novel #6: Moon Rising Released", category: "Graphic Novel", summary: "The graphic novel adaptation of Moon Rising (Book 6) released, illustrated by Mike Holmes. Begins the Arc 2 graphic novel series." },
  { date: "October 23, 2025", title: "Book 16 Cover Revealed", category: "Cover Reveal", summary: "Scholastic revealed the cover art for Wings of Fire Book 16: The Hybrid Prince. Features Umber on the Court of Refuge island." },
  { date: "2023", title: "A Guide to the Dragon World Published", category: "Book Release", summary: "Official illustrated guide to the Wings of Fire universe by Tui T. Sutherland. Covers all 10 dragon tribes, maps, and lore." },
  { date: "2022", title: "The Ultimate Guide Published", category: "Book Release", summary: "Comprehensive illustrated encyclopedia covering all 15 main series books. Features tribe profiles, character guides, and maps." },
  { date: "March 1, 2022", title: "Book 15: The Flames of Hope Released", category: "Book Release", summary: "The final book of Arc 3 released. Luna's story concludes the Lost Continent Prophecy. The Othermind is defeated." },
  { date: "February 1, 2022", title: "Graphic Novel #5: The Brightest Night", category: "Graphic Novel", summary: "Graphic novel adaptation of Book 5 released, illustrated by Michael Mucci. Concludes Arc 1 graphic novel adaptations." },
  { date: "March 2, 2021", title: "Book 14: The Dangerous Gift Released", category: "Book Release", summary: "Snowfall's story released. The young IceWing queen must unite Pyrrhia against the Plague of Light." },
  { date: "2020", title: "Legends #2: Dragonslayer Released", category: "Book Release", summary: "The second Legends book released. Set in the human world, following Ivy's journey discovering the dragon world." },
  { date: "July 1, 2020", title: "Graphic Novel #4: The Dark Secret", category: "Graphic Novel", summary: "Graphic novel adaptation of Book 4 released, illustrated by Mike Schley." },
  { date: "November 12, 2019", title: "Book 13: The Poison Jungle Released", category: "Book Release", summary: "Sundew's story released. The LeafWing warrior leads the quest through the deadly Poison Jungle." },
  { date: "April 2, 2019", title: "Book 12: The Hive Queen Released", category: "Book Release", summary: "Cricket's story released. The immune HiveWing plays a central role in breaking Queen Wasp's mind control." },
  { date: "2019", title: "Graphic Novels #2 & #3 Released", category: "Graphic Novel", summary: "The Lost Heir and The Hidden Kingdom graphic novels released, illustrated by Mike Schley." },
  { date: "November 27, 2018", title: "Book 11: The Lost Continent Released", category: "Book Release", summary: "Blue's story released. The series moves to Pantala. Blue discovers the oppression of SilkWings." },
  { date: "July 31, 2018", title: "Book 10: Darkness of Dragons Released", category: "Book Release", summary: "Qibli's story released. Arc 2 concludes. Darkstalker is defeated and turned into Peacemaker." },
  { date: "February 27, 2018", title: "Graphic Novel #1 Released", category: "Graphic Novel", summary: "First Wings of Fire graphic novel released, illustrated by Joy Ang." },
  { date: "December 26, 2017", title: "Book 9: Talons of Power Released", category: "Book Release", summary: "Turtle's story released. The quiet SeaWing with animus magic helps defeat the growing threat." },
  { date: "January 31, 2017", title: "Book 8: Escaping Peril Released", category: "Book Release", summary: "Peril's story released. The firescales SkyWing confronts Queen Scarlet." },
  { date: "2017", title: "Winglets Collected Edition Published", category: "Book Release", summary: "All four Winglet stories collected into a single print volume." },
  { date: "June 28, 2016", title: "Legends #1: Darkstalker Released", category: "Book Release", summary: "The first Legends book released. Darkstalker's origin story, set 2,000 years before the main series." },
  { date: "June 28, 2016", title: "Book 7: Winter Turning Released", category: "Book Release", summary: "Winter's story released. The IceWing prince searches for his brainwashed brother." },
  { date: "2016", title: "All Four Winglets Released", category: "Book Release", summary: "Prisoners, Assassin, Deserter, and Runaway — four short companion stories." },
  { date: "December 29, 2015", title: "Book 6: Moon Rising Released", category: "Book Release", summary: "Moonwatcher's story released. The first book of Arc 2 introduces Jade Mountain Academy." },
  { date: "March 31, 2015", title: "Book 5: The Brightest Night Released", category: "Book Release", summary: "Sunny's story released. Arc 1 concludes. The War of SandWing Succession ends." },
  { date: "September 30, 2014", title: "Book 4: The Dark Secret Released", category: "Book Release", summary: "Starflight's story released. The NightWing deception is revealed. Starflight is blinded." },
  { date: "January 28, 2014", title: "Book 3: The Hidden Kingdom Released", category: "Book Release", summary: "Glory's story released. She becomes Queen of the RainWings after defeating Queen Scarlet." },
  { date: "July 2, 2013", title: "Book 2: The Lost Heir Released", category: "Book Release", summary: "Tsunami's story released. She discovers her SeaWing royal heritage." },
  { date: "June 26, 2012", title: "Book 1: The Dragonet Prophecy Released", category: "Book Release", summary: "The first Wings of Fire book released. Five dragonets escape to fulfill a prophecy." },
  { date: "2023", title: "Netflix Series Status Update", category: "Adaptation", summary: "The Wings of Fire animated series faces uncertainty after production challenges at Netflix." },
  { date: "2024", title: "Fan Campaign for Animated Series", category: "Community", summary: "Fans launch campaigns to revive the animated series adaptation on social media." },
];

/* ============================================
   WINGS OF FIRE — App Logic
   ============================================ */

// ===== Router =====
function getRoute() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 'home';
  const id = params.get('id');
  return { page, id };
}

function navigate(page, id) {
  const url = id ? `?page=${page}&id=${id}` : `?page=${page}`;
  history.pushState({}, '', url);
  const mainEl = document.querySelector('.main');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (mainEl && !mainEl.classList.contains('main--exiting') && !reducedMotion) {
    mainEl.classList.add('main--exiting');
    let finished = false;
    let fallbackTimer;
    const finishNavigation = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallbackTimer);
      mainEl.removeEventListener('animationend', finishNavigation);
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    mainEl.addEventListener('animationend', finishNavigation);
    // Do not let disabled/unsupported animations strand the router.
    fallbackTimer = setTimeout(finishNavigation, 300);
  } else {
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ===== Navigation Component =====
function renderNav(activePage) {
  const current = (page) => activePage === page || (page === 'characters' && activePage === 'character') || (page === 'books' && activePage === 'book');
  const activeAttr = (page) => current(page) ? ' aria-current="page"' : '';
  return `
    <nav class="nav" id="mainNav">
      <a href="?page=home" class="nav__logo" onclick="event.preventDefault(); navigate('home')">
        <img class="nav__logo-icon" src="https://static.wikia.nocookie.net/wingsoffire/images/4/41/Wings_of_Fire_16_Full_Edited.jpg/revision/latest/scale-to-width-down/600" alt="WoF logo" onerror="this.onerror=null;this.src='IceTransparent.webp'" />
        <span class="nav__logo-text">WINGS OF FIRE</span>
      </a>
      <button class="nav__hamburger" id="menuToggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks"><span class="nav__hamburger-lines" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <ul class="nav__links" id="navLinks">
        <li><a href="?page=home" class="nav__link ${current('home')?'nav__link--active':''}"${activeAttr('home')} onclick="event.preventDefault(); navigate('home')">Home</a></li>
        <li><a href="?page=characters" class="nav__link ${current('characters')?'nav__link--active':''}"${activeAttr('characters')} onclick="event.preventDefault(); navigate('characters')">Characters</a></li>
        <li><a href="?page=books" class="nav__link ${current('books')?'nav__link--active':''}"${activeAttr('books')} onclick="event.preventDefault(); navigate('books')">Books</a></li>
        <li><a href="?page=world" class="nav__link ${current('world')?'nav__link--active':''}"${activeAttr('world')} onclick="event.preventDefault(); navigate('world')">World</a></li>
        <li><a href="?page=library" class="nav__link ${current('library')?'nav__link--active':''}"${activeAttr('library')} onclick="event.preventDefault(); navigate('library')">Library</a></li>
        <li><a href="?page=news" class="nav__link ${current('news')?'nav__link--active':''}"${activeAttr('news')} onclick="event.preventDefault(); navigate('news')">News</a></li>
        <li><a href="?page=comments" class="nav__link ${current('comments')?'nav__link--active':''}"${activeAttr('comments')} onclick="event.preventDefault(); navigate('comments')">Comments</a></li>
        <li><a href="?page=author" class="nav__link ${current('author')?'nav__link--active':''}"${activeAttr('author')} onclick="event.preventDefault(); navigate('author')">Author</a></li>
      </ul>
      <button class="nav__search-btn" id="searchToggle" type="button" aria-label="Open search">
        ${renderWikiIcon('night', 'Search', 20)} <span>Search</span> <kbd>⌘K</kbd>
      </button>
    </nav>`;
}

// ===== Background =====
function renderBg() {
  return `
    <div class="bg-canvas">
      <div class="bg-orb bg-orb--fire"></div>
      <div class="bg-orb bg-orb--ice"></div>
      <div class="bg-orb bg-orb--night"></div>
      <div class="bg-orb bg-orb--rain"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="shooting-star"></div>
      <div class="fog-layer"></div>
      <div class="fog-layer"></div>
      <div class="fog-layer"></div>
      <div class="dot-grid"></div>
      <div class="aurora aurora--1"></div>
      <div class="aurora aurora--2"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
    </div>`;
}

// ===== Footer =====
function renderFooter() {
  return ''; // Static footer in HTML template handles this
}

// ===== Search =====
/* Wiki role labels: these are additional, non-exclusive classifications. */
const WIKI_ROLE_CATALOGS = Object.freeze({"historical":[{"name":"Abalone","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fd/Abalone_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251118022844","wikiUrl":"https://wingsoffire.fandom.com/wiki/Abalone"},{"name":"Albatross","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Albatross"},{"name":"Allknowing","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Allknowing"},{"name":"Anaconda","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Anaconda"},{"name":"Anhinga","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Anhinga"},{"name":"Arctic","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/11/Arctic_GN_18.png/revision/latest/scale-to-width-down/500?cb=20251105102127","wikiUrl":"https://wingsoffire.fandom.com/wiki/Arctic","species":"Dragon","gender":"Male","status":"Deceased","description":"Arctic is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Argyll","tribe":"unknown","species":"Human","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Argyll"},{"name":"Asha","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Asha"},{"name":"Bayou","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bayou"},{"name":"Bloodshed","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Bloodshed"},{"name":"Canyon","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Canyon","species":"Unknown","gender":"Male","status":"Deceased","description":"Canyon is a character associated with skyWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (princess)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(princess)"},{"name":"Carmine","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Carmine"},{"name":"Char","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Char"},{"name":"Cicada (AGttDW)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cicada_(AGttDW)"},{"name":"Clearpool","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Clearpool"},{"name":"Clearsight","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/94/Clearsight_GN_7.png/revision/latest/scale-to-width-down/500?cb=20251104101634","wikiUrl":"https://wingsoffire.fandom.com/wiki/Clearsight","species":"Dragon","gender":"Female","status":"Deceased","description":"Clearsight is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Cochineal","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/61/CochinealTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260425004219","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cochineal"},{"name":"Commodore","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Commodore"},{"name":"Copperhead","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Copperhead"},{"name":"Cowrie","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fc/Cowrie_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104090746","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cowrie"},{"name":"Coyote","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Coyote"},{"name":"Coypu","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Coypu"},{"name":"Crane (L1)","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Crane_(L1)"},{"name":"Current","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/ba/Current_GN_6.png/revision/latest/scale-to-width-down/500?cb=20251104091136","wikiUrl":"https://wingsoffire.fandom.com/wiki/Current"},{"name":"Darkling","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Darkling"},{"name":"Diadem","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Diadem"},{"name":"Diamond","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/38/Diamond_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104101247","wikiUrl":"https://wingsoffire.fandom.com/wiki/Diamond"},{"name":"Discretion","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e5/DiscretionTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210715231632","wikiUrl":"https://wingsoffire.fandom.com/wiki/Discretion"},{"name":"Dolphin","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dolphin"},{"name":"Eagle (L1)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/89/Eagle_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104091500","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eagle_(L1)"},{"name":"Eclipse (L1)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eclipse_(L1)"},{"name":"Eel","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eel"},{"name":"Egret","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Egret"},{"name":"Euphoria","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Euphoria"},{"name":"Falcon","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Falcon"},{"name":"Farsight","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Farsight"},{"name":"Fathom","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a8/Fathom_GN_1.png/revision/latest/scale-to-width-down/500?cb=20250926213608","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fathom","species":"Dragon","gender":"Male","status":"Deceased","description":"Fathom is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Festoon","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Festoon"},{"name":"Fierceclaws","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fierceclaws"},{"name":"Firestorm","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Firestorm"},{"name":"Foreseer","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Foreseer"},{"name":"Frostbite","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Frostbite"},{"name":"Hibiscus","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hibiscus"},{"name":"Humpback","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a1/Humpback_GN.png/revision/latest/scale-to-width-down/500?cb=20251104091754","wikiUrl":"https://wingsoffire.fandom.com/wiki/Humpback"},{"name":"Hvitur","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Hvitur"},{"name":"Icicle (THP)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Icicle_(THP)"},{"name":"Indigo","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/2e/Indigo_GN_14.png/revision/latest/scale-to-width-down/500?cb=20251105121544","wikiUrl":"https://wingsoffire.fandom.com/wiki/Indigo","species":"Dragon","gender":"Female","status":"Deceased","description":"Indigo is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Talons of Power · Arc 4 mentioned: The Hybrid Prince"},{"name":"Jacaranda","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jacaranda"},{"name":"Jaguar","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Jaguar"},{"name":"Jerboa","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Jerboa"},{"name":"Jerboa II","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/03/JerboaIIITopShot.png/revision/latest/scale-to-width-down/500?cb=20210518213521","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jerboa_II"},{"name":"Jewel (TLC)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Jewel_(TLC)"},{"name":"Jewel-eyes","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/Jewel-eyes_GN_3.png/revision/latest/scale-to-width-down/500?cb=20251104093249","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jewel-eyes"},{"name":"Lagoon (L1)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/51/Lagoon_GN_4.png/revision/latest/scale-to-width-down/500?cb=20250926214412","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lagoon_(L1)"},{"name":"Lemur","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Lemur"},{"name":"Linden","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Linden"},{"name":"Lionfish","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/47/Lionfish_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104092409","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lionfish"},{"name":"Listener","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Listener"},{"name":"Magnolia (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Magnolia_(AGttDW)"},{"name":"Magnolia (THP)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Magnolia_(THP)"},{"name":"Manta","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Manta"},{"name":"Maple","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Maple"},{"name":"Moccasin","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Moccasin"},{"name":"Monarch (AGttDW 1)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Monarch_(AGttDW_1)"},{"name":"Monarch (AGttDW 2)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Monarch_(AGttDW_2)"},{"name":"Morrowwatcher","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/73/Morrowwatcher_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251225100327","wikiUrl":"https://wingsoffire.fandom.com/wiki/Morrowwatcher"},{"name":"Oasis","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3e/OasisGN1.png/revision/latest/scale-to-width-down/500?cb=20260520195329","wikiUrl":"https://wingsoffire.fandom.com/wiki/Oasis"},{"name":"Olive","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Olive"},{"name":"Opal","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Opal"},{"name":"Orange","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Orange"},{"name":"Orca","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/32/Orca_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518080305","wikiUrl":"https://wingsoffire.fandom.com/wiki/Orca"},{"name":"Ostrich (W3)","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ostrich_(W3)"},{"name":"Pearl (L1)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d9/Pearl_GN_13.png/revision/latest/scale-to-width-down/500?cb=20251105122700","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pearl_(L1)"},{"name":"Penguin","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Penguin"},{"name":"Possum","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Possum"},{"name":"Precipice","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Precipice"},{"name":"Prudence","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Prudence"},{"name":"Python","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Python"},{"name":"Quickdeath","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Quickdeath"},{"name":"Quicksand","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1b/QuicksandTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260701164527","wikiUrl":"https://wingsoffire.fandom.com/wiki/Quicksand"},{"name":"Quickstrike","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Quickstrike"},{"name":"Reef","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Reef"},{"name":"Retribution","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Retribution"},{"name":"Ripple","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Ripple"},{"name":"Root","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Root"},{"name":"Sapphire","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sapphire"},{"name":"Sawgrass","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sawgrass"},{"name":"Scald","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Scald"},{"name":"Scallop","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scallop"},{"name":"Scorpion","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scorpion"},{"name":"Silverwash","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Silverwash"},{"name":"Singe","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Singe"},{"name":"Slaughter","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Slaughter"},{"name":"Snapper","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Snapper"},{"name":"Snowflake","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/Snowflake_GN_2.png/revision/latest/scale-to-width-down/500?cb=20250926214648","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowflake","species":"Dragon","gender":"Female","status":"Deceased","description":"Snowflake is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Snowfox","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowfox"},{"name":"Snowstorm (advisor)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowstorm_(advisor)"},{"name":"Sorrel","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sorrel"},{"name":"Splash","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Splash"},{"name":"Starclaws","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Starclaws"},{"name":"Summit","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Summit"},{"name":"Sunset (L1)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a0/Sunset_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104094355","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sunset_(L1)"},{"name":"Sunstreak","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sunstreak"},{"name":"Swiftwings","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Swiftwings"},{"name":"Taupe","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Taupe"},{"name":"Tawny (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tawny_(AGttDW)"},{"name":"Tempest","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tempest"},{"name":"Thoughtful","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Thoughtful"},{"name":"Tortoiseshell (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tortoiseshell_(AGttDW)"},{"name":"Tortoiseshell (TLC)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tortoiseshell_(TLC)"},{"name":"Truthfinder","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Truthfinder"},{"name":"Tunesmith","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tunesmith"},{"name":"Unnamed characters","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Unnamed_characters"},{"name":"Vigilance","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c0/Vigilance_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104095801","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vigilance"},{"name":"Vision","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Vision"},{"name":"Warthog","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Warthog"},{"name":"Waterfall","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Waterfall"},{"name":"Wharf","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Wharf"},{"name":"Whiteout","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Whiteout"},{"name":"Zelkova","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Zelkova"}],"mentioned":[{"name":"Algae","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Algae","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Algae is a dragon of unknown tribe and gender who was mentioned in The Hybrid Prince. They currently reside in the Court of Refuge.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Anaconda","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Anaconda","species":"Dragon","gender":"Female","status":"Deceased","description":"Anaconda is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Anhinga","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Anhinga","species":"Unknown","gender":"Female","status":"Deceased","description":"Anhinga is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Argus","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Argus","species":"Dragon","gender":"Male","status":"Alive (as of The Hive Queen)","description":"Argus is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Armadillo","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Armadillo","species":"Dragon","gender":"Unknown","status":"Alive (as of The Brightest Night)","description":"Armadillo is an adult SandWing of unknown gender who was mentioned in The Brightest Night. They are most likely a member of the Outclaws.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Ash","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Ash","species":"Dragon","gender":"Female","description":"Ash is a female dragon of unknown tribe who was featured in A Guide to the Dragon World. She is the protagonist of Willow's favorite book, Ash of Green Gingkos.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Asha","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Asha","species":"Dragon","gender":"Female","status":"Deceased","description":"Asha is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Dragonet Prophecy"},{"name":"Aster","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Aster","species":"Human","gender":"Female","status":"Unknown","description":"Aster is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Bayou","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bayou","species":"Unknown","gender":"Female","status":"Deceased","description":"Bayou is a character associated with mudWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince · Featured in: A Guide to the Dragon World"},{"name":"Bloodworm","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bloodworm","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Bloodworm is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Bluebell","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Bluebell","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Bluebell is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Bonecruncher","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bonecruncher","species":"Dragon","gender":"Male","description":"Bonecruncher is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Boulder","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Boulder","species":"Unknown","gender":"Male","status":"Alive (as of Hero)","description":"Boulder is a character associated with skyWing in the Wings of Fire universe."},{"name":"Bright","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bright","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Bright is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Camellia","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Camellia","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Camellia is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Capybara","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Capybara","species":"Dragon","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Capybara is a SandWing of unknown gender who was mentioned in Darkness of Dragons. They serve as the leader of Queen Thorn's spies and currently resides in the SandWing stronghold.","appearance":"Arc 2 mentioned: Darkness of Dragons"},{"name":"Caribou (bard's daughter)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard's_daughter)","species":"Unknown","gender":"Female","description":"Caribou is a female IceWing dragonet who was featured in A Guide to the Dragon World. She is the daughter of Caribou and currently resides in the Village-of-the-Plentiful-Seals. She is a future Jade Mountain Academy student.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (bard's friend's sister)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard's_friend's_sister)","species":"Dragon","gender":"Female","description":"Caribou is a female IceWing who was featured in A Guide to the Dragon World. She is the sister of a friend of Caribou and is one of the thirty IceWings in the Village-of-the-Plentiful-Seals who is named Caribou.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (bard's friend)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard's_friend)","species":"Dragon","gender":"Unknown","description":"Caribou is an IceWing of unknown gender who was featured in A Guide to the Dragon World. They were mentioned to be a friend of Caribou and is one of the thirty IceWings who lives in Village-of-the-Plentiful-Seals named Caribou.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (bard's grandmother)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard's_grandmother)","species":"Dragon","gender":"Female","description":"Caribou is an adult female IceWing who was featured in A Guide to the Dragon World. She is the grandmother of Caribou and Snowstorm. She is one of the thirty dragons in the Village-of-the-Plentiful-Seals named Caribou.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (bard's mother)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard's_mother)","species":"Dragon","gender":"Female","description":"Caribou is an adult female IceWing who was featured in A Guide to the Dragon World. She is the mother of Caribou and Snowstorm. She is one of the thirty dragons in the Village-of-the-Plentiful-Seals named Caribou.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (bard)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(bard)","species":"Dragon","gender":"Unknown","description":"Caribou (bard) is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Caribou (princess)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Caribou_(princess)","species":"Unknown","gender":"Female","status":"Deceased","description":"Caribou was an adult female IceWing princess who was featured in A Guide to the Dragon World. She was an animus and the creator of the gift of subsistence. She resided in the IceWing palace.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Carmine","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Carmine","species":"Dragon","gender":"Female","status":"Deceased","description":"Carmine is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Chipmunk","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Chipmunk","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Chipmunk is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Cicada (AGttDW)","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cicada_(AGttDW)","species":"Unknown","gender":"Female","status":"Deceased","description":"Cicada was an adult female HiveWing who was featured in A Guide to the Dragon World. She ruled as queen of the HiveWings at an unspecified point in history and had a warning from Clearsight in the Book of Clearsight.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Cicada (TLC)","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c3/CicadaTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210807174631","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cicada_(TLC)","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Cicada is an adult female HiveWing who was mentioned in The Lost Continent. She is one of Ex-Queen Wasp's sisters, and the former ruler of Cicada Hive. She is currently imprisoned in the flamesilk factory alongside her other sisters."},{"name":"Clorinde","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Clorinde","species":"Dragon","gender":"Female","description":"Clorinde is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Cochineal","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/61/CochinealTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260425004219","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cochineal","species":"Unknown","gender":"Female","status":"Deceased","description":"Cochineal is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Comet","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Comet","species":"Dragon","gender":"Male","description":"Comet is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Commodore","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Commodore","species":"Unknown","gender":"Male","status":"From a possible timeline","description":"Commodore is a character associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Copperhead","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Copperhead","species":"Unknown","gender":"Male","status":"Deceased","description":"Copperhead is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Coypu","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Coypu","species":"Unknown","gender":"Female","status":"Deceased","description":"Coypu is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Crane (L1)","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Crane_(L1)","species":"Dragon","gender":"Female","status":"Deceased","description":"Crane was an adult female MudWing who was mentioned in The Dangerous Gift. She ruled as queen of the MudWings during the era of Darkstalker.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Cypress","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Cypress","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Cypress is a dragon of unknown tribe and gender who was mentioned in The Hybrid Prince. They currently reside in the Court of Refuge.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Diadem","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Diadem","species":"Unknown","gender":"Female","status":"Deceased","description":"Diadem is a character associated with silkWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Dolphin","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dolphin","species":"Unknown","gender":"Female","status":"Deceased","description":"Dolphin is a character associated with seaWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Dragonfly","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Dragonfly","species":"Dragon","gender":"Female","status":"Unknown","description":"Dragonfly is an adult female dragon of unknown tribe who was mentioned in The Hive Queen.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Droplet","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Droplet","species":"Dragon","gender":"Unknown","description":"Droplet is a SeaWing of unknown gender who was mentioned in Talons of Power. They are from a story written by Queen Coral.","appearance":"Arc 2 mentioned: Talons of Power"},{"name":"Earthworm","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Earthworm","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Earthworm is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Eclipse (L1)","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eclipse_(L1)","species":"Dragon","gender":"Female","status":"From a possible timeline","description":"Eclipse was a female NightWing-IceWing hybrid who was mentioned in Darkstalker. She was one of the six possible dragonets that Clearsight and Darkstalker could have had in a formerly possible future.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Egret","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Egret","species":"Unknown","gender":"Female","status":"Deceased","description":"Egret is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Festoon","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Festoon","species":"Unknown","gender":"Male","status":"Deceased","description":"Festoon is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Fierceclaws","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fierceclaws","species":"Unknown","gender":"Female","status":"From a possible timeline","description":"Fierceclaws was a female NightWing-IceWing hybrid who was mentioned in Darkstalker. She was one of the six possible dragonets that Clearsight and Darkstalker might have had in a formerly possible future, and also the older sister of Eclipse, Shadowhunter, and three other unnamed dragonets.","appearance":"Arc 2 mentioned: Moon Rising, · Arc 3 mentioned: The Lost Continent"},{"name":"Firestorm","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Firestorm","species":"Unknown","gender":"Female","status":"Deceased","description":"Firestorm is a character associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Escaping Peril · Arc 4 mentioned: The Hybrid Prince · Featured in: A Guide to the Dragon World"},{"name":"Foreseer","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Foreseer","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Foreseer is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Frostbite","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Frostbite","species":"Dragon","gender":"Female","status":"Deceased","description":"Frostbite was a female IceWing animus who was mentioned in Winter Turning. She created the gift of light, also known as the Moon Globe Tree.","appearance":"Arc 2 mentioned: Winter Turning · Featured in: A Guide to the Dragon World"},{"name":"Glowworm (TPJ)","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Glowworm_(TPJ)","species":"Dragon","gender":"Female","status":"Alive (as of The Poison Jungle)","description":"Glowworm is a female HiveWing dragonet who was mentioned in The Poison Jungle. She is the daughter of Inchworm.","appearance":"Arc 3 mentioned: The Poison Jungle"},{"name":"Grasshopper","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Grasshopper","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Grasshopper is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Great Ice Dragon","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Great_Ice_Dragon","species":"Dragon","description":"Many IceWings frequently swear under the Great Ice Dragon's name. IceWings believe the aurora borealis comes from the Great Ice Dragon's frostbreath."},{"name":"Guava","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Guava","species":"Dragon","gender":"Unknown","description":"Guava is a dragon of unknown tribe and gender who was featured in A Guide to the Dragon World. They are a character in Willow's favorite book, Ash of Green Gingkos.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Harrier","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Harrier","species":"Dragon","gender":"Unknown","status":"Alive (as of Escaping Peril)","description":"Harrier is a SkyWing guard of unknown gender who was mentioned in Escaping Peril.","appearance":"Arc 2 mentioned: Escaping Peril"},{"name":"Hibiscus","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hibiscus","species":"Unknown","gender":"Female","status":"Deceased","description":"Hibiscus is a character associated with rainWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Hornet","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hornet","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Hornet is an adult female HiveWing who was mentioned in The Hive Queen. She is the former ruler of Hornet Hive and one of Ex-Queen Wasp's sisters. She is currently imprisoned in the flamesilk factory alongside her other sisters."},{"name":"Icicle (THP)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Icicle_(THP)","species":"Unknown","gender":"Female","status":"Deceased","description":"Icicle was a female IceWing who was mentioned in The Hybrid Prince. She was the queen of the IceWings over three thousand years ago.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Igloo","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Igloo","species":"Unknown","gender":"Unknown","description":"Igloo is an adult IceWing of unknown gender who was featured in A Guide to the Dragon World. They are a chef, described by Glacier to be the best in the Ice Kingdom. They are the dragon who made Glacier's coronation feast.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Jacaranda","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jacaranda","species":"Unknown","gender":"Female","status":"Deceased","description":"Jacaranda is a character associated with rainWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Jaguar","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Jaguar","species":"Human","gender":"Female","status":"Deceased","description":"Jaguar was a female human who was mentioned in The Flames of Hope. She was the empress of the Jaguar Empire and lived prior to the events of the Scorching.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Jerboa II","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/03/JerboaIIITopShot.png/revision/latest/scale-to-width-down/500?cb=20210518213521","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jerboa_II","species":"Dragon","gender":"Female","status":"Unknown (presumed deceased)","description":"Jerboa II is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift · Featured in: A Guide to the Dragon World"},{"name":"Jewel (TLC)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Jewel_(TLC)","species":"Unknown","gender":"Unknown","status":"From a possible timeline","description":"Jewel (TLC) is a character associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Juniper","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Juniper","species":"Dragon","gender":"Unknown","description":"Juniper is a dragon of unknown tribe and gender who was featured in A Guide to the Dragon World. They are a character in Bryony's favorite book, Rowan and Juniper.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Kea","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Kea","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Kea is a dragon of unknown tribe and gender who was mentioned in The Hybrid Prince. They currently reside in the Court of Refuge.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Linden","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Linden","species":"Unknown","gender":"Female","status":"Deceased","description":"Linden is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Poison Jungle · Featured in: A Guide to the Dragon World"},{"name":"Loris","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Loris","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hidden Kingdom)","description":"Loris is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Lubber","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lubber","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Lubber is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Magnolia (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Magnolia_(AGttDW)","species":"Dragon","gender":"Female","status":"Deceased","description":"Magnolia was an adult female dragon of unknown tribe who was featured in A Guide to the Dragon World. She ruled as a queen and was mentioned in the Book of Clearsight.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Mantis","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mantis","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Mantis is an adult female HiveWing who was mentioned in The Hive Queen. She is a sister of Ex-Queen Wasp, and the former ruler of Mantis Hive. She is currently imprisoned in the flamesilk factory alongside her other sisters.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Maple","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Maple","species":"Unknown","gender":"Unknown","status":"Deceased","description":"Maple was an elderly LeafWing of unknown gender who was mentioned in The Lost Continent. Clearsight could have moved in with them in a possible future."},{"name":"Mindhealer","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mindhealer","species":"Unknown","gender":"Male","description":"Mindhealer is a character associated with nightWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Moccasin","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Moccasin","species":"Unknown","gender":"Female","status":"Deceased","description":"Moccasin is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Monarch (AGttDW 1)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Monarch_(AGttDW_1)","species":"Unknown","gender":"Female","status":"Deceased","description":"Monarch was an adult female SilkWing who was featured in A Guide to the Dragon World. She ruled as queen of the SilkWings at an unspecified point in history and was noted to be one of the greatest queens in SilkWing history.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Monarch (AGttDW 2)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Monarch_(AGttDW_2)","species":"Unknown","gender":"Female","status":"Deceased","description":"Monarch was an adult female SilkWing who was featured in A Guide to the Dragon World. She ruled as queen of the SilkWings at an unspecified point in history and was noted to be one of the greatest queens in SilkWing history.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Needle","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Needle","species":"Dragon","gender":"Female","status":"Alive (as of Deserter)","description":"Needle is a dragon associated with sandWing in the Wings of Fire universe."},{"name":"Odollam","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Odollam","species":"Dragon","status":"Alive (as of The Poison Jungle)","description":"Odollam is a LeafWing of unknown gender who was mentioned in The Poison Jungle. They were formerly a member of the PoisonWings.","appearance":"Arc 3 mentioned: The Poison Jungle"},{"name":"Olive","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Olive","species":"Unknown","gender":"Female","status":"Deceased","description":"Olive is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Orange","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Orange","species":"Unknown","gender":"Unknown","status":"From a possible timeline","description":"Orange is a character associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Orangutan","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Orangutan","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Orangutan is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Orca","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/32/Orca_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518080305","wikiUrl":"https://wingsoffire.fandom.com/wiki/Orca","species":"Dragon","gender":"Female","status":"Deceased","description":"Orca is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Penguin","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Penguin","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Penguin was an animus IceWing of unknown gender who was mentioned in Darkstalker. They created the gift of diplomacy.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Petal","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Petal","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Petal is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Pinacate","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pinacate","species":"Dragon","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Pinacate is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Possum","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Possum","species":"Unknown","gender":"Male","status":"Deceased","description":"Possum is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Python","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Python","species":"Unknown","gender":"Female","status":"Deceased","description":"Python is a character associated with rainWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Quartz","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Quartz","species":"Human","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Quartz is a male human who was mentioned in The Flames of Hope. He currently resides in the abyss village.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Raspberry","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Raspberry","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Raspberry is a male HiveWing-LeafWing-RainWing hybrid who was mentioned in The Hybrid Prince. He was one of the dragons Umber trained in the King's Teeth.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Root","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Root","species":"Human","gender":"Unknown","status":"Deceased","description":"Root is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Rootworm","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Rootworm","species":"Dragon","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Rootworm is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Rover","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Rover","species":"Human","gender":"Unknown","status":"Deceased","description":"Rover is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Rowan (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Rowan_(AGttDW)","species":"Dragon","gender":"Unknown","description":"Rowan is a dragon of unknown tribe and gender who was featured in A Guide to the Dragon World. They are a character in Bryony's favorite book, Rowan and Juniper.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Sage","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sage","species":"Unknown","gender":"Non-binary","description":"Sage is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Sapphire","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d4/Sapphire_GN.png/revision/latest/scale-to-width-down/500?cb=20251104101411","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sapphire","species":"Dragon","gender":"Female","status":"Deceased","description":"Sapphire is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Sawgrass","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sawgrass","species":"Unknown","gender":"Male","status":"Deceased","description":"Sawgrass is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Scorpion","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scorpion","species":"Dragon","gender":"Female","status":"Deceased","description":"Scorpion is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Shadowhunter","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Shadowhunter","species":"Dragon","gender":"Female","status":"From a possible timeline","description":"Shadowhunter was a female NightWing-IceWing hybrid who was mentioned in Darkstalker. She was one of the six possible dragonets that Clearsight and Darkstalker might have had in a formerly possible future.","appearance":"Arc 2 mentioned: Moon Rising, · Arc 3 mentioned: The Lost Continent"},{"name":"Silverwash","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Silverwash","species":"Unknown","gender":"Female","status":"Deceased","description":"Silverwash was an adult female SilkWing who was featured in A Guide to the Dragon World. She formerly ruled as queen of the SilkWings and was mentioned in the Book of Clearsight. When she was alive, she resided in the SilkWing palace.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Snapper","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snapper","species":"Dragon","gender":"Female","status":"Deceased","description":"Snapper is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Talons of Power"},{"name":"Snowstorm (advisor)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowstorm_(advisor)","species":"Unknown","gender":"Male","status":"Deceased","description":"Snowstorm was a male IceWing who was featured in A Guide to the Dragon World. He was the best friend and closest advisor of Princess Caribou and was the dragon who inspired her to create the gift of subsistence.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Snowstorm (bard's brother)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowstorm_(bard's_brother)","species":"Unknown","gender":"Male","description":"Snowstorm is a male IceWing who was featured in A Guide to the Dragon World. He is the brother of Caribou. He currently resides in the Village-of-the-Plentiful-Seals.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Snowstorm (bard's father)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowstorm_(bard's_father)","species":"Unknown","gender":"Male","description":"Snowstorm is a male IceWing who was featured in A Guide to the Dragon World. He is the father of Caribou, and currently resides in the Village-of-the-Plentiful-Seals.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Snowy","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/72/Snowy_guide_image.jpg/revision/latest/scale-to-width-down/500?cb=20231010012653","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowy","species":"Arctic Fox","gender":"Unknown","description":"Snowy is an arctic fox of unknown gender who was introduced in A Guide to the Dragon World. They are the pet of Princess Mink.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Tailwind","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tailwind","species":"Dragon","gender":"Unknown","description":"Tailwind is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Talkatoo","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Talkatoo","species":"Cockatoo","gender":"Female","status":"Alive (as of The Poison Jungle)","description":"Talkatoo is a female cockatoo who was mentioned in The Poison Jungle and Willow's pet. Willow has owned her since she was only a little older than Bumblebee.","appearance":"Arc 3 mentioned: The Poison Jungle"},{"name":"Tapir","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tapir","species":"Dragon","gender":"Male","status":"Deceased","description":"Tapir is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Tarakihi","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tarakihi","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Tarakihi is a male WildWing who was mentioned in The Hybrid Prince. He was one of the dragons Umber trained in the King's Teeth and currently resides in the Court of Refuge.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Taupe","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Taupe","species":"Unknown","gender":"Female","status":"Deceased","description":"Taupe is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Tawny (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tawny_(AGttDW)","species":"Dragon","gender":"Female","status":"Deceased","description":"Tawny was an adult female dragon of unknown tribe who was featured in A Guide to the Dragon World. She formerly ruled as queen and was mentioned in the Book of Clearsight.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Temora","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Temora","species":"Dragon","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Temora is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"The Prophetess","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/The_Prophetess","species":"Unknown","gender":"Female","description":"The Prophetess is a female NightWing who was featured in A Guide to the Dragon World. She is a fictional character from several NightWing scrolls known for her visions.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Tortoiseshell (AGttDW)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tortoiseshell_(AGttDW)","species":"Unknown","gender":"Female","status":"Deceased}}","description":"Tortoiseshell (AGttDW) is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Tortoiseshell (TLC)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tortoiseshell_(TLC)","species":"Unknown","gender":"Unknown","status":"From a possible timeline","description":"Tortoiseshell (TLC) is a character associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Tsetse","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tsetse","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Tsetse is an adult female HiveWing who was mentioned in The Hive Queen. She is one of the sisters of Ex-Queen Wasp, and the former ruler of Tsetse Hive. She is currently imprisoned in the flamesilk factory alongside her other sisters.","appearance":"Arc 3 mentioned: The Hive Queen,"},{"name":"Tualang","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tualang","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hidden Kingdom)","description":"Tualang is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Tunesmith","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tunesmith","species":"Unknown","gender":"Female","status":"Deceased","description":"Tunesmith is a character associated with nightWing in the Wings of Fire universe."},{"name":"Tussock","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tussock","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Tussock is a male SilkWing who was mentioned in The Lost Continent. According to Blue, his uncle was said to have seen a LeafWing flying around a few years ago.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Unnamed characters","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Unnamed_characters"},{"name":"Vinegaroon","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vinegaroon","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Vinegaroon is an adult female HiveWing who was mentioned in The Hive Queen. She was the former ruler of Vinegaroon Hive. She is a sister of Ex-Queen Wasp, and is currently imprisoned in the flamesilk factory alongside her other sisters."},{"name":"Warthog","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Warthog","species":"Unknown","gender":"Male","status":"Deceased","description":"Warthog is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Waterfall","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Waterfall","species":"Unknown","gender":"Female","status":"Deceased","description":"Waterfall is a character associated with seaWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Wisdom","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Wisdom","species":"Dragon","gender":"Unknown","status":"Alive (as of The Dark Secret)","description":"Wisdom is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Dark Secret"},{"name":"Wisemind","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Wisemind","species":"Unknown","gender":"Unknown","description":"Wisemind is a NightWing of unknown gender who was featured in A Guide to the Dragon World. They are the author of The Sluglike Qualities of the MudWings.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Yellowjacket","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Yellowjacket","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Yellowjacket is an adult female HiveWing who was mentioned in The Hive Queen. She is one of Ex-Queen Wasp's sisters and the former ruler of Yellowjacket Hive. She is currently imprisoned in the flamesilk factory alongside her other sisters."},{"name":"Zelkova","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Zelkova","species":"Dragon","gender":"Female","status":"Deceased","description":"Zelkova was an adult female LeafWing who was featured in A Guide to the Dragon World. She formerly ruled as queen of the LeafWings and was mentioned by Clearsight in the Book of Clearsight. She resided in the southern forest palace.","appearance":"Featured in: A Guide to the Dragon World"}],"minor":[{"name":"Abalone","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fd/Abalone_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251118022844","wikiUrl":"https://wingsoffire.fandom.com/wiki/Abalone","species":"Dragon","gender":"Male","status":"Deceased","description":"Abalone is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Talons of Power"},{"name":"Addax","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/88/AddaxGN.png/revision/latest/scale-to-width-down/500?cb=20211229201009","wikiUrl":"https://wingsoffire.fandom.com/wiki/Addax","species":"Dragon","gender":"Male","status":"Alive (as of The Brightest Night)","description":"Addax is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night"},{"name":"Agave","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/be/AgaveTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260423233819","wikiUrl":"https://wingsoffire.fandom.com/wiki/Agave","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Agave is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Featured in: The Official Stickerpedia"},{"name":"Alba","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/de/Alba_GN.png/revision/latest/scale-to-width-down/500?cb=20230701161027","wikiUrl":"https://wingsoffire.fandom.com/wiki/Alba","species":"Dragon","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Alba is a female IceWing dragonet who was introduced in Moon Rising. She is currently attending Jade Mountain Academy as a member of the Copper Winglet.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Aphid","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Aphid","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Aphid is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Arbutus","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Arbutus","species":"Human","gender":"Male","status":"Deceased","description":"Arbutus is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Argyll","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Argyll","species":"Human","gender":"Male","status":"Deceased","description":"Argyll is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Arid","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f9/Arid_GN.png/revision/latest/scale-to-width-down/500?cb=20230702014938","wikiUrl":"https://wingsoffire.fandom.com/wiki/Arid","species":"Dragon","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Arid is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Moon Rising · Arc 2 mentioned: Darkness of Dragons"},{"name":"Atala","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/8b/AtalaTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210311013339","wikiUrl":"https://wingsoffire.fandom.com/wiki/Atala","species":"Unknown","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Atala is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift"},{"name":"Auklet","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a5/AukletGN.png/revision/latest/scale-to-width-down/500?cb=20251101071811","wikiUrl":"https://wingsoffire.fandom.com/wiki/Auklet","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Auklet is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir · Arc 1 mentioned: The Brightest Night"},{"name":"Avalanche","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3e/Avalanche_GN_6.jpg/revision/latest/scale-to-width-down/500?cb=20241224094424","wikiUrl":"https://wingsoffire.fandom.com/wiki/Avalanche","species":"Dragon","gender":"Female","status":"Alive (as of Escaping Peril)","description":"Avalanche is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 1 mentioned: The Lost Heir · Arc 2 mentioned: Moon Rising"},{"name":"Azalea","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Azalea","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Azalea is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Bandit","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/46/BanditGN7.jpg/revision/latest/scale-to-width-down/500?cb=20240122021718","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bandit","species":"Human","gender":"Male","status":"Alive (as of Winter Turning)","description":"Bandit is a male human who was introduced in Moon Rising. Formerly owned as a pet by Winter, he was set free because he could not accompany Winter on his journey to the Ice Kingdom. His current whereabouts are unknown.","appearance":"Arc 3 mentioned: The Dangerous Gift · Arc 4 mentioned: The Hybrid Prince"},{"name":"Barracuda","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/07/Barracuda_GN.png/revision/latest/scale-to-width-down/500?cb=20230909232136","wikiUrl":"https://wingsoffire.fandom.com/wiki/Barracuda","species":"Dragon","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Barracuda is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons"},{"name":"Bigtail","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d1/Bigtail_GN_3.png/revision/latest/scale-to-width-down/500?cb=20241219013923","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bigtail","species":"Dragon","gender":"Male","status":"Deceased","description":"Bigtail is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Moon Rising · Arc 2 mentioned: Darkness of Dragons · Arc 4 mentioned: The Hybrid Prince"},{"name":"Blob","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/7b/Blob_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104090044","wikiUrl":"https://wingsoffire.fandom.com/wiki/Blob","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Blob is an animus-touched piece of carved driftwood in the shape of an octopus that was introduced in Darkstalker. He was created by Fathom as a pet for Indigo. He currently resides in the Court of Refuge, under the care of Paua.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Bloodshed","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bloodshed","species":"Unknown","gender":"Male","status":"Deceased","description":"Bloodshed is a character associated with nightWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Boar","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Boar","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Boar is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Bombardier","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3b/BombardierTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210720233151","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bombardier","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Bombardier is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Borealis","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Borealis","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Borealis is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Boto","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/28/Boto_GN.png/revision/latest/scale-to-width-down/500?cb=20230909164131","wikiUrl":"https://wingsoffire.fandom.com/wiki/Boto","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Boto is a dragon associated with rainWing in the Wings of Fire universe."},{"name":"Bromeliad","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d3/Bromeliad_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519002512","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bromeliad","species":"Dragon","gender":"Female","status":"Alive (as of Winter Turning)","description":"Bromeliad is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Arc 2 appearance: Winter Turning · Arc 2 mentioned: Talons of Power"},{"name":"Bryony","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d3/BryonyTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20251105032015","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bryony","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Bryony is a character associated with leafWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Bullfrog (WT)","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fd/BullfrogGN4.jpg/revision/latest/scale-to-width-down/500?cb=20240121070408","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bullfrog_(WT)","species":"Dragon","gender":"Male","status":"Alive (as of Winter Turning)","description":"Bullfrog (WT) is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Burnet","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b5/BurnetTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260427222245","wikiUrl":"https://wingsoffire.fandom.com/wiki/Burnet","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Burnet is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Butterfly","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Butterfly","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Butterfly is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Byblis","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Byblis","species":"Unknown","gender":"Female","status":"Alive (as of The Poison Jungle)","description":"Byblis is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle"},{"name":"Cadelle","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/ad/CadelleTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210829061555","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cadelle","species":"Dragon","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Cadelle is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Hive Queen · Arc 3 mentioned: The Lost Continent · Featured in: The Official Stickerpedia"},{"name":"Camel","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/5d/CamelGNInfobox.png/revision/latest/scale-to-width-down/500?cb=20211230173339","wikiUrl":"https://wingsoffire.fandom.com/wiki/Camel","species":"Dragon","gender":"Male","status":"Alive (as of The Brightest Night)","description":"Camel is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night"},{"name":"Carabid","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Carabid","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Carabid is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Cardinal (EP)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cardinal_(EP)","species":"Dragon","gender":"Male","status":"Alive (as of Escaping Peril)","description":"Cardinal (EP) is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Escaping Peril"},{"name":"Cardinal (L2)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Cardinal_(L2)","species":"Human","gender":"Male","status":"Deceased","description":"Cardinal (L2) is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Carnelian","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/7f/Carnelian_GN_6.png/revision/latest/scale-to-width-down/500?cb=20241219012840","wikiUrl":"https://wingsoffire.fandom.com/wiki/Carnelian","species":"Dragon","gender":"Female","status":"Deceased","description":"Carnelian is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons · Arc 4 mentioned: The Hybrid Prince"},{"name":"Cattail","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/CattailGN.png/revision/latest/scale-to-width-down/500?cb=20180109210939","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cattail","species":"Dragon","gender":"Female","status":"Alive (as of The Dragonet Prophecy)","description":"Cattail is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 4 mentioned: The Hybrid Prince}}"},{"name":"Cereus","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/ab/CereusTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210611140037","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cereus","species":"Unknown","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Cereus is a character associated with sandWing in the Wings of Fire universe."},{"name":"Cerulean","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/ae/Cerulean_GN_1.png/revision/latest/scale-to-width-down/500?cb=20260110015141","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cerulean","species":"Dragon","gender":"Male","status":"Alive (as of Talons of Power)","description":"Cerulean is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir · Arc 2 appearance: Talons of Power"},{"name":"Chafer","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/df/ChaferTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210807174147","wikiUrl":"https://wingsoffire.fandom.com/wiki/Chafer","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Chafer is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Changbai","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/5b/Changbai_GN.png/revision/latest/scale-to-width-down/500?cb=20230910001756","wikiUrl":"https://wingsoffire.fandom.com/wiki/Changbai","species":"Dragon","gender":"Unknown","status":"Alive (as of The Dangerous Gift)","description":"Changbai is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Char","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Char","species":"Dragon","gender":"Male","status":"Deceased","description":"Char is a dragon associated with sandWing in the Wings of Fire universe."},{"name":"Cinnabar (EP)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/89/Cinnabar_GN_1.png/revision/latest/scale-to-width-down/500?cb=20241224085748","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cinnabar_(EP)","species":"Unknown","gender":"Male","status":"Alive (as of Escaping Peril)","description":"Cinnabar (EP) is a character associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Escaping Peril"},{"name":"Clearpool","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e2/Clearpool_GN_4.png/revision/latest/scale-to-width-down/500?cb=20251105103011","wikiUrl":"https://wingsoffire.fandom.com/wiki/Clearpool","species":"Dragon","gender":"Female","status":"Deceased","description":"Clearpool is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Clink","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Clink","species":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Clink is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Clubtail","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Clubtail","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Clubtail is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Cobra Lily","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/24/Cobra_LilyTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260328045845","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cobra_Lily","species":"Unknown","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Cobra Lily is a character associated with leafWing in the Wings of Fire universe."},{"name":"Coconut","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/dd/Coconut_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519193635","wikiUrl":"https://wingsoffire.fandom.com/wiki/Coconut","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Coconut is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Arc 2 mentioned: Winter Turning"},{"name":"Corella","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Corella","species":"Dragon","gender":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Corella is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Cowrie","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fc/Cowrie_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104090746","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cowrie","species":"Dragon","gender":"Male","status":"Deceased","description":"Cowrie is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Coyote","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Coyote","species":"Human","gender":"Male","status":"Deceased","description":"Coyote is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Crane (TDP)","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/Icicle_GN_6.png/revision/latest/scale-to-width-down/500?cb=20251101060459","wikiUrl":"https://wingsoffire.fandom.com/wiki/Crane_(TDP)","species":"Dragon","gender":"Female","status":"Deceased","description":"Crane (TDP) is a dragon associated with mudWing in the Wings of Fire universe."},{"name":"Crescent","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/08/CrescentTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260517001855","wikiUrl":"https://wingsoffire.fandom.com/wiki/Crescent","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Crescent is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Crocodile","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a1/Crocodile_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518234652","wikiUrl":"https://wingsoffire.fandom.com/wiki/Crocodile","species":"Dragon","gender":"Female","status":"Deceased","description":"Crocodile is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir · Featured in: The Official Stickerpedia"},{"name":"Crow","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Crow","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Crow is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Current","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/ba/Current_GN_6.png/revision/latest/scale-to-width-down/500?cb=20251104091136","wikiUrl":"https://wingsoffire.fandom.com/wiki/Current","species":"Dragon","gender":"Male","status":"Deceased","description":"Current is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Daisy","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Daisy","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Daisy is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Danaid","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/83/DanaidTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210214045440","wikiUrl":"https://wingsoffire.fandom.com/wiki/Danaid","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Danaid is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Darkling","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Darkling","species":"Unknown","gender":"Female","status":"Deceased","description":"Darkling is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Dazzling","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3a/Dazzling_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200525154753","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dazzling","species":"Dragon","gender":"Female","status":"Alive (as of The Hidden Kingdom)","description":"Dazzling is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom"},{"name":"Deadlyclaws","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Deadlyclaws","species":"Dragon","gender":"Male","status":"Alive (as of Prisoners)","description":"Deadlyclaws is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Dinner","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/84/DinnerGN2.png/revision/latest/scale-to-width-down/500?cb=20211229214421","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dinner","species":"Fox","gender":"Male","status":"Alive (as of The Brightest Night)","description":"Dinner is a male fox who was introduced in The Brightest Night. He was enchanted by Stonemover to bring him food once every few days.","appearance":"Arc 1 appearance: The Brightest Night"},{"name":"Discretion","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e5/DiscretionTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210715231632","wikiUrl":"https://wingsoffire.fandom.com/wiki/Discretion","species":"Unknown","gender":"Unknown","status":"Deceased","description":"Discretion was an adult NightWing of unknown gender who was introduced in Runaway. They were one of the four NightWings sent on a diplomatic mission to the Ice Kingdom in an attempt to negotiate peace with the IceWings."},{"name":"Dragon","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Dragon","species":"Cat","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Dragon, referred to as Cat by Wren, is a female cat owned by Undauntable who was introduced in Dragonslayer. She lives in the Indestructible City."},{"name":"Eagle (L1)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/89/Eagle_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104091500","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eagle_(L1)","species":"Dragon","gender":"Male","status":"Deceased","description":"Eagle (L1) is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Eagle (WT)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/01/Eagle_%28WT%29_GN_2.jpeg/revision/latest/scale-to-width-down/500?cb=20240106221257","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eagle_(WT)","species":"Dragon","gender":"Male","status":"Alive (as of Winter Turning)","description":"Eagle (WT) is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Earwig","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/31/EarwigTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220406014656","wikiUrl":"https://wingsoffire.fandom.com/wiki/Earwig","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Earwig is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Eclipse (DoD)","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eclipse_(DoD)","species":"Unknown","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Eclipse is a NightWing of unknown gender who was introduced in Darkness of Dragons. They were part of the battle against the IceWings at Jade Mountain. Their current whereabouts are unknown.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Eel","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Eel","species":"Dragon","gender":"Male","status":"Deceased","description":"Eel was an adult male SeaWing prince who was introduced in Darkstalker. He was one of the nine dragons who were killed by his father, Albatross during the Royal SeaWing Massacre. He was the uncle of Fathom and Pearl and the brother of Manta."},{"name":"Ermine","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/db/Ermine_GN_2.png/revision/latest/scale-to-width-down/500?cb=20260110020350","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ermine","species":"Dragon","gender":"Unknown","status":"Alive (as of The Dangerous Gift)","description":"Ermine is an IceWing dragonet of unknown gender who was introduced in Moon Rising. They are currently attending Jade Mountain Academy as a member of the Quartz Winglet.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Euphoria","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Euphoria","species":"Unknown","gender":"Female","status":"Deceased","description":"Euphoria is a character associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Exquisite","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/34/Ex_GN_1.png/revision/latest/scale-to-width-down/500?cb=20200519205422","wikiUrl":"https://wingsoffire.fandom.com/wiki/Exquisite","species":"Dragon","gender":"Female","status":"Alive (as of Winter Turning)","description":"Exquisite is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Arc 2 appearance: Winter Turning"},{"name":"Falcon","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/52/FalconTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260325033346","wikiUrl":"https://wingsoffire.fandom.com/wiki/Falcon","species":"Unknown","gender":"Female","status":"Deceased","description":"Falcon is a character associated with skyWing in the Wings of Fire universe."},{"name":"Farsight","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/8c/FarsightGN.png/revision/latest/scale-to-width-down/500?cb=20221221005152","wikiUrl":"https://wingsoffire.fandom.com/wiki/Farsight","species":"Dragon","gender":"Female","status":"Deceased","description":"Farsight is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Dark Secret · Arc 2 appearance: Moon Rising"},{"name":"Fearless","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b9/Fearless_GN_4.png/revision/latest/scale-to-width-down/500?cb=20260109095402","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fearless","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Fearless is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Fin","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/50/Fin_GN_3.png/revision/latest/scale-to-width-down/500?cb=20260109100324","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fin","species":"Dragon","gender":"Male","status":"Alive (as of Talons of Power)","description":"Fin is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir · Arc 2 appearance: Talons of Power"},{"name":"Firefly","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fc/Firefly_GN_2.png/revision/latest/scale-to-width-down/500?cb=20250329024413","wikiUrl":"https://wingsoffire.fandom.com/wiki/Firefly","species":"Dragon","gender":"Female","status":"From a possible timeline","description":"Firefly is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Fjord","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a5/Fjord_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518032042","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fjord","species":"Dragon","gender":"Male","status":"Deceased","description":"Fjord is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Featured in: The Official Stickerpedia"},{"name":"Flounder","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Flounder","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Heir)","description":"Flounder is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Forest","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Forest","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Forest is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Fritillary","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fritillary","species":"Unknown","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Fritillary is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Fruit Bat","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/98/Fruit_Bat_GN_3.png/revision/latest/scale-to-width-down/500?cb=20200515055930","wikiUrl":"https://wingsoffire.fandom.com/wiki/Fruit_Bat","species":"Dragon","gender":"Female","status":"Alive (as of The Hidden Kingdom)","description":"Fruit Bat is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom"},{"name":"Garnet","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/50/Garnet_GN_1.png/revision/latest/scale-to-width-down/500?cb=20260730011449","wikiUrl":"https://wingsoffire.fandom.com/wiki/Garnet","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Garnet is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Gharial","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/9d/GharialTemplateLucky.png/revision/latest/scale-to-width-down/500?cb=20260226175643","wikiUrl":"https://wingsoffire.fandom.com/wiki/Gharial","species":"Unknown","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Gharial is a character associated with mudWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift · Featured in: The Official Stickerpedia"},{"name":"Gibbon","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/84/Gibbon_GN.png/revision/latest/scale-to-width-down/500?cb=20191027165039","wikiUrl":"https://wingsoffire.fandom.com/wiki/Gibbon","species":"Dragon","gender":"Male","status":"Alive (as of The Hidden Kingdom)","description":"Gibbon is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom"},{"name":"Gill","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/04/Gill_GN_12.png/revision/latest/scale-to-width-down/500?cb=20251118023950","wikiUrl":"https://wingsoffire.fandom.com/wiki/Gill","species":"Dragon","gender":"Male","status":"Deceased","description":"Gill is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 2 appearance: Talons of Power · Featured in: The Official Stickerpedia"},{"name":"Glacier","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a9/Guide_Portrait_Glacier.jpg/revision/latest/scale-to-width-down/500?cb=20231010013842","wikiUrl":"https://wingsoffire.fandom.com/wiki/Glacier","species":"Dragon","gender":"Female","status":"Deceased","description":"Glacier is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom"},{"name":"Glider","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/0b/GliderTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220429012835","wikiUrl":"https://wingsoffire.fandom.com/wiki/Glider","species":"Unknown","gender":"Male","status":"Alive (As of The Flames of Hope)","description":"Glider is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Goana","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Goana","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Goana is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Gorge","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Gorge","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Gorge is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Grayling","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/bd/GraylingTemplateKinka.png/revision/latest/scale-to-width-down/500?cb=20210724150108","wikiUrl":"https://wingsoffire.fandom.com/wiki/Grayling","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Grayling is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle,"},{"name":"Greatness","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e0/GreatnessGN8.png/revision/latest/scale-to-width-down/500?cb=20201229202531","wikiUrl":"https://wingsoffire.fandom.com/wiki/Greatness","species":"Dragon","gender":"Female","status":"Alive (as of The Brightest Night)","description":"Greatness is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret · Arc 1 mentioned: The Brightest Night · Arc 2 mentioned: Moon Rising"},{"name":"Handsome","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/6e/Handsome_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200525155850","wikiUrl":"https://wingsoffire.fandom.com/wiki/Handsome","species":"Dragon","gender":"Male","status":"Alive (as of The Hidden Kingdom)","description":"Handsome is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Featured in: A Guide to the Dragon World"},{"name":"Hawk","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4f/Hawk_GN.png/revision/latest/scale-to-width-down/500?cb=20241126064627","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hawk","species":"Dragon","gender":"Male","status":"Alive (as of Escaping Peril)","description":"Hawk is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Escaping Peril · Arc 2 mentioned: Winter Turning"},{"name":"Hawker","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f9/HawkerTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210309055512","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hawker","species":"Dragon","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Hawker is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent · Arc 3 mentioned: The Flames of Hope"},{"name":"Heliconia","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/0b/Heliconiapg42b.png/revision/latest/scale-to-width-down/500?cb=20240121072223","wikiUrl":"https://wingsoffire.fandom.com/wiki/Heliconia","species":"Dragon","gender":"Female","status":"Alive (as of Winter Turning)","description":"Heliconia is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Heliconian","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Heliconian","species":"Unknown","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Heliconian is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Hemlock","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/ac/HemlockTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260426054357","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hemlock","species":"Dragon","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Hemlock is a dragon associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Herring","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/8a/Herring_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518233928","wikiUrl":"https://wingsoffire.fandom.com/wiki/Herring","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Heir)","description":"Herring is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Horizon (TDP)","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/36/Horizon_Running_GN.png/revision/latest/scale-to-width-down/500?cb=20200517233954","wikiUrl":"https://wingsoffire.fandom.com/wiki/Horizon_(TDP)","species":"Dragon","gender":"Male","status":"Deceased","description":"Horizon (TDP) is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Humpback","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a1/Humpback_GN.png/revision/latest/scale-to-width-down/500?cb=20251104091754","wikiUrl":"https://wingsoffire.fandom.com/wiki/Humpback","species":"Dragon","gender":"Male","status":"Deceased","description":"Humpback is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Hvitur","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b6/HviturTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210413023226","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hvitur","species":"Dragon","gender":"Male","status":"Deceased","description":"Hvitur is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Inchworm","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Inchworm","species":"Unknown","gender":"Male","status":"Alive (as of The Poison Jungle)","description":"Inchworm is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle"},{"name":"Invincible Lord","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Invincible_Lord","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Invincible Lord is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Ivory","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ivory","species":"Unknown","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Ivory is a character associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift"},{"name":"Jewel-eyes","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/Jewel-eyes_GN_3.png/revision/latest/scale-to-width-down/500?cb=20251104093249","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jewel-eyes","species":"Dragon","gender":"Male","status":"Deceased","description":"Jewel-eyes is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Kelp","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Kelp","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Heir)","description":"Kelp is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Kindle","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Kindle","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Kindle is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons"},{"name":"Lagoon (L1)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/51/Lagoon_GN_4.png/revision/latest/scale-to-width-down/500?cb=20250926214412","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lagoon_(L1)","species":"Dragon","gender":"Female","status":"Deceased","description":"Lagoon (L1) is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Lagoon (TLH)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a3/Lagoon_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518074552","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lagoon_(TLH)","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Heir)","description":"Lagoon (TLH) is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Lappet","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/88/LappetTemplateRix.png/revision/latest/scale-to-width-down/500?cb=20210422221633","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lappet","species":"Unknown","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Lappet is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift"},{"name":"Lark","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Lark","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Lark is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Laurel","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Laurel","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Laurel is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Lemur","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/RainTransparent.png/revision/latest/scale-to-width-down/500?cb=20200704113253","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lemur","species":"Unknown","gender":"Male","status":"Deceased","description":"Lemur is a character associated with rainWing in the Wings of Fire universe."},{"name":"Liana","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/81/Liana_GN_5.png/revision/latest/scale-to-width-down/500?cb=20240122081128","wikiUrl":"https://wingsoffire.fandom.com/wiki/Liana","species":"Dragon","gender":"Female","status":"Alive (as of The Dark Secret)","description":"Liana is a dragon associated with rainWing in the Wings of Fire universe."},{"name":"Lionfish","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/47/Lionfish_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104092409","wikiUrl":"https://wingsoffire.fandom.com/wiki/Lionfish","species":"Dragon","gender":"Male","status":"Deceased","description":"Lionfish is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Magnificent","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1d/Magnificent_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518232543","wikiUrl":"https://wingsoffire.fandom.com/wiki/Magnificent","species":"Dragon","gender":"Female","status":"Alive (as of The Hidden Kingdom)","description":"Magnificent is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Arc 1 mentioned: The Dark Secret"},{"name":"Magnolia (THP)","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Magnolia_(THP)","species":"Unknown","gender":"Female","status":"Deceased","description":"Magnolia (THP) is a character associated with leafWing in the Wings of Fire universe."},{"name":"Malachite","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1c/MalachiteTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210210001613","wikiUrl":"https://wingsoffire.fandom.com/wiki/Malachite","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Malachite is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope · Featured in: The Official Stickerpedia"},{"name":"Mango","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/48/MangoGNDS.png/revision/latest/scale-to-width-down/500?cb=20210121234532","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mango","species":"Dragon","gender":"Female","status":"Alive (as of The Dark Secret)","description":"Mango is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret"},{"name":"Manta","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a4/Manta_GN_3.png/revision/latest/scale-to-width-down/500?cb=20251104092956","wikiUrl":"https://wingsoffire.fandom.com/wiki/Manta","species":"Dragon","gender":"Female","status":"Deceased","description":"Manta is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Marsh","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/84/Marsh_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519001530","wikiUrl":"https://wingsoffire.fandom.com/wiki/Marsh","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Marsh is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom · Arc 4 appearance: The Hybrid Prince (flashback) · Featured in: The Official Stickerpedia"},{"name":"Mastermind","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4c/MastermindGN2.png/revision/latest/scale-to-width-down/500?cb=20201229200059","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mastermind","species":"Dragon","gender":"Male","status":"Alive (as of Talons of Power)","description":"Mastermind is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Moon Rising · Featured in: A Guide to the Dragon World"},{"name":"Mayfly","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/0d/Mayfly_Gn.jpg/revision/latest/scale-to-width-down/500?cb=20240115170045","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mayfly","species":"Dragon","gender":"Female","status":"Alive (as of Winter Turning)","description":"Mayfly is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Meerkat","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/ba/Meerkat_GN.png/revision/latest/scale-to-width-down/500?cb=20231229204024","wikiUrl":"https://wingsoffire.fandom.com/wiki/Meerkat","species":"Unknown","gender":"Male","status":"Alive (as of Winter Turning)","description":"Meerkat is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning · Featured in: The Official Stickerpedia"},{"name":"Midge","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Midge","species":"Unknown","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Midge is a female HiveWing dragonet who was introduced in Cricket's flashback in The Hive Queen."},{"name":"Mightyclaws","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a1/Mightyclaws_GN_12.png/revision/latest/scale-to-width-down/500?cb=20260109110259","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mightyclaws","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Mightyclaws is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret · Arc 1 mentioned: The Brightest Night"},{"name":"Mindreader","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/38/Mindreader_GN_6.png/revision/latest/scale-to-width-down/500?cb=20260109111034","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mindreader","species":"Dragon","gender":"Female","status":"Alive (as of Talons of Power)","description":"Mindreader is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret"},{"name":"Mole","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Mole","species":"Human","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Mole is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Moray","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f3/Moray_GN_6.png/revision/latest/scale-to-width-down/500?cb=20260221030953","wikiUrl":"https://wingsoffire.fandom.com/wiki/Moray","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Heir)","description":"Moray is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Morpho","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a5/MorphoTemplateGoosefeathers.png/revision/latest/scale-to-width-down/500?cb=20210301231959","wikiUrl":"https://wingsoffire.fandom.com/wiki/Morpho","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Morpho is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Hive Queen · Arc 3 mentioned: The Flames of Hope"},{"name":"Morrowwatcher","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/73/Morrowwatcher_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251225100327","wikiUrl":"https://wingsoffire.fandom.com/wiki/Morrowwatcher","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Morrowwatcher is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Moth","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Moth","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Moth is a young male human who was introduced in Dragonslayer. He is a Wingwatcher and currently resides in Valor."},{"name":"Mushroom","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d9/Mushroom_GN.png/revision/latest/scale-to-width-down/500?cb=20200922121516","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mushroom","species":"Human","gender":"Male","status":"Deceased","description":"Mushroom is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Featured in: Forge Your Dragon World"},{"name":"Narwhal","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/07/Narwhal.jpg/revision/latest/scale-to-width-down/500?cb=20240115165223","wikiUrl":"https://wingsoffire.fandom.com/wiki/Narwhal","species":"Dragon","gender":"Male","status":"Deceased","description":"Narwhal is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Nautilus","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fa/Nautilus_GN_9.jpg/revision/latest/scale-to-width-down/500?cb=20241224090433","wikiUrl":"https://wingsoffire.fandom.com/wiki/Nautilus","species":"Dragon","gender":"Male","status":"Alive (as of Escaping Peril)","description":"Nautilus is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Escaping Peril · Arc 2 mentioned: Winter Turning"},{"name":"Newt","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/6c/Newt_GN.png/revision/latest/scale-to-width-down/500?cb=20230909170632","wikiUrl":"https://wingsoffire.fandom.com/wiki/Newt","species":"Dragon","gender":"Male","status":"Alive (as of Moon Rising)","description":"Newt is a male MudWing dragonet who was introduced in Moon Rising. He serves as the healer of his sibling troop and is currently attending Jade Mountain Academy as a member of the Quartz Winglet.","appearance":"Arc 2 appearance: Moon Rising · Featured in: A Guide to the Dragon World"},{"name":"Oasis","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3e/OasisGN1.png/revision/latest/scale-to-width-down/500?cb=20260520195329","wikiUrl":"https://wingsoffire.fandom.com/wiki/Oasis","species":"Dragon","gender":"Female","status":"Deceased","description":"Oasis is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 3 mentioned: The Flames of Hope"},{"name":"Obsidian","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/7b/Obsidianpg34a.png/revision/latest/scale-to-width-down/500?cb=20240122021203","wikiUrl":"https://wingsoffire.fandom.com/wiki/Obsidian","species":"Dragon","gender":"Male","status":"Alive (as of Talons of Power)","description":"Obsidian is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Ocelot","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Ocelot","species":"Human","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Ocelot is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Ochre","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Ochre"},{"name":"Ocotillo","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/18/Ocotillo_GN_5.png/revision/latest/scale-to-width-down/500?cb=20200515182857","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ocotillo","species":"Dragon","gender":"Male","status":"Alive (as of The Hidden Kingdom)","description":"Ocotillo is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom"},{"name":"Octopus","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a4/Octopus_GN_1.png/revision/latest/scale-to-width-down/500?cb=20260110015225","wikiUrl":"https://wingsoffire.fandom.com/wiki/Octopus","species":"Unknown","gender":"Male","status":"Alive (as of Talons of Power)","description":"Octopus is a character associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir · Arc 2 appearance: Talons of Power"},{"name":"Opal","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Opal"},{"name":"Orchid","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/9f/OrchidGN2.png/revision/latest/scale-to-width-down/500?cb=20201229195029","wikiUrl":"https://wingsoffire.fandom.com/wiki/Orchid","species":"Dragon","gender":"Female","status":"Alive (as of Winter Turning)","description":"Orchid is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret · Arc 1 mentioned: The Hidden Kingdom · Arc 2 mentioned: Winter Turning"},{"name":"Osprey","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c1/Osprey_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519000127","wikiUrl":"https://wingsoffire.fandom.com/wiki/Osprey","species":"Dragon","gender":"Male","status":"Deceased","description":"Osprey is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 2 mentioned: Escaping Peril · Featured in: A Guide to the Dragon World"},{"name":"Ostrich (W3)","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ostrich_(W3)","species":"Dragon","gender":"Female","status":"Deceased","description":"Ostrich (W3) is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Pademelon","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Pademelon","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Pademelon is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Parch","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Parch","species":"Unknown","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Parch is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Peacemaker","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/41/PeacemakerTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20210911185109","wikiUrl":"https://wingsoffire.fandom.com/wiki/Peacemaker","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Peacemaker is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Pearl (TLH)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f9/PearlTLHTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20210406181845","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pearl_(TLH)","species":"Dragon","gender":"Unknown","status":"Alive (as of The Lost Heir)","description":"Pearl (TLH) is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Peregrine","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e0/Peregrine_GN.png/revision/latest/scale-to-width-down/500?cb=20230909223456","wikiUrl":"https://wingsoffire.fandom.com/wiki/Peregrine","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Peregrine is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons"},{"name":"Permafrost","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Permafrost","species":"Unknown","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Permafrost is a character associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift"},{"name":"Pheasant","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/9e/Pheasant_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518212418","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pheasant","species":"Dragon","gender":"Female","status":"Alive (as of Moon Rising)","description":"Pheasant is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom · Arc 2 mentioned: Moon Rising · Arc 4 appearance: The Hybrid Prince (flashback) · Featured in: The Official Stickerpedia"},{"name":"Pierid","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/79/PieridTemplateRix.png/revision/latest/scale-to-width-down/500?cb=20210428020726","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pierid","species":"Unknown","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Pierid is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Pike","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/56/Pike_gn_MH.png/revision/latest/scale-to-width-down/500?cb=20260605035522","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pike","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Pike is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Escaping Peril"},{"name":"Pine","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Pine","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Pine is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Piranha","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c1/PiranhaTemplateRix.png/revision/latest/scale-to-width-down/500?cb=20210630035750","wikiUrl":"https://wingsoffire.fandom.com/wiki/Piranha","species":"Dragon","gender":"Female","status":"Alive (as of The Lost Heir)","description":"Piranha is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Pokeweed","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/12/PokeweedTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220406015412","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pokeweed","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Pokeweed is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Polar Bear","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/09/IceTransparent.png/revision/latest/scale-to-width-down/500?cb=20240823073539","wikiUrl":"https://wingsoffire.fandom.com/wiki/Polar_Bear","species":"Unknown","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Polar Bear is a character associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift · Featured in: A Guide to the Dragon World"},{"name":"Precipice","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Precipice","species":"Unknown","gender":"Female","status":"Deceased","description":"Precipice is a character associated with skyWing in the Wings of Fire universe."},{"name":"Preyhunter","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e7/Preyhunter_TBN_1.jpeg/revision/latest/scale-to-width-down/500?cb=20211229201618","wikiUrl":"https://wingsoffire.fandom.com/wiki/Preyhunter","species":"Dragon","gender":"Male","status":"Deceased","description":"Preyhunter is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 appearance: Moon Rising · Arc 2 mentioned: Talons of Power"},{"name":"Prickle","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a2/PrickleTemplateBas.png/revision/latest/scale-to-width-down/500?cb=20210410220733","wikiUrl":"https://wingsoffire.fandom.com/wiki/Prickle","species":"Unknown","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Prickle is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Featured in: The Official Stickerpedia"},{"name":"Pronghorn","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/49/Pronghorn_GN.png/revision/latest/scale-to-width-down/500?cb=20230701233954","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pronghorn","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Pronghorn is a dragon associated with sandWing in the Wings of Fire universe."},{"name":"Prudence","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/dc/PrudenceTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210421053740","wikiUrl":"https://wingsoffire.fandom.com/wiki/Prudence","species":"Dragon","gender":"Female","status":"Deceased","description":"Prudence is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Quickdeath","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/11/Quickdeath_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104093559","wikiUrl":"https://wingsoffire.fandom.com/wiki/Quickdeath","species":"Dragon","gender":"Male","status":"Deceased","description":"Quickdeath is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Quicksand","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1b/QuicksandTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260701164527","wikiUrl":"https://wingsoffire.fandom.com/wiki/Quicksand","species":"Dragon","gender":"Male","status":"Deceased","description":"Quicksand is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons · Featured in: The Official Stickerpedia"},{"name":"Quoll","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Quoll","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Quoll is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Rattlesnake","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b8/Rattlesnake_GN.png/revision/latest/scale-to-width-down/500?cb=20250119062243","wikiUrl":"https://wingsoffire.fandom.com/wiki/Rattlesnake","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Rattlesnake is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Ravine","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ravine","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Ravine is a character associated with skyWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Reef","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c5/Reef_GN.png/revision/latest/scale-to-width-down/500?cb=20251105122437","wikiUrl":"https://wingsoffire.fandom.com/wiki/Reef","species":"Unknown","gender":"Male","status":"Deceased","description":"Reef was an adult male SeaWing prince who was introduced in Darkstalker. He resided in the Kingdom of the Sea until he was killed by Albatross during the Royal SeaWing Massacre. He was the husband of Manta and the father of Fathom and Pearl."},{"name":"Retribution","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Retribution","species":"Unknown","gender":"Female","status":"Deceased","description":"Retribution is a character associated with nightWing in the Wings of Fire universe."},{"name":"Ripple","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b4/Ripple_GN.png/revision/latest/scale-to-width-down/500?cb=20251104093819","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ripple","species":"Dragon","gender":"Male","status":"Deceased","description":"Ripple is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Rose","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a8/Human_spoon_guide.jpg/revision/latest/scale-to-width-down/500?cb=20231010014851","wikiUrl":"https://wingsoffire.fandom.com/wiki/Rose"},{"name":"Royal","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/39/RoyalTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260607004341","wikiUrl":"https://wingsoffire.fandom.com/wiki/Royal","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Royal is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Russet","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Russet","species":"Unknown","gender":"Male","status":"Alive (as of Hero)","description":"Russet is a character associated with skyWing in the Wings of Fire universe."},{"name":"Saguaro","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Saguaro","species":"Dragon","gender":"Female","status":"Alive (as of Prisoners)","description":"Saguaro is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Talons of Power"},{"name":"Sandfly","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/45/SandflyTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20201227231847","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sandfly","species":"Unknown","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Sandfly is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Sandstorm","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/80/Sandstorm_Infobox.jpeg/revision/latest/scale-to-width-down/500?cb=20200229175101","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sandstorm","species":"Dragon","gender":"Male","status":"Deceased","description":"Sandstorm is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Scald","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scald","species":"Dragon","gender":"Male","status":"Deceased","description":"Scald is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night · Featured in: A Guide to the Dragon World"},{"name":"Scallop","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/1f/SeaTransparent.png/revision/latest/scale-to-width-down/500?cb=20231206022616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scallop","species":"Dragon","gender":"Male","status":"Deceased","description":"Scallop was a male SeaWing prince who was introduced in Darkstalker. He was one of the cousins of Fathom and Pearl, and the brother of Current. He was killed by Albatross during the Royal SeaWing Massacre."},{"name":"Scorpionfish","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Scorpionfish","species":"Dragon","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Scorpionfish is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Secretkeeper","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/2f/Secretkeeper_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251101064749","wikiUrl":"https://wingsoffire.fandom.com/wiki/Secretkeeper","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Secretkeeper is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night · Arc 3 mentioned: The Flames of Hope · Featured in: The Official Stickerpedia"},{"name":"Sepia","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d7/Sepia_GN.png/revision/latest/scale-to-width-down/500?cb=20230909170144","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sepia","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Sepia is a dragon associated with mudWing in the Wings of Fire universe."},{"name":"Shaggy","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/99/Magnificent_GN_2.png/revision/latest/scale-to-width-down/500?cb=20200515231616","wikiUrl":"https://wingsoffire.fandom.com/wiki/Shaggy","species":"Sloth","gender":"Unknown","status":"Alive (as of The Hidden Kingdom)","description":"Shaggy is a pet sloth of unknown gender who was introduced in The Hidden Kingdom. They are owned by Magnificent.","appearance":"Arc 1 appearance: The Hidden Kingdom"},{"name":"Shark","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a3/Shark_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518075546","wikiUrl":"https://wingsoffire.fandom.com/wiki/Shark","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Heir)","description":"Shark is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir · Featured in: The Official Stickerpedia"},{"name":"Siamang","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/7e/Siamang_GN.png/revision/latest/scale-to-width-down/500?cb=20230701232956","wikiUrl":"https://wingsoffire.fandom.com/wiki/Siamang","species":"Dragon","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Siamang is a RainWing dragonet of unknown gender who was introduced in Moon Rising. They are currently attending Jade Mountain Academy as a member of the Quartz Winglet.","appearance":"Arc 2 appearance: Moon Rising · Arc 2 mentioned: Darkness of Dragons"},{"name":"Silver","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b1/Silver_AGttDW.jpg/revision/latest/scale-to-width-down/500?cb=20231015040000","wikiUrl":"https://wingsoffire.fandom.com/wiki/Silver","species":"Sloth","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Silver is a sloth associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning · Arc 3 appearance: The Dangerous Gift"},{"name":"Silverspot","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Silverspot","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Silverspot is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent,"},{"name":"Singe","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/72/SingeTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260421210824","wikiUrl":"https://wingsoffire.fandom.com/wiki/Singe","species":"Dragon","gender":"Male","status":"Deceased","description":"Singe is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Sirocco","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/eb/Sirocco_GN.png/revision/latest/scale-to-width-down/500?cb=20250119062249","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sirocco","species":"Unknown","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Sirocco is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Slasher","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Slasher","species":"Cat","gender":"Unknown","status":"Alive (as of Darkness of Dragons)","description":"Slasher is a cat of unknown gender that briefly appears in Qibli's flashback in Darkness of Dragons. They are the pet of a female SandWing living in the Scorpion Den.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Slaughter","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Slaughter","species":"Dragon","gender":"Male","status":"Deceased","description":"Slaughter is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Smokeseer","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Smokeseer","species":"Unknown","gender":"Unknown","status":"Unknown (as of Darkness of Dragons)","description":"Smokeseer is a NightWing of unknown gender who was introduced in Darkness of Dragons. They attacked the IceWings at Jade Mountain alongside Eclipse and their current status is unknown.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Snail (MR)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/05/Snail_%28JMA%29_GN.png/revision/latest/scale-to-width-down/500?cb=20230701155605","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snail_(MR)","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Snail is a female SeaWing dragonet who was introduced in Moon Rising. She is currently attending Jade Mountain Academy as a member of the Copper Winglet.","appearance":"Arc 2 mentioned: Escaping Peril"},{"name":"Snail (TLH)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3e/Snail_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519043455","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snail_(TLH)","species":"Unknown","gender":"Female","status":"Alive (as of The Lost Heir)","description":"Snail (TLH) is a character associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Sorrel","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sorrel","species":"Unknown","gender":"Male","status":"Deceased","description":"Sorrel is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Splash","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c4/Splash_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104094025","wikiUrl":"https://wingsoffire.fandom.com/wiki/Splash","species":"Dragon","gender":"Female","status":"Deceased","description":"Splash was a female SeaWing princess who was introduced in Darkstalker. She was one of the nine dragons who were murdered by Albatross during the Royal SeaWing Massacre. She was the daughter of Queen Lagoon and King Humpback.","appearance":"Arc 2 mentioned: Moon Rising,"},{"name":"Splendor","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SplendorGN2.png/revision/latest/scale-to-width-down/500?cb=20201229215419","wikiUrl":"https://wingsoffire.fandom.com/wiki/Splendor","species":"Dragon","gender":"Female","status":"Alive (as of The Dark Secret)","description":"Splendor is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret · Arc 1 mentioned: The Hidden Kingdom"},{"name":"Squirrel","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Squirrel","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Squirrel is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Starclaws","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/de/StarclawsTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210421173845","wikiUrl":"https://wingsoffire.fandom.com/wiki/Starclaws","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Starclaws was an adult NightWing of unknown gender who was introduced in Runaway. They went with Prudence, Foeslayer, and Discretion on a diplomatic mission to the Ice Kingdom in an attempt to negotiate an alliance with the IceWings."},{"name":"Stonemover","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/5d/Stonemover_GN_12.png/revision/latest/scale-to-width-down/500?cb=20260109120336","wikiUrl":"https://wingsoffire.fandom.com/wiki/Stonemover","species":"Dragon","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Stonemover is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 1 mentioned: The Dragonet Prophecy, · Arc 2 mentioned: Escaping Peril · Arc 3 mentioned: The Poison Jungle"},{"name":"Strongwings","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/19/Strongwings_TBN_1.jpeg/revision/latest/scale-to-width-down/500?cb=20211229133229","wikiUrl":"https://wingsoffire.fandom.com/wiki/Strongwings","species":"Dragon","gender":"Male","status":"Alive (as of Talons of Power)","description":"Strongwings is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Talons of Power · Featured in: A Guide to the Dragon World"},{"name":"Summit","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Summit","species":"Unknown","gender":"Female","status":"Deceased","description":"Summit is a character associated with skyWing in the Wings of Fire universe."},{"name":"Sunset (L1)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a0/Sunset_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104094355","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sunset_(L1)","species":"Dragon","gender":"Female","status":"Deceased","description":"Sunset (L1) is a dragon associated with skyWing in the Wings of Fire universe."},{"name":"Sunset (W5)","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/SkyTransparent.png/revision/latest/scale-to-width-down/500?cb=20210921210053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sunset_(W5)","species":"Unknown","gender":"Female","status":"Alive (as of Hero)","description":"Sunset (W5) is a character associated with skyWing in the Wings of Fire universe."},{"name":"Sunstreak","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Sunstreak","species":"Unknown","gender":"Male","status":"Deceased","description":"Sunstreak is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Swamp","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c9/MudTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522180607","wikiUrl":"https://wingsoffire.fandom.com/wiki/Swamp","species":"Unknown","gender":"Male","status":"Deceased","description":"Swamp is a character associated with mudWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Swiftwings","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4d/NightTransparent.png/revision/latest/scale-to-width-down/500?cb=20190703193003","wikiUrl":"https://wingsoffire.fandom.com/wiki/Swiftwings","species":"Dragon","gender":"Female","status":"Deceased","description":"Swiftwings is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Lost Continent"},{"name":"Tadpole","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tadpole","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Tadpole is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Tawny (DoD)","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tawny_(DoD)","species":"Unknown","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Tawny (DoD) is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Tempest","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/67/TempestTemplateBlackbleach.png/revision/latest/scale-to-width-down/500?cb=20251117191409","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tempest","species":"Dragon","gender":"Female","status":"Deceased","description":"Tempest is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Dark Secret"},{"name":"The Librarian","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/97/The_LibrarianTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210327024722","wikiUrl":"https://wingsoffire.fandom.com/wiki/The_Librarian","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"The Librarian is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Thoughtful","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/eb/Thoughtful_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104094744","wikiUrl":"https://wingsoffire.fandom.com/wiki/Thoughtful","species":"Dragon","gender":"Male","status":"Deceased","description":"Thoughtful is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Talons of Power"},{"name":"Thrush","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/46/Thrush_GN.png/revision/latest/scale-to-width-down/500?cb=20230909173855","wikiUrl":"https://wingsoffire.fandom.com/wiki/Thrush","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Thrush is a dragon associated with skyWing in the Wings of Fire universe."},{"name":"Thyme","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Thyme","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Thyme is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Toe-Fur","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/88/Toe-fur.jpg/revision/latest/scale-to-width-down/500?cb=20240115171812","wikiUrl":"https://wingsoffire.fandom.com/wiki/Toe-Fur","species":"Sloth","gender":"Unknown","status":"Alive (as of Winter Turning)","description":"Toe-Fur is a sloth of unknown gender belonging to Exquisite.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Torch","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/SandTransparent.png/revision/latest/scale-to-width-down/500?cb=20170522181909","wikiUrl":"https://wingsoffire.fandom.com/wiki/Torch","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Torch is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons"},{"name":"Tortoise","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/8/88/Tortoise_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519045346","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tortoise","species":"Dragon","gender":"Female","status":"Deceased","description":"Tortoise is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Treehopper","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d5/TreehopperTemplateGoosefeathers.png/revision/latest/scale-to-width-down/500?cb=20210222012414","wikiUrl":"https://wingsoffire.fandom.com/wiki/Treehopper","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Treehopper is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Hive Queen · Arc 3 mentioned: The Dangerous Gift,"},{"name":"Trout","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Trout","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Trout is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Truthfinder","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/af/Truthfinder_GN_3.png/revision/latest/scale-to-width-down/500?cb=20251104095101","wikiUrl":"https://wingsoffire.fandom.com/wiki/Truthfinder","species":"Dragon","gender":"Female","status":"Deceased","description":"Truthfinder is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Tundra","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/2b/Tundra_%28gn7_excerpt%2C_wings_of_fire%29.jpg/revision/latest/scale-to-width-down/500?cb=20231205013551","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tundra","species":"Dragon","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Tundra is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning · Arc 3 appearance: The Dangerous Gift"},{"name":"Typhoon","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/TyphoonTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210815003835","wikiUrl":"https://wingsoffire.fandom.com/wiki/Typhoon","species":"Dragon","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Typhoon is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Arc 3 mentioned: The Dangerous Gift · Featured in: The Official Stickerpedia"},{"name":"Undauntable","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Undauntable","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Undauntable is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Unnamed characters","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Unnamed_characters"},{"name":"Urchin","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/33/Urchin_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200519044044","wikiUrl":"https://wingsoffire.fandom.com/wiki/Urchin","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Heir)","description":"Urchin is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir"},{"name":"Vengeance","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/af/Vengeance_GN_1.png/revision/latest/scale-to-width-down/500?cb=20200518013907","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vengeance","species":"Dragon","gender":"Male","status":"Deceased","description":"Vengeance is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night"},{"name":"Vermilion","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/71/Vermilion_GN_6.png/revision/latest/scale-to-width-down/500?cb=20241224113515","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vermilion","species":"Dragon","gender":"Male","status":"Alive (as of Escaping Peril)","description":"Vermilion is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 1 mentioned: The Brightest Night · Arc 2 appearance: Escaping Peril · Arc 2 mentioned: Winter Turning"},{"name":"Vision","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/97/Vision_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104100327","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vision","species":"Dragon","gender":"Unknown","status":"Deceased","description":"Vision is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Vole","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Vole","species":"Human","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Vole is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift,"},{"name":"Weevil","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/55/HiveTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080016","wikiUrl":"https://wingsoffire.fandom.com/wiki/Weevil","species":"Unknown","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Weevil is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Wharf","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/6c/Wharf_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104100629","wikiUrl":"https://wingsoffire.fandom.com/wiki/Wharf","species":"Dragon","gender":"Male","status":"Deceased","description":"Wharf is a dragon associated with seaWing in the Wings of Fire universe."},{"name":"Whirlpool","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c3/Whirlpool_GN.png/revision/latest/scale-to-width-down/500?cb=20200518013054","wikiUrl":"https://wingsoffire.fandom.com/wiki/Whirlpool","species":"Dragon","gender":"Male","status":"Deceased","description":"Whirlpool is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir · Arc 2 mentioned: Winter Turning"},{"name":"Whitespeck (TFoH)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/24/WhitespeckTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20221009153628","wikiUrl":"https://wingsoffire.fandom.com/wiki/Whitespeck_(TFoH)","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Whitespeck (TFoH) is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Whitespeck (TLC)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Whitespeck_(TLC)","species":"Unknown","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Whitespeck (TLC) is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent"},{"name":"Wolfsbane","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Wolfsbane","species":"Unknown","gender":"Male","status":"Alive (as of The Poison Jungle)","description":"Wolfsbane is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle"},{"name":"Xenica","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f6/SilkTransparent.png/revision/latest/scale-to-width-down/500?cb=20180601122354","wikiUrl":"https://wingsoffire.fandom.com/wiki/Xenica","species":"Unknown","gender":"Female","status":"Alive (as of The Lost Continent)","description":"Xenica is an adult female SilkWing who was introduced in The Lost Continent. She was one of the ten flamesilk dragons who were imprisoned by Ex-Queen Wasp and was last seen enslaved in the flamesilk factory.","appearance":"Arc 3 appearance: The Lost Continent"}],"supporting":[{"name":"Admiral","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/0e/AdmiralTemplateBee.png/revision/latest/scale-to-width-down/500?cb=20260421172505","wikiUrl":"https://wingsoffire.fandom.com/wiki/Admiral","species":"Dragon","gender":"Male","status":"Alive (as of The Lost Continent)","description":"Admiral is a dragon associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Lost Continent · Arc 3 mentioned: The Hive Queen, · Featured in: The Official Stickerpedia"},{"name":"Albatross","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/9a/Albatross_GN_JP_8.png/revision/latest/scale-to-width-down/500?cb=20250926212030","wikiUrl":"https://wingsoffire.fandom.com/wiki/Albatross","species":"Dragon","gender":"Male","status":"Deceased","description":"Albatross is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir · Arc 3 mentioned: The Dangerous Gift"},{"name":"Allknowing","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a3/Allknowing_GN_6.png/revision/latest/scale-to-width-down/500?cb=20251104084904","wikiUrl":"https://wingsoffire.fandom.com/wiki/Allknowing","species":"Dragon","gender":"Female","status":"Deceased","description":"Allknowing is a dragon associated with nightWing in the Wings of Fire universe."},{"name":"Aurora","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/43/AuroraTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260612024723","wikiUrl":"https://wingsoffire.fandom.com/wiki/Aurora","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Aurora is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Axolotl","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Axolotl","species":"Human","gender":"Non-binary","status":"Alive (as of The Flames of Hope)","description":"Axolotl is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Battlewinner","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/57/Guide_Portrait_Battlewinner.jpg/revision/latest/scale-to-width-down/500?cb=20231010013811","wikiUrl":"https://wingsoffire.fandom.com/wiki/Battlewinner","species":"Dragon","gender":"Female","status":"Deceased","description":"Battlewinner is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dark Secret"},{"name":"Belladonna","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/32/BelladonnaTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260328045530","wikiUrl":"https://wingsoffire.fandom.com/wiki/Belladonna","species":"Dragon","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Belladonna is a dragon associated with leafWing in the Wings of Fire universe."},{"name":"Beryl","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3c/BerylTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20260314095922","wikiUrl":"https://wingsoffire.fandom.com/wiki/Beryl","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Beryl is a character associated with skyWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince · Featured in: A Guide to the Dragon World"},{"name":"Blaze","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/33/Blaze_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518032245","wikiUrl":"https://wingsoffire.fandom.com/wiki/Blaze","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Blaze is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Arc 3 mentioned: The Dangerous Gift"},{"name":"Blister","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f7/Blister_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518033025","wikiUrl":"https://wingsoffire.fandom.com/wiki/Blister","species":"Dragon","gender":"Female","status":"Deceased","description":"Blister is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom · Arc 3 mentioned: The Dangerous Gift"},{"name":"Brook","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Brook","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Brook is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Bullfrog (TDG)","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/68/BullfrogTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220409043957","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bullfrog_(TDG)","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Bullfrog (TDG) is a character associated with mudWing in the Wings of Fire universe."},{"name":"Bumblebee","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d4/BumblebeeTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220305033456","wikiUrl":"https://wingsoffire.fandom.com/wiki/Bumblebee","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Bumblebee is a character associated with hiveWing in the Wings of Fire universe."},{"name":"Burn","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/64/BurnGNMenacing.png/revision/latest/scale-to-width-down/500?cb=20260428000220","wikiUrl":"https://wingsoffire.fandom.com/wiki/Burn","species":"Unknown","gender":"Female","status":"Deceased","description":"Burn is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Escaping Peril · Arc 3 mentioned: The Dangerous Gift · Arc 4 mentioned: The Hybrid Prince"},{"name":"Chameleon","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e5/Chameleon_GN_4.png/revision/latest/scale-to-width-down/500?cb=20241224095037","wikiUrl":"https://wingsoffire.fandom.com/wiki/Chameleon","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Chameleon is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Lost Heir · Arc 2 mentioned: Talons of Power"},{"name":"Cinnabar (THQ)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/40/CinnabarTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210218195632","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cinnabar_(THQ)","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Cinnabar (THQ) is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Cobra","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/75/Cobra_and_Qibli_GN_1.png/revision/latest/scale-to-width-down/500?cb=20240121073751","wikiUrl":"https://wingsoffire.fandom.com/wiki/Cobra","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Cobra is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night · Arc 2 appearance: Darkness of Dragons · Arc 2 mentioned: Talons of Power · Featured in: The Official Stickerpedia"},{"name":"Coral","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f5/Guide_Portrait_Coral.jpg/revision/latest/scale-to-width-down/500?cb=20230607211051","wikiUrl":"https://wingsoffire.fandom.com/wiki/Coral","species":"Dragon","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Coral is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Dangerous Gift"},{"name":"Cottonmouth","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Cottonmouth","species":"Human","gender":"Male","status":"Deceased","description":"Cottonmouth is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Cranberry","tribe":"unknown","species":"Human","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Cranberry","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Cranberry is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 1 mentioned: The Dark Secret"},{"name":"Diamond","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/38/Diamond_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104101247","wikiUrl":"https://wingsoffire.fandom.com/wiki/Diamond","species":"Dragon","gender":"Female","status":"Deceased","description":"Diamond is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Dugong","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3b/DugongProfile.png/revision/latest/scale-to-width-down/500?cb=20260501210419","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dugong","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Dugong is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Dune","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b7/Dune_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518230906","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dune","species":"Dragon","gender":"Male","status":"Deceased","description":"Dune is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy"},{"name":"Dusky","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3f/DuskyTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20220411005059","wikiUrl":"https://wingsoffire.fandom.com/wiki/Dusky","species":"Unknown","gender":"Male","status":"Alive (as of The Flames of Hope)","description":"Dusky is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope · Featured in: The Official Glow-in-the-Dark Coloring Book"},{"name":"Flame","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/dd/Flame_GN_38.png/revision/latest/scale-to-width-down/500?cb=20260109103502","wikiUrl":"https://wingsoffire.fandom.com/wiki/Flame","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Flame is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir"},{"name":"Foxglove","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Foxglove","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Foxglove is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Freedom","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Freedom","species":"Dragon","gender":"Female","status":"Deceased","description":"Freedom is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Flames of Hope"},{"name":"Glowworm (THP)","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/92/GlowwormTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260429013543","wikiUrl":"https://wingsoffire.fandom.com/wiki/Glowworm_(THP)","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Glowworm (THP) is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Grandeur","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/35/Guide_Portrait_Grandeur.jpg/revision/latest/scale-to-width-down/500?cb=20230607211053","wikiUrl":"https://wingsoffire.fandom.com/wiki/Grandeur","species":"Dragon","gender":"Female","status":"Alive (as of The Brightest Night)","description":"Grandeur is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Grove","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Grove","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Grove is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Hailstorm","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b3/HailstormGn8.jpg/revision/latest/scale-to-width-down/500?cb=20240116141907","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hailstorm","species":"Unknown","gender":"Male","status":"Alive (as of The Dangerous Gift)","description":"Hailstorm is a character associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Harmony (THP)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Harmony_(THP)","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Harmony is a female BeetleWing-LeafWing-RainWing-SeaWing hybrid dragonet who was introduced in The Hybrid Prince. She hatched from one of the two eggs that were enchanted by Precipice that could allow the prisoners to leave the Dungeon Isle, and she was named after the ancient village of the same name. She is currently under the care of Umber, Mulberry, Quokka, Wollemi, and Nineteen.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Hawthorn","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hawthorn","species":"Unknown","gender":"Male","status":"Deceased","description":"Hawthorn is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle · Arc 3 mentioned: The Dangerous Gift"},{"name":"Hazel","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/aa/Guide_Portrait_Hazel.jpg/revision/latest/scale-to-width-down/500?cb=20231010014425","wikiUrl":"https://wingsoffire.fandom.com/wiki/Hazel","species":"Unknown","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Hazel is a character associated with leafWing in the Wings of Fire universe."},{"name":"Heath","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/9f/Heath_GN.jpeg/revision/latest/scale-to-width-down/500?cb=20211221203503","wikiUrl":"https://wingsoffire.fandom.com/wiki/Heath","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Heath is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 appearance: Darkness of Dragons"},{"name":"Horizon (THP)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Horizon_(THP)","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Horizon (THP) is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Icicle (MR)","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/bf/Icicle_GN_10.png/revision/latest/scale-to-width-down/500?cb=20221230031450","wikiUrl":"https://wingsoffire.fandom.com/wiki/Icicle_(MR)","species":"Dragon","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Icicle (MR) is a dragon associated with iceWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift · Arc 4 mentioned: The Hybrid Prince"},{"name":"Io","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/e8/IoTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20260505144002","wikiUrl":"https://wingsoffire.fandom.com/wiki/Io","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Io is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Hive Queen"},{"name":"Jerboa","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a6/JerboaTopShot.png/revision/latest/scale-to-width-down/500?cb=20220330001643","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jerboa","species":"Dragon","gender":"Female","status":"Deceased","description":"Jerboa is a dragon associated with sandWing in the Wings of Fire universe."},{"name":"Jewel (THQ)","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/bd/JewelTemplateLoopy.png/revision/latest/scale-to-width-down/500?cb=20260520023159","wikiUrl":"https://wingsoffire.fandom.com/wiki/Jewel_(THQ)","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Jewel (THQ) is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Hive Queen, The Flames of Hope"},{"name":"Katydid","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/fa/KatydidTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20201226224654","wikiUrl":"https://wingsoffire.fandom.com/wiki/Katydid","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Katydid is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Poison Jungle · Featured in: The Official Stickerpedia"},{"name":"Kestrel","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/0b/KestrelGN-TDP.png/revision/latest/scale-to-width-down/500?cb=20230305200612","wikiUrl":"https://wingsoffire.fandom.com/wiki/Kestrel","species":"Dragon","gender":"Female","status":"Deceased","description":"Kestrel is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Listener","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b4/Listener_GN_1.png/revision/latest/scale-to-width-down/500?cb=20251104092659","wikiUrl":"https://wingsoffire.fandom.com/wiki/Listener","species":"Dragon","gender":"Female","status":"Deceased","description":"Listener is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Darkness of Dragons · Featured in: The Official Stickerpedia"},{"name":"Mandrake","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/69/LeafTransparent.png/revision/latest/scale-to-width-down/500?cb=20180623080022","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mandrake","species":"Unknown","gender":"Male","status":"Alive (as of The Poison Jungle)","description":"Mandrake is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle · Featured in: A Guide to the Dragon World"},{"name":"Mangrove","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a9/Mangrove_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200525154059","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mangrove","species":"Dragon","gender":"Male","status":"Alive (as of The Brightest Night)","description":"Mangrove is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Featured in: Forge Your Dragon World"},{"name":"Mink","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/2f/MinkTemplateLeslie.png/revision/latest/scale-to-width-down/500?cb=20210312000940","wikiUrl":"https://wingsoffire.fandom.com/wiki/Mink","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Mink is a character associated with iceWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Moon Rising · Arc 3 appearance: The Dangerous Gift · Arc 4 appearance: The Hybrid Prince"},{"name":"Monarch (TLC)","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b6/Guide_Portrait_Monarch.jpg/revision/latest/scale-to-width-down/500?cb=20231010013939","wikiUrl":"https://wingsoffire.fandom.com/wiki/Monarch_(TLC)","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Monarch (TLC) is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Moorhen","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/3d/Guide_Portrait_Moorhen.jpg/revision/latest/scale-to-width-down/500?cb=20231017155319","wikiUrl":"https://wingsoffire.fandom.com/wiki/Moorhen","species":"Dragon","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Moorhen is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 3 appearance: The Dangerous Gift · Arc 4 mentioned: The Hybrid Prince"},{"name":"Morrowseer","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/37/MorrowseerGN2.png/revision/latest/scale-to-width-down/500?cb=20201229194220","wikiUrl":"https://wingsoffire.fandom.com/wiki/Morrowseer","species":"Dragon","gender":"Male","status":"Deceased","description":"Morrowseer is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Brightest Night · Arc 2 appearance: Winter Turning (corpse)"},{"name":"Nettle","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/05/NettleTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260328050106","wikiUrl":"https://wingsoffire.fandom.com/wiki/Nettle","species":"Unknown","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Nettle is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle · Arc 3 mentioned: The Dangerous Gift · Featured in: The Official Stickerpedia"},{"name":"Nineteen","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Nineteen","species":"Unknown","status":"Alive (as of The Hybrid Prince)","description":"Nineteen is a SharpWing that was introduced in The Hybrid Prince. It was one of the guards on the Dungeon Isle originally enchanted by Precipice, and is currently living with Umber and his friends to raise Harmony.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Ochre","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/e/ed/OchreGN3.png/revision/latest/scale-to-width-down/500?cb=20201229212140","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ochre","species":"Dragon","gender":"Male","status":"Alive (as of The Brightest Night)","description":"Ochre is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Lost Heir · Arc 2 mentioned: Talons of Power · Featured in: The Official Stickerpedia"},{"name":"Onyx","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/43/Onyx_GN_1.png/revision/latest/scale-to-width-down/500?cb=20221230073908","wikiUrl":"https://wingsoffire.fandom.com/wiki/Onyx","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Onyx is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Opal","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/3/33/OpalTemplateBas.png/revision/latest/scale-to-width-down/500?cb=20210326023710","wikiUrl":"https://wingsoffire.fandom.com/wiki/Opal","species":"Unknown","gender":"Female","status":"Deceased","description":"Opal is a character associated with iceWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Ostrich (TBN)","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/73/Ostrich_GN_3.png/revision/latest/scale-to-width-down/500?cb=20221230022930","wikiUrl":"https://wingsoffire.fandom.com/wiki/Ostrich_(TBN)","species":"Dragon","gender":"Female","status":"Alive (as of Darkness of Dragons)","description":"Ostrich (TBN) is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 mentioned: Winter Turning · Featured in: The Official Stickerpedia"},{"name":"Palm","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/ff/PalmTemplateBas.png/revision/latest/scale-to-width-down/500?cb=20210410220512","wikiUrl":"https://wingsoffire.fandom.com/wiki/Palm","species":"Dragon","gender":"Female","status":"Deceased","description":"Palm is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Arc 2 mentioned: Moon Rising"},{"name":"Paua","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Paua","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Paua is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Pearl (L1)","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d9/Pearl_GN_13.png/revision/latest/scale-to-width-down/500?cb=20251105122700","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pearl_(L1)","species":"Dragon","gender":"Female","status":"Deceased","description":"Pearl (L1) is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Moon Rising"},{"name":"Pineapple","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/77/PineappleTemplateSkyla.png/revision/latest/scale-to-width-down/500?cb=20260422111647","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pineapple","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Pineapple is a character associated with rainWing in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince · Featured in: The Official Stickerpedia"},{"name":"Pyrite","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/65/Pyrite_GN3.jpg/revision/latest/scale-to-width-down/500?cb=20240115174356","wikiUrl":"https://wingsoffire.fandom.com/wiki/Pyrite","species":"Unknown","gender":"Female","status":"Enchantment currently not in use","description":"Pyrite is a character associated with skyWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning · Featured in: The Official Stickerpedia"},{"name":"Quickstrike","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b4/QuickstrikeTemplateSands.png/revision/latest/scale-to-width-down/500?cb=20210421154413","wikiUrl":"https://wingsoffire.fandom.com/wiki/Quickstrike","species":"Dragon","gender":"Female","status":"Deceased","description":"Quickstrike is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Featured in: The Official Stickerpedia"},{"name":"Raven","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Raven","species":"Human","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Raven is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Reed","tribe":"mud","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/56/Reed_GN_4.png/revision/latest/scale-to-width-down/500?cb=20200518004624","wikiUrl":"https://wingsoffire.fandom.com/wiki/Reed","species":"Dragon","gender":"Male","status":"Alive (as of Moon Rising)","description":"Reed is a dragon associated with mudWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom · Featured in: The Official Stickerpedia"},{"name":"Rose","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/a/a8/Human_spoon_guide.jpg/revision/latest/scale-to-width-down/500?cb=20231010014851","wikiUrl":"https://wingsoffire.fandom.com/wiki/Rose","species":"Human","gender":"Female","status":"Alive (as of The Dangerous Gift)","description":"Rose is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 appearance: Darkness of Dragons · Arc 2 mentioned: Moon Rising · Arc 3 mentioned: The Dangerous Gift · Featured in: A Guide to the Dragon World"},{"name":"Rowan (L2)","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Rowan_(L2)","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Rowan (L2) is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Dragonet Prophecy · Arc 1 mentioned: The Dark Secret"},{"name":"Scarab","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/0/02/ScarabTemplateSSE.png/revision/latest/scale-to-width-down/500?cb=20241203015017","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scarab","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Scarab is a character associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Flames of Hope"},{"name":"Scarlet","tribe":"sky","image":"https://static.wikia.nocookie.net/wingsoffire/images/b/b9/ScarletTopShot.png/revision/latest/scale-to-width-down/500?cb=20251116213248","wikiUrl":"https://wingsoffire.fandom.com/wiki/Scarlet","species":"Dragon","gender":"Female","status":"Deceased","description":"Scarlet is a dragon associated with skyWing in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Sequoia","tribe":"leaf","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/59/SequoiaCloseUp.jpg/revision/latest/scale-to-width-down/500?cb=20240127051043","wikiUrl":"https://wingsoffire.fandom.com/wiki/Sequoia","species":"Unknown","gender":"Female","status":"Alive (As of The Hybrid Prince)","description":"Sequoia is a character associated with leafWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Poison Jungle · Arc 4 mentioned: The Hybrid Prince"},{"name":"Smolder","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/98/Guide_Portrait_Smolder.jpg/revision/latest/scale-to-width-down/500?cb=20231010014535","wikiUrl":"https://wingsoffire.fandom.com/wiki/Smolder","species":"Dragon","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Smolder is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 mentioned: The Hidden Kingdom · Arc 2 appearance: Darkness of Dragons · Arc 3 mentioned: The Dangerous Gift · Arc 4 appearance: The Hybrid Prince"},{"name":"Snakeroot","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c3/SnakerootTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20260304160516","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snakeroot","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Snakeroot is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Snowfox","tribe":"ice","image":"https://static.wikia.nocookie.net/wingsoffire/images/d/d9/SnowfoxTemplateLeslie.png/revision/latest/scale-to-width-down/500?cb=20210309012647","wikiUrl":"https://wingsoffire.fandom.com/wiki/Snowfox","species":"Dragon","gender":"Female","status":"Deceased","description":"Snowfox is a dragon associated with iceWing in the Wings of Fire universe."},{"name":"Squid","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/f/f2/SquidGN15.jpg/revision/latest/scale-to-width-down/500?cb=20260122043117","wikiUrl":"https://wingsoffire.fandom.com/wiki/Squid","species":"Dragon","gender":"Male","status":"Alive (as of Winter Turning)","description":"Squid is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Winter Turning"},{"name":"Stone","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/58/Stone_GN.jpeg/revision/latest/scale-to-width-down/500?cb=20211221203453","wikiUrl":"https://wingsoffire.fandom.com/wiki/Stone","species":"Human","gender":"Male","status":"Alive (as of Dragonslayer)","description":"Stone is a human associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 appearance: Darkness of Dragons · Arc 3 mentioned: The Flames of Hope"},{"name":"Taipan","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/1/10/TaipanProfile.png/revision/latest/scale-to-width-down/500?cb=20260323154957","wikiUrl":"https://wingsoffire.fandom.com/wiki/Taipan","species":"Unknown","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Taipan is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Tamarin","tribe":"rain","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/4b/Tamarin_GN_13.png/revision/latest/scale-to-width-down/500?cb=20260109121926","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tamarin","species":"Dragon","gender":"Female","status":"Alive (as of The Hive Queen)","description":"Tamarin is a dragon associated with rainWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Hidden Kingdom · Arc 1 mentioned: The Brightest Night · Arc 3 mentioned: The Hive Queen · Arc 4 mentioned: The Hybrid Prince"},{"name":"Tau","tribe":"silk","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c3/TauTemplateS978.png/revision/latest/scale-to-width-down/500?cb=20210828200913","wikiUrl":"https://wingsoffire.fandom.com/wiki/Tau","species":"Unknown","gender":"Female","status":"Alive (as of The Flames of Hope)","description":"Tau is a character associated with silkWing in the Wings of Fire universe.","appearance":"Arc 3 appearance: The Hive Queen, · Featured in: A Guide to the Dragon World"},{"name":"Thorn","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/20/ThornCloseUp.jpg/revision/latest/scale-to-width-down/500?cb=20260114151137","wikiUrl":"https://wingsoffire.fandom.com/wiki/Thorn","species":"Dragon","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Thorn is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 1 appearance: The Brightest Night · Arc 2 appearance: Darkness of Dragons · Arc 3 appearance: The Dangerous Gift · Arc 3 mentioned: The Poison Jungle · Arc 4 appearance: The Hybrid Prince"},{"name":"Tuatara","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Tuatara","species":"Unknown","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Tuatara is a character associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"},{"name":"Unnamed characters","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/4/48/IceWing_prisoners.png/revision/latest/scale-to-width-down/500?cb=20230909010722","wikiUrl":"https://wingsoffire.fandom.com/wiki/Unnamed_characters","species":"Unknown","description":"are characters who have been mentioned or appeared in the books without their names being stated."},{"name":"Vigilance","tribe":"night","image":"https://static.wikia.nocookie.net/wingsoffire/images/c/c0/Vigilance_GN_2.png/revision/latest/scale-to-width-down/500?cb=20251104095801","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vigilance","species":"Dragon","gender":"Female","status":"Deceased","description":"Vigilance is a dragon associated with nightWing in the Wings of Fire universe.","appearance":"Featured in: A Guide to the Dragon World"},{"name":"Violet","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Violet","species":"Human","gender":"Female","status":"Alive (as of Dragonslayer)","description":"Violet is a human associated with an unspecified tribe in the Wings of Fire universe."},{"name":"Viper","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/5/5a/ViperGN3.png/revision/latest/scale-to-width-down/500?cb=20201229213255","wikiUrl":"https://wingsoffire.fandom.com/wiki/Viper","species":"Dragon","gender":"Female","status":"Deceased","description":"Viper is a dragon associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Moon Rising, · Featured in: The Official Stickerpedia"},{"name":"Vulture","tribe":"sand","image":"https://static.wikia.nocookie.net/wingsoffire/images/2/2f/Vulture_GN_2.png/revision/latest/scale-to-width-down/500?cb=20241219013606","wikiUrl":"https://wingsoffire.fandom.com/wiki/Vulture","species":"Unknown","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Vulture is a character associated with sandWing in the Wings of Fire universe.","appearance":"Arc 2 appearance: Darkness of Dragons · Arc 2 mentioned: Winter Turning · Featured in: The Official Stickerpedia"},{"name":"Wasp","tribe":"hive","image":"https://static.wikia.nocookie.net/wingsoffire/images/9/94/Guide_Portrait_Wasp.jpg/revision/latest/scale-to-width-down/500?cb=20231010014116","wikiUrl":"https://wingsoffire.fandom.com/wiki/Wasp","species":"Dragon","gender":"Female","status":"Alive (as of The Hybrid Prince)","description":"Wasp is a dragon associated with hiveWing in the Wings of Fire universe.","appearance":"Arc 4 mentioned: The Hybrid Prince"},{"name":"Webs","tribe":"sea","image":"https://static.wikia.nocookie.net/wingsoffire/images/6/64/Webs_GN_Infobox.png/revision/latest/scale-to-width-down/500?cb=20200518214103","wikiUrl":"https://wingsoffire.fandom.com/wiki/Webs","species":"Dragon","gender":"Male","status":"Alive (as of Darkness of Dragons)","description":"Webs is a dragon associated with seaWing in the Wings of Fire universe.","appearance":"Arc 2 mentioned: Talons of Power"},{"name":"Whiteout","tribe":"unknown","image":"https://static.wikia.nocookie.net/wingsoffire/images/7/71/Whiteout_GN_6.png/revision/latest/scale-to-width-down/500?cb=20251104100927","wikiUrl":"https://wingsoffire.fandom.com/wiki/Whiteout","species":"Dragon","gender":"Female","status":"Deceased","description":"Whiteout is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 3 mentioned: The Dangerous Gift"},{"name":"Wollemi","tribe":"unknown","image":null,"wikiUrl":"https://wingsoffire.fandom.com/wiki/Wollemi","species":"Dragon","gender":"Male","status":"Alive (as of The Hybrid Prince)","description":"Wollemi is a dragon associated with an unspecified tribe in the Wings of Fire universe.","appearance":"Arc 4 appearance: The Hybrid Prince"}]});
const WIKI_ROLE_BY_NAME = new Map(Object.entries(WIKI_ROLE_CATALOGS).flatMap(([role, entries]) => entries.map(entry => [entry.name.toLowerCase(), role])));
const LOCAL_CHARACTER_NAMES = new Set([...CHARACTERS, ...ANTAGONISTS].map(character => character.name.toLowerCase()));
const WIKI_ROLE_DESCRIPTIONS = Object.freeze({
  historical: 'Died before the events of the main series.',
  mentioned: 'Mentioned in the books but never appears in person.',
  minor: 'Appears briefly and is not central to the overall plot.',
  supporting: 'Relevant to the plot for part of an arc without being a book protagonist.'
});
const ROLE_DIRECTORY_CHARACTERS = Object.entries(WIKI_ROLE_CATALOGS).flatMap(([role, entries]) => entries.filter(entry => !LOCAL_CHARACTER_NAMES.has(entry.name.toLowerCase())).map(entry => ({
  id: 'wiki-' + role + '-' + entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name: entry.name, tribe: entry.tribe, tribeName: entry.tribeName, species: entry.species && entry.species.toLowerCase() !== 'unknown' ? entry.species : (entry.tribe === 'unknown' ? 'Unclassified' : 'Dragon'), image: entry.image, category: role, arc: 'all', wikiOnly: true,
  description: entry.description || WIKI_ROLE_DESCRIPTIONS[role], appearance: entry.appearance, gender: entry.gender, status: entry.status,
  wikiUrl: entry.wikiUrl
})));
const ALL_CHARACTERS = [...CHARACTERS, ...ANTAGONISTS, ...ROLE_DIRECTORY_CHARACTERS];
const CHARACTER_ROLE_LABELS = WIKI_ROLE_CATALOGS;
const ROLE_LABEL_TEXT = Object.freeze({
  protagonist: 'Protagonist',
  antagonist: 'Antagonist',
  historical: 'Historical',
  mentioned: 'Mentioned',
  minor: 'Minor',
  supporting: 'Supporting',
  character: 'Character'
});
const TRIBE_ALIAS_TO_ID = Object.freeze({
  mud: 'mud', mudwing: 'mud', mudwings: 'mud',
  sea: 'sea', seawing: 'sea', seawings: 'sea',
  rain: 'rain', rainwing: 'rain', rainwings: 'rain',
  night: 'night', nightwing: 'night', nightwings: 'night',
  sand: 'sand', sandwing: 'sand', sandwings: 'sand',
  ice: 'ice', icewing: 'ice', icewings: 'ice',
  sky: 'sky', skywing: 'sky', skywings: 'sky',
  hive: 'hive', hivewing: 'hive', hivewings: 'hive',
  silk: 'silk', silkwing: 'silk', silkwings: 'silk',
  leaf: 'leaf', leafwing: 'leaf', leafwings: 'leaf'
});
const HUMAN_PROFILE_FALLBACK = 'https://static.wikia.nocookie.net/wingsoffire/images/6/67/WrenTopShot.png/revision/latest/scale-to-width-down/362?cb=20200209055707';
const UNCLASSIFIED_DRAGON_FALLBACK = 'https://static.wikia.nocookie.net/wingsoffire/images/f/5f/Typical_IceWing_by_Sassy_the_Beagle.jpg/revision/latest/scale-to-width-down/500?cb=20160718144945';

function normalizeTribeId(value) {
  const key = String(value || '').toLowerCase().replace(/[^a-z]/g, '');
  return TRIBE_ALIAS_TO_ID[key] || 'unknown';
}

function tribeIdFromImageUrl(url) {
  const decoded = decodeURIComponent(String(url || ''));
  const match = decoded.match(/(Mud|Sea|Rain|Night|Sand|Ice|Sky|Hive|Silk|Leaf)Transparent\.(?:png|webp|jpe?g)/i);
  return match ? normalizeTribeId(match[1]) : 'unknown';
}

function isGenericWikiPortrait(url) {
  const decoded = decodeURIComponent(String(url || ''));
  return /(Mud|Sea|Rain|Night|Sand|Ice|Sky|Hive|Silk|Leaf)Transparent\.(?:png|webp|jpe?g)/i.test(decoded)
    || /Wings_of_Fire_16|WoF_Wiki|Fandom|Logo/i.test(decoded);
}

function isHumanCharacter(character) {
  return /human|scavenger/i.test(character.species || '') || normalizeTribeId(character.tribeName) === 'unknown' && /human|scavenger/i.test(character.description || '');
}

function characterRoleLabels(character) {
  const wikiRoles = Object.entries(CHARACTER_ROLE_LABELS)
    .filter(([, entries]) => entries.some(entry => entry.name.toLowerCase() === character.name.toLowerCase()))
    .map(([role]) => role);
  const localRole = character.category || 'character';
  return [...new Set([...wikiRoles, localRole])];
}

function characterPrimaryRole(character) {
  const roles = characterRoleLabels(character);
  if (roles.includes('antagonist')) return { id: 'antagonist', label: 'Antagonist' };
  const wikiRole = roles.find(role => ['supporting', 'historical', 'minor', 'mentioned'].includes(role));
  if (wikiRole) return { id: wikiRole, label: ROLE_LABEL_TEXT[wikiRole] };
  if (roles.includes('protagonist')) return { id: 'protagonist', label: 'Protagonist' };
  return { id: 'character', label: 'Character' };
}

function characterResolvedTribeId(character) {
  const direct = normalizeTribeId(character.tribe);
  if (direct !== 'unknown') return direct;
  const named = normalizeTribeId(character.tribeName);
  if (named !== 'unknown') return named;
  const imageTribe = tribeIdFromImageUrl(character.image);
  if (imageTribe !== 'unknown') return imageTribe;
  const text = `${character.description || ''} ${character.appearance || ''}`;
  const textMatch = text.match(/\b(Mud|Sea|Rain|Night|Sand|Ice|Sky|Hive|Silk|Leaf)Wing\b/i);
  return textMatch ? normalizeTribeId(textMatch[1]) : 'unknown';
}

function characterTribeLabel(character) {
  const tribeId = characterResolvedTribeId(character);
  const tribe = TRIBES.find(t => t.id === tribeId);
  if (tribe) return tribe.name;
  if (character.tribeName && !/unknown/i.test(character.tribeName)) return character.tribeName;
  if (isHumanCharacter(character)) return 'Human';
  return character.species && !/unknown|unclassified/i.test(character.species) ? character.species : 'Unclassified';
}

function hasIndividualPortrait(character) {
  return Boolean(character.image && !isGenericWikiPortrait(character.image));
}

function characterPortraitSource(character) {
  if (hasIndividualPortrait(character)) return character.image;
  if (isHumanCharacter(character)) return HUMAN_PROFILE_FALLBACK;
  const tribeId = characterResolvedTribeId(character);
  return tribeId !== 'unknown' ? wikiArtFor(tribeId) : UNCLASSIFIED_DRAGON_FALLBACK;
}

function characterArcLabel(character) {
  if (character.arc === 0) return 'Legends Era';
  if (character.arc === 'all' || character.arc == null) return character.appearance || 'Wiki archive record';
  return `Arc ${character.arc}`;
}

function characterMatchesArc(character, arc) {
  if (arc === 'all') return true;
  if (character.arc === arc) return true;
  return Boolean(character.appearance && character.appearance.includes(`Arc ${arc}`));
}

function characterMatchesCategory(character, category) {
  if (category === 'all') return true;
  if (category === 'protagonist' || category === 'antagonist') return characterPrimaryRole(character).id === category;
  return characterRoleLabels(character).includes(category);
}

function getAllSearchItems() {
  const items = [];
  ALL_CHARACTERS.forEach(c => {
    const primaryRole = characterPrimaryRole(c);
    items.push({ type: 'character', src: characterPortraitSource(c), tribe: characterResolvedTribeId(c), title: c.name, meta: `${characterTribeLabel(c)} · ${primaryRole.label} · ${characterArcLabel(c)}`, id: c.id, page: 'character' });
  });
  BOOKS.forEach(b => items.push({ type: 'book', src: b.cover, tribe: b.tribe, title: `Book ${b.number}: ${b.title}`, meta: `${b.arcName} · ${b.year} · ${b.protagonistName}`, id: b.id, page: 'book' }));
  TRIBES.forEach(t => items.push({ type: 'tribe', tribe: t.id, title: t.name, meta: `${t.continent} · ${t.habitat.split('—')[0].trim()}`, id: t.id, page: 'tribe' }));
  ARCS.forEach(a => items.push({ type: 'arc', tribe: ['sky', 'night', 'silk', 'sand'][a.id - 1], title: a.name, meta: `${a.books} · ${a.years}`, id: a.id, page: 'arc' }));
  items.push({ type: 'author', tribe: 'night', title: 'Tui T. Sutherland', meta: 'Author · Scholastic Press', id: null, page: 'author' });
  items.push({ type: 'page', tribe: 'rain', title: 'World of Pyrrhia & Pantala', meta: 'All continents and locations', id: null, page: 'world' });
  return items;
}

function renderSearchModal() {
  return `
    <div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Search Wings of Fire">
      <div class="search-box glass">
        <div class="search-box__input-wrap">
          ${renderWikiIcon('night', 'Search', 22)}
          <input class="search-box__input" id="searchInput" type="search" aria-label="Search characters, books, and tribes" placeholder="Search characters, books, tribes..." autocomplete="off" />
          <span class="search-box__kbd">ESC</span>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>
    </div>`;
}

function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  if (!overlay || !input) return;
  overlay.classList.add('search-overlay--open');
  overlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => input.focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!overlay || !input || !results) return;
  overlay.classList.remove('search-overlay--open');
  overlay.setAttribute('aria-hidden', 'true');
  input.value = '';
  results.innerHTML = '';
}

function performSearch(query) {
  const results = document.getElementById('searchResults');
  if (!query.trim()) {
    results.innerHTML = '<div class="search-empty">Type to search characters, books, tribes, and more...</div>';
    return;
  }
  const q = query.toLowerCase();
  const items = getAllSearchItems().filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.meta.toLowerCase().includes(q) ||
    item.type === 'tribe' && (item.title.toLowerCase().includes(q) || item.title.toLowerCase().replace('wing','').includes(q)) ||
    (item.type === 'character' && ALL_CHARACTERS.find(c => c.id === item.id)?.description?.toLowerCase().includes(q)) ||
    (item.type === 'book' && BOOKS.find(b => b.id === item.id)?.summary?.toLowerCase().includes(q))
  );

  if (items.length === 0) {
    results.innerHTML = '<div class="search-empty">No results found. Try a different search term.</div>';
    return;
  }

  // Sort: tribes first, then arcs, then characters, then books
  const typeOrder = { tribe: 0, arc: 1, character: 2, book: 3, author: 4, page: 5 };
  items.sort((a, b) => (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9));

  results.innerHTML = items.map(item => `
    <a class="search-result" href="?page=${item.page}${item.id ? '&id='+item.id : ''}"
       onclick="event.preventDefault(); closeSearch(); navigate('${item.page}'${item.id ? ",'"+item.id+"'" : ''})">
      <div class="search-result__icon">${renderWikiArt({ src: item.src, tribe: item.tribe, alt: item.title, className: 'wiki-art-icon', style: 'width:30px;height:30px;object-fit:contain;' })}</div>
      <div class="search-result__text">
        <div class="search-result__title">${highlightMatch(item.title, query)}</div>
        <div class="search-result__meta">${item.type.charAt(0).toUpperCase() + item.type.slice(1)} · ${item.meta}</div>
      </div>
    </a>`).join('');
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong style="color:var(--accent-fire)">$1</strong>');
}

// ===== Page Renderers =====
function renderHomePage() {
  const featuredChars = [CHARACTERS[0], CHARACTERS[1], CHARACTERS[4], CHARACTERS[5], CHARACTERS[9], CHARACTERS[10], CHARACTERS[14], CHARACTERS[15]];
  const allChars = CHARACTERS;
  return `
    <section class="hero">
      <div class="hero__frame">
        <div class="hero__copy">
          <p class="hero__eyebrow">A field guide to two continents</p>
          <h1 class="hero__title">Wings of Fire</h1>
          <p class="hero__subtitle">An Epic Dragon Fantasy Series</p>
          <p class="hero__desc">Explore the world of 10 dragon tribes, 16+ epic novels, and four legendary arcs.<br>From the war-torn continent of Pyrrhia to the mysterious land of Pantala, discover the dragons who changed their world.</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="?page=characters" onclick="event.preventDefault(); navigate('characters')">Meet the Characters</a>
            <a class="btn btn--glass" href="?page=books" onclick="event.preventDefault(); navigate('books')">Explore the Books</a>
          </div>
        </div>
        <div class="hero__visual" aria-label="Featured Wings of Fire artwork">
          <div class="hero__visual-glow"></div>
          ${renderWikiArt({ src: 'https://static.wikia.nocookie.net/wingsoffire/images/4/41/Wings_of_Fire_16_Full_Edited.jpg/revision/latest/scale-to-width-down/900', tribe: 'sky', alt: 'Wings of Fire artwork', className: 'hero__art', style: 'width:100%;height:100%;object-fit:contain;' })}
          <div class="hero__orbit hero__orbit--one">10 tribes</div>
          <div class="hero__orbit hero__orbit--two">2 continents</div>
          <div class="hero__visual-caption"><span>THE ARCHIVE</span><strong>Pyrrhia · Pantala</strong></div>
        </div>
      </div>
    </section>

    <section class="home-intro" aria-label="Wings of Fire archive overview">
      <div class="home-intro__lead">
        <span class="home-intro__kicker">Start here</span>
        <h2>Every dragon, place, and turning point in one living archive.</h2>
      </div>
      <div class="home-intro__facts">
        <div><strong>16+</strong><span>main novels</span></div>
        <div><strong>4</strong><span>story arcs</span></div>
        <div><strong>10</strong><span>dragon tribes</span></div>
      </div>
    </section>


    <section class="home-arcs-showcase" aria-label="All four story arcs">
      ${ARCS.map((arc, i) => `
        <a class="home-arc-feature" href="?page=arc&id=${arc.id}" onclick="event.preventDefault(); navigate('arc','${arc.id}')">
          <div class="home-arc-feature__copy">
            <span class="home-intro__kicker">Featured arc · 0${arc.id}</span>
            <h2>${arc.name}</h2>
            <p class="home-arc-feature__meta">${arc.books} · ${arc.years}</p>
            <p>${arc.description}</p>
            <span class="home-promo__link">Explore the arc <span>→</span></span>
          </div>
          <div class="home-arc-feature__art">${renderWikiArt({ tribe: ['sky', 'night', 'silk', 'mud'][i], alt: arc.name, className: 'home-arc-feature__image', style: 'width:100%;height:100%;object-fit:contain;' })}</div>
        </a>
      `).join('')}
    </section>
    <section class="section">
      <div class="container">
        <div class="stats-row">
          <div class="stat glass">
            <div class="stat__number">18+</div>
            <div class="stat__label">Novels</div>
          </div>
          <div class="stat glass">
            <div class="stat__number">4</div>
            <div class="stat__label">Story Arcs</div>
          </div>
          <div class="stat glass">
            <div class="stat__number">10</div>
            <div class="stat__label">Dragon Tribes</div>
          </div>
          <div class="stat glass">
            <div class="stat__number">2</div>
            <div class="stat__label">Continents</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__header">
          <div class="section__label">Featured Dragons</div>
          <h2 class="section__title">Meet the Protagonists</h2>
          <p class="section__desc">One protagonist from each arc who defined the story</p>
        </div>
        <div class="grid grid--8" style="margin-bottom:24px;">
          ${featuredChars.map(c => renderCharCard(c)).join('')}
        </div>
        <div style="text-align:center;margin-bottom:48px;">
          <a class="btn btn--glass" href="?page=characters" onclick="event.preventDefault(); navigate('characters')">View All Characters →</a>
        </div>

      </div>
    </section>

`;
}

function renderCharCard(c) {
  const imgPos = c.imagePosition || 'center 30%';
  const tribeId = characterResolvedTribeId(c);
  const tribeLabel = characterTribeLabel(c);
  const portraitIsIndividual = hasIndividualPortrait(c);
  const profileVisual = renderWikiArt({ src: characterPortraitSource(c), tribe: tribeId, alt: portraitIsIndividual ? c.name : `${tribeLabel} appearance`, className: 'wiki-art-icon', style: `width:100%;height:100%;object-fit:cover;object-position:${portraitIsIndividual ? imgPos : 'center'};` });
  const imgHtml = `<div class="char-card__avatar avatar-${tribeId}" style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,var(--accent-primary-light),var(--bg-inset));"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${profileVisual}</div></div>`;
  const profileNote = portraitIsIndividual ? '' : '<div style="margin:6px 0 0;color:var(--text-tertiary);font:10px \'IBM Plex Mono\',monospace;letter-spacing:.08em;text-transform:uppercase;">N/A · individual profile photo unavailable</div>';
  const primaryRole = characterPrimaryRole(c);
  const isAntagonist = primaryRole.id === 'antagonist';
  const roleBadges = [...new Set(characterRoleLabels(c))].filter(role => !['protagonist', 'character'].includes(role));
  const badgeHtml = roleBadges.length
    ? `<span style="position:absolute;top:14px;right:14px;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;max-width:58%;"><span style="padding:3px 10px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:0.04em;background:${isAntagonist ? 'rgba(220,38,38,0.16)' : 'rgba(228,119,82,0.14)'};border:1px solid ${isAntagonist ? 'rgba(220,38,38,0.35)' : 'rgba(228,119,82,0.35)'};color:${isAntagonist ? '#f87171' : 'var(--accent-primary)'};text-transform:uppercase;">${roleBadges.join(' · ')}</span></span>`
    : '';
  const cardLink = `href="?page=character&id=${c.id}" onclick="event.preventDefault(); navigate('character','${c.id}')"`;
  const cardSource = c.appearance || (c.book && c.bookTitle ? `Book ${c.book}: ${c.bookTitle}` : 'Profile details from the Wings of Fire Wiki');
  const profileMeta = [c.gender, c.status].filter(value => value && !/unknown/i.test(value)).join(' · ');
  const cardDescription = c.description || WIKI_ROLE_DESCRIPTIONS[primaryRole.id] || 'No expanded description is available in the local archive yet.';
  const tribeIcon = tribeId === 'unknown' ? '' : `${renderWikiIcon(tribeId, tribeLabel, 18)} `;
  return `
    <a class="glass glass--card char-card" ${cardLink}
       style="text-decoration:none;color:inherit;position:relative;">
      ${badgeHtml}
      ${imgHtml}
      ${profileNote}
      <div class="char-card__name">${c.name}</div>
      <span class="char-card__tribe tribe-${tribeId}" style="display:inline-flex;align-items:center;gap:5px;">${tribeIcon}<span>${tribeLabel}</span></span>
      ${profileMeta ? `<div style="margin-top:7px;color:var(--text-tertiary);font:10px 'IBM Plex Mono',monospace;letter-spacing:.05em;text-transform:uppercase;">${profileMeta}</div>` : ''}
      <p class="char-card__desc">${cardDescription.substring(0, 120)}...</p>
      <div class="char-card__arc">${cardSource}</div>
    </a>`;
}

function renderCharactersPage() {
  const protagonistCount = ALL_CHARACTERS.filter(c => characterMatchesCategory(c, 'protagonist')).length;
  const antagonistCount = ALL_CHARACTERS.filter(c => characterMatchesCategory(c, 'antagonist')).length;
  return `
    <section class="section" style="padding-top:40px;">
      <div class="container">
        <div class="section__header">
          <div class="section__label">The Dragon World</div>
          <h2 class="section__title">All Characters</h2>
          <p class="section__desc">${protagonistCount} protagonists · ${antagonistCount} antagonists · ${WIKI_ROLE_CATALOGS.historical.length} historical · ${WIKI_ROLE_CATALOGS.mentioned.length} mentioned · ${WIKI_ROLE_CATALOGS.minor.length} minor · ${WIKI_ROLE_CATALOGS.supporting.length} supporting</p>
        </div>

        <div class="tabs" id="categoryTabs" style="margin-bottom:12px;">
          <button class="tab tab--active" data-cat="all" onclick="filterByCategory('all', this)">All</button>
          <button class="tab" data-cat="protagonist" onclick="filterByCategory('protagonist', this)">Protagonists · ${protagonistCount}</button>
          <button class="tab" data-cat="antagonist" onclick="filterByCategory('antagonist', this)">Antagonists · ${antagonistCount}</button>
          <button class="tab" data-cat="historical" onclick="filterByCategory('historical', this)">Historical · ${WIKI_ROLE_CATALOGS.historical.length}</button>
          <button class="tab" data-cat="mentioned" onclick="filterByCategory('mentioned', this)">Mentioned · ${WIKI_ROLE_CATALOGS.mentioned.length}</button>
          <button class="tab" data-cat="minor" onclick="filterByCategory('minor', this)">Minor · ${WIKI_ROLE_CATALOGS.minor.length}</button>
          <button class="tab" data-cat="supporting" onclick="filterByCategory('supporting', this)">Supporting · ${WIKI_ROLE_CATALOGS.supporting.length}</button>
        </div>

        <div class="tabs" id="arcTabs">
          <button class="tab tab--active" data-arc="all" onclick="filterChars('all', this)">All Arcs</button>
          <button class="tab" data-arc="1" onclick="filterChars(1, this)">Arc 1 — Dragonet Prophecy</button>
          <button class="tab" data-arc="2" onclick="filterChars(2, this)">Arc 2 — Jade Mountain</button>
          <button class="tab" data-arc="3" onclick="filterChars(3, this)">Arc 3 — Lost Continent</button>
          <button class="tab" data-arc="4" onclick="filterChars(4, this)">Arc 4 — Forgotten Isles</button>
          <button class="tab" data-arc="0" onclick="filterChars(0, this)">Legends Era</button>
        </div>

        <div class="grid grid--3" id="charGrid">
          ${ALL_CHARACTERS.map(c => renderCharCard(c)).join('')}
        </div>
      </div>
    </section>`;
}

let currentCategoryFilter = 'all';
let currentArcFilter = 'all';

function applyCharacterFilters() {
  const grid = document.getElementById('charGrid');
  let filtered = ALL_CHARACTERS;
  if (currentCategoryFilter !== 'all') filtered = filtered.filter(c => characterMatchesCategory(c, currentCategoryFilter));
  if (currentArcFilter !== 'all') {
    filtered = filtered.filter(c => characterMatchesArc(c, currentArcFilter));
  }
  grid.innerHTML = filtered.length
    ? filtered.map(c => renderCharCard(c)).join('')
    : '<p style="grid-column:1/-1;text-align:center;color:var(--text-secondary);padding:40px;">No characters match this filter.</p>';
}

function filterByCategory(cat, el) {
  currentCategoryFilter = cat;
  document.querySelectorAll('#categoryTabs .tab').forEach(t => t.classList.remove('tab--active'));
  el.classList.add('tab--active');
  applyCharacterFilters();
}

function filterChars(arc, el) {
  currentArcFilter = arc;
  document.querySelectorAll('#arcTabs .tab').forEach(t => t.classList.remove('tab--active'));
  el.classList.add('tab--active');
  applyCharacterFilters();
}

function renderCharacterPage(id) {
  const c = ALL_CHARACTERS.find(ch => ch.id === id);
  if (!c) return '<div class="container" style="padding:100px 24px;"><h2>Character not found</h2></div>';
  const tribeId = characterResolvedTribeId(c);
  const primaryRole = characterPrimaryRole(c);
  const isAntagonist = primaryRole.id === 'antagonist';
  const roleText = c.role || `${primaryRole.label} character`;
  const description = c.description || 'No expanded description is available in the local archive yet.';
  const background = c.background || description;
  const arcStory = c.arcStory || c.appearance || 'No story-arc summary is available in the local archive yet.';
  const abilities = c.abilities || [];
  const personality = c.personality || [];
  const relationships = c.relationships || [];
  const quotes = c.quotes || [];
  const portraitIsIndividual = hasIndividualPortrait(c);
  const detailImageSrc = characterPortraitSource(c);
  const detailTribeLabel = characterTribeLabel(c);
  const detailImgPos = c.imagePosition || 'center 25%';
  const detailPhotoNote = portraitIsIndividual ? '' : '<div style="margin-top:8px;color:var(--text-tertiary);font:10px \'IBM Plex Mono\',monospace;letter-spacing:.08em;text-transform:uppercase;text-align:center;">N/A · individual profile photo unavailable</div>';
  const detailImgHtml = `<div><div class="detail-hero__avatar avatar-${tribeId}" style="overflow:hidden;width:140px;height:140px;border-radius:30px;display:flex;align-items:center;justify-content:center;">${renderWikiArt({ src: detailImageSrc, tribe: tribeId, alt: portraitIsIndividual ? c.name : `${detailTribeLabel} appearance`, className: 'wiki-art-icon', style: `width:100%;height:100%;object-fit:cover;object-position:${portraitIsIndividual ? detailImgPos : 'center'};border-radius:30px;` })}</div>${detailPhotoNote}</div>`;
  const roleBadgeBg = isAntagonist ? 'rgba(220,38,38,0.16)' : primaryRole.id === 'protagonist' ? 'rgba(34,197,94,0.14)' : 'rgba(228,119,82,0.14)';
  const roleBadgeBorder = isAntagonist ? 'rgba(220,38,38,0.35)' : primaryRole.id === 'protagonist' ? 'rgba(34,197,94,0.3)' : 'rgba(228,119,82,0.35)';
  const roleBadgeColor = isAntagonist ? '#f87171' : primaryRole.id === 'protagonist' ? '#16a34a' : 'var(--accent-primary)';
  const tagHtml = [
    `<span class="tribe-${tribeId}" style="padding:5px 14px;border-radius:10px;font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">${tribeId === 'unknown' ? '' : renderWikiIcon(tribeId, detailTribeLabel, 20)} <span>${detailTribeLabel}</span></span>`,
    c.gender && !/unknown/i.test(c.gender) ? `<span style="padding:5px 14px;border-radius:10px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${c.gender}</span>` : null,
    c.status && !/unknown/i.test(c.status) ? `<span style="padding:5px 14px;border-radius:10px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${c.status}</span>` : null,
    c.arc !== 'all' && c.arc != null ? `<span style="padding:5px 14px;border-radius:10px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${characterArcLabel(c)}</span>` : null,
    c.book ? `<span style="padding:5px 14px;border-radius:10px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">Book ${c.book}</span>` : null,
    `<span style="padding:5px 14px;border-radius:10px;font-size:13px;font-weight:700;letter-spacing:0.03em;background:${roleBadgeBg};border:1px solid ${roleBadgeBorder};color:${roleBadgeColor};text-transform:uppercase;">${primaryRole.label}</span>`
  ].filter(Boolean).join('');
  const relatedRoleIds = characterRoleLabels(c).filter(role => role !== 'character');
  const relatedCharacters = ALL_CHARACTERS.filter(ch => ch.id !== c.id && (
    (c.arc !== 'all' && characterMatchesArc(ch, c.arc)) ||
    characterResolvedTribeId(ch) === tribeId ||
    characterRoleLabels(ch).some(role => relatedRoleIds.includes(role))
  )).slice(0, 6);

  return `
    <div class="detail-hero">
      <a class="back-link" href="?page=characters" onclick="event.preventDefault(); navigate('characters')">← Back to Characters</a>
    </div>
    <div class="detail-hero" style="padding-top:0;">
      ${detailImgHtml}
      <div class="detail-hero__info">
        <h1 class="detail-hero__name">${c.name}</h1>
        <p class="detail-hero__subtitle">${roleText}</p>
        <div class="detail-hero__tags">
          ${tagHtml}
        </div>
      </div>
    </div>

    <div class="detail-content">
      <div class="detail-content__section glass">
        <h3>About</h3>
        <p>${description}</p>
      </div>

      <div class="detail-content__section glass" style="padding:28px;margin-top:24px;">
        <h3>Background</h3>
        <p>${background}</p>
      </div>

      <div class="detail-content__section glass" style="padding:28px;margin-top:24px;">
        <h3>Story Arc</h3>
        <p style="font-size:13px;color:var(--accent-fire);margin-bottom:12px;">${c.bookTitle || c.appearance || 'Wiki character profile'}</p>
        <p>${arcStory}</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;">
        <div class="detail-content__section glass">
          <h3>Abilities</h3>
          <ul>
            ${abilities.map(a => `<li>${a}</li>`).join('') || '<li>Not listed</li>'}
          </ul>
        </div>
        <div class="detail-content__section glass">
          <h3>Personality</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
            ${personality.map(p => `<span style="padding:6px 14px;border-radius:10px;font-size:13px;background:rgba(255,107,53,0.12);border:1px solid rgba(255,107,53,0.25);color:var(--accent-fire);">${p}</span>`).join('') || '<span>Not listed</span>'}
          </div>
        </div>
      </div>

      ${relationships.length > 0 ? `
      <div class="detail-content__section glass" style="padding:28px;margin-top:24px;">
        <h3>Relationships</h3>
        <ul>
          ${relationships.map(r => `<li><strong>${r.name}</strong> — ${r.relation}</li>`).join('')}
        </ul>
      </div>` : ''}

      ${quotes.length > 0 ? `
      <div class="detail-content__section glass" style="padding:28px;margin-top:24px;border-left:3px solid var(--accent-fire);">
        <h3>Notable Quote</h3>
        <p style="font-style:italic;font-size:16px;">${quotes[0]}</p>
      </div>` : ''}

      <div class="related-section">
        <h3>${isAntagonist ? 'More Antagonists' : `Related ${primaryRole.label} Characters`}</h3>
        <div class="grid grid--3" style="margin-top:16px;">
          ${relatedCharacters.map(ch => renderCharCard(ch)).join('') || '<p style="grid-column:1/-1;color:var(--text-secondary);">No related local profiles are available yet.</p>'}
        </div>
      </div>
    </div>`;
}

function renderBooksPage() {
  return `
    <section class="section" style="padding-top:40px;">
      <div class="container">
        <div class="section__header">
          <div class="section__label">The Library</div>
          <h2 class="section__title">All 16 Books</h2>
          <p class="section__desc">Four arcs, 18+ protagonists, one epic saga</p>
        </div>

        <div class="tabs" id="bookArcTabs">
          <button class="tab tab--active" data-arc="all" onclick="filterBooks('all', this)">All Books</button>
          <button class="tab" data-arc="1" onclick="filterBooks(1, this)">Arc 1 — Dragonet Prophecy</button>
          <button class="tab" data-arc="2" onclick="filterBooks(2, this)">Arc 2 — Jade Mountain</button>
          <button class="tab" data-arc="3" onclick="filterBooks(3, this)">Arc 3 — Lost Continent</button>
          <button class="tab" data-arc="4" onclick="filterBooks(4, this)">Arc 4 — Forgotten Isles</button>
        </div>

        <div class="grid grid--3" id="bookGrid">
          ${BOOKS.map(b => renderBookCard(b)).join('')}
        </div>
      </div>
    </section>`;
}

function renderBookCard(b) {
  const coverHtml = `<div class="book-card__cover" style="background:linear-gradient(145deg, ${b.color}55, ${b.color}22, ${b.color}11);display:flex;align-items:center;justify-content:center;overflow:hidden;">${renderWikiArt({ src: b.cover, tribe: b.tribe, alt: b.title, className: 'wiki-art-icon', style: `max-width:100%;max-height:100%;width:100%;height:100%;object-fit:${b.cover ? 'contain' : 'contain'};position:relative;z-index:2;border-radius:4px;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));` })}</div>`;
  return `
    <a class="glass glass--card book-card" href="?page=book&id=${b.id}"
       onclick="event.preventDefault(); navigate('book','${b.id}')" style="text-decoration:none;color:inherit;">
      ${coverHtml}
      <div class="book-card__body">
        <div class="book-card__number">Book ${b.number}</div>
        <div class="book-card__title">${b.title}</div>
        <div class="book-card__meta">${b.arcName} · ${b.year} · ${b.protagonistName}</div>
        <p class="book-card__excerpt">${b.summary.substring(0, 140)}...</p>
      </div>
    </a>`;
}

function filterBooks(arc, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
  el.classList.add('tab--active');
  const grid = document.getElementById('bookGrid');
  const filtered = arc === 'all' ? BOOKS : BOOKS.filter(b => b.arc === arc);
  grid.innerHTML = filtered.map(b => renderBookCard(b)).join('');
}

function renderBookPage(id) {
  const b = BOOKS.find(book => book.id === parseInt(id));
  if (!b) return '<div class="container" style="padding:100px 24px;"><h2>Book not found</h2></div>';
  const featuredCharacters = [...new Map([
    ...CHARACTERS.filter(c => c.book === b.number).map(c => [c.id, c]),
    ...CHARACTERS.filter(c => characterResolvedTribeId(c) === b.tribe).slice(0, 4).map(c => [c.id, c])
  ]).values()].slice(0, 8);
  const bookContext = b.arc === 1
    ? 'Pyrrhia during the War of SandWing Succession.'
    : b.arc === 2
      ? 'Pyrrhia after the first arc, centered on Jade Mountain Academy.'
      : b.arc === 3
        ? 'Pantala under the control of Queen Wasp and the Othermind.'
        : 'The Forgotten Isles, a new setting connected to Pyrrhia.';

  return `
    <div class="book-detail">
      <a class="back-link" href="?page=books" onclick="event.preventDefault(); navigate('books')">← Back to Books</a>

      <div class="book-detail__header">
        <div class="book-detail__cover glass" style="background:linear-gradient(145deg, ${b.color}55, ${b.color}22, ${b.color}11);overflow:hidden;">
          ${renderWikiArt({ src: b.cover, tribe: b.tribe, alt: b.title, className: 'wiki-art-icon', style: 'max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;position:relative;z-index:2;border-radius:6px;filter:drop-shadow(0 6px 20px rgba(0,0,0,0.5));' })}
        </div>
        <div style="flex:1;">
          <p style="font-size:13px;color:var(--accent-fire);letter-spacing:2px;text-transform:uppercase;font-weight:600;">Book ${b.number} of ${BOOKS.length}</p>
          <h1 style="font-family:'Cinzel',serif;font-size:clamp(24px,4vw,36px);margin:8px 0;">${b.title}</h1>
          <p style="color:var(--text-secondary);margin-bottom:12px;">${b.arcName}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span class="tribe-${b.tribe}" style="padding:5px 12px;border-radius:8px;font-size:13px;">${b.protagonistName}</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${b.year}</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">Arc ${b.arc}</span>
          </div>
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Plot summary</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${b.summary}</p>
      </div>

      <div class="book-fact-grid" style="margin-top:24px;">
        <div class="glass" style="padding:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:10px;">Point of view</h3>
          <p style="color:var(--text-secondary);line-height:1.7;">${b.protagonistName}</p>
        </div>
        <div class="glass" style="padding:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:10px;">Context</h3>
          <p style="color:var(--text-secondary);line-height:1.7;">${bookContext}</p>
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Featured characters appearing in this entry</h3>
        <div class="grid grid--4" style="margin-top:16px;">
          ${featuredCharacters.map(c => renderCharCard(c)).join('')}
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Themes</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${b.themes.map(t => `<span style="padding:8px 16px;border-radius:10px;font-size:14px;background:rgba(255,107,53,0.12);border:1px solid rgba(255,107,53,0.25);color:var(--accent-fire);">${t}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top:32px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Protagonist</h3>
        ${renderCharCard(CHARACTERS.find(c => c.id === b.protagonist))}
      </div>

      <div class="related-section" style="margin-top:40px;">
        <h3>Other Books in ${b.arcName}</h3>
        <div class="grid grid--3" style="margin-top:16px;">
          ${BOOKS.filter(book => book.arc === b.arc && book.id !== b.id).map(book => renderBookCard(book)).join('')}
        </div>
      </div>
    </div>`;
}

function renderWorldPage() {
  return `
    <section class="section" style="padding-top:40px;">
      <div class="container">
        <div class="section__header">
          <div class="section__label">The Dragon World</div>
          <h2 class="section__title">Two Continents, Ten Tribes</h2>
          <p class="section__desc">The world of Wings of Fire spans two continents, each home to unique dragon tribes with distinct cultures, abilities, and histories.</p>
        </div>

        ${Object.entries(WORLD_LOCATIONS).map(([key, cont]) => `
          <div style="margin-bottom:48px;">
            <h3 style="font-family:'Cinzel',serif;font-size:28px;margin-bottom:16px;">${cont.name}</h3>
            <div class="glass" style="padding:28px;margin-bottom:24px;">
              <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${cont.description}</p>
            </div>

            <h4 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;">Kingdoms & Territories</h4>
            <div class="grid grid--3">
              ${cont.kingdoms.map(k => {
                const tribe = TRIBES.find(t => t.id === k.tribe);
                return `
                  <a class="glass glass--card" href="?page=tribe&id=${k.tribe}"
                     onclick="event.preventDefault(); navigate('tribe','${k.tribe}')" style="padding:20px;text-decoration:none;color:inherit;display:block;">
                    <div style="font-size:28px;margin-bottom:8px;">${renderWikiIcon(k.tribe, tribe?.name || k.name, 48)}</div>
                    <div style="font-family:'Cinzel',serif;font-size:15px;font-weight:700;margin-bottom:4px;">${k.name}</div>
                    <div style="font-size:12px;color:var(--text-dim);margin-bottom:8px;">${k.terrain}</div>
                    <div class="tribe-${k.tribe}" style="display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;">${tribe?.name || k.tribe}</div>
                    <p style="font-size:11px;color:var(--accent-fire);margin-top:10px;">View tribe →</p>
                  </a>`;
              }).join('')}
            </div>

            ${cont.keyLocations ? `
              <h4 style="font-family:'Cinzel',serif;font-size:18px;margin:24px 0 16px;">Key Locations</h4>
              <div class="glass" style="padding:24px;">
                <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
                  ${cont.keyLocations.map((loc, i) => `
                    <li style="color:var(--text-secondary);font-size:14px;padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">${renderWikiIcon(locationArtFor(loc, i), loc, 20)} ${loc}</li>
                  `).join('')}
                </ul>
              </div>` : ''}
          </div>
        `).join('')}

        <div class="section__header" style="margin-top:64px;">
          <div class="section__label">All Tribes</div>
          <h2 class="section__title">The Ten Dragon Tribes</h2>
        </div>
        <div class="grid grid--3">
          ${TRIBES.map(t => `
            <a class="glass glass--card tribe-card" href="?page=tribe&id=${t.id}"
               onclick="event.preventDefault(); navigate('tribe','${t.id}')" style="text-decoration:none;color:inherit;">
              <div class="tribe-card__icon">${renderWikiIcon(t.id, t.name, 96)}</div>
              <div class="tribe-card__name">${t.name}</div>
              <div class="tribe-card__desc">${t.description.substring(0, 150)}...</div>
              <div style="margin-top:12px;">
                <div style="font-size:12px;color:var(--text-dim);margin-bottom:6px;">Abilities</div>
                <div style="display:flex;flex-wrap:wrap;gap:4px;">
                  ${t.abilities.slice(0,4).map(a => `<span class="tribe-${t.id}" style="padding:3px 8px;border-radius:6px;font-size:11px;">${a.split('—')[0].trim()}</span>`).join('')}
                </div>
              </div>
              <p style="font-size:12px;color:var(--accent-fire);margin-top:12px;">View details →</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>`;
}

// ===== LIBRARY PAGE =====
function renderLibraryPage() {
  const lib = BOOK_LIBRARY;
  const categoryColors = {
    mainSeries: '#E47752',
    legends: '#E47752',
    winglets: '#E47752',
    graphicNovels: '#E47752',
    guides: '#E47752'
  };

  return `
    <section class="section" style="padding-top:30px;">
      <div class="container">
        <div class="section__header">
          <div class="section__label">The Complete Collection</div>
          <h2 class="section__title">Book Library</h2>
          <p class="section__desc">Every Wings of Fire book across all categories — main series, legends, winglets, graphic novels, and guides.</p>
        </div>

        ${Object.entries(lib).map(([key, cat]) => `
          <div style="margin-bottom:56px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
              <span style="font-size:32px;">${renderWikiIcon(libraryArtForCategory(key), cat.title, 48)}</span>
              <div>
                <h3 style="font-family:'Cinzel',serif;font-size:22px;font-weight:700;">${cat.title}</h3>
                <p style="font-size:14px;color:var(--text-secondary);margin-top:4px;">${cat.description}</p>
              </div>
            </div>

            <div class="grid grid--3">
              ${cat.books.map((book, i) => {
                const hasPage = book.id;
                const tag = hasPage ? `<a href="?page=${key === 'legends' ? 'legend' : 'winglet'}&id=${book.id}" onclick="event.preventDefault(); navigate('${key === 'legends' ? 'legend' : 'winglet'}','${book.id}')" style="display:block;text-decoration:none;color:inherit;">` : '';
                const tagEnd = hasPage ? '</a>' : '';
                return `
                ${tag}<div class="glass glass--card" style="padding:20px;animation:cardFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 * (i % 6)}s both;${hasPage ? 'cursor:pointer;' : ''}">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;">
                    <div style="font-family:'Cinzel',serif;font-size:15px;font-weight:700;line-height:1.3;">${book.title}</div>
                    ${book.status === 'Upcoming' || book.status === 'Announced' ? `<span style="padding:3px 8px;border-radius:6px;font-size:10px;font-weight:600;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.2);white-space:nowrap;">${book.status}</span>` : ''}
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
                    ${book.number ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.06);color:var(--text-dim);">#${book.number}</span>` : ''}
                    ${book.year ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.06);color:var(--text-dim);">${book.year}</span>` : ''}
                    ${book.arc ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:${categoryColors[key]}22;color:${categoryColors[key]};border:1px solid ${categoryColors[key]}33;">${book.arc}</span>` : ''}
                    ${book.adapts ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(59,130,246,0.12);color:#60a5fa;">${book.adapts}</span>` : ''}
                    ${book.illustrator ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.06);color:var(--text-dim);">Art: ${book.illustrator}</span>` : ''}
                    ${book.character ? `<span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(168,85,247,0.12);color:#c084fc;">${book.character}</span>` : ''}
                  </div>
                  ${book.description ? `<p style="font-size:13px;color:var(--text-secondary);line-height:1.6;">${book.description}</p>` : ''}
                  ${book.plot ? `<p style="font-size:12px;color:var(--text-dim);margin-top:8px;line-height:1.5;">${book.plot.substring(0, 150)}...</p>` : ''}
                  ${book.contents ? `
                    <div style="margin-top:10px;">
                      <div style="font-size:11px;color:var(--text-dim);margin-bottom:4px;">Contents:</div>
                      <div style="display:flex;flex-wrap:wrap;gap:4px;">
                        ${book.contents.map(c => `<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:rgba(16,185,129,0.1);color:#34d399;">${c}</span>`).join('')}
                      </div>
                    </div>` : ''}
                  ${hasPage ? `<p style="font-size:11px;color:var(--accent-fire);margin-top:10px;">View full details →</p>` : ''}
                </div>${tagEnd}`;
              }).join('')}
            </div>
          </div>
        `).join('')}

        <div class="glass" style="padding:32px;margin-top:32px;text-align:center;">
          <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:12px;">Publication Timeline</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
            ${[
              {y:2012,b:'Book 1'},{y:2013,b:'Books 2-3'},{y:2014,b:'Books 4-5'},
              {y:2015,b:'Book 6'},{y:2016,b:'Books 7, Legends #1, Winglets'},{y:2017,b:'Books 8-9'},
              {y:2018,b:'Books 10-11, GN #1'},{y:2019,b:'Books 12-13, GN #2-3'},{y:2020,b:'Legends #2, GN #4'},
              {y:2021,b:'Book 14, GN #5'},{y:2022,b:'Book 15, Ultimate Guide'},{y:2023,b:'Guide to Dragon World'},
              {y:2024,b:'Legends #3, Book 16'},{y:'2026+',b:'GN #6, Arc 4 continues'}
            ].map(t => `
              <div style="padding:8px 14px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);text-align:center;min-width:100px;">
                <div style="font-family:'Cinzel',serif;font-size:13px;font-weight:700;color:var(--accent-fire);">${t.y}</div>
                <div style="font-size:11px;color:var(--text-dim);margin-top:2px;">${t.b}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

// ===== NEWS PAGE =====
function renderNewsPage() {
  const categoryColors = {
    'Book Release': '#E47752',
    'Cover Reveal': '#E47752',
    'Graphic Novel': '#E47752',
    'Upcoming': '#E47752',
    'Adaptation': '#E47752',
    'Announcement': '#E47752',
    'Community': '#E47752'
  };

  return `
    <section class="section" style="padding-top:30px;">
      <div class="container">
        <div class="section__header">
          <div class="section__label">Stay Updated</div>
          <h2 class="section__title">Upcoming News</h2>
          <p class="section__desc">The latest announcements, releases, and updates from the Wings of Fire universe. Live feed from @WingsOfFireNews.</p>
        </div>

        <!-- Live Feed + Twitter -->
        <div style="display:grid;grid-template-columns:1fr 380px;gap:32px;align-items:start;margin-bottom:48px;">
          <div style="display:flex;flex-direction:column;gap:20px;">
            ${NEWS_DATA.map((item, i) => `
              <div class="glass glass--card" style="padding:24px;animation:cardFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 * i}s both;">
                <div style="display:flex;align-items:flex-start;gap:16px;">
                  <div style="width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;background:rgba(255,255,255,0.06);flex-shrink:0;">${renderWikiIcon(newsArtFor(item, i), item.title, 48)}</div>
                  <div style="flex:1;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
                      ${item.hot ? '<span style="padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(239,68,68,0.2);color:#f87171;border:1px solid rgba(239,68,68,0.3);">NEW</span>' : ''}
                      <span style="font-size:12px;padding:3px 10px;border-radius:6px;background:${categoryColors[item.category] || '#666'}22;color:${categoryColors[item.category] || '#999'};border:1px solid ${categoryColors[item.category] || '#666'}33;">${item.category}</span>
                      <span style="font-size:12px;color:var(--text-dim);">${item.date}</span>
                    </div>
                    <h3 style="font-family:'Cinzel',serif;font-size:17px;font-weight:700;margin-bottom:8px;">${item.title}</h3>
                    <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;">${item.summary}</p>
                    ${item.link ? `<a href="${item.link}" onclick="event.preventDefault(); navigate('${item.link.split('page=')[1].split('&')[0]}','${item.link.split('id=')[1] || ''}')" style="display:inline-block;margin-top:10px;font-size:13px;color:var(--accent-fire);text-decoration:none;">Read more →</a>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Twitter Sidebar -->
          <div>
            <div class="glass" style="padding:20px;position:sticky;top:90px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span style="font-size:24px;">${renderWikiIcon(newsArtFor({ title: 'Live news' }, 3), 'Wings of Fire News', 32)}</span>
                  <div>
                    <h3 style="font-family:'Cinzel',serif;font-size:16px;font-weight:700;">@WingsOfFireNews</h3>
                    <p style="font-size:11px;color:var(--accent-rain);">● Live — auto-updates every 5 min</p>
                  </div>
                </div>
                <button onclick="refreshTwitter()" style="background:rgba(255,255,255,0.08);border:1px solid var(--glass-border);color:var(--text-dim);padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;font-family:inherit;transition:all 0.2s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-dim)'">↻ Refresh</button>
              </div>
              <div id="twitterTimeline" style="min-height:400px;"></div>
              <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;">
                <span id="twitterLastUpdated" style="font-size:11px;color:var(--text-dim);"></span>
                <a href="https://x.com/WingsOfFireNews" target="_blank" rel="noopener" class="btn btn--glass" style="font-size:12px;padding:8px 16px;text-decoration:none;">Follow on X →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Archived News -->
        <div style="margin-top:20px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
            <span style="font-size:28px;">${renderWikiIcon(newsArtFor({ title: 'News Archive' }, 5), 'News Archive', 40)}</span>
            <div>
              <h3 style="font-family:'Cinzel',serif;font-size:22px;font-weight:700;">News Archive</h3>
              <p style="font-size:14px;color:var(--text-secondary);">All past announcements, releases, and updates — sorted by date.</p>
            </div>
          </div>

          <!-- Filter Pills -->
          <div class="filter-bar" style="justify-content:flex-start;margin-bottom:20px;">
            <button class="filter-pill filter-pill--active" onclick="filterNews('all', this)">All</button>
            <button class="filter-pill" onclick="filterNews('Book Release', this)">Book Releases</button>
            <button class="filter-pill" onclick="filterNews('Cover Reveal', this)">Cover Reveals</button>
            <button class="filter-pill" onclick="filterNews('Graphic Novel', this)">Graphic Novels</button>
            <button class="filter-pill" onclick="filterNews('Upcoming', this)">Upcoming</button>
            <button class="filter-pill" onclick="filterNews('Adaptation', this)">Adaptations</button>
          </div>

          <div id="archiveGrid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;">
            ${ARCHIVE_DATA.map((item, i) => `
              <div class="glass glass--card archive-item" style="padding:18px;animation:cardFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.04 * i}s both;" data-category="${item.category}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                  <span style="font-size:20px;">${renderWikiIcon(newsArtFor(item, i), item.title, 32)}</span>
                  <span style="font-size:11px;padding:2px 8px;border-radius:6px;background:${categoryColors[item.category] || '#666'}22;color:${categoryColors[item.category] || '#999'};border:1px solid ${categoryColors[item.category] || '#666'}33;">${item.category}</span>
                </div>
                <h4 style="font-family:'Cinzel',serif;font-size:14px;font-weight:700;margin-bottom:4px;line-height:1.3;">${item.title}</h4>
                <p style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">${item.date}</p>
                <p style="font-size:12px;color:var(--text-secondary);line-height:1.5;">${item.summary.substring(0, 120)}${item.summary.length > 120 ? '...' : ''}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass" style="padding:28px;margin-top:40px;text-align:center;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:8px;">Never Miss an Update</h3>
          <p style="font-size:14px;color:var(--text-secondary);margin-bottom:16px;">Follow @WingsOfFireNews on X for real-time announcements about new books, covers, and series news.</p>
          <a href="https://x.com/WingsOfFireNews" target="_blank" rel="noopener" class="btn btn--primary" style="text-decoration:none;">${renderWikiIcon(newsArtFor({ title: 'Follow news' }, 7), 'Wings of Fire News', 32)} Follow @WingsOfFireNews</a>
        </div>
      </div>
    </section>
    <style>
      @media (max-width: 1100px) {
        .section .container > div[style*="grid-template-columns: 1fr 380px"] { grid-template-columns: 1fr !important; }
        #archiveGrid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 700px) {
        #archiveGrid { grid-template-columns: 1fr !important; }
      }
    </style>`;
}

// ===== COMMENTS SYSTEM =====
function getAnonId() {
  let id = localStorage.getItem('wof_anon_id');
  if (!id) { id = 'anon_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36); localStorage.setItem('wof_anon_id', id); }
  return id;
}
function getComments() {
  try {
    const parsed = JSON.parse(localStorage.getItem('wof_comments') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // A manually edited or corrupted localStorage value should not break the
    // entire comments page.
    return [];
  }
}
function saveComments(comments) { localStorage.setItem('wof_comments', JSON.stringify(comments)); }
function addComment(text) {
  if (!text.trim()) return;
  const comments = getComments();
  comments.unshift({ id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6), anonId: getAnonId(), text: text.trim(), time: new Date().toISOString() });
  saveComments(comments);
}
function deleteComment(commentId) {
  const comments = getComments().filter(c => !(c.id === commentId && c.anonId === getAnonId()));
  saveComments(comments);
}
function deleteMyComments() {
  const myId = getAnonId();
  const comments = getComments().filter(c => c.anonId !== myId);
  saveComments(comments);
}
function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  return Math.floor(s/86400) + 'd ago';
}

function renderCommentsPage() {
  const comments = getComments();
  const myId = getAnonId();
  return `
    <section class="section" style="padding-top:30px;">
      <div class="container" style="max-width:800px;">
        <div class="section__header">
          <div class="section__label">Browser-only Notes</div>
          <h2 class="section__title">Comments</h2>
          <p class="section__desc">Leave an anonymous note about Wings of Fire. Notes are stored only in this browser; no account or server is used.</p>
        </div>

        <!-- Comment Form -->
        <div class="glass" style="padding:24px;margin-bottom:24px;">
          <h3 style="font-weight:800;font-size:15px;margin-bottom:12px;letter-spacing:-0.02em;">Leave a Comment</h3>
          <textarea id="commentInput" placeholder="Share your thoughts about Wings of Fire..." style="width:100%;min-height:100px;padding:14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:14px;color:var(--text-primary);background:var(--bg-inset);resize:vertical;outline:none;transition:border-color 0.2s var(--ease);" onfocus="this.style.borderColor='var(--accent-primary)'" onblur="this.style.borderColor='var(--border)'"></textarea>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
            <span style="font-size:12px;color:var(--text-tertiary);">Stored only in this browser. You can delete your notes anytime.</span>
            <button onclick="submitComment()" class="btn btn--primary" style="padding:10px 20px;">Post Comment</button>
          </div>
        </div>

        <!-- Comment Count + Delete All -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <span style="font-size:13px;color:var(--text-secondary);font-weight:600;">${comments.length} comment${comments.length !== 1 ? 's' : ''}</span>
          <button onclick="deleteAllMyComments()" style="background:none;border:1px solid var(--border);color:var(--text-tertiary);padding:6px 12px;border-radius:var(--radius-sm);font-size:12px;font-family:inherit;cursor:pointer;transition:all 0.2s var(--ease);" onmouseover="this.style.borderColor='var(--accent-fire)';this.style.color='var(--accent-fire)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-tertiary)'">Delete All My Comments</button>
        </div>

        <!-- Comments List -->
        <div id="commentsList" style="display:flex;flex-direction:column;gap:12px;">
          ${comments.length === 0 ? `
            <div style="text-align:center;padding:48px 24px;color:var(--text-tertiary);">
              <div style="font-size:40px;margin-bottom:12px;opacity:0.4;">${renderWikiIcon('generic', 'Comments', 40)}</div>
              <p style="font-size:14px;">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ` : comments.map(c => `
            <div class="glass" style="padding:16px;position:relative;" id="comment-${c.id}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <span style="font-size:12px;color:var(--text-tertiary);display:flex;align-items:center;gap:6px;">
                  <span style="width:24px;height:24px;border-radius:50%;background:var(--bg-inset);display:flex;align-items:center;justify-content:center;font-size:11px;">${renderWikiIcon('generic', 'Commenter', 20)}</span>
                  Anonymous · ${timeAgo(c.time)}
                </span>
                ${c.anonId === myId ? `<button onclick="deleteSingleComment('${c.id}')" style="background:none;border:none;color:var(--text-tertiary);font-size:12px;cursor:pointer;padding:4px 8px;border-radius:4px;transition:all 0.2s var(--ease);" onmouseover="this.style.color='var(--accent-fire)'" onmouseout="this.style.color='var(--text-tertiary)'">Delete</button>` : ''}
              </div>
              <p style="font-size:14px;color:var(--text-primary);line-height:1.6;">${escapeHtml(c.text)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function submitComment() {
  const input = document.getElementById('commentInput');
  if (!input || !input.value.trim()) return;
  addComment(input.value);
  input.value = '';
  navigate('comments');
}

function deleteSingleComment(id) {
  const myId = getAnonId();
  const comments = getComments().filter(c => !(c.id === id && c.anonId === myId));
  saveComments(comments);
  navigate('comments');
}

function deleteAllMyComments() {
  if (!confirm('Delete all your comments? This cannot be undone.')) return;
  deleteMyComments();
  navigate('comments');
}

function filterNews(category, el) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('filter-pill--active'));
  el.classList.add('filter-pill--active');
  document.querySelectorAll('.archive-item').forEach(item => {
    item.style.display = (category === 'all' || item.dataset.category === category) ? '' : 'none';
  });
}

// ===== Twitter Refresh =====
// ===== LEGAL PAGE =====
function renderLegalPage() {
  return `
    <section class="section" style="padding-top:30px;">
      <div class="container" style="max-width:900px;">
        <div class="section__header">
          <div class="section__label">Legal Framework</div>
          <h2 class="section__title">Legal Declaration & Licensing</h2>
          <p class="section__desc">Comprehensive legal notice for this independent fan wiki.</p>
        </div>

        <!-- Section 1: Text Licensing & Attribution -->
        <div class="glass" style="padding:32px;margin-bottom:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;color:var(--accent-fire);">I. Text Licensing & Attribution</h3>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.8;">
            <p style="margin-bottom:12px;">All original text content produced for this site is licensed under the <strong>Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)</strong> license. Under this license, any user may copy, distribute, display, and create derivative works of this content, provided that:</p>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">Attribution is given to this site as the original source, with a link to the corresponding page where the material first appeared.</li>
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">Any derivative work is distributed under the identical CC BY-SA 3.0 license or a compatible license.</li>
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">A clear, conspicuous attribution notice is preserved in all reproduced or adapted material.</li>
            </ul>
            <p style="margin-bottom:12px;">This site operates as an independent, non-commercial content fork from the Fandom-hosted Wings of Fire Wiki. In accordance with applicable copyright law and the terms of the CC BY-SA license under which the original wiki content was published, all migrated articles retain their original license and attribution requirements. Contributors and downstream users are legally obligated to preserve author attribution from the original Fandom source when reproducing or adapting content.</p>
            <p>The adoption of CC BY-SA 3.0 as the default site license ensures that all user contributions remain freely accessible while maintaining a consistent, enforceable licensing framework across the entire project.</p>
          </div>
        </div>

        <!-- Section 2: Fair Use & IP Disclaimer -->
        <div class="glass" style="padding:32px;margin-bottom:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;color:var(--accent-fire);">II. Fair Use & Intellectual Property Disclaimer</h3>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.8;">
            <p style="margin-bottom:12px;"><strong>Disclaimer of Affiliation:</strong> This website is an independent, fan-created reference resource. It is not affiliated with, endorsed by, sponsored by, or otherwise connected to <strong>Tui T. Sutherland</strong>, <strong>Scholastic Inc.</strong>, <strong>Scholastic Press</strong>, <strong>Fandom Inc.</strong>, or any of their subsidiaries, affiliates, or authorized representatives.</p>
            <p style="margin-bottom:12px;">All character names, book titles, series names, logos, cover artwork, character illustrations, maps, and other proprietary franchise materials displayed on this site are the exclusive intellectual property and registered trademarks of their respective owners, including but not limited to Tui T. Sutherland and Scholastic Inc.</p>
            <p style="margin-bottom:12px;">The use of such materials on this site is undertaken pursuant to the <strong>Fair Use doctrine</strong> as codified in Section 107 of the United States Copyright Act (17 U.S.C. &sect; 107). Such use is made in good faith for purposes of non-profit, educational, and encyclopedic commentary, criticism, and reference — purposes which are explicitly recognized as fair use under federal copyright law. No ownership claim is made over any third-party intellectual property.</p>
            <p>Any party that believes material on this site infringes upon their intellectual property rights is invited to contact the site administrators for prompt removal or attribution correction. This site is committed to full compliance with the Digital Millennium Copyright Act (DMCA) and will expeditiously remove any material found to be infringing upon valid copyright or trademark claims.</p>
          </div>
        </div>

        <!-- Section 3: User Contribution Agreement -->
        <div class="glass" style="padding:32px;margin-bottom:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;color:var(--accent-fire);">III. User Contribution Agreement</h3>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.8;">
            <p style="margin-bottom:12px;">By submitting, posting, or publishing any original content to this site — including but not limited to text edits, article revisions, commentary, summaries, analyses, or fan-created material — the contributor irrevocably grants to this site and its users a worldwide, royalty-free, perpetual, non-exclusive license to use, reproduce, distribute, display, and create derivative works of such content under the <strong>Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)</strong> license.</p>
            <p style="margin-bottom:12px;">This license is granted on the condition that:</p>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">The contributor warrants that they are the original author of the submitted content, or that they have obtained all necessary rights and permissions to license the content under CC BY-SA 3.0.</li>
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">The contributor warrants that the submitted content does not infringe upon any third-party copyright, trademark, trade secret, or other proprietary right.</li>
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">The contributor acknowledges that they will not be compensated for their contributions and that their content may be modified, adapted, or removed by site administrators at any time.</li>
              <li style="padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid var(--accent-fire);">The contributor retains copyright over their original work but grants the above irrevocable license as a condition of publication.</li>
            </ul>
            <p>Contributors who submit copyrighted or plagiarized material without proper authorization may have their contributions removed and their accounts restricted in accordance with site policy. Repeat violations may result in permanent account termination.</p>
          </div>
        </div>

        <!-- Section 4: MediaWiki Configuration -->
        <div class="glass" style="padding:32px;margin-bottom:24px;">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;color:var(--accent-fire);">IV. MediaWiki Configuration (Reference)</h3>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.8;">
            <p style="margin-bottom:12px;">For reference, the following MediaWiki configuration variables establish CC BY-SA 3.0 as the default site license:</p>
            <pre style="background:rgba(0,0,0,0.3);padding:16px;border-radius:10px;font-size:12px;color:var(--accent-ice);overflow-x:auto;font-family:'Courier New',monospace;line-height:1.6;margin-bottom:16px;"><code>// LocalSettings.php — License Configuration
$wgRightsUrl = "https://creativecommons.org/licenses/by-sa/3.0/";
$wgRightsText = "Creative Commons Attribution-ShareAlike 3.0 Unported";
$wgRightsIcon = "https://licensebuttons.net/l/by-sa/3.0/88x31.png";
$wgRightsCode = "by-sa";

$wgCopyrightWarning = "This page is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported license. By editing this page, you agree to license your contribution under the same terms.";
$wgGroupPermissions['user']['editmyusercss'] = true;
$wgGroupPermissions['user']['editmyuserjs'] = true;</code></pre>
            <p><strong>Template:Attribution</strong> (to be appended to migrated articles):</p>
            <pre style="background:rgba(0,0,0,0.3);padding:16px;border-radius:10px;font-size:12px;color:var(--accent-ice);overflow-x:auto;font-family:'Courier New',monospace;line-height:1.6;margin-bottom:16px;"><code>&lt;noinclude&gt;
{{documentation}}
[[Category:License templates]]
&lt;/noinclude&gt;
&lt;includeonly&gt;
&lt;div style="font-size:11px;color:#888;border-top:1px solid #ccc;padding-top:8px;margin-top:16px;"&gt;
  This article incorporates text from the
  [{{{source|https://wingsoffire.fandom.com}}} Wings of Fire Wiki (Fandom)],
  used under [https://creativecommons.org/licenses/by-sa/3.0/ CC BY-SA 3.0].
  Original authors are attributed in the page history.
&lt;/div&gt;
&lt;/includeonly&gt;</code></pre>
            <p><strong>MediaWiki:Copyrightwarning</strong> (edit warning):</p>
            <pre style="background:rgba(0,0,0,0.3);padding:16px;border-radius:10px;font-size:12px;color:var(--accent-ice);overflow-x:auto;font-family:'Courier New',monospace;line-height:1.6;"><code>You are contributing to an independent fan wiki licensed under CC BY-SA 3.0.

By saving this edit, you agree that your contribution will be licensed under
the Creative Commons Attribution-ShareAlike 3.0 Unported license.

You warrant that:
- This is your original work, OR you have permission to license it under CC BY-SA 3.0
- It does not infringe any third-party copyright or trademark
- You will not submit copyrighted material without proper authorization

Violations may result in content removal and account restriction.

By clicking "Save changes", you agree to the
[[Project:Copyrights|Terms of Contribution]].</code></pre>
          </div>
        </div>

        <div style="text-align:center;padding:20px;">
          <a href="?page=home" onclick="event.preventDefault(); navigate('home')" class="btn btn--glass" style="text-decoration:none;">← Return to Home</a>
        </div>
      </div>
    </section>`;
}

// ===== LEGEND PAGE =====
function renderLegendPage(id) {
  const legend = BOOK_LIBRARY.legends.books.find(b => b.id === id);
  if (!legend) return '<div class="container" style="padding:100px 24px;"><h2>Legend not found</h2></div>';

  return `
    <div class="book-detail">
      <a class="back-link" href="?page=library" onclick="event.preventDefault(); navigate('library')">← Back to Library</a>

      <div class="book-detail__header" style="align-items:center;">
        <div class="book-detail__cover" style="background:radial-gradient(circle at 40% 30%, rgba(245,158,11,0.3), rgba(245,158,11,0.05), transparent);border-radius:20px;">
          ${renderWikiIcon('night', legend.title, 96)}
        </div>
        <div style="flex:1;">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-fire);font-weight:600;">Legends #${legend.number}</p>
          <h1 style="font-family:'Cinzel',serif;font-size:clamp(28px,4vw,38px);margin:8px 0;">${legend.title}</h1>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:var(--accent-fire);">Legends</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${legend.year}</span>
          </div>
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Overview</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${legend.description}</p>
      </div>

      <div class="glass" style="padding:32px;margin-top:20px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Plot</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${legend.plot}</p>
      </div>

      <div class="glass" style="padding:32px;margin-top:20px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Setting</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${legend.setting}</p>
      </div>

      <div class="glass" style="padding:32px;margin-top:20px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Characters</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${legend.characters.map(c => `
            <div style="padding:16px;background:rgba(255,255,255,0.04);border-radius:12px;border-left:3px solid var(--accent-fire);">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <strong style="color:var(--text-primary);font-size:15px;">${c.name}</strong>
                <span class="detail-dragon-role">${c.role}</span>
              </div>
              <p style="color:var(--text-secondary);font-size:13px;margin-top:6px;line-height:1.6;">${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      ${legend.themes ? `
      <div class="glass" style="padding:32px;margin-top:20px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Themes</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${legend.themes.map(t => `<span style="padding:8px 16px;border-radius:10px;font-size:14px;background:rgba(255,107,53,0.12);border:1px solid rgba(255,107,53,0.25);color:var(--accent-fire);">${t}</span>`).join('')}
        </div>
      </div>` : ''}
    </div>`;
}

// ===== WINGLET PAGE =====
function renderWingletPage(id) {
  const winglet = BOOK_LIBRARY.winglets.books.find(b => b.id === id);
  if (!winglet) return '<div class="container" style="padding:100px 24px;"><h2>Winglet not found</h2></div>';

  return `
    <div class="book-detail">
      <a class="back-link" href="?page=library" onclick="event.preventDefault(); navigate('library')">← Back to Library</a>

      <div class="book-detail__header" style="align-items:center;">
        <div class="book-detail__cover" style="background:radial-gradient(circle at 40% 30%, rgba(168,85,247,0.3), rgba(168,85,247,0.05), transparent);border-radius:20px;width:140px;height:200px;">
          ${renderWikiIcon('sky', winglet.title, 80)}
        </div>
        <div style="flex:1;">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-night);font-weight:600;">Winglet</p>
          <h1 style="font-family:'Cinzel',serif;font-size:clamp(28px,4vw,38px);margin:8px 0;">${winglet.title}</h1>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:var(--accent-night);">Winglet</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${winglet.year}</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${winglet.character}</span>
          </div>
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Plot</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${winglet.plot}</p>
      </div>

      <div class="glass" style="padding:32px;margin-top:20px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Setting</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${winglet.setting}</p>
      </div>
    </div>`;
}

function renderAuthorPage() {
  const a = AUTHOR_INFO;
  return `
    <section class="section" style="padding-top:40px;">
      <div class="container">
        <a class="back-link" href="?page=home" onclick="event.preventDefault(); navigate('home')">← Home</a>

        <div class="author-hero">
          <div class="author-hero__photo">
            ${renderWikiIcon(authorArtFor('hero'), a.name, 96)}
          </div>
          <div class="author-hero__info">
            <h1 style="font-family:'Cinzel',serif;font-size:clamp(28px,4vw,40px);margin-bottom:8px;">${a.name}</h1>
            <p style="color:var(--text-secondary);margin-bottom:16px;">${a.nationality} Author · Born ${a.birthplace}, ${a.born}</p>
            <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${a.bio}</p>
          </div>
        </div>

        <div class="detail-content" style="padding-top:0;">
          <div class="glass" style="padding:32px;">
            <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;color:var(--accent-fire);">The Inspiration Behind Wings of Fire</h3>
            <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${a.inspiration}</p>
          </div>

          <div class="glass" style="padding:32px;margin-top:24px;">
            <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;color:var(--accent-fire);">Achievements</h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
              ${a.achievements.map((ach, i) => `<li style="color:var(--text-secondary);font-size:14px;padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:10px;border-left:3px solid var(--accent-fire);">${renderWikiIcon(authorArtFor('achievement', i), ach, 20)} ${ach}</li>`).join('')}
            </ul>
          </div>

          <div class="glass" style="padding:32px;margin-top:24px;">
            <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;color:var(--accent-fire);">Other Works</h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
              ${a.otherWorks.map((w, i) => `<li style="color:var(--text-secondary);font-size:14px;padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:10px;">${renderWikiIcon(authorArtFor('work', i), w, 20)} ${w}</li>`).join('')}
            </ul>
          </div>

          <div class="related-section">
            <h3>About the Series</h3>
            <div class="glass" style="padding:32px;margin-top:16px;">
              <div class="stats-row" style="margin:0;">
                <div class="stat">
                  <div class="stat__number">15</div>
                  <div class="stat__label">Main Novels</div>
                </div>
                <div class="stat">
                  <div class="stat__number">50M+</div>
                  <div class="stat__label">Copies Sold</div>
                </div>
                <div class="stat">
                  <div class="stat__number">38+</div>
                  <div class="stat__label">Languages</div>
                </div>
              </div>
              <p style="color:var(--text-secondary);font-size:14px;text-align:center;margin-top:16px;">${SERIES_INFO.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

// ===== TRIBE DETAIL PAGE =====
function renderTribePage(id) {
  const t = TRIBES.find(tr => tr.id === id);
  if (!t) return '<div class="container" style="padding:100px 24px;"><h2>Tribe not found</h2></div>';
  const tribeChars = ALL_CHARACTERS.filter(c => characterResolvedTribeId(c) === id);

  return `
    <div class="book-detail">
      <a class="back-link" href="?page=world" onclick="event.preventDefault(); navigate('world')">← Back to World</a>

      <div class="book-detail__header" style="align-items:center;">
        <div class="book-detail__cover" style="background:radial-gradient(circle at 40% 30%, ${t.color}55, ${t.color}18, transparent);border-radius:20px;">
          <span style="position:relative;z-index:2;">${renderWikiIcon(t.id, t.name, 96)}</span>
        </div>
        <div style="flex:1;">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-fire);font-weight:600;">${t.continent === 'pyrrhia' ? 'Continent of Pyrrhia' : 'Continent of Pantala'}</p>
          <h1 style="font-family:'Cinzel',serif;font-size:clamp(28px,4vw,42px);margin:8px 0;">${t.name}</h1>
          <div class="hero__tags" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
            <span class="tribe-${t.id}" style="padding:5px 12px;border-radius:8px;font-size:13px;">${renderWikiIcon(t.id, t.name, 20)} ${t.name}</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${t.continent === 'pyrrhia' ? 'Pyrrhia' : 'Pantala'}</span>
          </div>
        </div>
      </div>

      <div class="detail-content" style="padding-top:0;">
        <div class="glass">
          <h3 class="detail-card-header">About</h3>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${t.description}</p>
        </div>

        <div class="glass">
          <h3 class="detail-card-header">Physical Appearance</h3>
          <p class="detail-text">${t.appearance}</p>
        </div>

        <div class="glass">
          <h3 class="detail-card-header">Habitat</h3>
          <p class="detail-text">${renderWikiIcon(t.id, t.name, 20)} ${t.habitat}</p>
        </div>

        <div class="detail-grid-2">
          <div class="glass">
            <h3 class="detail-card-header">Abilities</h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
              ${t.abilities.map(a => `<li style="color:var(--text-secondary);font-size:13px;padding:10px 14px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid ${t.color};">${renderWikiIcon(t.id, t.name, 18)} ${a}</li>`).join('')}
            </ul>
          </div>
          <div class="glass">
            <h3 class="detail-card-header">Weaknesses</h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
              ${t.weaknesses.map(w => `<li class="detail-list-item detail-list-item--error">${renderWikiIcon(t.id, t.name, 18)} ${w}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="glass">
          <h3 class="detail-card-header">Personality & Culture</h3>
          <p style="color:var(--text-secondary);font-size:14px;line-height:1.8;margin-bottom:12px;"><strong style="color:var(--text-primary);">Personality:</strong> ${t.personality}</p>
          <p class="detail-text">${t.culture}</p>
        </div>

        <div class="glass">
          <h3 class="detail-card-header">History</h3>
          <p class="detail-text">${t.history}</p>
        </div>

        ${t.notableDragons.length > 0 ? `
        <div class="glass">
          <h3 style="font-family:'Cinzel',serif;font-size:18px;margin-bottom:16px;color:var(--accent-fire);">Notable Dragons</h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${t.notableDragons.map(d => `
              <div style="padding:16px;background:rgba(255,255,255,0.04);border-radius:12px;border-left:3px solid ${t.color};">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                  <strong style="color:var(--text-primary);font-size:15px;">${d.name}</strong>
                  <span class="detail-dragon-role">${d.role}</span>
                </div>
                <p style="color:var(--text-secondary);font-size:13px;margin-top:6px;line-height:1.6;">${d.description}</p>
              </div>
            `).join('')}
          </div>
        </div>` : ''}

        <div class="glass">
          <h3 class="detail-card-header">Relationships & Politics</h3>
          ${t.relationships ? `
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
              <div>
                <div class="detail-relation-col">Allies</div>
                ${t.relationships.allies.map(a => `<p class="detail-relation-item detail-relation-allies">${a}</p>`).join('')}
              </div>
              <div>
                <div class="detail-relation-col">Rivals</div>
                ${t.relationships.rivals.map(r => `<p class="detail-relation-item detail-relation-rivals">${r}</p>`).join('')}
              </div>
              <div>
                <div class="detail-relation-col">Trades</div>
                ${t.relationships.trades.map(tr => `<p class="detail-relation-item detail-relation-trades">${tr}</p>`).join('')}
              </div>
            </div>` : ''}
        </div>

        <div class="glass">
          <h3 class="detail-card-header">Symbol</h3>
          <p class="detail-text">${t.symbol}</p>
        </div>

        ${tribeChars.length > 0 ? `
        <div class="related-section">
          <h3>Characters from ${t.name}</h3>
          <div class="grid grid--3" style="margin-top:16px;">
            ${tribeChars.map(c => renderCharCard(c)).join('')}
          </div>
        </div>` : ''}
      </div>
    </div>`;
}

// ===== ARC DETAIL PAGE =====
function renderArcPage(id) {
  const arc = ARCS.find(a => a.id === parseInt(id));
  if (!arc) return '<div class="container" style="padding:100px 24px;"><h2>Arc not found</h2></div>';
  const arcBooks = BOOKS.filter(b => b.arc === arc.id);
  const arcChars = CHARACTERS.filter(c => c.arc === arc.id);
  const arcTribe = ['sky', 'night', 'silk', 'sand'][arc.id - 1];

  return `
    <div class="book-detail">
      <a class="back-link" href="?page=books" onclick="event.preventDefault(); navigate('books')">← Back to Books</a>

      <div class="book-detail__header" style="align-items:center;">
        <div class="book-detail__cover" style="background:radial-gradient(circle at 40% 30%, rgba(255,107,53,0.3), rgba(255,107,53,0.05), transparent);border-radius:20px;">
          <span style="position:relative;z-index:2;">${renderWikiIcon(arcTribe, arc.name, 96)}</span>
        </div>
        <div style="flex:1;">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-fire);font-weight:600;">Arc ${arc.id} of 3</p>
          <h1 style="font-family:'Cinzel',serif;font-size:clamp(24px,4vw,38px);margin:8px 0;">${arc.name}</h1>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:rgba(255,107,53,0.15);border:1px solid rgba(255,107,53,0.3);color:var(--accent-fire);">${arc.books}</span>
            <span style="padding:5px 12px;border-radius:8px;font-size:13px;background:var(--glass-bg);border:1px solid var(--glass-border);">${arc.years}</span>
          </div>
        </div>
      </div>

      <div class="glass" style="padding:32px;margin-top:24px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Overview</h3>
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;">${arc.description}</p>
      </div>

      <div style="margin-top:32px;">
        <h3 style="font-family:'Cinzel',serif;font-size:20px;margin-bottom:16px;">Books in This Arc</h3>
        <div class="grid grid--3">
          ${arcBooks.map(b => renderBookCard(b)).join('')}
        </div>
      </div>

      <div class="related-section">
        <h3>Protagonists</h3>
        <div class="grid grid--3" style="margin-top:16px;">
          ${arcChars.map(c => renderCharCard(c)).join('')}
        </div>
      </div>
    </div>`;
}

// ===== Main Render =====

function render404() {
  return `
    <div class="container" style="text-align:center; padding:100px 24px;">
      <h1 style="font-family:'Cinzel',serif; font-size:48px; color:var(--accent-primary);">404</h1>
      <p style="font-size:18px; color:var(--text-secondary);">The dragon you are looking for has flown away.</p>
      <a href="?page=home" class="btn btn--primary" style="margin-top:20px; display:inline-block;">Return to Pyrrhia</a>
    </div>
  `;
}

function renderPage() {
  const { page, id } = getRoute();
  const app = document.getElementById('app');
  if (!app) return;

  try {
    const content = (() => {
      switch(page) {
        case 'home': return renderHomePage();
        case 'characters': return renderCharactersPage();
        case 'character': return renderCharacterPage(id);
        case 'books': return renderBooksPage();
        case 'book': return renderBookPage(id);
        case 'tribe': return renderTribePage(id);
        case 'arc': return renderArcPage(id);
        case 'library': return renderLibraryPage();
        case 'news': return renderNewsPage();
        case 'comments': return typeof window.renderCommentsPage === 'function' && window.renderCommentsPage !== renderCommentsPage ? window.renderCommentsPage() : renderCommentsPage();
        case 'legal': return renderLegalPage();
        case 'legend': return renderLegendPage(id);
        case 'winglet': return renderWingletPage(id);
        case 'world': return renderWorldPage();
        case 'author': return renderAuthorPage();
        default: return render404();
      }
    })();

    app.innerHTML = renderBg() + renderNav(page) + `<main class="main">${content}</main>` + renderFooter() + renderSearchModal();
    app.setAttribute('aria-busy', 'false');
  } catch (error) {
    app.setAttribute('aria-busy', 'false');
    app.innerHTML = `<main class="main"><div class="container" style="padding:100px 24px;text-align:center;"><h1>Wings of Fire</h1><p>We could not load this page. Please refresh and try again.</p></div></main>`;
    console.error('Wings of Fire render error:', error);
    return;
  }
  setupEvents();
  const state = loadPageState();
  if (state && state.page === getRoute().page) {
    setTimeout(() => window.scrollTo(0, state.scroll), 100);
  }
  animateOnScroll();

  // The app is a client-side router, so page-specific integrations must be
  // initialized after every render, not only during the first page load.
  if (document.getElementById('twitterTimeline')) {
    loadTwitterWidget();
  } else if (twitterRefreshInterval) {
    clearInterval(twitterRefreshInterval);
    twitterRefreshInterval = null;
  }
}

// ===== Global Listeners (run once) =====
let globalListenersInitialized = false;

function savePageState() {
  const state = {
    page: getRoute().page,
    id: getRoute().id,
    scroll: window.scrollY
  };
  try { localStorage.setItem('wof_state', JSON.stringify(state)); } catch (error) { console.warn('Unable to save page state:', error); }
}

function loadPageState() {
  let saved;
  try { saved = localStorage.getItem('wof_state'); } catch (error) { return null; }
  if (!saved) return null;
  try { return JSON.parse(saved); } catch (error) {
    try { localStorage.removeItem('wof_state'); } catch (removeError) { /* storage may be unavailable */ }
    return null;
  }
}

function initGlobalListeners() {
  if (globalListenersInitialized) return;
  globalListenersInitialized = true;

  // Keyboard shortcut — Cmd/Ctrl+K to open search, Escape to close
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') {
      closeSearch();
      const menu = document.getElementById('navLinks');
      const toggle = document.getElementById('menuToggle');
      if (menu?.classList.contains('nav__links--open')) {
        menu.classList.remove('nav__links--open');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.setAttribute('aria-label', 'Open navigation menu');
        toggle?.focus();
      }
    }
  });

  // Use an intersection sentinel instead of a scroll handler so the fixed
  // navigation does not force layout work on every frame.
  const scrollSentinel = document.createElement('div');
  scrollSentinel.id = 'scrollSentinel';
  scrollSentinel.setAttribute('aria-hidden', 'true');
  scrollSentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
  document.body.prepend(scrollSentinel);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(([entry]) => {
      const nav = document.getElementById('mainNav');
      nav?.classList.toggle('nav--scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    navObserver.observe(scrollSentinel);
  }
}

// ===== Page-Specific Events (re-bound on each render) =====
function setupEvents() {
  // Search
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');
  const searchOverlay = document.getElementById('searchOverlay');

  searchToggle?.addEventListener('click', openSearch);
  searchInput?.addEventListener('input', (e) => performSearch(e.target.value));
  searchOverlay?.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });

  // Hamburger menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.addEventListener('click', () => {
    if (!navLinks) return;
    const isOpen = navLinks.classList.toggle('nav__links--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  }));
}

// ===== Scroll Animations (bidirectional fade-in/fade-out) =====
let scrollObserver = null;
function animateOnScroll() {
  if (scrollObserver) scrollObserver.disconnect();

  var SELECTORS = [
    '.section__header',
    '.stats-row',
    '.stat',
    '.grid .glass--card',
    '.grid .char-card',
    '.grid .book-card',
    '.grid .tribe-card',
    '.grid .continent-card',
    '.detail-content__section',
    '.detail-hero',
    '.book-detail__header',
    '.author-hero',
    '.glass--card',
    '.filter-pill',
    '.carousel'
  ].join(', ');

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-fade--visible');
      } else {
        entry.target.classList.remove('scroll-fade--visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(SELECTORS).forEach((el, i) => {
    if (el.closest('.hero, .nav, .nav__links, header, #staticFooter')) return;
    if (!el.classList.contains('scroll-fade')) {
      el.classList.add('scroll-fade');
      el.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
    }
    scrollObserver.observe(el);
  });
}

// ===== Twitter Widget =====
let twitterRefreshInterval = null;

function loadTwitterWidget() {
  const container = document.getElementById('twitterTimeline');
  if (!container) return;

  // Create the embed element
  if (!container.querySelector('.twitter-timeline')) {
    const a = document.createElement('a');
    a.className = 'twitter-timeline';
    a.setAttribute('data-height', '500');
    a.setAttribute('data-theme', 'dark');
    a.setAttribute('data-chrome', 'nofooter noborders transparent');
    a.href = 'https://twitter.com/WingsOfFireNews';
    a.textContent = 'Tweets by WingsOfFireNews';
    container.appendChild(a);
  }

  // Load Twitter widget script if not already loaded
  if (!document.getElementById('twitter-wjs')) {
    const s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.src = 'https://platform.twitter.com/widgets.js';
    s.async = true;
    s.charset = 'utf-8';
    document.body.appendChild(s);
  } else if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load(container);
  }

  // Update timestamp
  updateTwitterTimestamp();

  // Auto-refresh every 5 minutes
  clearInterval(twitterRefreshInterval);
  twitterRefreshInterval = setInterval(() => {
    const tc = document.getElementById('twitterTimeline');
    if (tc && tc.isConnected) {
      loadTwitterWidget();
    } else {
      clearInterval(twitterRefreshInterval);
    }
  }, 5 * 60 * 1000);
}

function updateTwitterTimestamp() {
  const el = document.getElementById('twitterLastUpdated');
  if (el) {
    const now = new Date();
    el.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

function refreshTwitter() {
  const container = document.getElementById('twitterTimeline');
  if (container) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-dim);font-size:13px;">Loading latest tweets...</div>';
    setTimeout(() => loadTwitterWidget(), 500);
  }
}

// ===== Carousel Scroll =====
function scrollCarousel(dir) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const itemWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 14 : 194; // 180 + 14 gap
  track.scrollBy({ left: dir * itemWidth * 3, behavior: 'smooth' });
  // Update progress bar
  setTimeout(() => {
    const bar = document.getElementById('carouselProgress');
    if (bar) {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pct = maxScroll > 0 ? (track.scrollLeft / maxScroll) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(10, pct)) + '%';
    }
  }, 350);
}

// ===== Smooth Scroll =====
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== Copy to Clipboard =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!')).catch(() => {
    const t = document.createElement('textarea'); t.value = text;
    document.body.appendChild(t); t.select(); document.execCommand('copy');
    document.body.removeChild(t); showToast('Copied!');
  });
}

// ===== Toast Notification =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== Share Page =====
function sharePage() {
  if (navigator.share) {
    navigator.share({ title: document.title, url: window.location.href });
  } else {
    copyToClipboard(window.location.href);
  }
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);
  const scrollSentinel = document.getElementById('scrollSentinel');
  if (scrollSentinel && 'IntersectionObserver' in window) {
    const topObserver = new IntersectionObserver(([entry]) => {
      btn.classList.toggle('visible', !entry.isIntersecting);
    }, { rootMargin: '300px 0px 0px', threshold: 0 });
    topObserver.observe(scrollSentinel);
  }
}

// Public hooks used by the optional backend integration.
window.getRoute = getRoute;
window.renderPage = renderPage;
window.renderCommentsPage = renderCommentsPage;

function loadOptionalBackend() {
  if (document.getElementById('zion-backend-script')) return;
  const backend = document.createElement('script');
  backend.id = 'zion-backend-script';
  backend.src = 'zion-backend.js';
  backend.async = true;
  backend.onload = () => window.renderPage();
  backend.onerror = () => console.warn('Optional Zion backend could not be loaded.');
  document.body.appendChild(backend);
}

// ===== Init =====
window.addEventListener('popstate', renderPage);
window.addEventListener('beforeunload', savePageState);
document.addEventListener('DOMContentLoaded', () => {
  initGlobalListeners();
  renderPage();
  initBackToTop();
  loadOptionalBackend();
  // SEO: update title and meta per route
  const titles = { home: 'Wings of Fire — Ultimate Dragon Fantasy Encyclopedia | Characters, Books & World', characters: 'Characters — Wings of Fire | Meet All 18 Dragon Heroes', books: 'All Wings of Fire Books — Series, Legends & Graphic Novels', world: 'World of Wings of Fire — Pyrrhia & Pantala', library: 'Library — Wings of Fire | Fan-Created Content', news: 'Wings of Fire News — Latest Updates & Releases', comments: 'Community — Wings of Fire | Fan Comments & Discussion', legal: 'Legal — Wings of Fire', author: 'Author — Wings of Fire | Tui T. Sutherland' };
  const metaDescs = { home: 'Explore 10 dragon tribes, 16+ novels, and four epic arcs.', characters: 'All 18 protagonists across four story arcs.', books: 'Every Wings of Fire book — main series, legends, winglets, graphic novels.', world: 'The world of Pyrrhia and Pantala — two continents, ten tribes.' };
  const { page } = getRoute();
  document.title = titles[page] || titles.home;
  // Store original title for tab visibility restore
  document.documentElement.dataset.originalTitle = document.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', metaDescs[page] || metaDescs.home);
  const canonical = document.querySelector('link[rel="canonical"]');
  const cleanUrl = new URL(window.location.href);
  cleanUrl.search = '';
  cleanUrl.hash = '';
  if (canonical) canonical.href = cleanUrl.href;
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', cleanUrl.href);
});


  (function() {
    var WINGS_HOOKS = [
      'The dragons miss you! Come back!',
      'Pyrrhia awaits your return, dragonet!',
      'The SeaWings are calling you back!',
      'A Thunderwing needs you — come back!',
      'The NightWings are watching... come back!',
      'Destiny awaits at the Peak — return!',
      'The Dragonets of Destiny need you!',
      'Pyrrhia\'s fate hangs in the balance — return!'
    ];
    var hookIndex = 0;
    var savedTitle = '';

    function getOriginalTitle() {
      return document.documentElement.dataset.originalTitle || document.title;
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        savedTitle = getOriginalTitle();
        document.title = WINGS_HOOKS[hookIndex % WINGS_HOOKS.length];
        hookIndex++;
      } else {
        document.title = savedTitle || getOriginalTitle();
        // Keep original title in sync if it was changed by route logic
        var currentOriginal = getOriginalTitle();
        if (document.title !== currentOriginal) {
          document.documentElement.dataset.originalTitle = document.title;
        }
      }
    });
  })();
