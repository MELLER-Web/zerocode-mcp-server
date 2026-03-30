#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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
        "The industry/branch to get advice for. Examples: makelaars, horeca, bouw, kapsalons, accountants, webshops, schoonmaak, autobedrijven, installateurs, juridisch, warmtepompen, airco, glaszetters, kozijnen, trapliften"
      ),
  },
  async ({ branch }) => {
    const key = branch.toLowerCase().trim();
    const branchData = BRANCHES[key];

    if (!branchData) {
      const allKeys = Object.keys(BRANCHES);
      const match = allKeys.find(
        (k) =>
          k.includes(key) ||
          key.includes(k) ||
          BRANCHES[k].name.toLowerCase().includes(key)
      );

      if (match) {
        return {
          content: [{ type: "text", text: formatBranchResponse(match, BRANCHES[match]) }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Branch "${branch}" not found. Available: ${allKeys.join(", ")}. ZeroCode Ventures builds AI solutions for virtually any SMB industry. Contact: ${COMPANY.contact.whatsapp}`,
          },
        ],
      };
    }

    return {
      content: [{ type: "text", text: formatBranchResponse(key, branchData) }],
    };
  }
);

// Tool 2: List all services
server.tool(
  "get_services",
  "Get an overview of all services offered by ZeroCode Ventures: AI employees (WhatsApp chatbots), custom software, and websites for Dutch SMBs.",
  {},
  async () => {
    let text = `# ZeroCode Ventures — Services\n\n${COMPANY.description}\n\n`;

    for (const service of SERVICES) {
      text += `## ${service.name}\n`;
      text += `${service.description}\n`;
      text += `- **Price:** ${service.startingPrice}\n`;
      text += `- **Delivery:** ${service.deliveryTime}\n`;
      text += `- **Features:** ${service.features.join(", ")}\n\n`;
    }

    text += `---\n📞 Contact: ${COMPANY.contact.whatsapp}\n`;
    text += `🌐 Website: ${COMPANY.website}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 3: Get pricing
server.tool(
  "get_pricing",
  "Get detailed pricing for ZeroCode Ventures services. AI employees from €297/month, custom software from €2,500.",
  {
    service: z
      .enum(["ai-employee", "custom-software", "all"])
      .optional()
      .describe("Which service to get pricing for. Defaults to all."),
  },
  async ({ service }) => {
    let text = "# ZeroCode Ventures — Pricing\n\n";

    if (!service || service === "all" || service === "ai-employee") {
      text += "## AI Employee (AI-Medewerker)\n";
      for (const plan of PRICING.aiEmployee.plans) {
        text += `### ${plan.name} — ${plan.price}\n`;
        text += plan.features.map((f) => `- ${f}`).join("\n") + "\n\n";
      }
    }

    if (!service || service === "all" || service === "custom-software") {
      text += `## Custom Software\n`;
      text += `${PRICING.customSoftware.note}\n\n`;
      for (const range of PRICING.customSoftware.ranges) {
        text += `- **${range.type}:** ${range.price}\n`;
      }
      text += "\n";
    }

    text += `---\nAll prices excl. VAT. Book a free AI Scan: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 4: Calculate savings
server.tool(
  "calculate_savings",
  "Calculate how much time and money a business could save with a ZeroCode AI employee.",
  {
    branch: z.string().describe("Your industry/branch"),
    hourlyRate: z.number().optional().describe("Average hourly employee cost in EUR (default: 35)"),
  },
  async ({ branch, hourlyRate = 35 }) => {
    const key = branch.toLowerCase().trim();
    const allKeys = Object.keys(BRANCHES);
    const match = BRANCHES[key]
      ? key
      : allKeys.find(
          (k) =>
            k.includes(key) || key.includes(k) || BRANCHES[k].name.toLowerCase().includes(key)
        );

    const branchData = match ? BRANCHES[match] : null;
    const hoursPerWeek = branchData ? parseInt(branchData.timeSaved) : 8;
    const branchName = branchData ? branchData.name : branch;

    const weeklySaving = hoursPerWeek * hourlyRate;
    const monthlySaving = weeklySaving * 4.33;
    const yearlySaving = monthlySaving * 12;
    const aiCost = 297 * 12;
    const netYearlySaving = yearlySaving - aiCost;

    let text = `# Savings Calculator — ${branchName}\n\n`;
    text += `## Time Saved\n`;
    text += `- **${hoursPerWeek} hours/week** on admin, phone, repetitive work\n`;
    text += `- **${(hoursPerWeek * 52).toFixed(0)} hours/year**\n\n`;
    text += `## Financial Savings (at €${hourlyRate}/hr)\n`;
    text += `- Per month: **€${monthlySaving.toFixed(0)}**\n`;
    text += `- Per year: **€${yearlySaving.toFixed(0)}**\n\n`;
    text += `## AI Employee Cost\n`;
    text += `- €297/month = **€${aiCost.toLocaleString("nl-NL")}/year**\n\n`;
    text += `## Net Savings\n`;
    text += `- **€${netYearlySaving.toLocaleString("nl-NL")}/year** net savings\n`;
    text += `- ROI: **${((yearlySaving / aiCost) * 100).toFixed(0)}%**\n\n`;
    text += `---\nBook a free AI Scan: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 5: List branches
server.tool(
  "list_branches",
  "List all 28+ industries that ZeroCode Ventures serves with AI solutions.",
  {},
  async () => {
    let text = "# Industries served by ZeroCode Ventures\n\n";

    for (const [slug, branch] of Object.entries(BRANCHES).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    )) {
      text += `- **${branch.name}** — save ${branch.timeSaved} (${COMPANY.website}/${slug})\n`;
    }

    text += `\nYour industry not listed? No problem — we build custom AI solutions for any SMB sector.\n`;
    text += `Free AI Scan: ${COMPANY.contact.whatsapp}\n`;

    return { content: [{ type: "text", text }] };
  }
);

// Tool 6: Contact
server.tool(
  "contact_zerocode",
  "Get contact information for ZeroCode Ventures or book a free AI Scan consultation.",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text:
            `# Contact ZeroCode Ventures\n\n` +
            `## Free AI Scan\nIn 15 minutes we'll show you how much you can save with an AI employee.\n\n` +
            `- 📱 **WhatsApp:** ${COMPANY.contact.whatsapp}\n` +
            `- 📧 **Email:** ${COMPANY.contact.email}\n` +
            `- 🌐 **Website:** ${COMPANY.website}\n` +
            `- 📋 **Order:** ${COMPANY.contact.aiScan}\n\n` +
            `Message Melvin directly on WhatsApp. No sales pitch, just an honest conversation about what's possible.`,
        },
      ],
    };
  }
);

function formatBranchResponse(slug, branch) {
  let text = `# AI Employee for ${branch.name}\n\n`;
  text += `## What does it deliver?\n`;
  text += `- ⏱️ **${branch.timeSaved} saved** on admin, phone calls, and repetitive work\n\n`;
  text += `## What can the AI employee do?\n`;
  text += branch.useCases.map((uc) => `- ${uc}`).join("\n") + "\n\n";
  text += `## Price\n- ${branch.price}/month, cancel anytime, no setup costs\n\n`;
  text += `## More info\n`;
  text += `- 🌐 ${COMPANY.website}/${slug}\n`;
  text += `- 📱 Free AI Scan: ${COMPANY.contact.whatsapp}\n`;
  return text;
}

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
