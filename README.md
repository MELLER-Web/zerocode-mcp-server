# ZeroCode Ventures MCP Server

> AI-medewerkers en maatwerksoftware voor het Nederlandse MKB

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that provides AI assistants with information about ZeroCode Ventures' services, industry-specific AI solutions, pricing, and savings calculations.

## What is this?

When you add this MCP server to your AI assistant (Claude, Cursor, VS Code, etc.), it can answer questions about:

- **🏢 28+ industries** — specific AI solutions for real estate agents, restaurants, construction, hair salons, accountants, and more
- **💰 Pricing** — transparent pricing for AI employees, custom software, and websites
- **📊 Savings calculator** — estimate how much time and money your business can save
- **🛠️ Services** — AI employees (WhatsApp chatbots), custom software, websites

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zerocode": {
      "command": "npx",
      "args": ["-y", "zerocode-mcp-server"]
    }
  }
}
```

### Cursor / VS Code

Add to your MCP settings:

```json
{
  "zerocode": {
    "command": "npx",
    "args": ["-y", "zerocode-mcp-server"]
  }
}
```

### Manual

```bash
npx zerocode-mcp-server
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_branch_advice` | Get AI solution advice for a specific industry |
| `get_services` | Overview of all ZeroCode services |
| `get_pricing` | Detailed pricing information |
| `calculate_savings` | Calculate time & money savings for your business |
| `list_branches` | List all 28+ supported industries |
| `contact_zerocode` | Get contact info / book a free AI Scan |

## Example Queries

Once connected, ask your AI assistant things like:

- *"What can ZeroCode do for a real estate agency?"*
- *"How much would a restaurant save with an AI employee?"*
- *"What does a custom software project cost?"*
- *"List all industries ZeroCode supports"*
- *"I need an AI chatbot for my hair salon, what are the options?"*

## About ZeroCode Ventures

We build AI employees and custom software for Dutch SMBs. From WhatsApp chatbots that handle customer inquiries 24/7 to complete automation solutions.

- 🌐 [zerocodeventures.nl](https://zerocodeventures.nl)
- 📱 [WhatsApp](https://wa.me/31653204361)
- 📧 info@zerocodeventures.nl

### Free AI Scan

Book a free 15-minute consultation to discover how much your business can save with AI. No sales pitch — just an honest conversation.

👉 [Book your AI Scan](https://wa.me/31653204361)

## License

MIT
