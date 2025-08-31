'use server';

import { revalidatePath } from 'next/cache';
import { ActionResult } from '@/types';
import { productSchema } from '@/lib/schema';
import { uploadFile, getPublicUrl, deleteFile } from '@/lib/supabase';
import prisma from '@/lib/prisma';

export async function createProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validationData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    status: (formData.get('status') as string) || 'draft',
    images: formData.getAll('images'),
  };

  const validated = productSchema.safeParse(validationData);
  if (!validated.success) return { error: validated.error.issues[0].message };

  const uploadImages = validated.data.images as File[];
  const filenames: string[] = [];
  for (const image of uploadImages) {
    const filename = await uploadFile(image, 'bucket-images', {
      type: 'image',
    });
    filenames.push(filename);
  }

  console.log('ACTION_UPLOAD_IMAGES: ', filenames);

  try {
    await prisma.product.create({
      data: {
        name: validated.data.name,
        description: validated.data.description,
        status: validated.data.status,
        images: filenames,
      },
    });

    revalidatePath('/private', 'page');
    return { error: null, success: 'Product created successfully' };
  } catch (error) {
    console.error('Error creating product:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}

// await prisma.product.delete({ where: { id: product.id } });
// for (const filename of filenames) {
//   await deleteFile('bucket-images', filename);
// }
