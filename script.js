/* ==========================================================================
   PIRATV - MASTER JAVASCRIPT ENGINE & DYNAMIC MODAL INJECTOR
   ========================================================================== */

// --- Supabase & TMDB API Configuration ---
let API_KEY = localStorage.getItem("piratv_apikey") || "401314950ab0fba20ee28fbebfcb0140";
let DEFAULT_SERVER = localStorage.getItem("piratv_server") || "vidlink";

let SUPABASE_URL = localStorage.getItem("piratv_sb_url") || "https://bnbebyseqijwkayuwjnr.supabase.co";
let SUPABASE_ANON_KEY = localStorage.getItem("piratv_sb_key") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuYmVieXNlcWlqd2theXV3am5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3BN-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.chthlgJrFHDH_1dBPYIIxKIVUaRL6RLaX_Kqsdcwa_Y";

let supabaseClient = null;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {}

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
const MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const SHOWS_URL = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
const ANIME_URL = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`;
const SEARCH_URL = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=`;

const mediaGrid = document.getElementById("media-grid");
const mainHeading = document.getElementById("main-section-heading");
const bgVideo = document.getElementById("bg-trailer-video");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");

// --- DIRECT HYBRID FALLBACK DATABASE ---
const hybridDatabase = [
  { 
    id: 969681, 
    title: "Spider-Man: Brand New Day (2026)",    
    name: "Spider-Man: Brand New Day (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 9.5,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/iPOn6DinuVyLY17YM9mKuPofV08.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/7iwUUcKURMT7aKfCwMy6YnGtchD.jpg", 
    overview: "Spider-Man embarks on a brand-new adventure facing unprecedented web-slinging threats."
  },
  { 
    id: 1368337, 
    title: "The Odyssey (2026)",    
    name: "The Odyssey (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 9.5,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/r57L2UBLPKcHdZQYg8tagv9XqK2.jpg", 
    overview: "An epic cinematic retelling of Odysseus' long journey home after the fall of Troy."
  },
  { 
    id: 1339713, 
    title: "Obsession (2026)",    
    name: "Obsession (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 9.5,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/4NBYDOnEjAzyuP7CMkD5s7fs44K.jpg", 
    overview: "A dangerous psychological game ensues when passions cross all boundary limits."
  },
  { 
    id: 1339713, 
    title: "Lioness (2023)",    
    name: "Lioness (2023)",       
    type: "movie",                  
    category: "action",             
    vote_average: 9.5,             
    release_date: "2023-01-01",  
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/rzpHPSEgPTpRs8EHbygwsOw7jC0.jpg", 
    overview: "A dangerous psychological game ensues when passions cross all boundary limits."
  },
  { 
    id: 1275779, 
    title: "Disclosure Day (2026)",    
    name: "Disclosure Day (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 7.5,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/9XKXO68h0KGMCQ9ZZEdP0DWfcXS.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/pW4Ah1A6SgZNQNmf5AgiIYPzFHF.jpg", 
    overview: "The world comes to terms with unsealed government truths about extraterrestrial life."
  },
  { 
    id: 1108427, 
    title: "Moana (2026)",    
    name: "Moana (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 8.1,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/zKVgiv5qHCvCLT4A2ymJi5QeXDH.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/c6BPbkO5Npt1OdwttAxCFo06wtH.jpg", 
    overview: "Live-action adaptation of Disney's classic oceanic adventure."
  },
  { 
    id: 1083381, 
    title: "Backrooms (2026)",    
    name: "Backrooms (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 8.4,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/br10hK3TWoky1v7gw9jYwIfjDjv.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/dqmMWNWfLnExDRpMtIMqI97GQFR.jpg", 
    overview: "A young photographer slips into an endless surreal labyrinth of liminal spaces."
  },
  {
    id: 1138194, 
    title: "Heretic (2024)",    
    name: "Heretic (2024)",       
    type: "movie",                  
    category: "action",             
    vote_average: 8.5,             
    release_date: "2024-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/fr96XzlzsONrQrGfdLMiwtQjott.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/d2ej4uwL4ss1FfqLpA48UjflXeU.jpg", 
    overview: "Two young missionaries become entrapped in a deadly game inside the house of a sinister man."
  },
  { 
    id: 124364, 
    title: "From Season 4 (2026)",    
    name: "From Season 4 (2026)",       
    type: "tv",                  
    category: "action",             
    vote_average: 6.4,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/ltlz5IHLpaXQStXGmMbehfnIskZ.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/mNQ4OdN8ZtkScOT2WegaKASfYhT.jpg", 
    overview: "Dark secrets unravel in a suburban street where nothing is as it appears."
  },
  { 
    id: 66732, 
    title: "Stranger Things (2025)",    
    name: "Stranger Things (2025)",       
    type: "tv",                  
    category: "action",             
    vote_average: 8.7,             
    release_date: "2025-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/uKYUR8GPkKRCksczYDJb3pwZauo.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", 
    overview: "Dark secrets unravel in a suburban street where nothing is as it appears."
  },
  {
    id: 157336,
    imdb_id: "tt0816692",
    title: "Interstellar (2014)",
    type: "movie",
    category: "scifi",
    vote_average: 8.9,
    release_date: "2014-11-07",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  { 
    id: 1101383, 
    title: "The End of Oak Street (2026)",    
    name: "The End of Oak Street (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 6.4,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/fYXqpgPmHMphSF2W30GbTeJVIa5.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/mNQ4OdN8ZtkScOT2WegaKASfYhT.jpg", 
    overview: "Dark secrets unravel in a suburban street where nothing is as it appears."
  },
  { 
    id: 1396, 
    title: "Breaking Bad (2008)",    
    name: "Breaking Bad (2008)",       
    type: "tv",                  
    category: "action",             
    vote_average: 6.4,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg", 
    overview: "Dark secrets unravel in a suburban street where nothing is as it appears."
  },
  { 
    id: 1273221, 
    title: "Scary Movie (2026)",    
    name: "Scary Movie (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 7.5,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/znHT8peERZRWG1ME3r0Db0EV8k8.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/lj6AaDqDUbzm2XJltFNHeAm2uXN.jpg", 
    overview: "The hilarious spoof franchise returns to parody modern horror tropes."
  },
  { 
    id: 1402, 
    title: "The Walking Dead (2010)",    
    name: "The Walking Dead (2010)",       
    type: "tv",                  
    category: "action",             
    vote_average: 7.2,             
    release_date: "2010-10-31",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/aN29llVoCFtBTwDZFtqdD9d8dHb.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/eRrmxUMK6P5ZQ0GiH6TcazHmryE.jpg", 
    overview: "Kara Zor-El travels across the cosmos to fulfill her superheroic destiny."
  },
  { 
    id: 1081003, 
    title: "Supergirl (2026)",    
    name: "Supergirl (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 7.2,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/1QCWdqzTfh2x9UylVpspIU6QTuM.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/4X2YSe8PaYbsBqX3TDmmIU4vOju.jpg", 
    overview: "Kara Zor-El travels across the cosmos to fulfill her superheroic destiny."
  },
  { 
    id: 1159559, 
    title: "Scream 7 (2026)",    
    name: "Scream 7 (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 7.2,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/jjyuk0edLiW8vOSnlfwWCCLpbh5.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/3eUyLEF5M0ky3h6KJsWiWzaakB8.jpg", 
    overview: "Kara Zor-El travels across the cosmos to fulfill her superheroic destiny."
  },
  {
    id: 108978,
    title: "Reacher (2022)",
    name: "Reacher (2022)",
    type: "tv",
    category: "action",
    vote_average: 8.3,
    release_date: "2026-05-01",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/f1VCQIG2iCyOookdgOzwtUpwWC0.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/pF0qkRsrHkdYadPWY9AMeFZfcwk.jpg",
    overview: "A new Captain America rises to defend America against emerging threats in a rapidly changing world."
  },
  { 
    id: 79744, 
    title: "The Rookie (2018)",    
    name: "The Rookie (2018)",       
    type: "tv",                  
    category: "comedy",             
    vote_average: 7.2,             
    release_date: "2018-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/70kTz0OmjjZe7zHvIDrq2iKW7PJ.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/6iNWfGVCEfASDdlNb05TP5nG0ll.jpg", 
    overview: "The Necronomicon strikes again unleashing infernal horror upon an isolated cabin."
  },
  { 
    id: 1212763, 
    title: "Evil Dead Burn (2026)",    
    name: "Evil Dead Burn (2026)",       
    type: "movie",                  
    category: "horror",             
    vote_average: 7.2,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/uRxrNXQWkHoENm3nwVOZDYSCx2F.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/A5Tz6ogGt4VV8NESG9oWVct5bo1.jpg", 
    overview: "The Necronomicon strikes again unleashing infernal horror upon an isolated cabin."
  },
  { 
    id: 146233, 
    title: "Prisoners (2013)",    
    name: "Prisoners (2013)",       
    type: "movie",                  
    category: "horror",             
    vote_average: 7.2,             
    release_date: "2013-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/uhviyknTT5cEQXbn6vWIqfM4vGm.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/yKsMvfVx8vrvAM6NQSTEX0rBmMK.jpg", 
    overview: "The Necronomicon strikes again unleashing infernal horror upon an isolated cabin."
  },
  { 
    id: 852448, 
    title: "I Came By (2022)",    
    name: "I Came By (2022)",       
    type: "movie",                  
    category: "horror",             
    vote_average: 7.2,             
    release_date: "2022-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/pFB9jZDl52jBNbMPVSlISXD1ggS.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/14wIOjYCtfbO9EHTqCbiU9wncMz.jpg", 
    overview: "The Necronomicon strikes again unleashing infernal horror upon an isolated cabin."
  },
  { 
    id: 1408, 
    title: "House (2004)",    
    name: "House (2004)",       
    type: "movie",                  
    category: "DRAMA",             
    vote_average: 8.6,             
    release_date: "2004-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/r0Q6eeN9L1ORL9QsV0Sg8ZV3vnv.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/A5Tz6ogGt4VV8NESG9oWVct5bo1.jpg", 
    overview: "The Necronomicon strikes again unleashing infernal horror upon an isolated cabin."
  },
  { 
    id: 1284465, 
    title: "The Death of Robin Hood (2026)",    
    name: "The Death of Robin Hood (2026)",       
    type: "movie",                  
    category: "horror",             
    vote_average: 6.2,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/92Tsfx7SFafOqWsotvrlJbHyehd.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/pwTMQFylIJ2pFJV0yJpcAoihcNI.jpg", 
    overview: "A battle-worn Robin Hood confronts his past while dealing with mortal wounds."
  },
  { 
    id: 399361, 
    title: "Triple Frontier (2019)",    
    name: "Triple Frontier (2019)",       
    type: "movie",                  
    category: "horror",             
    vote_average: 6.2,             
    release_date: "2019-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/aBw8zYuAljVM1FeK5bZKITPH8ZD.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/s9I2LmQMYCanl6DvC3X1AOHs2r8.jpg", 
    overview: "A battle-worn Robin Hood confronts his past while dealing with mortal wounds."
  },
  {
    id: 1304313,
    title: "Lee Cronin's The Mummy (2026)",
    name: "Lee Cronin's The Mummy (2026)",
    type: "movie",
    category: "action",
    vote_average: 9.2,
    release_date: "2026-01-10",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/1q308iixueCU4pFtSYugNOevtNx.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/xugEpZk9YQ0DIz1aFvH5HGkqpZK.jpg",
    overview: "Aquaman must unite the seven seas to prevent an ancient evil from consuming the world's oceans."
  },
  { 
    id: 668489, 
    title: "Havoc (2025)",    
    name: "Havoc (2025)",       
    type: "movie",                  
    category: "action",             
    vote_average: 6.9,             
    release_date: "2025-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/gmQbkSi9hg271Avgjrq7VqtEkgR.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/44YfHklKam8COMUxDZop2Lnp0CS.jpg", 
    overview: "The yellow mischief-makers stumble into a ancient realm of fantastical monsters."
  },
  { 
    id: 1198984, 
    title: "We Bury the Dead (2024)",    
    name: "We Bury the Dead (2024)",       
    type: "movie",                  
    category: "action",             
    vote_average: 6.9,             
    release_date: "2024-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/xZqo0yPARmyF8TACVNyaOACkYWG.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/vbkW4KerpshPZnP84w9qwSfYrhu.jpg", 
    overview: "The yellow mischief-makers stumble into a ancient realm of fantastical monsters."
  },
  { 
    id: 76479, 
    title: "The Boys (2026)",    
    name: "The Boys (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 6.9,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/in1R2dDc421JxsoRWaIIAqVI2KE.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg", 
    overview: "The yellow mischief-makers stumble into a ancient realm of fantastical monsters."
  },
  { 
    id: 1315772, 
    title: "Minions & Monsters (2026)",    
    name: "Minions & Monsters (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 6.9,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/nz7i42yhLIJ4ve9JKgM6NthoLHO.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/nJiTHM4rsC4LYaek1B6BJuWXUAr.jpg", 
    overview: "The yellow mischief-makers stumble into a ancient realm of fantastical monsters."
  },
  { 
    id: 1284041, 
    title: "The Last House (2026)",    
    name: "The Last House (2026)",       
    type: "movie",                  
    category: "action",          
    vote_average: 7.3,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/6JU7E8Vv2M11egkctWVOScxWR75.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/2mPmccLg8QCD4ZF6v8kSsUijPPW.jpg", 
    overview: "Survivors stand their ground in the last remaining refuge against an unearthly invasion."
  },
  { 
    id: 458305, 
    title: "Vivarium (2019)",    
    name: "Vivarium (2019)",       
    type: "movie",                  
    category: "action",          
    vote_average: 6.3,             
    release_date: "2019-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/myf3qzpeN0JbuFRPwSpJcz7rmAT.jpg", 
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/zLa8fA7boGtNoNH7n6iYi9UqoaH.jpg", 
    overview: "Survivors stand their ground in the last remaining refuge against an unearthly invasion."
  },
  {
    id: 5920,
    title: "The Mentalist (2008)",
    name: "The Mentalist (2008)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2008-09-30",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/q3pCsNvJ7CmdJUz2sJEEUY3pOPC.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  {
    id: 1405,
    title: "Dexter (2013)",
    name: "Dexter (2013)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2013-01-13",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/q8dWfc4JwQuv3HayIZeO84jAXED.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/l4pb3wCBGKYc1RaDOyXmJ1oWH9t.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  {
    id: 1405,
    title: "Dexter: New Blood (2021)",
    name: "Dexter: New Blood (2021)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2021-01-13",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/e6v08948EZVvLrx0sWpmglguY9e.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  {
    id: 219937,
    title: "Dexter: Original Sin (2024)",
    name: "Dexter: Original Sin (2024)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2024-01-13",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/j5bP7spdfS0NpDLKDlqJYyJPi1j.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/e6v08948EZVvLrx0sWpmglguY9e.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  {
    id: 259909,
    title: "Dexter: Resurrection (2025)",
    name: "Dexter: Resurrection (2025)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2025-01-13",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/kEHZfSZhZKDot4wqurgIzMUNq1W.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/e6v08948EZVvLrx0sWpmglguY9e.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  {
    id: 2288,
    title: "Prison Break (2005)",
    name: "Prison Break (2005)",
    type: "tv",
    category: "action",
    vote_average: 8.2,
    release_date: "2005-08-29",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/m2U7vXc2r1lPeUUSCTHPwWxgF6M.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/n3Brk7roueE9HOwVmYlJx5j462g.jpg",
    overview: "The two titans clash one last time in an epic battle that will determine the fate of humanity."
  },
  { 
    id: 1084244,
    title: "Toy Story 5 (2026)",  
    name: "Toy Story 5 (2026)",       
    type: "movie",                  
    category: "action",             
    vote_average: 7.3,             
    release_date: "2026-01-01",    
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/sfQtVlIHljToOwYjhe21KPGzZWK.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg",
    overview: "Woody and Buzz reunite when modern electronics threaten traditional toys."
  },
  {
    id: 83533,
    title: "Avatar: Fire and Ash (2025)",
    name: "Avatar: Fire and Ash (2025)",
    type: "movie",
    category: "scifi",
    vote_average: 8.6,
    release_date: "2025-12-15",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/u8DU5fkLoM5tTRukzPC31oGPxaQ.jpg",
    overview: "The Sully family faces new threats as the Na'vi struggle to protect their world from human exploitation."
  },
  {
    id: 1003596,
    title: "Avengers: Doomsday (2026)",
    name: "Avengers: Doomsday (2026)",
    type: "movie",
    category: "action",
    vote_average: 8.1,
    release_date: "2026-08-20",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/bh2OuKvq19jBHsloUVCfPSZZw81.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/s4v0UX1anfXm0UvloLsTTJ4v222.jpg",
    overview: "Joel and Ellie continue their journey in a post-apocalyptic world filled with danger and moral dilemmas."
  },
  {
    id: 1589248,
    title: "My Best Friend, His Girlfriend and Me (2026)",
    name: "My Best Friend, His Girlfriend and Me (2026)",
    type: "movie",
    category: "comedy",
    vote_average: 8.8,
    release_date: "2027-02-28",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/aWLshM7DZECutuQVpMfhDiPZUQC.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/oAFBdUTyyJZ7EMImZAdMGuPvt6V.jpg",
    overview: "Paul Atreides must navigate the politics of Arrakis while mastering his newfound powers."
  },
  {
    id: 125988,
    title: "Silo (2023)",
    name: "Silo (2023)",
    type: "tv",
    category: "scifi",
    vote_average: 8.1,
    release_date: "2023-05-04",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/gMYZZvnkVNTqSVnVCphWbPXwWwb.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/uTWhbLc7Bj4qNSdW3ZvZKL8cOHv.jpg",
    overview: "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of regulations they believe are meant to protect them."
  },
  {
    id: 94997,
    title: "House of the Dragon (2022)",
    name: "House of the Dragon (2022)",
    type: "tv",
    category: "fantasy",
    vote_average: 8.4,
    release_date: "2022-08-21",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/577eXC8wFQT0eUrJcgznSiFPRmk.jpg",
    overview: "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their command. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne."
  },
  {
    id: 123542,
    title: "LINK CLICK (2021)",
    name: "LINK CLICK (2021)",
    type: "tv",
    category: "action",
    vote_average: 8.4,
    release_date: "2021-08-09",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/hCt2bLRGTCjHGqtV5FP3Img6w1h.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/w3agwUSMpJ4X9t1jGrDtqqRPjDQ.jpg",
    overview: "Children who live in hiding with superpower abilities, along with their parents who have lived with painful secrets from the past, face immense dangers together across generations."
  },
  {
    id: 1308767,
    title: "Young Washington (2026)",
    name: "Young Washington (2026)",
    type: "movie",
    category: "action",
    vote_average: 7.9,
    release_date: "2026-01-10",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/6CdoTKnRQHJkjRGxTefFGkPQplB.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/mj3RFamNUleZB94zMWgGnJkQCAH.jpg",
    overview: "Aquaman must unite the seven seas to prevent an ancient evil from consuming the world's oceans."
  },
  {
    id: 238,
    title: "The Godfather (1972)",
    name: "The Godfather (1972)",
    type: "movie",
    category: "action",
    vote_average: 9.2,
    release_date: "1972-03-24",
    poster_path: "https://media.themoviedb.org/t/p/w220_and_h330_face/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "https://media.themoviedb.org/t/p/w500_and_h282_face/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
    overview: "Aquaman must unite the seven seas to prevent an ancient evil from consuming the world's oceans."
  },
  {
    id: 603,
    imdb_id: "tt0133093",
    title: "The Matrix (1999)",
    type: "movie",
    category: "action",
    vote_average: 8.7,
    release_date: "1999-03-31",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/dXNAPwY7VrqHAo51cKxMIxGNUnk.jpg",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    id: 155,
    imdb_id: "tt0468569",
    title: "The Dark Knight (2008)",
    type: "movie",
    category: "action",
    vote_average: 9.0,
    release_date: "2008-07-18",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
];

// Close modal when clicking outside the glass panel box
window.addEventListener("click", (event) => {
  const modal = document.getElementById("media-modal");
  if (modal && modal.classList.contains("active")) {
    if (event.target === modal) {
      closeModal();
    }
  }
});

// --- Dynamic Ambient Theme Background Animation ---
function initDynamicThemeAnimation() {
  let canvas = document.getElementById("bg-theme-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "bg-theme-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-2";
    canvas.style.pointerEvents = "none";
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.2,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Deep ambient gradient
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, Math.max(width, height));
    gradient.addColorStop(0, "rgba(15, 23, 42, 0.85)");
    gradient.addColorStop(0.5, "rgba(10, 15, 30, 0.95)");
    gradient.addColorStop(1, "rgba(3, 7, 18, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Floating thematic stars/particles
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// --- Cinematic Background YouTube Trailer Playlist System ---
// Embeds HD YouTube cinematic trailers automatically in ambient autoplay background
const youtubeTrailerIds = [
  
  "62bIsvRcPv0", // Spider Man: No Way Home Trailer
  "f_bKjZeJBBI", // the odessy trailer
  "0G5CjgPw1x4", // obsession trailer
  "c51ND9Hdbw0", // toy story trailer
  "ZSdOwt-G49w", // minion trailer
  "0HjdiohVOik", // backrooms trailer
  "SCYT8vb2siQ", // disclojure day trailer
  "LdOM0x0XDMo", // Man of Steel Trailer
  "YoHD9XEInc0", // Inception Trailer
  "zSWdZVtXT7E", // Interstellar Trailer
  "Way9Dexny3w", // Dune Trailer
  "8g18jFHCLXk"  // Cyberpunk 2077 Cinematic

];
let currentTrailerIdx = 0;

function initTrailerLoop() {
  const bgContainer = document.getElementById("bg-trailer-container") || document.body;
  let iframe = document.getElementById("bg-youtube-iframe");

  if (!iframe) {
    const iframeWrapper = document.createElement("div");
    iframeWrapper.style.position = "fixed";
    iframeWrapper.style.top = "0";
    iframeWrapper.style.left = "0";
    iframeWrapper.style.width = "100vw";
    iframeWrapper.style.height = "100vh";
    iframeWrapper.style.zIndex = "-1";
    iframeWrapper.style.overflow = "hidden";
    iframeWrapper.style.pointerEvents = "none";
    iframeWrapper.style.opacity = "0.35"; // Ambient cinema atmosphere

    iframe = document.createElement("iframe");
    iframe.id = "bg-youtube-iframe";
    iframe.style.width = "100vw";
    iframe.style.height = "56.25vw"; // 16:9 Aspect ratio cover
    iframe.style.minHeight = "100vh";
    iframe.style.minWidth = "177.77vh";
    iframe.style.position = "absolute";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.border = "none";
    iframe.allow = "autoplay; encrypted-media";

    iframeWrapper.appendChild(iframe);
    bgContainer.prepend(iframeWrapper);
  }

  loadNextBgTrailer(iframe);
}

function loadNextBgTrailer(iframe) {
  const videoId = youtubeTrailerIds[currentTrailerIdx];
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&enablejsapi=1&rel=0`;
  currentTrailerIdx = (currentTrailerIdx + 1) % youtubeTrailerIds.length;

  // Cycle background trailer every 45 seconds automatically
  setTimeout(() => {
    loadNextBgTrailer(iframe);
  }, 25000);
}

let watchList = JSON.parse(localStorage.getItem("piratv_watchlist") || "[]");
let watchHistory = JSON.parse(localStorage.getItem("piratv_history") || "[]");
let currentCatalogData = [];

async function fetchMedia(url, headingText) {
  try {
    mainHeading.innerText = headingText;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      currentCatalogData = data.results;
      renderGrid(currentCatalogData, mediaGrid);
    } else {
      throw new Error("Empty API results");
    }
  } catch (err) {
    currentCatalogData = hybridDatabase;
    renderGrid(hybridDatabase, mediaGrid);
  }
}

async function renderSection(containerId, url, fallbackCategory) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      renderGrid(data.results, container);
      return;
    }
    throw new Error("Empty section results");
  } catch (err) {
    const fallbackItems = hybridDatabase.filter(item => item.type === fallbackCategory || item.category === fallbackCategory);
    renderGrid(fallbackItems.length > 0 ? fallbackItems : hybridDatabase, container);
  }
}

function renderGrid(items, targetContainer) {
  if (!targetContainer) return;
  targetContainer.innerHTML = "";
  
  if (!items || items.length === 0) {
    targetContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">No masterpieces found.</div>`;
    return;
  }

  items.forEach(item => {
    const posterPath = item.poster_path ? (item.poster_path.startsWith('http') ? item.poster_path : IMG_URL + item.poster_path) : "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80";
    const title = item.title || item.name || "Untitled";
    const year = (item.release_date || item.first_air_date || "2026").substring(0, 4);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
    const mediaType = item.media_type || item.type || "movie";

    const card = document.createElement("div");
    card.classList.add("media-card");
    card.onclick = () => {
      closeSearchModal();
      openModal(item.id, mediaType, item);
    };
    
    card.innerHTML = `
      <div class="poster-wrapper">
        <span class="rating-badge">⭐ ${rating}</span>
        <img src="${posterPath}" alt="${title}" class="media-poster" loading="lazy">
      </div>
      <div class="card-info">
        <div class="media-title">${title}</div>
        <div class="media-meta-text">${year} • ${mediaType.toUpperCase()}</div>
      </div>
    `;
    targetContainer.appendChild(card);
  });
}

function switchTab(tabName, event) {
  if (event) event.preventDefault();
  document.querySelectorAll(".sidebar-item").forEach(el => el.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  if (tabName === 'trending') fetchMedia(TRENDING_URL, "Trending Cinematic Masterpieces");
  if (tabName === 'movies') fetchMedia(MOVIES_URL, "Popular Cinematic Movies");
  if (tabName === 'tv') fetchMedia(SHOWS_URL, "Trending Series & Shows");
  if (tabName === 'anime') fetchMedia(ANIME_URL, "Ethereal Anime Realm");
}

function filterCatalog(category, event) {
  document.querySelectorAll(".cat-pill").forEach(el => el.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  if (category === 'all') fetchMedia(TRENDING_URL, "All Cinematic Masterpieces");
  else if (category === 'movie') fetchMedia(MOVIES_URL, "Popular Movies");
  else if (category === 'tv') fetchMedia(SHOWS_URL, "Popular TV Shows");
  else if (category === 'anime') fetchMedia(ANIME_URL, "Anime Masterpieces");
  else if (category === 'watchlist') {
    mainHeading.innerText = "Cloud Synchronized Watchlist";
    renderGrid(watchList, mediaGrid);
  } else if (category === 'history') {
    mainHeading.innerText = "Recent Watch History";
    renderGrid(watchHistory, mediaGrid);
  }
}

let searchTimeout;
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    searchInput.value = query;

    if (!query.trim()) {
      clearSearchBtn.style.display = "none";
      closeSearchModal();
      return;
    }
    
    clearSearchBtn.style.display = "block";
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      executeSearch(query.trim());
    }, 250);
  });
}

async function executeSearch(query) {
  document.getElementById("search-modal-title").innerText = `Instant Search Results for "${query}"`;
  const searchResultsGrid = document.getElementById("search-results-grid");
  searchResultsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">Scanning dimensions...</div>`;
  
  document.getElementById("search-results-modal").classList.add("active");

  try {
    const res = await fetch(`${SEARCH_URL}${encodeURIComponent(query)}`);
    const data = await res.json();
    let apiResults = data.results || [];
    const localMatches = hybridDatabase.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    renderGrid([...localMatches, ...apiResults], searchResultsGrid);
  } catch (err) {
    const localMatches = hybridDatabase.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    renderGrid(localMatches, searchResultsGrid);
  }
}

function closeSearchModal() {
  const searchModal = document.getElementById("search-results-modal");
  if (searchModal) searchModal.classList.remove("active");
}

function clearSearch() {
  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.style.display = "none";
  closeSearchModal();
}

// --- Modal & Server Player Engine ---
const modal = document.getElementById("media-modal");
const player = document.getElementById("video-player");
const playerWrapper = document.getElementById("player-wrapper");
const modalBackdropPreview = document.getElementById("modal-backdrop-preview");
const serverSelect = document.getElementById("server-select");
const tvControlsBar = document.getElementById("tv-controls-bar");

let activeId = null;
let activeType = null;
let activeItemObj = null;

const allServers = [
  {
    name: "vidsrc",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://vidsrc.me/embed/movie?tmdb=${id}`
        : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}`
  },
  {
    name: "vidlink",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://vidlink.pro/movie/${id}`
        : `https://vidlink.pro/tv/${id}/${s}/${e}`
  },
  {
    name: "smashystream",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://embed.smashystream.com/playere.php?tmdb=${id}`
        : `https://embed.smashystream.com/playere.php?tmdb=${id}&s=${s}&e=${e}`
  },
  {
    name: "2embed",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://www.2embed.cc/embed/${id}`
        : `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`
  },
  {
    name: "MULTI SERVER 2",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
        : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}`
  },
  {
    name: "Vidrock",
    getUrl: (id, imdbCode, type, s = 1, e = 1) =>
      type === 'movie'
        ? `https://vidrock.net/embed/movie/${id}`
        : `https://vidrock.net/embed/tv/${id}/${s}/${e}`
  },
];

async function openModal(id, type, itemObj) {
  activeId = id;
  activeType = type;
  activeItemObj = itemObj;

  player.src = "";
  playerWrapper.style.display = "none";
  modalBackdropPreview.style.display = "flex";

  if (itemObj && !watchHistory.some(i => i.id === id)) {
    watchHistory.unshift(itemObj);
    if (watchHistory.length > 20) watchHistory.pop();
    localStorage.setItem("piratv_history", JSON.stringify(watchHistory));
  }

  // Clear previous modal values
  document.getElementById("modal-genres").innerText = "Loading genres...";
  document.getElementById("modal-cast").innerHTML = "Loading starring...";

  // 1. Populate basic UI immediately from itemObj
  let currentTitle = "Masterpiece";
  if (itemObj) {
    currentTitle = itemObj.title || itemObj.name || "Masterpiece";
    document.getElementById("modal-title").innerText = currentTitle;
    document.getElementById("player-title-indicator").innerText = `Now Playing: ${currentTitle}`;
    document.getElementById("modal-rating").innerText = `⭐ ${itemObj.vote_average ? itemObj.vote_average.toFixed(1) : "N/A"}`;
    document.getElementById("modal-year").innerText = (itemObj.release_date || itemObj.first_air_date || "2026").substring(0, 4);
    document.getElementById("modal-type-badge").innerText = type.toUpperCase();
    document.getElementById("modal-desc").innerText = itemObj.overview || "No detailed lore description available.";
    if (itemObj.backdrop_path) {
      document.getElementById("modal-backdrop-img").src = itemObj.backdrop_path.startsWith('http') ? itemObj.backdrop_path : IMG_URL + itemObj.backdrop_path;
    }
  }

  // 2. Fetch fresh dynamic details & precise YouTube Trailer
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=external_ids,videos`);
    const data = await res.json();
    
    const title = data.title || data.name || currentTitle;
    document.getElementById("modal-title").innerText = title;
    document.getElementById("player-title-indicator").innerText = `Now Playing: ${title}`;
    document.getElementById("modal-rating").innerText = `⭐ ${data.vote_average ? data.vote_average.toFixed(1) : "N/A"}`;
    document.getElementById("modal-year").innerText = (data.release_date || data.first_air_date || "2026").substring(0, 4);
    document.getElementById("modal-type-badge").innerText = type.toUpperCase();
    
    if (data.overview && data.overview.trim() !== "") {
      document.getElementById("modal-desc").innerText = data.overview;
    }
    
    if (data.backdrop_path) {
      document.getElementById("modal-backdrop-img").src = IMG_URL + data.backdrop_path;
    }

    // Dynamic Genres Injection
    const genresContainer = document.getElementById("modal-genres");
    if (genresContainer) {
      if (data.genres && data.genres.length > 0) {
        genresContainer.innerText = data.genres.map(g => g.name).join(" • ");
      } else {
        genresContainer.innerText = "Cinematic • Masterpiece";
      }
    }
    
    // Dynamic Starring / Cast Injection with Google Links
    const creditsRes = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
    const creditsData = await creditsRes.json();
    const castContainer = document.getElementById("modal-cast");
    if (castContainer) {
      castContainer.innerHTML = "";
      if (creditsData.cast && creditsData.cast.length > 0) {
        const topCast = creditsData.cast.slice(0, 5);
        topCast.forEach((actor, index) => {
          const actorLink = document.createElement("a");
          actorLink.href = `https://www.google.com/search?q=${encodeURIComponent(actor.name)}`;
          actorLink.target = "_blank";
          actorLink.innerText = actor.name;
          actorLink.style.color = "var(--accent-color, #38bdf8)";
          actorLink.style.textDecoration = "underline";
          actorLink.style.marginRight = "6px";
          actorLink.title = `Search ${actor.name} on Google`;
          
          castContainer.appendChild(actorLink);
          if (index < topCast.length - 1) {
            const comma = document.createElement("span");
            comma.innerText = ", ";
            castContainer.appendChild(comma);
          }
        });
      } else {
        castContainer.innerText = "Not specified";
      }
    }

    document.getElementById("download-btn").href = `https://vidlink.pro/movie/${id}`;
    
    const imdbId = data.imdb_id || (data.external_ids && data.external_ids.imdb_id) || (itemObj && itemObj.imdb_id) || "tt1375666";
    document.getElementById("imdb-btn").href = `https://www.themoviedb.org/movie/${id}`;
    if (activeItemObj) activeItemObj.imdb_id = imdbId;

    // --- ACCURATE YOUTUBE TRAILER FIX ---
    const results = (data.videos && data.videos.results) ? data.videos.results : [];
    const ytTrailer = results.find(v => v.site === "YouTube" && v.type === "Trailer") || 
                      results.find(v => v.site === "YouTube" && v.type === "Teaser") || 
                      results.find(v => v.site === "YouTube");
    
    const ytBtn = document.getElementById("yt-trailer-link-btn");
    if (ytBtn) {
      if (ytTrailer && ytTrailer.key) {
        ytBtn.href = `https://www.youtube.com/watch?v=${ytTrailer.key}`;
      } else {
        // Fallback search link directly to official YouTube trailer
        ytBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}`;
      }
      ytBtn.style.display = "inline-flex";
    }

  } catch (e) {
    const ytBtn = document.getElementById("yt-trailer-link-btn");
    if (ytBtn) {
      ytBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(currentTitle + " official trailer")}`;
      ytBtn.style.display = "inline-flex";
    }
  }

  if (type === "tv") {
    tvControlsBar.style.display = "flex";
    document.getElementById("modal-season").value = "1";
    document.getElementById("modal-episode").value = "1";
  } else {
    tvControlsBar.style.display = "none";
  }

  buildServerDropdownOptions();
  updateWatchlistButtonState();
  modal.classList.add("active");
}

