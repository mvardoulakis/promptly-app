const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { scoreData } = JSON.parse(event.body);

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
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
  return `You are a senior AI strategy advisor writing a personalised 90-day AI strategy report for a business.

BUSINESS PROFILE:
- Industry: ${data.industry}${data.industryOther ? ` (${data.industryOther})` : ''}
- AI Readiness Stage: ${data.stage}
- Overall Score: ${data.totalScore}/100
- Operations score: ${Math.round(data.dimensionScores.operations)}/100
- Information score: ${Math.round(data.dimensionScores.information)}/100
- People score: ${Math.round(data.dimensionScores.people)}/100
- Technology score: ${Math.round(data.dimensionScores.technology)}/100
- Strategy score: ${Math.round(data.dimensionScores.strategy)}/100

Write a personalised 90-day AI strategy report for this business. Be specific to their profile — not generic AI advice. Address their actual dimension scores. Acknowledge what they are doing well and be honest about the gaps.

Structure the report as follows:

## Your AI Readiness Profile
2–3 paragraphs summarising what their scores reveal. Be specific. Reference their actual dimension scores by name. Sound like a senior advisor who has reviewed their results carefully.

## Your 90-Day AI Strategy

### Month 1: Foundations (Days 1–30)
3 specific actionable initiatives. For each: name, what to do, why it matters, what good looks like at day 30.

### Month 2: Momentum (Days 31–60)
3 specific initiatives that build on Month 1. Same format.

### Month 3: Acceleration (Days 61–90)
3 specific initiatives that compound Month 1 and 2 gains. Same format.

## The AI Tools Most Relevant to Your Business
5–7 specific tools relevant to their industry and stage. For each: name, what it does, why it fits, realistic time to value.

## What to Watch Out For
3 specific risks common for businesses at this stage and industry. Be honest and specific.

## Your Single Most Important Next Step
One specific action to take in the next 7 days. Concrete and directly connected to their lowest-scoring dimension.

Tone: Smart, direct advisor. Not a motivational coach. Not a sales pitch. Specific, honest, every sentence earns its place.
Length: 1200–1500 words.`;
}
