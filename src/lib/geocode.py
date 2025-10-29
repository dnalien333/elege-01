import urllib.parse
import urllib.request
import json

# codigo python que utiliza nominatin para pegar long e lat com base no estado e municipio 

def get_coordinates(city: str, state: str = None, country: str = "Brazil"):

    query = city
    if state:
        query += f", {state}"
    query += f", {country}"
    
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.parse.quote(query)}&format=json&limit=1"
    headers = {"User-Agent": "PythonGeocoder/1.0"}  
    
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
    
    if data:
        lat = float(data[0]["lat"])
        lon = float(data[0]["lon"])
        return [lat, lon]
    else:
        return None