function buildServerDropdownOptions() {
  serverSelect.innerHTML = "";
  allServers.forEach(srv => {
    const opt = document.createElement("option");
    opt.value = srv.name;
    opt.innerText = `Server: ${srv.name}`;
    if (srv.name.toLowerCase() === DEFAULT_SERVER.toLowerCase()) {
      opt.selected = true;
    }
    serverSelect.appendChild(opt);
  });
}

function triggerPlayerPlay() {
  modalBackdropPreview.style.display = "none";
  playerWrapper.style.display = "block";
  loadSelectedServerUrl();
}

function loadSelectedServerUrl() {
  const s = document.getElementById("modal-season") ? document.getElementById("modal-season").value : 1;
  const e = document.getElementById("modal-episode") ? document.getElementById("modal-episode").value : 1;
  const selectedServerName = serverSelect.value;
  
  const targetSrv = allServers.find(sObj => sObj.name === selectedServerName) || allServers[0];
  const imdbCode = (activeItemObj && activeItemObj.imdb_id) ? activeItemObj.imdb_id : "tt1375666";
  
  player.src = targetSrv.getUrl(activeId, imdbCode, activeType, s, e);
}

function changeServerDropdown() {
  if (playerWrapper.style.display !== "none") {
    loadSelectedServerUrl();
  }
}

