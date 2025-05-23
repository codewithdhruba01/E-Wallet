  let currentEditCard = null;

  function addCard() {
    const type = document.getElementById('cardType').value;
    const holder = document.getElementById('cardHolder').value.trim();
    const number = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!validateInputs(holder, number, expiry, cvv, 'addError')) return;

    const cardList = document.getElementById('cardList');
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.fullNumber = number;
    card.dataset.type = type;
    card.dataset.holder = holder;
    card.dataset.expiry = expiry;
    card.dataset.cvv = cvv;

    card.innerHTML = `
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Name:</strong> ${holder}</p>
      <p><strong>Number:</strong> **** **** **** ${number.slice(-4)}</p>
      <p><strong>Expiry:</strong> ${expiry}</p>
      <div class="card-icons">
        <i class="fa-solid fa-pen-to-square" onclick="openEditModal(this)"></i>
        <i class="fa-solid fa-trash" onclick="deleteCard(this)"></i>
      </div>
    `;
    card.onclick = () => showModal(type, holder, number, expiry, cvv);
    cardList.appendChild(card);

    document.getElementById('cardHolder').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
  }

  function validateInputs(holder, number, expiry, cvv, errorId) {
    const nameValid = /^[A-Za-z]+\s[A-Za-z]+$/.test(holder);
    const numberValid = /^\d{16}$/.test(number);
    const expiryValid = /^\d{2}\/\d{2}$/.test(expiry);
    const cvvValid = /^\d{3,4}$/.test(cvv);

    const error = document.getElementById(errorId);
    if (nameValid && numberValid && expiryValid && cvvValid) {
      error.style.display = 'none';
      return true;
    } else {
      error.style.display = 'block';
      return false;
    }
  }

  function showModal(type, holder, number, expiry, cvv) {
    document.getElementById('modalType').innerText = `Card Type: ${type}`;
    document.getElementById('modalHolder').innerText = `Cardholder: ${holder}`;
    document.getElementById('modalNumber').innerText = `Card Number: ${number}`;
    document.getElementById('modalExpiry').innerText = `Expiry Date: ${expiry}`;
    document.getElementById('modalCVV').innerText = `CVV: ${cvv}`;
    document.getElementById('cardModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('cardModal').style.display = 'none';
  }

  function deleteCard(icon) {
    const card = icon.closest('.card');
    card.remove();
  }

  function copyToClipboard(id) {
    const text = document.getElementById(id).innerText.split(': ')[1];
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied: ' + text);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  }