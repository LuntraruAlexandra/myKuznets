from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite accesul din partea frontend-ului

# Function to get country data from the World Bank API
def get_country_data(country, indicators):
    base_url = "http://api.worldbank.org/v2/country/{}/indicator/{}?format=json&date=1960:2100&per_page=100"
    gdp_vector = []
    env_indicator_vector = []

    # print("ok")
    for indicator, name in indicators.items():
        # print(indicator)
        response = requests.get(base_url.format(country, indicator))
        if response.status_code == 200:
            try:
                data = response.json()
                # print(data)
                if len(data) > 1 and isinstance(data[1], list):
                    data = data[1]
                    if name == "GDP per capita, PPP (current international $)":
                        gdp_vector = [entry["value"] for entry in data if entry["value"] is not None]
                    else:
                        env_indicator_vector = [entry["value"] for entry in data if entry["value"] is not None]
            except ValueError:
                print(f"Error decoding JSON for indicator: {name}")
        else:
            print(f"Connection error: {response.status_code} for indicator {name}")

    return gdp_vector, env_indicator_vector

@app.route('/api/get_data', methods=['POST'])
def get_data():
    try:
        data = request.get_json()
        print(f"Received data from frontend: {data}")
        # print(data)
        country = data['country']
        indicators = data['indicators']
        # print(indicators)

        # Call the function to get country data
        gdp_vector, env_indicator_vector = get_country_data(country, indicators)
        # print(gdp_vector)
        # print(env_indicator_vector)

        return jsonify({'gdp_vector': gdp_vector, 'env_indicator_vector': env_indicator_vector})
    except Exception as e:
        return jsonify({"error": str(e)})
if __name__ == "__main__":
    app.run(debug=True)