function loadSeriesEpisode() {
  if (playerWrapper.style.display !== "none") {
    loadSelectedServerUrl();
  }
}

function toggleTheaterMode() {
  document.getElementById("glass-panel-box").classList.toggle("theater-mode");
}

async function toggleFavoriteCurrent() {
  if (!activeItemObj) return;
  const exists = watchList.some(i => i.id === activeId);
  if (exists) {
    watchList = watchList.filter(i => i.id !== activeId);
    alert("Removed from Cloud Watchlist.");
  } else {
    watchList.push(activeItemObj);
    alert("Added to Cloud Watchlist!");
    
    if (supabaseClient) {
      try {
        await supabaseClient.from('watchlist').insert([{ media_id: activeId, title: activeItemObj.title || activeItemObj.name, type: activeType }]);
      } catch (err) {}
    }
  }
  localStorage.setItem("piratv_watchlist", JSON.stringify(watchList));
  updateWatchlistButtonState();
}

function updateWatchlistButtonState() {
  const btn = document.getElementById("fav-modal-btn");
  if (!btn) return;
  const exists = watchList.some(i => i.id === activeId);
  if (exists) btn.innerText = "❤️ Remove from Watchlist";
  else btn.innerText = "🤍 Add to Watchlist";
}

function shareFilmLink() {
  const url = window.location.href.split('?')[0] + `?id=${activeId}&type=${activeType}`;
  navigator.clipboard.writeText(url);
  alert("Masterpiece link copied to clipboard!");
}

