/**
 * Yeni proje eklemek için PROJECTS dizisine bir nesne ekle — başka bir şey gerekmez.
 * github / demo alanları boşsa buton "yakında" olarak devre dışı görünür (sahte URL yok).
 */
window.YS_DATA = {
  PROJECTS: [
    {
      id: "koyu-kahve",
      image: "assets/projects/koyu-kahve.svg",
      tech: ["QR Menu", "Order Management", "Admin Panel"],
      github: "",
      demo: ""
    },
    {
      id: "jarvis",
      image: "assets/projects/jarvis.svg",
      tech: ["Python", "Local AI Model"],
      github: "",
      demo: ""
    },
    {
      id: "vibematch",
      image: "assets/projects/vibematch.svg",
      tech: ["User Profiles", "Discovery", "Messaging"],
      github: "",
      demo: ""
    },
    {
      id: "user-manager",
      image: "assets/projects/user-manager.svg",
      tech: ["Python"],
      github: "",
      demo: ""
    }
  ],

  /**
   * Yetenek seviyeleri — burayı kendi durumuna göre düzenle.
   * active: aktif kullandıkların | learning: öğrendiklerin | goal: uzmanlaşmayı hedeflediklerin
   * (Yüzde ya da "uzman" ibaresi kullanılmaz.)
   */
  SKILLS: {
    groups: ["languages", "web", "other"],
    items: [
      { name: "Python", group: "languages", level: "active" },
      { name: "JavaScript", group: "languages", level: "active" },
      { name: "SQL", group: "languages", level: "active" },
      { name: "TypeScript", group: "languages", level: "learning" },
      { name: "Java", group: "languages", level: "goal" },
      { name: "C#", group: "languages", level: "goal" },

      { name: "HTML5", group: "web", level: "active" },
      { name: "CSS3", group: "web", level: "active" },
      { name: "Flask", group: "web", level: "learning" },
      { name: "React", group: "web", level: "learning" },
      { name: "Node.js", group: "web", level: "learning" },
      { name: "Django", group: "web", level: "goal" },

      { name: "Git", group: "other", level: "active" },
      { name: "GitHub", group: "other", level: "active" },
      { name: "SQLite", group: "other", level: "active" },
      { name: "PostgreSQL", group: "other", level: "learning" },
      { name: "Flutter", group: "other", level: "goal" }
    ]
  }
};
