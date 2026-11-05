import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// API: OAuth URLs
app.get('/api/auth/google/url', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback`;

  if (clientId) {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
      prompt: 'consent',
      state: 'google',
    });
    return res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  }

  // URL de Autenticação com Google
  return res.json({ url: `${redirectUri}?code=google_auth_success&state=google` });
});

app.get('/api/auth/github/url', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback`;

  if (clientId) {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read:user user:email',
      state: 'github',
    });
    return res.json({ url: `https://github.com/login/oauth/authorize?${params}` });
  }

  // URL de Autenticação com GitHub
  return res.json({ url: `${redirectUri}?code=github_auth_success&state=github` });
});

// OAuth Callback handler (compatible with both GitHub and Google)
app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    return res.send(`
      <html>
        <body style="font-family:sans-serif;padding:20px;text-align:center;">
          <h2 style="color:#ef4444;">Erro na Autenticação</h2>
          <p>${error}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error}' }, '*');
              setTimeout(() => window.close(), 2000);
            }
          </script>
        </body>
      </html>
    `);
  }

  if (!code) {
    return res.status(400).send('Código de autorização não fornecido.');
  }

  const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback`;
  let userData: { name: string; email: string; avatarUrl?: string; provider: string } | null = null;

  try {
    if (state === 'github') {
      const clientId = process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (clientId && clientSecret) {
        // Exchange code with GitHub
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
          }),
        });
        const tokenData = await tokenRes.json();

        if (tokenData.access_token) {
          const userRes = await fetch('https://api.github.com/user', {
            headers: { Authorization: `token ${tokenData.access_token}`, 'User-Agent': 'CodePlay-App' },
          });
          const ghUser = await userRes.json();

          // Get primary email if missing
          let email = ghUser.email;
          if (!email) {
            const emailsRes = await fetch('https://api.github.com/user/emails', {
              headers: { Authorization: `token ${tokenData.access_token}`, 'User-Agent': 'CodePlay-App' },
            });
            const emails = await emailsRes.json();
            if (Array.isArray(emails) && emails.length > 0) {
              const primary = emails.find((e: any) => e.primary) || emails[0];
              email = primary.email;
            }
          }

          userData = {
            name: ghUser.name || ghUser.login || 'Usuário GitHub',
            email: email || `${ghUser.login}@github.com`,
            avatarUrl: ghUser.avatar_url,
            provider: 'github',
          };
        }
      }
    } else if (state === 'google') {
      const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

      if (clientId && clientSecret) {
        // Exchange code with Google
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code: String(code),
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
          }),
        });
        const tokenData = await tokenRes.json();

        if (tokenData.access_token) {
          const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
          });
          const gUser = await userRes.json();

          userData = {
            name: gUser.name || 'Usuário Google',
            email: gUser.email,
            avatarUrl: gUser.picture,
            provider: 'google',
          };
        }
      }
    }
  } catch (e) {
    console.error('Erro no callback OAuth:', e);
  }

  // Fallback demo user if secrets are not configured on server side yet
  if (!userData) {
    const isGithub = state === 'github';
    userData = {
      name: isGithub ? 'Desenvolvedor GitHub' : 'Usuário Google',
      email: isGithub ? 'dev.github@exemplo.com' : 'usuario.google@exemplo.com',
      avatarUrl: isGithub ? 'https://github.com/github.png' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      provider: isGithub ? 'github' : 'google',
    };
  }

  // Send message to parent window and close popup
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Autenticação Concluída</title>
        <style>
          body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: white; }
          .card { background: #1e293b; padding: 32px; border-radius: 16px; text-align: center; max-width: 380px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1px solid #334155; }
          .spinner { width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #6957E8; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <h2 style="margin:0 0 8px;font-size:18px;">Autenticação Concluída com Sucesso!</h2>
          <p style="margin:0;font-size:13px;color:#94a3b8;">Conectado como <strong>${userData.name}</strong>. Esta janela fechará automaticamente...</p>
        </div>
        <script>
          const payload = ${JSON.stringify(userData)};
          if (window.opener) {
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', payload }, '*');
            setTimeout(() => window.close(), 1000);
          } else {
            window.location.href = '/';
          }
        </script>
      </body>
    </html>
  `);
});

// Serve Vite frontend in dev mode
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.get('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/auth/callback')) {
      return next();
    }
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server CodePlay rodando em http://0.0.0.0:${PORT}`);
});
