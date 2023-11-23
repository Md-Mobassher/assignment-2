export interface UserFullName {
  firstName: string;
  lastName: string;
}

export interface UserAddress {
  street: string;
  city: string;
  country: string;
}

export interface Order {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  userName: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: UserAddress;
  orders: Order[];
}
