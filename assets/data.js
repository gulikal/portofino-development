/*
  SAYTIN MƏZMUNU — bütün mətnlər, şirkətlər və əlaqə məlumatları bu fayldadır.
  Yeni şirkət əlavə etmək üçün "companies" siyahısına yeni blok əlavə edin.
  status: "active"  -> kart klik olunur və "url" ünvanına keçir
  status: "soon"    -> "Tezliklə" kartı kimi görünür
  status: "hidden"  -> saytda göstərilmir
  logo: "assets/logos/fayl.svg" (boş qalsa, mətn loqosu göstərilir)
*/
window.SITE = {
  defaultLang: "az",

  contact: {
    address: { az: "Bakı, Azərbaycan", ru: "Баку, Азербайджан", en: "Baku, Azerbaijan" },
    phone: "+994 XX XXX XX XX",
    email: "info@portofino.az",
    social: [
      { name: "Instagram", url: "#" },
      { name: "Facebook", url: "#" },
      { name: "LinkedIn", url: "#" }
    ]
  },

  companies: [
    {
      id: "portofino-residence",
      status: "active",
      url: "#",
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
      logo: "",
      logoText: [],
      tag: { az: "Tezliklə", ru: "Скоро", en: "Coming soon" },
      name: { az: "Yeni şirkət", ru: "Новая компания", en: "New company" },
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
      "nav.about": "Haqqımızda",
      "nav.companies": "Şirkətlər",
      "nav.contact": "Əlaqə",
      "hero.eyebrow": "Şirkətlər qrupu",
      "hero.title": "Etibarlı tikinti, davamlı dəyər",
      "hero.lead": "Portofino Development daşınmaz əmlak və tikinti sahəsində fəaliyyət göstərən şirkətləri vahid idarəetmə və keyfiyyət standartı altında birləşdirir.",
      "about.eyebrow": "Haqqımızda",
      "about.title": "Bir qrup, ortaq standart",
      "about.p1": "Portofino Development layihələrin planlaşdırılmasından tikintisinə və idarə olunmasına qədər bütün mərhələləri bir strukturda cəmləşdirir.",
      "about.p2": "Qrupa daxil olan hər bir şirkət öz sahəsində müstəqil fəaliyyət göstərir, lakin ortaq dəyərlərə, şəffaf idarəetməyə və yüksək keyfiyyət tələblərinə əsaslanır.",
      "pillar1.title": "Development",
      "pillar1.text": "Yaşayış və kommersiya layihələrinin planlaşdırılması və həyata keçirilməsi.",
      "pillar2.title": "Tikinti",
      "pillar2.text": "Layihələrin müasir texnologiyalar və keyfiyyətli materiallarla inşası.",
      "pillar3.title": "İdarəetmə",
      "pillar3.text": "Təhvildən sonra komplekslərin peşəkar və davamlı idarə olunması.",
      "companies.eyebrow": "Şirkətlərimiz",
      "companies.title": "Qrupa daxil olan şirkətlər",
      "companies.lead": "Hər bir şirkət haqqında ətraflı məlumatı onun rəsmi veb-saytında tapa bilərsiniz.",
      "card.visit": "Sayta keçid",
      "card.soon": "Tezliklə",
      "footer.note": "Daşınmaz əmlak və tikinti sahəsində şirkətlər qrupu.",
      "footer.contact": "Əlaqə",
      "footer.companies": "Şirkətlər",
      "footer.social": "Sosial şəbəkələr",
      "footer.rights": "Bütün hüquqlar qorunur."
    },
    ru: {
      "meta.title": "Portofino Development — Группа компаний",
      "meta.description": "Portofino Development — группа компаний в сфере недвижимости и строительства.",
      "nav.about": "О нас",
      "nav.companies": "Компании",
      "nav.contact": "Контакты",
      "hero.eyebrow": "Группа компаний",
      "hero.title": "Надёжное строительство, долговечная ценность",
      "hero.lead": "Portofino Development объединяет компании в сфере недвижимости и строительства под единым управлением и общим стандартом качества.",
      "about.eyebrow": "О нас",
      "about.title": "Одна группа, общий стандарт",
      "about.p1": "Portofino Development объединяет в одной структуре все этапы проекта: от планирования и строительства до управления.",
      "about.p2": "Каждая компания группы работает самостоятельно в своей сфере, но опирается на общие ценности, прозрачное управление и высокие требования к качеству.",
      "pillar1.title": "Девелопмент",
      "pillar1.text": "Планирование и реализация жилых и коммерческих проектов.",
      "pillar2.title": "Строительство",
      "pillar2.text": "Возведение объектов с применением современных технологий и качественных материалов.",
      "pillar3.title": "Управление",
      "pillar3.text": "Профессиональное управление комплексами после сдачи.",
      "companies.eyebrow": "Наши компании",
      "companies.title": "Компании группы",
      "companies.lead": "Подробную информацию о каждой компании вы найдёте на её официальном сайте.",
      "card.visit": "Перейти на сайт",
      "card.soon": "Скоро",
      "footer.note": "Группа компаний в сфере недвижимости и строительства.",
      "footer.contact": "Контакты",
      "footer.companies": "Компании",
      "footer.social": "Социальные сети",
      "footer.rights": "Все права защищены."
    },
    en: {
      "meta.title": "Portofino Development — Group of Companies",
      "meta.description": "Portofino Development is a group of companies in real estate and construction.",
      "nav.about": "About",
      "nav.companies": "Companies",
      "nav.contact": "Contact",
      "hero.eyebrow": "Group of companies",
      "hero.title": "Reliable construction, lasting value",
      "hero.lead": "Portofino Development brings real estate and construction companies together under one management approach and one standard of quality.",
      "about.eyebrow": "About us",
      "about.title": "One group, one standard",
      "about.p1": "Portofino Development brings every stage of a project into one structure, from planning and construction to management.",
      "about.p2": "Each company in the group works independently in its own field, built on shared values, transparent management and high quality requirements.",
      "pillar1.title": "Development",
      "pillar1.text": "Planning and delivering residential and commercial projects.",
      "pillar2.title": "Construction",
      "pillar2.text": "Building with modern technology and quality materials.",
      "pillar3.title": "Management",
      "pillar3.text": "Professional, long-term management of completed complexes.",
      "companies.eyebrow": "Our companies",
      "companies.title": "Companies in the group",
      "companies.lead": "Find full details about each company on its official website.",
      "card.visit": "Visit website",
      "card.soon": "Coming soon",
      "footer.note": "A group of companies in real estate and construction.",
      "footer.contact": "Contact",
      "footer.companies": "Companies",
      "footer.social": "Social media",
      "footer.rights": "All rights reserved."
    }
  }
};
