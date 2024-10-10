function showMailForm(eventName) {
    sendEvent(eventName);
    document.getElementById('mail-form').style.display = 'block';
}

function closeMailForm() {
    sendEvent('close_mail_form');
    document.getElementById('mail-form').style.display = 'none';
}

async function submitEmail() {
    const email = document.getElementById('email-input').value;
    await fetch('/submit-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        }),
    })
    .then(response => {
        if (response.ok) {
            alert(`Thank you! We will notify you at ${email} when the service is ready.`);
            closeMailForm();
        } else {
            alert('There was an error submitting your email.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit the email.');
    });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}
