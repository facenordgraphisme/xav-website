# Downloads the data for the hero map into the current folder (run from scripts/carte/).
#   python fetch.py && python render.py ../../public/images/lieu
# Relief: Terrain Tiles (Mapzen, AWS). Lake + Durance: OpenStreetMap (ODbL) via Nominatim.
import math, os, json, requests
os.makedirs("tiles", exist_ok=True)
Z=12
def tile(lon,lat,z=Z):
    n=2**z; x=(lon+180)/360*n; y=(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n; return x,y
lon0,lat0,lon1,lat1=6.15,44.38,6.80,44.72
x0,y0=tile(lon0,lat1); x1,y1=tile(lon1,lat0)
print("tiles x",int(x0),int(x1),"y",int(y0),int(y1))
for x in range(int(x0),int(x1)+1):
    for y in range(int(y0),int(y1)+1):
        f=f"tiles/{Z}_{x}_{y}.png"
        if not os.path.exists(f):
            r=requests.get(f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{Z}/{x}/{y}.png",timeout=30); r.raise_for_status(); open(f,"wb").write(r.content)
print("tiles ok", len(os.listdir("tiles")))
import time
H = {"User-Agent": "map-render/1.0 (static map rendering)"}
out = {}
for key, q in (("lake", "Lac de Serre-Ponçon"), ("river", "La Durance rivière")):
    r = requests.get("https://nominatim.openstreetmap.org/search", params={"q": q, "format": "jsonv2", "polygon_geojson": 1, "limit": 8}, headers=H, timeout=90)
    r.raise_for_status()
    res = r.json()
    out[key] = [x for x in res if x.get("category") == ("waterway" if key == "river" else "water")] or res
    time.sleep(1.5)
json.dump(out, open("nominatim.json", "w", encoding="utf8"))
print("nominatim ok")
