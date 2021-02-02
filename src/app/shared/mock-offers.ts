import { Offer } from './models/offer';
export const OFFERS: Offer[] = [
  {
    id: 1,
    title:
      '30% for a gym membership / morning             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit harum quaerat molestias inventore! Eligendi tenetur ab quia numquam necessitatibus, nobis rem nemo corrupti facilis reiciendis! Modi eum incidunt vitae impedit.',
    description: '30% for a gym membership / morning',
    photoUrl:
      'https://i.pinimg.com/originals/49/73/68/49736806e8903128beb9c5f0117040bd.jpg',
    discount: '30%',
    vendorName: 'GYM24',
    phoneNumber: '+7 950 64-34-190',
    numberOfUses: 21,
    numberOfViews: 215,
    location: [
      {
        x: 53.89666423810507,
        y: 27.548806307401655,
        address: 'ул. Лунная, д. 131'
      }
    ]
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
    phoneNumber: '+7 950 64-34-190',
    numberOfUses: 31,
    numberOfViews: 119,
    location: [
      {
        x: 53.89730906648985,
        y: 27.54977190264391,
        address: 'ул. Лунная, д. 131'
      }
    ]
  },
  {
    id: 3,
    title:
      '50 рублей скидки на вторые духи  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit harum quaerat molestias inventore! Eligendi tenetur ab quia numquam necessitatibus, nobis rem nemo corrupti facilis reiciendis! Modi eum incidunt vitae impedit.',
    description: '50 рублей скидка на вторую единицу',
    photoUrl: 'https://dana-mall.com/assets/images/shop/2/155.jpg',
    discount: '50 рублей',
    vendorName: 'Craft',
    phoneNumber: '+7 950 64-34-190',
    numberOfUses: 18,
    numberOfViews: 212,
    location: [
      {
        x: 53.897953884923716,
        y: 27.548570273009105,
        address: 'ул. Лунная, д. 131'
      },
      {
        x: 53.894054658452,
        y: 27.565960677300893,
        address: 'пр-т Дзержинского, 3Б, 5 этаж, офис 8'
      },
      {
        x: 53.894054658452,
        y: 27.565960677300893,
        address: 'пр-т Дзержинского, 3Б'
      }
    ]
  }
];
