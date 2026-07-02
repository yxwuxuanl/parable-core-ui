export type Story = {
  id: string;
  title: string;
  lede: string;
  domain: string;
  minutes: number;
  wash: "blush" | "sage" | "ochre" | "mist";
  illustration: "path" | "crowd" | "seed" | "ripple";
  paragraphs: string[];
  conceptId: string;
  options: string[]; // conceptIds
};

export type Concept = {
  id: string;
  name: string;
  oneLiner: string;
  domain: string;
  readers: number;
  illustration: "path" | "crowd" | "seed" | "ripple" | "mirror" | "gate";
  wash?: Story["wash"];
  definition?: string;
  mapping?: { from: string; to: string }[];
  scenes?: { title: string; body: string }[];
  related?: string[]; // conceptIds
};

export const CONCEPTS: Record<string, Concept> = {
  "path-dependence": {
    id: "path-dependence",
    name: "路径依赖",
    oneLiner: "为什么明知道不好，却还是很难改变？",
    domain: "行为经济学",
    readers: 2841,
    illustration: "path",
    wash: "ochre",
    definition:
      "过去的选择会在系统里留下痕迹，让后来的每一次选择都更容易沿着原来的路走下去。这不是因为旧路更好，而是因为它已经被走熟了。",
    mapping: [
      { from: "旧路", to: "过去选择形成的惯性" },
      { from: "新路", to: "仍然存在但更难选择的替代方案" },
      { from: "越走越深的脚印", to: "选择被重复强化" },
    ],
    scenes: [
      { title: "生活", body: "总在同一家店点同一样菜，不是因为最好吃，只是不用想。" },
      { title: "职场", body: "组织沿用一套已经不合时宜的流程，只因为“一直都是这样”。" },
      { title: "商业", body: "键盘的 QWERTY 布局并非最优，却统治了整个行业超过一百年。" },
    ],
    related: ["status-quo-bias", "sunk-cost"],
  },
  "sunk-cost": {
    id: "sunk-cost",
    name: "沉没成本",
    oneLiner: "已经付出的，不该决定你接下来的路。",
    domain: "行为经济学",
    readers: 1932,
    illustration: "gate",
    wash: "blush",
  },
  "bandwagon": {
    id: "bandwagon",
    name: "从众效应",
    oneLiner: "当人群朝一个方向奔跑，很少有人回头问为什么。",
    domain: "社会心理学",
    readers: 2210,
    illustration: "crowd",
    wash: "sage",
  },
  "status-quo-bias": {
    id: "status-quo-bias",
    name: "现状偏差",
    oneLiner: "维持原样，常被误认为是安全。",
    domain: "认知心理学",
    readers: 1580,
    illustration: "mirror",
    wash: "mist",
  },
  "second-order": {
    id: "second-order",
    name: "二阶效应",
    oneLiner: "第一步的结果，往往不是真正的结果。",
    domain: "系统思维",
    readers: 1204,
    illustration: "ripple",
    wash: "mist",
  },
  "compound": {
    id: "compound",
    name: "复利思维",
    oneLiner: "微小的重复，会在时间里长成森林。",
    domain: "思维模型",
    readers: 3120,
    illustration: "seed",
    wash: "sage",
  },
};

export const STORIES: Story[] = [
  {
    id: "two-paths",
    title: "两条路",
    lede: "山里的樵夫每天都从同一条小路上山。有一天，他发现了另一条。",
    domain: "行为经济学",
    minutes: 3,
    wash: "ochre",
    illustration: "path",
    conceptId: "path-dependence",
    options: ["path-dependence", "sunk-cost", "status-quo-bias", "bandwagon"],
    paragraphs: [
      "山脚下有个樵夫，几十年来每天走同一条小路上山。路是他自己踩出来的，一开始只是草丛里一道浅浅的印子，走的次数多了，慢慢陷成一条真正的路。",
      "有一年春天，一场大雨冲开了山的另一侧。樵夫无意间发现，那边的坡更缓，树也更密，砍柴其实更省力。",
      "他站在两条路口看了很久，最后还是转身走上了那条熟悉的旧路。他说，新路虽然好，可是脚不认得。",
      "此后每一年，他都想过要换。可每一次到了路口，脚都比脑子更快地做了决定。",
      "山还是那座山，路却越走越深。到最后，他甚至不记得自己曾经站在过路口。",
    ],
  },
  {
    id: "riverside",
    title: "河边的人群",
    lede: "一个人蹲下看水，第二个跟着蹲下，第三个也蹲下。没人知道最初那个人在看什么。",
    domain: "社会心理学",
    minutes: 2,
    wash: "sage",
    illustration: "crowd",
    conceptId: "bandwagon",
    options: ["bandwagon", "status-quo-bias", "second-order", "path-dependence"],
    paragraphs: [
      "傍晚，一个人在河边蹲下，望着水面。",
      "路过的人以为水里有什么，也停下来蹲着看。第三个、第四个、第十个……渐渐地，河岸边围了一整排人。",
      "最先蹲下的那个人其实只是鞋带松了。",
    ],
  },
  {
    id: "small-seed",
    title: "一粒种子",
    lede: "老人每天在院子里埋下一粒种子。二十年后，院子成了森林。",
    domain: "思维模型",
    minutes: 2,
    wash: "blush",
    illustration: "seed",
    conceptId: "compound",
    options: ["compound", "second-order", "path-dependence", "sunk-cost"],
    paragraphs: [
      "老人每天清晨在院子里埋一粒种子。",
      "邻居笑他：一粒种子能长出什么？",
      "他没说话，只是第二天照旧埋下一粒。二十年后，那个院子成了一片小小的森林。",
    ],
  },
];

export const FEATURED_CONCEPTS: string[] = [
  "path-dependence",
  "bandwagon",
  "compound",
  "second-order",
  "status-quo-bias",
  "sunk-cost",
];

export const CATEGORIES = ["全部", "行为经济学", "社会心理学", "思维模型", "系统思维", "认知心理学"];

export function getStory(id: string) {
  return STORIES.find((s) => s.id === id);
}
export function getConcept(id: string) {
  return CONCEPTS[id];
}
