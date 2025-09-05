(async function () {
  const fixturesEl = document.getElementById('fixtures');
  const tableBody = document.querySelector('#standings-table tbody');
  const asofEl = document.getElementById('asof');

  try {
    const res = await fetch('../data/epl-standings-2025-09-05.json', { cache: 'no-store' });
    const data = await res.json();

    // as-of badge
    if (asofEl && data.asOf) {
      asofEl.textContent = `As of ${new Date(data.asOf).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}`;
    }

    // fixtures
    if (fixturesEl && Array.isArray(data.fixtures)) {
      fixturesEl.innerHTML = data.fixtures
        .map(f => {
          const dateStr = new Date(`${f.date}T${(f.kickoff || '15:00')}:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          return `
            <li class="fixture">
              <span><strong>${f.home}</strong> vs <strong>${f.away}</strong></span>
              <span>${dateStr}${f.kickoff ? ` · ${f.kickoff}` : ''}</span>
            </li>
          `;
        })
        .join('');
    }

    // standings
    if (tableBody && Array.isArray(data.standings)) {
      tableBody.innerHTML = data.standings
        .map(row => `
          <tr>
            <td>${row.pos}</td>
            <td>${row.team}</td>
            <td>${row.mp}</td>
            <td>${row.w}</td>
            <td>${row.d}</td>
            <td>${row.l}</td>
            <td>${row.gf}</td>
            <td>${row.ga}</td>
            <td>${row.gd}</td>
            <td><strong>${row.pts}</strong></td>
          </tr>
        `)
        .join('');
    }
  } catch (e) {
    console.error('Failed to load EPL data', e);
    if (fixturesEl) fixturesEl.innerHTML = `<li class="fixture">Could not load fixtures. Try refreshing.</li>`;
    if (tableBody) tableBody.innerHTML = `<tr><td colspan="10">Could not load standings.</td></tr>`;
  }
})();
