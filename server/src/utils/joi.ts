import { Joi } from 'celebrate';
import { ObjectSchema, Schema } from 'joi';

/**
 * @description Converts all keys of a given Joi schema to optional
 * @param schema - The Joi schema
 * @returns The Joi schema with all keys optional
 */
export const optionalSchema = (schema: ObjectSchema) =>
  schema.fork(Object.keys(schema.describe().keys), (schema: Schema) => schema.optional());

export const requiredWhenSchema = (schema: Schema, key: string, is: any) => {
  return schema.when(key, { is, then: Joi.required(), otherwise: Joi.optional() });
};

export const idSchema = Joi.object({
  id: Joi.string().required()
});
