# Renders the hero map of Activités Nature as SVG layers (used as CSS masks on the site).
#   relief : Terrain Tiles (Mapzen / AWS, terrarium z12)  - lake + Durance : OpenStreetMap via Nominatim
# Usage (from scripts/carte/): python fetch.py && python render.py ../../public/images/lieu
# Map space: 1280 x 768 units, Web Mercator, the base (393 route des Portes du Lac) at BASE_UV.
import math, json, os, sys
import numpy as np
from PIL import Image
import contourpy

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(OUT, exist_ok=True)
W, H = 1280, 768
Z = 12
BASE = (6.480891, 44.546412)          # BAN, score 0.95
EMBRUN = (6.484718, 44.568046)
BASE_UV = (0.60, 0.61)                # where the base sits in the map (fraction of width, height)
WIDTH_KM = 26.0

def merc(lon, lat, z=Z):
    n = 256 * 2 ** z
    return (lon + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n

m_per_px = 156543.03392 * math.cos(math.radians(BASE[1])) / 2 ** Z * 256 / 256
S = W / (WIDTH_KM * 1000 / m_per_px)   # map units per mercator pixel
bx, by = merc(*BASE)
ox, oy = bx - BASE_UV[0] * W / S, by - BASE_UV[1] * H / S   # mercator px at map (0,0)

def to_map(lon, lat):
    x, y = merc(lon, lat)
    return (x - ox) * S, (y - oy) * S

# ---------- elevation grid ----------
tiles = {}
for f in os.listdir("tiles"):
    z, x, y = map(int, f[:-4].split("_")); tiles[(x, y)] = f
xs = [k[0] for k in tiles]; ys = [k[1] for k in tiles]
tx0, ty0 = min(xs), min(ys)
mosaic = np.zeros(((max(ys) - ty0 + 1) * 256, (max(xs) - tx0 + 1) * 256), dtype=np.float32)
for (x, y), f in tiles.items():
    a = np.asarray(Image.open(os.path.join("tiles", f)).convert("RGB"), dtype=np.float32)
    mosaic[(y - ty0) * 256:(y - ty0 + 1) * 256, (x - tx0) * 256:(x - tx0 + 1) * 256] = a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768

G = 2  # grid step in map units
gu = np.arange(0, W + G, G); gv = np.arange(0, H + G, G)
U, V = np.meshgrid(gu, gv)
mx = ox + U / S - tx0 * 256; my = oy + V / S - ty0 * 256
x0 = np.floor(mx).astype(int); y0 = np.floor(my).astype(int); fx = mx - x0; fy = my - y0
x0 = np.clip(x0, 0, mosaic.shape[1] - 2); y0 = np.clip(y0, 0, mosaic.shape[0] - 2)
elev = (mosaic[y0, x0] * (1 - fx) * (1 - fy) + mosaic[y0, x0 + 1] * fx * (1 - fy)
        + mosaic[y0 + 1, x0] * (1 - fx) * fy + mosaic[y0 + 1, x0 + 1] * fx * fy)

def blur(a, sigma):
    r = int(3 * sigma); k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2); k /= k.sum()
    a = np.pad(a, r, mode="edge")
    a = np.apply_along_axis(lambda m: np.convolve(m, k, mode="valid"), 0, a)
    return np.apply_along_axis(lambda m: np.convolve(m, k, mode="valid"), 1, a)
elev = blur(elev, 2.2)
print("elevation", int(elev.min()), "->", int(elev.max()))

# ---------- geometry helpers ----------
def rdp(pts, eps):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]; d = b - a; L = np.hypot(*d)
    dist = np.abs(d[0] * (pts[:, 1] - a[1]) - d[1] * (pts[:, 0] - a[0])) / L if L else np.hypot(*(pts - a).T)
    i = int(np.argmax(dist))
    if dist[i] > eps: return np.vstack([rdp(pts[:i + 1], eps)[:-1], rdp(pts[i:], eps)])
    return np.vstack([a, b])

def chaikin(pts, n=2, closed=False):
    for _ in range(n):
        if len(pts) < 3: break
        p = np.vstack([pts, pts[:1]]) if closed else pts
        q = 0.75 * p[:-1] + 0.25 * p[1:]; r = 0.25 * p[:-1] + 0.75 * p[1:]
        new = np.empty((len(q) * 2, 2)); new[0::2] = q; new[1::2] = r
        pts = new if closed else np.vstack([pts[:1], new, pts[-1:]])
    return pts

