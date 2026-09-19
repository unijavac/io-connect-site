(() => {
  const repoApi = 'https://api.github.com/repos/unijavac/ioConnect6-App/releases/latest';
  const fallback = 'https://github.com/unijavac/ioConnect6-App/releases/latest';
  const buttons = [document.getElementById('downloadTop'), document.getElementById('downloadMain')].filter(Boolean);
  const versionBadge = document.getElementById('versionBadge');
  const releaseText = document.getElementById('releaseText');

  fetch(repoApi, { headers: { 'Accept': 'application/vnd.github+json' } })
    .then(r => {
      if (!r.ok) throw new Error('GitHub API');
      return r.json();
    })
    .then(release => {
      const apk = Array.isArray(release.assets)
        ? release.assets.find(asset => asset.name && asset.name.toLowerCase().endsWith('.apk'))
        : null;
      const version = (release.tag_name || '').replace(/^v/i, '') || 'najnowsza';
      if (versionBadge) versionBadge.textContent = `Aktualna wersja: ${version}`;
      if (releaseText) releaseText.textContent = `Aktualna wersja ${version}. Plik APK jest pobierany z oficjalnego wydania ioConnect6.`;
      if (apk && apk.browser_download_url) {
        buttons.forEach(btn => btn.href = apk.browser_download_url);
      }
    })
    .catch(() => {
      buttons.forEach(btn => btn.href = fallback);
    });
})();
