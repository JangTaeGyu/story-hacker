const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-12",
    prompt: "Dark cyberpunk illustration of a massive corporate skyscraper at night, the building glowing with green holographic logos, a tiny silhouette figure approaching the entrance from below, corporate espionage and infiltration atmosphere, flying vehicles in the sky",
  },
  {
    id: "12-1",
    prompt: "a futuristic corporate lobby with sleek holographic displays and floating information panels, marble floors reflecting green neon lights, security scanners at the entrance, empty reception desk, cyberpunk corporate aesthetic",
  },
  {
    id: "12-2",
    prompt: "a futuristic visitor terminal screen in a corporate lobby, the screen showing an authentication code input interface with green glow, digital keyboard hologram, sleek metallic kiosk design, cyberpunk corporate aesthetic",
  },
  {
    id: "12-3",
    prompt: "a computer screen showing a hidden encrypted file icon with a glowing lock, file directory listing visible in the background, digital data streams flowing around, dark terminal interface aesthetic, cyberpunk corporate aesthetic",
  },
  {
    id: "12-4",
    prompt: "a classified document displayed on a screen with heavy black redaction bars covering most text, PROJECT-X header visible at the top, red classified stamps, faint data leaking through the redactions with green glow, cyberpunk corporate aesthetic",
  },
]);

generateImages(prompts, { label: "EP.12 '기업 정찰'" });
