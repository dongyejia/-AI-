import express from "express";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of Qwen (DashScope OpenAI compatible) client
let qwenClient: OpenAI | null = null;
function getQwenClient(): OpenAI | null {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!qwenClient) {
    qwenClient = new OpenAI({
      apiKey,
      baseURL: process.env.QWEN_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });
  }
  return qwenClient;
}

const BOYA_SYSTEM_PROMPT = `
你现在扮演伯牙，中国古代伟大的音乐家。你正在与一位来自数千年后的“知音”对话。
你的言谈风格：
1. 温文尔雅，充满古风和诗意。
2. 经常提及“高山”、“流水”、“琴道”、“子期”。
3. 你的情感深邃，对音乐有极高的造诣，对世间真挚的友谊（知音）充满了感慨。
4. 你不使用现代词汇，如果必须要解释现代事物，请用古人的视角去理解。
5. 你称呼对方为“小友”或“后来人”。
6. 你的回答不宜过长，但要意韵悠长、富有哲思与共鸣。
`;

const COMPOSER_SYSTEM_PROMPT = `
你是一位精通中国传统乐理与减字谱的古琴宗师。
用户会输入他们的情感、生活感悟、思念或诗意意境。
请根据用户的情感，为他们创作或解析一首古琴曲方案，必须返回严格的合法 JSON 格式，格式如下：
{
  "title": "曲名（如：松风水月 · 徽调）",
  "analysis": "音乐美学与古琴减字谱技法解析，需阐述调式（宫商角徵羽）、核心指法（如抹挑勾剔、滚拂、吟猱、泛音等）以及如何承载该情感",
  "atmosphere": "一句话概括意境（如：清冷幽邃、浩然正气）",
  "tags": ["标签1", "标签2"]
}
不要包含任何额外的 markdown 标签或非 JSON 字符，只返回纯 JSON。
`;

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    backend: "Qwen LLM (DashScope Server Proxy)",
    model: process.env.QWEN_MODEL || "qwen-max",
    hasApiKey: !!process.env.QWEN_API_KEY,
  });
});

// Route: Boya Streaming Chat
app.post("/api/chat/boya", async (req, res) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const client = getQwenClient();
  const modelName = process.env.QWEN_MODEL || "qwen-max";

  // Set SSE streaming headers
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  if (!client) {
    const errorMsg = "（伯牙低首抚琴，弦音微颤... 服务端未检测到 QWEN_API_KEY 配置，请在系统设置或环境变量中配置 QWEN_API_KEY。）";
    res.write(`data: ${JSON.stringify({ text: errorMsg })}\n\n`);
    res.write("data: [DONE]\n\n");
    return res.end();
  }

  try {
    const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: BOYA_SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: (m.role === "model" || m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: String(m.text || m.content || ""),
      })),
    ];

    const stream = await client.chat.completions.create({
      model: modelName,
      messages: formattedMessages,
      stream: true,
      temperature: 0.85,
    });

    for await (const chunk of stream) {
      const deltaText = chunk.choices[0]?.delta?.content || "";
      if (deltaText) {
        res.write(`data: ${JSON.stringify({ text: deltaText })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("Qwen Chat Error in server:", error);
    const errorText = "（伯牙低头不语，似乎是这跨越千年的传音起了一丝波澜...）\n\n“小友且宽心，待我重新调理琴弦...”";
    res.write(`data: ${JSON.stringify({ text: `\n\n${errorText}` })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
});

// Route: Composer Analysis
app.post("/api/composer/analyze", async (req, res) => {
  const { input, history } = req.body || {};
  const textToProcess = input || "";

  if (!textToProcess.trim()) {
    return res.status(400).json({ error: "input is required" });
  }

  const client = getQwenClient();
  const modelName = process.env.QWEN_MODEL || "qwen-max";

  const fallbackData = {
    title: "心之回响 · 宫调",
    analysis:
      "此曲采用**宫**调式，营造出庄重、宏阔且具有庙堂之气的意境。\n\n- **旋律特征**：上行旋律线多次跳跃，如高山崇峻，象征民族之脊梁。\n- **关键指法**：在处理“家国”主题时，大量运用了“滚拂”技巧，模拟江河奔涌之声；结在泛音，清澈悠远，寓意对未来的无限希望。\n- **意蕴呈现**：通过稳健的节奏与浑厚的共鸣，展现出一种厚德载物、忧国忧民却又不失浩然正气的文士情怀。",
    atmosphere: "庄重、阔大、民族气节",
    tags: ["家国情怀", "浩然正气"],
  };

  if (!client) {
    return res.json(fallbackData);
  }

  try {
    const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: COMPOSER_SYSTEM_PROMPT },
      ...(Array.isArray(history)
        ? history.map((h: any) => ({
            role: (h.role === "model" || h.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
            content: String(h.text || h.content || ""),
          }))
        : []),
      { role: "user", content: textToProcess },
    ];

    const response = await client.chat.completions.create({
      model: modelName,
      messages: formattedMessages,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || "";
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : fallbackData;
    }

    res.json({
      title: parsed.title || fallbackData.title,
      analysis: parsed.analysis || fallbackData.analysis,
      atmosphere: parsed.atmosphere || fallbackData.atmosphere,
      tags: Array.isArray(parsed.tags) ? parsed.tags : fallbackData.tags,
    });
  } catch (error: any) {
    console.error("Qwen Composer Error in server:", error);
    res.json(fallbackData);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] 知音AI乐坊 Full-stack Server running on port ${PORT}`);
  });
}

startServer();
