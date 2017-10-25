import { User } from './user';

export const USERS: User[] = [
  {
    id: 1,
    name: "Петр",
    secondName: "Васильев",
    thirdName: "Абрахамянович",
    gender: "male",
    photo: null,
    position: 3,
    division: 1,
    isCreateDEposite: false,
    isCloseDEposite: false,
    isApprovalCredit: true,
    isApprovalOpenScore: false
  },
  {
    id: 2,
    name: "Вася",
    secondName: "Иванов",
    thirdName: "Иванович",
    gender: "male",
    photo: null,
    position: 1,
    division: 2,
    isCreateDEposite: true,
    isCloseDEposite: false,
    isApprovalCredit: false,
    isApprovalOpenScore: false
  },
  {
    id: 3,
    name: "Зинаида",
    secondName: "Васильева",
    thirdName: "Павловна",
    gender: "female",
    photo: null,
    position: 4,
    division: 2,
    isCreateDEposite: true,
    isCloseDEposite: false,
    isApprovalCredit: true,
    isApprovalOpenScore: false
  },
];
