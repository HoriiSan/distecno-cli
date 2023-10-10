import { z } from 'zod';

export const createTaskSchema = z.object({
    // code: z.number({
    //     required_error: 'Code is required',
    // }),
    active: z.boolean({
        required_error: 'State is required',
    }),
    title: z.string({
        required_error: 'Title is required',
    }),
    front: z.string({
        required_error: 'Front image is required',
    }),
    // imgs: z.array({
    //     required_error: 'Images is required',
    // }),
    //tags: z.array({
    //    required_error: 'Tags is required',
    //}),
    mercadoLibre: z.string({
        required_error: 'MercadoLibre link is required',
    }),
    price: z.number({
        required_error: 'Price is required',
    }),
    description: z.string({
        required_error: 'Description is required',
    }),
    // features: z.object({
    //     required_error: 'Features is required',
    // }),
    promPrice: z.number({
        required_error: 'Promotion Price is required',
    }),
});
