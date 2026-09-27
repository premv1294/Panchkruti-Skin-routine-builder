import {z} from 'zod';
const sourceSchema=z.object({document:z.string(),sheet:z.string().optional(),range:z.string().optional(),fields:z.array(z.string()),note:z.string().optional()});
export const productSchema=z.object({
id:z.string().regex(/^[a-z0-9-]+$/),slug:z.string().regex(/^[a-z0-9-]+$/),name:z.string().min(1),shortName:z.string(),aliases:z.array(z.string()),
category:z.enum(['cleanser','treatment','moisturiser-care','protection']),status:z.enum(['active','discontinued']),concernIds:z.array(z.string()),
mrp:z.number().nonnegative().nullable(),sellingPrice:z.number().nonnegative().nullable(),size:z.object({value:z.number().positive(),unit:z.string(),sourceLabel:z.string()}),
images:z.array(z.object({url:z.string(),alt:z.string()})),description:z.string(),longDescription:z.string().nullable(),
fullIngredients:z.string().nullable(),ingredientStatus:z.enum(['missing','partial','supplied']),keyIngredients:z.array(z.string()),ingredientIds:z.array(z.string()),benefits:z.array(z.string()),
timing:z.array(z.enum(['AM','PM'])),usage:z.object({amount:z.string().nullable(),instructions:z.string().nullable(),frequency:z.string().nullable()}),
precautions:z.array(z.string()),contraindications:z.array(z.string()).nullable(),compatibility:z.array(z.string()),ecommerceUrl:z.string().url().nullable(),sources:z.array(sourceSchema)
});
export type Product=z.infer<typeof productSchema>;
