window.onload = (() => {
    document.body.classList.remove('is-slide');
});

const pageLink = document.querySelectorAll('.page');
for (let i = 0; i < pageLink.length; i++) {
    pageLink[i].onclick = e => {
        e.preventDefault();
        const url = pageLink[i].getAttribute('href');

        if (url !== '') {
            document.body.classList.add('is-slide-in');
            setTimeout(() => {
                window.location = url;
            }, 700);
        }
    }
}