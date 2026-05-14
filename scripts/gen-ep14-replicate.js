const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-14",
    prompt: "Dark cyberpunk noir illustration of a lone hacker silhouette standing inside a cramped neon-lit safehouse, surrounded by floating holographic activity logs of seven crew members, one log pulsing red with suspicion, rain-streaked window with neon megacity bleeding light behind, tense atmosphere of distrust and betrayal within the crew, cyberpunk hacker aesthetic",
  },
  {
    id: "14-1",
    prompt: "a single USB drive resting on a steel table inside a dim safehouse, a glowing holographic decryption note hovering above it listing key-generation rules, neon city rain dripping down a tall window in the background, cold tense quiet of a long stakeout week, cyberpunk noir aesthetic",
  },
  {
    id: "14-2",
    prompt: "a holographic communication log floating above a desk showing three identical encrypted external connections all timestamped 02:13 AM, glowing timeline graph with a suspiciously perfect repeating pattern, dark monitoring station glow, unsettling realization atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "14-3",
    prompt: "a private server terminal cracked open displaying an intercepted encrypted message to OMNICORP SECURITY reading AWAITING PAYMENT, redacted credit amount, the name VIPER glowing on screen as a hidden key, betrayal and nausea in the cold server light, cyberpunk noir aesthetic",
  },
  {
    id: "14-4",
    prompt: "a glowing red emergency lockdown control panel blinking inside a cramped safehouse, a kicked-over chair near a doorway, code rules displayed on the panel screen, blast doors beginning to seal, frantic tense confrontation aftermath, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.14 '내부자'" });
