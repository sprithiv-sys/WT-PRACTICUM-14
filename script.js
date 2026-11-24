/* ===== PRACTICUM 9: animations driven by user actions ===== */
    (function () {
      var toast = document.getElementById('toast');
      var toastTimer;

      window.showToast = function (message) {
        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.remove('hide');
        toast.classList.add('show');
        toastTimer = setTimeout(function () {
          toast.classList.remove('show');
          toast.classList.add('hide');
        }, 2800);
      };

      /* Trial button: idle -> loading -> done -> idle */
      var trialBtn = document.getElementById('trialBtn');
      var trialLabel = document.getElementById('trialLabel');
      trialBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (trialBtn.classList.contains('loading') || trialBtn.classList.contains('done')) return;
        trialBtn.classList.add('loading');
        trialLabel.textContent = 'Setting up workspace...';
        setTimeout(function () {
          trialBtn.classList.remove('loading');
          trialBtn.classList.add('done');
          trialLabel.textContent = 'Workspace ready \u2713';
          window.showToast('Your workspace is ready. Complete the form to continue.');
          document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
          setTimeout(function () {
            trialBtn.classList.remove('done');
            trialLabel.textContent = 'Start 14-day free trial';
          }, 4000);
        }, 1500);
      });

      /* Step cards: open and close */
      document.querySelectorAll('.step').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('open'); });
      });

      /* Release notes panel */
      var notesBtn = document.getElementById('notesBtn');
      var notesPanel = document.getElementById('notesPanel');
      notesBtn.addEventListener('click', function () {
        var isOpen = notesPanel.classList.toggle('open');
        notesBtn.textContent = isOpen ? 'Hide release notes' : 'Show release notes';
        notesBtn.setAttribute('aria-expanded', isOpen);
      });
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 10: DOM manipulation ===== */
    (function () {
      var list = document.getElementById('pjList');
      var nameIn = document.getElementById('pjName');
      var ownerIn = document.getElementById('pjOwner');
      var msg = document.getElementById('pjMsg');
      var summary = document.getElementById('pjSummary');
      var empty = document.getElementById('pjEmpty');
      var clearBtn = document.getElementById('pjClear');
      var nextId = 1;

      function update() {
        var total = list.querySelectorAll('li').length;
        var active = list.querySelectorAll('.pill-on').length;
        summary.innerHTML = '<strong>' + total + '</strong> projects &middot; <strong>' + active + '</strong> active';
        empty.style.display = total ? 'none' : 'block';
        if (total) { clearBtn.removeAttribute('disabled'); } else { clearBtn.setAttribute('disabled', 'disabled'); }
      }

      function makeBtn(text, action, cls) {
        var b = document.createElement('button');
        b.className = 'sbtn ' + cls;
        b.textContent = text;
        b.setAttribute('data-action', action);
        return b;
      }

      function create(name, owner) {
        var li = document.createElement('li');
        li.className = 'pj-item';
        li.setAttribute('data-id', nextId++);

        var info = document.createElement('div');
        info.className = 'pj-info';
        var title = document.createElement('span');
        title.className = 'pj-title';
        title.textContent = name;
        var meta = document.createElement('p');
        meta.className = 'pj-meta';
        meta.textContent = 'Owner: ' + owner;
        info.appendChild(title);
        info.appendChild(meta);

        var actions = document.createElement('div');
        actions.className = 'pj-actions';
        var pill = document.createElement('span');
        pill.className = 'pill pill-on';
        pill.textContent = 'Active';
        actions.appendChild(pill);
        actions.appendChild(makeBtn('Pause', 'toggle', 'sbtn-light'));
        actions.appendChild(makeBtn('Edit', 'edit', 'sbtn-light'));
        actions.appendChild(makeBtn('Remove', 'remove', 'sbtn-danger'));

        li.appendChild(info);
        li.appendChild(actions);
        list.appendChild(li);
        update();
      }

      function say(text, type) {
        msg.textContent = text;
        msg.className = type;
        setTimeout(function () { msg.textContent = ''; msg.className = ''; }, 2500);
      }

      document.getElementById('pjAdd').addEventListener('click', function () {
        var name = nameIn.value.trim();
        var owner = ownerIn.value.trim();
        [nameIn, ownerIn].forEach(function (input) {
          input.setAttribute('aria-invalid', input.value.trim() ? 'false' : 'true');
        });
        if (!name || !owner) { say('Please enter both a project name and an owner.', 'error'); return; }
        create(name, owner);
        nameIn.value = '';
        ownerIn.value = '';
        nameIn.focus();
        say('Project "' + name + '" added.', 'ok');
      });

      ownerIn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('pjAdd').click();
      });

      list.addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button) return;
        var li = button.closest('li');
        var action = button.getAttribute('data-action');

        if (action === 'remove') { li.remove(); update(); }

        if (action === 'toggle') {
          var pill = li.querySelector('.pill');
          var wasActive = pill.classList.contains('pill-on');
          pill.classList.toggle('pill-on', !wasActive);
          pill.classList.toggle('pill-paused', wasActive);
          pill.textContent = wasActive ? 'Paused' : 'Active';
          li.classList.toggle('paused', wasActive);
          button.textContent = wasActive ? 'Resume' : 'Pause';
          update();
        }

        if (action === 'edit') {
          var editing = li.querySelector('.pj-edit');
          if (!editing) {
            var title = li.querySelector('.pj-title');
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '40');
            input.setAttribute('aria-label', 'Edit project name');
            input.className = 'pj-edit';
            input.value = title.textContent;
            title.replaceWith(input);
            button.textContent = 'Save';
            input.focus();
          } else {
            var span = document.createElement('span');
            span.className = 'pj-title';
            span.textContent = editing.value.trim() || 'Untitled project';
            editing.replaceWith(span);
            button.textContent = 'Edit';
          }
        }
      });

      clearBtn.addEventListener('click', function () {
        list.querySelectorAll('li').forEach(function (li) { li.remove(); });
        update();
      });

      create('Website redesign', 'Anita Raman');
      create('Mobile app launch', 'Karthik S');
      create('Customer onboarding flow', 'Meera Nair');
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 11: form validation ===== */
    (function () {
      var freeMail = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

      // Date of birth: user must be at least 18 today
      var dob = document.getElementById('dob');
      if (dob) {
        var limit = new Date();
        limit.setFullYear(limit.getFullYear() - 18);
        dob.max = limit.toISOString().split('T')[0];
      }

      function errorBox(form, field) {
        var key = field.name || field.id;
        var box = form.querySelector('[data-error-for="' + key + '"]');
        if (!box) {
          box = document.createElement('span');
          box.className = 'error';
          box.setAttribute('data-error-for', key);
          (field.closest('.field') || field.parentNode).appendChild(box);
        }
        return box;
      }

      function validate(form, field) {
        field.setCustomValidity('');
        if (field.validity.patternMismatch && field.title) {
          field.setCustomValidity(field.title);
        }
        if (field.type === 'email' && form.hasAttribute('data-work-email') && field.value.indexOf('@') > -1) {
          var domain = field.value.split('@')[1].toLowerCase();
          if (freeMail.indexOf(domain) > -1) {
            field.setCustomValidity('Please use your work email, not a personal one.');
          }
        }
        if (field.id === 'confirm') {
          var pw = form.querySelector('#password');
          if (pw && field.value !== pw.value) field.setCustomValidity('Passwords do not match.');
        }
        if (field.classList.contains('touched')) {
          errorBox(form, field).textContent = field.checkValidity() ? '' : field.validationMessage;
        }
      }

      document.querySelectorAll('form[data-validate]').forEach(function (form) {
        var fields = form.querySelectorAll('input, select, textarea');
        var okBox = document.createElement('div');
        okBox.className = 'form-success';
        okBox.setAttribute('role', 'status');
        form.parentNode.insertBefore(okBox, form);
        var submitting = false;

        fields.forEach(function (field) {
          field.addEventListener('blur', function () {
            field.classList.add('touched');
            validate(form, field);
          });
          field.addEventListener('input', function () {
            validate(form, field);
            if (field.id === 'password') {
              var c = form.querySelector('#confirm');
              if (c && c.value) validate(form, c);
            }
          });
          field.addEventListener('change', function () {
            field.classList.add('touched');
            validate(form, field);
          });
        });

        form.addEventListener('submit', function (event) {
          event.preventDefault();
          okBox.classList.remove('show');
          fields.forEach(function (field) {
            field.classList.add('touched');
            validate(form, field);
          });
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
          okBox.textContent = form.getAttribute('data-success');
          okBox.classList.add('show');
          okBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          document.dispatchEvent(new CustomEvent('tasklane:submitted', { detail: form.id }));
          submitting = true;
          form.reset();
          submitting = false;
        });

        form.addEventListener('reset', function () {
          fields.forEach(function (f) { f.classList.remove('touched'); f.setCustomValidity(''); });
          form.querySelectorAll('.error').forEach(function (e) { e.textContent = ''; });
          if (!submitting) okBox.classList.remove('show');
        });
      });
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 12: fetch(), async/await, try/catch/finally ===== */
    (function () {
      var API_URL = 'https://jsonplaceholder.typicode.com/users';
      var BAD_URL = 'https://jsonplaceholder.typicode.com/no-such-endpoint';
      var loader = document.getElementById('cuLoader');
      var errorBox = document.getElementById('cuErrorBox');
      var errorText = document.getElementById('cuErrorText');
      var wrap = document.getElementById('cuWrap');
      var body = document.getElementById('cuBody');
      var stats = document.getElementById('cuStats');
      var updated = document.getElementById('cuUpdated');

      async function loadCustomers(url) {
        loader.hidden = false;
        errorBox.hidden = true;
        wrap.hidden = true;
        stats.hidden = true;
        try {
          var response = await fetch(url);
          if (!response.ok) throw new Error('The server responded with status ' + response.status + '.');
          var users = await response.json();
          show(users);
          updated.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
        } catch (error) {
          errorText.textContent = 'Could not load data. ' + error.message;
          errorBox.hidden = false;
          updated.textContent = '';
        } finally {
          loader.hidden = true;
        }
      }

      function cell(text) {
        var td = document.createElement('td');
        td.textContent = text;
        return td;
      }

      function show(users) {
        body.textContent = '';
        var plans = ['Free', 'Pro', 'Enterprise'];
        var cities = new Set();
        var enterprise = 0;
        var seatTotal = 0;

        users.forEach(function (u) {
          var plan = plans[u.id % 3];
          var seats = u.id * 3 + 2;
          cities.add(u.address.city);
          seatTotal += seats;
          if (plan === 'Enterprise') enterprise++;

          var row = document.createElement('tr');
          row.appendChild(cell(u.id));
          row.appendChild(cell(u.name));
          row.appendChild(cell(u.company.name));
          row.appendChild(cell(u.email.toLowerCase()));
          row.appendChild(cell(u.address.city));
          var planCell = document.createElement('td');
          var pill = document.createElement('span');
          pill.className = 'pill pill-' + plan;
          pill.textContent = plan;
          planCell.appendChild(pill);
          row.appendChild(planCell);
          row.appendChild(cell(seats));
          body.appendChild(row);
        });

        stats.textContent = '';
        [[users.length, 'Total customers'], [enterprise, 'Enterprise accounts'], [cities.size, 'Cities'], [seatTotal, 'Total seats']]
          .forEach(function (item) {
            var card = document.createElement('div');
            card.className = 'cu-stat';
            var value = document.createElement('strong');
            value.textContent = item[0];
            var label = document.createElement('p');
            label.textContent = item[1];
            card.appendChild(value);
            card.appendChild(label);
            stats.appendChild(card);
          });
        stats.hidden = false;
        wrap.hidden = false;
      }

      document.getElementById('cuReload').addEventListener('click', function () { loadCustomers(API_URL); });
      document.getElementById('cuError').addEventListener('click', function () { loadCustomers(BAD_URL); });
      document.getElementById('cuRetry').addEventListener('click', function () { loadCustomers(API_URL); });
      loadCustomers(API_URL);
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 13: CRUD + Local Storage ===== */
    (function () {
      var KEY = 'tasklane_tasks';
      var defaults = [
        { id: 1, title: 'Fix login timeout bug', details: 'Users are logged out after 5 minutes.', priority: 'High', status: 'In Progress', due: '2026-11-25' },
        { id: 2, title: 'Design onboarding screens', details: 'Three-step welcome flow for new teams.', priority: 'Medium', status: 'To Do', due: '2026-11-30' },
        { id: 3, title: 'Publish release notes', details: 'Version 2.4 changes for customers.', priority: 'Low', status: 'Done', due: '2026-11-18' }
      ];
      var tasks = load();
      var editingId = null;
      var filter = 'All';
      var form = document.getElementById('tkForm');
      var tbody = document.getElementById('tkBody');

      function load() {
        try {
          var saved = JSON.parse(localStorage.getItem(KEY));
          return Array.isArray(saved) ? saved : defaults;
        } catch (e) { return defaults; }
      }
      function save() { localStorage.setItem(KEY, JSON.stringify(tasks)); }
      function say(msg) { if (window.showToast) window.showToast(msg); }
      function el(tag, cls, text) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text !== undefined) node.textContent = text;
        return node;
      }

      /* CREATE and UPDATE */
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = {
          title: document.getElementById('tkTitle').value.trim(),
          details: document.getElementById('tkDetails').value.trim(),
          priority: document.getElementById('tkPriority').value,
          status: document.getElementById('tkStatus').value,
          due: document.getElementById('tkDue').value
        };
        if (!data.title) return;
        if (editingId !== null) {
          var task = tasks.find(function (t) { return t.id === editingId; });
          Object.assign(task, data);
          say('Task updated');
        } else {
          data.id = Date.now();
          tasks.push(data);
          say('Task added');
          document.dispatchEvent(new CustomEvent('tasklane:task-added'));
        }
        save();
        resetForm();
        render();
      });

      function resetForm() {
        editingId = null;
        form.reset();
        document.getElementById('tkFormTitle').textContent = 'Add a task';
        document.getElementById('tkSave').textContent = 'Add task';
        document.getElementById('tkCancel').hidden = true;
      }
      document.getElementById('tkCancel').addEventListener('click', resetForm);

      function startEdit(id) {
        var t = tasks.find(function (x) { return x.id === id; });
        editingId = id;
        document.getElementById('tkTitle').value = t.title;
        document.getElementById('tkDetails').value = t.details;
        document.getElementById('tkPriority').value = t.priority;
        document.getElementById('tkStatus').value = t.status;
        document.getElementById('tkDue').value = t.due;
        document.getElementById('tkFormTitle').textContent = 'Edit task';
        document.getElementById('tkSave').textContent = 'Update task';
        document.getElementById('tkCancel').hidden = false;
        document.getElementById('tkTitle').focus();
      }

      /* DELETE */
      function remove(id, row) {
        tasks = tasks.filter(function (t) { return t.id !== id; });
        save();
        row.remove();
        if (editingId === id) resetForm();
        say('Task deleted');
        stats();
        if (!tbody.children.length) render();
      }

      /* READ */
      document.getElementById('tkFilters').addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button) return;
        filter = button.getAttribute('data-filter');
        document.querySelectorAll('#tkFilters button').forEach(function (b) { b.classList.remove('active'); });
        button.classList.add('active');
        render();
      });

      function render() {
        tbody.textContent = '';
        var visible = filter === 'All' ? tasks : tasks.filter(function (t) { return t.status === filter; });

        if (!visible.length) {
          var emptyRow = el('tr');
          var emptyCell = el('td', 'tk-empty', 'No tasks to show.');
          emptyCell.colSpan = 5;
          emptyRow.appendChild(emptyCell);
          tbody.appendChild(emptyRow);
        }

        visible.forEach(function (task) {
          var row = el('tr');

          var titleCell = el('td');
          titleCell.appendChild(el('strong', task.status === 'Done' ? 'tk-done' : '', task.title));
          titleCell.appendChild(el('small', '', task.details));

          var priorityCell = el('td');
          priorityCell.appendChild(el('span', 'pill pill-' + task.priority, task.priority));

          var dueCell = el('td', '', task.due || '-');

          var statusCell = el('td');
          var select = el('select');
          ['To Do', 'In Progress', 'Done'].forEach(function (s) {
            var option = el('option', '', s);
            if (s === task.status) option.selected = true;
            select.appendChild(option);
          });
          select.addEventListener('change', function () {
            task.status = select.value;
            save();
            render();
          });
          statusCell.appendChild(select);

          var actionCell = el('td');
          var editBtn = el('button', 'sbtn sbtn-light', 'Edit');
          editBtn.addEventListener('click', function () { startEdit(task.id); });
          var delBtn = el('button', 'sbtn sbtn-danger', 'Delete');
          delBtn.style.marginLeft = '0.4rem';
          delBtn.addEventListener('click', function () { remove(task.id, row); });
          actionCell.appendChild(editBtn);
          actionCell.appendChild(delBtn);

          [titleCell, priorityCell, dueCell, statusCell, actionCell].forEach(function (c) { row.appendChild(c); });
          tbody.appendChild(row);
        });
        stats();
      }

      function stats() {
        var list = document.getElementById('tkStats');
        list.textContent = '';
        [['Total', tasks.length],
         ['To Do', tasks.filter(function (t) { return t.status === 'To Do'; }).length],
         ['In Progress', tasks.filter(function (t) { return t.status === 'In Progress'; }).length],
         ['Done', tasks.filter(function (t) { return t.status === 'Done'; }).length]]
          .forEach(function (item) {
            var li = el('li');
            li.appendChild(el('strong', '', item[1]));
            li.appendChild(document.createTextNode(item[0]));
            list.appendChild(li);
          });
      }

      render();
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 14: search / filter and accordion ===== */
    (function () {
      var features = [
        { name: 'Kanban boards',      desc: 'Drag tasks between stages on a visual board.',      cat: 'Planning',      plan: 'Free',       color: '#0f766e' },
        { name: 'Task checklists',    desc: 'Break work into sub-tasks and tick them off.',       cat: 'Planning',      plan: 'Free',       color: '#0f766e' },
        { name: 'Team comments',      desc: 'Discuss work with @mentions on every task.',         cat: 'Collaboration', plan: 'Free',       color: '#b45309' },
        { name: 'Shared files',       desc: 'Attach and preview files without leaving a task.',   cat: 'Collaboration', plan: 'Pro',        color: '#b45309' },
        { name: 'Velocity charts',    desc: 'See how much work your team finishes each sprint.',  cat: 'Analytics',     plan: 'Pro',        color: '#1d4ed8' },
        { name: 'Custom reports',     desc: 'Build and export reports as CSV or PDF.',            cat: 'Analytics',     plan: 'Enterprise', color: '#1d4ed8' },
        { name: 'Slack integration',  desc: 'Get task updates inside your Slack channels.',       cat: 'Integrations',  plan: 'Pro',        color: '#7c3aed' },
        { name: 'GitHub integration', desc: 'Link commits and pull requests to tasks.',           cat: 'Integrations',  plan: 'Pro',        color: '#7c3aed' },
        { name: 'Daily backups',      desc: 'Encrypted backups kept for 30 days.',                cat: 'Security',      plan: 'Pro',        color: '#be123c' },
        { name: 'Single sign-on',     desc: 'Log in with your company identity provider.',        cat: 'Security',      plan: 'Enterprise', color: '#be123c' }
      ];
      var grid = document.getElementById('fxGrid');
      var search = document.getElementById('fxSearch');
      var category = document.getElementById('fxCategory');
      var activePlan = 'All';

      function icon(letter, color) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect width="52" height="52" rx="12" fill="' + color +
                  '"/><text x="26" y="35" font-size="26" font-family="Georgia" font-weight="bold" text-anchor="middle" fill="#fff">' + letter + '</text></svg>';
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
      }

      function render() {
        var text = search.value.trim().toLowerCase();
        var results = features.filter(function (f) {
          var okText = f.name.toLowerCase().includes(text) || f.desc.toLowerCase().includes(text);
          var okCat = category.value === 'All' || f.cat === category.value;
          var okPlan = activePlan === 'All' || f.plan === activePlan;
          return okText && okCat && okPlan;
        });

        grid.textContent = '';
        document.getElementById('fxCount').textContent = results.length + ' of ' + features.length + ' features shown';

        if (!results.length) {
          var empty = document.createElement('div');
          empty.className = 'fx-empty';
          empty.textContent = 'No features match your search. Try a different word or reset the filters.';
          grid.appendChild(empty);
          return;
        }

        results.forEach(function (f) {
          var card = document.createElement('div');
          card.className = 'fx-card';
          var badge = document.createElement('span');
          badge.className = 'fx-plan';
          badge.textContent = f.plan;
          var img = document.createElement('img');
          img.src = icon(f.name.charAt(0), f.color);
          img.alt = f.name + ' icon';
          var title = document.createElement('h3');
          title.textContent = f.name;
          var desc = document.createElement('p');
          desc.textContent = f.desc;
          var tag = document.createElement('span');
          tag.className = 'fx-tag';
          tag.textContent = f.cat;
          [badge, img, title, desc, tag].forEach(function (n) { card.appendChild(n); });
          grid.appendChild(card);
        });
      }

      search.addEventListener('input', render);
      category.addEventListener('change', render);
      document.getElementById('fxChips').addEventListener('click', function (event) {
        var chip = event.target.closest('.chip');
        if (!chip) return;
        document.querySelectorAll('#fxChips .chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activePlan = chip.getAttribute('data-plan');
        render();
      });

      /* Accordion */
      var panels = document.querySelectorAll('.fx-faq details');
      var toggleAll = document.getElementById('faqToggle');
      panels.forEach(function (d) {
        d.addEventListener('toggle', function () {
          d.classList.toggle('is-open', d.open);
          var allOpen = Array.from(panels).every(function (x) { return x.open; });
          toggleAll.textContent = allOpen ? 'Collapse all' : 'Expand all';
        });
      });
      toggleAll.addEventListener('click', function () {
        var open = toggleAll.textContent === 'Expand all';
        panels.forEach(function (d) { d.open = open; });
      });

      render();
    })();
