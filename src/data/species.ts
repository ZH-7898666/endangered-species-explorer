export interface Species {
  id: string;
  name: string;
  latinName: string;
  category: 'forest' | 'ocean';
  level: 'CR' | 'EN' | 'VU';
  levelName: string;
  description: string;
  habitat: string;
  funFact: string;
  threats: string;
  citesStatus: string;
  population: string;
  emoji: string;
  position: { x: number; y: number };
  lightSize: number;
  imageUrl: string;
}

export const forestSpecies: Species[] = [
  {
    id: 'south-china-tiger',
    name: '华南虎',
    latinName: 'Panthera tigris amoyensis',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '华南虎是猫科豹属虎亚种中体型最小的一种，也是中国特有的虎亚种，被称为"中国虎"。华南虎曾广泛分布于中国华南、华东、华中、西南地区，是典型的森林型猛兽，擅长隐蔽伏击捕猎。目前野外已无确凿的华南虎踪迹记录，被列为全球最濒危的大型猫科动物之一，比大熊猫更接近灭绝边缘。',
    habitat: '亚热带常绿阔叶林、山地针阔混交林',
    funFact:
      '华南虎是唯一一种仅分布在中国的虎亚种，野外个体可能已经功能性灭绝，目前仅存约200只圈养个体，且全部为6只野生捕获个体的后代，基因多样性极低。',
    threats: '历史栖息地几乎全部丧失、历史性大规模捕杀、近亲繁殖导致基因退化',
    citesStatus: 'CITES 附录I',
    population: '野外可能功能性灭绝，圈养约200只',
    emoji: '🐅',
    position: { x: 15, y: 30 },
    lightSize: 45,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_07656221-9466-45f6-91c8-c2a2b3f00e5c.jpeg?sign=1810908308-a486bb2ab6-0-f8ec4c93b518a287017697e97a00f1b1410f8bcc198de16e0595d743134a7ec6',
  },
  {
    id: 'golden-snub-monkey',
    name: '川金丝猴',
    latinName: 'Rhinopithecus roxellana',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '川金丝猴是灵长目猴科疣猴亚科金丝猴属的珍稀灵长类动物，是中国特有的国宝级物种。雄性拥有金黄色的长毛和蓝色的面庞，在阳光下如披金甲，被称为"雪山精灵"。川金丝猴栖息于海拔1500-3400米的高山森林中，是除人类之外栖息海拔最高的灵长类动物，能在零下20℃的严寒中生存。',
    habitat: '高山针叶林、针阔混交林、海拔1500-3400米',
    funFact:
      '川金丝猴没有鼻梁骨，鼻孔朝上，这在冰天雪地里反而成了优势——呼出的热气会在上翘的鼻孔周围凝结成霜，形成天然的"保暖层"。它们的群体结构非常独特，由多个"一雄多雌"小家庭组成一个上百只的大群。',
    threats: '森林砍伐和破碎化、旅游业干扰、气候变化导致栖息地上移',
    citesStatus: 'CITES 附录I',
    population: '约25,000只',
    emoji: '🐒',
    position: { x: 35, y: 25 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_7a75e49a-76c8-4c65-b2f3-7ad488b1fb9d.jpeg?sign=1810908309-978972be88-0-248f889c261100a05ea1ee1afc03960cd4802d54e1a22e53cc07b5d2a1652b2e',
  },
  {
    id: 'giant-panda',
    name: '大熊猫',
    latinName: 'Ailuropoda melanoleuca',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '大熊猫是食肉目熊科大熊猫属的大型哺乳动物，是中国的国宝和全球生物多样性保护的标志性物种。虽然属于食肉目，但大熊猫99%的食物是竹子，每天需要进食12-38公斤竹子才能维持基本能量需求。大熊猫拥有一个特殊的"伪拇指"——桡侧腕骨增大的部分，帮助它们灵巧地抓握竹竿。',
    habitat: '亚热带山地竹林、海拔1200-3400米的针阔混交林',
    funFact:
      '大熊猫的消化系统仍然是食肉动物的结构，肠道只有体长的4倍（草食动物通常是10倍以上），所以竹子的消化率只有17%，必须不停地吃。新生大熊猫仅重约100-200克，只有成年体重的1/900，是哺乳动物中母子体重比最悬殊的物种之一。',
    threats: '竹林开花死亡导致食物短缺、栖息地破碎化、气候变化影响竹子分布',
    citesStatus: 'CITES 附录I',
    population: '约1,864只（野外）',
    emoji: '🐼',
    position: { x: 55, y: 40 },
    lightSize: 50,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_df9747a6-e4ce-441f-bac1-efd748c25ff9.jpeg?sign=1810908307-0c05d8e13c-0-ea86609098e28f55992cf3e305dfa845fa41a9042464a0f4d95f42ff55b4c575',
  },
  {
    id: 'clouded-leopard',
    name: '云豹',
    latinName: 'Neofelis nebulosa',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '云豹是食肉目猫科云豹属的中型猫科动物，因身上大块云状斑纹而得名，是猫科动物中最擅长攀爬的物种之一。云豹拥有猫科动物中最长的犬齿（相对体型比例），被称为"现代剑齿虎"，其犬齿长度与体长之比甚至超过已灭绝的剑齿虎。云豹能头朝下从树干上爬下，也能倒挂在树枝上，这种能力在猫科中独一无二。',
    habitat: '热带和亚热带常绿阔叶林、海拔2000米以下的原始森林',
    funFact:
      '云豹的脚踝关节可以旋转180度，这使得它们能够头朝下从树干上爬下来，也能用后脚倒挂在树枝上——这是其他猫科动物做不到的。它们的尾巴几乎和身体一样长，是极好的平衡器官。',
    threats: '原始森林大面积消失、非法盗猎获取美丽皮毛、猎物数量锐减',
    citesStatus: 'CITES 附录I',
    population: '约10,000只（估计，数据缺乏）',
    emoji: '🐆',
    position: { x: 75, y: 30 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_3d559a7a-fb2a-43b3-a36d-3ff19e0e03f7.jpeg?sign=1810908308-9ee6d3b0fd-0-5b067bd60bc14d5f3715b4ab32017488e06f37438c415473d9ec584e765ee8ea',
  },
  {
    id: 'crested-ibis',
    name: '朱鹮',
    latinName: 'Nipponia nippon',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '朱鹮是鹈形目鹮科朱鹮属的中型涉禽，曾广泛分布于东亚地区，被誉为"东方宝石"和"鸟类大熊猫"。朱鹮最显著的特征是繁殖期面部和腿部变为朱红色，翅膀在飞行时透出美丽的橘红色光泽，宛如一抹落日飞过天空。1981年在中国陕西洋县发现最后7只野生个体后，经过40多年保护，种群逐步恢复，成为全球濒危物种保护的成功典范。',
    habitat: '山地森林与水田交错的湿地、海拔800-1600米的低山丘陵',
    funFact:
      '朱鹮在繁殖期会分泌一种黑色粉末，涂抹在背部和翅膀上使羽毛变深——这不是脏了，而是它们独特的"化妆"行为！这种深色保护色可以让天敌更难发现巢中的朱鹮。从7只到近万只，朱鹮的保护是20世纪最伟大的物种拯救故事之一。',
    threats: '栖息地退化、农药使用导致食物减少、湿地消失',
    citesStatus: 'CITES 附录I',
    population: '约7,000只',
    emoji: '🦩',
    position: { x: 25, y: 55 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c23d5f5a-d22b-4dc6-bf52-90c39ccc9a3e.jpeg?sign=1810908329-251a1f4255-0-64532bc669c3bfd060b84398210c2963a4904905aff14e1052299b0973653bd2',
  },
  {
    id: 'chinese-pangolin',
    name: '中华穿山甲',
    latinName: 'Manis pentadactyla',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '中华穿山甲是鳞甲目穿山甲科穿山甲属的中型哺乳动物，全身覆盖着角质鳞片，是地球上唯一的鳞甲类哺乳动物。穿山甲是极其重要的生态工程师——一只穿山甲一年能吃掉约7000万只白蚁，能保护约250亩森林免遭白蚁侵害。然而，穿山甲也是全球非法贸易最严重的哺乳动物，过去10年超过100万只穿山甲被非法交易。',
    habitat: '亚热带常绿阔叶林、山地针阔混交林、海拔1000-1500米',
    funFact:
      '穿山甲的鳞片由角蛋白构成，和人类指甲的成分完全一样！它们没有牙齿，依靠胃中角质层和小石子研磨食物，就像"活体搅拌机"。遇到危险时穿山甲会蜷成球形，鳞片锐利的边缘可以割伤捕食者，连狮子都无计可施——但遗憾的是，这种防御对人类盗猎者毫无作用。',
    threats: '非法盗猎（食用和药用）、栖息地丧失、全球非法贸易',
    citesStatus: 'CITES 附录I',
    population: '过去20年减少了90%以上',
    emoji: '🦔',
    position: { x: 65, y: 55 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_dbfe1c53-8a7d-4ae2-b3fd-b2044f6a8315.jpeg?sign=1810908329-73396d6db0-0-d3d168494be6b6b96c643eae87aa19f774d8b6cc6e397b1cfb0ec1cf68642b2d',
  },
  {
    id: 'red-panda',
    name: '小熊猫',
    latinName: 'Ailurus fulgens',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '小熊猫是食肉目小熊猫科小熊猫属的小型哺乳动物，是大熊猫的"远房亲戚"——两者都独立演化出了取食竹子的习性，是趋同进化的经典案例。小熊猫拥有红褐色的皮毛、圆耳朵和蓬松的环纹长尾，被誉为"世界上最可爱的哺乳动物"。它们是黄昏和夜间活动的动物，大部分时间独自待在树冠上。',
    habitat: '温带山地森林、海拔2200-4800米的针叶林和混交林',
    funFact:
      '小熊猫受惊时会举起双手站起来，让自己看起来更大——这个经典姿势被网友称为"举手投降"，其实是一种防御威慑行为。小熊猫的尾巴有9个深浅交替的环纹，在英文中被称为"firefox"——著名的浏览器Firefox的名字正是来源于此！',
    threats: '栖息地丧失和破碎化、非法宠物贸易、犬瘟热等家畜疾病传播',
    citesStatus: 'CITES 附录I',
    population: '约10,000只',
    emoji: '🐾',
    position: { x: 85, y: 50 },
    lightSize: 35,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c9a32c7d-bb3c-4797-a916-f075ae782ccd.jpeg?sign=1810908327-d57a729915-0-00f1df1d6ad9a816df328ac10e9dffc1702b7f01bcdc5c1e4ea3bf1d04ff5b8f',
  },
  {
    id: 'white-cheeked-gibbon',
    name: '北白颊长臂猿',
    latinName: 'Nomascus leucogenys',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '北白颊长臂猿是灵长目长臂猿科的类人猿，是东南亚热带雨林的旗舰物种。长臂猿是除人类外唯一能以双足直立行走的灵长类，但它们最擅长的运动方式是"臂行法"——用长臂在树冠间荡来荡去，一次飞跃可达15米，速度可达每小时50公里。长臂猿以其嘹亮的晨间啼鸣闻名，叫声可传2公里远，是热带雨林最标志性的声音。',
    habitat: '热带和亚热带常绿阔叶林、原始雨林',
    funFact:
      '长臂猿夫妇每天清晨会对唱"二重奏"，歌声悠扬动听，可以持续20分钟以上。每对长臂猿的歌声都有独特模式，就像"夫妻签名"一样，用来宣示领地。雄性幼崽的毛色会和母亲一样（金黄色），长大后才会变成黑色——这样母亲能更容易认出自己的孩子在身边。',
    threats: '原始雨林大面积消失、非法盗猎和宠物贸易、栖息地破碎化',
    citesStatus: 'CITES 附录I',
    population: '野外可能不足200组家庭',
    emoji: '🦍',
    position: { x: 45, y: 65 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_eb041e9d-d50d-4494-a471-429081825883.jpeg?sign=1810908374-59881dce8d-0-01d89f85531582b8425600737195b7bbf338a8fd71e18deb73d256c48f6319a9',
  },
];

export const oceanSpecies: Species[] = [
  {
    id: 'chinese-white-dolphin',
    name: '中华白海豚',
    latinName: 'Sousa chinensis',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '中华白海豚是鲸目海豚科白海豚属的中型海洋哺乳动物，主要分布在中国东南沿海，被称为"海上大熊猫"和"妈祖鱼"。中华白海豚最迷人的特征是体色会随年龄变化——幼体呈深灰色，亚成体布满灰色斑点，成体全身变为乳白色或粉红色，粉红色并非色素，而是皮下血管充血所致，如同海洋中的粉色精灵。',
    habitat: '热带和亚热带河口浅海、水深不超过20米的近岸水域',
    funFact:
      '中华白海豚出生时是深灰色的，随着年龄增长逐渐"褪色"变白变粉。它们的粉红色其实和人类脸红原理一样——皮肤下方的血管扩张，在剧烈运动或情绪激动时粉色会更明显。白海豚是近岸生态系统的"哨兵物种"，它们的健康状况直接反映近海环境的好坏。',
    threats: '填海造地破坏栖息地、海上工程噪声干扰、渔业误捕、海洋污染',
    citesStatus: 'CITES 附录I',
    population: '全球约6,000只，中国海域约2,000只',
    emoji: '🐬',
    position: { x: 18, y: 35 },
    lightSize: 48,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_181508cd-0b37-43d9-b7ba-436fec03bb99.jpeg?sign=1810908332-be277c94c8-0-380062df295b4c2fc2c2bd78c771cd8c110293bae07c7e3659751c77d25de7a0',
  },
  {
    id: 'green-sea-turtle',
    name: '绿海龟',
    latinName: 'Chelonia mydas',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '绿海龟是龟鳖目海龟科海龟属的大型海洋爬行动物，是海洋中最优雅的航行者之一。绿海龟是唯一成体完全草食性的海龟，主要以海草和藻类为食，因此体内脂肪呈绿色而得名。它们拥有惊人的导航能力，成年雌龟会在数千公里的迁徙后精确返回出生地产卵，这种"返乡本能"跨越了几十年的记忆。',
    habitat: '热带和亚热带近海、海草床、珊瑚礁',
    funFact:
      '绿海龟可以屏息潜水长达5小时——它们会降低心率至每分钟仅1次心跳，大幅减少氧气消耗。刚孵化的小海龟要在月光指引下爬向大海，但城市灯光会干扰它们的导航，让它们走向相反的方向。绿海龟的性别由孵化温度决定：较高温度产生更多雌性，较低温度产生更多雄性——全球变暖正在让海龟种群"阴阳失衡"。',
    threats: '海洋塑料污染误食、产卵沙滩被开发破坏、气候变化影响性别比例、渔业误捕',
    citesStatus: 'CITES 附录I',
    population: '全球约85,000-90,000只筑巢雌龟',
    emoji: '🐢',
    position: { x: 38, y: 45 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_7f0b042f-0d10-4d4b-b333-47450361a1a1.jpeg?sign=1810908351-0e5243071-0-94d752f28eebe12139ac8d04965edfad03679abddb971f5d244ead79eea4d267',
  },
  {
    id: 'blue-whale',
    name: '蓝鲸',
    latinName: 'Balaenoptera musculus',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '蓝鲸是鲸目须鲸科须鲸属的海洋哺乳动物，是地球上已知存在过的最大动物——比任何恐龙都要大。蓝鲸体长可达30米，体重近200吨，心脏和一辆小汽车一样大，舌头上可以站50个人。尽管体型庞大，蓝鲸的食物却是微小的磷虾——一头蓝鲸一天可以吃下4吨磷虾。蓝鲸的叫声是地球上最响亮的动物声音之一，可达188分贝，能传播数千公里。',
    habitat: '全球各大洋的深水区域、大陆架边缘',
    funFact:
      '蓝鲸的心脏约重600公斤，每分钟只跳动8-10次，但每次能泵出200升血液。蓝鲸幼崽出生时就重达2.5吨，每天喝约200升高脂肪母乳，可以增重90公斤——相当于每小时长胖近4公斤！20世纪的商业捕鲸杀死了近30万头蓝鲸，从30多万头降至不足5,000头，至今仍未恢复。',
    threats: '船只撞击、海洋噪声干扰声纳导航、气候变化影响磷虾数量、渔具缠绕',
    citesStatus: 'CITES 附录I',
    population: '全球约10,000-25,000头',
    emoji: '🐋',
    position: { x: 60, y: 30 },
    lightSize: 55,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_3511d587-0ab7-48a9-9f87-c556b1f1a88b.jpeg?sign=1810908354-5c2949cf64-0-b4f9343f15d87ff81300332e87b9af2561ecd154961057c78522ec3cc71f1ccc',
  },
  {
    id: 'whale-shark',
    name: '鲸鲨',
    latinName: 'Rhincodon typus',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '鲸鲨是须鲨目鲸鲨科鲸鲨属的海洋鱼类，是世界上最大的鱼类——体长可达18米，体重可达34吨。虽然名字中有"鲸"字，但鲸鲨是货真价实的鲨鱼，只是体型如鲸般巨大。鲸鲨性格极其温顺，被称为"海洋中的温柔巨人"，潜水者可以与它们近距离共游。每条鲸鲨身上的斑点图案都是独一无二的，如同人类的指纹，科学家借此识别个体。',
    habitat: '热带和亚热带海域、珊瑚礁附近、远洋区域',
    funFact:
      '鲸鲨的嘴可以张开1.5米宽，但喉咙只有拳头大小——它们是滤食性动物，以浮游生物、鱼卵和小鱼为食。鲸鲨拥有超过300排细小的牙齿，但这些牙齿几乎不起任何作用，食物是通过鳃耙过滤的。鲸鲨的寿命可达70-100年，但性成熟需要30年——这意味着一条鲸鲨要花30年才能开始为种群做贡献，这也是它们数量恢复缓慢的原因。',
    threats: '渔业误捕和目标捕捞、船只撞击、海洋污染、栖息地退化',
    citesStatus: 'CITES 附录II',
    population: '全球约7,000-12,000头（估计）',
    emoji: '🦈',
    position: { x: 80, y: 40 },
    lightSize: 50,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_ec3b0ff6-6fcd-4585-ab7c-76828706d96e.jpeg?sign=1810908350-11c143d04a-0-580548ad9aed4f76e080ed6a05d9952ac8e39f3d4ca1d03fc41af5add6873592',
  },
  {
    id: 'dugong',
    name: '儒艮',
    latinName: 'Dugong dugon',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '儒艮是海牛目儒艮科儒艮属的海洋哺乳动物，是现存唯一的草食性海洋哺乳动物，也被认为是古代"美人鱼"传说的原型。儒艮体型圆润，前肢化为鳍状，尾鳍呈新月形，在水面哺乳幼崽的姿态远看如人鱼抱婴。儒艮以海草为食，每天要吃掉体重10%的海草，在海底留下清晰觅食痕迹，是海草床生态系统的"园丁"。',
    habitat: '热带和亚热带浅海、海草床、水深不超过30米的近岸水域',
    funFact:
      '儒艮可能是"美人鱼"传说的真正来源——水手们在海上长期航行后，远看儒艮在水面哺乳幼崽的姿态，加上光影折射的错觉，误以为看到了人鱼。儒艮的最近亲缘竟然是大象——它们在约6000万年前拥有共同祖先。儒艮的牙齿会像 conveyor belt 一样不断向前移动替换，和象齿的替换方式一模一样。',
    threats: '海草床退化丧失、渔业误捕、沿海开发破坏栖息地、船舶撞击',
    citesStatus: 'CITES 附录I',
    population: '全球约10,000-15,000头，中国海域功能性灭绝',
    emoji: '🧜',
    position: { x: 28, y: 60 },
    lightSize: 44,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_479ea721-e133-4d53-8004-a40a40a91f56.jpeg?sign=1810908351-27dd9794eb-0-58f39afb8533a23b9da6a17b4448aa60d0c9fe09e1c11ac7b3d9ced8e7990efd',
  },
  {
    id: 'hawksbill-turtle',
    name: '玳瑁',
    latinName: 'Eretmochelys imbricata',
    category: 'ocean',
    level: 'CR',
    levelName: '极危',
    description:
      '玳瑁是龟鳖目海龟科玳瑁属的中型海洋爬行动物，拥有海龟中最华丽的龟壳——琥珀色的背甲上排列着重叠的美丽花纹，如同精心镶嵌的马赛克。然而，正是这份美丽给玳瑁带来了灭顶之灾——数千年来人类为获取龟甲制作首饰和工艺品而大量猎杀玳瑁。玳瑁是珊瑚礁生态系统的关键物种，它们以有毒的海绵为食，为珊瑚礁清理空间，没有玳瑁的珊瑚礁会因海绵过度生长而窒息。',
    habitat: '热带珊瑚礁、岩石海底、浅水潟湖',
    funFact:
      '玳瑁是海龟中唯一可以安全食用有毒海绵的物种——它们的身体能分解海绵中的毒素，这种毒素甚至会让玳瑁的肉变得有毒，误食玳瑁肉可能导致严重中毒甚至死亡。玳瑁的喙像鹰嘴一样尖锐，可以伸进珊瑚缝隙中把海绵拉出来，是珊瑚礁的"清洁工"——一只玳瑁一年能吃掉超过500公斤海绵。',
    threats: '非法盗猎获取龟甲、珊瑚礁退化、海洋塑料污染、气候变化',
    citesStatus: 'CITES 附录I',
    population: '全球约23,000只筑巢雌龟，过去三代减少80%以上',
    emoji: '🐚',
    position: { x: 55, y: 65 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_30f2dad6-114b-420a-be4d-b99446fd51ea.jpeg?sign=1810908377-c37c6e069e-0-f831138312f6a21eca91508297e22dc61cfe1ddd6c79b7a37d1ec14506a8591b',
  },
  {
    id: 'chinese-sturgeon',
    name: '中华鲟',
    latinName: 'Acipenser sinensis',
    category: 'ocean',
    level: 'CR',
    levelName: '极危',
    description:
      '中华鲟是鲟形目鲟科鲟属的大型溯河产卵洄游鱼类，是地球上最古老的脊椎动物之一，有"水中大熊猫"和"活化石"之称。中华鲟已存在1.4亿年，比恐龙灭绝还早——它们见证了地球的沧海桑田。中华鲟是典型的溯河产卵鱼类，在海洋中生长，性成熟后溯游数千公里回到长江上游产卵，这种世代相传的洄游本能跨越了亿万年。',
    habitat: '东海和黄海大陆架、长江干流（洄游产卵）',
    funFact:
      '中华鲟的寿命可达40年，性成熟需要14-26年——它们是鱼类中"大器晚成"的代表。中华鲟没有牙齿，口位于头部下方，靠伸缩口器在海底吸食底栖生物。三峡大坝和葛洲坝的修建彻底阻断了中华鲟的洄游通道，野生种群已几乎无法自然繁殖。2022年，长江中连续5年未检测到中华鲟自然产卵——这个存活了1.4亿年的物种，正站在灭绝的悬崖边。',
    threats: '大坝阻断洄游通道、栖息地丧失、水污染、过度捕捞',
    citesStatus: 'CITES 附录II',
    population: '野生种群极度濒危，自然繁殖几乎中断',
    emoji: '🐟',
    position: { x: 72, y: 60 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_594ca31f-9b05-47b5-9049-fe74078842e3.jpeg?sign=1810908377-037fc7daae-0-1350424d80f6b35cc9740afa24a83bb64a4afaa13aceb69a2c1f7f69d81315f2',
  },
  {
    id: 'giant-clam',
    name: '大砗磲',
    latinName: 'Tridacna gigas',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '大砗磲是帘蛤目砗磲科砗磲属的双壳类软体动物，是海洋中最大的双壳贝类——壳长可达1.4米，体重超过200公斤。大砗磲的外套膜呈现出令人惊叹的蓝色、绿色、紫色等荧光色彩，这是共生虫黄藻赋予的"生命之光"。大砗磲通过虫黄藻光合作用获取高达90%的营养需求，是动物界最成功的"种菜养活自己"案例。',
    habitat: '热带珊瑚礁、水深不超过20米的浅海',
    funFact:
      '大砗磲那些梦幻的荧光色彩并非自身的色素，而是共生的虫黄藻——数以亿计的虫黄藻住在大砗磲的外套膜中，进行光合作用为宿主提供养分。一旦虫黄藻离开（比如因为海水温度升高），大砗磲就会变白并可能饿死——这就是珊瑚礁白化的原理。大砗磲一生中大部分时间固定在珊瑚礁上，从幼虫附着后几乎不再移动，堪称"海底坐禅大师"。',
    threats: '珊瑚礁退化白化、非法采集（食用和工艺品）、海水温度升高',
    citesStatus: 'CITES 附录II',
    population: '过去数代减少超过80%',
    emoji: '🪸',
    position: { x: 42, y: 75 },
    lightSize: 35,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_75fc5fdd-fa17-4cb7-9aad-f5a74686c5bd.jpeg?sign=1810908376-99e2735628-0-0880cf0f26f2e79429c7165b062af1371d76857fc7199e7eb713ab6d351445ef',
  },
];

export const allSpecies = [...forestSpecies, ...oceanSpecies];
