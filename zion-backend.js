/* ============================================================
   WINGS OF FIRE — Zion BaaS backend integration
   ------------------------------------------------------------
   Adds to this single-file SPA, using a Zion no-code backend:
     • sign in / sign up (username + password)
     • post + delete comments (stored in the backend, per account)
     • browsing-history recording (per account, private)
     • a profile panel showing "my comments" + "my history"

   Load AFTER the main app <script> so it overrides the old
   localStorage-based comment functions with the backend ones.

   Setup (see zion-backend/README.md):
     1) npx -y zion-mcp@2.7.1 login
     2) create/pin a project, apply the schema & permissions
     3) paste the project's external id into PROJECT_EX_ID below
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     CONFIG — replace with your project's external id (exId).
     Find it via:  npx -y zion-mcp@2.7.1 project metadata  → apps[]
     or in the Zion editor's "Connect Backend" modal.
     ------------------------------------------------------------ */
  var PROJECT_EX_ID = 'PASTE_YOUR_PROJECT_EX_ID_HERE';

  var GRAPHQL_URL = 'https://zion-app.functorz.com/zero/' + PROJECT_EX_ID + '/api/graphql-v2';
  var AUTH_KEY = 'wof_zion_auth';

  /* ------------------------------------------------------------
     Small utilities
     ------------------------------------------------------------ */
  function getAuth() { try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch (e) { return null; } }
  function setAuth(a) { localStorage.setItem(AUTH_KEY, JSON.stringify(a)); }
  function clearAuth() { localStorage.removeItem(AUTH_KEY); }
  function isAuthed() { return !!(getAuth() && getAuth().token); }
  function configured() { return PROJECT_EX_ID && PROJECT_EX_ID.indexOf('PASTE_') !== 0; }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function timeAgo(iso) {
    var t = new Date(iso).getTime();
    if (isNaN(t)) return '';
    var s = Math.floor((Date.now() - t) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  async function gql(query, variables, withAuth) {
    var headers = { 'Content-Type': 'application/json' };
    if (withAuth) {
      var a = getAuth();
      if (a && a.token) headers['Authorization'] = 'Bearer ' + a.token;
    }
    var res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: query, variables: variables || {} })
    });
    var json;
    try { json = await res.json(); } catch (e) {
      throw new Error('Backend did not return JSON (HTTP ' + res.status + '). Check PROJECT_EX_ID and that the site is served over HTTPS.');
    }
    if (json && json.errors && json.errors.length) {
      throw new Error(json.errors.map(function (e) { return e.message; }).join('; '));
    }
    return json && json.data;
  }

  /* ------------------------------------------------------------
     Auth (Zion's built-in username/password endpoint)
     ------------------------------------------------------------ */
  function authenticate(username, password, register) {
    var q =
      'mutation($u:String!,$p:String!,$r:Boolean!){' +
      ' authenticateWithUsername(username:$u,password:$p,register:$r){' +
      '   account{ id username email } jwt{ token }' +
      ' } }';
    return gql(q, { u: username, p: password, r: register }, false)
      .then(function (d) { return d.authenticateWithUsername; });
  }

  /* ------------------------------------------------------------
     Comments (backend table: comment)
     ------------------------------------------------------------ */
  function fetchComments() {
    var q =
      'query { comment(order_by:{created_at:desc}, limit:200){' +
      ' id content target_type target_key author_name author_id created_at } }';
    return gql(q, {}, false).then(function (d) { return d.comment || []; });
  }
  function postComment(content) {
    var a = getAuth();
    var q =
      'mutation($content:String!,$authorId:bigint!,$authorName:String!){' +
      ' insert_comment_one(object:{content:$content,target_type:"",target_key:"",author_id:$authorId,author_name:$authorName}){' +
      '   id created_at } }';
    return gql(q, {
      content: content,
      authorId: String(a.account.id),
      authorName: a.account.username
    }, true).then(function (d) { return d.insert_comment_one; });
  }
  function deleteComment(id) {
    var q = 'mutation($id:bigint!){ delete_comment_by_pk(pk_columns:{id:$id}){ id } }';
    return gql(q, { id: String(id) }, true);
  }

  /* ------------------------------------------------------------
     Browsing history (backend table: browse_history)
     Row-level security restricts every query to the signed-in user.
     ------------------------------------------------------------ */
  function fetchMyHistory() {
    var q =
      'query { browse_history(order_by:{created_at:desc}, limit:200){' +
      ' id content_type content_key content_title created_at } }';
    return gql(q, {}, true).then(function (d) { return d.browse_history || []; });
  }
  function recordHistory(type, key, title) {
    if (!isAuthed()) return Promise.resolve();
    var a = getAuth();
    var q =
      'mutation($type:String!,$key:String!,$title:String!,$userId:bigint!){' +
      ' insert_browse_history_one(object:{content_type:$type,content_key:$key,content_title:$title,user_id:$userId}){' +
      '   id } }';
    return gql(q, { type: type, key: key, title: title, userId: String(a.account.id) }, true);
  }
  function deleteHistory(id) {
    var q = 'mutation($id:bigint!){ delete_browse_history_by_pk(pk_columns:{id:$id}){ id } }';
    return gql(q, { id: String(id) }, true);
  }

  /* ------------------------------------------------------------
     Browsing-history hook: record a view after each route render
     ------------------------------------------------------------ */
  var _lastHistoryKey = null;

  function routeInfo() {
    var page = 'home', id = '';
    try {
      if (window.getRoute) { var r = window.getRoute(); page = r.page || 'home'; id = r.id || ''; }
    } catch (e) {}
    var heading = '';
    try {
      var el = document.querySelector('main .section__title, main h1, main h2');
      if (el) heading = (el.textContent || '').trim();
    } catch (e) {}
    return {
      content_type: page,
      content_key: id,
      content_title: heading || (id ? (page + ' / ' + id) : page)
    };
  }

  function maybeRecordHistory() {
    if (!isAuthed() || !configured()) return;
    var info = routeInfo();
    var key = info.content_type + '|' + info.content_key;
    if (key === _lastHistoryKey) return; // avoid duplicates from re-renders
    _lastHistoryKey = key;
    recordHistory(info.content_type, info.content_key, info.content_title).catch(function () {});
  }

  /* ------------------------------------------------------------
     UI: account button in the nav + the account modal
     ------------------------------------------------------------ */
  function ensureModal() {
    var m = document.getElementById('zionModal');
    if (m) return m;

    var style = document.createElement('style');
    style.textContent =
      '#zionAccountBtn{cursor:pointer;border:1px solid var(--border);background:var(--bg-surface);color:var(--text-primary);' +
      'font-family:inherit;font-size:13px;font-weight:600;padding:8px 14px;border-radius:999px;display:flex;align-items:center;gap:6px;' +
      'transition:all .2s var(--ease);white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;}' +
      '#zionAccountBtn:hover{border-color:var(--accent-primary);color:var(--accent-primary);}' +
      '#zionModal{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(17,24,39,.5);}' +
      '#zionModal.open{display:flex;}' +
      '.zion-card{width:100%;max-width:440px;max-height:88vh;overflow:auto;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px;box-shadow:var(--shadow-lg);}' +
      '.zion-card h3{margin:0 0 4px;font-size:18px;letter-spacing:-.02em;}' +
      '.zion-muted{color:var(--text-tertiary);font-size:12px;margin:0 0 16px;}' +
      '.zion-tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}' +
      '.zion-tab{cursor:pointer;border:1px solid var(--border);background:var(--bg-inset);color:var(--text-secondary);' +
      'font-family:inherit;font-size:12px;font-weight:600;padding:6px 12px;border-radius:999px;}' +
      '.zion-tab.active{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;}' +
      '.zion-input{width:100%;padding:11px 13px;border:2px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:14px;color:var(--text-primary);background:var(--bg-inset);outline:none;margin-bottom:10px;}' +
      '.zion-input:focus{border-color:var(--accent-primary);}' +
      '.zion-btn{width:100%;cursor:pointer;border:none;border-radius:var(--radius-sm);font-family:inherit;font-weight:700;font-size:14px;padding:11px;transition:opacity .2s;}' +
      '.zion-btn.primary{background:var(--accent-primary);color:#fff;}' +
      '.zion-btn.ghost{background:transparent;border:1px solid var(--border);color:var(--text-secondary);margin-top:8px;}' +
      '.zion-btn:disabled{opacity:.55;cursor:default;}' +
      '.zion-err{color:#dc2626;font-size:12px;margin-top:8px;min-height:14px;}' +
      '.zion-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:12px;border:1px solid var(--border-light);border-radius:var(--radius-sm);margin-bottom:10px;}' +
      '.zion-row .zion-title{font-size:13px;font-weight:700;color:var(--text-primary);}' +
      '.zion-row .zion-sub{font-size:11px;color:var(--text-tertiary);margin-top:2px;}' +
      '.zion-row .zion-del{cursor:pointer;border:none;background:none;color:var(--text-tertiary);font-size:11px;}' +
      '.zion-row .zion-del:hover{color:var(--accent-fire);}' +
      '.zion-empty{text-align:center;color:var(--text-tertiary);font-size:13px;padding:24px 8px;}';
    document.head.appendChild(style);

    m = document.createElement('div');
    m.id = 'zionModal';
    m.setAttribute('role', 'dialog');
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
    document.body.appendChild(m);
    return m;
  }

  function openModal() { ensureModal().classList.add('open'); renderModal(); }
  function closeModal() { var m = ensureModal(); m.classList.remove('open'); }

  function renderModal() {
    var m = ensureModal();
    var a = getAuth();
    if (a && a.token) m.innerHTML = profileCard();
    else m.innerHTML = authCard();
  }

  /* ---------- sign in / sign up card ---------- */
  function authCard() {
    return '' +
      '<div class="zion-card">' +
      '  <h3 id="zionAuthTitle">Sign in</h3>' +
      '  <p class="zion-muted">Sign in to post comments and save your browsing history.</p>' +
      '  <div class="zion-tabs">' +
      '    <button class="zion-tab active" id="zionTabSignin" onclick="window.zionSetAuthMode(false)">Sign in</button>' +
      '    <button class="zion-tab" id="zionTabSignup" onclick="window.zionSetAuthMode(true)">Sign up</button>' +
      '  </div>' +
      '  <input class="zion-input" id="zionUser" placeholder="Username" autocomplete="username" />' +
      '  <input class="zion-input" id="zionPass" type="password" placeholder="Password" autocomplete="current-password" />' +
      '  <button class="zion-btn primary" id="zionAuthBtn" onclick="window.zionSubmitAuth()">Sign in</button>' +
      '  <button class="zion-btn ghost" onclick="window.zionCloseAccount()">Cancel</button>' +
      '  <div class="zion-err" id="zionAuthErr"></div>' +
      '</div>';
  }

  var _registerMode = false;

  function setAuthMode(register) {
    _registerMode = register;
    document.getElementById('zionTabSignin').classList.toggle('active', !register);
    document.getElementById('zionTabSignup').classList.toggle('active', register);
    document.getElementById('zionAuthTitle').textContent = register ? 'Sign up' : 'Sign in';
    document.getElementById('zionAuthBtn').textContent = register ? 'Create account' : 'Sign in';
    document.getElementById('zionAuthErr').textContent = '';
  }

  function submitAuth() {
    var u = (document.getElementById('zionUser').value || '').trim();
    var p = document.getElementById('zionPass').value || '';
    var errEl = document.getElementById('zionAuthErr');
    errEl.textContent = '';
    if (!u || !p) { errEl.textContent = 'Enter a username and password.'; return; }
    var btn = document.getElementById('zionAuthBtn');
    btn.disabled = true;
    authenticate(u, p, _registerMode).then(function (r) {
      if (!r || !r.jwt || !r.account) throw new Error('Unexpected response from backend.');
      setAuth({ token: r.jwt.token, account: { id: r.account.id, username: r.account.username, email: r.account.email } });
      closeModal();
      refreshAuthUI();
      if (window.renderPage) window.renderPage();
    }).catch(function (e) {
      errEl.textContent = e.message || 'Authentication failed.';
    }).then(function () { btn.disabled = false; });
  }

  function logout() {
    clearAuth();
    closeModal();
    refreshAuthUI();
    if (window.renderPage) window.renderPage();
  }

  /* ---------- profile card (my comments / my history) ---------- */
  var _profileTab = 'comments';

  function profileCard() {
    var a = getAuth();
    return '' +
      '<div class="zion-card">' +
      '  <h3>Account</h3>' +
      '  <p class="zion-muted">Signed in as <strong>' + esc(a.account.username) + '</strong></p>' +
      '  <div class="zion-tabs">' +
      '    <button class="zion-tab' + (_profileTab === 'comments' ? ' active' : '') + '" onclick="window.zionProfileTab(\'comments\')">My comments</button>' +
      '    <button class="zion-tab' + (_profileTab === 'history' ? ' active' : '') + '" onclick="window.zionProfileTab(\'history\')">My history</button>' +
      '  </div>' +
      '  <div id="zionProfileBody"><div class="zion-empty">Loading…</div></div>' +
      '  <button class="zion-btn ghost" onclick="window.zionLogout()">Sign out</button>' +
      '</div>';
  }

  function setProfileTab(tab) {
    _profileTab = tab;
    var body = document.getElementById('zionProfileBody');
    if (!body) return;
    document.querySelectorAll('.zion-tab').forEach(function (t) { t.classList.remove('active'); });
    // re-render the header tabs via renderModal (simplest consistent path)
    renderModal();
    loadProfileTab();
  }

  function loadProfileTab() {
    var body = document.getElementById('zionProfileBody');
    if (!body) return;
    var a = getAuth();
    body.innerHTML = '<div class="zion-empty">Loading…</div>';

    if (_profileTab === 'history') {
      fetchMyHistory().then(function (rows) {
        if (rows.length === 0) { body.innerHTML = '<div class="zion-empty">No browsing history yet.</div>'; return; }
        body.innerHTML =
          '<div style="display:flex;justify-content:flex-end;margin-bottom:8px;"><button class="zion-del" onclick="window.zionClearHistory()">Clear all</button></div>' +
          rows.map(function (r) {
            return '<div class="zion-row">' +
              '<div><div class="zion-title">' + esc(r.content_title) + '</div>' +
              '<div class="zion-sub">' + esc(r.content_type) + (r.content_key ? ' · ' + esc(r.content_key) : '') + ' · ' + timeAgo(r.created_at) + '</div></div>' +
              '<button class="zion-del" onclick="window.zionDeleteHistory(\'' + r.id + '\')">✕</button>' +
              '</div>';
          }).join('');
      }).catch(function (e) { body.innerHTML = '<div class="zion-err">' + esc(e.message) + '</div>'; });
    } else {
      fetchComments().then(function (rows) {
        var mine = rows.filter(function (c) { return String(c.author_id) === String(a.account.id); });
        if (mine.length === 0) { body.innerHTML = '<div class="zion-empty">You have not posted any comments yet.</div>'; return; }
        body.innerHTML = mine.map(function (c) {
          return '<div class="zion-row">' +
            '<div><div class="zion-title">' + esc(c.content) + '</div>' +
            '<div class="zion-sub">' + timeAgo(c.created_at) + '</div></div>' +
            '<button class="zion-del" onclick="window.zionDeleteComment(\'' + c.id + '\')">Delete</button>' +
            '</div>';
        }).join('');
      }).catch(function (e) { body.innerHTML = '<div class="zion-err">' + esc(e.message) + '</div>'; });
    }
  }

  function clearHistory() {
    if (!confirm('Clear all your browsing history?')) return;
    fetchMyHistory().then(function (rows) {
      return Promise.all(rows.map(function (r) { return deleteHistory(r.id); }));
    }).then(function () { loadProfileTab(); }).catch(function (e) { /* surface lightly */ });
  }

  function deleteCommentFromProfile(id) {
    deleteComment(id).then(function () { loadProfileTab(); }).catch(function (e) {});
  }
  function deleteHistoryFromProfile(id) {
    deleteHistory(id).then(function () { loadProfileTab(); }).catch(function (e) {});
  }

  /* ---------- nav button injection ---------- */
  function refreshAuthUI() {
    var nav = document.querySelector('.nav__search-btn');
    var btn = document.getElementById('zionAccountBtn');
    if (btn) btn.remove();
    if (!configured()) return;
    btn = document.createElement('button');
    btn.id = 'zionAccountBtn';
    btn.type = 'button';
    var a = getAuth();
    if (a && a.token) { btn.textContent = '🐉 ' + a.account.username; btn.title = 'Account'; }
    else { btn.textContent = 'Sign in'; btn.title = 'Sign in / sign up'; }
    btn.onclick = openModal;
    if (nav && nav.parentNode) nav.parentNode.insertBefore(btn, nav);
    else document.body.appendChild(btn);
  }

  /* ------------------------------------------------------------
     Override the old localStorage comment system with the backend
     ------------------------------------------------------------ */
  window.renderCommentsPage = function () {
    var a = getAuth();
    var form = a && a.token
      ? '' +
        '<div class="glass" style="padding:24px;margin-bottom:24px;">' +
        '  <h3 style="font-weight:800;font-size:15px;margin-bottom:12px;letter-spacing:-0.02em;">Leave a Comment</h3>' +
        '  <textarea id="commentInput" placeholder="Share your thoughts about Wings of Fire..." style="width:100%;min-height:100px;padding:14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:14px;color:var(--text-primary);background:var(--bg-inset);resize:vertical;outline:none;transition:border-color 0.2s var(--ease);" onfocus="this.style.borderColor=\'var(--accent-primary)\'" onblur="this.style.borderColor=\'var(--border)\'"></textarea>' +
        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">' +
        '    <span style="font-size:12px;color:var(--text-tertiary);">Posted as <strong>' + esc(a.account.username) + '</strong>. Everyone can read these comments.</span>' +
        '    <button onclick="window.submitComment()" class="btn btn--primary" style="padding:10px 20px;">Post Comment</button>' +
        '  </div>' +
        '</div>'
      : '' +
        '<div class="glass" style="padding:24px;margin-bottom:24px;text-align:center;">' +
        '  <h3 style="font-weight:800;font-size:15px;margin-bottom:8px;letter-spacing:-0.02em;">Join the discussion</h3>' +
        '  <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">Sign in to post a comment. Your comment history and browsing history are saved to your account.</p>' +
        '  <button onclick="window.zionOpenAccount()" class="btn btn--primary" style="padding:10px 22px;">Sign in / Sign up</button>' +
        '</div>';

    return '' +
      '<section class="section" style="padding-top:30px;">' +
      '  <div class="container" style="max-width:800px;">' +
      '    <div class="section__header">' +
      '      <div class="section__label">Community</div>' +
      '      <h2 class="section__title">Comments</h2>' +
      '      <p class="section__desc">Share your thoughts about Wings of Fire. Comments are stored on the server and tied to your account.</p>' +
      '    </div>' +
      '    ' + form +
      '    <div id="commentsList" style="display:flex;flex-direction:column;gap:12px;">' +
      '      <div style="text-align:center;padding:40px 24px;color:var(--text-tertiary);font-size:14px;">Loading comments…</div>' +
      '    </div>' +
      '  </div>' +
      '</section>';
  };

  window.submitComment = function () {
    var input = document.getElementById('commentInput');
    if (!input || !input.value.trim() || !isAuthed()) return;
    postComment(input.value.trim()).then(function () {
      input.value = '';
      loadCommentsList();
    }).catch(function (e) {
      window.alert('Could not post comment: ' + (e && e.message ? e.message : e));
    });
  };

  window.deleteSingleComment = function (id) {
    deleteComment(id).then(function () { loadCommentsList(); })
      .catch(function (e) { window.alert('Could not delete comment: ' + (e && e.message ? e.message : e)); });
  };

  window.deleteAllMyComments = function () {
    if (!confirm('Delete all your comments? This cannot be undone.')) return;
    var me = getAuth();
    fetchComments().then(function (rows) {
      var mine = rows.filter(function (c) { return String(c.author_id) === String(me.account.id); });
      return Promise.all(mine.map(function (c) { return deleteComment(c.id); }));
    }).then(function () { loadCommentsList(); })
      .catch(function (e) { window.alert('Could not delete comments: ' + (e && e.message ? e.message : e)); });
  };

  function loadCommentsList() {
    var list = document.getElementById('commentsList');
    if (!list) return;
    if (!configured()) { list.innerHTML = '<div class="zion-empty">Backend not configured yet — set PROJECT_EX_ID in zion-backend.js.</div>'; return; }
    var me = getAuth();
    fetchComments().then(function (rows) {
      if (rows.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:48px 24px;color:var(--text-tertiary);">' +
          '<div style="font-size:40px;margin-bottom:12px;opacity:0.4;">🐉</div>' +
          '<p style="font-size:14px;">No comments yet. Be the first to share your thoughts!</p></div>';
        return;
      }
      list.innerHTML = rows.map(function (c) {
        var isMine = me && String(c.author_id) === String(me.account.id);
        return '<div class="glass" style="padding:16px;position:relative;" id="comment-' + esc(c.id) + '">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
          '  <span style="font-size:12px;color:var(--text-tertiary);display:flex;align-items:center;gap:6px;">' +
          '    <span style="width:24px;height:24px;border-radius:50%;background:var(--accent-primary-light);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--accent-primary);">' + esc((c.author_name || '?').charAt(0).toUpperCase()) + '</span>' +
          '    <strong>' + esc(c.author_name || 'Anonymous') + '</strong> · ' + timeAgo(c.created_at) +
          '  </span>' +
          (isMine ? '<button onclick="window.deleteSingleComment(\'' + esc(c.id) + '\')" style="background:none;border:none;color:var(--text-tertiary);font-size:12px;cursor:pointer;padding:4px 8px;border-radius:4px;" onmouseover="this.style.color=\'var(--accent-fire)\'" onmouseout="this.style.color=\'var(--text-tertiary)\'">Delete</button>' : '') +
          '</div>' +
          '<p style="font-size:14px;color:var(--text-primary);line-height:1.6;">' + esc(c.content) + '</p>' +
          '</div>';
      }).join('');
    }).catch(function (e) {
      list.innerHTML = '<div class="zion-err">Could not load comments: ' + esc(e.message || e) + '</div>';
    });
  }

  /* ------------------------------------------------------------
     Public API surface (used by the modal / inline onclick)
     ------------------------------------------------------------ */
  window.zionOpenAccount = openModal;
  window.zionCloseAccount = closeModal;
  window.zionSetAuthMode = setAuthMode;
  window.zionSubmitAuth = submitAuth;
  window.zionLogout = logout;
  window.zionProfileTab = setProfileTab;
  window.zionClearHistory = clearHistory;
  window.zionDeleteComment = deleteCommentFromProfile;
  window.zionDeleteHistory = deleteHistoryFromProfile;

  /* ------------------------------------------------------------
     Wrap renderPage so we can (a) inject the account button and
     (b) record browsing history, after every route change.
     ------------------------------------------------------------ */
  var _origRenderPage = window.renderPage;
  window.renderPage = function () {
    var r = _origRenderPage.apply(this, arguments);
    refreshAuthUI();
    if (window.getRoute) {
      try { if (window.getRoute().page === 'comments') loadCommentsList(); } catch (e) {}
    }
    maybeRecordHistory();
    return r;
  };

  /* One-time: when the login modal switches to the profile view,
     load the active tab's data. */
  var _origProfileTab = setProfileTab;
  window.zionProfileTab = function (tab) { _origProfileTab(tab); loadProfileTab(); };

  /* Initial auth-UI injection on first load. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshAuthUI);
  } else {
    refreshAuthUI();
  }
})();
