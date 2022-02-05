const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if(document.querySelector(selector)) {
                clearInterval(interval)
                clearTimeout(timeout)
                resolve();
            }
        }, 30);

        const timeout = setTimeout(() => {
            clearInterval(interval)
            reject();
        }, 2000)
    });
};

beforeEach(() => {
    document.querySelector('#target').innerHTML = '';
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
                { Title: 'Clerks 3'},
                { Title: 'Clerks 4'}
            ]
        },
        renderOption(movie) {
            return movie.Title;
        }
    });
});

it('Dropdown Starts Closed', () => {
    const dropdown = document.querySelector('.dropdown');

    expect(dropdown.className).not.to.include('is-active');
});

it('Search Drop Down Opens', async () => {
    const input = document.querySelector('input');
    input.value = 'Clerks';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');

    const dropdown = document.querySelector('.dropdown');

    expect(dropdown.className).to.include('is-active');
});

it('After Search it displays result', async () => {
    const input = document.querySelector('input');
    input.value = 'Clerks';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');

    const items = document.querySelectorAll('.dropdown-item');

    expect(items.length).to.equal(2);
});