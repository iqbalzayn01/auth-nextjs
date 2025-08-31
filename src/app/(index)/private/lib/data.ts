import prisma from '@/lib/prisma';

export async function getAllProduct() {
  try {
    const res = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
