-- ============================================================================
-- Placeholder product imagery.
-- Uses picsum.photos with per-product seeds so each card gets a unique,
-- stable image that always loads. These are PLACEHOLDERS — reemplázalas con
-- fotos reales de producto desde Supabase Storage cuando estén listas.
-- ============================================================================

update public.products
set image_url = 'https://picsum.photos/seed/' || replace(slug, '-', '') || '/800/1000'
where image_url is null;

-- Secondary gallery images (3 angles each) — same seed + suffix for variety.
update public.products
set gallery_urls = array[
  'https://picsum.photos/seed/' || replace(slug, '-', '') || 'a/800/1000',
  'https://picsum.photos/seed/' || replace(slug, '-', '') || 'b/800/1000',
  'https://picsum.photos/seed/' || replace(slug, '-', '') || 'c/800/1000'
]
where coalesce(array_length(gallery_urls, 1), 0) = 0;
