import homeDe from './home.json' with { type: 'json' };
import homeEn from './home_en.json' with { type: 'json' };

export default [
  {
    key: 'de',
    lang: 'de',
    permalink: '/',
    alternatePage: '/en/',
    title: 'dynamiq. – Data Intelligence, OSINT & Monitoring',
    description: 'Data Intelligence, OSINT und kontinuierliches Monitoring für Web, Social Media, Dokumente, Video und interne Daten.',
    ogDescription: 'dynamiq. sammelt, strukturiert und verbindet Daten aus sozialen Plattformen, dem öffentlichen Web, Dokumenten, Video, Audio und internen Systemen.',
    home: homeDe
  },
  {
    key: 'en',
    lang: 'en',
    permalink: '/en/',
    alternatePage: '/',
    title: 'dynamiq. – Data Intelligence, OSINT & Monitoring',
    description: 'Data Intelligence, OSINT and continuous monitoring across web, social media, documents, video and internal data.',
    ogDescription: 'dynamiq. collects, structures and connects data across social platforms, the public web, documents, video, audio and internal systems.',
    home: homeEn
  }
];
