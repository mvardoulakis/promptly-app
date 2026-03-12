const Anthropic = require('@anthropic-ai/sdk');

exports.config = {
  timeout: 30
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { scoreData } = JSON.parse(event.body);

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: buildPrompt(scoreData) }]
    });

    const report = message.content[0].text;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report })
    };
  } catch (error) {
    console.error('Generate strategy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function buildPrompt(data) {
  const toolsList = data.toolsUsed && data.toolsUsed.length > 0
    ? data.toolsUsed.join(', ')
    : 'None yet';

  return `You are a senior GenAI strategy advisor writing a personalised 90-day GenAI strategy report for a business owner.

BUSINESS PROFILE:
- Industry: ${data.industry}${data.industryOther ? ` (${data.industryOther})` : ''}
- GenAI Clarity Stage: ${data.stage}
- Overall Score: ${data.totalScore}/100
- Strategy score: ${Math.round(data.dimensionScores.strategy)}/100
- People score: ${Math.round(data.dimensionScores.people)}/100
- Information score: ${Math.round(data.dimensionScores.information)}/100
- Operations score: ${Math.round(data.dimensionScores.operations)}/100
- GenAI tools currently using: ${toolsList}
- What they most want GenAI to help with: "${data.genaiIntent}"

CRITICAL INSTRUCTION: The business told you exactly what they want GenAI to help with: "${data.genaiIntent}". Your entire report must be built around this. Reference it directly in your opening paragraph. Every initiative in the 90-day plan must connect back to this goal or the foundations needed to achieve it.

Write a personalised 90-day GenAI strategy report. Be specific to their profile. Sound like a senior advisor who has reviewed their answers carefully — not a generic AI output.

Structure the report as follows:

## Your GenAI Clarity Profile
2–3 paragraphs. Start by referencing what they told you they want to achieve. Explain what their scores reveal about their current position. Be honest about gaps and genuine about strengths. Reference their actual dimension scores by name.

## Your 90-Day GenAI Strategy

### Month 1: Getting the Right Foundations (Days 1–30)
3 specific initiatives. For each:
- A clear name
- Exactly what to do (specific, not vague)
- Why it matters for achieving their stated goal
- What good looks like at day 30

### Month 2: Building Real Habits (Days 31–60)
3 specific initiatives that build on Month 1. Same format. Should feel like a natural progression.

### Month 3: Making It Stick (Days 61–90)
3 specific initiatives that compound Month 1 and 2. Same format.

## The GenAI Tools Most Relevant to Your Business
5–7 specific tools. Prioritise tools from this list if they're already using them: ${toolsList}. For each tool:
- Tool name
- What it does
- Exactly how it applies to their stated goal: "${data.genaiIntent}"
- Realistic time to see value

## What to Watch Out For
3 specific risks or failure modes for a business at this stage and in this industry. Be honest and direct.

## Your Single Most Important Next Step
One specific action to take in the next 7 days. Must connect directly to "${data.genaiIntent}" and their lowest-scoring dimension.

Tone: Direct, specific, honest. You are a smart advisor delivering a real briefing — not a motivational coach, not a sales pitch. Every sentence must earn its place.
Length: 800–1000 words. Dense with value, no padding.`;
}
