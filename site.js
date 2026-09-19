(() => {
  const repoApi = 'https://api.github.com/repos/unijavac/ioConnect6-App/releases/latest';
  const versionBadge = document.getElementById('versionBadge');
  const releaseText = document.getElementById('releaseText');

  fetch(repoApi, { headers: { 'Accept': 'application/vnd.github+json' } })
    .then(r => {
      if (!r.ok) throw new Error('GitHub API');
      return r.json();
    })
    .then(release => {
      const version = (release.tag_name || '').replace(/^v/i, '') || 'najnowsza';
      if (versionBadge) versionBadge.textContent = `Aktualna wersja: ${version}`;
      if (releaseText) releaseText.textContent = `Aktualna wersja ${version}. Pobieranie i instrukcja instalacji są dostępne na osobnej stronie.`;
    })
    .catch(() => {});
})();
