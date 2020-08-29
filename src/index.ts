(async () => {
  const title = getTitleText();
  const postId = getPostId();
  const teamId = getTeamId();
  if (title === null || postId === null || teamId === null) { return; }
  insertMenuItem(
    createCopyMenuItem("タイトルをコピー", title),
    createCopyMenuItem("URL(フル)をコピー", `https://${teamId}.esa.io/posts/${postId}`),
    createCopyMenuItem("URL(相対)をコピー", `/posts/${postId}`),
    createCopyMenuItem("mdリンクをコピー", `[${title}](/posts/${postId})`),
  )
})();
function getTitleText(): string | null {
  const titleElement = document.querySelector(".post-title__name");
  if (!titleElement || !(titleElement instanceof HTMLElement)) { return null; }
  const title = titleElement.innerText;
  return title;
}
/** POST IDを返す。ない場合はnull */
function getPostId(): number | null {
  const e = document.querySelector(".binding[data-post-number]");
  if (!e) { return null; }
  const r = e.getAttribute("data-post-number");
  const n = Number(r);
  if (Number.isNaN(n)) { return null; }
  return n;
}
/** URLに使う、チームIDを返す */
function getTeamId(): string | null {
  const e = document.querySelector(".binding[data-team-name]");
  if (!e) { return null; }
  const r = e.getAttribute("data-team-name");
  return r;
}
/** メニューの下からn番目にコンテンツを入れる */
function insertMenuItem(...elements: HTMLElement[]) {
  const menuParent = document.querySelector(".post-menu__nav");
  const upElement = menuParent.childNodes[menuParent.childNodes.length - 3];
  for (let element of elements) {
    menuParent.insertBefore(element, upElement);
  }
}
function createCopyMenuItem(title: string, copyText: string): HTMLElement {
  const elemParent = document.createElement("div");
  elemParent.innerHTML = `<li class="js-post-menu__item post-menu__item">
  <a class="post-menu__link copy-to-clipboard" data-clipboard-text="xxxxxxxxxx">
  <i class="js-copy-icon post-menu__icon icon-clipboard"></i>
  <span class="js-copy-label post-menu__label" data-text-after-copied="クリップボードにコピーしました">タイトルをコピー</span>
  </a>
  </li>`;
  const elem = elemParent.childNodes[0] as HTMLElement;
  elem.querySelector(".copy-to-clipboard").setAttribute("data-clipboard-text", copyText);
  elem.querySelector<HTMLElement>(".js-copy-label").innerText = title;
  elem.addEventListener("click", async () => {
    elem.querySelector("i").classList.add("is-copied");
    const originalText = elem.querySelector<HTMLElement>("span").innerText;
    const copiedText = elem.querySelector<HTMLElement>("span").getAttribute("data-text-after-copied");
    elem.querySelector<HTMLElement>("span").innerText = copiedText;
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.querySelector<HTMLElement>("#js-post-menu").style.display = "";
    elem.querySelector<HTMLElement>("span").innerText = originalText;
    elem.querySelector("i").classList.remove("is-copied");
  });
  return elem;
}
