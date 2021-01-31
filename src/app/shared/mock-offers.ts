import { Offer } from './models/offer';
export const OFFERS: Offer[] = [
  {
    id: 1,
    title:
      '30% for a gym membership / morning             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit harum quaerat molestias inventore! Eligendi tenetur ab quia numquam necessitatibus, nobis rem nemo corrupti facilis reiciendis! Modi eum incidunt vitae impedit.',
    description: '30% for a gym membership / morning',
    photoUrl:
      'data:image/png;base64,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',
    discount: '30%',
    vendorName: 'GYM24',
    numberOfUses: 21,
    numberOfViews: 215,
    address: 'ул. Лунная, д. 131',
    location: [{ x: 53.89666423810507, y: 27.548806307401655 }]
  },
  {
    id: 2,
    title:
      '2 по цене одного Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit harum quaerat molestias inventore! Eligendi tenetur ab quia numquam necessitatibus, nobis rem nemo corrupti facilis reiciendis! Modi eum incidunt vitae impedit.',
    description:
      '2 по цене одого. Получи один кофе в подарок. На весь ассортимент',
    photoUrl:
      'https://i.pinimg.com/originals/49/73/68/49736806e8903128beb9c5f0117040bd.jpg ',
    discount: '2 по цене 1',
    vendorName: 'Coffe Lab',
    numberOfUses: 31,
    numberOfViews: 119,
    address: 'ул. Лунная, д. 131',
    location: [{ x: 53.89730906648985, y: 27.54977190264391 }]
  },
  {
    id: 3,
    title:
      '50 рублей скидки на вторые духи  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit harum quaerat molestias inventore! Eligendi tenetur ab quia numquam necessitatibus, nobis rem nemo corrupti facilis reiciendis! Modi eum incidunt vitae impedit.',
    description: '50 рублей скидка на вторую единицу',
    photoUrl: 'https://dana-mall.com/assets/images/shop/2/155.jpg',
    discount: '50 рублей',
    vendorName: 'Craft',
    numberOfUses: 18,
    numberOfViews: 212,
    address: 'ул. Лунная, д. 131',
    location: [
      { x: 53.897953884923716, y: 27.548570273009105 },
      { x: 53.894054658452, y: 27.565960677300893 }
    ]
  }
];
