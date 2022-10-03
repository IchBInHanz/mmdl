const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('from_query')) {
    document.getElementById('back-url').href = 'http://localhost/?query='+searchParams.get('from_query')
}