def path(pts, closed=False):
    p = np.round(pts, 1)
    s = f"M{p[0,0]:g} {p[0,1]:g}"
    for d in np.round(np.diff(p, axis=0), 1):
        s += f"l{d[0]:g} {d[1]:g}"
    return s + ("z" if closed else "")

def svg(name, body, attrs):
    open(f"{OUT}/{name}", "w", encoding="utf8").write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" {attrs}>{body}</svg>')
    print(name, os.path.getsize(f"{OUT}/{name}") // 1024, "Ko")

# ---------- contours ----------
gen = contourpy.contour_generator(gu, gv, elev, line_type="Separate")
minor, index = [], []
lo, hi = int(elev.min() // 50 + 1) * 50, int(elev.max() // 50) * 50
for lvl in range(lo, hi + 1, 50):
    for line in gen.lines(lvl):
        if len(line) < 6: continue
        closed = np.allclose(line[0], line[-1])
        if closed and np.ptp(line[:, 0]) < 8 and np.ptp(line[:, 1]) < 8: continue   # specks
        pts = rdp(chaikin(rdp(line, 0.8), 2, closed=False), 0.2)
        (index if lvl % 250 == 0 else minor).append(path(pts))
svg("courbes.svg", f'<path d="{"".join(minor)}"/>', 'fill="none" stroke="#000" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"')
svg("courbes-maitresses.svg", f'<path d="{"".join(index)}"/>', 'fill="none" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"')

# ---------- lake ----------
nom = json.load(open("nominatim.json", encoding="utf8"))
lake = next(x for x in nom["lake"] if x["osm_type"] == "relation")["geojson"]
polys = lake["coordinates"] if lake["type"] == "MultiPolygon" else [lake["coordinates"]]
lake_d = ""
lake_pts = []
for poly in polys:
    for ring in poly:
        pts = np.array([to_map(*c) for c in ring])
        if np.ptp(pts[:, 0]) < 3 and np.ptp(pts[:, 1]) < 3: continue
        pts = rdp(chaikin(rdp(pts, 0.5), 2, closed=True), 0.15)
        lake_d += path(pts, closed=True); lake_pts.append(pts)
svg("lac.svg", f'<path fill-rule="evenodd" d="{lake_d}"/>', 'fill="#000"')
# Water lines around the shore, like an old engraved map: the lake is drawn on top, so only the outer half shows
svg("rive.svg", f'<path d="{lake_d}" stroke-width="26" stroke-opacity=".14"/><path d="{lake_d}" stroke-width="12" stroke-opacity=".3"/>',
    'fill="none" stroke="#000" stroke-linejoin="round"')

# ---------- Durance ----------
riv = nom["river"][0]["geojson"]
lines = riv["coordinates"] if riv["type"] == "MultiLineString" else [riv["coordinates"]]
riv_d = ""
for ln in lines:
    pts = np.array([to_map(*c) for c in ln])
    inside = (pts[:, 0] > -60) & (pts[:, 0] < W + 60) & (pts[:, 1] > -60) & (pts[:, 1] < H + 60)
    # split into runs that stay in view
    run = []
    for p, ok in zip(pts, inside):
        if ok: run.append(p)
        elif len(run) > 1: riv_d += path(chaikin(rdp(np.array(run), 0.5), 2)); run = []
        else: run = []
    if len(run) > 1: riv_d += path(chaikin(rdp(np.array(run), 0.5), 2))
svg("durance.svg", f'<path d="{riv_d}" stroke-width="12" stroke-opacity=".22"/><path d="{riv_d}" stroke-width="4.5"/>',
    'fill="none" stroke="#000" stroke-linejoin="round" stroke-linecap="round"')

# ---------- places ----------
places = {"base": to_map(*BASE), "embrun": to_map(*EMBRUN)}
allp = np.vstack(lake_pts)
places["lake_bbox"] = [float(allp[:, 0].min()), float(allp[:, 1].min()), float(allp[:, 0].max()), float(allp[:, 1].max())]
json.dump({k: [round(float(v), 1) for v in (val if isinstance(val, (list, tuple)) else [val])] for k, val in places.items()},
          open("places.json", "w"), indent=1)
# Copy these into globals.css (--pin-x/--pin-y and the labels) if the framing changes
print(json.load(open("places.json")))
