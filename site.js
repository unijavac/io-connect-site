(() => {
  const repoApi = 'https://api.github.com/repos/unijavac/ioConnect6-App/releases/latest';
  const versionBadge = document.getElementById('versionBadge');
  const releaseText = document.getElementById('releaseText');
  const manualLink = document.getElementById('downloadManual');

  fetch(repoApi, { headers: { 'Accept': 'application/vnd.github+json' } })
    .then(r => {
      if (!r.ok) throw new Error('GitHub API');
      return r.json();
    })
    .then(release => {
      const version = (release.tag_name || '').replace(/^v/i, '') || 'najnowsza';
      if (versionBadge) versionBadge.textContent = `Aktualna wersja: ${version}`;
      if (releaseText) releaseText.textContent = `Aktualna wersja ${version}. Aplikacja i instrukcja użytkownika są dostępne do pobrania.`;
      const pdfs = Array.isArray(release.assets) ? release.assets.filter(a => a.name && a.name.toLowerCase().endsWith('.pdf')) : [];
      pdfs.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      if (manualLink && pdfs[0] && pdfs[0].browser_download_url) manualLink.href = pdfs[0].browser_download_url;
    })
    .catch(() => {});
})();
