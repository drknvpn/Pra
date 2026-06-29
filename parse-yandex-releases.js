// parse-yandex-releases.js
const puppeteer = require('puppeteer');
const fs = require('fs');

// ✅ ССЫЛКА НА СТРАНИЦУ ИСПОЛНИТЕЛЯ (где список всех релизов)
// Пример: https://music.yandex.ru/artist/3379147/albums
const ARTIST_URL = 'https://music.yandex.ru/artist/3379147/albums';

async function parseAllReleases() {
  console.log('🚀 Запускаю браузер...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Отключаем загрузку картинок для скорости
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'image') req.abort();
    else req.continue();
  });

  console.log('📄 Загружаю страницу...');
  await page.goto(ARTIST_URL, { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });

  // ✅ Ищем JSON в коде страницы
  console.log('🔍 Ищу данные...');
  
  const data = await page.evaluate(() => {
    // Ищем все скрипты
    const scripts = document.querySelectorAll('script');
    
    for (const script of scripts) {
      const content = script.textContent;
      
      // Ищем объект с preloadedAlbums
      if (content.includes('preloadedAlbums')) {
        // Вырезаем часть с данными
        const match = content.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/);
        if (match) {
          try {
            const json = JSON.parse(match[1]);
            return json;
          } catch (e) {
            // Пробуем другой паттерн
            const match2 = content.match(/"preloadedAlbums":\s*({[^}]+})/);
            if (match2) {
              return JSON.parse(`{"preloadedAlbums":${match2[1]}}`);
            }
          }
        }
      }
    }
    return null;
  });

  await browser.close();

  if (!data || !data.preloadedAlbums) {
    console.error('❌ Данные не найдены. Возможно, изменилась структура страницы.');
    return;
  }

  const albums = data.preloadedAlbums.albums || [];
  const total = data.preloadedAlbums.pager?.total || albums.length;

  console.log(`📦 Найдено релизов: ${total}`);

  // ✅ Преобразуем в нужный формат
  const releases = albums.map((album) => {
    // Собираем имена всех исполнителей
    const artists = album.artists?.map(a => a.name).join(', ') || 'Неизвестно';
    
    // Генерируем ID
    const id = album.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zа-яё0-9-]/g, '');

    // Тип релиза
    const typeMap = {
      'single': 'Сингл',
      'album': 'Альбом',
      'ep': 'EP',
      'compilation': 'Сборник'
    };
    const type = typeMap[album.type] || album.type || 'Альбом';

    // Формируем URL обложки
    let coverUrl = '';
    if (album.coverUri) {
      coverUrl = `https://${album.coverUri.replace('%%', '400x400')}`;
    }

    // Ссылка на релиз
    const link = `https://music.yandex.ru/album/${album.id}`;

    return {
      id,
      title: album.title,
      year: String(album.year || ''),
      type: type,
      artist: artists,
      cover: `/covers/${id}.png`,
      coverUrl: coverUrl, // для скачивания
      link: link,
    };
  });

  // Сохраняем в файл
  fs.writeFileSync(
    'releases-parsed.json',
    JSON.stringify(releases, null, 2)
  );
  
  console.log(`✅ Сохранено ${releases.length} релизов в releases-parsed.json`);
  
  // Выводим первые 3 для проверки
  console.log('\n📋 Первые 3 релиза:');
  releases.slice(0, 3).forEach((r, i) => {
    console.log(`  ${i+1}. ${r.title} (${r.year}) — ${r.artist}`);
  });

  return releases;
}

// Запускаем
parseAllReleases().catch(console.error);