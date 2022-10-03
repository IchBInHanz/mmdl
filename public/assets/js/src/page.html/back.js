
if (searchParams.has('from_query')) {
    document.getElementById('back-url').href = './?query='+searchParams.get('from_query')
}