import requests

def google_search(search_term, api_key, cse_id, **kwargs):
    service_url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'key': api_key,
        'cx': cse_id,
        'q': search_term,
        **kwargs
    }

    response = requests.get(service_url, params=params)
    return response.json()

if __name__ == '__main__':
    api_key = "AIzaSyA_gQsnmeeoFJi7lhJ_eY70ukNd2m22Cf0"
    cse_id = "80bfac6f04cd64375"
    topic = "emission allowances"

    results = google_search(
        search_term=topic,
        api_key=api_key,
        cse_id=cse_id,
        num=10
    )

    for item in results.get('items', []):
        title = item.get('title')
        snippet = item.get('snippet')
        link = item.get('link')
        print(f"Title: {title}")
        print(f"Snippet: {snippet}")
        print(f"Link: {link}\n")