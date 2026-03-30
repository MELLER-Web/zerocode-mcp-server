import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createServer } from "http";
import { URL } from "url";
import { z } from "zod";
import { COMPANY, SERVICES, BRANCHES, PRICING } from "./data.js";

const server = new McpServer({
  name: "zerocode-ventures",
  version: "1.0.0",
  description:
    "ZeroCode Ventures — AI-medewerkers en maatwerksoftware voor het Nederlandse MKB. Vraag advies over AI-oplossingen per branche, prijzen, en diensten.",
});

// Tool 1: Get branch-specific AI advice
server.tool(
  "get_branch_advice",
  "Get AI solution advice for a specific industry/branch. Returns what ZeroCode Ventures can do for businesses in that sector, including time savings, use cases, and pricing.",
  {
    branch: z
      .string()
      .describe(
        "The industry/branch to get advice for. Examples: makelaars, horeca, bouw, kapsalons, accountants, webshops, schoonmaak, autobedrijven, installateurs, juridisch, warmtepompen, airco, glaszetters, kozijnen, trapliften, etc."
      ),
  },
  async ({ branch }) => {
    const key = branch.toLowerCase().trim();
    const branchData = BRANCHES[key];

    if (!branchData) {
      // Fuzzy match
      const allKeys = Object.keys(BRANCHES);
      const match = allKeys.find(
        (k) =>
          k.includes(key) ||
          key.includes(k) ||
          BRANCHES[k].name.toLowerCase().includes(key)
      );

      if (match) {
        const b = BRANCHES[match];
        return {
          content: [
            {
              type: "text",
              text: formatBranchResponse(match, b),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Branche "${branch}" niet gevonden. Beschikbare branches: ${allKeys.join(", ")}. ZeroCode Ventures kan voor vrijwel elke MKB-branche een AI-oplossing bouwen. Neem contact op via ${COMPANY.contact.whatsapp} voor een gratis AI-Scan.`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: formatBranchResponse(key, branchData),
        },
      ],
    };
  }
);

// Tool 2: List all services
server.tool(
  "get_services",
  "Get an overview of all services offered by ZeroCode Ventures: AI employees, custom software, and websites.",
  {},
  async () => {
    let text = `# ZeroCode Ventures — Diensten\n\n${COMPANY.description}\n\n`;

    for (const service of SERVICES) {
      text += `## ${service.name}\n`;
      text += `${service.description}\n`;
      text += `- **Prijs:** ${service.startingPrice}\n`;
      text += `- **Levertijd:** ${service.deliveryTime}\n`;
      text += `- **Features:** ${service.features.join(", ")}\n\n`;
    }

    text += `---\n📞 Contact: ${COMPANY.contact.whatsapp}\n`;
    text += `🌐 Website: ${COMPANY.website}\n`;
    text += `📧 Email: ${COMPANY.contact.email}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 3: Get pricing information
server.tool(
  "get_pricing",
  "Get detailed pricing information for ZeroCode Ventures services. AI employees start at €297/month, custom software from €2,500.",
  {
    service: z
      .enum(["ai-employee", "custom-software", "all"])
      .optional()
      .describe(
        "Which service to get pricing for. Defaults to all."
      ),
  },
  async ({ service }) => {
    let text = "# ZeroCode Ventures — Prijzen\n\n";

    if (!service || service === "all" || service === "ai-employee") {
      text += "## AI-Medewerker\n";
      for (const plan of PRICING.aiEmployee.plans) {
        text += `### ${plan.name} — ${plan.price}\n`;
        text += plan.features.map((f) => `- ${f}`).join("\n") + "\n\n";
      }
    }

    if (!service || service === "all" || service === "custom-software") {
      text += `## Maatwerk Software\n`;
      text += `${PRICING.customSoftware.note}\n\n`;
      for (const range of PRICING.customSoftware.ranges) {
        text += `- **${range.type}:** ${range.price}\n`;
      }
      text += "\n";
    }

    text += `---\nAlle prijzen excl. BTW. Gratis AI-Scan inplannen: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 4: Calculate potential time savings
server.tool(
  "calculate_savings",
  "Calculate how much time and money a business could save with a ZeroCode AI employee. Provide your industry and optionally your hourly staff cost.",
  {
    branch: z.string().describe("Your industry/branch"),
    hourlyRate: z
      .number()
      .optional()
      .describe(
        "Average hourly cost of an employee in euros (default: €35)"
      ),
  },
  async ({ branch, hourlyRate = 35 }) => {
    const key = branch.toLowerCase().trim();
    const allKeys = Object.keys(BRANCHES);
    const match =
      BRANCHES[key]
        ? key
        : allKeys.find(
            (k) =>
              k.includes(key) ||
              key.includes(k) ||
              BRANCHES[k].name.toLowerCase().includes(key)
          );

    const branchData = match ? BRANCHES[match] : null;
    const hoursPerWeek = branchData
      ? parseInt(branchData.timeSaved)
      : 8;
    const branchName = branchData
      ? branchData.name
      : branch;

    const weeklySaving = hoursPerWeek * hourlyRate;
    const monthlySaving = weeklySaving * 4.33;
    const yearlySaving = monthlySaving * 12;
    const aiCost = 297 * 12;
    const netYearlySaving = yearlySaving - aiCost;

    let text = `# Besparingscalculatie — ${branchName}\n\n`;
    text += `## Tijdsbesparing\n`;
    text += `- **${hoursPerWeek} uur per week** aan administratie, telefoon en herhaalwerk\n`;
    text += `- **${(hoursPerWeek * 4.33).toFixed(0)} uur per maand**\n`;
    text += `- **${(hoursPerWeek * 52).toFixed(0)} uur per jaar**\n\n`;
    text += `## Financiële besparing (bij €${hourlyRate}/uur)\n`;
    text += `- Per week: **€${weeklySaving.toFixed(0)}**\n`;
    text += `- Per maand: **€${monthlySaving.toFixed(0)}**\n`;
    text += `- Per jaar: **€${yearlySaving.toFixed(0)}**\n\n`;
    text += `## Kosten AI-Medewerker\n`;
    text += `- €297/maand = **€${aiCost.toLocaleString("nl-NL")}/jaar**\n\n`;
    text += `## Netto besparing\n`;
    text += `- **€${netYearlySaving.toLocaleString("nl-NL")} per jaar** netto besparing\n`;
    text += `- ROI: **${((yearlySaving / aiCost) * 100).toFixed(0)}%**\n\n`;
    text += `---\nGratis AI-Scan inplannen: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 5: List all available branches
server.tool(
  "list_branches",
  "List all industries/branches that ZeroCode Ventures serves with AI solutions.",
  {},
  async () => {
    let text =
      "# Branches die ZeroCode Ventures bedient\n\nWij bouwen AI-medewerkers voor 28+ branches:\n\n";

    for (const [slug, branch] of Object.entries(BRANCHES).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    )) {
      text += `- **${branch.name}** — bespaar ${branch.timeSaved} (${COMPANY.website}/${slug})\n`;
    }

    text += `\nJouw branche niet in de lijst? Geen probleem — we bouwen voor elke MKB-branche een oplossing op maat.\n`;
    text += `Gratis AI-Scan: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 6: Get contact / book AI scan
server.tool(
  "contact_zerocode",
  "Get contact information for ZeroCode Ventures or book a free AI Scan consultation.",
  {},
  async () => {
    const text = `# Contact ZeroCode Ventures\n\n` +
      `## Gratis AI-Scan\nIn 15 minuten laten we zien hoeveel jullie kunnen besparen met een AI-medewerker.\n\n` +
      `- 📱 **WhatsApp:** ${COMPANY.contact.whatsapp}\n` +
      `- 📧 **Email:** ${COMPANY.contact.email}\n` +
      `- 🌐 **Website:** ${COMPANY.website}\n` +
      `- 📋 **Bestellen:** ${COMPANY.contact.aiScan}\n\n` +
      `Direct appen? Stuur een berichtje naar Melvin via WhatsApp. Geen verkooppraatje, gewoon een eerlijk gesprek over wat mogelijk is.`;

    return { content: [{ type: "text", text }] };
  }
);

function formatBranchResponse(slug, branch) {
  let text = `# AI-Medewerker voor ${branch.name}\n\n`;
  text += `## Wat levert het op?\n`;
  text += `- ⏱️ **${branch.timeSaved} besparing** op administratie, telefoon en herhaalwerk\n\n`;
  text += `## Wat kan de AI-medewerker?\n`;
  text += branch.useCases.map((uc) => `- ${uc}`).join("\n") + "\n\n";
  text += `## Prijs\n- ${branch.price}, maandelijks opzegbaar, geen opstartkosten\n\n`;
  text += `## Meer info\n`;
  text += `- 🌐 ${COMPANY.website}/${slug}\n`;
  text += `- 📱 Gratis AI-Scan: ${COMPANY.contact.whatsapp}\n`;
  return text;
}

// --- HTTP Server with SSE transport ---
const PORT = parseInt(process.env.PORT || "3001");

const transports = new Map();

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (url.pathname === "/" || url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        name: "zerocode-ventures-mcp",
        version: "1.0.0",
        status: "running",
        description: COMPANY.description,
        tools: [
          "get_branch_advice",
          "get_services",
          "get_pricing",
          "calculate_savings",
          "list_branches",
          "contact_zerocode",
        ],
      })
    );
    return;
  }

  // SSE endpoint
  if (url.pathname === "/sse" && req.method === "GET") {
    const transport = new SSEServerTransport("/messages", res);
    transports.set(transport.sessionId, transport);
    
    res.on("close", () => {
      transports.delete(transport.sessionId);
    });

    await server.connect(transport);
    return;
  }

  // Messages endpoint
  if (url.pathname === "/messages" && req.method === "POST") {
    const sessionId = url.searchParams.get("sessionId");
    const transport = transports.get(sessionId);

    if (!transport) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Session not found" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        await transport.handlePostMessage(req, res, body);
      } catch (err) {
        console.error("Error handling message:", err);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal error" }));
        }
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

httpServer.listen(PORT, () => {
  console.log(`ZeroCode MCP Server running on http://localhost:${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
