function setupAnimations() {
  // Outer quest-detail toggle
  document.querySelectorAll('details.quest-detail').forEach((detail) => {
    const summary = detail.querySelector('summary');
    const content = summary.nextElementSibling;

    let animation = null;
    let isClosing = false;
    let isExpanding = false;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (detail.open) {
        close();
      } else {
        open();
      }
    });

    function close() {
      if (isClosing || !detail.open) return;
      isClosing = true;

      const startHeight = detail.offsetHeight;
      const endHeight = summary.offsetHeight;

      if (animation) animation.cancel();

      animation = detail.animate({
        height: [`${startHeight}px`, `${endHeight}px`]
      }, { duration: 300, easing: 'ease-out' });

      animation.onfinish = () => {
        detail.open = false;
        detail.style.height = '';
        animation = null;
        isClosing = false;
      };
    }

    function open() {
      if (isExpanding || detail.open) return;
      detail.style.height = `${detail.offsetHeight}px`;
      detail.open = true;

      requestAnimationFrame(() => expand());
    }

    function expand() {
      isExpanding = true;
      const startHeight = detail.offsetHeight;
      const endHeight = summary.offsetHeight + content.offsetHeight;

      if (animation) animation.cancel();

      animation = detail.animate({
        height: [`${startHeight}px`, `${endHeight}px`]
      }, { duration: 300, easing: 'ease-out' });

      animation.onfinish = () => {
        detail.style.height = '';
        animation = null;
        isExpanding = false;
      };
    }
  });

  // Inner description detail toggle
  document.querySelectorAll('details.description').forEach((detail) => {
    const summary = detail.querySelector('summary');
    const content = summary.nextElementSibling;

    let animation = null;
    let isClosing = false;
    let isExpanding = false;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (detail.open) {
        close();
      } else {
        open();
      }
    });

    function close() {
      if (isClosing || !detail.open) return;
      isClosing = true;

      const startHeight = detail.offsetHeight;
      const endHeight = summary.offsetHeight;

      if (animation) animation.cancel();

      animation = detail.animate({
        height: [`${startHeight}px`, `${endHeight}px`]
      }, { duration: 250, easing: 'ease-out' });

      animation.onfinish = () => {
        detail.open = false;
        detail.style.height = '';
        animation = null;
        isClosing = false;
      };
    }

    function open() {
      if (isExpanding || detail.open) return;
      detail.style.height = `${detail.offsetHeight}px`;
      detail.open = true;

      requestAnimationFrame(() => expand());
    }

    function expand() {
      isExpanding = true;
      const startHeight = detail.offsetHeight;
      const endHeight = summary.offsetHeight + content.offsetHeight;

      if (animation) animation.cancel();

      animation = detail.animate({
        height: [`${startHeight}px`, `${endHeight}px`]
      }, { duration: 250, easing: 'ease-out' });

      animation.onfinish = () => {
        detail.style.height = '';
        animation = null;
        isExpanding = false;
      };
    }
  });
}

function renderQuests(quests) {
  const container = document.getElementById('quests-container');
  container.innerHTML = '';

  const partyLevel = parseInt(document.getElementById('party-level').value, 10);

  quests.forEach((quest) => {
    const override = quest.overrideVisibility?.toLowerCase();

    // Handle visibility logic
    const shouldRender =
      override === 'always' ||
      (override !== 'never' && (!quest.level || quest.level <= partyLevel));

    if (!shouldRender) return;

    const questEl = document.createElement('div');
    questEl.classList.add('quest');

    if (quest.status?.trim().toLowerCase() === 'complete') {
      questEl.classList.add('completed');
    }

    questEl.innerHTML = `
      <details class="quest-detail">
        <summary class="quest-title">${quest.title}</summary>
        <div class="quest-content">
          <div class="issuer">Issuer: ${quest.issuer}</div>
          <details class="description">
            <summary>Description</summary>
            <p>${quest.description}</p>
          </details>
          <div class="reward">Reward: ${quest.reward}</div>
          <div class="status">Status: ${quest.status}</div>
        </div>
      </details>
    `;

    container.appendChild(questEl);
  });

  setupAnimations(); // Re-bind animations
}

document.getElementById('json-upload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      window.loadedQuests = data; // Save for future filtering
      renderQuests(data);
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };


  reader.readAsText(file);
});


document.getElementById('party-level').addEventListener('input', () => {
  if (window.loadedQuests) {
    renderQuests(window.loadedQuests);
  }
});
