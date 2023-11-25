import { z } from 'zod';

const userFullNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const productValidationSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

const orderValidationSchema = z.array(productValidationSchema).default([]);

export const userValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .positive({ message: 'User ID must be a positive integer' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: userFullNameValidationSchema.required(),
  age: z.number().int().positive({ message: 'Age must be a positive integer' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby cannot be empty' })),
  address: userAddressValidationSchema.required(),
  isDeleted: z.boolean().optional().default(false),
  orders: orderValidationSchema,
});

export default userValidationSchema;
