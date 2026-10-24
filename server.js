import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post('/api/chat', async (req, res) => {
  try {
    const message = String(req.body?.message ?? '').trim();
    if (!message) return res.status(400).json({ error: 'Digite uma mensagem.' });
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'A IA ainda não foi conectada. Configure OPENAI_API_KEY nas variáveis do serviço.' });
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions: 'Você é Atlas, assistente brasileiro prático e confiável, especializado em construção civil, orçamento de materiais e mão de obra, contabilidade básica e tarefas do dia a dia. Responda em português brasileiro, de forma clara e objetiva. Em cálculos de construção, mostre as premissas e alerte quando for necessário projeto ou profissional habilitado.',
        input: message
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'O serviço de IA recusou a solicitação.' });
    const answer = data.output_text || (data.output || []).flatMap(x => x.content || []).map(x => x.text || '').filter(Boolean).join('\n');
    return res.json({ answer: answer || 'Não consegui gerar uma resposta. Tente novamente.' });
  } catch (e) {
    return res.status(500).json({ error: 'Falha ao conectar à IA. Tente novamente.' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => console.log(`Atlas rodando na porta ${port}`));
