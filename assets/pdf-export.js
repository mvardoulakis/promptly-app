/* ============================================================
   PROMPTLY — PDF Export
   Depends on html2pdf.js loaded in strategy.html
   ============================================================ */

async function exportPDF() {
  const scoreData = window._promptlyScoreData;

  // Build a clean printable HTML document
  const content = buildPrintDocument(scoreData);

  const opt = {
    margin:      [12, 16, 12, 16],  // top, right, bottom, left (mm)
    filename:    `Promptly-AI-Strategy-Report-${(scoreData && scoreData.stage) || 'Report'}.pdf`,
    image:       { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:   { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Show feedback
  const btn = document.querySelector('[onclick="exportPDF()"]');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" style="width:20px;height:20px;border-width:2px;"></span> Generating PDF…`;
  }

  try {
    await html2pdf().set(opt).from(content).save();
  } catch(err) {
    console.error('PDF export error:', err);
    alert('There was a problem generating the PDF. Please try again.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

function buildPrintDocument(scoreData) {
  const stage      = (scoreData && scoreData.stage)      || '—';
  const score      = (scoreData && scoreData.totalScore) || '—';
  const industry   = (scoreData && scoreData.industry)   || '—';
  const dimScores  = (scoreData && scoreData.dimensionScores) || {};

  const dimensions = [
    { key: 'operations',  label: 'Operations' },
    { key: 'information', label: 'Information' },
    { key: 'people',      label: 'People' },
    { key: 'technology',  label: 'Technology' },
    { key: 'strategy',    label: 'Strategy' }
  ];

  const dimRows = dimensions.map(d => {
    const pct = dimScores[d.key] ? Math.round(dimScores[d.key]) : 0;
    return `
      <tr>
        <td style="padding:6px 12px; font-weight:500;">${d.label}</td>
        <td style="padding:6px 12px; text-align:right; font-family:monospace;">${pct}/100</td>
        <td style="padding:6px 12px; width:160px;">
          <div style="height:6px; background:#e5e7eb; border-radius:3px; overflow:hidden;">
            <div style="height:100%; width:${pct}%; background:#6F61EF; border-radius:3px;"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Get rendered report HTML from the page
  const reportBody = document.getElementById('report-body');
  const reportHTML = reportBody ? reportBody.innerHTML : '<p>Report not available.</p>';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    font-family: Georgia, serif;
    color: #1a1a2e;
    max-width: 720px;
    padding: 0;
    line-height: 1.65;
  `;

  wrapper.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      h1, h2, h3 { font-family: Georgia, serif; font-weight: 400; color: #1a1a2e; }
      h1 { font-size: 26px; margin-bottom: 4px; }
      h2 { font-size: 20px; margin-top: 28px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
      h3 { font-size: 15px; margin-top: 18px; margin-bottom: 6px; }
      p  { font-size: 13px; color: #374151; margin-bottom: 10px; line-height: 1.7; font-family: Arial, sans-serif; }
      ul, ol { padding-left: 20px; margin-bottom: 10px; }
      li { font-size: 13px; color: #374151; margin-bottom: 5px; font-family: Arial, sans-serif; }
      strong { color: #1a1a2e; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
      td { font-size: 13px; color: #374151; font-family: Arial, sans-serif; }
      .report-section { margin-bottom: 0; }
    </style>

    <!-- Header -->
    <div style="border-bottom: 2px solid #6F61EF; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <h1 style="color:#6F61EF; font-size:28px; margin-bottom:2px;">Promptly</h1>
          <p style="color:#6b7280; font-size:12px; margin:0; font-family:monospace;">AI Strategy Report · Confidential</p>
        </div>
        <div style="text-align:right;">
          <div style="font-family:monospace; font-size:28px; font-weight:700; color:#1a1a2e; line-height:1;">${score}</div>
          <div style="font-size:11px; color:#6b7280; font-family:monospace;">/ 100</div>
        </div>
      </div>
    </div>

    <!-- Score summary -->
    <div style="background:#f8f9fc; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin-bottom:24px;">
      <div style="display:flex; gap:24px; flex-wrap:wrap; margin-bottom:14px; align-items:center;">
        <div>
          <div style="font-size:11px; color:#6b7280; font-family:monospace; text-transform:uppercase; letter-spacing:0.05em;">Stage</div>
          <div style="font-size:16px; font-weight:600; color:#6F61EF;">${stage}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#6b7280; font-family:monospace; text-transform:uppercase; letter-spacing:0.05em;">Industry</div>
          <div style="font-size:14px; font-weight:500; color:#1a1a2e;">${industry}</div>
        </div>
        <div>
          <div style="font-size:11px; color:#6b7280; font-family:monospace; text-transform:uppercase; letter-spacing:0.05em;">Overall Score</div>
          <div style="font-size:16px; font-weight:600; color:#1a1a2e; font-family:monospace;">${score}/100</div>
        </div>
      </div>
      <table>
        <tbody>${dimRows}</tbody>
      </table>
    </div>

    <!-- Report content -->
    <div class="report-body">
      ${reportHTML}
    </div>

    <!-- Footer / referral -->
    <div style="margin-top:40px; padding:16px; border:1.5px dashed #e5e7eb; border-radius:8px; text-align:center; page-break-inside:avoid;">
      <div style="width:64px; height:64px; background:#e5e7eb; border-radius:6px; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; font-size:10px; color:#9ca3af;">QR CODE</div>
      <p style="font-size:11px; color:#6b7280; margin:0; font-family:monospace;">Share Promptly — promptly.ai</p>
    </div>
  `;

  return wrapper;
}
