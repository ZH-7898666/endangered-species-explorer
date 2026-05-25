export interface Species {
  id: string;
  name: string;
  latinName: string;
  category: 'forest' | 'ocean';
  level: 'CR' | 'EN' | 'VU' | 'NT';
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
  {
    id: 'malayan-tapir',
    name: '马来貘',
    latinName: 'Tapirus indicus',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '马来貘是奇蹄目貘科貘属的大型哺乳动物，是东南亚热带雨林的标志性物种，也是亚洲唯一现存的貘类。马来貘最显著的特征是身体前半部分和四肢为黑色，后半部分为白色，这种独特的黑白配色被称为"鞍状纹"，在密林月光下能产生视觉破碎效果，帮助它们融入斑驳的林间光影。马来貘体型庞大，体重可达300-400公斤，却极其温顺害羞，主要在夜间活动，以嫩叶、果实和水生植物为食。',
    habitat: '东南亚热带低地雨林、山地森林、沼泽地带',
    funFact:
      '马来貘的鼻子和上唇演化成了一个灵活的"短象鼻"，可以卷曲抓取树叶，也能在水下像呼吸管一样伸出水面呼吸！貘类被称为"活化石"——它们的身体形态在过去3500万年里几乎没有变化，是地球上最古老的大型哺乳动物类群之一。幼年马来貘全身布满白色条纹和斑点，像一颗行走的西瓜，这种伪装色在斑驳的林间光影中极为有效。',
    threats: '热带雨林大规模砍伐、棕榈油种植园扩张、非法捕猎、道路建设导致栖息地破碎化',
    citesStatus: 'CITES 附录I',
    population: '全球约2,500-3,000只（持续下降）',
    emoji: '🦓',
    position: { x: 30, y: 70 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_ae9ef9ba-0d80-475b-b0e6-d31f50ef584b.jpeg?sign=1811261944-32c1cf367f-0-05216ae7047816898bf8d240207dd10fefe0e8892b1225f63b129cab67d0f4d2',
  },
  {
    id: 'slow-loris',
    name: '懒猴',
    latinName: 'Nycticebus',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '懒猴是灵长目懒猴科懒猴属的小型夜行性灵长类动物，广泛分布在东南亚的热带、亚热带森林中。懒猴拥有一双巨大的圆形眼睛，可以在极暗的夜间看清猎物，是东南亚热带雨林中最可爱的夜行者。懒猴行动缓慢但极其精准，以昆虫、树胶、花蜜和果实为食。懒猴是世界上唯一的有毒灵长类动物——它们手臂内侧的腺体会分泌毒性油脂，与唾液混合后可产生剧毒，用于防御和捕猎。',
    habitat: '东南亚热带雨林、竹林、果园、次生林',
    funFact:
      '懒猴是唯一的"毒液灵长类"——它们会将毒液涂抹在幼崽身上作为保护！被懒猴咬伤后会出现过敏性休克，严重时可能致命。懒猴在宠物贸易中极受欢迎，但被贩卖前商贩会残忍地拔掉它们的牙齿——这是导致大量懒猴死亡的直接原因。懒猴的"举手"动作看似可爱，实际上是在激活毒腺的防御姿势。',
    threats: '非法宠物贸易（拔牙贩卖）、栖息地破坏、传统药用捕猎、社交媒体传播助长宠物需求',
    citesStatus: 'CITES 附录I',
    population: '全球野生种群持续下降，部分物种极度濒危',
    emoji: '🐵',
    position: { x: 65, y: 35 },
    lightSize: 28,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_740259cd-30a5-409b-9f19-2185cf56874a.jpeg?sign=1811261947-605d42a237-0-fd62879bc622e2dee951d2021e3d7c41363a88aa6334edcfd7c46f8dd2136606',
  },
  {
    id: 'sun-bear',
    name: '马来熊',
    latinName: 'Helarctos malayanus',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '马来熊是食肉目熊科马来熊属的小型熊类，是世界上体型最小的熊，体长仅约120-150厘米，体重27-65公斤。马来熊胸前有一标志性的金色U形或新月形斑纹，因此也被称为"太阳熊"。马来熊拥有所有熊类中最长的舌头（可达25厘米），用于伸入蜂巢舔食蜂蜜和掏取白蚁，是热带雨林中不可或缺的"蜂蜜爱好者"。马来熊是树栖性最强的熊类，大部分时间在树冠层活动，是热带雨林的"空中杂技演员"。',
    habitat: '东南亚热带低地雨林、山地森林',
    funFact:
      '马来熊的舌头长达25厘米，可以深入蜂巢和蚁穴取食——当地人因此称它为"蜜熊"。马来熊是森林的"种子传播者"——它们吃下的果实种子经过消化道后随粪便排出，帮助植物扩散。马来熊的幼崽会骑在妈妈背上活动，这在熊类中是独一无二的行为！它们还会建造"树床"——用树枝和树叶在树上搭建舒适的休息平台。',
    threats: '热带雨林砍伐、棕榈油种植园扩张、非法捕猎（熊胆贸易）、宠物贸易',
    citesStatus: 'CITES 附录I',
    population: '全球野生种群在过去30年下降超过30%',
    emoji: '🐻',
    position: { x: 45, y: 55 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_023fe865-1d12-4324-a158-191d1cce7a19.jpeg?sign=1811261945-e62583e167-0-5646d955500e1e6af46739ac93c1101b640fa1ec3a81de342f39e1c092932625',
  },
  {
    id: 'proboscis-monkey',
    name: '长鼻猴',
    latinName: 'Nasalis larvatus',
    category: 'forest',
    level: 'EN',
    levelName: '濒危',
    description:
      '长鼻猴是灵长目猴科长鼻猴属的大型灵长类动物，是婆罗洲的特有物种。长鼻猴最显著的特征是雄性拥有一个巨大而下垂的鼻子，长度可达10厘米以上，在激动时会充血膨胀变大。这个大鼻子既是性选择的标志，也是声音共鸣的"扩音器"——雄性通过鼻子发出响亮的鼻音叫声来宣示领地和吸引雌性。长鼻猴是唯一会反刍的灵长类动物，拥有像牛一样的多室胃，可以消化含有毒素的红树林树叶。',
    habitat: '婆罗洲红树林、沼泽林、河流沿岸低地雨林',
    funFact:
      '长鼻猴的大鼻子不仅是"颜值"标志——它还是一个天然扩音器，雄性能通过鼻子发出响亮的"鼻音号角"声！长鼻猴是灵长类中唯一的"反刍专家"——拥有3-4个胃室，可以消化其他猴子无法食用的有毒树叶。长鼻猴的脚趾间有半蹼，是游泳健将——它们经常跳入河中游泳，甚至能潜水逃生。幼年长鼻猴出生时脸是蓝色的，随着年龄增长逐渐变暗！',
    threats: '红树林砍伐、棕榈油种植园扩张、森林火灾、非法捕猎',
    citesStatus: 'CITES 附录I',
    population: '全球约7,000只（持续下降）',
    emoji: '🐒',
    position: { x: 20, y: 40 },
    lightSize: 34,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_0a3c6be6-d71b-45ee-ba4e-a8370c878c6d.jpeg?sign=1811261944-f41cc41e3b-0-dd268707f803e489b7b89928cb7332b0de6947023e67ae112d7f6a59c50c59a8',
  },
  {
    id: 'sunda-pangolin',
    name: '穿山甲',
    latinName: 'Manis javanica',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '穿山甲是鳞甲目穿山甲科穿山甲属的哺乳动物，是世界上被非法贩卖最多的野生哺乳动物——每5分钟就有一只穿山甲被捕获。穿山甲全身覆盖着由角蛋白构成的坚硬鳞片（与人类指甲成分相同），受威胁时会蜷缩成球状，鳞片如同盔甲般保护身体。遗憾的是，这种完美的防御机制反而成了致命弱点——蜷缩的穿山甲极易被拾取，使盗猎变得毫不费力。穿山甲没有牙齿，靠一条比身体还长的黏性舌头捕食蚂蚁和白蚁，一只穿山甲每年可吃掉约700万只蚂蚁。',
    habitat: '东南亚热带雨林、次生林、灌丛、农田边缘',
    funFact:
      '穿山甲是地球上被走私最多的哺乳动物——占全球非法野生动物贸易的20%！穿山甲的鳞片与人类指甲成分完全相同（角蛋白），没有任何药用价值，但传统医学仍大量使用。穿山甲的舌头从骨盆根部生长，比整个身体还要长，可以深入蚁穴40厘米！穿山甲宝宝会骑在妈妈尾巴上出行，鳞片朝外形成"活盔甲"。穿山甲是森林的"天然害虫控制师"——每只每年可消灭700万只白蚁和蚂蚁。',
    threats: '非法捕猎和贸易（鳞片药用、肉食用）、栖息地破坏、棕榈油种植园扩张',
    citesStatus: 'CITES 附录I',
    population: '全球种群在过去20年下降超过80%',
    emoji: '🐾',
    position: { x: 78, y: 65 },
    lightSize: 30,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_20bef334-eea1-4563-a1c8-d716384c0008.jpeg?sign=1811261997-296e61e2a8-0-e93864a39d17d9a6ff686d177db6cf141155a4ce95cd2e65174af0ae94a73fa2',
  },
  {
    id: 'amur-leopard',
    name: '远东豹',
    latinName: 'Panthera pardus orientalis',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '远东豹是猫科豹属的亚种，是世界上最稀有的大型猫科动物之一，仅分布在俄罗斯远东地区和中国东北的温带阔叶混交林中。远东豹拥有所有豹亚种中最厚实、最华丽的毛皮——密集的玫瑰状斑纹在冬季会变得更加深长，以适应零下30℃的严寒。远东豹是独居性动物，领地范围可达数百平方公里，是真正的"森林之王"。它们是极其出色的攀爬者，可以将比自身还重的猎物拖上树冠，防止被其他掠食者抢夺。',
    habitat: '温带阔叶混交林、山地针叶林、河流谷地',
    funFact:
      '远东豹是"猫科界的超级模特"——毛皮上的玫瑰状花纹比任何时尚品牌都精致，且每只豹的花纹都独一无二，如同指纹！远东豹能在零下30℃的严寒中生存，是唯一适应雪地环境的豹亚种。它们是"力与美的化身"——能拖动比自身重2倍的猎物爬上10米高的树！全球野生远东豹的数量曾一度不足30只，经过严格保护后缓慢恢复至约120只，是大型猫科动物保护中最艰难的战役之一。',
    threats: '栖息地破碎化、猎物基数下降、盗猎（毛皮贸易）、与东北虎竞争、近亲繁殖',
    citesStatus: 'CITES 附录I',
    population: '全球约120-130只（2024年估计）',
    emoji: '🐆',
    position: { x: 55, y: 25 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_f7419caf-7ed6-480b-9753-3177d593c2af.jpeg?sign=1811261945-9b0b7179b4-0-68c05c793629364cbbb0ce100804bec11a0a6381889e76a37ef5c7408918c714',
  },
  {
    id: 'golden-eagle',
    name: '金雕',
    latinName: 'Aquila chrysaetos',
    category: 'forest',
    level: 'VU',
    levelName: '易危',
    description:
      '金雕是鹰形目鹰科雕属的大型猛禽，是北半球分布最广的大型雕类之一，也是中国文化中"雕"的原型物种。金雕翼展可达2.3米，俯冲速度可达320公里/小时，是天空中的顶级猎手。金雕拥有极其敏锐的视力，可以在3公里外发现猎物，视觉分辨率是人类的8倍。金雕终生配对，每对会建立多个巢穴并在不同年份轮换使用，有些巢穴经过代代修缮可达2米高、1吨重。',
    habitat: '山地森林、悬崖岩壁、开阔草原、高原地区',
    funFact:
      '金雕的俯冲速度可达320公里/小时——比高铁还快！金雕的握力达到440 PSI（磅/平方英寸），是人类的10倍——可以在飞行中捏碎猎物的骨骼。金雕夫妇会共同筑巢，有些巢穴经过几代雕修缮后重量超过1吨，堪称"空中城堡"。蒙古族的猎人至今仍骑着马、手臂上架着金雕进行传统狩猎——这项古老传统已有6000年历史！',
    threats: '栖息地破坏、非法捕猎、农药二次中毒、风电场碰撞、人为干扰',
    citesStatus: 'CITES 附录II',
    population: '全球约30万只，但部分地区种群严重下降',
    emoji: '🦅',
    position: { x: 38, y: 18 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_b334253c-9361-429c-802c-2a0d2edef0cb.jpeg?sign=1811261944-42db361b83-0-5841b4ac94a3bf0579bd69c6382fec36f9ac44f130b67f360bd123384bf9e77f',
  },
  {
    id: 'bornean-orangutan',
    name: '婆罗洲猩猩',
    latinName: 'Pongo pygmaeus',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '婆罗洲猩猩是灵长目人科猩猩属的大型类人猿，是人类的近亲之一，DNA相似度达97%。婆罗洲猩猩拥有红色的长毛、宽阔的面颊肉垫（雄性）和极高的智力——它们会制造工具、使用树叶做手套和雨伞、甚至能学会手语交流。猩猩是最大的树栖哺乳动物，雄性体重可达90公斤，却能在树冠间灵活穿行。它们每天晚上都会用树枝和树叶搭建新的"床铺"——一生中要建造超过3万个巢穴。',
    habitat: '婆罗洲热带低地和山地雨林、泥炭沼泽林',
    funFact:
      '婆罗洲猩猩是"森林的建筑师"——每天晚上都会用树枝搭建新巢，一生建造超过3万个！猩猩的臂展可达2.4米，是真正的"丛林泰山"。它们的智力极高——会用树叶当手套处理带刺的果实、用树枝钓白蚁、甚至学会了手语。猩猩妈妈照顾幼崽长达8年——是哺乳动物中除人类外最长的育儿期！过去20年，婆罗洲猩猩失去了超过一半的栖息地，主要原因是棕榈油种植园的扩张。',
    threats: '棕榈油种植园大规模砍伐雨林、森林火灾、非法宠物贸易、猎杀',
    citesStatus: 'CITES 附录I',
    population: '全球约104,700只（持续快速下降）',
    emoji: '🦧',
    position: { x: 50, y: 42 },
    lightSize: 44,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_77fb6151-bc91-492a-901c-6f5019453bb5.jpeg?sign=1811261971-af941a3ffb-0-bbd1c7337486869c5abd78f1cc4a44e2d87705090d5453b97c509631cc917468',
  },
  {
    id: 'japanese-giant-salamander',
    name: '日本大鲵',
    latinName: 'Andrias japonicus',
    category: 'forest',
    level: 'NT',
    levelName: '近危',
    description:
      '日本大鲵是有尾目隐鳃鲵科大鲵属的两栖动物，是世界上最长的两栖动物——体长可达1.5米，体重超过25公斤。日本大鲵是真正的"活化石"——其祖先可追溯至1.7亿年前的侏罗纪，身体形态在过去数千万年间几乎没有变化。日本大鲵完全水生，终生保留幼体特征（鳃裂退化但保留呼吸功能），皮肤布满皱纹和褶皱用于增加氧气吸收面积。它们是山区溪流的顶级捕食者，可以10年不进食仍存活。',
    habitat: '日本中部和西部山区清澈溪流、河流、湖泊',
    funFact:
      '日本大鲵是两栖动物中的"老祖宗"——其血统可追溯至1.7亿年前的侏罗纪，与恐龙同时代！日本大鲵的代谢极其缓慢——可以长达10年不进食仍然存活，堪称动物界的"辟谷大师"。它们的皮肤布满褶皱，是为了增大表面积吸收水中溶解氧——这种"皮肤呼吸"效率极高，几乎不需要肺部。日本大鲵的咬合力惊人——可以轻松咬断人的手指！在日本当地被称为"半截子"，因为常被误认为是河童（日本水妖）的原型。',
    threats: '栖息地河流改道和筑坝、水污染、与外来种美洲大鲵杂交、气候变化',
    citesStatus: 'CITES 附录I',
    population: '全球种群持续下降',
    emoji: '🦎',
    position: { x: 42, y: 80 },
    lightSize: 28,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_35b3d1c1-160a-4963-801a-45317ecb2b36.jpeg?sign=1811262001-f6007f6582-0-0f6ffe526bc26069f12f924d57c31a6d42ce3c9eef719ae14e472ffa6e85d486',
  },
  {
    id: 'philippine-eagle',
    name: '食猿雕',
    latinName: 'Pithecophaga jefferyi',
    category: 'forest',
    level: 'CR',
    levelName: '极危',
    description:
      '食猿雕是鹰形目鹰科食猿雕属的大型猛禽，是菲律宾的国鸟，也是世界上最稀有、最强大的森林雕类。食猿雕翼展可达2.2米，拥有极其华丽的羽冠和锐利的目光，被誉为"森林之王"和"空中之虎"。食猿雕是热带雨林的顶级捕食者，以猴子、飞鼠、蝙蝠和大型蜥蜴为食——它是世界上唯一以灵长类为主要猎物的猛禽。每对食猿雕需要25-50平方公里的领地，繁殖率极低——每2年才繁殖一次，每次只产一枚卵。',
    habitat: '菲律宾热带低地和山地原始雨林',
    funFact:
      '食猿雕是"热带雨林的天空之王"——翼展超过2米，是世界上最大、最强壮的森林雕类！食猿雕每2年才繁殖一次，每次只产1枚卵——是鸟类中繁殖率最低的物种之一。幼鸟需要5-7个月才能离巢，期间父母双方轮流照料。食猿雕的羽冠在兴奋时会竖起——如同戴了一顶华丽的王冠！菲律宾将食猿雕列为国鸟，杀一只最高可判12年监禁。然而即便有法律保护，它们的栖息地仍以惊人速度消失。',
    threats: '热带雨林大规模砍伐、采矿、农业开发、非法射杀',
    citesStatus: 'CITES 附录I',
    population: '全球约800只（极度濒危）',
    emoji: '🦅',
    position: { x: 15, y: 55 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_8681789f-ad12-4af8-9ff5-11491bcc117a.jpeg?sign=1811262001-313683ff9-0-e6bbbfc7988ea027e02ad944ae990f5952528da2c0d9b88999351bd61b767413',
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
  {
    id: 'leafy-seadragon',
    name: '叶海龙',
    latinName: 'Phycodurus eques',
    category: 'ocean',
    level: 'NT',
    levelName: '近危',
    description:
      '叶海龙是海龙科海龙属的海洋鱼类，是南澳大利亚的海洋标志动物。叶海龙身上长满了像海藻叶子一样的附属物，这些"叶子"完全是装饰——不像真海藻那样能进行光合作用，但让叶海龙完美融入海带丛中，堪称海洋界的伪装大师。叶海龙与海马是近亲，同样由雄性怀孕生子——雌性将卵产在雄性尾部的育儿囊中，由雄性孵化约8周后生产。',
    habitat: '澳大利亚南部沿海海带森林、岩石礁区、海草床',
    funFact:
      '叶海龙是世界上最慢的游泳者之一——它的小鳍几乎透明，每秒只振动几次，移动速度约每小时150米，比蜗牛还慢！但正是这种"慢"成就了它的伪装策略——在水流中它就像一片漂浮的海藻。叶海龙是南澳大利亚的海洋标志，出现在当地的车牌上。它那华丽的叶状附肢一旦被咬掉就无法再生，所以伪装是它唯一的防御——一旦暴露就无处可逃。',
    threats: '非法采集（水族贸易）、栖息地退化（海带森林减少）、海洋变暖',
    citesStatus: 'CITES 附录II',
    population: '数量难以估计，因伪装极好不易调查',
    emoji: '🐉',
    position: { x: 25, y: 72 },
    lightSize: 30,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_56de1c6f-a719-4f8c-a516-776587fa6657.jpeg?sign=1811254698-8eb79e403d-0-c3b1d2880b8ef52fe4b16421e21fb09ae317a0b71035dd04c5bd10fd5103778b',
  },
  {
    id: 'napoleon-wrasse',
    name: '苏眉鱼',
    latinName: 'Cheilinus undulatus',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '苏眉鱼是隆头鱼科唇鱼属的大型珊瑚礁鱼类，是世界上最大的珊瑚礁鱼类之一，成鱼体长可达2米以上，体重可达190公斤。苏眉鱼最显著的特征是额头高高隆起的"拿破仑帽"，因此英文名叫Napoleon wrasse。它们是珊瑚礁生态系统的顶级捕食者之一，以有毒的棘冠海星为食——是少数能控制这种珊瑚杀手的天然力量。',
    habitat: '印度-太平洋热带珊瑚礁、潟湖、外礁斜坡',
    funFact:
      '苏眉鱼是珊瑚礁的"医生"——它们会定期前往"清洁站"，让清洁鱼和清洁虾帮它们清除寄生虫。苏眉鱼是性转换大师——所有个体出生时都是雌性，长到一定年龄后最大的雌鱼会变性为雄性！苏眉鱼极其聪明，能认出常喂它的潜水员并主动靠近互动，被潜水员称为"海中狗狗"。在一些东南亚国家，食用苏眉鱼是地位的象征，一条可售数万元，这恰恰加速了它们的灭亡。',
    threats: '过度捕捞（高档海鲜消费）、活鱼贸易、栖息地退化（珊瑚礁破坏）',
    citesStatus: 'CITES 附录II',
    population: '过去30年减少超过50%',
    emoji: '🐟',
    position: { x: 40, y: 68 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_3a0b02d6-2341-4fc9-ab63-927b79956994.jpeg?sign=1811254699-cbd34bb454-0-7d11d3041c542b7e4adb2b996d75ee959b182a27e846038eab53379122188164',
  },
  {
    id: 'giant-octopus',
    name: '北太平洋巨型章鱼',
    latinName: 'Enteroctopus dofleini',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '北太平洋巨型章鱼是章鱼科肠章鱼属的海洋软体动物，是世界上体型最大的章鱼物种，臂展可达6米以上，体重可达50公斤。巨型章鱼拥有3颗心脏、9个大脑（1个中央大脑+8个触手各1个迷你脑）和蓝色血液（含铜的血蓝蛋白代替含铁的血红蛋白）。它们是无脊椎动物中智力最高的物种，能开瓶盖、走迷宫、模仿其他动物，甚至学会观察模仿同类行为。',
    habitat: '北太平洋沿岸、从潮间带到水深200米的岩石礁区',
    funFact:
      '巨型章鱼的每个吸盘上有数千个化学感受器——相当于2亿个味蕾（人类只有1万个），它们用触手"品尝"一切触碰的东西。巨型章鱼妈妈是自然界最极致的牺牲者——产卵后6个月内寸步不离守护卵，不进食不离开，直到卵孵化后自己走向死亡。章鱼的心跳和呼吸频率会随情绪变化——紧张时心跳可以从每分钟40次飙升至140次。它们还能编辑自己的RNA来适应环境温度变化，这在动物界极其罕见。',
    threats: '海洋温度升高、栖息地退化、过度捕捞、海洋酸化',
    citesStatus: 'CITES 附录II',
    population: '因寿命短（3-5年）难以精确统计，部分地区数量下降',
    emoji: '🐙',
    position: { x: 85, y: 72 },
    lightSize: 34,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_090eef82-678f-4bd7-ae74-fd06efe40516.jpeg?sign=1811254697-c51d4861e7-0-0ee6ce6af39e497ec886e3d8a5ea92de7c86a69ca14d53a385b7347625f4002c',
  },
  {
    id: 'ocean-sunfish',
    name: '翻车鱼',
    latinName: 'Mola mola',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '翻车鱼是翻车鲀科翻车鲀属的海洋鱼类，是世界上最重的硬骨鱼，成年个体体重可达1000-2300公斤。翻车鱼外形奇特——像一个被剪掉后半身的大鱼头，尾鳍退化成波浪形的"伪尾"。翻车鱼是海洋中的"太阳崇拜者"——它们经常侧翻身体漂浮在海面上晒太阳，这个行为被称为"晒日光浴"，可能是为了给体表的寄生虫"消毒"或帮助消化。',
    habitat: '全球温带和热带海域、远洋开放水域、偶尔靠近沿海',
    funFact:
      '翻车鱼是产卵冠军——一次可产3亿颗卵，是已知脊椎动物中产卵量最大的！但成活率极低，从3亿颗卵中只有约2条能长大成年。翻车鱼的皮肤是海洋中最厚的——厚达7.5厘米，上面长满了超过40种寄生虫，以至于它们会请海鸥"做SPA"——浮出海面让海鸥啄食寄生虫。翻车鱼游泳技术很差，主要靠背鳍和臀鳍像桨一样交替划水，速度只有每小时3公里，是海洋中最慢的大型鱼类之一。',
    threats: '误捕（延绳钓和拖网渔业兼捕）、海洋塑料污染（误食塑料袋）、栖息地退化',
    citesStatus: 'CITES 附录II',
    population: '全球数量难以估计，部分地区明显下降',
    emoji: '🌕',
    position: { x: 55, y: 55 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_e5ff958a-1ea7-4ad0-aea3-af9a7739ba07.jpeg?sign=1811254720-6f537a3b44-0-f5f0dcfc253a9df67730e3662821a285cc3034ea29b1084228a87fdee3483fb5',
  },
  {
    id: 'coral-reef',
    name: '珊瑚礁生态系统',
    latinName: 'Scleractinia spp.',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '珊瑚礁是地球上生物多样性最高的生态系统之一——虽然仅占海洋面积的0.1%，却养育了25%以上的海洋物种。珊瑚本身是动物——它们是刺胞动物门珊瑚虫纲的生物，与水母、海葵是近亲。造礁珊瑚与体内的虫黄藻形成共生关系——虫黄藻通过光合作用为珊瑚提供90%以上的能量，同时赋予珊瑚斑斓的色彩。全球已知的造礁珊瑚超过800种，其中多种被列入CITES附录II。',
    habitat: '热带和亚热带浅海、水深不超过50米的清澈温暖水域',
    funFact:
      '大堡礁是地球上最大的生物结构——从太空中肉眼可见，面积比意大利还大！珊瑚礁是海洋的"热带雨林"——每平方米的物种数量甚至超过热带雨林。珊瑚的繁殖方式极其浪漫——每年同一个夜晚，整个大堡礁的珊瑚会同步释放卵子和精子，海水中飘满粉红色的"珊瑚雪"，这个现象被称为"珊瑚产卵"。珊瑚礁每年为全球经济贡献约3750亿美元（渔业、旅游、海岸保护），却正在以人类历史上前所未有的速度消失。',
    threats: '海水温度升高导致白化、海洋酸化、过度捕捞、污染、破坏性渔业',
    citesStatus: 'CITES 附录II（所有石珊瑚目物种）',
    population: '全球珊瑚礁在过去30年减少了50%以上',
    emoji: '🪸',
    position: { x: 15, y: 82 },
    lightSize: 32,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_5c4d82ba-4eb5-4184-92e1-b640dbebc538.jpeg?sign=1811254721-aa3da04f2b-0-adb123f0f0823de9f911147e3dbc852ff5c79779a3bdfb263ee89cde72969348',
  },
  {
    id: 'vaquita',
    name: '小头鼠海豚',
    latinName: 'Phocoena sinus',
    category: 'ocean',
    level: 'CR',
    levelName: '极危',
    description:
      '小头鼠海豚是鼠海豚科鼠海豚属的海洋哺乳动物，是世界上最稀有的鲸类动物，也是最濒危的海洋哺乳动物。小头鼠海豚仅分布在墨西哥加利福尼亚湾北部，体长仅约1.5米，体重约50公斤，是体型最小的鼠海豚。它们有着标志性的黑色眼圈，看起来像戴了一副"眼镜"，加上嘴角微微上翘，给人一种永远在微笑的可爱印象——但这份微笑正在消逝。',
    habitat: '墨西哥加利福尼亚湾北部浅水区',
    funFact:
      '小头鼠海豚可能是下一个灭绝的大型动物——2024年的估计仅剩不到10只！它们是海洋中的"隐士"——极其害羞，会主动躲避船只和人类，几乎从不跃出水面，很难被观察到。小头鼠海豚不是渔民的猎物——它们是被非法捕捞另一种濒危鱼类（石首鱼）的刺网"误杀"的。石首鱼的鱼鳔在中国黑市上可售数十万元（被称为"金钱鳘"），这种荒诞的贸易同时杀死了两个物种。科学家曾试图将小头鼠海豚迁往保护区，但第一次捕获尝试就导致一只死亡，项目被迫终止。',
    threats: '非法刺网误捕（石首鱼贸易附带伤害）、栖息地狭窄',
    citesStatus: 'CITES 附录I',
    population: '全球不足10只（2024年估计）',
    emoji: '🐬',
    position: { x: 75, y: 45 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_d4e15846-e89b-40cf-b1d7-ae583559b8fa.jpeg?sign=1811254721-f3026cc9e6-0-042a1d1f135b0a852de1d2372464da8f854b0f54edf8b5b015abb12f35a701f6',
  },
  {
    id: 'beluga-whale',
    name: '白鲸',
    latinName: 'Delphinapterus leucas',
    category: 'ocean',
    level: 'VU',
    levelName: '易危',
    description:
      '白鲸是鲸目一角鲸科白鲸属的中型鲸类，是北极最具代表性的海洋哺乳动物。白鲸通体纯白，额头上有一个圆润的脂肪隆起称为"额隆"，可以改变形状发出各种表情。白鲸被称为"海洋金丝雀"——它们是鲸类中叫声最丰富多样的物种，能发出口哨声、鸟鸣声、咔嗒声、铃铛声等至少11种不同的声音。白鲸极其聪明和好奇，会主动靠近人类、探出水面观察水上世界，水族馆中的白鲸甚至会模仿人类说话。',
    habitat: '北极和亚北极海域、河口、浅海湾',
    funFact:
      '白鲸是"海洋的金丝雀"——能发出至少11种不同的声音，包括口哨声、鸟鸣声和咔嗒声，是鲸类中最"健谈"的！白鲸的额头（额隆）可以改变形状——就像一个会动的"表情包"，这帮助它们改变声波聚焦方向。白鲸的脖子异常灵活——是少数能转动头部的鲸类，可以左右摇头"说不"。水族馆中有白鲸学会了模仿人类说话——它们会用不同的声调"打招呼"！白鲸幼崽出生时是灰色的，5-8岁才会变白——这是成长的"勋章"。',
    threats: '气候变化海冰减少、海洋污染（重金属和有机污染物）、船舶噪音干扰、石油开发',
    citesStatus: 'CITES 附录II',
    population: '全球约15万只，但部分种群极度濒危',
    emoji: '🐋',
    position: { x: 35, y: 30 },
    lightSize: 42,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_90042d95-1b42-4020-adc8-6f6b8ce570cd.jpeg?sign=1811261973-96e8009b43-0-620996f05d206b7e475e5a59d87021bdc8475f54b64855e2844c87191d67c4ff',
  },
  {
    id: 'narwhal',
    name: '独角鲸',
    latinName: 'Monodon monoceros',
    category: 'ocean',
    level: 'NT',
    levelName: '近危',
    description:
      '独角鲸是鲸目一角鲸科独角鲸属的中型鲸类，被称为"海中独角兽"——雄性独角鲸拥有一根从上唇伸出的螺旋形长牙，长度可达2.5-3米，这是大自然最神秘的器官之一。长久以来人们以为独角鲸的长牙是"角"，但科学研究发现它其实是一颗左犬齿——而且是唯一一颗突破唇面向外螺旋生长的牙齿。这颗牙并非用于战斗，而是布满了数百万个神经末梢的"超级传感器"，可以感知水温、盐度、压力和水中猎物的存在。',
    habitat: '北极海域、格陵兰岛和加拿大北部深水峡湾',
    funFact:
      '独角鲸的"角"其实是一颗牙——而且是一颗长反了的左犬齿！这颗牙上布满了1000万个神经末梢，是世界上最精密的"天然传感器"，可以感知水温、盐度和压力变化。中世纪欧洲人认为独角鲸的长牙是独角兽的角——一根牙的售价可以买下一座城堡！维京人正是靠贩卖"独角兽角"积累了巨额财富。独角鲸是"深潜冠军"——可以潜入1800米的深海，屏息长达25分钟！它们会集体"浮潜"——数十只同时垂直漂浮在水面上，露出长牙如同一片神秘的"牙之森林"。',
    threats: '气候变化海冰减少、人类航运增加、石油勘探噪音、传统猎杀',
    citesStatus: 'CITES 附录II',
    population: '全球约8万只',
    emoji: '🦄',
    position: { x: 60, y: 22 },
    lightSize: 40,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_a41999b4-01b9-47f3-aa9e-320367c17177.jpeg?sign=1811261970-a5f1335ff6-0-8e9b234c420ab76ad4d61891f916c2e8abf4d79d123d2113d1c9f559c1917005',
  },
  {
    id: 'harp-seal',
    name: '格陵兰海豹',
    latinName: 'Pagophilus groenlandicus',
    category: 'ocean',
    level: 'NT',
    levelName: '近危',
    description:
      '格陵兰海豹是食肉目海豹科格陵兰海豹属的中型海洋哺乳动物，是北极最标志性的动物之一。格陵兰海豹幼崽出生时全身覆盖雪白蓬松的胎毛，看起来像一团毛茸茸的白球，拥有黑色大而圆的眼睛，是世界上最可爱的幼年动物之一。这身白毛不仅是保暖神器，还是冰面上的完美伪装——在白色冰面上几乎不可见。幼崽在冰面上由母亲独自哺乳约12天，每天体重增加约2公斤，断奶时体重已是出生时的3倍，然后独自面对世界。',
    habitat: '北大西洋和北极海域冰面、浮冰区',
    funFact:
      '格陵兰海豹宝宝是"冰上棉花糖"——出生时全身雪白蓬松，看起来像一颗会动的毛球！白毛不仅可爱，还是完美的冰面伪装。海豹妈妈能在成千上万只幼崽中通过气味准确找到自己的孩子。幼崽只哺乳12天就被断奶——但12天里体重翻3倍，堪称"极速增肥"！加拿大每年仍有商业性海豹猎杀，数十万只白毛海豹幼崽被棒击致死——这是全球最大规模的海洋哺乳动物屠杀。海豹可以在水下屏息15分钟，潜入500米深——是真正的"深潜选手"。',
    threats: '商业猎杀（毛皮贸易）、气候变化海冰减少、海洋污染、渔网误捕',
    citesStatus: 'CITES 附录III',
    population: '全球约650万只，但部分种群因猎杀严重下降',
    emoji: '🦭',
    position: { x: 82, y: 38 },
    lightSize: 36,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_8c9cda09-2476-4be1-a43f-e30b2dcb1594.jpeg?sign=1811261998-429178ba15-0-83e33a640bc887ec753cd221c39ece9b1aec9276c7b5a35d916406688fc41bf2',
  },
  {
    id: 'coelacanth',
    name: '腔棘鱼',
    latinName: 'Latimeria chalumnae',
    category: 'ocean',
    level: 'CR',
    levelName: '极危',
    description:
      '腔棘鱼是腔棘鱼目腔棘鱼科腔棘鱼属的深海鱼类，是地球上最著名的"活化石"——科学家曾以为它们在6600万年前与恐龙一同灭绝，直到1938年一位南非博物馆馆主在渔获中发现了一条活着的腔棘鱼，轰动全球科学界。腔棘鱼体长可达1.8米，体重超过90公斤，拥有独特的叶状偶鳍——胸鳍和腹鳍如同四条肉质的"腿"，可以交替划动，仿佛在水中"行走"。这种独特的鳍结构被认为是鱼类向四足动物演化的关键过渡形态。',
    habitat: '印度洋西部深海洞穴、科摩罗群岛附近150-700米深水域',
    funFact:
      '腔棘鱼是"从6600万年前穿越来的旅行者"——科学家曾以为它们与恐龙一同灭绝了！1938年南非渔民意外捕获了一条活腔棘鱼，震惊了整个科学界——被称为"20世纪最伟大的动物学发现"。腔棘鱼的叶状鳍像四条"腿"——可以交替划动，仿佛在水中行走，可能是鱼类向陆地动物演化的关键环节！腔棘鱼的脑容量只占颅腔的1.5%——其余空间被脂肪填充，是"大头小脑"的典型代表。它们寿命可达100年，是鱼类中的"长寿冠军"。',
    threats: '深海拖网误捕、栖息地破坏、种群繁殖率极低、气候变化',
    citesStatus: 'CITES 附录I',
    population: '全球估计不足1,000条',
    emoji: '🐟',
    position: { x: 28, y: 60 },
    lightSize: 34,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_43cb19b7-0231-45dd-8a03-0147b006a464.jpeg?sign=1811261970-0aae0ff2f-0-5a9fb7d6de64bb911a5e10a55b28e39607298be7d4fd606c0ffa8f171f2a5c34',
  },
  {
    id: 'asian-arowana',
    name: '亚洲龙鱼',
    latinName: 'Scleropages formosus',
    category: 'ocean',
    level: 'EN',
    levelName: '濒危',
    description:
      '亚洲龙鱼是骨舌鱼目骨舌鱼科硬骨舌鱼属的古代淡水鱼，是东南亚热带河流中最珍贵的鱼类之一，也被称为"金龙鱼"。亚洲龙鱼拥有闪亮的金属质感鳞片，在光线下呈现出金色、红色或绿色的光泽，如同水中游动的龙。亚洲龙鱼是真正的"活化石"——其祖先可追溯至3.5亿年前的泥盆纪，身体形态几乎未变。在华人文化中，龙鱼被视为风水吉祥物，象征着财富和好运，顶级血统的金龙鱼在黑市上售价可达数十万美元。',
    habitat: '东南亚热带河流、沼泽、湖泊、黑水河流域',
    funFact:
      '亚洲龙鱼是"水下龙王"——在华人文化中被视为招财吉祥物，顶级金色品种售价可达30万美元！龙鱼是"超级奶爸"——雄性会将受精卵含在口中孵化，直到小鱼能独立生存，这种"口孵"行为可持续60天！龙鱼拥有"第六感"——侧线系统可以感知水中最微弱的振动，精确锁定猎物位置。龙鱼跳跃能力惊人——可以从水面跃起2米抓取树枝上的昆虫和鸟类！它们是世界上最古老的淡水鱼之一——血统可追溯至3.5亿年前，比恐龙还古老。',
    threats: '非法捕捞（观赏鱼贸易）、栖息地破坏、水污染、黑市高价驱动盗猎',
    citesStatus: 'CITES 附录I',
    population: '野生种群持续下降',
    emoji: '🐉',
    position: { x: 55, y: 68 },
    lightSize: 32,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_9d656caf-217a-4687-b010-44a1039eb7ff.jpeg?sign=1811261971-7020e99b63-0-8ca1c1474de9c088a019df034fa55d3d6d659cfdf41c50173b7d06b50bf1ba7a',
  },
  {
    id: 'mantis-shrimp',
    name: '雀尾螳螂虾',
    latinName: 'Odontodactylus scyllarus',
    category: 'ocean',
    level: 'NT',
    levelName: '近危',
    description:
      '雀尾螳螂虾是口足目齿指虾蛄科的大型甲壳动物，是海洋中最绚丽也最暴力的生物之一。雀尾螳螂虾拥有自然界中最复杂的视觉系统——16种感光细胞（人类仅3种），可以看到紫外线、偏振光和多达12种原色。它的身体如同一块流动的宝石，红、蓝、绿、金多种色彩交织，被BBC称为"海洋中最美的杀手"。雀尾螳螂虾的攻击速度堪称动物界最快——锤肢弹出速度达80公里/小时，加速度超过.22口径手枪子弹，瞬间产生水中空化气泡，冲击波足以击碎水族箱的强化玻璃。',
    habitat: '印度洋-太平洋热带珊瑚礁、海底碎石区、沙质海床',
    funFact:
      '雀尾螳螂虾拥有16种感光细胞——人类仅3种，它们看到的世界比任何动物都更丰富多彩！螳螂虾的拳头速度达80公里/小时——加速度超过子弹，冲击波足以击碎水族箱玻璃！它们的拳脚力量如此之大，以至于出拳时会使周围的水瞬间沸腾（空化效应），产生闪光和高温。螳螂虾可以看到紫外线和偏振光——这种能力被科学家用于研发新型光学传感器。它们是"恋爱专家"——部分种类终生一夫一妻，夫妻会通过荧光信号"聊天"。',
    threats: '珊瑚礁退化、海洋酸化、水污染、栖息地破坏',
    citesStatus: '未列入CITES附录',
    population: '种群数量尚可，但栖息地快速退化',
    emoji: '🦐',
    position: { x: 70, y: 75 },
    lightSize: 26,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_8ab15231-ac94-4d24-824d-0cad3bc5bd53.jpeg?sign=1811261997-cd2ace2d57-0-6e6ff66ca0c0dc0979d32c9fee9fa6d072abfb7d0abd68a63789d14adfb34d1',
  },
  {
    id: 'leatherback-turtle',
    name: '棱皮龟',
    latinName: 'Dermochelys coriacea',
    category: 'ocean',
    level: 'CR',
    levelName: '极危',
    description:
      '棱皮龟是龟鳖目棱皮龟科棱皮龟属的海洋爬行动物，是现存最大的龟类——体长可达2.5米，体重超过700公斤，也是潜水最深的爬行动物——可潜入1200米的深海。棱皮龟最独特的特征是没有硬壳——背甲由厚实的革质皮肤覆盖，上面有7条纵行棱脊，像一艘黑色的潜水艇。棱皮龟以水母为主食，每天可吃掉相当于自身体重73%的水母。然而，海中漂浮的塑料袋与水母极为相似，棱皮龟误食塑料后常因肠道堵塞而死亡——这是它们面临的最大威胁之一。',
    habitat: '全球热带、亚热带和温带海洋，迁徙距离可达16,000公里',
    funFact:
      '棱皮龟是"深海潜水冠军"——可以潜入1,200米的深海，比大多数鲸鱼潜得还深！棱皮龟没有硬壳——背甲是革质皮肤，像一艘柔软的"潜水艇"，可以在深水高压下不被压碎。棱皮龟每年迁徙16,000公里——从热带产卵海滩游到北极海域觅食，比任何其他爬行动物都远！棱皮龟专吃水母——但塑料袋与水母极其相似，误食后会导致肠道堵塞死亡。棱皮龟的体温调节系统在爬行动物中独一无二——它们是"温血爬行动物"，能在冰冷的海水中保持25℃的体温！',
    threats: '海洋塑料污染（误食塑料袋）、非法盗取龟蛋、渔业误捕、栖息地海滩开发',
    citesStatus: 'CITES 附录I',
    population: '全球约34,000只繁殖雌龟（过去30年下降超过70%）',
    emoji: '🐢',
    position: { x: 18, y: 50 },
    lightSize: 38,
    imageUrl:
      'https://coze-coding-project.tos.coze.site/coze_storage_7642337887874285568/image/generate_image_adc0eaf0-96ef-47cf-82de-1f6f4208046b.jpeg?sign=1811261999-57bac7fe25-0-0333994f6e703a28fde69dac24dba2b62ec8f67d504f316685eb30484ff8bb39',
  },
];

export const allSpecies = [...forestSpecies, ...oceanSpecies];
