// biome-ignore-all lint: db-sqlite
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export interface BlogPost {
  id: number;
  wp_id?: number | null;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author_name: string;
  author_avatar: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  created_at?: string;
  updated_at?: string;
}

const DB_PATH = path.join(process.cwd(), "src", "data", "blogs.db");

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    dbInstance = new DatabaseSync(DB_PATH);

    // Initialize Schema
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wp_id INTEGER,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        date TEXT NOT NULL,
        category TEXT DEFAULT 'บทความทั่วไป',
        author_name TEXT DEFAULT 'CodeCamp Editor',
        author_avatar TEXT,
        featured_image TEXT,
        featured_image_alt TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Admin',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
      CREATE INDEX IF NOT EXISTS idx_posts_wp_id ON posts(wp_id);
      CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);
  }

  return dbInstance;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  name: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export function getUserByUsername(username: string): User | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM users WHERE username = ? LIMIT 1")
    .get(username.trim().toLowerCase()) as Record<string, any> | undefined;
  return row ? ({ ...row } as User) : null;
}

export function getPosts({
  page = 1,
  perPage = 9,
  search = "",
  category = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
} = {}): {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
} {
  const db = getDb();

  const whereClauses: string[] = [];
  const params: any[] = [];

  if (search.trim()) {
    whereClauses.push("(title LIKE ? OR excerpt LIKE ?)");
    const searchTerm = `%${search.trim()}%`;
    params.push(searchTerm, searchTerm);
  }

  if (category.trim()) {
    whereClauses.push("category = ?");
    params.push(category.trim());
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // Count total matching
  const countRow = db.prepare(`SELECT COUNT(*) as count FROM posts ${whereSql}`).get(...params) as {
    count: number;
  };
  const total = Number(countRow?.count || 0);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const offset = Math.max(0, (page - 1) * perPage);

  // Query paginated
  const selectSql = `
    SELECT id, wp_id, slug, title, excerpt, content, date, category, author_name, author_avatar, featured_image, featured_image_alt, created_at, updated_at
    FROM posts
    ${whereSql}
    ORDER BY date DESC
    LIMIT ? OFFSET ?
  `;

  const rawPosts = db.prepare(selectSql).all(...params, perPage, offset) as Record<string, any>[];
  const posts = rawPosts.map((r) => ({ ...r })) as BlogPost[];

  return {
    posts,
    total,
    totalPages,
    page,
  };
}

export function getPostByParam(param: string): BlogPost | null {
  const db = getDb();
  const decoded = decodeURIComponent(param);

  // 1. If numeric, lookup by wp_id or id
  if (/^\d+$/.test(param)) {
    const numericId = parseInt(param, 10);
    const post = db
      .prepare("SELECT * FROM posts WHERE id = ? OR wp_id = ? LIMIT 1")
      .get(numericId, numericId) as Record<string, any> | undefined;
    if (post) return { ...post } as BlogPost;
  }

  // 2. Lookup by slug (raw or decoded)
  const post = db
    .prepare("SELECT * FROM posts WHERE slug = ? OR slug = ? LIMIT 1")
    .get(param, decoded) as Record<string, any> | undefined;

  return post ? ({ ...post } as BlogPost) : null;
}

export function createPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author_name?: string;
  author_avatar?: string;
  featured_image?: string;
  featured_image_alt?: string;
  date?: string;
  wp_id?: number;
}): BlogPost {
  const db = getDb();

  const now = new Date().toISOString();
  const date = data.date || now;
  const category = data.category || "Education";
  const authorName = data.author_name || "Yu Dev";
  const authorAvatar = data.author_avatar || "/uploads/blog/authors/author-yu-dev.webp";
  const featuredImage = data.featured_image || null;
  const featuredImageAlt = data.featured_image_alt || data.title;
  const excerpt = data.excerpt || "";
  const content = data.content || "";
  const wpId = data.wp_id || null;

  // Ensure slug uniqueness
  let baseSlug = data.slug.trim().toLowerCase().replace(/[\s/]+/g, "-");
  if (!baseSlug) {
    baseSlug = `post-${Date.now()}`;
  }

  let finalSlug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = db.prepare("SELECT id FROM posts WHERE slug = ?").get(finalSlug);
    if (!existing) break;
    finalSlug = `${baseSlug}-${counter++}`;
  }

  const result = db
    .prepare(
      `INSERT INTO posts (wp_id, slug, title, excerpt, content, date, category, author_name, author_avatar, featured_image, featured_image_alt, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      wpId,
      finalSlug,
      data.title,
      excerpt,
      content,
      date,
      category,
      authorName,
      authorAvatar,
      featuredImage,
      featuredImageAlt,
      now,
      now
    );

  const insertedId = Number(result.lastInsertRowid);
  const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(insertedId) as Record<string, any>;
  return { ...row } as BlogPost;
}

export function updatePost(
  id: number,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    author_name?: string;
    featured_image?: string | null;
  }
): BlogPost | null {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as Record<string, any> | undefined;
  if (!existing) return null;

  const title = data.title !== undefined ? data.title : existing.title;
  let slug = data.slug !== undefined ? data.slug.trim().toLowerCase().replace(/[\s/]+/g, "-") : existing.slug;
  if (!slug) slug = existing.slug;

  // If slug changed, ensure uniqueness
  if (slug !== existing.slug) {
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const collision = db.prepare("SELECT id FROM posts WHERE slug = ? AND id != ?").get(finalSlug, id);
      if (!collision) break;
      finalSlug = `${slug}-${counter++}`;
    }
    slug = finalSlug;
  }

  const excerpt = data.excerpt !== undefined ? data.excerpt : existing.excerpt;
  const content = data.content !== undefined ? data.content : existing.content;
  const category = data.category !== undefined ? data.category : existing.category;
  const authorName = data.author_name !== undefined ? data.author_name : existing.author_name;
  const featuredImage = data.featured_image !== undefined ? data.featured_image : existing.featured_image;
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE posts SET
      title = ?,
      slug = ?,
      excerpt = ?,
      content = ?,
      category = ?,
      author_name = ?,
      featured_image = ?,
      updated_at = ?
    WHERE id = ?
  `).run(
    title,
    slug,
    excerpt,
    content,
    category,
    authorName,
    featuredImage,
    now,
    id
  );

  const updated = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as Record<string, any>;
  return { ...updated } as BlogPost;
}

export function deletePost(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM posts WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

export function getAllSlugs(): Array<{
  slug: string;
  id: number;
  wp_id?: number | null;
  date?: string;
  updated_at?: string;
}> {
  const db = getDb();
  const rows = db
    .prepare("SELECT slug, id, wp_id, date, updated_at FROM posts ORDER BY date DESC")
    .all() as Record<string, any>[];
  return rows.map((r) => ({ ...r })) as Array<{
    slug: string;
    id: number;
    wp_id?: number | null;
    date?: string;
    updated_at?: string;
  }>;
}
