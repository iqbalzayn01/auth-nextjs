import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

type Bucket = 'bucket-images' | 'bucket-documents';

export const getPublicUrl = (bucket: Bucket, filename: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  bucket: Bucket,
  opts?: { type?: 'image' | 'package'; upsert?: boolean }
) => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  const uniqueId = randomUUID();
  const filename = `${opts?.type ?? 'file'}-${Date.now()}-${uniqueId}.${ext}`;

  if (
    bucket === 'bucket-images' &&
    !['png', 'jpg', 'jpeg', 'webp'].includes(ext!)
  ) {
    throw new Error('Unsupported image format. Allowed: PNG, JPG, JPEG, WEBP.');
  }
  if (bucket === 'bucket-documents' && !['zip'].includes(ext!)) {
    throw new Error('Unsupported file format. Only ZIP is allowed.');
  }

  const maxSize =
    bucket === 'bucket-images' ? 10 * 1024 * 1024 : 25 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(
      `File size exceeds the maximum allowed: ${
        bucket === 'bucket-images' ? '10MB' : '25MB'
      }.`
    );
  }

  const { error } = await supabase.storage.from(bucket).upload(filename, file, {
    cacheControl: '3600',
    upsert: opts?.upsert ?? false,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);
  return filename;
};

export const deleteFile = async (bucket: Bucket, filename: string) => {
  const { error } = await supabase.storage.from(bucket).remove([filename]);
  if (error) throw new Error(`Deletion failed: ${error.message}`);
};
