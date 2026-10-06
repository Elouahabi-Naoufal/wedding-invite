import os
from datetime import datetime, timezone
from functools import wraps

from flask import Flask, jsonify, render_template, request, abort
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///dev.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class Rsvp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(200), nullable=False)
    attending = db.Column(db.Boolean, nullable=False)
    companion = db.Column(db.Boolean, default=False)
    seats = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


WEDDING = {
    "bride": "بثينة",
    "groom": "زكريا",
    "date": "2027-02-06T18:00:00",
    "date_ar": "السبت، 6 فبراير 2027",
    "ayah": "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    "surah": "سورة الروم – الآية 21",
    "location": "Café Bustane، بوبانة، طنجة",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Cafe+Bustane+Boubana+Tangier",
    "day_title": "برنامج الحفل",
    "program": [
        {"time": "18:00 – 21:00", "activity": "غناء ورقص", "icon": "🎵"},
        {"time": "21:00", "activity": "حلوى وأتاي", "icon": "🍵"},
        {"time": "22:00", "activity": "العشاء", "icon": "🍽"},
    ],
}


@app.route("/")
def invite():
    return render_template("index.html", w=WEDDING)


@app.route("/api/rsvp", methods=["POST"])
def rsvp():
    data = request.get_json(silent=True) or request.form
    name = (data.get("guest_name") or "").strip()
    if not name:
        return jsonify({"error": "الاسم مطلوب"}), 400
    attending = str(data.get("attending")).lower() in ("true", "1", "yes", "نعم")
    companion = str(data.get("companion")).lower() in ("true", "1", "yes", "نعم")
    try:
        seats = max(1, int(data.get("seats", 1)))
    except (TypeError, ValueError):
        seats = 1
    row = Rsvp(guest_name=name, attending=attending, companion=companion, seats=seats)
    db.session.add(row)
    db.session.commit()
    return jsonify({"ok": True})


ADMIN_KEY = os.environ.get("ADMIN_KEY", "admin123")


def require_admin():
    key = request.args.get("key") or request.headers.get("X-Admin-Key")
    if key != ADMIN_KEY:
        abort(401)


@app.route("/admin")
def admin():
    require_admin()
    return render_template("admin.html")


@app.route("/api/responses")
def responses():
    require_admin()
    rows = Rsvp.query.order_by(Rsvp.created_at.desc()).all()
    yes = sum(1 for r in rows if r.attending)
    no = sum(1 for r in rows if not r.attending)
    return jsonify({
        "yes": yes,
        "no": no,
        "guests": [
            {
                "name": r.guest_name,
                "attending": r.attending,
                "companion": r.companion,
                "seats": r.seats,
                "created_at": r.created_at.isoformat(),
            }
            for r in rows
        ],
    })


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
