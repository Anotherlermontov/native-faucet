async function sendEvent(eventName) {
    await fetch('/send-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_name: eventName,
        }),
    })
}
