import { Offer } from './models/types';
export const OFFERS: Offer[] = [
  {
    id: 1,
    title:
      '78 видов массажей: классические, экзотические, SPA-ритуалы от 18 руб.',
    description: `Уважаемые клиенты, с 12 ноября ношение масок стало обязательным. Пожалуйста, надевайте маску в салоне, даже если вы здоровы. С заботой о вас, салон красоты "Марсель". Предварительная запись обязательна.
    Стоимость массажей: от 18 руб. от 30 руб. Стоимость и виды массажа смотрите ниже. Услуги расположены по возрастанию цены (от дешевых к дорогим)`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/massazh-klassicheskiy-ekzoticheskiy-spa-minsk-skidka-marsel-1.jpg',
    dateEnd: '01.04.21',
    discount: 'до 55%',
    vendorName: 'Марсель',
    // vendorDescription:
    //   'Марсель - крупнейшая в Беларуси сеть салонов красоты с акцентом на заботу о здоровье и красоте. Более 100 000 клиентов ежегодно пользуются многочисленными услугами, включая SPA на двоих, хамам, сауны, джакузи, кедровую бочку. Мобильное приложение, продажа сертификатов онлайн и оформление в открытках ручной работы делает обращение к нам приятным и особенным!',
    // vendorWebsite: 'https://marsel.by/';
    // vendorTitle: 'Марсель: салоны красоты Минска'
    numberOfUses: 21,
    numberOfViews: 215,
    offices: [
      {
        x: 53.950248766494305,
        y: 27.678503384991703,
        address: 'ул. Шафарнянская, д. 3',
        phoneNumber: '+ 375 29 668 16 97'
      },
      {
        x: 53.90630545040514,
        y: 27.579132898483202,
        address: 'ул. Захарова, д. 23 (пл. Победы, за МГЛУ налево)',
        phoneNumber: '+ 375 29 634 67 74'
      }
    ]
  },
  {
    id: 2,
    title:
      '10 новых сетов! Круглосуточно все меню со скидкой до 70% навынос + доставка',
    description: `Купон действует на одного человека.
      Купон действует на одно посещение центра.
      Купон действует на посещение аквапарка и банного комплекса.

      Купон действует на следующие виды услуг:

      Посещение в будние дни:
      — Скидка 70% на целый день посещения аквапарка и банного комплекса для детей в будние дни (125 руб. + доплата 740 руб. вместо 1730 руб.)
      — Скидка 70% на целый день посещения аквапарка и банного комплекса для взрослых в будние дни (125 руб. + доплата 1290 руб. вместо 2830 руб.)

      Посещение в выходные дни:
      — Скидка 70% на целый день посещения аквапарка и банного комплекса для детей в выходные дни (175 руб. + доплата 925 руб. вместо 2200 руб.)
      — Скидка 70% на целый день посещения аквапарка и банного комплекса для взрослых в выходные дни (225 руб. + доплата 1570 руб. вместо 3590 руб.)`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/1609413591_ChefArts_No_Logo_1528x972.jpg',
    dateEnd: '05.05.2021',
    discount: 'до 70%',
    vendorName: 'SushiChefArts',
    // vendorDescription: `Ароматное румяное тесто, усыпанное нежнейшим сыром, таящим во рту, украшенное пикантными колбасками и дольками сочных томатов, политое ароматным сливочным соусом, покорит ваше сердце раз и навсегда.
    // Наши профессионалы-пиццайоло знают толк в искусстве выпечки настоящей пиццы. Каждое блюдо фирменного меню разработано с учетом всех тонкостей европейской кухни: гармоничное сочетание отборных сыров, свежих помидор, грибов, нежнейших соусов и настоящего волшебнейшего теста.
    // Вам не придется долго думать, как порадовать себя и своих близких. Переходите в каталог нашего меню и скорее заказывайте пиццу для настоящего наслаждения.`,
    // vendorWebsite: 'https://pizzachefarts.by/';
    // vendorTitle: 'Доставка вкусной пиццы на дом'
    numberOfUses: 100,
    numberOfViews: 119,
    offices: [
      {
        x: 53.938102489505866,
        y: 27.488490327319887,
        address: 'пр. Победителей, д. 84 (ТРЦ «Арена Сити»)',
        phoneNumber: '+375 44 771-51-51'
      }
    ]
  },
  {
    id: 3,
    title:
      'Метровые пиццы за 21,95 руб/до 2100 г, пицца-сеты от 23,05 руб/до 1950 г',
    description: `- Получить промокод можно до 28.02, воспользоваться до 28.02.21
    - Внимание! Промокод необходимо предъявить или озвучить до заказа. В ином случае заказ считается недействительным
    - Внимание! Минимальная сумма заказа для доставки (с учетом скидки на пиццу!): 29 руб.
    - Внимание! 23 февраля акция не действует
    - В связи с высокой загруженностью время ожидания может быть увеличено
    - С понедельника по четверг акция действует в кафе, навынос и на доставку
    - С пятницы по воскресенье акция действует в кафе и навынос
    - Промокод дает право на скидку 50% на метровые пиццы от кафе "PizzaMania"
    - Стоимость пицц:
    - пицца "Мясо по-французски" 1 метр: 21,95 руб. 43,90 руб.
    - пицца "Деревенская" 1 метр: 21,95 руб. 43,90 руб.
    - Возможен заказ пицц из 2-х половинок`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/pizza-minsk-pizzamania-kar-9.jpg',
    dateEnd: '31.03.2021',
    discount: '40%',
    vendorName: 'PizzaMania',
    // vendorDescription: `Зона доставки расширена. Внимание! С 24.02.2020 В зону доставки входит весь г. Минск.
    // Минимальная сумма заказа. Минимальная сумма заказа для бесплатной доставки 15 руб.
    // Оплата. Оплата курьеру картой или наличными.
    // Доставка. Время работы службы доставки ежедневно с 10:00 до 23:00. Заказы принимаются до 22:30.
    // Изображения продуктов могут отличаться от продуктов в заказе.`,
    // vendorWebsite: 'https://pizzamania.by/';
    // vendorTitle: 'Убей голод'
    numberOfUses: 139,
    numberOfViews: 212,
    offices: [
      {
        x: 53.86553289876855,
        y: 27.45302363896044,
        address: 'ул. Рафиева, д. 44',
        phoneNumber: '+375 17 375-58-58'
      },
      {
        x: 53.883091927066054,
        y: 27.567344627318217,
        address: 'ул. Маяковского, д. 10',
        phoneNumber: '+375 17 375-58-58'
      },
      {
        x: 53.86734233325647,
        y: 27.65028647149643,
        address: 'ул. Центральная, д. 9',
        phoneNumber: '+375 44 553-40-00'
      },
      {
        x: 53.91137617684785,
        y: 27.542871240811902,
        address: 'пр-т Победителей, д. 23к1',
        phoneNumber: '+ 375 29 120 68 66'
      }
    ]
  },
  {
    id: 4,
    title:
      'Пицца до 36 см с доставкой и навынос, прямиком из печи, приготовлена из свежих ингридиентов',
    description: `- Статус самовывоза можно изменить только по предварительной договоренности с администратором
    - Промокод дает право на скидку до 60% на пиццы и пицца-сеты, указанные ниже, от "PizzaChefArts"

    🍕 Стоимость пицц: от 7,20 руб. от 18 руб.
    🍕 Стоимость сетов: от 22,80 руб. от 57 руб.

    - Внимание! Стоимость доставки не включена в стоимость пицц
    - Доставка: в пределах МКАД весь город + Ждановичи, Уручье, Копище, Шабаны 3 руб.
    - Один промокод - до 2-х пицц или один сет со скидкой.`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/glav2.jpg',
    promocode: 'UYT783I',
    discount: '60%',
    dateEnd: '09.06.2021',
    vendorName: 'SushiChefArts',
    // vendorDescription: `Ароматное румяное тесто, усыпанное нежнейшим сыром, таящим во рту, украшенное пикантными колбасками и дольками сочных томатов, политое ароматным сливочным соусом, покорит ваше сердце раз и навсегда.
    //   Наши профессионалы-пиццайоло знают толк в искусстве выпечки настоящей пиццы. Каждое блюдо фирменного меню разработано с учетом всех тонкостей европейской кухни: гармоничное сочетание отборных сыров, свежих помидор, грибов, нежнейших соусов и настоящего волшебнейшего теста.
    //   Вам не придется долго думать, как порадовать себя и своих близких. Переходите в каталог нашего меню и скорее заказывайте пиццу для настоящего наслаждения.`,
    // vendorWebsite: 'https://pizzachefarts.by/';
    // vendorTitle: 'Доставка вкусной пиццы на дом'
    numberOfUses: 68,
    numberOfViews: 69,
    offices: [
      {
        x: 53.938102489505866,
        y: 27.488490327319887,
        address: 'пр. Победителей, д. 84 (ТРЦ «Арена Сити»)',
        phoneNumber: '+375 44 771-51-51'
      },
      {
        x: 53.85829633426384,
        y: 27.43278622731758,
        address: 'ул. Слободская, д. 27',
        phoneNumber: '+375 44 771-51-51'
      }
    ]
  },
  {
    id: 5,
    title:
      'Съедобные шоколадные розы в букете, коробке от 13 руб. Шоколадки из Бельгии и Италии',
    description: `Внимание! Индивидуальные заказы принимаются минимум за день. В наличии есть готовые изделия, их доставка осуществляется после 14:30 в течение 2-4 часов. Промокод дает право на скидку до 25% на шоколадные розы в букетах из бельгийского шоколада «Standart» и «luxe», шоколад в коробке, шоколадную подписку. Iоколад «Luxe» (100-110 г) из бельгийского, либо итальянского шоколада c добавлением орехов, ягод и различных бонусов.`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/1609755470_shokoladnie-rozy-minsk-kardash1.jpg',
    promocode: 'Luxe25',
    discount: '25%',
    dateEnd: '28.04.2021',
    vendorName: 'Luxe',
    // vendorDescription:
    //   'Сделать так, чтобы ваш подарок не забыли никогда - это к нам. Приехать и бесплатно попробовать шоколад - добро пожаловать!',
    // vendorWebsite: 'https://www.instagram.com/kardash.by/';
    // vendorTitle: 'Шоколадные букеты на любой вкус'
    numberOfUses: 3,
    numberOfViews: 90,
    offices: [
      {
        x: 53.83947974668578,
        y: 27.640475169645576,
        address: 'ул. Голодеда, д. 15',
        phoneNumber: '+ 375 25 788 41 32'
      }
    ]
  },
  {
    id: 6,
    title:
      'Хит продаж! Плавание, бассейн + сауна + водные процедуры + аквадискотека - и все это в одном месте!',
    description: `Право на скидку 35% на разовое посещение бассейна: плавание (45 мин), плавание с сауной и водными процедурами (75 мин) или тренажерный зал + бассейн + сауна + гидропроцедуры (90 мин + 75 мин).`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/basseyn-sauna-geyzer-gidromassazh-minsk-masherova-kar-11.jpg',
    discount: '35%',
    dateEnd: '29.02.2021',
    vendorName: 'ФОЦ им. Машерова',
    // vendorDescription: `Можно воспользоваться бассейном, сауной, тренажерным залом. В комплексе есть все для здорового и активного отдыха!`,
    // vendorWebsite: 'http://focsport.by/';
    // vendorTitle: 'Комплекс для активного отдыха!'
    numberOfUses: 78,
    numberOfViews: 292,
    offices: [
      {
        x: 53.91137617684785,
        y: 27.542871240811902,
        address: 'пр-т Победителей, д. 23к1',
        phoneNumber: '+ 375 29 120 68 66'
      }
    ]
  },
  {
    id: 7,
    title:
      'Романтчическое спа-свидание в спа-студии: кедровая бочка, медово-солевой пилинг, тонизирующий массаж и не только!',
    description: `«Фруктовый поцелуй» (150 минут). Купон за 1500р. и доплата на месте: 2000р. вместо 10000р. Скидка 65%. В стоимость входит:
    - распаривание в кедровой бочке с ингаляцией (мята, эвкалипт, лимон), 15 минут;
    - увлажняющий аромапилинг всего тела с натуральными виноградными косточками, 15 минут;
    - душ, 10 минут;
    - обертывание фруктовой смузи-маской с натуральным киви, бананом и йогуртом, 30 минут;
    - релакс-аромамассаж всего тела с манговым крем-маслом, 50 минут;
    - отдых в релакс-зоне (паровой коктейль, восточные сладости к чаю и оформление чайными свечами и лепестками роз в подарок), 30 минут;
    - спа-музыка, ароматерапия, консультация массажиста`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w522_322/default/1009921/otzyvy-banya-bochka.jpg',
    promocode: 'kiss1703',
    discount: '65%',
    dateEnd: '17.03.2021',
    vendorName: 'ФОЦ им. Машерова',
    // vendorDescription: `Можно воспользоваться бассейном, сауной, тренажерным залом. В комплексе есть все для здорового и активного отдыха!`,
    // vendorWebsite: 'http://focsport.by/';
    // vendorTitle: 'Комплекс для активного отдыха!'
    numberOfUses: 0,
    numberOfViews: 5,
    offices: [
      {
        x: 53.91137617684785,
        y: 27.542871240811902,
        address: 'пр-т Победителей, д. 23к1',
        phoneNumber: '+ 375 29 120 68 66'
      }
    ]
  },
  {
    id: 8,
    title:
      'Романтчическое спа-свидание в спа-студии: кедровая бочка, медово-солевой пилинг, тонизирующий массаж и не только!',
    description: `Стоимость абонемента:

    -  30 мин: 9,77 руб. 19,54 руб.
    -  60 мин: 19,54  руб. 39,08 руб.

    Один промокод - один абонемент со скидкой.`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w500_324/default/1009921/1588077039_7929355.jpg',
    discount: '65%',
    dateEnd: '17.03.2021',
    vendorName: 'ФОЦ им. Машерова',
    // vendorDescription: `Можно воспользоваться бассейном, сауной, тренажерным залом. В комплексе есть все для здорового и активного отдыха!`,
    // vendorWebsite: 'http://focsport.by/';
    // vendorTitle: 'Комплекс для активного отдыха!'
    numberOfUses: 431,
    numberOfViews: 990,
    offices: [
      {
        x: 53.91137617684785,
        y: 27.542871240811902,
        address: 'пр-т Победителей, д. 23к1',
        phoneNumber: '+ 375 29 120 68 66'
      }
    ]
  },
  {
    id: 9,
    title:
      'Посещение детского развлекательного центра «Йети и дети» на целый день',
    description: `Воспользоваться можно до 01.04.21. Промокод дает право на скидку й00 рублей на посещение игровой зоны на целый день в детском развлекательном центре "Йети и Дети". Скидка действительна на неограниченное количество посещений.`,
    photoUrl:
      'https://www.slivki.by/znijki-media/w250_162/default/1009921/1600269916_1600269911_Screenshot_18.jpg',
    discount: 'до 1000 рублей',
    dateEnd: '01.04.2021',
    vendorName: 'Детский развлекательный центр «Йети и дети»',
    // vendorDescription: `ЙЕТИ и ДЕТИ – это свежий взгляд на привычные вещи и возрождение традиций качественного семейного досуга, который наполняет детей и родителей энергией и вдохновением. В семейном центре гостей ждут развлечения, грамотно объединенные в единую концепцию на одной площадке. Творческая и сплоченная команда, влюбленная в свое дело, создает профессиональный подход к организации семейного досуга, где родителям уютно, а детям интересно.

    // Ждем в гости.
    // С любовью и заботой «ЙЕТИ и ДЕТИ».`,
    // vendorWebsite: 'https://yetideti.by/Grodno';
    // vendorTitle: 'Комплекс для активного отдыха!'
    numberOfUses: 40,
    numberOfViews: 56,
    offices: [
      {
        x: 53.65034593967492,
        y: 23.85468398498308,
        address: 'пр-т Янки Купалы, д. 87',
        phoneNumber: '+ 375 29 120 68 66'
      }
    ]
  }
];
