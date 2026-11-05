/*
  SAYTIN MƏZMUNU — bütün mətnlər, şirkətlər və əlaqə məlumatları bu fayldadır.
  Yeni şirkət əlavə etmək üçün "companies" siyahısına yeni blok əlavə edin.
  status: "active"  -> kart klik olunur və "url" ünvanına keçir
  status: "soon"    -> "Tezliklə" kartı kimi görünür
  status: "hidden"  -> saytda göstərilmir
  image: "assets/img/fayl.jpg" (kartın şəkli; boş qalsa, brend fonu göstərilir)
  logo:  "assets/logos/fayl.svg" (boş qalsa, mətn loqosu göstərilir)
*/
window.SITE = {
  defaultLang: "az",

  contact: {
    address: { az: "Bakı, Azərbaycan", ru: "Баку, Азербайджан", en: "Baku, Azerbaijan" },
    phone: "+994 XX XXX XX XX",
    email: "info@portofino.az",
    social: [
      { name: "Instagram", icon: "instagram", url: "#" },
      { name: "Facebook", icon: "facebook", url: "#" },
      { name: "LinkedIn", icon: "linkedin", url: "#" }
    ]
  },

  stats: [
    { value: "15", label: { az: "bina, Portofino Residence", ru: "зданий, Portofino Residence", en: "buildings, Portofino Residence" } },
    { value: "12.8", label: { az: "hektar ərazi", ru: "гектаров территории", en: "hectares of land" } },
    { value: "2", label: { az: "fəaliyyət göstərən şirkət", ru: "действующие компании", en: "operating companies" } }
  ],

  companies: [
    {
      id: "portofino-residence",
      status: "active",
      url: "#",
      image: "assets/img/portofino-residence.jpg",
      logo: "",
      logoText: ["PORTOFINO", "RESIDENCE"],
      tag: { az: "Yaşayış kompleksi", ru: "Жилой комплекс", en: "Residential" },
      name: { az: "Portofino Residence", ru: "Portofino Residence", en: "Portofino Residence" },
      text: {
        az: "Sea Breeze-də, Xəzərin birinci sahil xəttində yerləşən yaşayış kompleksi.",
        ru: "Жилой комплекс на первой береговой линии Каспия в Sea Breeze.",
        en: "A residential complex on the Caspian first coastline in Sea Breeze."
      }
    },
    {
      id: "level-construction",
      status: "active",
      url: "#",
      image: "assets/img/level-construction.jpg",
      logo: "",
      logoText: ["LEVEL", "CONSTRUCTION"],
      tag: { az: "Tikinti", ru: "Строительство", en: "Construction" },
      name: { az: "Level Construction", ru: "Level Construction", en: "Level Construction" },
      text: {
        az: "Qrupun layihələrində tikinti və icra işlərini həyata keçirən şirkət.",
        ru: "Компания, выполняющая строительные работы по проектам группы.",
        en: "The company carrying out construction work across the group's projects."
      }
    },
    {
      id: "future-company",
      status: "soon",
      url: "",
      image: "",
      logo: "",
      logoText: [],
      tag: { az: "Yeni istiqamət", ru: "Новое направление", en: "New direction" },
      name: { az: "Tezliklə", ru: "Скоро", en: "Coming soon" },
      text: {
        az: "Portofino Development strukturuna daxil olacaq növbəti şirkət.",
        ru: "Следующая компания, которая войдёт в структуру Portofino Development.",
        en: "The next company to join the Portofino Development group."
      }
    }
  ],

  i18n: {
    az: {
      "meta.title": "Portofino Development — Şirkətlər qrupu",
      "meta.description": "Portofino Development tikinti və daşınmaz əmlak sahəsində fəaliyyət göstərən şirkətlər qrupudur.",
      "nav.home": "Ana səhifə",
      "nav.about": "Haqqımızda",
      "nav.companies": "Şirkətlər",
      "nav.values": "Yanaşmamız",
      "nav.contact": "Əlaqə",
      "hero.t1": "Etibarlı tikinti,",
      "hero.t2": "davamlı",
      "hero.t3": "dəyər.",
      "hero.lead": "Portofino Development daşınmaz əmlak və tikinti sahəsində fəaliyyət göstərən şirkətləri vahid idarəetmə və keyfiyyət standartı altında birləşdirir.",
      "hero.badge": "PORTOFINO DEVELOPMENT · ŞİRKƏTLƏR QRUPU · ",
      "about.label": "Haqqımızda",
      "about.t1": "Bir qrup,",
      "about.t2": "ortaq standart.",
      "about.p1": "Portofino Development layihələrin planlaşdırılmasından tikintisinə və idarə olunmasına qədər bütün mərhələləri bir strukturda cəmləşdirir.",
      "about.p2": "Qrupa daxil olan hər bir şirkət öz sahəsində müstəqil fəaliyyət göstərir, lakin ortaq dəyərlərə, şəffaf idarəetməyə və yüksək keyfiyyət tələblərinə əsaslanır.",
      "about.cta": "Şirkətlərimiz",
      "band.title": "Xəzər sahilində",
      "companies.label": "Şirkətlərimiz",
      "companies.lead": "Hər bir şirkət haqqında ətraflı məlumatı onun rəsmi veb-saytında tapa bilərsiniz.",
      "card.visit": "Sayta keçid",
      "card.soon": "Tezliklə",
      "values.label": "Yanaşmamız",
      "values.t1": "Planlaşdırma,",
      "values.t2": "tikinti,",
      "values.t3": "idarəetmə.",
      "values.lead": "Layihənin hər mərhələsi bir qrupun daxilində, eyni keyfiyyət tələbləri ilə həyata keçirilir.",
      "v1.title": "Development",
      "v1.text": "Yaşayış və kommersiya layihələrinin planlaşdırılması və həyata keçirilməsi.",
      "v2.title": "Tikinti",
      "v2.text": "Layihələrin müasir texnologiyalar və keyfiyyətli materiallarla inşası.",
      "v3.title": "İdarəetmə",
      "v3.text": "Təhvildən sonra komplekslərin peşəkar və davamlı idarə olunması.",
      "cta.t1": "Gələcəyi",
      "cta.t2": "birlikdə quraq",
      "cta.text": "Əməkdaşlıq və məlumat üçün bizimlə əlaqə saxlayın.",
      "footer.note": "Daşınmaz əmlak və tikinti sahəsində şirkətlər qrupu.",
      "footer.rights": "Bütün hüquqlar qorunur."
    },
    ru: {
      "meta.title": "Portofino Development — Группа компаний",
      "meta.description": "Portofino Development — группа компаний в сфере недвижимости и строительства.",
      "nav.home": "Главная",
      "nav.about": "О нас",
      "nav.companies": "Компании",
      "nav.values": "Подход",
      "nav.contact": "Контакты",
      "hero.t1": "Надёжное строительство,",
      "hero.t2": "долговечная",
      "hero.t3": "ценность.",
      "hero.lead": "Portofino Development объединяет компании в сфере недвижимости и строительства под единым управлением и общим стандартом качества.",
      "hero.badge": "PORTOFINO DEVELOPMENT · ГРУППА КОМПАНИЙ · ",
      "about.label": "О нас",
      "about.t1": "Одна группа,",
      "about.t2": "общий стандарт.",
      "about.p1": "Portofino Development объединяет в одной структуре все этапы проекта: от планирования и строительства до управления.",
      "about.p2": "Каждая компания группы работает самостоятельно в своей сфере, но опирается на общие ценности, прозрачное управление и высокие требования к качеству.",
      "about.cta": "Наши компании",
      "band.title": "На берегу Каспия",
      "companies.label": "Наши компании",
      "companies.lead": "Подробную информацию о каждой компании вы найдёте на её официальном сайте.",
      "card.visit": "Перейти на сайт",
      "card.soon": "Скоро",
      "values.label": "Наш подход",
      "values.t1": "Планирование,",
      "values.t2": "строительство,",
      "values.t3": "управление.",
      "values.lead": "Каждый этап проекта выполняется внутри одной группы, с едиными требованиями к качеству.",
      "v1.title": "Девелопмент",
      "v1.text": "Планирование и реализация жилых и коммерческих проектов.",
      "v2.title": "Строительство",
      "v2.text": "Возведение объектов с применением современных технологий и качественных материалов.",
      "v3.title": "Управление",
      "v3.text": "Профессиональное управление комплексами после сдачи.",
      "cta.t1": "Построим",
      "cta.t2": "будущее вместе",
      "cta.text": "Свяжитесь с нами по вопросам сотрудничества и информации.",
      "footer.note": "Группа компаний в сфере недвижимости и строительства.",
      "footer.rights": "Все права защищены."
    },
    en: {
      "meta.title": "Portofino Development — Group of Companies",
      "meta.description": "Portofino Development is a group of companies in real estate and construction.",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.companies": "Companies",
      "nav.values": "Approach",
      "nav.contact": "Contact",
      "hero.t1": "Reliable construction,",
      "hero.t2": "lasting",
      "hero.t3": "value.",
      "hero.lead": "Portofino Development brings real estate and construction companies together under one management approach and one standard of quality.",
      "hero.badge": "PORTOFINO DEVELOPMENT · GROUP OF COMPANIES · ",
      "about.label": "About us",
      "about.t1": "One group,",
      "about.t2": "one standard.",
      "about.p1": "Portofino Development brings every stage of a project into one structure, from planning and construction to management.",
      "about.p2": "Each company in the group works independently in its own field, built on shared values, transparent management and high quality requirements.",
      "about.cta": "Our companies",
      "band.title": "On the Caspian coast",
      "companies.label": "Our companies",
      "companies.lead": "Find full details about each company on its official website.",
      "card.visit": "Visit website",
      "card.soon": "Coming soon",
      "values.label": "Our approach",
      "values.t1": "Planning,",
      "values.t2": "construction,",
      "values.t3": "management.",
      "values.lead": "Every stage of a project is delivered inside one group, to the same quality requirements.",
      "v1.title": "Development",
      "v1.text": "Planning and delivering residential and commercial projects.",
      "v2.title": "Construction",
      "v2.text": "Building with modern technology and quality materials.",
      "v3.title": "Management",
      "v3.text": "Professional, long-term management of completed complexes.",
      "cta.t1": "Let's build",
      "cta.t2": "the future together",
      "cta.text": "Contact us about partnerships and information.",
      "footer.note": "A group of companies in real estate and construction.",
      "footer.rights": "All rights reserved."
    }
  }
};