function closeModal() {
  modal.classList.remove("active");
  player.src = "";
  modalBackdropPreview.style.display = "flex";
  playerWrapper.style.display = "none";
  document.getElementById("glass-panel-box").classList.remove("theater-mode");
}

// Config Modals
function openConfigModal() { document.getElementById("config-modal").classList.add("active"); }
function closeConfigModal() { document.getElementById("config-modal").classList.remove("active"); }
function openAuthModal() { alert("to help the developers join our community on instagram @y4ssine.edit "); }

function saveSupabaseConfigurations() {
  const newKey = document.getElementById("api-key-input").value.trim();
  const newSbUrl = document.getElementById("supabase-url-input").value.trim();
  const newSbKey = document.getElementById("supabase-key-input").value.trim();

  if (newKey) {
    localStorage.setItem("piratv_apikey", newKey);
    API_KEY = newKey;
  }
  if (newSbUrl && newSbKey) {
    localStorage.setItem("piratv_sb_url", newSbUrl);
    localStorage.setItem("piratv_sb_key", newSbKey);
  }
  alert("Configurations saved successfully!");
  closeConfigModal();
  location.reload();
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initDynamicThemeAnimation();
  initTrailerLoop();
  fetchMedia(TRENDING_URL, "Trending Cinematic Masterpieces");

  renderSection("movies-grid", `${BASE_URL}/movie/popular?api_key=${API_KEY}`, "movie");
  renderSection("tv-grid", `${BASE_URL}/tv/popular?api_key=${API_KEY}`, "tv");
  renderSection("anime-grid", `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`, "anime");
  renderSection("action-grid", `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, "action");
  renderSection("scifi-grid", `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`, "scifi");
});