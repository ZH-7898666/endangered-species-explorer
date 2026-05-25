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
    position: { x: 12, y: 25 },
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
    position: { x: 28, y: 22 },
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
    position: { x: 45, y: 30 },
    lightSize: 50,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_df9747a6-e4ce-441f-bac1-efd748c25ff9.jpeg?sign=1810908307-0c05d8e13c-0-ea86609098e28f55992cf3e305dfa845fa41a9042464a0f4d95f42ff55b4c575',
  },
  {
    id: 'snow-leopard',
    name: '雪豹',
    latinName: 'Panthera uncia',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '雪豹是食肉目猫科豹属的大型猫科动物，被称为"雪山之王"和"高原幽灵"，是亚洲高山生态系统的旗舰物种。雪豹栖息于海拔3000-5500米的高山地带，拥有所有猫科动物中最浓密的皮毛和最长的尾巴——几乎与体长相当，在悬崖上跳跃时如同平衡杆，睡觉时还可以像围巾一样裹住口鼻保暖。雪豹是猫科动物中最神秘的物种之一，行踪隐秘，极难在野外目击。',
    habitat: '高山草甸、灌丛、裸岩地带、海拔3000-5500米',
    funFact:
      '雪豹是猫科动物中唯一不会吼叫的大型猫类——它们的声带缺少弹性组织，发出的声音更像是"嗷嗷"的叫声而非威严的虎啸。雪豹可以在15米宽的悬崖间一跃而过，在几乎垂直的岩壁上如履平地。它们超长的尾巴不仅是平衡杆和围巾，在雪地上行走时还会把尾巴拖在身后，留下的痕迹仿佛一条蛇爬过。',
    threats: '气候变化导致雪线上移、猎物减少、人兽冲突报复性猎杀、非法盗猎获取皮毛',
    citesStatus: 'CITES 附录I',
    population: '全球约4,000-6,500只',
    emoji: '🐆',
    position: { x: 65, y: 22 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_909d014d-ab46-49f1-9b1e-0ca0a6bfca7f.jpeg?sign=1811251577-de6e62fba6-0-09688f48f8bee78402acbd8d34069568233a1d895009f3d837086dc3a781496f',
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
    emoji: '🐱',
    position: { x: 82, y: 28 },
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
    position: { x: 20, y: 50 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c23d5f5a-d22b-4dc6-bf52-90c39ccc9a3e.jpeg?sign=1810908329-251a1f4255-0-64532bc669c3bfd060b84398210c2963a4904905aff14e1052299b0973653bd2',
  },
  {
    id: 'red-crowned-crane',
    name: '丹顶鹤',
    latinName: 'Grus japonensis',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '丹顶鹤是鹤形目鹤科鹤属的大型涉禽，是东亚文化中最具象征意义的鸟类，自古被视为仙禽，寓意长寿与高洁。丹顶鹤体长约150厘米，翼展可达2.5米，头顶的红色裸露皮肤是其最显著的特征——那不是羽毛，而是一块富含血管的裸露皮肤，会随情绪变化而充血变色。丹顶鹤的求偶舞蹈是自然界最优雅的表演之一，包括跳跃、展翅、旋转、抛接树枝等动作。',
    habitat: '沼泽湿地、芦苇荡、河流三角洲、浅水湖泊',
    funFact:
      '丹顶鹤是少数会"跳舞"的鸟类之一——不仅求偶时跳，日常生活中也会自发起舞。它们的舞步包括旋转、跳跃、鞠躬、扇翅，看起来像是在跳芭蕾。丹顶鹤的寿命可达60年以上，是世界上最长寿的鸟类之一。日本航空公司ANA的logo就是一只丹顶鹤。',
    threats: '湿地开发填埋、栖息地丧失、农药污染、气候变化影响迁徙',
    citesStatus: 'CITES 附录I',
    population: '全球约2,800只（野生）',
    emoji: '🦢',
    position: { x: 38, y: 52 },
    lightSize: 44,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c01f034e-c152-4bae-a90e-1466e17510dd.jpeg?sign=1811251573-141d4923c9-0-c32ce2f709f01e667f883c27b9d9f104a5249c4fdfc40317eeea46cba6f28c0b',
  },
  {
    id: 'mandarin-duck',
    name: '鸳鸯',
    latinName: 'Aix galericulata',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '鸳鸯是雁形目鸭科鸳鸯属的中型水鸟，是中国传统文化中忠贞爱情的象征。雄性鸳鸯拥有世界上最华丽的鸭类羽毛——橙色的帆状翘羽、绿色的冠羽、白色的眉纹，如同穿了一件精心设计的戏服。然而这份华丽只在繁殖季出现，非繁殖期雄性会换上与雌性相似的低调"便装"。鸳鸯是少数在树上筑巢的鸭类，幼鸟出生后要从高高的树洞中跳下才能到达水面。',
    habitat: '山地溪流、森林湖泊、阔叶林中的水域',
    funFact:
      '鸳鸯的"忠贞爱情"其实是个浪漫的误解——它们只在同一个繁殖季保持配对，下一个繁殖季通常会换伴侣。真正终身一夫一妻的鸟类是信天翁和天鹅。鸳鸯宝宝出生在树洞里，出生第二天就要从10米高的树洞中跳入水中——这叫"跳巢"，是鸳鸯宝宝的人生第一跳！',
    threats: '森林砍伐减少筑巢树洞、水域污染、非法捕猎获取装饰羽毛',
    citesStatus: 'CITES 附录III',
    population: '全球约65,000-66,000只，东亚种群快速下降',
    emoji: '🦆',
    position: { x: 55, y: 55 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_933395f7-02a6-48d2-a3d1-81e307b239ff.jpeg?sign=1811251576-1a42620bbe-0-b8a0665715e8e9e40768f0fe7ce0859abb3e7ac3d41e57b58341b73dd302311e',
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
    position: { x: 72, y: 50 },
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
    position: { x: 88, y: 45 },
    lightSize: 35,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c9a32c7d-bb3c-4797-a916-f075ae782ccd.jpeg?sign=1810908327-d57a729915-0-00f1df1d6ad9a816df328ac10e9dffc1702b7f01bcdc5c1e4ea3bf1d04ff5b8f',
  },
  {
    id: 'asian-elephant',
    name: '亚洲象',
    latinName: 'Elephas maximus',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '亚洲象是长鼻目象科亚洲象属的大型哺乳动物，是亚洲现存最大的陆生动物。亚洲象体型虽比非洲象略小，但同样令人敬畏——成年雄象肩高可达3米，体重5吨以上。亚洲象拥有高度发达的社会结构和情感系统，象群由年长雌象（族长）领导，成员间会互相照顾幼崽、为逝去的同伴"哀悼"。亚洲象的记忆力惊人，能记住几十年前的水源位置和迁徙路线。',
    habitat: '热带雨林、季风林、草原-森林交错带',
    funFact:
      '亚洲象是除人类外极少数会"哀悼"亡者的动物——它们会长时间守在逝去同伴身边，用鼻子触摸遗骸，甚至用树枝和泥土覆盖尸体。它们还会"醉酒"——当发酵的野果落入水中，大象喝了后会醉醺醺地摇晃行走。云南的野生亚洲象群曾因寻找新栖息地而集体北迁，走了500多公里，引发全球关注。',
    threats: '栖息地丧失和破碎化、人象冲突、象牙盗猎、铁路公路阻断迁徙路线',
    citesStatus: 'CITES 附录I',
    population: '全球约48,000-50,000头，中国约300头',
    emoji: '🐘',
    position: { x: 15, y: 70 },
    lightSize: 48,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_6b0f95c1-9e0e-4d4e-8813-eb9a688d335e.jpeg?sign=1811251575-d49f1c682d-0-99f0e6ff870f038a73ddf8e805ab9721512713ae78536ce4c38cb4ef9076558e',
  },
  {
    id: 'great-hornbill',
    name: '双角犀鸟',
    latinName: 'Buceros bicornis',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '双角犀鸟是佛法僧目犀鸟科犀鸟属的大型森林鸟类，是亚洲最大的犀鸟之一，体长可达130厘米。双角犀鸟最醒目的特征是头顶巨大的黄色盔突，形似双角，如同戴着一顶华丽的王冠。犀鸟科的繁殖方式极其独特——雌鸟在树洞中孵卵时，会用泥和粪便将洞口封死，只留一条细缝，雄鸟通过这条缝为妻儿投喂食物长达数月。',
    habitat: '热带和亚热带常绿阔叶林、海拔600-1800米的原始森林',
    funFact:
      '双角犀鸟的"封洞育儿"是自然界最极端的育儿方式之一——雌鸟在树洞中被封3-4个月，完全依赖雄鸟投喂。如果雄鸟遭遇意外，雌鸟和幼鸟就会被困在洞中饿死。犀鸟的睫毛是鸟类中少有的——它们真的有又长又翘的睫毛！犀鸟飞行时翅膀会发出巨大的"呼呼"声，像火车过隧道一样，被认为是森林中的"天气预报"。',
    threats: '原始森林砍伐减少筑巢大树、非法捕猎获取盔突做工艺品、栖息地破碎化',
    citesStatus: 'CITES 附录I',
    population: '全球数量持续下降，具体数据缺乏',
    emoji: '🦅',
    position: { x: 35, y: 72 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_e4103f1f-6caa-48da-b443-cc71b5c86392.jpeg?sign=1811251597-cecf046bb4-0-bfb73bda65cf9a8ae5e682d1f207a48047fa815dff53bd06459054263a354f2f',
  },
  {
    id: 'king-cobra',
    name: '眼镜王蛇',
    latinName: 'Ophiophagus hannah',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '眼镜王蛇是有鳞目眼镜蛇科眼镜王蛇属的大型毒蛇，是世界上最长的毒蛇——体长可达5.5米以上，也是唯一会筑巢的蛇类。眼镜王蛇的毒液并非最毒，但单次排毒量极大，一次咬击可释放7毫升毒液，足以杀死一头成年亚洲象。眼镜王蛇的学名Ophiophagus意为"食蛇者"——它们的主要食物就是其他蛇类，包括剧毒的环蛇和眼镜蛇。',
    habitat: '热带和亚热带常绿阔叶林、竹林、河流沿岸',
    funFact:
      '眼镜王蛇是唯一的"蛇中建筑师"——雌蛇会用落叶和枯枝搭建一个复杂的巢，甚至有两层结构：下层放卵，上层遮盖保护。雌蛇会守巢直到幼蛇孵化，这在蛇类中绝无仅有。眼镜王蛇虽然名字中有"眼镜蛇"，但它其实不属于眼镜蛇属，而是独立的王蛇属。它们的低沉嘶嘶声听起来更像狗在咆哮。',
    threats: '栖息地破坏、非法捕猎（药用和食用）、恐惧驱动的杀戮',
    citesStatus: 'CITES 附录II',
    population: '全球数量下降超过30%',
    emoji: '🐍',
    position: { x: 52, y: 75 },
    lightSize: 34,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_c2ad45b1-df10-44f2-a718-2dbfd73b1feb.jpeg?sign=1811251598-54e7dbf3aa-0-589e691c71fbe8ade0476566c58f7fcad94afef20470a5877741b1051008f948',
  },
  {
    id: 'chinese-giant-salamander',
    name: '大鲵（娃娃鱼）',
    latinName: 'Andrias davidianus',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '大鲵是有尾目隐鳃鲵科大鲵属的大型两栖动物，是地球上体型最大的两栖动物，体长可达1.8米以上。大鲵已存在1.7亿年，是与恐龙同时代的"活化石"，比大熊猫还古老。大鲵因叫声类似婴儿啼哭而被称为"娃娃鱼"，但实际上它们并不经常叫。大鲵的皮肤光滑无鳞，通过皮肤呼吸获取约90%的氧气，因此对水质极为敏感。',
    habitat: '山间溪流、溶洞暗河、水质清澈的冷水河流',
    funFact:
      '大鲵是动物界的"长寿翁"——在人工饲养条件下可以活到55岁以上。它们的新陈代谢极其缓慢，可以2-3年不进食也不会饿死。大鲵虽然行动缓慢，但捕食时嘴巴张开的速度可达0.01秒，是两栖动物中最快的——猎物根本来不及反应。大鲵的皮肤可分泌一种特殊的蛋白质"大鲵素"，具有极强的抗菌能力。',
    threats: '栖息地水污染、水电站阻断河流、非法捕猎食用、外来种入侵',
    citesStatus: 'CITES 附录I',
    population: '野生种群减少超过80%',
    emoji: '🦎',
    position: { x: 68, y: 72 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_974be47e-ebc3-4c97-a11d-85996c721010.jpeg?sign=1811251600-74e4ff9eed-0-072bbdef902fd27211d0a593173f37fdbdb90daa967c1252426f191ff0f14fd7',
  },
  {
    id: 'komodo-dragon',
    name: '科莫多龙',
    latinName: 'Varanus komodoensis',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '科莫多龙是有鳞目巨蜥科巨蜥属的大型爬行动物，是现存世界上最大的蜥蜴——体长可达3米，体重超过70公斤。科莫多龙是印度尼西亚科莫多群岛的顶级捕食者，拥有锯齿状的利齿、强壮的尾巴和致命的唾液。过去人们认为科莫多龙是靠唾液中的细菌杀死猎物，但2019年的研究发现它们确实有毒腺，能分泌抗凝血毒素，使猎物血压骤降、大量失血。',
    habitat: '热带干旱草原、季风林、海岸岩石地带',
    funFact:
      '科莫多龙是"孤雌生殖"的高手——在没有雄性的情况下，雌性科莫多龙可以独自产下健康的后代！它们还是"僵尸猎手"——会挖开浅墓穴偷食尸体。科莫多龙的舌头可以像蛇一样收集空气中6公里外的气味分子，堪称"天然化学探测器"。幼年科莫多龙主要生活在树上，因为成年个体会吃掉它们——同族相食是种群调节的一种方式。',
    threats: '栖息地受限（仅5个小岛）、气候变化海平面上升、旅游业干扰、猎物减少',
    citesStatus: 'CITES 附录I',
    population: '约3,000只',
    emoji: '🦖',
    position: { x: 85, y: 68 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_38849258-14d6-452b-9a39-134b9611c156.jpeg?sign=1811251621-26e47ff0f9-0-45a8632a6e1cce137d4b0265e987e75bfea73442d85fc0392b057091d9c0ef6c',
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
    position: { x: 15, y: 28 },
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
    position: { x: 32, y: 35 },
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
    position: { x: 52, y: 22 },
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
    position: { x: 72, y: 30 },
    lightSize: 50,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_ec3b0ff6-6fcd-4585-ab7c-76828706d96e.jpeg?sign=1810908350-11c143d04a-0-580548ad9aed4f76e080ed6a05d9952ac8e39f3d4ca1d03fc41af5add6873592',
  },
  {
    id: 'manta-ray',
    name: '双吻前口蝠鲼',
    latinName: 'Mobula birostris',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '双吻前口蝠鲼是鲼形目鲼科前口蝠鲼属的大型海洋鱼类，翼展可达7米以上，是海洋中翼展最大的鱼类，也被称为"海中魔鬼鱼"或"海洋中的飞行家"。蝠鲼在水中滑翔时如同巨大的黑色斗篷在飞舞，优雅而神秘。蝠鲼拥有鱼类中最大的脑容量，是已知最聪明的鱼类之一，能在镜子中认出自己——这是极少数动物才有的自我认知能力。',
    habitat: '热带和亚热带海域、远洋和近岸水域、珊瑚礁清洁站',
    funFact:
      '蝠鲼是唯一能通过"镜子测试"的鱼类——它们能在镜子前意识到看到的是自己，而不是另一条鱼。蝠鲼的大脑占体重的比例是鱼类中最大的，拥有高度发达的记忆力和问题解决能力。它们会专程游到"清洁站"让小型清洁鱼帮它们清除寄生虫，就像去"水下SPA"。蝠鲼的鳃板（用来滤食的器官）在中药市场上被当作" Peng Yu Sai "高价出售，这是蝠鲼面临的最大威胁。',
    threats: '针对鳃板的定向捕捞、渔业误捕、海洋污染、栖息地退化',
    citesStatus: 'CITES 附录II',
    population: '全球数量未知，部分地区减少超过80%',
    emoji: '🪽',
    position: { x: 88, y: 38 },
    lightSize: 46,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_3bce7ab2-1820-4fa0-9617-27dfabb2ca60.jpeg?sign=1811251597-955d1dff9f-0-cbb1590e0f3e107817325e7e428abac580e7b55bc94bfee63864b48b3ba37e7b',
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
      '儒艮可能是"美人鱼"传说的真正来源——水手们在海上长期航行后，远看儒艮在水面哺乳幼崽的姿态，加上光影折射的错觉，误以为看到了人鱼。儒艮的最近亲缘竟然是大象——它们在约6000万年前拥有共同祖先。儒艮的牙齿会像传送带一样不断向前移动替换，和象齿的替换方式一模一样。',
    threats: '海草床退化丧失、渔业误捕、沿海开发破坏栖息地、船舶撞击',
    citesStatus: 'CITES 附录I',
    population: '全球约10,000-15,000头，中国海域功能性灭绝',
    emoji: '🧜',
    position: { x: 22, y: 55 },
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
    position: { x: 42, y: 60 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_30f2dad6-114b-420a-be4d-b99446fd51ea.jpeg?sign=1810908377-c37c6e069e-0-f831138312f6a21eca91508297e22dc61cfe1ddd6c79b7a37d1ec14506a8591b',
  },
  {
    id: 'humpback-whale',
    name: '座头鲸',
    latinName: 'Megaptera novaeangliae',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '座头鲸是鲸目须鲸科大翅鲸属的海洋哺乳动物，以其壮观的跃身击浪和复杂的"鲸歌"闻名于世。座头鲸的胸鳍长达5米以上，是所有鲸类中最长的，如同海洋中的巨翼。座头鲸是海洋中最伟大的歌唱家——雄性座头鲸能唱出长达20分钟的复杂歌曲，并在数小时内反复吟唱，同一海域的所有雄鲸会唱同一首歌，且歌曲会逐年缓慢变化。',
    habitat: '全球各大洋、夏季在高纬度觅食、冬季在低纬度繁殖',
    funFact:
      '座头鲸发明了一种叫做"气泡网捕鱼"的团队协作技术——几头座头鲸在鱼群下方吐出一圈气泡形成"网"，将鱼群困在气泡柱中，然后从下方冲上来大口吞食。座头鲸的歌声可以传播16,000公里，跨越整个大洋！不同海域的座头鲸唱不同的"方言"，但所有歌曲都在逐年缓慢演变——就像流行音乐一样有"潮流"。',
    threats: '船只撞击、渔具缠绕、海洋噪声干扰、气候变化影响食物链',
    citesStatus: 'CITES 附录I',
    population: '全球约80,000头（从捕鲸前的125,000头恢复中）',
    emoji: '🌊',
    position: { x: 60, y: 52 },
    lightSize: 52,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_344a61a9-6f50-4f17-a475-c83ee060fb8b.jpeg?sign=1811251619-e35c62cd33-0-2a4de9ef85bcfb1b642eb65290b1f0454738f7da5539f522c602c637b8a9f8dc',
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
      '中华鲟的寿命可达40年，性成熟需要14-26年——它们是鱼类中"大器晚成"的代表。中华鲟没有牙齿，口位于头部下方，靠伸缩口器在海底吸食底栖生物。三峡大坝和葛洲坝的修建彻底阻断了中华鲟的洄游通道，野生种群已几乎无法自然繁殖。',
    threats: '大坝阻断洄游通道、栖息地丧失、水污染、过度捕捞',
    citesStatus: 'CITES 附录II',
    population: '野生种群极度濒危，自然繁殖几乎中断',
    emoji: '🐟',
    position: { x: 78, y: 58 },
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
    position: { x: 30, y: 78 },
    lightSize: 35,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_75fc5fdd-fa17-4cb7-9aad-f5a74686c5bd.jpeg?sign=1810908376-99e2735628-0-0880cf0f26f2e79429c7165b062af1371d76857fc7199e7eb713ab6d351445ef',
  },
  {
    id: 'nautilus',
    name: '鹦鹉螺',
    latinName: 'Nautilus pompilius',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '鹦鹉螺是头足纲鹦鹉螺目鹦鹉螺科的海洋软体动物，是5亿年前寒武纪生命大爆发时期就存在的"活化石"，比恐龙还古老3亿年。鹦鹉螺是现生头足类中唯一保留外壳的种类，其螺旋壳的腔室结构完美体现了对数螺旋（黄金螺旋），被誉为"自然界最完美的数学"。鹦鹉螺通过调节壳内腔室的气体和液体比例来控制浮沉，这与潜水艇的原理完全一致——因此人类第一艘核潜艇被命名为"鹦鹉螺号"。',
    habitat: '深海珊瑚礁斜坡、水深100-500米的深水区域',
    funFact:
      '鹦鹉螺的壳是新房间不断生长的"公寓楼"——随着身体长大，它们会分泌新壳封住旧房间，搬进更大的新房间。被封闭的旧房间充满气体，成为浮力调节舱。鹦鹉螺有90多根触手，是章鱼的3倍多！它们白天潜伏在数百米深处，夜间才上浮到浅水觅食，这种垂直迁移已经持续了5亿年。鹦鹉螺的眼睛没有晶状体——只是一个小孔，像针孔相机一样成像，是"原始之眼"。',
    threats: '过度采集（壳作为工艺品和珠宝）、深海捕捞误捕、海洋酸化影响壳体生长',
    citesStatus: 'CITES 附录II',
    population: '具体数量未知，因壳贸易导致种群持续下降',
    emoji: '🐚',
    position: { x: 50, y: 80 },
    lightSize: 34,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_40d43b57-2d0a-4356-aba1-fedc616d926c.jpeg?sign=1811251618-ee529abe71-0-57233bd11bf904d7630edeca45aa2d3f63547a958af632f1b0cb7b6a53fd8dc7',
  },
  {
    id: 'sea-otter',
    name: '海獭',
    latinName: 'Enhydra lutris',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '海獭是食肉目鼬科海獭属的海洋哺乳动物，是地球上最可爱的海洋动物之一。海獭拥有世界上最密集的皮毛——每平方厘米约15万根毛发，是人类的数百倍密度，这层"毛皮大衣"是它们在冷水中保暖的唯一手段（它们没有鲸脂层）。海獭是会使用工具的动物——它们会把石头放在肚子上当砧板，用石头砸开贝壳和海胆，是已知最早使用工具的海洋哺乳动物。',
    habitat: '北太平洋沿岸、海带森林、近岸岩石海域',
    funFact:
      '海獭睡觉时会手拉手飘在水面上——这不是浪漫，而是为了防止被洋流冲散！海獭妈妈会把宝宝放在肚皮上当"小船"飘浮，宝宝毛太密甚至会浮在水面上像小皮球一样弹来弹去。海獭是海胆的克星——一只海獭每天能吃掉50只海胆。没有海獭控制海胆数量，海胆会吃光整片海带森林，形成"海胆荒漠"——海獭是海带森林生态系统的守护者。',
    threats: '历史皮毛贸易导致数量骤降、石油泄漏污染破坏皮毛保温功能、渔业冲突',
    citesStatus: 'CITES 附录I/II',
    population: '全球约100,000-150,000只',
    emoji: '🦦',
    position: { x: 70, y: 75 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_3ab01f7d-efbd-42e4-bf7c-22a8743a6223.jpeg?sign=1811251618-a4d7ab479b-0-bc7f210acf77866cbe7a3a0309b1d7b6661e5790e658a1ae692278d4e3e1a507',
  },
];

export const allSpecies = [...forestSpecies, ...oceanSpecies];
