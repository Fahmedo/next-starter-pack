import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues, type Resolver, type UseFormProps } from 'react-hook-form';
import type { z } from 'zod';

/** React Hook Form pre-wired with a Zod schema. */
export function useZodForm<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  props?: Omit<UseFormProps<z.input<TSchema>, unknown, z.output<TSchema>>, 'resolver'>,
) {
  return useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    ...props,
    resolver: zodResolver(schema) as unknown as Resolver<
      z.input<TSchema>,
      unknown,
      z.output<TSchema>
    >,
  });
}
