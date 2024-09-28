function showMailForm() {
    document.getElementById('mail-form').style.display = 'block';
}

function closeMailForm() {
    document.getElementById('mail-form').style.display = 'none';
}

function submitEmail() {
    const email = document.getElementById('email-input').value;
    if (validateEmail(email)) {
        alert(`Thank you! We will notify you at ${email} when the service is ready.`);
        closeMailForm();
    } else {
        alert('Please enter a valid email address.');
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}
